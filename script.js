/* ==========================================================================
   HELP WANTED — SpongeBob Dub Archive
   Standalone Script & Multilingual Database
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // Default video stream used for testing
    const DEFAULT_TEST_VIDEO = "https://streamtape.com/e/e3v3o7K0jLcwv4";

    /* ----------------------------------------------------------------------
       1. Multilingual Database (Verified data & unknown structure fields)
       ---------------------------------------------------------------------- */
    const dubDatabase = [
        {
            language: "English",
            title: "Help Wanted",
            video: DEFAULT_TEST_VIDEO,
            versions: []
        },
        {
            language: "Afrikaans",
            title: "Hulp Gevra",
            versions: []
        },
        {
            language: "Albanian",
            title: "Kërkohet Ndihmë",
            versions: []
        },
        {
            language: "Arabic",
            title: "مطلوب موظف",
            versions: [
                { name: "Childhood Voice Institute", studio: "Childhood Voice Institute" },
                { name: "Image Production House", studio: "Image Production House" },
                { name: "Neo Productions / New Interactive Studio", studio: "Neo Productions" }
            ]
        },
        {
            language: "Armenian",
            title: "Փնտրվում է աշխատակից",
            versions: []
        },
        {
            language: "Assamese",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Azerbaijani",
            title: "Köməkçilər Axtarılır",
            versions: [
                { name: "Northern Azerbaijani", studio: "Unknown studio" },
                { name: "Southern Azerbaijani", studio: "Unknown studio" }
            ]
        },
        {
            language: "Bengali",
            title: "সাহায্য চাই",
            versions: [
                { name: "Audio People version", studio: "Audio People" },
                { name: "Octave Studio version", studio: "Octave Studio" }
            ]
        },
        {
            language: "Bulgarian",
            title: "Tursi se pomoshtnik",
            versions: []
        },
        {
            language: "Cantonese",
            title: "急聘助手",
            versions: [
                { name: "ATV Home broadcast", studio: "ATV Home" },
                { name: "Netflix version", studio: "Netflix dubbing team" },
                { name: "ViuTV version", studio: "ViuTV" }
            ]
        },
        {
            language: "Croatian",
            title: "Traži se pomoćnik",
            versions: [
                { name: "Project 6 Studio version", studio: "Project 6 Studio" },
                { name: "VSI-NET version", studio: "VSI-NET" }
            ]
        },
        {
            language: "Czech",
            title: "Hledá se kuchař",
            versions: []
        },
        {
            language: "Danish",
            title: "Hjælp Søges",
            versions: []
        },
        {
            language: "Dari",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Dutch",
            title: "Hulp Gevraagd",
            versions: []
        },
        {
            language: "Filipino",
            title: "Kailangan ng Tulong",
            versions: []
        },
        {
            language: "Finnish",
            title: "Apuwa!",
            versions: []
        },
        {
            language: "French",
            title: "Bienvenue à bord",
            versions: []
        },
        {
            language: "German",
            title: "Aushilfe gesucht",
            versions: []
        },
        {
            language: "Gilaki",
            title: "Verification needed",
            versions: [
                { name: "Filmiiz version", studio: "Filmiiz" },
                { name: "Haft version", studio: "Haft" }
            ]
        },
        {
            language: "Greek",
            title: "Ζητείται Βοηθός",
            versions: []
        },
        {
            language: "Gujarati",
            title: "મદદ જોઈએ છે",
            versions: [
                { name: "Colors Gujarati", studio: "Colors Gujarati" },
                { name: "ETV Bal Bharat", studio: "ETV Bal Bharat" }
            ]
        },
        {
            language: "Hebrew",
            title: "דרוש עובד",
            versions: []
        },
        {
            language: "Hindi",
            title: "मदद चाहिए",
            versions: [
                { name: "ETV Bal Bharat version", studio: "ETV Bal Bharat" },
                { name: "Viacom18 / Nickelodeon version", studio: "Viacom18" }
            ]
        },
        {
            language: "Hungarian",
            title: "Tengeri Muki állást keres",
            versions: []
        },
        {
            language: "Icelandic",
            title: "Aðstoð Óskast",
            versions: []
        },
        {
            language: "Indonesian",
            title: "Koki Handal",
            versions: [
                { name: "GTV / Nickelodeon version", studio: "GTV / Nickelodeon" },
                { name: "Lativi version", studio: "Lativi" }
            ]
        },
        {
            language: "Irish",
            title: "Cúntóir Ag Teastáil",
            versions: []
        },
        {
            language: "Italian",
            title: "Cercasi aiuto",
            versions: []
        },
        {
            language: "Japanese",
            title: "ヘルプ・ウォンテッド",
            versions: []
        },
        {
            language: "Kannada",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Kazakh",
            title: "Көмекші қажет",
            versions: []
        },
        {
            language: "Korean",
            title: "직원을 구합니다",
            versions: [
                { name: "EBS broadcast version", studio: "EBS" },
                { name: "Nickelodeon Korea version", studio: "Nickelodeon" }
            ]
        },
        {
            language: "Kurdish (Central)",
            title: "پێویستیمان بە یارمەتییە",
            versions: [
                { name: "Kurdsat version", studio: "Kurdsat" },
                { name: "Pelistank TV original", studio: "Pelistank TV" },
                { name: "Pelistank TV redub", studio: "Pelistank TV" },
                { name: "Pelistank TV 2025", studio: "Pelistank TV" },
                { name: "Zaro TV version", studio: "Zaro TV" }
            ]
        },
        {
            language: "Kurdish (Northern)",
            title: "Verification needed",
            versions: [
                { name: "Filmiiz version", studio: "Filmiiz" },
                { name: "Heshin TV version", studio: "Heshin TV" },
                { name: "Türkiye version", studio: "Unknown broadcaster" }
            ]
        },
        {
            language: "Luri",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Macedonian",
            title: "Се бара помошник",
            versions: [
                { name: "A1 broadcast", studio: "A1" },
                { name: "HBO GO release", studio: "HBO GO" },
                { name: "MRT 1 broadcast", studio: "MRT 1" }
            ]
        },
        {
            language: "Malay",
            title: "Bantuan Dikehendaki",
            versions: []
        },
        {
            language: "Malayalam",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Mandarin (Mainland China)",
            title: "招募助理",
            versions: []
        },
        {
            language: "Mandarin (Taiwan)",
            title: "徵求助理",
            versions: [
                { name: "Nickelodeon Taiwan", studio: "Nickelodeon" },
                { name: "YoYo TV release", studio: "YoYo TV" }
            ]
        },
        {
            language: "Marathi",
            title: "मदत हवी आहे",
            versions: []
        },
        {
            language: "Māori",
            title: "Kei te Rapu Kaimahi",
            versions: [
                { name: "Māori Television broadcast", studio: "Māori Television" },
                { name: "Nickelodeon version", studio: "Nickelodeon" }
            ]
        },
        {
            language: "Mazandarani",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Norwegian",
            title: "Hjelp Søkes",
            versions: [
                { name: "Eurotroll / NorDubb dub", studio: "Eurotroll / NorDubb" },
                { name: "Sun Studio dub", studio: "Sun Studio" }
            ]
        },
        {
            language: "Odia",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Persian",
            title: "جویای کار",
            versions: [
                { name: "Persian Version A", studio: "Unverified Persian Studio A" },
                { name: "Persian Version B", studio: "Unverified Persian Studio B" }
            ]
        },
        {
            language: "Polish",
            title: "Potrzebna pomoc",
            versions: []
        },
        {
            language: "Portuguese (Brazil)",
            title: "Precisa-se de Ajudante",
            versions: []
        },
        {
            language: "Portuguese (Portugal)",
            title: "Precisa-se de Empregado",
            versions: [
                { name: "Nickelodeon Portugal", studio: "Nickelodeon" },
                { name: "SIC broadcast", studio: "SIC" }
            ]
        },
        {
            language: "Punjabi",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Romanian",
            title: "Se caută angajat",
            versions: []
        },
        {
            language: "Russian",
            title: "Требуется помощник",
            versions: []
        },
        {
            language: "Semnani",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Serbian",
            title: "Тражи се помоћник",
            versions: [
                { name: "B92 broadcast", studio: "B92" },
                { name: "Gold Digi Net (DVD)", studio: "Gold Digi Net" },
                { name: "Gold Digi Net (TV)", studio: "Gold Digi Net" }
            ]
        },
        {
            language: "Sinhala",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Slovak",
            title: "Hľadá sa pomocník",
            versions: [
                { name: "Markíza broadcast", studio: "Markíza" },
                { name: "Štúdio FINIKIN dub", studio: "Štúdio FINIKIN" }
            ]
        },
        {
            language: "Slovene",
            title: "Išče se pomočnik",
            versions: [
                { name: "Nickelodeon dub", studio: "Nickelodeon" },
                { name: "Studio Ritem dub", studio: "Studio Ritem" },
                { name: "TV3 broadcast", studio: "TV3" }
            ]
        },
        {
            language: "Spanish (Latin America)",
            title: "Se Busca Ayudante",
            versions: []
        },
        {
            language: "Spanish (Spain)",
            title: "Se Busca Ayudante",
            versions: []
        },
        {
            language: "Swedish",
            title: "Hjälp Sökes",
            versions: []
        },
        {
            language: "Tamil",
            title: "வேலைக்கு ஆட்கள் தேவை",
            versions: [
                { name: "Chutti TV release", studio: "Chutti TV" },
                { name: "ETV Bal Bharat release", studio: "ETV Bal Bharat" },
                { name: "Nickelodeon Tamil", studio: "Nickelodeon" }
            ]
        },
        {
            language: "Telugu",
            title: "సాయం కావాలి",
            versions: [
                { name: "ETV Bal Bharat release", studio: "ETV Bal Bharat" },
                { name: "Kushi TV release", studio: "Kushi TV" },
                { name: "Nickelodeon Telugu", studio: "Nickelodeon" }
            ]
        },
        {
            language: "Thai",
            title: "ต้องการความช่วยเหลือ",
            versions: []
        },
        {
            language: "Tibetan",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Turkish",
            title: "Eleman Aranıyor",
            versions: [
                { name: "Nickelodeon Turkey", studio: "Nickelodeon" },
                { name: "CNBC-e broadcast", studio: "CNBC-e" }
            ]
        },
        {
            language: "Ukrainian",
            title: "Потрібен помічник",
            versions: []
        },
        {
            language: "Urdu",
            title: "مدد درکار ہے",
            versions: []
        },
        {
            language: "Uyghur",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Vietnamese",
            title: "Tuyển Dụng Koki",
            versions: [
                { name: "Netflix release", studio: "Netflix" },
                { name: "YouTV broadcast", studio: "YouTV" }
            ]
        },
        {
            language: "Welsh",
            title: "Cymorth Ei Angen",
            versions: []
        },
        {
            language: "Zaza",
            title: "Verification needed",
            versions: []
        },
        {
            language: "Zulu",
            title: "Kudingeka Usizo",
            versions: []
        }
    ];

    /* ----------------------------------------------------------------------
       2. Dynamic Calculations & Statistics Updates
       ---------------------------------------------------------------------- */
    function updateStatistics() {
        let totalDubs = 0;
        const languagesCount = dubDatabase.length;

        dubDatabase.forEach(item => {
            if (item.versions && item.versions.length > 0) {
                totalDubs += item.versions.length;
            } else {
                totalDubs += 1;
            }
        });

        const dubsStatEl = document.getElementById("stat-dubs-count");
        const langsStatEl = document.getElementById("stat-languages-count");

        if (dubsStatEl) dubsStatEl.textContent = `${totalDubs}+`;
        if (langsStatEl) langsStatEl.textContent = languagesCount;
    }

    /* ----------------------------------------------------------------------
       3. Video Player Management Function
       ---------------------------------------------------------------------- */
    function playVideo(videoUrl, displayTitle) {
        const iframe = document.getElementById("video-player");
        const fallback = document.getElementById("video-fallback");
        const label = document.getElementById("now-playing-label");
        const fallbackMessage = document.getElementById("fallback-message");

        if (label) label.textContent = displayTitle;

        if (videoUrl && typeof videoUrl === "string" && videoUrl.trim() !== "") {
            // Show iframe, hide fallback message
            if (iframe) {
                iframe.src = videoUrl;
                iframe.style.display = "block";
            }
            if (fallback) fallback.classList.add("hidden");
        } else {
            // Show graceful missing video message
            if (iframe) {
                iframe.style.display = "none";
                iframe.src = "";
            }
            if (fallbackMessage) {
                fallbackMessage.textContent = `No confirmed video URL is currently cataloged for "${displayTitle}". Metadata archived.`;
            }
            if (fallback) fallback.classList.remove("hidden");
        }
    }

    /* ----------------------------------------------------------------------
       4. Render Table Rows Dynamically
       ---------------------------------------------------------------------- */
    function renderDubTable() {
        const tbody = document.getElementById("dub-table-body");
        if (!tbody) return;

        tbody.innerHTML = ""; // Clear existing rows

        dubDatabase.forEach((entry, index) => {
            const hasVersions = entry.versions && entry.versions.length > 0;
            const mainRowId = `main-row-${index}`;
            const subRowId = `version-row-${index}`;

            // Create Main Row
            const mainTr = document.createElement("tr");
            mainTr.className = "main-row";
            mainTr.id = mainRowId;

            // Column 1: Language
            const tdLang = document.createElement("td");
            tdLang.innerHTML = `<strong>${escapeHtml(entry.language)}</strong>`;
            mainTr.appendChild(tdLang);

            // Column 2: Dub Name / Title
            const tdTitle = document.createElement("td");
            tdTitle.textContent = entry.title || "—";
            mainTr.appendChild(tdTitle);

            // Column 3: Versions Column
            const tdVersions = document.createElement("td");
            if (hasVersions) {
                const versionBtn = document.createElement("button");
                versionBtn.className = "xp-action-btn version-btn";
                versionBtn.innerHTML = `▶ Show versions (${entry.versions.length})`;
                versionBtn.setAttribute("aria-expanded", "false");
                
                versionBtn.addEventListener("click", () => {
                    const subRow = document.getElementById(subRowId);
                    if (subRow) {
                        const isHidden = subRow.classList.contains("hidden");
                        if (isHidden) {
                            subRow.classList.remove("hidden");
                            versionBtn.innerHTML = `▼ Hide versions (${entry.versions.length})`;
                            versionBtn.setAttribute("aria-expanded", "true");
                        } else {
                            subRow.classList.add("hidden");
                            versionBtn.innerHTML = `▶ Show versions (${entry.versions.length})`;
                            versionBtn.setAttribute("aria-expanded", "false");
                        }
                    }
                });
                tdVersions.appendChild(versionBtn);
            } else {
                const span = document.createElement("span");
                span.className = "no-versions";
                span.textContent = "—";
                tdVersions.appendChild(span);
            }
            mainTr.appendChild(tdVersions);

            // Column 4: Main Play Button
            const tdPlay = document.createElement("td");
            const playBtn = document.createElement("button");
            playBtn.className = "xp-action-btn play-btn";
            playBtn.innerHTML = "▶ Play";
            
            playBtn.addEventListener("click", () => {
                const titleText = `${entry.language} — ${entry.title}`;
                playVideo(entry.video, titleText);
            });
            
            tdPlay.appendChild(playBtn);
            mainTr.appendChild(tdPlay);

            // Append Main Row to Table
            tbody.appendChild(mainTr);

            // If entry has versions, create expandable Sub-Row
            if (hasVersions) {
                const subTr = document.createElement("tr");
                subTr.className = "version-row hidden";
                subTr.id = subRowId;

                const subTd = document.createElement("td");
      