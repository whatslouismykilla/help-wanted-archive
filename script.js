/* =========================================================
   HELP WANTED — DUB ARCHIVE SCRIPT
========================================================= */

"use strict";

function isAvailable(item) {
    return item && item.available === true;
}

function buildDubTable() {
    const tableBody = document.getElementById("dubTableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";
    let multipleVersions = 0;

    dubs.forEach(function (dub, index) {
        const mainRow = document.createElement("tr");

        mainRow.className =
            "main-row" +
            (dub.realFandub ? " real-fandub-row" : "");

        mainRow.tabIndex = 0;
        mainRow.setAttribute("role", "button");
        mainRow.setAttribute("aria-expanded", "false");
        mainRow.title = "Click for more information";

        const languageCell = document.createElement("td");
        languageCell.className = "language";
        languageCell.textContent =
            dub.flag ? dub.flag + " " + dub.language : dub.language;

        const titleCell = document.createElement("td");
        titleCell.className = "show-title";
        titleCell.textContent = dub.title || "Unknown";

        const versionsCell = document.createElement("td");

        if (Array.isArray(dub.versions) && dub.versions.length > 1) {
            multipleVersions++;

            const versionButton = document.createElement("button");
            versionButton.className = "version-button";
            versionButton.type = "button";
            versionButton.textContent = "▶ Show versions";

            const versionId = "versions-" + index;

            versionButton.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleVersions(versionId, versionButton);
            });

            versionsCell.appendChild(versionButton);

            const count = document.createElement("span");
            count.className = "version-count";
            count.textContent = " " + dub.versions.length;
            versionsCell.appendChild(count);
        } else {
            versionsCell.textContent = "—";
        }

        const playCell = document.createElement("td");

        if (Array.isArray(dub.versions) && dub.versions.length > 1) {
            const chooseButton = document.createElement("button");
            chooseButton.className = "version-button";
            chooseButton.type = "button";
            chooseButton.textContent = "Choose version";

            chooseButton.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleVersions("versions-" + index, chooseButton);
            });

            playCell.appendChild(chooseButton);
        } else if (isAvailable(dub)) {
            const playButton = document.createElement("button");
            playButton.className = "play-button";
            playButton.type = "button";
            playButton.textContent = "▶ Play";

            playButton.addEventListener("click", function (event) {
                event.stopPropagation();

                changeVideo(
                    dub.video || "",
                    dub.language + " — " + dub.title
                );
            });

            playCell.appendChild(playButton);
        } else {
            const unavailable = document.createElement("span");
            unavailable.className = "unavailable-label";
            unavailable.textContent = "Unavailable";
            playCell.appendChild(unavailable);
        }

        mainRow.appendChild(languageCell);
        mainRow.appendChild(titleCell);
        mainRow.appendChild(versionsCell);
        mainRow.appendChild(playCell);

        tableBody.appendChild(mainRow);

        const detailsId = "details-" + index;

        mainRow.addEventListener("click", function (event) {
            if (event.target.closest("button")) return;
            toggleDetails(detailsId, mainRow);
        });

        mainRow.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleDetails(detailsId, mainRow);
            }
        });

        if (Array.isArray(dub.versions) && dub.versions.length > 1) {
            const versionRow = document.createElement("tr");
            versionRow.className = "version-row";
            versionRow.id = "versions-" + index;

            const versionCell = document.createElement("td");
            versionCell.colSpan = 4;

            const versionList = document.createElement("div");
            versionList.className = "version-list";

            const heading = document.createElement("h3");
            heading.className = "version-list-title";
            heading.textContent = dub.language + " versions";
            versionList.appendChild(heading);

            dub.versions.forEach(function (version) {
                const versionBox = document.createElement("div");
                versionBox.className = "version";

                const versionName = document.createElement("div");
                versionName.className = "version-name";
                versionName.textContent =
                    version.name || "Documented version";

                const versionInfo = document.createElement("div");
                versionInfo.className = "version-info";
                versionInfo.textContent = version.info || "";

                versionBox.appendChild(versionName);
                versionBox.appendChild(versionInfo);

                if (isAvailable(version)) {
                    const playButton = document.createElement("button");
                    playButton.className = "play-button";
                    playButton.type = "button";
                    playButton.textContent = "▶ Play";

                    playButton.addEventListener("click", function (event) {
                        event.stopPropagation();

                        changeVideo(
                            version.video || "",
                            dub.language + " — " + version.name
                        );
                    });

                    versionBox.appendChild(playButton);
                } else {
                    const unavailable = document.createElement("span");
                    unavailable.className = "unavailable-label";
                    unavailable.textContent = "Unavailable";
                    versionBox.appendChild(unavailable);
                }

                versionList.appendChild(versionBox);
            });

            versionCell.appendChild(versionList);
            versionRow.appendChild(versionCell);
            tableBody.appendChild(versionRow);
        }

        const detailsRow = document.createElement("tr");

        detailsRow.className =
            "details-row" +
            (dub.realFandub ? " real-fandub-details" : "");

        detailsRow.id = detailsId;

        const detailsCell = document.createElement("td");
        detailsCell.colSpan = 4;

        const detailsPanel = document.createElement("div");
        detailsPanel.className = "details-panel";

        const detailsTitle = document.createElement("div");
        detailsTitle.className = "details-panel-title";
        detailsTitle.textContent =
            "ℹ More information — " + dub.language;

        detailsPanel.appendChild(detailsTitle);

        const status = document.createElement("div");
        status.className = "detail-item";

        const statusLabel = document.createElement("strong");
        statusLabel.textContent = "Status: ";

        status.appendChild(statusLabel);
        status.appendChild(
            document.createTextNode(
                isAvailable(dub) ? "Available" : "Currently unavailable"
            )
        );

        detailsPanel.appendChild(status);

        const details = dub.details || {};

        const fields = [
            ["Type", details.type],
            ["Completeness", details.completeness],
            ["Channels / distribution", details.distribution],
            ["Notes", details.notes],
            ["Source", details.source]
        ];

        let hasDetails = false;

        fields.forEach(function (field) {
            if (
                field[1] !== undefined &&
                field[1] !== null &&
                field[1] !== ""
            ) {
                hasDetails = true;

                const item = document.createElement("div");
                item.className = "detail-item";

                const label = document.createElement("strong");
                label.textContent = field[0] + ": ";

                const value = document.createElement("span");
                value.textContent =
                    Array.isArray(field[1])
                        ? field[1].join("; ")
                        : field[1];

                item.appendChild(label);
                item.appendChild(value);
                detailsPanel.appendChild(item);
            }
        });

        if (!hasDetails) {
            const empty = document.createElement("div");
            empty.className = "detail-empty";
            empty.textContent =
                "No additional information has been added yet.";
            detailsPanel.appendChild(empty);
        }

        detailsCell.appendChild(detailsPanel);
        detailsRow.appendChild(detailsCell);
        tableBody.appendChild(detailsRow);
    });

    const languageCount = document.getElementById("languageCount");
    const versionCount = document.getElementById("versionCount");

    if (languageCount) languageCount.textContent = dubs.length;
    if (versionCount) versionCount.textContent = multipleVersions;
}

