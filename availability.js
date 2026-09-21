/* =========================================================
   HELP WANTED — AVAILABILITY, ENGLISH, AND FAN-DUB CONTROLS

   Every dub remains unavailable until an authorized source is
   explicitly enabled in dub.js by setting available: true.
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

function addEnglishDub() {
    if (!dubs.some(function (dub) { return dub.language === "English"; })) {
        dubs.unshift({
            language: "English",
            flag: "🇺🇸",
            title: "SpongeBob SquarePants",
            versions: [],
            available: false
        });
    }
}

function addVersionPlaybackOptions() {
    const mainRows = document.querySelectorAll("#dubTableBody tr.main-row");

    dubs.forEach(function (dub, index) {
        const mainRow = mainRows[index];
        if (!mainRow) {
            return;
        }

        const mainPlayButton = mainRow.querySelector(".play-button");
        if (mainPlayButton && !isDubAvailable(dub)) {
            markUnavailable(mainPlayButton, "This dub");
        }

        if (!Array.isArray(dub.versions) || dub.versions.length <= 1) {
            return;
        }

        const versionRow = document.getElementById("versions-" + index);
        if (!versionRow) {
            return;
        }

        const versionBoxes = versionRow.querySelectorAll(".version");
        dub.versions.forEach(function (version, versionIndex) {
            const versionBox = versionBoxes[versionIndex];
            if (!versionBox) {
                return;
            }

            const playButton = document.createElement("button");
            playButton.type = "button";
            playButton.className = "play-button version-play-button";
            playButton.textContent = "▶ Play this version";

            if (!isDubAvailable(dub, version)) {
                markUnavailable(playButton, "This version");
            } else {
                playButton.addEventListener("click", function (event) {
                    event.stopPropagation();
                    changeVideo(
                        version.video,
                        dub.language + " — " + (version.name || "Selected version")
                    );
                });
            }

            versionBox.appendChild(playButton);
        });
    });
}

function getFanDubRows(mainRow) {
    const rows = [mainRow];
    let row = mainRow.nextElementSibling;

    while (row && (row.classList.contains("version-row") || row.classList.contains("details-row"))) {
        rows.push(row);
        row = row.nextElementSibling;
    }

    return rows;
}

function setupFanDubDropdown() {
    const table = document.querySelector(".dub-table");
    const fanRows = Array.from(document.querySelectorAll("#dubTableBody tr.main-row.real-fandub-row"));

    if (!table || !fanRows.length) {
        return;
    }

    const oldMenu = document.getElementById("fanDubMenu");
    if (oldMenu) {
        oldMenu.remove();
    }

    const menu = document.createElement("div");
    menu.id = "fanDubMenu";
    menu.className = "fan-dub-menu";

    const label = document.createElement("label");
    label.htmlFor = "fanDubSelect";
    label.textContent = "🎙️ Fan dubs: ";

    const select = document.createElement("select");
    select.id = "fanDubSelect";
    select.className = "xp-button";
    select.innerHTML = "<option value=\"\">Select a fan dub</option>";

    fanRows.forEach(function (row, index) {
        const dub = dubs.find(function (entry) {
            return entry.realFandub && entry.language === row.querySelector(".language").textContent.replace(/^\S+\s/, "");
        });

        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = dub
            ? dub.language + " — " + dub.title
            : row.querySelector(".language").textContent + " — " + row.querySelector(".show-title").textContent;
        select.appendChild(option);
    });

    const allFanRows = fanRows.map(getFanDubRows);
    allFanRows.forEach(function (rows) {
        rows.forEach(function (row) {
            row.hidden = true;
        });
    });

    select.addEventListener("change", function () {
        allFanRows.forEach(function (rows) {
            rows.forEach(function (row) {
                row.hidden = true;
            });
        });

        const selectedRows = allFanRows[Number(select.value)];
        if (selectedRows) {
            selectedRows.forEach(function (row) {
                row.hidden = false;
            });
        }
    });

    menu.appendChild(label);
    menu.appendChild(select);
    table.parentNode.insertBefore(menu, table);
}

document.addEventListener("DOMContentLoaded", function () {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

    addEnglishDub();
    buildDubTable();
    addVersionPlaybackOptions();
    setupFanDubDropdown();
});
