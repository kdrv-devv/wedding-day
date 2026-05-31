const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const openInviteBtn = document.getElementById("openInviteBtn");
const languageSwitcher = document.querySelector(".language-switcher");
const languageButtons = document.querySelectorAll(".language-option");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const backgroundMusic = document.getElementById("backgroundMusic");

const targetWeddingDate = new Date("2026-06-04T18:00:00+05:00").getTime();
const OPENING_DURATION_MS = 1000;
const DEFAULT_LANGUAGE = "uz";
const LANGUAGE_STORAGE_KEY = "weddingInvitationLanguage";
const MUSIC_VOLUME = 0.16;
const ONE_SECOND_MS = 1000;
const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
const ONE_HOUR_MS = ONE_MINUTE_MS * 60;
const ONE_DAY_MS = ONE_HOUR_MS * 24;

if (window.Telegram && window.Telegram.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.ready();
  if (tg.requestFullscreen) {
    try {
      tg.requestFullscreen();
    } catch (e) {}
  }
}

const LOCALES = {
  ru: {
    pageTitle: "Наврузбек и Ранохон | Свадебное приглашение",
    metaDescription:
      "Свадебное приглашение Наврузбек и Ранохон на 4 июнь 2026 года.",
    ariaIntro: "Конверт с приглашением",
    ariaEnvelope: "Запечатанный бумажный конверт",
    ariaWeddingDate: "Дата свадьбы",
    ariaCalendar: "Календарь июнь 2026 с выделенным 4 июнь",
    ariaWeddingDay: "День свадьбы",
    ariaOrnamentHero: "Орнамент с именами молодоженов и датой свадьбы",
    ariaVenueDetails: "Место проведения",
    ariaCountdown: "Обратный отсчет",
    envelopeTopNote:
      '<span class="flap-note-top">ВЫ</span><span class="flap-note-middle">ПРИГЛАШЕНЫ</span><span class="flap-note-script">на свадьбу</span>',
    withLove: "с любовью,",
    signatureNames: "Наврузбек\u00a0и\u00a0Ранохон",
    ornamentNames:
      '<span class="ornament-name-line">Наврузбек</span><span class="ornament-name-amp">и</span><span class="ornament-name-line">Ранохон</span>',
    ornamentMessage: "Спешим сообщить<br />радостную новость:<br />мы женимся!",
    ornamentDay: "04",
    ornamentMonth: "06",
    ornamentYear: "26",
    heroNames:
      'Дорогие&nbsp;наши<br />родные&nbsp;и&nbsp;<span class="no-break">близкие!</span>',
    openHere: "нажмите",
    lead: "В этот прекрасный день мы соединяем наши сердца и начинаем новую историю - историю нашей любви.<br /><br />Будем счастливы разделить радость этого особенного момента вместе с вами.<br /><br /><strong>С любовью приглашаем вас на нашу свадьбу.</strong>",
    scrollHint: "Листайте вниз",
    calendarMonth: "Июнь, 2026",
    weekdayMon: "ПН",
    weekdayTue: "ВТ",
    weekdayWed: "СР",
    weekdayThu: "ЧТ",
    weekdayFri: "ПТ",
    weekdaySat: "СБ",
    weekdaySun: "ВС",
    locationTitle: "Место проведения",
    venueName: "ресторан Gulsanam",
    venueAddress: "Бувайдинский район",
    venueLandmark: "Ориентир: Бувайдинский район, свадебный зал Gulsanam.",
    mapLinkYandex: "Яндекс Карты",
    mapLinkGoogle: "Google Maps",
    countdownTitle: "Считаем каждое мгновение",
    unitDays: "Дней",
    unitHours: "Часов",
    unitMinutes: "Минут",
    unitSeconds: "Секунд",
    countdownWaiting: "Мы ждем вас.",
    countdownToday: "Этот день настал. Мы ждем вас.",
    languageSwitcher: "Выбор языка",
    languageRuLabel: "Русский",
    languageUzLabel: "O'zbekcha",
    musicPlayLabel: "Включить музыку",
    musicPauseLabel: "Остановить музыку",
  },
  uz: {
    pageTitle: "Navro'zbek va Ra'nohon | To'y taklifnomasi",
    metaDescription:
      "Navro'zbek va Ra'nohonning 2026-yil 4-iyun kungi to'y taklifnomasi.",
    ariaIntro: "Taklifnoma konverti",
    ariaEnvelope: "Muhrlangan qog'oz konvert",
    ariaWeddingDate: "To'y sanasi",
    ariaCalendar: "2026-yil iyun kalendari, 4-iyun belgilangan",
    ariaWeddingDay: "To'y kuni",
    ariaOrnamentHero: "Yoshlar ismi va to'y sanasi yozilgan bezak",
    ariaVenueDetails: "To'y manzili",
    ariaCountdown: "Orqaga sanoq",
    envelopeTopNote:
      '<span class="flap-note-top">SIZ</span><span class="flap-note-middle">TO\'YIMIZGA</span><span class="flap-note-script">taklif etilgansiz</span>',
    withLove: "muhabbat ila,",
    signatureNames: "Navro'zbek\u00a0va\u00a0Ra'nohon",
    ornamentNames:
      '<span class="ornament-name-line">Navro\'zbek</span><span class="ornament-name-amp">va</span><span class="ornament-name-line">Ra\'nohon</span>',
    ornamentMessage: "Quvonchli yangilik:<br />biz turmush<br />quramiz!",
    ornamentDay: "04",
    ornamentMonth: "06",
    ornamentYear: "26",
    heroNames:
      'Aziz\u00a0va\u00a0qadrdon<br /><span class="no-break">insonimiz!</span>',
    openHere: "ochish",
    lead: "Hayotimizdagi eng baxtli kunlardan biri - nikoh to'yimizni siz bilan birga nishonlashni niyat qildik.<br /><br />Sizni ushbu kechamizga samimiy taklif etamiz.<br /><br /><strong>Quvonchli kunimizda aziz mehmonimiz bo'lishingizni intizorlik bilan kutamiz.</strong>",
    scrollHint: "Pastga suring",
    calendarMonth: "Iyun, 2026",
    weekdayMon: "DU",
    weekdayTue: "SE",
    weekdayWed: "CHOR",
    weekdayThu: "PAY",
    weekdayFri: "JUM",
    weekdaySat: "SHAN",
    weekdaySun: "YAK",
    locationTitle: "To'y manzili",
    venueName: "Gulsanam restorani",
    venueAddress: "Buvayda tumani",
    venueLandmark: "Mo'ljal: Buvayda tumani Gulsanam to'yxonasi",
    mapLinkYandex: "Yandex xaritasi",
    mapLinkGoogle: "Google Maps",
    countdownTitle: "Har lahzani sanayapmiz",
    unitDays: "Kun",
    unitHours: "Soat",
    unitMinutes: "Daqiqa",
    unitSeconds: "Soniya",
    countdownWaiting: "Sizni intiqlik bilan kutamiz.",
    countdownToday: "Bugun aynan o'sha kun. Sizni kutamiz.",
    languageSwitcher: "Til tanlash",
    languageRuLabel: "Ruscha",
    languageUzLabel: "O'zbekcha",
    musicPlayLabel: "Musiqani yoqish",
    musicPauseLabel: "Musiqani to'xtatish",
  },
};

