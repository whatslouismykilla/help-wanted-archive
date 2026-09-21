/* =========================================================
   HELP WANTED — ADDITIONAL DUB ENTRIES

   The database is loaded from dub.js. This file contains entries
   that are appended to that database before the table is rebuilt.
   ========================================================= */

"use strict";

if (typeof dubs !== "undefined" && Array.isArray(dubs)) {
    if (!dubs.some(function (dub) {
        return dub.language === "English";
    })) {
        dubs.unshift({
            language: "English",
            flag: "🇺🇸",
            title: "SpongeBob SquarePants",
            versions: [],
            available: false
        });
    }
}
