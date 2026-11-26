/* Snomnom relay: looks up one Miliastra Wonderland stage on miliastra.world (with the owner's OK)
   and returns the parts the Snomnom Organizer Tool uses. One page per request, each answer kept
   for a day, and only the Snomnom page may call it. */
const ALLOW = ["https://snommellow.github.io"];
const DAY = 86400;
const REG = { na: "na", us: "na", eu: "eu", asia: "asia", sar: "tw", tw: "tw" };

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOW.includes(origin) ? origin : ALLOW[0],
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Vary": "Origin",
  };
}
const json = (o, status, h) => new Response(JSON.stringify(o), { status, headers: { ...h, "content-type": "application/json; charset=utf-8" } });

// the page carries its data as Next.js flight chunks: self.__next_f.push([1,"..."])
export function flight(html) {
  let out = "";
  for (const m of html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)) {
    try { out += JSON.parse(m[1]); } catch (e) {}
  }
  return out;
}
function grab(t, i) {
  let d = 0, s = false, esc = false;
  for (let j = i; j < t.length; j++) {
    const c = t[j];
    if (s) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === '"') s = false; continue; }
    if (c === '"') s = true;
    else if (c === "{" || c === "[") d++;
    else if (c === "}" || c === "]") { d--; if (!d) return t.slice(i, j + 1); }
  }
  return null;
}
export function parse(html, id, region) {
  const f = flight(html);
  const a = f.indexOf('{"level":{"id":"' + id + '"');
  if (a < 0) return null;
  const raw = grab(f, a);
  if (!raw) return null;
  const o = JSON.parse(raw), L = o.level || {};
  const ids = {};
  ids[REG[region] || region] = String(id);
  (o.otherRegions || []).forEach(r => { const k = REG[r.region]; k && r.guid && !ids[k] && (ids[k] = String(r.guid)); });
  const players = (L.player_count || (o.recommendations || []).find(x => String(x.guid) === String(id))?.player_count || []).map(String);
  return {
    id: String(id), region: REG[region] || region,
    name: L.name || "", short: L.short_description || "", description: L.description || "",
    genre: L.category_name || "", tags: L.tags || [],
    players, avgTime: (L.stats && L.stats.average_time_elapsed) ?? L.average_time_elapsed ?? null,
    controls: L.control_types || [], languages: L.translated_languages || [],
    cover: (L.thumbnail && L.thumbnail.url) || L.thumbnail_url || "",
    screenshots: (L.screenshots || []).map(s => s.url).slice(0, 6),
    popularity: (L.stats && (L.stats.popularity_30d ?? L.stats.popularity)) ?? null,
    recommendation: (L.stats && L.stats.recommendation) ?? null,
    rank: L.rank || null,
    created: L.created_at || null,
    seen: Object.fromEntries((o.recommendations || []).filter(x => x && x.guid && x.player_count && x.player_count.length).map(x => [String(x.guid), x.player_count.map(String)])), ids, url: "https://miliastra.world/levels/" + id + "?region=" + region,
    checked: new Date().toISOString(),
  };
}

export default {
  async fetch(req, env, ctx) {
    const origin = req.headers.get("Origin") || "";
    const h = cors(origin);
    if (req.method === "OPTIONS") return new Response(null, { headers: h });
    if (origin && !ALLOW.includes(origin)) return json({ error: "Not allowed" }, 403, h);
    const u = new URL(req.url);
    const m = u.pathname.match(/^\/level\/(\d{6,14})$/);
    if (!m) return json({ error: "Use /level/<id>?region=na" }, 404, h);
    const region = (u.searchParams.get("region") || "na").toLowerCase().replace(/[^a-z]/g, "") || "na";
    const key = new Request("https://snomnom-relay.cache/level/" + m[1] + "?region=" + region);
    const cache = caches.default;
    const hit = await cache.match(key);
    if (hit) { const r = new Response(hit.body, hit); Object.entries(h).forEach(([k, v]) => r.headers.set(k, v)); r.headers.set("x-cache", "hit"); return r; }
    const page = await fetch("https://miliastra.world/levels/" + m[1] + "?region=" + region, {
      headers: { "User-Agent": "SnomnomOrganizerRelay/1.0 (+https://snommellow.github.io/snomnom-organizer-/; one stage per request, cached a day)", "Accept": "text/html" },
    });
    if (page.status === 404) return json({ error: "Stage not found" }, 404, h);
    if (!page.ok) return json({ error: "miliastra.world answered " + page.status }, 502, h);
    const data = parse(await page.text(), m[1], region);
    if (!data) return json({ error: "Stage not found on the page" }, 404, h);
    const res = json(data, 200, { ...h, "Cache-Control": "public, max-age=" + DAY });
    ctx.waitUntil(cache.put(key, res.clone()));
    return res;
  },
};