let isOpening = false;
let currentLanguage = DEFAULT_LANGUAGE;
let ornamentNameFitFrame = null;

function getLocale() {
  return LOCALES[currentLanguage] || LOCALES[DEFAULT_LANGUAGE];
}

function isMusicPlaying() {
  if (!backgroundMusic) {
    return false;
  }

  return !backgroundMusic.paused && !backgroundMusic.ended;
}

function updateMusicToggleState(isPlaying = false) {
  if (!musicToggleBtn) {
    return;
  }

  const locale = getLocale();
  const label = isPlaying ? locale.musicPauseLabel : locale.musicPlayLabel;

  musicToggleBtn.classList.toggle("is-playing", isPlaying);
  musicToggleBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  musicToggleBtn.setAttribute("aria-label", label);
  musicToggleBtn.setAttribute("title", label);
}

function playBackgroundMusic() {
  if (!backgroundMusic) {
    return;
  }

  backgroundMusic.loop = true;
  backgroundMusic.volume = MUSIC_VOLUME;

  const playPromise = backgroundMusic.play();
  if (playPromise && typeof playPromise.then === "function") {
    playPromise
      .then(() => {
        updateMusicToggleState(true);
      })
      .catch(() => {
        updateMusicToggleState(false);
      });
    return;
  }

  updateMusicToggleState(isMusicPlaying());
}

