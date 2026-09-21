/* ==========================================================================
   HELP WANTED — SpongeBob Dub Archive
   Global Event Handlers & Utility Script
   ========================================================================== */

/**
 * Handles playing a video or presenting a missing video fallback screen
 */
function playDub(title, videoUrl) {
    const iframe = document.getElementById("video-player");
    const fallback = document.getElementById("video-fallback");
    const label = document.getElementById("now-playing-label");
    const fallbackMessage = document.getElementById("fallback-message");

    if (label) {
        label.textContent = title;
    }

    if (videoUrl && typeof videoUrl === "string" && videoUrl.trim() !== "") {
        if (iframe) {
            iframe.src = videoUrl;
            iframe.style.display = "block";
        }
        if (fallback) {
            fallback.classList.add("hidden");
        }
    } else {
        if (iframe) {
            iframe.style.display = "none";
            iframe.src = "";
        }
        if (fallbackMessage) {
            fallbackMessage.textContent = `No video stream is currently cataloged for "${title}". Metadata recorded.`;
        }
        if (fallback) {
            fallback.classList.remove("hidden");
        }
    }
}

/**
 * Expands or collapses version rows directly below language entries
 */
function toggleVersion(rowId, buttonEl) {
    const subRow = document.getElementById(rowId);
    if (!subRow || !buttonEl) return;

    const isHidden = subRow.classList.contains("hidden");
    const currentText = buttonEl.textContent;

    if (isHidden) {
        subRow.classList.remove("hidden");
        buttonEl.textContent = currentText.replace("▶ Show", "▼ Hide");
        buttonEl.setAttribute("aria-expanded", "true");
    } else {
        subRow.classList.add("hidden");
        buttonEl.textContent = currentText.replace("▼ Hide", "▶ Show");
        buttonEl.setAttribute("aria-expanded", "false");
    }
}

/**
 * Toggles the archive info section at the bottom
 */
function toggleArchiveInfo() {
    const toggleBtn = document.getElementById("toggle-info-btn");
    const infoBox = document.getElementById("info-content-box");

    if (toggleBtn && infoBox) {
        const isHidden = infoBox.classList.contains("hidden");
        if (isHidden) {
            infoBox.classList.remove("hidden");
            toggleBtn.innerHTML = '<span class="arrow">▲</span> Hide information';
        } else {
            infoBox.classList.add("hidden");
            toggleBtn.innerHTML = '<span class="arrow">▼</span> Show more information';
        }
    }
}
