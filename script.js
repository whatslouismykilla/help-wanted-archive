/* =========================================================
HELP WANTED — DUB ARCHIVE
Main JavaScript
========================================================= */

/* =========================================================
BUILD DUB TABLE
========================================================= */

function buildDubTable() {

const tableBody =
    document.getElementById("dubTableBody");

const databaseStatus =
    document.getElementById("databaseStatus");

const databaseError =
    document.getElementById("databaseError");


/* -----------------------------------------
   DATABASE CHECK
----------------------------------------- */

if (typeof dubs === "undefined" || !Array.isArray(dubs)) {

    console.error(
        "HELP WANTED ARCHIVE: dub.js did not load correctly."
    );

    databaseStatus.textContent = "Error";
    databaseError.hidden = false;

    return;
}


/* -----------------------------------------
   CLEAR TABLE
----------------------------------------- */

tableBody.innerHTML = "";

databaseError.hidden = true;


let multipleVersions = 0;


/* -----------------------------------------
   CREATE EACH DUB
----------------------------------------- */

dubs.forEach(function (dub, index) {

    const mainRow =
        document.createElement("tr");

    mainRow.className = "main-row";


    /* LANGUAGE */

    const languageCell =
        document.createElement("td");

    languageCell.className = "language";

    languageCell.textContent =
        dub.flag
            ? dub.flag + " " + dub.language
            : dub.language;


    /* TITLE */

    const titleCell =
        document.createElement("td");

    titleCell.textContent =
        dub.title || "Unknown";


    /* VERSIONS */

    const versionsCell =
        document.createElement("td");

    versionsCell.className = "versions-cell";


    /* PLAY */

    const playCell =
        document.createElement("td");

    playCell.className = "play-cell";


    /* -----------------------------------------
       VERSION BUTTON
    ----------------------------------------- */

    if (
        Array.isArray(dub.versions) &&
        dub.versions.length > 1
    ) {

        multipleVersions++;


        const versionButton =
            document.createElement("button");

        versionButton.type = "button";

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


        versionsCell.appendChild(
            versionButton
        );

    } else {

        versionsCell.textContent = "—";

    }


    /* -----------------------------------------
       PLAY BUTTON
    ----------------------------------------- */

    const playButton =
        document.createElement("button");

    playButton.type = "button";

    playButton.className =
        "play-button";

    playButton.textContent =
        "▶ Play";


    playButton.addEventListener(
        "click",
        function () {

            changeVideo(
                dub.video || "",
                (dub.language || "Unknown") +
                " — " +
                (dub.title || "Help Wanted")
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
            (dub.language || "Language") +
            " versions";


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
                    version.name || "Unnamed version";


                const versionInfo =
                    document.createElement("div");

                versionInfo.className =
                    "version-info";

                versionInfo.textContent =
                    version.info || "";


                /* VERSION PLAY BUTTON */

                if (version.video) {

                    const versionPlay =
                        document.createElement("button");

                    versionPlay.type = "button";

                    versionPlay.className =
                        "play-button version-play";

                    versionPlay.textContent =
                        "▶ Play";


                    versionPlay.addEventListener(
                        "click",
                        function () {

                            changeVideo(
                                version.video,
                                (dub.language || "Unknown") +
                                " — " +
                                (version.name || "Version")
                            );

                        }
                    );


                    versionBox.appendChild(
                        versionName
                    );

                    versionBox.appendChild(
                        versionInfo
                    );

                    versionBox.appendChild(
                        versionPlay
                    );

                } else {

                    versionBox.appendChild(
                        versionName
                    );

                    versionBox.appendChild(
                        versionInfo
                    );

                }


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

document.getElementById(
    "languageCount"
).textContent =
    dubs.length;


document.getElementById(
    "versionCount"
).textContent =
    multipleVersions;


databaseStatus.textContent =
    "Loaded";

}

/* =========================================================
SHOW / HIDE VERSIONS
========================================================= */

function toggleVersions(
id,
button
) {

const row =
    document.getElementById(id);


if (!row) {
    return;
}


const isOpen =
    row.classList.contains("open");


if (isOpen) {

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
    document.getElementById("archiveInfo");

const button =
    document.getElementById("showMoreButton");


if (!info || !button) {
    return;
}


const isHidden =
    info.style.display === "none" ||
    info.style.display === "";


if (isHidden) {

    info.style.display = "block";

    button.textContent =
        "▲ Show less information";

} else {

    info.style.display = "none";

    button.textContent =
        "▼ Show more information";

}

}

/* =========================================================
CHANGE VIDEO
========================================================= */

function changeVideo(
url,
title
) {

const player =
    document.getElementById("videoPlayer");

const nowPlaying =
    document.getElementById("nowPlaying");


if (!player || !nowPlaying) {
    return;
}


if (!url) {

    nowPlaying.textContent =
        title +
        " — video unavailable";

    return;
}


player.innerHTML = "";


const iframe =
    document.createElement("iframe");

iframe.src = url;

iframe.title = title;

iframe.allowFullscreen = true;


player.appendChild(
    iframe
);


nowPlaying.textContent =
    title;


const playerWindow =
    document.querySelector(
        ".player-window"
    );


if (playerWindow) {

    playerWindow.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

}

/* =========================================================
START
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {

    buildDubTable();


    const showMoreButton =
        document.getElementById(
            "showMoreButton"
        );


    if (showMoreButton) {

        showMoreButton.addEventListener(
            "click",
            toggleArchiveInfo
        );

    }

}

);