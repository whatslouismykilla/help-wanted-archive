/* =========================================================
   HELP WANTED — AVAILABILITY AND VERSION PLAYBACK ENHANCEMENTS

   Dubs are intentionally unavailable until an authorized source
   is explicitly enabled in dub.js by setting dub.available = true.
   ========================================================= */

"use strict";

function isDubAvailable(dub) {
    return dub && dub.available === true;
}

function addVersionPlaybackOptions() {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

    dubs.forEach(function (dub, index) {
        const mainRow = document.querySelector(
            "#dubTableBody tr.main-row:nth-of-type(" + (index + 1) + ")"
        );

        if (!mainRow) {
            return;
        }

        const mainPlayButton = mainRow.querySelector(".play-button");
        if (mainPlayButton) {
            mainPlayButton.disabled = true;
            mainPlayButton.textContent = "Unavailable";
            mainPlayButton.title = "This dub is currently unavailable.";
            mainPlayButton.setAttribute("aria-label", "Dub unavailable");
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
            playButton.textContent = "Unavailable";
            playButton.disabled = true;
            playButton.title = "This dub version is currently unavailable.";
            playButton.setAttribute("aria-label", "Dub version unavailable");

            playButton.addEventListener("click", function (event) {
                event.stopPropagation();
                changeVideo(
                    version.video || dub.video || "",
                    dub.language + " — " + (version.name || "Selected version")
                );
            });

            versionBox.appendChild(playButton);
        });
    });
}

document.addEventListener("DOMContentLoaded", addVersionPlaybackOptions);
