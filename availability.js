/* =========================================================
   HELP WANTED — AVAILABILITY AND FAN-DUB CONTROLS
   ========================================================= */

"use strict";

function isDubAvailable(dub, version) {
    const source = version || dub;
    return Boolean(
        dub &&
        source &&
        source.available === true &&
        typeof source.video === "string" &&
        source.video.trim()
    );
}

function markUnavailable(button, label) {
    button.disabled = true;
    button.textContent = "Unavailable";
    button.title = label + " is currently unavailable.";
    button.setAttribute("aria-label", label + " unavailable");
}

function markDubsUnavailable() {
    const rows = document.querySelectorAll("#dubTableBody tr.main-row");

    dubs.forEach(function (dub, index) {
        const row = rows[index];
        if (!row) return;

        const playButton = row.querySelector(".play-button");
        if (playButton && !isDubAvailable(dub)) {
            markUnavailable(playButton, "This dub");
        }

        if (!Array.isArray(dub.versions) || dub.versions.length <= 1) return;

        const versionRow = document.getElementById("versions-" + index);
        if (!versionRow) return;

        versionRow.querySelectorAll(".version").forEach(function (box, versionIndex) {
            const version = dub.versions[versionIndex];
            const versionButton = document.createElement("button");
            versionButton.type = "button";
            versionButton.className = "play-button version-play-button";
            versionButton.textContent = "▶ Play this version";

            if (!isDubAvailable(dub, version)) {
                markUnavailable(versionButton, "This version");
            } else {
                versionButton.addEventListener("click", function (event) {
                    event.stopPropagation();
                    changeVideo(version.video, dub.language + " — " + (version.name || "Selected version"));
                });
            }

            box.appendChild(versionButton);
        });
    });
}

function loadSupplementalDubs() {
    return new Promise(function (resolve) {
        const script = document.createElement("script");
        script.src = "dubs.js";
        script.onload = resolve;
        script.onerror = resolve;
        document.head.appendChild(script);
    });
}

function rowsForDub(index) {
    const mainRow = document.querySelectorAll("#dubTableBody tr.main-row")[index];
    if (!mainRow) return [];

    const rows = [mainRow];
    let row = mainRow.nextElementSibling;
    while (row && (row.classList.contains("version-row") || row.classList.contains("details-row"))) {
        rows.push(row);
        row = row.nextElementSibling;
    }
    return rows;
}

function injectFanDubStyles() {
    if (document.getElementById("fanDubStyles")) return;

    const style = document.createElement("style");
    style.id = "fanDubStyles";
    style.textContent = `
        .fan-dub-menu {
            margin: 18px 0 12px;
            padding: 20px 22px 22px;
            color: #fff;
            background: linear-gradient(135deg, #713492, #a8399e 55%, #ee6b1c);
            border: 4px solid #5c247c;
            box-shadow: 4px 4px 0 rgba(72, 35, 87, .3), inset 2px 2px rgba(255,255,255,.35);
            text-align: center;
        }
        .fan-dub-menu-title {
            display: block;
            margin-bottom: 6px;
            font-size: 22px;
            font-weight: bold;
            letter-spacing: 1px;
            text-shadow: 2px 2px #4d226c;
        }
        .fan-dub-menu-description {
            display: block;
            margin-bottom: 14px;
            font-size: 13px;
        }
        .fan-dub-menu select {
            width: min(100%, 620px);
            min-height: 52px;
            padding: 10px 14px;
            color: #4c2461;
            background: #fffef2;
            border: 3px solid #ffad21;
            border-radius: 4px;
            font: bold 16px Tahoma, Arial, sans-serif;
            cursor: pointer;
        }
        @media (max-width: 600px) {
            .fan-dub-menu { padding: 16px 12px 18px; }
            .fan-dub-menu-title { font-size: 18px; }
            .fan-dub-menu select { font-size: 14px; }
        }
    `;
    document.head.appendChild(style);
}

function setupFanDubDropdown() {
    const tableWrapper = document.querySelector(".table-wrapper");
    const tableBody = document.getElementById("dubTableBody");
    if (!tableWrapper || !tableBody) return;

    const oldMenu = document.getElementById("fanDubMenu");
    if (oldMenu) oldMenu.remove();

    const fanIndices = dubs.reduce(function (indices, dub, index) {
        if (dub.realFandub) indices.push(index);
        return indices;
    }, []);

    if (!fanIndices.length) return;

    injectFanDubStyles();

    const menu = document.createElement("section");
    menu.id = "fanDubMenu";
    menu.className = "fan-dub-menu";

    const title = document.createElement("strong");
    title.className = "fan-dub-menu-title";
    title.textContent = "🎙️ Fan Dub Archive";

    const description = document.createElement("span");
    description.className = "fan-dub-menu-description";
    description.textContent = "Official dubs are listed above. Choose a fan dub below to view its details.";

    const select = document.createElement("select");
    select.id = "fanDubSelect";
    select.setAttribute("aria-label", "Choose a fan dub");

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a fan dub...";
    select.appendChild(defaultOption);

    fanIndices.forEach(function (index) {
        const dub = dubs[index];
        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = dub.language + " — " + (dub.title || "Untitled fan dub");
        select.appendChild(option);

        rowsForDub(index).forEach(function (row) {
            row.hidden = true;
        });
    });

    select.addEventListener("change", function () {
        fanIndices.forEach(function (index) {
            rowsForDub(index).forEach(function (row) { row.hidden = true; });
        });

        if (select.value !== "") {
            rowsForDub(Number(select.value)).forEach(function (row) { row.hidden = false; });
        }
    });

    menu.appendChild(title);
    menu.appendChild(description);
    menu.appendChild(select);
    tableWrapper.parentNode.insertBefore(menu, tableWrapper.nextSibling);
}

document.addEventListener("DOMContentLoaded", async function () {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) return;

    await loadSupplementalDubs();
    buildDubTable();
    markDubsUnavailable();
    setupFanDubDropdown();
});
