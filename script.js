/* =========================================================
   CREATE DUB TABLE
========================================================= */

function buildDubTable() {

    const tableBody =
        document.getElementById("dubTableBody");

    tableBody.innerHTML = "";


    let multipleVersions = 0;


    dubs.forEach((dub, index) => {

        const mainRow =
            document.createElement("tr");

        mainRow.className = "main-row";


        const languageCell =
            document.createElement("td");

        languageCell.className = "language";

        languageCell.textContent =
            dub.flag
                ? dub.flag + " " + dub.language
                : dub.language;


        const titleCell =
            document.createElement("td");

        titleCell.textContent =
            dub.title;


        const versionsCell =
            document.createElement("td");


        const playCell =
            document.createElement("td");


        /* -----------------------------------------
           VERSIONS
        ----------------------------------------- */

        if (dub.versions && dub.versions.length > 1) {

            multipleVersions++;


            const versionButton =
                document.createElement("button");

            versionButton.className =
                "version-button";

            versionButton.textContent =
                "▶ Show versions";


            const versionId =
                "versions-" + index;


            versionButton.onclick =
                function () {

                    toggleVersions(
                        versionId,
                        versionButton
                    );

                };


            versionsCell.appendChild(
                versionButton
            );

        }

        else {

            versionsCell.textContent = "—";

        }


        /* -----------------------------------------
           PLAY BUTTON
        ----------------------------------------- */

        const playButton =
            document.createElement("button");

        playButton.className =
            "play-button";

        playButton.textContent =
            "▶ Play";


        playButton.onclick =
            function () {

                changeVideo(
                    dub.video || "",
                    dub.language +
                    " — " +
                    dub.title
                );

            };


        playCell.appendChild(
            playButton
        );


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

        if (dub.versions && dub.versions.length > 1) {

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
                        version.name;


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

    document.getElementById(
        "languageCount"
    ).textContent =
        dubs.length;


    document.getElementById(
        "versionCount"
    ).textContent =
        multipleVersions;

}


/* =========================================================
   SHOW / HIDE VERSIONS
========================================================= */

function toggleVersions(id, button) {

    const row =
        document.getElementById(id);


    if (row.classList.contains("open")) {

        row.classList.remove("open");

        button.textContent =
            "▶ Show versions";

    }

    else {

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


    if (
        info.style.display === "none" ||
        info.style.display === ""
    ) {

        info.style.display =
            "block";

        button.textContent =
            "▲ Show less information";

    }

    else {

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
        document.getElementById("videoPlayer");

    const nowPlaying =
        document.getElementById("nowPlaying");


    if (!url) {

        nowPlaying.textContent =
            title + " — video unavailable";

        return;

    }


    player.innerHTML = `

        <iframe
            src="${url}"
            allowfullscreen>
        </iframe>

    `;


    nowPlaying.textContent =
        title;


    document
        .querySelector(".player-window")
        .scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    buildDubTable
);