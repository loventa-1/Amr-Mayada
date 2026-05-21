/* ════════════════════════════════════════════════════════════════════
   WEDDING INVITATION · MAIN SCRIPT
   Optimized & Complete - Amr & Mayada + SOCIAL MEDIA VARIABLES
   ════════════════════════════════════════════════════════════════════ */

"use strict";

/* ========================= CONFIGURATION ========================= */
const CONFIG = {
  // Couple Names
  groomName: "Amr",
  brideName: "Mayada",
  groomNameAr: "عمرو",
  brideNameAr: "ميادة",

  // Wedding Details
  weddingDate: "June 6, 2026",
  weddingDateAr: "٦ يونيو ٢٠٢٦",
  weddingTime: "7:00 PM",
  weddingLocation: "At Home",
  weddingLocationAr: "أمام المنزل",
  weddingMapLink:
    "https://www.google.com/maps?q=30.725908279418945,31.246858596801758&z=17&hl=en",

  // ========== SOCIAL MEDIA LINKS (UPDATE THESE WITH YOUR ACTUAL LINKS) ==========
  socialLinks: {
    whatsapp: "https://wa.me/201505646406", // واتساب - replace with your WhatsApp number (e.g., https://wa.me/201234567890)
    phone: "tel:+201505646406", // رقم التليفون - replace with your phone number
    tiktok: "https://www.tiktok.com/@loventa68", // تيك توك - replace with your TikTok username link
    instagram: "https://www.instagram.com/love__nta/", // انستجرام - replace with your Instagram profile
    facebook:
      "https://www.facebook.com/profile.php?id=61565289157594&mibextid=wwXIfr&rdid=LvOEQfQIXRkCukV0&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Ck7EUrzmW%2F%3Fmibextid%3DwwXIfr#/", // فيس بوك - replace with your Facebook profile
  },

  // Phone number to display in footer (text)
  displayPhoneNumber: "+201505646406", // الرقم الذي سيظهر في الفوتر - replace with your phone number

  // Asset Paths (UPDATE THESE PATHS TO MATCH YOUR FILES)
  crestImage:
    "assets/images/Gemini_Generated_Image_aai6peaai6peaai6-removebg-preview.webp",
  doorStaticBg: "assets/images/demo3.webp",
  doorGif: "assets/images/image1.mp4",
  detailsBg: "assets/images/image2.webp",
  musicUrl: "assets/music/music1.mp3",

  // Couple Photos (UPDATE THESE PATHS AND CAPTIONS)
  couplePhotos: [
    {
      src: "assets/images/couple-1.webp",
      captionEn: "Our Beautiful Beginning",
      captionAr: "بدايتنا الجميلة",
    },
    {
      src: "assets/images/couple-2.webp",
      captionEn: "Together Forever",
      captionAr: "معاً للأبد",
    },
    {
      src: "assets/images/couple-3.webp",
      captionEn: "Love in Every Moment",
      captionAr: "الحب في كل لحظة",
    },
  ],

  assetsToPreload: [],
};

// Build preload array
CONFIG.assetsToPreload = [
  CONFIG.crestImage,
  CONFIG.doorStaticBg,
  CONFIG.doorGif,
  CONFIG.detailsBg,
  CONFIG.musicUrl,
  ...CONFIG.couplePhotos.map((p) => p.src),
].filter(Boolean);

/* ========================= GLOBAL VARIABLES ========================= */
let currentLang = "en";
let loadProgress = 0;
let doorPlayed = false;
let bgMusic = null;
let countdownInterval = null;

/* ========================= DOM ELEMENTS ========================= */
const pageLoading = document.getElementById("page-loading");
const pageDoor = document.getElementById("page-door");
const pageDetails = document.getElementById("page-details");
const loadingBar = document.getElementById("loading-bar");
const doorGif = document.getElementById("door-gif");
const doorOverlay = document.getElementById("door-overlay");
const doorGlowRing = document.getElementById("door-glow-ring");
const knockBtn = document.getElementById("knock-btn");
const langBtnDoor = document.getElementById("lang-btn-door");
const langBtnDet = document.getElementById("lang-btn-details");
const particles = document.getElementById("particles");
const petalsWrap = document.getElementById("petals");

