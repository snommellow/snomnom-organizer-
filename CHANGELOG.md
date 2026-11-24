# Changelog

Every version of Snomnom Organizer Tool, newest first. Older versions can still be opened or downloaded from the [Versions](README.md#versions) table.

## 3.0.1

Fixes for phones and a few look changes. [Release notes](https://github.com/snommellow/snomnom-organizer-/releases/tag/v3.0.1)

### Phones and tablets
- A tapped button no longer stays tinted after you lift your finger
- Tooltips no longer pop up and stick after a tap
- The paste box drops the keyboard shortcut chip and uses a shorter hint on phones
- If the clipboard can't be read, the message says to press and hold the box and tap Paste
- The grades bar keeps the S+ label on narrow screens

### Look
- Neon preview now matches the table: dark chips with glowing numbers
- Tinted moved between Neon and Outline in the accent picker
- Caches in the Data tab storage bar are teal instead of red, so they no longer look like a warning

## 3.0 (Snomnom Organizer Tool)

A full redesign from scratch, built on one design system. [Release notes](https://github.com/snommellow/snomnom-organizer-/releases/tag/v3.0)

### Redesign
- Buttons, switches, dropdowns, tags, cards and panels all share one set of styles
- Frosted, see-through panels and popups with content in cards
- Toolbar laid out on cards
- Table columns in groups: Tags, Extras, Status, Rank, Score, Info, Tool
- Animations reworked throughout: mode switches, rows, panels, popups and menus
- 10 new themes (34 total): Blush, Blue Screen, Cathedral, Chalkboard, Comic, Hazard, Kraft, Seafoam, Sticky Note, Windows 95
- Theme picker sorted into Dark and Light, filterable by kind (Joke, Nature)
- Theme personality: each theme's own corners, edges, shadow and texture, as an opt-in toggle
- Accent styles for tags: Auto, Pastel, Neon, Outline, Stamp, Aura, Tinted
- Colour scale for ranks: Classic, Theme, Ocean, Sunset, Berry, Meadow, Candy, Custom; grades can follow it
- Fonts grouped by kind (Clean, Mono, Display, Hand)
- Custom pointer that matches what it's over, with three sizes
- Icon motion: icons animate on hover and when a setting changes
- Settings previews: hover a setting to see a live Off / On demo
- Region icons: each region has its own globe
- Category icons on columns and tags
- Help rebuilt: Start (five steps), Features (guide with live demos), Contact
- All wording rewritten short and plain

### New features

**Table and modes**
- Order mode: rank one category at a time by dragging (replaces Rank mode)
- Grade mode: drag stages into grade lanes to score them (replaces Score mode)
- Playlist mode: add stages to Today, pick each one's goals, press Play to work through them; finished ones move to Done with your time
- Folders: split the table into sections with a colour and icon; fold, rename, optional progress bar per folder
- Stage page: click a stage's number to open it into a page in place, with its tags, note, feedback, emote and cover; arrow keys move between stages
- Configurable categories: add, rename or remove up to 12; each adds a Rank and a Score column
- Column order: drag column headers, or reorder them in Settings › General
- Filter panel with chips (replaces the filter toggles)

**Getting stages in**
- Scan: drop, paste or browse screenshots of a stage's page; it reads the ID, players, time, genre, title, description and cover and matches them to stages
- Live scan: watches a window or screen and reads new stage pages as they appear
- Scan title languages: English, Japanese, Simplified and Traditional Chinese, Korean
- Recall: brings back work from an older bookmark, matched by ID

**Tags and details**
- New optional columns: Link, Translate, Progress, Folders
- Translation: English name beside each stage, from brackets, a translation pack or an online search; auto translations can be marked with *
- Online lookups (free, only the name is sent): search online, suggest genres, check name spelling, writing help (grammar check and Translate in notes and feedback)
- Note, feedback and link each open in their own window (also by shortcut); note and feedback have a formatting toolbar
- Covers: a picture per stage, uploaded or taken from Scan; can show behind the stage name
- Auto-pick emotes from the stage name; one you pick yourself stays
- Emote picker adds 8 emoji groups (1,068 emotes): Smileys & People, Animals & Nature, Food & Drink, Activities, Travel & Places, Objects, Symbols, Other
- Category icons, picked automatically or by hand, with an icons-only option for headers
- Detailed checkmark: adds In progress and Incomplete
- Progress tag: 0, 25, 50, 75 or 100%; highlight stages under 100%

**Ranking and scoring**
- Cap ranks at max rank
- Allow duplicate ranks, allow duplicate scores
- Rank and score independent
- Grade bar: drag a handle to move where each grade ends; shows ranks given in each grade

**Workspace**
- A panel of apps that work on the table: Grade, Compare, Random pick, Session compare
- Add your own apps from a .wsapp file, with a starter file to build from

**Bookmarks and calculation**
- Bookmarks can show the timer and earnings; bookmark icon can follow the emote
- Tells you when added stages have past work in an older bookmark
- Calculation: rule sets, starter rules (Reach 5, Every 3, After 10, One stage), progress toward the total

**Settings and data**
- Data tab: storage use, caches, clean up (log, recovery copy, covers, empty bookmarks, leftovers), backup and restore, reset settings, erase all data
- Translation packs: Chinese, Japanese and Korean to English, downloaded once and used offline
- Emote packs: download the emotes as SVG files (8 packs)
- Data file: keeps a synced copy in a file you choose (Google Drive, OneDrive, Dropbox or iCloud folder); the browser stays the main copy, so it still works offline
- Right-click a toolbar button for its related settings
- Show full names on toolbar buttons
- Touch gestures for shortcuts (swipe, tap, double-tap and hold +, two-finger tap)
- New shortcuts: Playlist mode, Grade next category, Search stages, open note, feedback and link windows

### Improvements
- Edit mode works like a spreadsheet: Enter and arrow keys move, a pasted block fills across and down, odd cells turn red, repeats amber, Next fix jumps to the next one
- Sort rebuilt as a panel: numbered sorts, order switch, drag to set which comes first
- Undo history: right-click Undo or Redo to jump back several steps; Clear all can be undone; undo from a log entry
- Copy menu picks what to copy: scores, ranks, names, IDs, notes or everything
- Search also finds notes and links; filters narrow the stats
- Paste box also takes screenshots; Paste button
- File menu regrouped (Export, Import & share); each export has its own preview button
- Region priority replaces region cycle order (new stages get your top region)
- Click actions (was Tag clicks) now also cover Name, ID, Emote, Translation, Checkmark, Progress, Link, Note and Feedback; Region, Players and Duration open their popup on left click by default
- Hold to pick (was Hold-down popup): Ring, Arc, Strip or List styles, now also for Checkmark, Progress and Emote; hold delay and ring size settings
- Shortcuts grouped (Edit, Modes, Actions, More)
- Timer: pick a length (5m to 2h) or run until a time
- Log: more date formats, kept between visits
- Colour picker keeps recent colours; icon picker shows recent picks
- Profiles can have an icon
- Share codes: copy and paste settings, layouts and Calculation rules as a code
- Big tables refresh faster: only rows that changed are redrawn
- Behavior settings regrouped (Copying scores, Ranking and scoring, Table, Stage cell, Hidden stages, Tags and more)
- Renamed: "Hide ID" to "Hide ID under the name", "Min stages subtotal" to "Shortest stages subtotal"

### Bug fixes
- "Hidden stages to bottom" threw an error on every render, so it never worked
- Reset settings left 15 of the 30 settings unchanged (sticky toolbar, hidden stages, tags in own column, auto-save and more)
- Profiles did not save Show completion in stats, Round duration or Auto-save, and loading one did not re-apply the sticky toolbar, scroll-to-top button or column widths

### Removed or replaced
- Rank and Score modes, replaced by Order and Grade
- Region cycle order, replaced by Region priority
- Settings: Show Global for all-region stages, Hide ID with region off, Forget last region
- File menu: Export scores only (TSV download); copying scores moved to the Copy menu
- Renamed from Snomnom Rank Tool to Snomnom Organizer Tool

## 2.1 (Snomnom Rank Tool)

What 2.1 included:

- Single HTML file; paste a stage list or a region table to load, or add a blank stage
- Modes: Normal, Select, Edit, Rank (one category at a time), Score (one category at a time)
- Select bar: Copy, Duplicate, Delete, Hide, Clear scores, All, None
- Drag rows to reorder; resize columns, double-click to auto-fit
- Search by name or ID, with filter toggles; multi-key sort
- Auto-rank by score, strict progression, lock rank when typed, auto-hide overflow, max rank, grades
- Optional tags: Region, Players, Duration (with a stopwatch), Genre (custom genres, rename, icon), Checkmark, Feedback, Note, Emote
- Hide stages (dim, collapse, move to the bottom); hide empty tags; tags in their own column
- Progress bar, stats row, average score column, min stages subtotal; highlight missing scores or unchecked stages
- Session bar: Timer (deadline), Calculation (earn rules, counter), Copy scores, Clear all
- Bookmarks (Auto slot plus 50 saved), auto-save
- File: Copy scores, preview scores, JSON export and import, TSV, scores-only TSV download, PNG and PDF export, previews, Present mode
- Undo and redo
- Settings tabs: General, Behavior, Shortcuts, Appearance, Profiles; settings search
- Settings profiles and 10 layouts (Default, Standard, List, Rank, Score, Review, Minimal, Tag, Compare, Custom)
- 15 rebindable shortcuts
- Tag clicks for Region, Players, Duration and Genre
- Hold-down popup (Ring or Classic) for Region, Players, Duration and Genre; hold for the emote picker
- Region cycle order; date format, time format, duration display
- Session name and date with a calendar
- Rearrange the Session, Mode and Optional bars
- Log with type filters, Help (Guide, Contact), Erase all data
- 24 themes, 18 fonts

## 2.0 (Snomnom Rank Tool)

Rebuilt from the spreadsheet as a single HTML file that runs in any browser. [Release notes](https://github.com/snommellow/snomnom-organizer-/releases/tag/Release)

## 1.2 (Excel)
- Overall Validation moved under the grade columns, with shorter messages (Wrong grade at: 3, 5 / Out of order: 2 & 3) and status marks
- Next to score: in each of your score columns, the best-ranked stage still missing a score is highlighted
- Missing Rank Numbers rewritten with simpler formulas
- Helper columns listing the missing ranks, and a named range for them

## 1.1 (Excel)
- Grade labels reworded (S+ (100%–80%), A+ (79%–60%) and so on)
- The per-row Error column is replaced by an Overall Validation for each category, under the score columns. In order it checks: waiting for input, rank duplicates, score duplicates, wrong grade at a rank, ranks out of order, missing score, then All Good
- Missing Rank Numbers for each category, saying All ranks present when complete
- Grade-count metrics removed
- Fix: Your Tech Rank cells now get the grade tint like Interest and Art (1.0 only tinted those two)
- One sheet, named Ranking

## 1.0 (Excel)
- One sheet per session with 20 stage rows: No., Stage Name, Main Server, Check?
- Enter Interest, Art and Tech ranks; the grade fills in by itself: ranks 1–2 S+ (80–100%), 3–6 A+ (60–79%), 7–12 B+ (40–59%), 13–20 C+ (below 40%)
- Your Interest, Art and Tech score columns, and a Feedback column
- Error column on every row: flags a blank or wrong-grade score per category, or says All good
- Missing and duplicate check: duplicate ranks and missing rank numbers for each category
- Validation metrics: how many of each grade each category has, against the expected 2 / 4 / 6 / 8
- Colours: ranks on a green-to-red scale, grades coloured by tier, score cells tinted to match their grade, empty rank cells marked
- Instructions and a worked example row
