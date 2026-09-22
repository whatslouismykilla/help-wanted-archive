/* =========================================================
   PERSIAN TOON DUB UPDATE
   Load this AFTER dub.js and BEFORE script.js
========================================================= */

(function () {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) return;

    const persian = dubs.find(function (dub) {
        return dub.language === "Persian";
    });

    if (!persian) return;

    if (!Array.isArray(persian.versions)) {
        persian.versions = [];
    }

    const videoUrl =
        "https://streamtape.com/v/8zOgBpGeoXTozRA/persian.mp4";

    let version = persian.versions.find(function (item) {
        return item.name === "Persian Toon";
    });

    if (!version) {
        version = {
            name: "Persian Toon",
            info: "Persian Toon Persian dub",
            video: videoUrl,
            available: true
        };

        persian.versions.push(version);
    } else {
        version.info = "Persian Toon Persian dub";
        version.video = videoUrl;
        version.available = true;
    }

    // Keep every other dub/version unavailable until you explicitly enable it.
    dubs.forEach(function (dub) {
        if (dub !== persian && dub.available !== true) {
            dub.available = false;
        }

        if (Array.isArray(dub.versions)) {
            dub.versions.forEach(function (item) {
                if (item !== version && item.available !== true) {
                    item.available = false;
                }
            });
        }
    });

    persian.available = false;
})();