/* ========================= HELPER FUNCTIONS ========================= */
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function setBar(target) {
  const from = loadProgress;
  const start = performance.now();
  const duration = 400;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    loadProgress = from + (target - from) * easeInOut(t);
    loadingBar.style.width = loadProgress + "%";
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function transitionToPage(fromPage, toPage, cb) {
  fromPage.classList.add("fade-out");
  setTimeout(() => {
    fromPage.classList.remove("active", "fade-out");
    toPage.classList.add("active");
    if (cb) cb();
  }, 900);
}

/* ========================= CONTENT INJECTION ========================= */
function injectContent() {
  // Names
  document
    .querySelectorAll(".groom-name-en")
    .forEach((el) => (el.textContent = CONFIG.groomName));
  document
    .querySelectorAll(".bride-name-en")
    .forEach((el) => (el.textContent = CONFIG.brideName));
  document
    .querySelectorAll(".groom-name-ar")
    .forEach((el) => (el.textContent = CONFIG.groomNameAr));
  document
    .querySelectorAll(".bride-name-ar")
    .forEach((el) => (el.textContent = CONFIG.brideNameAr));

  // Wedding details
  document
    .querySelectorAll(".wedding-date-en")
    .forEach((el) => (el.textContent = CONFIG.weddingDate));
  document
    .querySelectorAll(".wedding-date-ar")
    .forEach((el) => (el.textContent = CONFIG.weddingDateAr));
  document
    .querySelectorAll(".wedding-time")
    .forEach((el) => (el.textContent = CONFIG.weddingTime));
  document
    .querySelectorAll(".wedding-location-en")
    .forEach((el) => (el.textContent = CONFIG.weddingLocation));
  document
    .querySelectorAll(".wedding-location-ar")
    .forEach((el) => (el.textContent = CONFIG.weddingLocationAr));
  document
    .querySelectorAll(".wedding-map-btn")
    .forEach((btn) => (btn.href = CONFIG.weddingMapLink));

  // Year
  const year = CONFIG.weddingDate.match(/\d{4}/)?.[0] || "2026";
  document
    .querySelectorAll(".wedding-year, .wedding-year-ar")
    .forEach((el) => (el.textContent = year));

  // Backgrounds & Crest
  const doorStaticBg = document.querySelector(".door-static-bg");
  const detailsBgEl = document.querySelector(".details-bg");
  if (doorStaticBg)
    doorStaticBg.style.backgroundImage = `url('${CONFIG.doorStaticBg}')`;
  if (detailsBgEl)
    detailsBgEl.style.backgroundImage = `url('${CONFIG.detailsBg}')`;
  document
    .querySelectorAll(".crest-img, #hero-crest-img")
    .forEach((img) => (img.src = CONFIG.crestImage));
}

function injectCouplePhotos() {
  for (let i = 0; i < CONFIG.couplePhotos.length; i++) {
    const photo = CONFIG.couplePhotos[i];
    const img = document.getElementById(`couple-photo-${i + 1}`);
    const captionEn = document.getElementById(`photo-caption-${i + 1}-en`);
    const captionAr = document.getElementById(`photo-caption-${i + 1}-ar`);
    if (img) img.src = photo.src;
    if (captionEn) captionEn.textContent = photo.captionEn;
    if (captionAr) captionAr.textContent = photo.captionAr;
  }
}

/* ========================= SOCIAL MEDIA LINKS INJECTION ========================= */
function injectSocialLinks() {
  // WhatsApp
  const whatsappLink = document.getElementById("social-whatsapp");
  if (whatsappLink && CONFIG.socialLinks.whatsapp) {
    whatsappLink.href = CONFIG.socialLinks.whatsapp;
  }

  // Phone
  const phoneLink = document.getElementById("social-phone");
  if (phoneLink && CONFIG.socialLinks.phone) {
    phoneLink.href = CONFIG.socialLinks.phone;
  }

  // TikTok
  const tiktokLink = document.getElementById("social-tiktok");
  if (tiktokLink && CONFIG.socialLinks.tiktok) {
    tiktokLink.href = CONFIG.socialLinks.tiktok;
  }

  // Instagram
  const instagramLink = document.getElementById("social-instagram");
  if (instagramLink && CONFIG.socialLinks.instagram) {
    instagramLink.href = CONFIG.socialLinks.instagram;
  }

  // Facebook
  const facebookLink = document.getElementById("social-facebook");
  if (facebookLink && CONFIG.socialLinks.facebook) {
    facebookLink.href = CONFIG.socialLinks.facebook;
  }

  // Footer phone number text and link
  const footerPhoneLink = document.getElementById("footer-phone-number");
  if (footerPhoneLink) {
    footerPhoneLink.textContent = CONFIG.displayPhoneNumber;
    if (CONFIG.socialLinks.phone) {
      footerPhoneLink.href = CONFIG.socialLinks.phone;
    }
  }
}

/* ========================= COUNTDOWN TIMER ========================= */
function startCountdown() {
  const weddingDateTime = new Date(2026, 5, 28, 19, 0, 0);

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDateTime - now;

    if (diff <= 0) {
      document.getElementById("countdown-days").textContent = "00";
      document.getElementById("countdown-hours").textContent = "00";
      document.getElementById("countdown-minutes").textContent = "00";
      document.getElementById("countdown-seconds").textContent = "00";
      if (countdownInterval) clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown-days").textContent = String(
      days,
    ).padStart(2, "0");
    document.getElementById("countdown-hours").textContent = String(
      hours,
    ).padStart(2, "0");
    document.getElementById("countdown-minutes").textContent = String(
      minutes,
    ).padStart(2, "0");
    document.getElementById("countdown-seconds").textContent = String(
      seconds,
    ).padStart(2, "0");
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

/* ========================= AUDIO HANDLING ========================= */
function initAudio() {
  bgMusic = document.getElementById("bg-music");
  if (CONFIG.musicUrl && bgMusic) {
    bgMusic.src = CONFIG.musicUrl;
    bgMusic.load();
    bgMusic.loop = true;
    bgMusic.volume = 0;
  }
}

function fadeInMusic(vol = 0.65, ms = 1500) {
  if (!bgMusic) return;
  bgMusic.volume = 0;
  bgMusic.play().catch((e) => console.log("Audio play error:", e));
  const step = vol / (ms / 50);
  const id = setInterval(() => {
    if (bgMusic.volume + step < vol) bgMusic.volume += step;
    else {
      bgMusic.volume = vol;
      clearInterval(id);
    }
  }, 50);
}

function enableAudioOnUserInteraction() {
  let activated = false;
  const enable = () => {
    if (activated) return;
    activated = true;
    if (bgMusic && bgMusic.paused && CONFIG.musicUrl) {
      bgMusic
        .play()
        .then(() => {
          bgMusic.pause();
          bgMusic.currentTime = 0;
        })
        .catch(() => {});
    }
    document.removeEventListener("click", enable);
    document.removeEventListener("touchstart", enable);
  };
  document.addEventListener("click", enable);
  document.addEventListener("touchstart", enable);
}

/* ========================= DOOR & VIDEO ========================= */
function playDoor() {
  if (doorPlayed) return;
  doorPlayed = true;

  // Play video (muted)
  doorGif.src = CONFIG.doorGif;
  doorGif.load();
  doorGif.currentTime = 0;
  doorGif.muted = true;
  doorGif.play().catch((e) => console.warn("Video play error:", e));

  // Fade in background music
  if (bgMusic && CONFIG.musicUrl) {
    bgMusic.currentTime = 0;
    fadeInMusic(0.65, 1500);
  }

  // Show door effects
  document.querySelector(".door-bg-wrap").classList.add("revealed");
  doorOverlay.style.opacity = "0";
  doorGlowRing.classList.add("active");

  // Hide knock button
  knockBtn.style.opacity = "0";
  knockBtn.style.pointerEvents = "none";
  knockBtn.style.transform = "scale(0.8)";

  // Transition to details page when video ends
  let transitionDone = false;
  const goToDetails = () => {
    if (transitionDone) return;
    transitionDone = true;
    transitionToPage(pageDoor, pageDetails, () => {
      startCountdown();
      spawnPetals();
      triggerFadeElements();
    });
  };

  doorGif.addEventListener("ended", goToDetails, { once: true });
  setTimeout(goToDetails, 15000); // Fallback
}

/* ========================= FADE IN ELEMENTS ON PAGE 3 ========================= */
function triggerFadeElements() {
  const fadeElements = document.querySelectorAll("#page-details .fade-element");
  fadeElements.forEach((el, index) => {
    el.style.animation = `fadeInUp 0.8s ease forwards`;
    el.style.animationDelay = `${index * 0.1}s`;
  });
}

/* ========================= ANIMATIONS ========================= */
function spawnParticles() {
  if (!particles) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 6 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 12 + 8}s;animation-delay:${Math.random() * 10}s;`;
    particles.appendChild(p);
  }
}

function spawnPetals() {
  if (!petalsWrap) return;
  petalsWrap.innerHTML = "";
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    const size = Math.random() * 8 + 4;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 18 + 12}s;animation-delay:${Math.random() * 14}s;`;
    petalsWrap.appendChild(p);
  }
}

