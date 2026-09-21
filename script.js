// HELP WANTED — International Dub Archive
// Builds the dub table and handles the interactive controls.

(function () {
    "use strict";

    function buildDubTable() {
        const tableBody = document.getElementById("dubTableBody");
        const status = document.getElementById("dubStatus");
        const error = document.getElementById("dubError");

        // Always read the database explicitly from window.
        const dubDatabase = window.dubs;

        if (!tableBody) {
            console.error("dubTableBody was not found.");
            return;
        }

        // Clear any previous content.
        tableBody.innerHTML = "";

        // Check that dub.js loaded correctly.
        if (!Array.isArray(dubDatabase)) {
            console.error("window.dubs is missing or is not an array.");

            if (status) {
                status.style.display = "none";
            }

            if (error) {
                error.style.display = "block";
                error.textContent =
                    "The dub database could not be loaded. Please check that dub.js exists in the same folder as this page.";
            }

            return;
        }

        if (status) {
            status.style.display = "none";
        }

        if (error) {
            error.style.display = "none";
        }

        dubDatabase.forEach(function (dub, index) {
            const mainRow = document.createElement("tr");

            const languageCell = document.createElement("td");
            languageCell.className = "language-cell";
            languageCell.textContent = dub.language || "Unknown";

            const titleCell = document.createElement("td");
            titleCell.className = "title-cell";
            titleCell.textContent = dub.title || "Untitled";

            const versionsCell = document.createElement("td");
            versionsCell.className = "versions-cell";

            const playCell = document.createElement("td");
            playCell.className = "play-cell";

            /*
             * VERSION BUTTON
             */
            if (Array.isArray(dub.versions) && dub.versions.length > 1) {
                const versionButton = document.createElement("button");

                versionButton.className = "version-button";
                versionButton.type = "button";
                versionButton.textContent = "▶ Show versions";

                versionButton.onclick = function () {
                    toggleVersions(index, versionButton);
                };

                versionsCell.appendChild(versionButton);
            } else {
                versionsCell.textContent = "—";
            }

            /*
             * MAIN PLAY BUTTON
             */
            const playButton = document.createElement("button");

            playButton.className = "play-button";
            playButton.type = "button";
            playButton.textContent = "▶ Play";

            playButton.onclick = function () {
                changeVideo(
                    dub.video || "",
                    dub.title || dub.language || "Dub"
                );
            };

            playCell.appendChild(playButton);

            mainRow.appendChild(languageCell);
            mainRow.appendChild(titleCell);
            mainRow.appendChild(versionsCell);
            mainRow.appendChild(playCell);

            tableBody.appendChild(mainRow);

            /*
             * VERSION ROWS
             */
            if (Array.isArray(dub.versions) && dub.versions.length > 1) {
                const versionRow = document.createElement("tr");

                versionRow.className = "version-row";
                versionRow.id = "versions-" + index;

                const versionCell = document.createElement("td");

                versionCell.colSpan = 4;
                versionCell.className = "version-list-cell";

                const versionList = document.createElement("div");
                versionList.className = "version-list";

                dub.versions.forEach(function (version) {
                    const versionItem = document.createElement("div");
                    versionItem.className = "version-item";

                    /*
                     * Version information
                     */
                    const versionInfo = document.createElement("div");
                    versionInfo.className = "version-info";

                    const versionName = document.createElement("strong");

                    versionName.textContent =
                        version.name ||
                        version.title ||
                        "Unnamed version";

                    versionInfo.appendChild(versionName);

                    if (version.studio) {
                        const studio = document.createElement("span");

                        studio.className = "version-studio";
                        studio.textContent = " — " + version.studio;

                        versionInfo.appendChild(studio);
                    }

                    versionItem.appendChild(versionInfo);

                    /*
                     * Version play button
                     */
                    const versionPlayButton =
                        document.createElement("button");

                    versionPlayButton.className = "play-button";
                    versionPlayButton.type = "button";
                    versionPlayButton.textContent = "▶ Play";

                    versionPlayButton.onclick = function () {
                        changeVideo(
                            version.video || "",
                            version.name ||
                            version.title ||
                            dub.title ||
                            dub.language ||
                            "Dub"
                        );
                    };

                    versionItem.appendChild(versionPlayButton);
                    versionList.appendChild(versionItem);
                });

                versionCell.appendChild(versionList);
                versionRow.appendChild(versionCell);
                tableBody.appendChild(versionRow);
            }
        });

        /*
         * Update statistics if the elements exist.
         */
        const languageCount =
            document.getElementById("languageCount");

        if (languageCount) {
            languageCount.textContent = dubDatabase.length;
        }
    }


    /*
     * SHOW / HIDE VERSIONS
     */
    window.toggleVersions = function (index, button) {
        const row = document.getElementById("versions-" + index);

        if (!row) {
            console.warn("Version row not found:", index);
            return;
        }

        const isOpen = row.classList.contains("open");

        if (isOpen) {
            row.classList.remove("open");

            if (button) {
                button.textContent = "▶ Show versions";
            }
        } else {
            row.classList.add("open");

            if (button) {
                button.textContent = "▼ Hide versions";
            }
        }
    };


    /*
     * SHOW / HIDE ARCHIVE INFORMATION
     */
    window.toggleArchiveInfo = function () {
        const info = document.getElementById("archiveInfo");

        if (!info) {
            return;
        }

        const isHidden =
            info.style.display === "none" ||
            getComputedStyle(info).display === "none";

        info.style.display = isHidden ? "block" : "none";
    };


    /*
     * CHANGE THE VIDEO PLAYER
     */
    window.changeVideo = function (url, title) {
        const player = document.getElementById("videoPlayer");
        const playerContainer =
            document.getElementById("videoContainer");

        const unavailable =
            document.getElementById("videoUnavailable");

        if (!url) {
            console.warn("No video URL provided for:", title);

            if (unavailable) {
                unavailable.textContent =
                    "Video unavailable for this version.";
                unavailable.style.display = "block";
            }

            if (player) {
                player.style.display = "none";
            }

            return;
        }

        if (unavailable) {
            unavailable.style.display = "none";
        }

        if (player) {
            player.style.display = "block";
            player.src = url;
        }

        /*
         * Update the player title if the page has one.
         */
        const playerTitle =
            document.getElementById("playerTitle");

        if (playerTitle) {
            playerTitle.textContent =
                title || "Help Wanted";
        }

        /*
         * Scroll back to the player when a dub is selected.
         */
        if (playerContainer) {
            playerContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };


    /*
     * START THE TABLE
     *
     * dub.js MUST load before this function runs.
     */
    function startArchive() {
        console.log("HELP WANTED archive starting...");

        console.log(
            "window.dubs:",
            Array.isArray(window.dubs)
                ? window.dubs.length + " entries"
                : "NOT FOUND"
        );

        buildDubTable();
    }


    /*
     * Wait until the HTML is ready.
     */
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            startArchive
        );
    } else {
        startArchive();
    }

})();