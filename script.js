function setupAdblockNotice() {
    const modal = document.getElementById("adblockNotice");

    if (!modal) {
        return;
    }

    const closeButton = document.getElementById("adblockNoticeClose");
    const dismissButton = document.getElementById("adblockNoticeDismiss");
    const continueButton = document.getElementById("adblockNoticeContinue");

    const storageKey = "helpWantedAdblockNoticeDismissed";

    let permanentlyDismissed = false;

    try {
        permanentlyDismissed = localStorage.getItem(storageKey) === "1";
    } catch (error) {
        permanentlyDismissed = false;
    }

    if (permanentlyDismissed) {
        modal.hidden = true;
        return;
    }

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove("modal-open");
    }

    function dismissPermanently() {
        try {
            localStorage.setItem(storageKey, "1");
        } catch (error) {
            // Storage may be disabled. The popup can still be closed normally.
        }

        closeModal();
    }

    modal.hidden = false;
    document.body.classList.add("modal-open");

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    if (continueButton) {
        continueButton.addEventListener("click", closeModal);
    }

    if (dismissButton) {
        dismissButton.addEventListener("click", dismissPermanently);
    }

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) {
            closeModal();
        }
    });
}


/* =========================================================
   DUB TABLE
   ========================================================= */

function getDubEntries(includeFanDubs) {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return [];
    }

    return dubs.filter(function (dub) {
        const isFanDub = Boolean(dub.realFandub);

        return includeFanDubs ? isFanDub : !isFanDub;
    });
}


function getDubLanguage(dub) {
    return dub.language || dub.lang || "Unknown";
}


function getDubTitle(dub) {
    return dub.title || dub.name || "Untitled";
}


function getDubVersions(dub) {
    if (Array.isArray(dub.versions)) {
        return dub.versions;
    }

    return [];
}


function getVideoUrl(version) {
    return version.video || version.url || version.link || "";
}


function getVersionTitle(version, index) {
    return version.title ||
        version.name ||
        version.version ||
        ("Version " + (index + 1));
}


function escapeHtml(value) {
    return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function renderDubTable(tableBody, entries, tablePrefix) {
    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    entries.forEach(function (dub, localIndex) {
        const globalIndex = dubs.indexOf(dub);
        const dubIndex = globalIndex >= 0 ? globalIndex : localIndex;

        const language = getDubLanguage(dub);
        const title = getDubTitle(dub);
        const versions = getDubVersions(dub);

        const hasVersions = versions.length > 0;

        const row = document.createElement("tr");

        row.className = "main-row";
        row.dataset.dubIndex = String(dubIndex);

        const languageCell = document.createElement("td");
        languageCell.textContent = language;

        const titleCell = document.createElement("td");
        titleCell.textContent = title;

        const versionsCell = document.createElement("td");

        if (hasVersions) {
            const versionButton = document.createElement("button");

            versionButton.className = "toggle-button";
            versionButton.type = "button";
            versionButton.textContent =
                versions.length + " version" +
                (versions.length === 1 ? "" : "s");

            versionButton.addEventListener("click", function () {
                toggleVersions(tablePrefix, dubIndex);
            });

            versionsCell.appendChild(versionButton);
        } else {
            versionsCell.textContent = "—";
        }

        const playCell = document.createElement("td");

        const playButton = document.createElement("button");

        playButton.className = "play-button";
        playButton.type = "button";
        playButton.textContent = "▶ Play";

        playButton.addEventListener("click", function () {
            changeVideo(dubIndex);
        });

        playCell.appendChild(playButton);

        row.appendChild(languageCell);
        row.appendChild(titleCell);
        row.appendChild(versionsCell);
        row.appendChild(playCell);

        tableBody.appendChild(row);

        if (hasVersions) {
            const versionsRow = document.createElement("tr");

            versionsRow.className = "version-row";
            versionsRow.id = tablePrefix + "-versions-" + dubIndex;
            versionsRow.dataset.dubIndex = String(dubIndex);
            versionsRow.style.display = "none";

            const versionsCellFull = document.createElement("td");

            versionsCellFull.colSpan = 4;

            versions.forEach(function (version, versionIndex) {
                const versionContainer = document.createElement("div");

                versionContainer.className = "version-item";

                const versionName = document.createElement("span");

                versionName.className = "version-name";
                versionName.textContent =
                    getVersionTitle(version, versionIndex);

                const versionPlayButton = document.createElement("button");

                versionPlayButton.className =
                    "play-button version-play-button";

                versionPlayButton.type = "button";
                versionPlayButton.textContent = "▶ Play";

                versionPlayButton.dataset.versionIndex =
                    String(versionIndex);

                versionPlayButton.addEventListener("click", function () {
                    const url = getVideoUrl(version);

                    if (url) {
                        window.open(url, "_blank");
                    }
                });

                versionContainer.appendChild(versionName);
                versionContainer.appendChild(versionPlayButton);

                versionsCellFull.appendChild(versionContainer);
            });

            versionsRow.appendChild(versionsCellFull);
            tableBody.appendChild(versionsRow);
        }
    });
}


function buildDubTable() {
    const tableBody = document.getElementById("dubTableBody");

    if (!tableBody) {
        return;
    }

    const entries = getDubEntries(false);

    renderDubTable(tableBody, entries, "main");

    updateCounts();
}


function buildFanDubTable() {
    const tableBody = document.getElementById("fanDubTableBody");

    if (!tableBody) {
        return;
    }

    const entries = getDubEntries(true);

    renderDubTable(tableBody, entries, "fan");

    updateCounts();
}


function updateCounts() {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

    const languageCountElement =
        document.getElementById("languageCount");

    const versionCountElement =
        document.getElementById("versionCount");

    if (languageCountElement) {
        languageCountElement.textContent = dubs.length;
    }

    if (versionCountElement) {
        const versionCount = dubs.filter(function (dub) {
            return Array.isArray(dub.versions) &&
                dub.versions.length > 0;
        }).length;

        versionCountElement.textContent = versionCount;
    }
}


function toggleVersions(tablePrefix, dubIndex) {
    const row = document.getElementById(
        tablePrefix + "-versions-" + dubIndex
    );

    if (!row) {
        return;
    }

    if (row.style.display === "none" || row.style.display === "") {
        row.style.display = "table-row";
    } else {
        row.style.display = "none";
    }
}


function toggleDetails(id) {
    const row = document.getElementById(id);

    if (!row) {
        return;
    }

    if (row.style.display === "none" || row.style.display === "") {
        row.style.display = "table-row";
    } else {
        row.style.display = "none";
    }
}


function toggleArchiveInfo(id) {
    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}


function changeVideo(index) {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

    const dub = dubs[index];

    if (!dub) {
        return;
    }

    let url = "";

    if (dub.video) {
        url = dub.video;
    } else if (dub.url) {
        url = dub.url;
    } else if (dub.link) {
        url = dub.link;
    }

    if (!url && Array.isArray(dub.versions) && dub.versions.length > 0) {
        const firstVersion = dub.versions[0];

        url = getVideoUrl(firstVersion);
    }

    if (url) {
        window.open(url, "_blank");
    }
}


document.addEventListener("DOMContentLoaded", function () {
    setupAdblockNotice();

    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

    buildDubTable();
});