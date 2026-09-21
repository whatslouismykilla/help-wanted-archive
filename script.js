/* =========================================================
   HELP WANTED — DUB ARCHIVE SCRIPT
========================================================= */

"use strict";


/* =========================================================
   CREATE DUB TABLE
========================================================= */

function buildDubTable() {

    const tableBody =
        document.getElementById("dubTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    let multipleVersions = 0;


    dubs.forEach(function (dub, index) {

        const mainRow =
            document.createElement("tr");

        mainRow.className = "main-row";


        /* -----------------------------------------
           LANGUAGE
        ----------------------------------------- */

        const languageCell =
            document.createElement("td");

        languageCell.className = "language";

        languageCell.textContent =
            dub.flag
                ? dub.flag + " " + dub.language
                : dub.language;


        /* -----------------------------------------
           SHOW TITLE
        ----------------------------------------- */

        const titleCell =
            document.createElement("td");

        titleCell.className = "show-title";

        titleCell.textContent =
            dub.title || "Unknown";


        /* -----------------------------------------
           VERSIONS
        ----------------------------------------- */

        const versionsCell =
            document.createElement("td");


        if (
            Array.isArray(dub.versions) &&
            dub.versions.length > 1
        ) {

            multipleVersions++;

            const versionButton =
                document.createElement("button");

            versionButton.className =
                "version-button";

            versionButton.textContent =
                "▶ Show versions";


            const versionId =
                "versions-" + index;


            versionButton.addEventListener(
                "click",
                function () {

                    toggleVersions(
                        versionId,
                        versionButton
                    );

                }
            );


            const count =
                document.createElement("span");

            count.className =
                "version-count";

            count.textContent =
                " " + dub.versions.length;


            versionsCell.appendChild(
                versionButton
            );

            versionsCell.appendChild(
                count
            );

        } else {

            versionsCell.textContent =
                "—";

        }


        /* -----------------------------------------
           PLAY
        ----------------------------------------- */

        const playCell =
            document.createElement("td");

        const playButton =
            document.createElement("button");

        playButton.className =
            "play-button";

        playButton.textContent =
            "▶ Play";


        playButton.addEventListener(
            "click",
            function () {

                changeVideo(
                    dub.video || "",
                    dub.language + " — " + dub.title
                );

            }
        );


        playCell.appendChild(
            playButton
        );


        /* -----------------------------------------
           ADD MAIN ROW
        ----------------------------------------- */

        mainRow.appendChild(
            languageCell
        );

        mainRow.appendChild(
            titleCell
        );

        mainRow.appendChild(
            versionsCell
        );

        mainRow.appendChild(
            playCell
        );


        tableBody.appendChild(
            mainRow
        );


        /* -----------------------------------------
           EXPANDED VERSION ROW
        ----------------------------------------- */

        if (
            Array.isArray(dub.versions) &&
            dub.versions.length > 1
        ) {

            const versionRow =
                document.createElement("tr");

            versionRow.className =
                "version-row";

            versionRow.id =
                "versions-" + index;


            const versionCell =
                document.createElement("td");

            versionCell.colSpan = 4;


            const versionList =
                document.createElement("div");

            versionList.className =
                "version-list";


            const heading =
                document.createElement("h3");

            heading.className =
                "version-list-title";

            heading.textContent =
                dub.language + " versions";


            versionList.appendChild(
                heading
            );


            dub.versions.forEach(
                function (version) {

                    const versionBox =
                        document.createElement("div");

                    versionBox.className =
                        "version";


                    const versionName =
                        document.createElement("div");

                    versionName.className =
                        "version-name";

                    versionName.textContent =
                        version.name || "Documented version";


                    const versionInfo =
                        document.createElement("div");

                    versionInfo.className =
                        "version-info";

                    versionInfo.textContent =
                        version.info || "";


                    versionBox.appendChild(
                        versionName
                    );

                    versionBox.appendChild(
                        versionInfo
                    );


                    versionList.appendChild(
                        versionBox
                    );

                }
            );


            versionCell.appendChild(
                versionList
            );

            versionRow.appendChild(
                versionCell
            );

            tableBody.appendChild(
                versionRow
            );

        }

    });


    /* -----------------------------------------
       STATISTICS
    ----------------------------------------- */

    const languageCount =
        document.getElementById(
            "languageCount"
        );

    const versionCount =
        document.getElementById(
            "versionCount"
        );


    if (languageCount) {
        languageCount.textContent =
            dubs.length;
    }

    if (versionCount) {
        versionCount.textContent =
            multipleVersions;
    }

}


/* =========================================================
   SHOW / HIDE VERSIONS
========================================================= */

function toggleVersions(id, button) {

    const row =
        document.getElementById(id);

    if (!row) {
        return;
    }


    if (row.classList.contains("open")) {

        row.classList.remove("open");

        button.textContent =
            "▶ Show versions";

    } else {

        row.classList.add("open");

        button.textContent =
            "▼ Hide versions";

    }

}


/* =========================================================
   SHOW / HIDE ARCHIVE INFORMATION
========================================================= */

function toggleArchiveInfo() {

    const info =
        document.getElementById(
            "archiveInfo"
        );

    const button =
        document.getElementById(
            "showMoreButton"
        );


    if (!info || !button) {
        return;
    }


    if (
        info.style.display === "none" ||
        info.style.display === ""
    ) {

        info.style.display =
            "block";

        button.textContent =
            "▲ Show less information";

    } else {

        info.style.display =
            "none";

        button.textContent =
            "▼ Show more information";

    }

}


/* =========================================================
   CHANGE VIDEO
========================================================= */

function changeVideo(url, title) {

    const player =
        document.getElementById(
            "videoPlayer"
        );

    const nowPlaying =
        document.getElementById(
            "nowPlaying"
        );


    if (!player || !nowPlaying) {
        return;
    }


    nowPlaying.textContent =
        title;


    /*
       No video URL:
       Show a friendly placeholder instead of trying
       to load an invalid iframe.
    */

    if (!url) {

        player.innerHTML = `
            <div class="video-placeholder">
                <div class="video-placeholder-icon">▶</div>

                <strong>No video source attached</strong>

                <span>
                    Add an authorized video URL to this
                    dub entry in dub.js.
                </span>
            </div>
        `;

        return;
    }


    /*
       Only load an iframe when a URL has actually
       been supplied in the database.
    */

    const iframe =
        document.createElement("iframe");

    iframe.src =
        url;

    iframe.allowFullscreen = true;

    iframe.referrerPolicy =
        "no-referrer-when-downgrade";

    iframe.setAttribute(
        "allow",
        "fullscreen"
    );


    player.innerHTML = "";

    player.appendChild(
        iframe
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            typeof dubs === "undefined" ||
            !Array.isArray(dubs)
        ) {

            const tableBody =
                document.getElementById(
                    "dubTableBody"
                );

            if (tableBody) {

                tableBody.innerHTML = `
                    <tr>
                        <td colspan="4">
                            <strong>
                                The dub database could not
                                be loaded.
                            </strong>
                            <br>
                            Make sure dub.js exists and
                            is loaded before script.js.
                        </td>
                    </tr>
                `;

            }

            return;
        }


        buildDubTable();

    }
);