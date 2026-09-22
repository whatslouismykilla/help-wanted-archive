async function loadSupplementalDubs() {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

    try {
        const response = await fetch("dubs.js");

        if (!response.ok) {
            throw new Error(
                "Could not load supplemental dubs: " +
                response.status
            );
        }

        const text = await response.text();

        const script = document.createElement("script");

        script.textContent = text;

        document.head.appendChild(script);
    } catch (error) {
        console.error(
            "Failed to load supplemental dubs:",
            error
        );
    }
}


async function markDubsUnavailable() {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

    dubs.forEach(function (dub, index) {
        const rows = document.querySelectorAll(
            '#dubTableBody [data-dub-index="' + index + '"], ' +
            '#fanDubTableBody [data-dub-index="' + index + '"]'
        );

        if (!rows.length) {
            return;
        }

        const mainRow = Array.from(rows).find(function (row) {
            return row.classList.contains("main-row");
        });

        if (mainRow) {
            const playButton =
                mainRow.querySelector(".play-button");

            if (playButton) {
                const url =
                    dub.video ||
                    dub.url ||
                    dub.link ||
                    "";

                if (!url && (!Array.isArray(dub.versions) ||
                    dub.versions.length === 0)) {
                    playButton.disabled = true;
                    playButton.textContent = "Unavailable";
                    playButton.classList.add("unavailable");
                }
            }
        }

        const versionRows = Array.from(rows).filter(function (row) {
            return row.classList.contains("version-row");
        });

        versionRows.forEach(function (versionRow) {
            const versionButtons =
                versionRow.querySelectorAll(
                    ".version-play-button"
                );

            versionButtons.forEach(function (button) {
                const versionIndex =
                    parseInt(button.dataset.versionIndex, 10);

                if (!Array.isArray(dub.versions) ||
                    !dub.versions[versionIndex]) {
                    button.disabled = true;
                    button.textContent = "Unavailable";
                    button.classList.add("unavailable");

                    return;
                }

                const version =
                    dub.versions[versionIndex];

                const url =
                    version.video ||
                    version.url ||
                    version.link ||
                    "";

                if (!url) {
                    button.disabled = true;
                    button.textContent = "Unavailable";
                    button.classList.add("unavailable");
                }
            });
        });
    });
}


function setupFanDubSection() {
    const section = document.getElementById("fanDubSection");
    const toggleButton =
        document.getElementById("fanDubToggle");
    const tableWrapper =
        document.getElementById("fanDubTableWrapper");

    if (!section || !toggleButton || !tableWrapper) {
        return;
    }

    const fanDubs = getDubEntries(true);

    if (fanDubs.length === 0) {
        section.style.display = "none";
        return;
    }

    tableWrapper.style.display = "none";

    toggleButton.textContent = "▼ Show fan dubs";

    toggleButton.addEventListener("click", function () {
        const isHidden =
            tableWrapper.style.display === "none" ||
            tableWrapper.style.display === "";

        if (isHidden) {
            tableWrapper.style.display = "block";
            toggleButton.textContent = "▲ Hide fan dubs";
        } else {
            tableWrapper.style.display = "none";
            toggleButton.textContent = "▼ Show fan dubs";
        }
    });
}


document.addEventListener("DOMContentLoaded", async function () {
    await loadSupplementalDubs();

    if (typeof dubs === "undefined" || !Array.isArray(dubs)) {
        return;
    }

    buildDubTable();
    buildFanDubTable();

    setupFanDubSection();

    await markDubsUnavailable();
});