function stopBackgroundMusic() {
  if (!backgroundMusic) {
    return;
  }

  backgroundMusic.pause();
  updateMusicToggleState(false);
}

function toggleBackgroundMusic() {
  if (!backgroundMusic) {
    return;
  }

  if (isMusicPlaying()) {
    stopBackgroundMusic();
    return;
  }

  playBackgroundMusic();
}

function setLanguageSwitcherState(lang) {
  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function saveLanguagePreference(lang) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (_error) {
    // Ignore storage access issues (private mode, disabled storage, etc.).
  }
}

function getSavedLanguagePreference() {
  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return LOCALES[savedLanguage] ? savedLanguage : null;
  } catch (_error) {
    return null;
  }
}

function detectBrowserLanguage() {
  const preferredLanguages = [
    navigator.language,
    ...(navigator.languages || []),
  ].filter(Boolean);
  const matchedLanguage = preferredLanguages
    .map((language) => language.toLowerCase())
    .find((language) => language.startsWith("uz") || language.startsWith("ru"));

  if (!matchedLanguage) {
    return DEFAULT_LANGUAGE;
  }

  if (matchedLanguage.startsWith("uz")) {
    return "uz";
  }

  return "ru";
}

function getInitialLanguage() {
  return getSavedLanguagePreference() || DEFAULT_LANGUAGE;
}

function fitOrnamentNames() {
  const namesBlock = document.querySelector(".ornament-names");
  if (!namesBlock) {
    return;
  }

  const nameLines = Array.from(
    namesBlock.querySelectorAll(".ornament-name-line")
  );
  if (!nameLines.length) {
    return;
  }

  namesBlock.style.setProperty("--ornament-name-fit-scale", "1");
  nameLines.forEach((line) => {
    line.style.setProperty("--line-fit-scale", "1");
  });

  const availableWidth = namesBlock.clientWidth;
  if (!availableWidth) {
    return;
  }

  const sideSafePadding = Math.max(12, availableWidth * 0.085);
  const safeWidth = Math.max(0, availableWidth - sideSafePadding * 2);
  if (!safeWidth) {
    return;
  }

  nameLines.forEach((line) => {
    const lineWidth = line.scrollWidth;
    if (!lineWidth) {
      return;
    }

    const fitScale = Math.max(
      0.62,
      Math.min(1, (safeWidth / lineWidth) * 0.97)
    );
    line.style.setProperty("--line-fit-scale", fitScale.toFixed(3));
  });
}

function scheduleOrnamentNameFit() {
  if (ornamentNameFitFrame !== null) {
    window.cancelAnimationFrame(ornamentNameFitFrame);
  }

  ornamentNameFitFrame = window.requestAnimationFrame(() => {
    fitOrnamentNames();
    ornamentNameFitFrame = null;
  });
}

function decodeBase64Url(str) {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (e) {
    return null;
  }
}

