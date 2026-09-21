/* ============================================================
   HELP WANTED — SpongeBob Dub Archive
   Single self-contained script: database + behavior.
   No other JavaScript files are needed.
   ============================================================

   HOW TO EDIT THE DATABASE
   ------------------------
   Each entry in the `dubs` list looks like this:

     {
       language: "Spanish",
       title: "Se Busca Ayudante",     // "" if unknown
       verify: true,                   // optional: shows "needs verification"
       note: "Optional short note",    // optional
       video: "https://...",           // optional: must start with https://
       versions: [                     // optional: 2+ versions gives a
         { name: "Latin American Spanish", studio: "", video: "https://..." },
         { name: "European Spanish" }
       ]
     }

   Rules:
   - Leave title / studio empty ("") when it is not verified.
   - Only add `video` links you are allowed to use.
   - Rows with fewer than 2 versions have no "Show versions" button.
   ============================================================ */

(function () {
  "use strict";

  // ---------- Settings ----------
  var TEST_VIDEO = "https://streamtape.com/e/e3v3o7K0jLcwv4";
  var TEST_LABEL = "Test player";
  var EPISODE_COUNT = 1;
  var ARCHIVE_STATUS = "Work in progress";

  // ---------- Helpers for writing data ----------
  // b(): version whose name IS the studio/broadcaster
  function b(name) {
    return { name: name, studio: name };
  }
  // v(): version with a separate studio/broadcaster
  function v(name, studio) {
    return { name: name, studio: studio };
  }
  // d(): version with studio/broadcaster not yet verified
  function d(name) {
    return { name: name, studio: "" };
  }

  // ---------- The database ----------
  var dubs = [
    { language: "Afrikaans", title: "", versions: [] },
    { language: "Albanian", title: "", versions: [] },
    { language: "Arabic", title: "", versions: [
      b("Childhood Voice Institute"),
      b("Image Production House"),
      b("Neo Productions / New Interactive Studio")
    ] },
    { language: "Armenian", title: "", versions: [] },
    { language: "Assamese", title: "", versions: [] },
    { language: "Azerbaijani", title: "", versions: [
      d("Northern Azerbaijani"),
      d("Southern Azerbaijani")
    ] },
    { language: "Bengali", title: "", versions: [
      b("Audio People"),
      b("Octave Studio")
    ] },
    { language: "Bulgarian", title: "", versions: [] },
    { language: "Cantonese", title: "", versions: [
      b("ATV Home"),
      b("Netflix"),
      b("ViuTV")
    ] },
    { language: "Croatian", title: "", versions: [
      b("Project 6 Studio"),
      b("VSI-NET")
    ] },
    { language: "Czech", title: "", versions: [] },
    { language: "Danish", title: "", versions: [] },
    { language: "Dari", title: "", versions: [] },
    { language: "Dutch", title: "", versions: [] },
    { language: "English", title: "Help Wanted", versions: [] },
    { language: "Filipino", title: "", versions: [] },
    { language: "Finnish", title: "", versions: [] },
    { language: "French", title: "Employé du mois", verify: true, versions: [] },
    { language: "German", title: "", versions: [] },
    { language: "Gilaki", title: "", versions: [
      b("Filmiiz"),
      b("Haft")
    ] },
    { language: "Greek", title: "", versions: [] },
    { language: "Gujarati", title: "", versions: [
      b("Colors Gujarati"),
      b("ETV Bal Bharat")
    ] },
    { language: "Hebrew", title: "", versions: [] },
    { language: "Hindi", title: "", versions: [
      b("ETV Bal Bharat"),
      b("Viacom18")
    ] },
    { language: "Hungarian", title: "", versions: [] },
    { language: "Icelandic", title: "", versions: [] },
    { language: "Indonesian", title: "", versions: [
      b("GTV / Nickelodeon"),
      b("Lativi")
    ] },
    { language: "Irish", title: "", versions: [] },
    { language: "Italian", title: "", versions: [] },
    { language: "Japanese", title: "", versions: [] },
    { language: "Kannada", title: "", versions: [] },
    { language: "Kazakh", title: "", versions: [] },
    { language: "Korean", title: "", versions: [
      b("EBS"),
      b("Nickelodeon")
    ] },
    { language: "Kurdish", title: "", versions: [
      v("Central Kurdish — Kurdsat", "Kurdsat"),
      v("Central Kurdish — Pelistank TV (original)", "Pelistank TV"),
      v("Central Kurdish — Pelistank TV (redub)", "Pelistank TV"),
      v("Central Kurdish — Pelistank TV (2025)", "Pelistank TV"),
      v("Central Kurdish — Zaro TV", "Zaro TV"),
      v("Northern Kurdish — Filmiiz", "Filmiiz"),
      v("Northern Kurdish — Heshin TV", "Heshin TV"),
      d("Northern Kurdish — Türkiye version")
    ] },
    { language: "Luri", title: "", versions: [] },
    { language: "Macedonian", title: "", versions: [
      b("A1"),
      b("HBO GO"),
      b("MRT 1")
    ] },
    { language: "Malay", title: "", versions: [] },
    { language: "Malayalam", title: "", versions: [] },
    { language: "Mandarin", title: "", versions: [
      d("Mainland China"),
      v("Taiwan — Nickelodeon", "Nickelodeon"),
      v("Taiwan — YoYo TV", "YoYo TV")
    ] },
    { language: "Māori", title: "", versions: [
      b("Māori Television"),
      b("Nickelodeon")
    ] },
    { language: "Marathi", title: "", versions: [] },
    { language: "Mazandarani", title: "", versions: [] },
    { language: "Norwegian", title: "", versions: [
      b("Eurotroll / NorDubb"),
      b("Sun Studio")
    ] },
    { language: "Odia", title: "", versions: [] },
    { language: "Persian", title: "", note: "Numerous versions exist; not yet catalogued.", versions: [] },
    { language: "Polish", title: "", versions: [] },
    { language: "Portuguese", title: "", versions: [
      d("Brazilian Portuguese"),
      v("European Portuguese — Nickelodeon", "Nickelodeon"),
      v("European Portuguese — SIC", "SIC")
    ] },
    { language: "Punjabi", title: "", versions: [] },
    { language: "Romanian", title: "", versions: [] },
    { language: "Russian", title: "", versions: [] },
    { language: "Semnani", title: "", versions: [] },
    { language: "Serbian", title: "", versions: [
      b("B92"),
      b("Gold Digi Net DVD"),
      b("Gold Digi Net TV")
    ] },
    { language: "Sinhala", title: "", versions: [] },
    { language: "Slovak", title: "", versions: [
      b("Markíza"),
      b("Štúdio FINIKIN")
    ] },
    { language: "Slovene", title: "", versions: [
      b("Nickelodeon"),
      b("Studio Ritem"),
      b("TV3")
    ] },
    { language: "Spanish", title: "Se Busca Ayudante", verify: true, versions: [
      d("Latin American Spanish"),
      d("European Spanish")
    ] },
    { language: "Swedish", title: "", versions: [] },
    { language: "Tamil", title: "", versions: [
      b("Chutti TV"),
      b("ETV Bal Bharat"),
      b("Nickelodeon")
    ] },
    { language: "Telugu", title: "", versions: [
      b("ETV Bal Bharat"),
      b("Kushi TV"),
      b("Nickelodeon")
    ] },
    { language: "Thai", title: "", versions: [] },
    { language: "Tibetan", title: "", versions: [] },
    { language: "Turkish", title: "", versions: [
      b("Nickelodeon"),
      b("CNBC-e")
    ] },
    { language: "Ukrainian", title: "", versions: [] },
    { language: "Urdu", title: "", versions: [] },
    { language: "Uyghur", title: "", versions: [] },
    { language: "Vietnamese", title: "", versions: [
      b("Netflix"),
      b("YouTV")
    ] },
    { language: "Welsh", title: "", versions: [] },
    { language: "Zaza", title: "", versions: [] },
    { language: "Zulu", title: "", versions: [] }
  ];

  // ---------- Small utilities ----------
  function byId(id) {
    return document.getElementById(id);
  }

  function makeEl(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function setStatus(message) {
    var status = byId("status-text");
    if (status) status.textContent = message;
  }

  function showError(message) {
    var box = byId("db-error");
    if (box) {
      box.textContent = message;
      box.hidden = false;
    }
  }

  function isValidVideo(url) {
    return typeof url === "string" && /^https:\/\//i.test(url);
  }

  // ---------- Player ----------
  function playVideo(label, url) {
    var frame = byId("player-frame");
    var unavailable = byId("player-unavailable");
    var nowPlaying = byId("now-playing");

    if (nowPlaying) nowPlaying.textContent = "Now playing: " + label;

    if (isValidVideo(url)) {
      if (frame) frame.src = url;
      if (unavailable) unavailable.hidden = true;
      setStatus("Now playing: " + label);
    } else {
      // No legitimate video: leave the iframe alone and show a message.
      if (unavailable) unavailable.hidden = false;
      setStatus("Video unavailable for: " + label);
    }
  }

  // ---------- Statistics ----------
  function updateStats() {
    var totalDubs = 0;
    for (var i = 0; i < dubs.length; i++) {
      var count = dubs[i].versions ? dubs[i].versions.length : 0;
      totalDubs += count > 1 ? count : 1;
    }
    var dubsEl = byId("stat-dubs");
    var langEl = byId("stat-languages");
    var epEl = byId("stat-episodes");
    var statusEl = byId("stat-status");
    if (dubsEl) dubsEl.textContent = String(totalDubs);
    if (langEl) langEl.textContent = String(dubs.length);
    if (epEl) epEl.textContent = String(EPISODE_COUNT);
    if (statusEl) statusEl.textContent = ARCHIVE_STATUS;
  }

  // ---------- Table ----------
  function buildVersionsRow(dub) {
    var tr = makeEl("tr", "versions-row");
    tr.hidden = true;

    var td = makeEl("td");
    td.colSpan = 4;

    var list = makeEl("ul", "version-list");

    dub.versions.forEach(function (ver) {
      var li = makeEl("li", "version-item");

      li.appendChild(makeEl("span", "version-name", ver.name));

      var metaText = "";
      if (ver.studio) {
        if (ver.name.indexOf(ver.studio) === -1) metaText = ver.studio;
      } else {
        metaText = "Studio/broadcaster not yet verified";
      }
      li.appendChild(makeEl("span", "version-meta" + (ver.studio ? "" : " version-note"), metaText));

      var btn = makeEl("button", "xp-btn play", "▶ Play");
      btn.type = "button";
      btn.addEventListener("click", function () {
        playVideo(dub.language + " — " + ver.name, ver.video);
        var player = byId("player-section");
        if (player && player.scrollIntoView) player.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      li.appendChild(btn);

      list.appendChild(li);
    });

    td.appendChild(list);
    tr.appendChild(td);
    return tr;
  }

  function buildRows(dub, index) {
    var rows = [];

    var tr = makeEl("tr", "dub-row" + (index % 2 === 1 ? " alt" : ""));

    // Language
    tr.appendChild(makeEl("td", "lang-cell", dub.language));

    // Dub name
    var titleCell = makeEl("td");
    if (dub.title) {
      titleCell.textContent = dub.title;
    } else {
      titleCell.appendChild(makeEl("span", "unknown", "Title not yet verified"));
    }
    if (dub.verify) {
      titleCell.appendChild(makeEl("span", "verify", "⚠ Needs verification"));
    }
    if (dub.note) {
      titleCell.appendChild(makeEl("span", "verify", dub.note));
    }
    tr.appendChild(titleCell);

    // Versions
    var versionsCell = makeEl("td");
    var hasVersions = Array.isArray(dub.versions) && dub.versions.length > 1;
    var versionsRow = null;

    if (hasVersions) {
      versionsRow = buildVersionsRow(dub);
      var toggle = makeEl("button", "xp-btn", "▶ Show versions");
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", "false");
      toggle.addEventListener("click", function () {
        var opening = versionsRow.hidden;
        versionsRow.hidden = !opening;
        toggle.textContent = opening ? "▼ Hide versions" : "▶ Show versions";
        toggle.setAttribute("aria-expanded", opening ? "true" : "false");
      });
      versionsCell.appendChild(toggle);
    } else {
      versionsCell.appendChild(makeEl("span", "dash", "—"));
    }
    tr.appendChild(versionsCell);

    // Play
    var playCell = makeEl("td");
    var playBtn = makeEl("button", "xp-btn play", "▶ Play");
    playBtn.type = "button";
    playBtn.addEventListener("click", function () {
      var label = dub.language + (dub.title ? " — " + dub.title : "");
      playVideo(label, dub.video);
      var player = byId("player-section");
      if (player && player.scrollIntoView) player.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    playCell.appendChild(playBtn);
    tr.appendChild(playCell);

    rows.push(tr);
    if (versionsRow) rows.push(versionsRow);
    return rows;
  }

  function buildTable() {
    var tbody = byId("dub-tbody");
    if (!tbody) throw new Error("Table body #dub-tbody not found.");

    tbody.innerHTML = "";
    var fragment = document.createDocumentFragment();

    dubs.forEach(function (dub, index) {
      buildRows(dub, index).forEach(function (row) {
        fragment.appendChild(row);
      });
    });

    tbody.appendChild(fragment);
  }

  // ---------- Info toggle ----------
  function setupInfoToggle() {
    var toggle = byId("info-toggle");
    var box = byId("info-box");
    if (!toggle || !box) return;

    toggle.addEventListener("click", function () {
      var opening = box.hidden;
      box.hidden = !opening;
      toggle.textContent = opening ? "▲ Hide information" : "▼ Show more information";
      toggle.setAttribute("aria-expanded", opening ? "true" : "false");
    });
  }

  function openInfo() {
    var toggle = byId("info-toggle");
    var box = byId("info-box");
    if (box && box.hidden && toggle) toggle.click();
    var section = byId("info-section");
    if (section && section.scrollIntoView) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- Menu ----------
  function setupMenu() {
    var items = document.querySelectorAll(".menu-item");
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function (event) {
        var action = event.currentTarget.getAttribute("data-action");
        if (action === "all") {
          var db = byId("database");
          if (db && db.scrollIntoView) db.scrollIntoView({ behavior: "smooth", block: "start" });
          setStatus("Showing all dubs");
        } else if (action === "about") {
          openInfo();
          setStatus("About this archive");
        } else if (action === "tv") {
          setStatus("TV Broadcasts — coming soon");
        } else if (action === "cast") {
          setStatus("Cast Information — coming soon");
        } else if (action === "history") {
          setStatus("Broadcast History — coming soon");
        }
      });
    }
  }

  // ---------- Start ----------
  function init() {
    try {
      var nowPlaying = byId("now-playing");
      if (nowPlaying) nowPlaying.textContent = "Now playing: " + TEST_LABEL;
      var frame = byId("player-frame");
      if (frame) frame.src = TEST_VIDEO;

      updateStats();
      buildTable();
      setupInfoToggle();
      setupMenu();
      setStatus("Done — " + dubs.length + " languages loaded");
    } catch (err) {
      console.error(err);
      showError("Something went wrong while building the database table. Try reloading the page. (" + err.message + ")");
      setStatus("Error");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
