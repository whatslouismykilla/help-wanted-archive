/* =========================================================
   HELP WANTED — AVAILABILITY ENHANCEMENTS

   dubs.js supplies supplemental entries, including English. It is
   loaded here before the table is rebuilt so the database remains
   defined in the data files rather than being injected inline.
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
        if (!row) {
            return;
        }

        const playButton = row.querySelector(".play-button");
        if (playButton && !isDubAvailable(dub)) {
            markUnavailable(playButton, "This dub");
        }

        if (!Array.isArray(dub.versions) || dub.versions.length <= 1) {
            return;
        }

        const versionRow = document.getElementById("versions-" + index);
        if (!versionRow) {
            return;
        }

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
                    changeVideo(
                        version.video,
                        dub.language + " — " + (version.name || "Selected version")
                    );
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

document.addEventListener("DOMContentLoaded", async function () {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

    await loadSupplementalDubs();
    buildDubTable();
    markDubsUnavailable();
});