function applyTranslations(lang = DEFAULT_LANGUAGE) {
  if (!LOCALES[lang]) {
    return;
  }

  currentLanguage = lang;
  setLanguageSwitcherState(lang);
  const locale = { ...getLocale() };

  try {
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get("guest");

    if (
      window.Telegram &&
      window.Telegram.WebApp &&
      window.Telegram.WebApp.initDataUnsafe
    ) {
      const startParam = window.Telegram.WebApp.initDataUnsafe.start_param;
      if (startParam) {
        guestName = decodeBase64Url(startParam) || guestName;
      }
    }

    if (guestName) {
      const safeGuestName = guestName
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      locale.heroNames = `<span class="no-break">${safeGuestName}</span>`;
    }
  } catch (e) {
    // Ignore URL parsing errors
  }

  document.documentElement.lang = lang;
  document.title = locale.pageTitle;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", locale.metaDescription);
  }

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && Object.prototype.hasOwnProperty.call(locale, key)) {
      node.textContent = locale[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.getAttribute("data-i18n-html");
    if (key && Object.prototype.hasOwnProperty.call(locale, key)) {
      node.innerHTML = locale[key];
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    const rawMapping = node.getAttribute("data-i18n-attr");
    if (!rawMapping) {
      return;
    }

    rawMapping.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((item) => item.trim());
      if (!attr || !key) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(locale, key)) {
        node.setAttribute(attr, locale[key]);
      }
    });
  });

  const countdownMessage = document.getElementById("countdownMessage");
  if (countdownMessage) {
    countdownMessage.textContent = locale.countdownWaiting;
  }

  scheduleOrnamentNameFit();
  updateMusicToggleState(isMusicPlaying());
}

function openInvitation() {
  if (isOpening) {
    return;
  }

  isOpening = true;
  intro.classList.add("opened");
  openInviteBtn.setAttribute("aria-expanded", "true");
  playBackgroundMusic();

  window.setTimeout(() => {
    document.body.classList.add("invitation-visible");
    invitation.setAttribute("aria-hidden", "false");
    intro.classList.add("fade-out");
    scheduleOrnamentNameFit();

    revealVisibleSections();

    window.setTimeout(() => {
      intro.hidden = true;
    }, 900);
  }, OPENING_DURATION_MS);
}

function revealVisibleSections() {
  const reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((node) => node.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  reveals.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
    observer.observe(node);
  });
}

function setCountdownValues(days, hours, minutes, seconds) {
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );
}

function updateCountdown() {
  const now = Date.now();
  const difference = targetWeddingDate - now;
  const countdownMessage = document.getElementById("countdownMessage");
  const locale = getLocale();

  if (difference <= 0) {
    setCountdownValues(0, 0, 0, 0);
    countdownMessage.textContent = locale.countdownToday;
    return false;
  }

  const days = Math.floor(difference / ONE_DAY_MS);
  const hours = Math.floor((difference % ONE_DAY_MS) / ONE_HOUR_MS);
  const minutes = Math.floor((difference % ONE_HOUR_MS) / ONE_MINUTE_MS);
  const seconds = Math.floor((difference % ONE_MINUTE_MS) / ONE_SECOND_MS);

  setCountdownValues(days, hours, minutes, seconds);
  countdownMessage.textContent = locale.countdownWaiting;
  return true;
}

function handleLanguageSwitcherClick(event) {
  const button = event.target.closest(".language-option");
  if (!button) {
    return;
  }

  const selectedLanguage = button.dataset.language;
  if (
    !selectedLanguage ||
    selectedLanguage === currentLanguage ||
    !LOCALES[selectedLanguage]
  ) {
    return;
  }

  applyTranslations(selectedLanguage);
  updateCountdown();
  saveLanguagePreference(selectedLanguage);
}

openInviteBtn.addEventListener("click", openInvitation);
if (languageSwitcher) {
  languageSwitcher.addEventListener("click", handleLanguageSwitcherClick);
}
if (musicToggleBtn) {
  musicToggleBtn.addEventListener("click", toggleBackgroundMusic);
}
if (backgroundMusic) {
  backgroundMusic.loop = true;
  backgroundMusic.volume = MUSIC_VOLUME;
}

applyTranslations(getInitialLanguage());
window.addEventListener("resize", scheduleOrnamentNameFit);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    scheduleOrnamentNameFit();
  });
}
updateCountdown();
const countdownInterval = window.setInterval(() => {
  const hasTimeLeft = updateCountdown();
  if (!hasTimeLeft) {
    window.clearInterval(countdownInterval);
  }
}, 1000);
