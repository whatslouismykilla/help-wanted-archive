/* =========================================================
   HELP WANTED — VIDEO LINKS
   One place to add/edit every video link for every dub.

   Load this AFTER dub.js (and dubs.js, if used) and
   BEFORE script.js — same spot persian-toon-update.js used
   to go.

   HOW TO ADD A DUB WITH NO VERSIONS:
     { language: "English", video: "https://..." }

   HOW TO ADD A SPECIFIC VERSION OF A DUB:
     { language: "Persian", version: "Persian Toon", video: "https://..." }
     (if that version doesn't exist yet on the dub, it will
     be created automatically)

   IF A LANGUAGE APPEARS MORE THAN ONCE (e.g. the fan-dub
   entries for Belarusian/Macedonian), "title" is included
   below to say which one is meant — it must match that
   entry's "title" field in dub.js exactly.

   Every dub and version from dub.js is listed below already,
   grouped by language with a comment header, video left
   blank ("") ready for you to fill in. Leave any entry blank
   and it just stays unavailable — nothing else to do.
========================================================= */

const VIDEO_LINKS = [
    // Persian — Persian Toon (already live)
    {
        language: "Persian",
        version: "Persian Toon",
        info: "Persian Toon Persian dub",
        video: "https://streamtape.com/embed/8zOgBpGeoXTozRA/persian.mp4"
    },

    // Afrikaans
    { language: "Afrikaans", video: "" },

    // Albanian
    { language: "Albanian", version: "Seasons 1–7", video: "" },
    { language: "Albanian", version: "Seasons 8–11", video: "" },

    // Arabic
    { language: "Arabic", version: "Image Production House", video: "" },
    { language: "Arabic", version: "Neo Productions / New Interactive Studio", video: "" },
    { language: "Arabic", version: "Childhood Voice Institute", video: "" },

    // Armenian
    { language: "Armenian", video: "" },

    // Assamese
    { language: "Assamese", video: "" },

    // Azerbaijani
    { language: "Azerbaijani", version: "Northern Azerbaijani", video: "" },
    { language: "Azerbaijani", version: "Southern Azerbaijani", video: "" },

    // Bengali
    { language: "Bengali", version: "Audio People", video: "" },
    { language: "Bengali", version: "Octave Studio", video: "" },

    // Bulgarian
    { language: "Bulgarian", video: "" },

    // Cantonese
    { language: "Cantonese", version: "ATV Home", video: "" },
    { language: "Cantonese", version: "Netflix", video: "" },
    { language: "Cantonese", version: "ViuTV", video: "" },

    // Croatian
    { language: "Croatian", version: "Project 6 Studio", video: "" },
    { language: "Croatian", version: "VSI-NET", video: "" },

    // Czech
    { language: "Czech", video: "" },

    // Danish
    { language: "Danish", video: "" },

    // Dari
    { language: "Dari", video: "" },

    // Dutch
    { language: "Dutch", video: "" },

    // English
    { language: "English", video: "" },

    // Filipino
    { language: "Filipino", video: "" },

    // Finnish
    { language: "Finnish", video: "" },

    // French
    { language: "French", video: "" },

    // German
    { language: "German", video: "" },

    // Gilaki
    { language: "Gilaki", version: "Filmiiz", video: "" },
    { language: "Gilaki", version: "Haft", video: "" },

    // Greek
    { language: "Greek", video: "" },

    // Gujarati
    { language: "Gujarati", version: "Colors Gujarati", video: "" },
    { language: "Gujarati", version: "ETV Bal Bharat", video: "" },

    // Hebrew
    { language: "Hebrew", video: "" },

    // Hindi
    { language: "Hindi", version: "ETV Bal Bharat", video: "" },
    { language: "Hindi", version: "Viacom18", video: "" },

    // Hungarian
    { language: "Hungarian", video: "" },

    // Icelandic
    { language: "Icelandic", video: "" },

    // Indonesian
    { language: "Indonesian", version: "GTV / Nickelodeon", video: "" },
    { language: "Indonesian", version: "Lativi", video: "" },

    // Irish
    { language: "Irish", video: "" },

    // Italian
    { language: "Italian", video: "" },

    // Japanese
    { language: "Japanese", video: "" },

    // Kannada
    { language: "Kannada", version: "Chintu TV", video: "" },
    { language: "Kannada", version: "ETV Bal Bharat", video: "" },

    // Kazakh
    { language: "Kazakh", version: "KTK", video: "" },
    { language: "Kazakh", version: "Nickelodeon", video: "" },

    // Korean
    { language: "Korean", version: "EBS", video: "" },
    { language: "Korean", version: "Nickelodeon", video: "" },

    // Kurdish (Central)
    { language: "Kurdish (Central)", version: "Kurdsat", video: "" },
    { language: "Kurdish (Central)", version: "Pêlistank TV", video: "" },
    { language: "Kurdish (Central)", version: "Zaro TV", video: "" },

    // Kurdish (Northern)
    { language: "Kurdish (Northern)", version: "Filmiiz", video: "" },
    { language: "Kurdish (Northern)", version: "Heshin TV", video: "" },
    { language: "Kurdish (Northern)", version: "Türkiye", video: "" },

    // Luri
    { language: "Luri", video: "" },

    // Macedonian — Сунѓерот Боб Панталоновски
    { language: "Macedonian", title: "Сунѓерот Боб Панталоновски", version: "A1", video: "" },
    { language: "Macedonian", title: "Сунѓерот Боб Панталоновски", version: "HBO GO", video: "" },
    { language: "Macedonian", title: "Сунѓерот Боб Панталоновски", version: "MRT 1", video: "" },

    // Malay
    { language: "Malay", video: "" },

    // Malayalam
    { language: "Malayalam", version: "ETV Bal Bharat", video: "" },
    { language: "Malayalam", version: "Kochu TV", video: "" },

    // Mandarin (China)
    { language: "Mandarin (China)", video: "" },

    // Mandarin (Taiwan)
    { language: "Mandarin (Taiwan)", version: "Nickelodeon", video: "" },
    { language: "Mandarin (Taiwan)", version: "YoYo TV", video: "" },

    // Marathi
    { language: "Marathi", video: "" },

    // Māori
    { language: "Māori", version: "Māori Television", video: "" },
    { language: "Māori", version: "Nickelodeon", video: "" },

    // Mazandarani
    { language: "Mazandarani", video: "" },

    // Norwegian
    { language: "Norwegian", version: "Eurotroll / NorDubb", video: "" },
    { language: "Norwegian", version: "Sun Studio", video: "" },

    // Odia
    { language: "Odia", video: "" },

    // Persian
    { language: "Persian", version: "Asia Resane Cinema Home Entertainment", video: "" },
    { language: "Persian", version: "Avazheh", video: "" },
    { language: "Persian", version: "Baniwak Studio", video: "" },
    { language: "Persian", version: "Diamonds", video: "" },
    { language: "Persian", version: "Esfahani Persian", video: "" },
    { language: "Persian", version: "Glory Entertainment", video: "" },
    { language: "Persian", version: "IRIB", video: "" },
    { language: "Persian", version: "Khorasani Persian Bonyan Sokout", video: "" },
    { language: "Persian", version: "Khorasani Persian Filmiiz", video: "" },
    { language: "Persian", version: "Kimiya", video: "" },
    { language: "Persian", version: "Makath Studio", video: "" },
    { language: "Persian", version: "MBC Persia", video: "" },
    { language: "Persian", version: "Persian Toon Studio", video: "" },
    { language: "Persian", version: "Qualima", video: "" },
    { language: "Persian", version: "Rainbow Speech Studio", video: "" },
    { language: "Persian", version: "Sandika", video: "" },
    { language: "Persian", version: "Soundo Studio", video: "" },
    { language: "Persian", version: "TDH Films", video: "" },

    // Polish — SpongeBob Kanciastoporty
    { language: "Polish", title: "SpongeBob Kanciastoporty", video: "" },

    // Portuguese (Brazil) — Bob Esponja Calça Quadrada
    { language: "Portuguese (Brazil)", title: "Bob Esponja Calça Quadrada", video: "" },

    // Portuguese (Portugal)
    { language: "Portuguese (Portugal)", version: "Nickelodeon", video: "" },
    { language: "Portuguese (Portugal)", version: "SIC", video: "" },

    // Punjabi
    { language: "Punjabi", video: "" },

    // Romanian
    { language: "Romanian", version: "Documented title", video: "" },
    { language: "Romanian", version: "Alternate title", video: "" },

    // Russian
    { language: "Russian", version: "Localized title", video: "" },
    { language: "Russian", version: "Alternate title", video: "" },

    // Semnani
    { language: "Semnani", video: "" },

    // Serbian
    { language: "Serbian", version: "B92", video: "" },
    { language: "Serbian", version: "Gold Digi Net — DVD", video: "" },
    { language: "Serbian", version: "Gold Digi Net — TV", video: "" },

    // Sinhala
    { language: "Sinhala", video: "" },

    // Slovak
    { language: "Slovak", version: "Markíza", video: "" },
    { language: "Slovak", version: "Štúdio FINIKIN", video: "" },

    // Slovene
    { language: "Slovene", version: "Nickelodeon", video: "" },
    { language: "Slovene", version: "Studio Ritem", video: "" },
    { language: "Slovene", version: "TV3", video: "" },

    // Spanish (Latin America)
    { language: "Spanish (Latin America)", video: "" },

    // Spanish (Spain)
    { language: "Spanish (Spain)", video: "" },

    // Swedish
    { language: "Swedish", video: "" },

    // Tamil
    { language: "Tamil", version: "Chutti TV", video: "" },
    { language: "Tamil", version: "ETV Bal Bharat", video: "" },
    { language: "Tamil", version: "Nickelodeon", video: "" },

    // Telugu
    { language: "Telugu", version: "ETV Bal Bharat", video: "" },
    { language: "Telugu", version: "Kushi TV", video: "" },
    { language: "Telugu", version: "Nickelodeon", video: "" },

    // Thai
    { language: "Thai", video: "" },

    // Tibetan
    { language: "Tibetan", video: "" },

    // Turkish
    { language: "Turkish", version: "Aton Production", video: "" },
    { language: "Turkish", version: "NTV Studios", video: "" },

    // Ukrainian
    { language: "Ukrainian", video: "" },

    // Urdu
    { language: "Urdu", video: "" },

    // Uyghur
    { language: "Uyghur", video: "" },

    // Vietnamese
    { language: "Vietnamese", version: "Netflix", video: "" },
    { language: "Vietnamese", version: "YouTV", video: "" },

    // Welsh
    { language: "Welsh", video: "" },

    // Zaza
    { language: "Zaza", video: "" },

    // Zulu
    { language: "Zulu", version: "Zulu title", video: "" },
    { language: "Zulu", version: "Alternate title", video: "" },

    // Aeviek (fan dub)
    { language: "Aeviek", version: "Avi Go!", video: "" },

    // Bambara (fan dub)
    { language: "Bambara", version: "Internet Archive", video: "" },

    // Belarusian — Спанч Боб Скуэ Пэнс (fan dub)
    { language: "Belarusian", title: "Спанч Боб Скуэ Пэнс", version: "Kinakipa", video: "" },

    // Belarusian — Губка Боб Квадратныя Штаны (fan dub)
    { language: "Belarusian", title: "Губка Боб Квадратныя Штаны", version: "Bondian Dubbing Studios", video: "" },

    // Berber (fan dub)
    { language: "Berber", version: "Veoh", video: "" },

    // Bosnian (fan dub)
    { language: "Bosnian", version: "Project BR", video: "" },

    // Burmese (fan dub)
    { language: "Burmese", version: "BFTT Studios", video: "" },

    // Estonian (fan dub)
    { language: "Estonian", version: "Media Hyper Studio", video: "" },

    // Guinea-Bissau Creole (fan dub)
    { language: "Guinea-Bissau Creole", version: "Fan dub", video: "" },

    // Latvian (fan dub)
    { language: "Latvian", version: "Latvian Project Studio", video: "" },

    // Luxembourgish (fan dub)
    { language: "Luxembourgish", version: "Fan dub", video: "" },

    // Macedonian — Сунѓерот Боб (fan dub)
    { language: "Macedonian", title: "Сунѓерот Боб", version: "Project BR — 2017", video: "" },

    // Macedonian — Сунѓерот Боб Плоштадот Панталони (fan dub)
    { language: "Macedonian", title: "Сунѓерот Боб Плоштадот Панталони", version: "Project BR — 2018", video: "" },

    // Occitan (fan dub)
    { language: "Occitan", version: "Occitan Dubbing Studio", video: "" },

    // Ojibwe (fan dub)
    { language: "Ojibwe", version: "Love 2 Dub Ojibwe", video: "" },

    // Portuguese (Brazil) — Bob Esponja (fan dub)
    { language: "Portuguese (Brazil)", title: "Bob Esponja", version: "Soberana TV", video: "" },

    // Portuguese (Brazil) — Bob Esponja Calça Quadrada (fan dub)
    { language: "Portuguese (Brazil)", title: "Bob Esponja Calça Quadrada", version: "Fan dub", video: "" },

    // Polish — Zabawny SpongeBob (fan dub)
    { language: "Polish", title: "Zabawny SpongeBob", version: "Chromium", video: "" },
];

(function applyVideoLinks() {
    if (typeof dubs === "undefined" || !Array.isArray(dubs)) return;

    function findDub(entry) {
        const matches = dubs.filter(function (dub) {
            return dub.language === entry.language;
        });

        if (matches.length <= 1) return matches[0];

        // Language appears more than once — require "title" to disambiguate.
        return matches.find(function (dub) {
            return dub.title === entry.title;
        });
    }

    VIDEO_LINKS.forEach(function (entry) {
        if (!entry.video || !entry.video.trim()) return; // nothing to apply yet

        const dub = findDub(entry);
        if (!dub) {
            console.warn("videos.js: no dub found for", entry);
            return;
        }

        if (!entry.version) {
            // Video applies to the dub itself, not a specific version.
            dub.video = entry.video;
            dub.available = true;
            return;
        }

        if (!Array.isArray(dub.versions)) dub.versions = [];

        let version = dub.versions.find(function (v) {
            return v.name === entry.version;
        });

        if (!version) {
            version = { name: entry.version };
            dub.versions.push(version);
        }

        version.info = entry.info || version.info || entry.version;
        version.video = entry.video;
        version.available = true;
    });
})();