function toggleVersions(id, button) {
    const row = document.getElementById(id);
    if (!row) return;

    if (row.classList.contains("open")) {
        row.classList.remove("open");
        button.textContent = "▶ Show versions";
    } else {
        row.classList.add("open");
        button.textContent = "▼ Hide versions";
    }
}

function toggleDetails(id, mainRow) {
    const row = document.getElementById(id);
    if (!row) return;

    const isOpen = row.classList.contains("open");

    row.classList.toggle("open");

    mainRow.classList.toggle("selected", !isOpen);
    mainRow.setAttribute("aria-expanded", String(!isOpen));
}

function toggleArchiveInfo() {
    const info = document.getElementById("archiveInfo");
    const button = document.getElementById("showMoreButton");

    if (!info || !button) return;

    if (
        info.style.display === "none" ||
        info.style.display === ""
    ) {
        info.style.display = "block";
        button.textContent = "▲ Show less information";
    } else {
        info.style.display = "none";
        button.textContent = "▼ Show more information";
    }
}

function changeVideo(url, title) {
    const player = document.getElementById("videoPlayer");
    const nowPlaying = document.getElementById("nowPlaying");

    if (!player || !nowPlaying) return;

    nowPlaying.textContent = title;

    if (!url) {
        player.innerHTML = `
            <div class="video-placeholder">
                <div class="video-placeholder-icon">▶</div>
                <strong>No video source attached</strong>
                <span>Add a video URL to this dub entry in dub.js.</span>
            </div>
        `;
        return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.allowFullscreen = true;
    iframe.setAttribute("allow", "fullscreen");
    iframe.referrerPolicy = "no-referrer-when-downgrade";

    player.innerHTML = "";
    player.appendChild(iframe);

    const playerWindow = document.querySelector(".player-window");
    if (playerWindow) {
        playerWindow.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

    buildDubTable();
});