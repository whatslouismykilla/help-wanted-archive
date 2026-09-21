/* =========================================================
   HELP WANTED — AVAILABILITY AND VERSION PLAYBACK ENHANCEMENTS

   Every dub is unavailable until an authorized source is explicitly
   enabled in dub.js by setting available: true.
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

function addVersionPlaybackOptions() {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

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

document.addEventListener("DOMContentLoaded", addVersionPlaybackOptions);