/* ========================= PRELOADING ========================= */
function preloadAllAssets() {
  const total = CONFIG.assetsToPreload.length;
  if (total === 0) return Promise.resolve();
  let loaded = 0;
  const BAR_START = 10,
    BAR_END = 90;

  function onAssetDone() {
    loaded++;
    const pct = BAR_START + (loaded / total) * (BAR_END - BAR_START);
    setBar(pct);
  }

  const promises = CONFIG.assetsToPreload.map((src) => {
    return new Promise((resolve) => {
      const isVideo = /\.(mp4|webm|mov)$/i.test(src);
      const isAudio = /\.(mp3|wav|ogg)$/i.test(src);
      const timeout = setTimeout(() => resolve(), 12000);

      if (isVideo) {
        const video = document.createElement("video");
        video.preload = "auto";
        video.src = src;
        video.load();
        video.addEventListener(
          "canplaythrough",
          () => {
            clearTimeout(timeout);
            onAssetDone();
            resolve();
          },
          { once: true },
        );
        video.addEventListener(
          "error",
          () => {
            clearTimeout(timeout);
            onAssetDone();
            resolve();
          },
          { once: true },
        );
      } else if (isAudio) {
        const audio = new Audio();
        audio.preload = "auto";
        audio.src = src;
        audio.load();
        audio.addEventListener(
          "canplaythrough",
          () => {
            clearTimeout(timeout);
            onAssetDone();
            resolve();
          },
          { once: true },
        );
        audio.addEventListener(
          "error",
          () => {
            clearTimeout(timeout);
            onAssetDone();
            resolve();
          },
          { once: true },
        );
      } else {
        const img = new Image();
        img.onload = img.onerror = () => {
          clearTimeout(timeout);
          onAssetDone();
          resolve();
        };
        img.src = src;
      }
    });
  });

  return Promise.all(promises);
}

async function runLoadingScreen() {
  setBar(10);
  spawnParticles();
  await Promise.all([
    preloadAllAssets(),
    new Promise((r) => setTimeout(r, 2000)),
  ]);
  setBar(100);
  await new Promise((r) => setTimeout(r, 600));
  transitionToPage(pageLoading, pageDoor);
}

/* ========================= LANGUAGE TOGGLE ========================= */
function toggleLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  const html = document.documentElement;
  html.setAttribute("lang", currentLang);
  html.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
}

/* ========================= EVENT LISTENERS ========================= */
function bindEvents() {
  if (knockBtn) knockBtn.addEventListener("click", playDoor);
  if (langBtnDoor) langBtnDoor.addEventListener("click", toggleLanguage);
  if (langBtnDet) langBtnDet.addEventListener("click", toggleLanguage);
}

/* ========================= INITIALIZATION ========================= */
document.addEventListener("DOMContentLoaded", async () => {
  initAudio();
  injectContent();
  injectCouplePhotos();
  injectSocialLinks(); // Inject social media links
  bindEvents();
  enableAudioOnUserInteraction();

  pageLoading.classList.add("active");
  if (doorGif) doorGif.removeAttribute("src");

  await runLoadingScreen();
});
