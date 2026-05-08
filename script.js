const onboardingSlides = [
  { art: "diary", title: "함께한 순간을 사진과 글로 남겨요.", body: "데이트, 여행, 일상까지 우리만의 기록으로 모아둘 수 있어요." },
  { art: "lock", title: "나만의 마음과 함께 보는 일기를 따로 기록해요.", body: "개인 일기와 공유 일기를 구분해서 안전하게 남길 수 있어요." },
  { art: "message", title: "전하고 싶은 말을 더 부드럽게 정리해요.", body: "질문, 일기, 기록에서 꺼낸 마음을 확인하고 다듬어 보낼 수 있어요." },
];

const state = {
  slide: 0,
  connected: true,
  aloneCtaHidden: false,
  switchPinEnabled: true,
  registeredEmails: (() => {
    try {
      return JSON.parse(localStorage.getItem("duariRegisteredEmails") || "[]");
    } catch {
      return [];
    }
  })(),
  registeredAccounts: (() => {
    try {
      return JSON.parse(localStorage.getItem("duariRegisteredAccounts") || "[]");
    } catch {
      return [];
    }
  })(),
  tab: "home",
  albumView: "record",
  diaryView: "shared",
  memories: [
    { title: "성수에서 보낸 오후", date: "2026.04.26", place: "서울숲", type: "데이트", note: "바람이 좋아서 오래 걸었다.", scope: "우리 둘이 보기", feelings: ["편안함", "고마움"], reaction: "또 가자", author: "나" },
    { title: "비 오는 날의 통화", date: "2026.04.21", place: "집", type: "대화", note: "말하기 어려운 것도 천천히 꺼냈다.", scope: "나만 보기", feelings: ["솔직함"], reaction: "", author: "나" },
    { title: "한강에서 먹은 저녁", date: "2026.04.18", place: "한강공원", type: "데이트", note: "돗자리 위에서 오래 이야기했다.", scope: "우리 둘이 보기", feelings: ["즐거움", "편안함"], reaction: "좋았어", author: "나" },
    { title: "첫 봄 산책", date: "2026.04.12", place: "올림픽공원", type: "일상", note: "꽃이 피는 길을 천천히 걸었다.", scope: "우리 둘이 보기", feelings: ["설렘", "고마움"], reaction: "소중해", author: "나" },
    { title: "기념일 케이크", date: "2026.04.05", place: "연남동", type: "기념일", note: "작은 케이크 하나로도 충분히 특별했다.", scope: "우리 둘이 보기", feelings: ["소중함", "기쁨"], reaction: "고마워", author: "나" },
    { title: "늦은 밤 메시지", date: "2026.03.29", place: "집", type: "마음 기록", note: "전하고 싶었던 말을 조금씩 정리했다.", scope: "나만 보기", feelings: ["솔직함", "기대"], reaction: "", author: "나" },
    { title: "주말 짧은 여행", date: "2026.03.22", place: "강릉", type: "여행", note: "바다를 보며 다음 여행 이야기를 했다.", scope: "우리 둘이 보기", feelings: ["기대", "편안함"], reaction: "또 가자", author: "나" },
    { title: "조용한 화해", date: "2026.03.16", place: "카페", type: "대화", note: "서로의 속도를 다시 맞춰보기로 했다.", scope: "우리 둘이 보기", feelings: ["안도", "고마움"], reaction: "나도 그래", author: "나" },
  ],
  diaries: [
    { title: "오늘 고마웠던 것", body: "작은 말에도 내 편이 있다는 느낌이 들었다.", scope: "공유", type: "내 공유", feelings: ["고마움", "안정"], linked: "성수에서 보낸 오후", author: "나", date: "2026.05.02" },
    { title: "천천히 걸었던 길", body: "별말 없이 걸어도 마음이 편해지는 하루였다.", scope: "공유", type: "내 공유", feelings: ["편안함", "다정함"], linked: "성수에서 보낸 오후", author: "나", date: "2026.05.01" },
    { title: "기억하고 싶은 말", body: "무심코 건넨 말이 오래 남아서 함께 적어두고 싶었다.", scope: "공유", type: "내 공유", feelings: ["고마움", "소중함"], linked: "성수에서 보낸 오후", author: "나", date: "2026.04.30" },
    { title: "같이 웃었던 순간", body: "사소한 농담에도 한참 웃던 장면이 자꾸 떠오른다.", scope: "공유", type: "내 공유", feelings: ["즐거움", "설렘"], linked: "성수에서 보낸 오후", author: "나", date: "2026.04.29" },
    { title: "다시 가고 싶은 곳", body: "오늘의 공기와 온도가 우리 기록에 오래 남았으면 좋겠다.", scope: "공유", type: "내 공유", feelings: ["기대", "편안함"], linked: "성수에서 보낸 오후", author: "나", date: "2026.04.28" },
    { title: "마음을 건넨 밤", body: "조금 늦게 말했지만 그래도 전할 수 있어서 다행이었다.", scope: "공유", type: "내 공유", feelings: ["안도", "고마움"], linked: "성수에서 보낸 오후", author: "나", date: "2026.04.27" },
    { title: "아직 정리 중인 마음", body: "서운했던 일을 바로 말하기보다 조금 더 내 마음을 들여다보기.", scope: "개인", type: "나만 보기", feelings: ["서운함"], linked: "비 오는 날의 통화", author: "나", date: "2026.05.02" },
    { title: "말하지 못한 이유", body: "상대가 싫어서가 아니라 내가 아직 정리하지 못한 마음이었다.", scope: "개인", type: "나만 보기", feelings: ["솔직함", "조심스러움"], linked: "비 오는 날의 통화", author: "나", date: "2026.05.01" },
    { title: "혼자 남겨둔 생각", body: "오늘 느낀 감정을 조금 더 자세히 적어두고 싶었다.", scope: "개인", type: "나만 보기", feelings: ["차분함", "그리움"], linked: "비 오는 날의 통화", author: "나", date: "2026.04.30" },
    { title: "내가 바랐던 것", body: "크게 바란 건 아니지만 알아주면 좋겠다고 생각했다.", scope: "개인", type: "나만 보기", feelings: ["기대", "서운함"], linked: "비 오는 날의 통화", author: "나", date: "2026.04.29" },
    { title: "괜찮아지는 중", body: "시간이 조금 지나니 마음이 부드럽게 가라앉았다.", scope: "개인", type: "나만 보기", feelings: ["안정", "안도"], linked: "비 오는 날의 통화", author: "나", date: "2026.04.28" },
    { title: "다음엔 이렇게 말하기", body: "내 마음을 탓하지 않고 짧고 솔직하게 말해보기.", scope: "개인", type: "나만 보기", feelings: ["용기", "솔직함"], linked: "비 오는 날의 통화", author: "나", date: "2026.04.27" },
    { title: "고마운 마음", body: "오늘 고마웠던 장면을 조금 더 다듬어서 전하고 싶다.", scope: "draft", type: "임시 저장", feelings: ["고마움"], linked: "관련 기록 없음", author: "나", date: "2026.05.02" },
    { title: "서운했던 순간", body: "서운함을 탓처럼 들리지 않게 정리해보고 있다.", scope: "draft", type: "임시 저장", feelings: ["서운함", "조심스러움"], linked: "관련 기록 없음", author: "나", date: "2026.05.01" },
    { title: "다음 데이트", body: "다음에 같이 가고 싶은 곳과 이유를 적어두었다.", scope: "draft", type: "임시 저장", feelings: ["기대"], linked: "관련 기록 없음", author: "나", date: "2026.04.30" },
    { title: "미안한 마음", body: "내가 놓쳤던 부분을 인정하고 부드럽게 말해보고 싶다.", scope: "draft", type: "임시 저장", feelings: ["미안함", "솔직함"], linked: "관련 기록 없음", author: "나", date: "2026.04.29" },
    { title: "오래 남은 말", body: "상대가 해준 말 중 오래 남은 문장을 정리 중이다.", scope: "draft", type: "임시 저장", feelings: ["소중함"], linked: "관련 기록 없음", author: "나", date: "2026.04.28" },
    { title: "오늘의 마음", body: "지금 바로 보내기보다 조금 더 생각해보고 싶다.", scope: "draft", type: "임시 저장", feelings: ["차분함"], linked: "관련 기록 없음", author: "나", date: "2026.04.27" },
  ],
  hiddenPhotos: ["성수에서 보낸 오후 · 3번째 사진", "여행 1주년 · 1번째 사진"],
  anniversaries: [
    { name: "여행 1주년", date: "2026.05.06", repeat: true, alert: true },
    { name: "500일", date: "2026.07.18", repeat: false, alert: true },
  ],
  notifications: [
    { type: "기록", text: "상대가 새 우리 기록을 추가함" },
    { type: "다이어리", text: "상대가 내 공유 일기에 반응함" },
    { type: "기념일", text: "가까운 기념일 D-7" },
    { type: "시스템", text: "공유 동의 요청이 도착함" },
  ],
};

const DUARI_CONTENT_STORAGE_PREFIX = "duariContent:";
const DUARI_ACTIVE_LOGIN_STORAGE_KEY = "duariActiveLogin";
const duariBundledMemorySignatures = new Set([
  "성수에서 보낸 오후|2026.04.26",
  "비 오는 날의 통화|2026.04.21",
  "한강에서 먹은 저녁|2026.04.18",
  "첫 봄 산책|2026.04.12",
  "기념일 케이크|2026.04.05",
  "늦은 밤 메시지|2026.03.29",
  "주말 짧은 여행|2026.03.22",
  "조용한 화해|2026.03.16",
]);

function duariCurrentStorageUserKey() {
  const raw = state.currentLoginEmail || "local";
  return typeof normalizeSignupEmail === "function" ? (normalizeSignupEmail(raw) || "local") : String(raw || "local").trim().toLowerCase();
}

function duariContentStorageKey(email = state.currentLoginEmail) {
  const raw = email || "local";
  const key = typeof normalizeSignupEmail === "function" ? (normalizeSignupEmail(raw) || "local") : String(raw || "local").trim().toLowerCase();
  return `${DUARI_CONTENT_STORAGE_PREFIX}${key}`;
}

function duariRememberCurrentLogin() {
  const key = typeof normalizeSignupEmail === "function"
    ? normalizeSignupEmail(state.currentLoginEmail || "")
    : String(state.currentLoginEmail || "").trim().toLowerCase();
  if (!key) return;
  try {
    localStorage.setItem(DUARI_ACTIVE_LOGIN_STORAGE_KEY, key);
  } catch {
    // Keep the prototype usable when browser storage is unavailable.
  }
}

function duariForgetCurrentLogin() {
  try {
    localStorage.removeItem(DUARI_ACTIVE_LOGIN_STORAGE_KEY);
  } catch {
    // Nothing else to do in the prototype fallback.
  }
}

function duariIsBundledSampleMemory(memory = {}) {
  return duariBundledMemorySignatures.has(`${memory.title || ""}|${memory.date || ""}`);
}

function duariHasStoredContentForCurrentUser() {
  try {
    return localStorage.getItem(duariContentStorageKey()) !== null;
  } catch {
    return false;
  }
}

function duariStripBundledSamplesFromAccountContent() {
  state.memories = (state.memories || []).filter((memory) => !duariIsBundledSampleMemory(memory));
  state.diaries = (state.diaries || []).filter((diary) => {
    if (typeof duariIsBundledSampleDiary !== "function") return true;
    return !duariIsBundledSampleDiary(diary);
  });
}

function duariInitializeEmptyContentForCurrentAccount() {
  state.memories = [];
  state.diaries = [];
  state.questionHistory = [];
  duariSavePersistentContent();
}

function duariSavePersistentContent() {
  try {
    localStorage.setItem(duariContentStorageKey(), JSON.stringify({
      memories: state.memories,
      diaries: state.diaries,
      questionHistory: state.questionHistory,
    }));
  } catch {
    showToast?.("저장 공간이 부족해요. 사진을 줄여 다시 저장해 주세요.");
  }
}

function duariLoadPersistentContent() {
  try {
    const raw = localStorage.getItem(duariContentStorageKey());
    const saved = JSON.parse(raw || "null");
    if (raw) {
      state.memories = Array.isArray(saved?.memories) ? saved.memories : [];
      state.diaries = Array.isArray(saved?.diaries) ? saved.diaries : [];
      state.questionHistory = Array.isArray(saved?.questionHistory) ? saved.questionHistory : [];
      duariStripBundledSamplesFromAccountContent();
      duariSavePersistentContent();
    } else if (state.currentLoginEmail) {
      duariInitializeEmptyContentForCurrentAccount();
    }
  } catch {
    if (state.currentLoginEmail) duariInitializeEmptyContentForCurrentAccount();
  }
  duariInstallContentPersistenceHooks();
}

function duariDeletePersistentContentForCurrentUser() {
  try {
    localStorage.removeItem(duariContentStorageKey());
  } catch {
    // Nothing else to do in the prototype fallback.
  }
}

function duariTodayDateText() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

function duariWrapPersistentArray(array) {
  if (!Array.isArray(array) || array.__duariPersistWrapped) return;
  Object.defineProperty(array, "__duariPersistWrapped", { value: true, configurable: true });
  Object.defineProperty(array, "unshift", {
    configurable: true,
    value: function persistentUnshift(...items) {
      const result = Array.prototype.unshift.apply(this, items);
      duariSavePersistentContent();
      return result;
    }
  });
}

function duariInstallContentPersistenceHooks() {
  duariWrapPersistentArray(state.memories);
  duariWrapPersistentArray(state.diaries);
  duariWrapPersistentArray(state.questionHistory);
}

const titles = { home: "홈", album: "기록", diary: "일기", questions: "질문", my: "마이" };

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

function duariPhotoListForMemory(index) {
  const memory = state.memories?.[Number(index)];
  return Array.isArray(memory?.photos) ? memory.photos : [];
}

function duariPhotoSource(photo) {
  if (!photo) return "";
  return typeof photo === "string" ? photo : (photo.src || "");
}

function duariActualPhotosForMemory(index) {
  return duariPhotoListForMemory(index).filter((photo) => !!duariPhotoSource(photo));
}

function duariActualPhotoCountForMemory(index) {
  return duariActualPhotosForMemory(index).length;
}

function memoryPhotoScrollerLatest(count = 7, memoryIndex = Number(state.activeMemoryIndex) || 0) {
  const photos = duariPhotoListForMemory(memoryIndex);
  return Array.from({ length: count }, (_, index) => `
    <button class="memory-photo-slide" type="button" data-action="photo-detail" data-memory-index="${memoryIndex}" data-photo-index="${index}" data-photo-back="memory" aria-label="${index + 1}번째 사진">
      ${duariPhotoSource(photos[index]) ? `<img src="${signupAttr(duariPhotoSource(photos[index]))}" alt="" />` : ""}
      <span>${index + 1}/${count}</span>
    </button>
  `).join("");
}

function limitMemoryTitleLatest(title, max = 12) {
  return title.length > max ? `${title.slice(0, max)}...` : title;
}

function openMemoryDetailLatest(index) {
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const linkedDiaries = [
    { type: "나만 보기", title: "아직 정리 중인 마음", body: "이 순간을 돌아보며 혼자 더 적어둔 마음이에요." },
    { type: "내 공유", title: "오늘 고마웠던 것", body: "상대에게 함께 보여주고 싶은 마음을 남겼어요." },
    { type: "상대 공유", title: "나도 기억하고 있어", body: "상대가 이 기록에 이어서 남긴 공유 일기예요." },
  ];
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div>
            <span class="memory-photo-count">${photoCount}장</span>
          </div>
        </section>
        <section class="card">
          <div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3><span class="meta">${memory.type}</span></div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
        </section>
        <section class="card emotion-split-card">
          <div class="emotion-split">
            <div class="emotion-panel">
              <h3>내 감정</h3>
              <div class="tag-row emotion-badge-row merged-emotion-badges">${memory.feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
            </div>
            <div class="emotion-divider" aria-hidden="true"></div>
            <div class="emotion-panel">
              <h3>상대 감정</h3>
              <div class="tag-row emotion-badge-row merged-emotion-badges"><span class="chip-btn">고마움</span><span class="chip-btn">다정함</span></div>
            </div>
          </div>
        </section>
        <section class="card">
          <div class="between"><h3>연결된 일기</h3><span class="meta">2개</span></div>
          ${linkedDiaries.map((diary) => `<p>${diary.title}</p>`).join("")}
        </section>
        <button class="primary-btn full" data-memory-edit-page data-index="${index}">기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageFinal(index));
  bindActions(qs(".modal-sheet"));
}

function openMemoryDetailLatestV2(index) {
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const linkedDiaries = [
    { type: "나만 보기", title: "아직 정리 중인 마음", body: "이 순간을 돌아보며 혼자 더 적어둔 마음이에요." },
    { type: "내 공유", title: "오늘 고마웠던 것", body: "상대에게 함께 보여주고 싶은 마음을 남겼어요." },
    { type: "상대 공유", title: "나도 기억하고 있어", body: "상대가 이 기록에 이어서 남긴 공유 일기예요." },
  ];
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div>
          </div>
        </section>
        <section class="card">
          <div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3><span class="meta">${memory.type}</span></div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
          <p>${memory.note}</p>
        </section>
        <section class="card emotion-split-card">
          <div class="emotion-split">
            <div class="emotion-panel">
              <h3>내 감정</h3>
              <div class="tag-row emotion-badge-row">${memory.feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
            </div>
            <div class="emotion-divider" aria-hidden="true"></div>
            <div class="emotion-panel">
              <h3>상대 감정</h3>
              <div class="tag-row emotion-badge-row"><span class="chip-btn">고마움</span><span class="chip-btn">다정함</span></div>
            </div>
          </div>
        </section>
        <section class="card linked-diary-section">
          <div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div>
          <div class="linked-diary-list">
            ${linkedDiaries.map((diary) => `
              <article class="linked-diary-card">
                <div class="between"><strong>${diary.title}</strong><span class="linked-diary-type">${diary.type}</span></div>
                <p>${diary.body}</p>
              </article>
            `).join("")}
          </div>
        </section>
        <button class="primary-btn full" data-memory-edit-page>기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageFinal(index));
  bindActions(qs(".modal-sheet"));
}

function linkedDiariesLatest() {
  return [
    { type: "나만 보기", title: "아직 정리 중인 마음", body: "이 순간을 돌아보며 혼자 더 적어둔 마음이에요.", editable: true },
    { type: "내 공유", title: "오늘 고마웠던 것", body: "상대에게 함께 보여주고 싶은 마음을 남겼어요.", editable: true },
    { type: "상대 공유", title: "나도 기억하고 있어", body: "상대가 이 기록에 이어서 남긴 공유 일기예요.", editable: false },
  ];
}

function linkedDiaryCardsLatest() {
  return linkedDiariesLatest().map((diary, index) => `
    <article class="linked-diary-card" role="button" tabindex="0" data-linked-diary-index="${index}">
      <div class="between"><strong>${diary.title}</strong><span class="linked-diary-type">${diary.type}</span></div>
      <p>${diary.body}</p>
    </article>
  `).join("");
}

function bindLinkedDiaryCardsLatest(root) {
  qsa("[data-linked-diary-index]", root).forEach((card) => {
    card.addEventListener("click", () => openLinkedDiaryDetailLatest(Number(card.dataset.linkedDiaryIndex)));
  });
}

function openMemoryDetailLatestV3(index) {
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div>
          </div>
        </section>
        <section class="card">
          <div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3><span class="meta">${memory.type}</span></div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
          <p>${memory.note}</p>
        </section>
        <section class="card emotion-split-card">
          <div class="emotion-split">
            <div class="emotion-panel">
              <h3>내 감정</h3>
              <div class="tag-row emotion-badge-row">${memory.feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
            </div>
            <div class="emotion-divider" aria-hidden="true"></div>
            <div class="emotion-panel">
              <h3>상대 감정</h3>
              <div class="tag-row emotion-badge-row"><span class="chip-btn">고마움</span><span class="chip-btn">다정함</span></div>
            </div>
          </div>
        </section>
        <section class="card linked-diary-section">
          <div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page>기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function openLinkedDiaryDetailLatest(index) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  openModal(`
    <div class="modal-sheet notification-page diary-write-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <div class="between"><h3>${diary.title}</h3><span class="linked-diary-type">${diary.type}</span></div>
          <p>${diary.body}</p>
        </section>
        ${diary.editable ? `
          <div class="form-field"><label>제목</label><input value="${diary.title}" /></div>
          <div class="form-field"><label>본문</label><textarea>${diary.body}</textarea></div>
          <button class="primary-btn full" data-close>수정 저장</button>
        ` : `
          <section class="card"><p>상대 공유 일기는 조회만 가능해요.</p></section>
        `}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
}

function memoryPhotoCardsLatest(count = 7) {
  return Array.from({ length: count }, (_, index) => `
    <button class="photo-order-card" draggable="true" data-photo-order-card data-photo-index="${index}">
      <span class="photo-order-number">${index + 1}</span>
      <span class="photo-role-label">${index === 0 ? "대표" : index === 1 ? "썸네일" : ""}</span>
    </button>
  `).join("");
}

function openMemoryEditPageLatest(index) {
  const memory = state.memories[index] || state.memories[0];
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field"><label>제목</label><input value="${memory.title}" /></div>
        <div class="form-field"><label>날짜</label><input value="${memory.date}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>한 줄 메모</label><textarea>${memory.note}</textarea></div>
        <section class="card">
          <div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div>
          <div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div>
          <button class="ghost-btn full" data-action="photo-order-manager" style="margin-top:12px">사진 순서 변경</button>
        </section>
        <section class="card linked-diary-section">
          <div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => openMemoryDetailLatestV3(index));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    closeModal();
    showToast("기록 수정 내용을 저장했어요.");
  });
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function makeToggleButtons(root, selector = ".chip-row .chip-btn", max = 2) {
  const buttons = root.matches?.(".chip-row") ? qsa(".chip-btn", root) : qsa(selector, root);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled || button.classList.contains("is-disabled")) return;
      const group = button.closest(".chip-row") || button.parentElement;
      const active = qsa(".chip-btn.active", group);
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        return;
      }
      if (active.length >= max) {
        showToast(`감정은 최대 ${max}개까지 선택할 수 있어요.`);
        return;
      }
      button.classList.add("active");
    });
  });
}

function emotionChipRow(items, selected = [], attr = "data-emotion-feelings") {
  return `<div class="chip-row diary-feelings-centered" ${attr}>${items.map((item) => `<button class="chip-btn ${selected.includes(item) ? "active" : ""}">${item}</button>`).join("")}</div>`;
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  openModal(`
    <div class="modal-sheet notification-page diary-write-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>${heading}</h3>
        <button class="notification-nav-btn" data-close aria-label="닫기">×</button>
      </header>
      <div class="section-stack">
        <div class="chip-row" data-diary-scope>
          <button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button>
          <button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button>
        </div>
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div>
          <input id="diaryTitle" value="${diaryTitle}" maxlength="24" />
        </div>
        <div class="form-field"><label>본문</label><textarea id="diaryBody" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>
        ${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}
        <section class="linked-record-static">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">${linkedTitle}</span></div>
          <p>${linkedTitle}</p>
          <button class="ghost-btn full" data-action="memory-detail" data-index="${linkedMemoryIndex ?? 0}">기록 연결 추가</button>
        </section>
        <button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button>
        <button class="primary-btn full" data-save-diary>${heading === "일기 상세" ? "수정 저장" : "임시 저장"}</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-save-diary]").addEventListener("click", () => {
    const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
    state.diaries.unshift({
      title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기",
      body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문",
      scope: qs("[data-diary-scope] .chip-btn.active")?.textContent.includes("상대") ? "공유" : "개인",
      feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
      linked: linkedTitle,
      author: "나"
    });
    closeModal();
    renderDiary();
    showToast(heading === "일기 상세" ? "일기를 수정했어요." : "일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openDiaryModal(linkedMemoryIndex = null) {
  renderDiaryEditor({ heading: "일기 쓰기", linkedMemoryIndex });
}

function openDiaryDetail() {
  renderDiaryEditor({ heading: "일기 상세", diary: state.diaries[0] });
}

// Final diary-detail overrides: linked diary cards open a read-only detail first.
function normalizeDiaryForDetail(diary, fallbackIndex = 0) {
  const linkedMemoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  const linkedTitle = state.memories[linkedMemoryIndex]?.title || diary?.linked || "관련 기록 없음";
  return {
    title: diary?.title || "제목 없는 일기",
    body: diary?.body || "작성된 일기 본문이 없습니다.",
    type: diary?.type || (diary?.scope === "공유" ? "내 공유" : "나만 보기"),
    scope: diary?.scope || (diary?.type === "나만 보기" ? "개인" : "공유"),
    feelings: diary?.feelings || ["고마움", "안정"],
    linked: linkedTitle,
    editable: diary?.editable ?? diary?.type !== "상대 공유",
    index: fallbackIndex,
    linkedMemoryIndex
  };
}

function renderDiaryDetailReadOnly(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-feelings-centered">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list"><div class="linked-record-pill"><span>${detail.linked}</span></div></div>
        </section>
        <button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button>
        ${detail.editable ? `<button class="primary-btn full" data-diary-edit>수정하기</button>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(backAction));
  const editButton = qs("[data-diary-edit]");
  if (editButton) {
    editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, backAction)));
  }
  bindActions(qs(".modal-sheet"));
}

function openLinkedDiaryEditLatest(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  renderDiaryEditor({
    heading: "일기 수정",
    diary: {
      title: detail.title,
      body: detail.body,
      scope: detail.scope,
      feelings: detail.feelings,
      linked: detail.linked
    },
    linkedMemoryIndex: detail.linkedMemoryIndex
  });
  const saveButton = qs("[data-save-diary]");
  if (saveButton) saveButton.textContent = "수정 저장";
  const backButton = qs(".diary-write-page .notification-header .notification-nav-btn[data-close]");
  if (backButton) {
    backButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      runWithoutModalHistory(backAction);
    }, { capture: true });
  }
}

function openLinkedDiaryDetailLatest(index, backAction = restorePreviousModal) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(diary, index), backAction);
}

function openDiaryDetail() {
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(state.diaries[0] || linkedDiariesLatest()[0]), closeModal);
}

// Final requested layout overrides.
function renderDiaryDetailReadOnly(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list"><div class="linked-record-pill"><span>${detail.linked}</span></div></div>
        </section>
        ${detail.editable ? `<button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button><button class="primary-btn full" data-diary-edit>수정하기</button>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(backAction));
  const editButton = qs("[data-diary-edit]");
  if (editButton) {
    editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, backAction)));
  }
  bindActions(qs(".modal-sheet"));
}

function openMemoryEditPageLatest(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  const feelingButtons = ["편안함", "고마움", "설렘", "솔직함", "기쁨"].map((feeling) => `<button class="chip-btn ${(memory.feelings || []).slice(0, 2).includes(feeling) ? "active" : ""}">${feeling}</button>`).join("");
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div><input class="memory-title-input" value="${editTitle}" maxlength="24" /></div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>${memory.type}</option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <div class="form-field memory-edit-feelings"><label>내 감정</label><div class="chip-row" data-memory-edit-feelings>${feelingButtons}</div></div>
        <div class="form-field"><label>한 줄 메모</label><textarea>${memory.note}</textarea></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div><div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div><button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button><button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div><div class="linked-diary-list">${linkedDiaryCardsLatest()}</div><button class="ghost-btn full" data-linked-diary-add style="margin-top:12px">일기 연결 추가</button></section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runWithoutModalHistory(() => openMemoryDetailLatestV3(index)));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  makeToggleButtons(qs("[data-memory-edit-feelings]"));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    openMemoryDetailLatestV3(index);
    showToast("기록 수정 내용을 저장했어요.");
  });
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function openLinkedDiaryDetailLatest(index, backAction = restorePreviousModal) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  const linkedMemoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  renderDiaryEditor({
    heading: "일기 상세",
    diary: {
      title: diary.title,
      body: diary.body,
      scope: diary.type === "나만 보기" ? "개인" : "공유",
      feelings: ["고마움", "안정"],
      linked: state.memories[linkedMemoryIndex]?.title || "관련 기록 없음"
    },
    linkedMemoryIndex
  });
  qsa("[data-close]", qs(".modal-sheet")).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      runWithoutModalHistory(backAction);
    }, { once: true });
  });
}

function openMemoryEditPageLatest(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div>
          <input class="memory-title-input" value="${editTitle}" maxlength="24" />
        </div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>${memory.type}</option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <section class="card">
          <h3>내 감정</h3>
          ${emotionChipRow(["편안함", "고마움", "설렘", "솔직함", "기쁨"], memory.feelings || [], "data-memory-edit-feelings")}
        </section>
        <div class="form-field"><label>한 줄 메모</label><textarea>${memory.note}</textarea></div>
        <section class="card">
          <div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div>
          <div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div>
          <button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button>
          <button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button>
        </section>
        <section class="card linked-diary-section">
          <div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
          <button class="ghost-btn full" data-linked-diary-add style="margin-top:12px">일기 연결 추가</button>
        </section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runWithoutModalHistory(() => openMemoryDetailLatestV3(index)));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  makeToggleButtons(qs("[data-memory-edit-feelings]"));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    openMemoryDetailLatestV3(index);
    showToast("기록 수정 내용을 저장했어요.");
  });
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function makeToggleButtons(root, selector = ".chip-row .chip-btn", max = 2) {
  const buttons = root.matches?.(".chip-row") ? qsa(".chip-btn", root) : qsa(selector, root);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled || button.classList.contains("is-disabled")) return;
      const group = button.closest(".chip-row") || button.parentElement;
      const active = qsa(".chip-btn.active", group);
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        return;
      }
      if (active.length >= max) {
        showToast(`감정은 최대 ${max}개까지 선택할 수 있어요.`);
        return;
      }
      button.classList.add("active");
    });
  });
}

function emotionChipRow(items, selected = [], attr = "data-emotion-feelings") {
  return `<div class="chip-row diary-feelings-centered" ${attr}>${items.map((item) => `<button class="chip-btn ${selected.includes(item) ? "active" : ""}">${item}</button>`).join("")}</div>`;
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>${heading}</h3><button class="notification-nav-btn" data-close aria-label="닫기">×</button></header><div class="section-stack"><div class="chip-row" data-diary-scope><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}<section class="linked-record-static"><div class="between"><h3>관련 기록 연결</h3><span class="meta">${linkedTitle}</span></div><p>${linkedTitle}</p><button class="ghost-btn full" data-action="memory-detail" data-index="${linkedMemoryIndex ?? 0}">기록 연결 추가</button></section><button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button><button class="primary-btn full" data-save-diary>${heading === "일기 상세" ? "수정 저장" : "임시 저장"}</button></div></div>`);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  qs("[data-save-diary]").addEventListener("click", () => {
    const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
    state.diaries.unshift({ title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기", body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문", scope: qs("[data-diary-scope] .chip-btn.active")?.textContent.includes("상대") ? "공유" : "개인", feelings: selectedFeelings.length ? selectedFeelings : ["고마움"], linked: linkedTitle, author: "나" });
    closeModal();
    renderDiary();
    showToast(heading === "일기 상세" ? "일기를 수정했어요." : "일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openDiaryModal(linkedMemoryIndex = null) {
  renderDiaryEditor({ heading: "일기 쓰기", linkedMemoryIndex });
}

function openDiaryDetail() {
  renderDiaryEditor({ heading: "일기 상세", diary: state.diaries[0] });
}

// Definitive final overrides. These must stay after all prototype duplicates.
function makeToggleButtons(root, selector = ".chip-row .chip-btn", max = 2) {
  const buttons = root.matches?.(".chip-row") ? qsa(".chip-btn", root) : qsa(selector, root);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled || button.classList.contains("is-disabled")) return;
      const group = button.closest(".chip-row") || button.parentElement;
      const active = qsa(".chip-btn.active", group);
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        return;
      }
      if (active.length >= max) {
        showToast(`감정은 최대 ${max}개까지 선택할 수 있어요.`);
        return;
      }
      button.classList.add("active");
    });
  });
}

function emotionChipRow(items, selected = [], attr = "data-emotion-feelings") {
  return `<div class="chip-row diary-feelings-centered" ${attr}>${items.map((item) => `<button class="chip-btn ${selected.includes(item) ? "active" : ""}">${item}</button>`).join("")}</div>`;
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>${heading}</h3><button class="notification-nav-btn" data-close aria-label="닫기">×</button></header><div class="section-stack"><div class="chip-row" data-diary-scope><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}<section class="linked-record-static"><div class="between"><h3>관련 기록 연결</h3><span class="meta">${linkedTitle}</span></div><p>${linkedTitle}</p><button class="ghost-btn full" data-action="memory-detail" data-index="${linkedMemoryIndex ?? 0}">기록 연결 추가</button></section><button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button><button class="primary-btn full" data-save-diary>${heading === "일기 상세" ? "수정 저장" : "임시 저장"}</button></div></div>`);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  qs("[data-save-diary]").addEventListener("click", () => {
    const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
    state.diaries.unshift({ title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기", body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문", scope: qs("[data-diary-scope] .chip-btn.active")?.textContent.includes("상대") ? "공유" : "개인", feelings: selectedFeelings.length ? selectedFeelings : ["고마움"], linked: linkedTitle, author: "나" });
    closeModal();
    renderDiary();
    showToast(heading === "일기 상세" ? "일기를 수정했어요." : "일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openDiaryModal(linkedMemoryIndex = null) {
  renderDiaryEditor({ heading: "일기 쓰기", linkedMemoryIndex });
}

function openDiaryDetail() {
  renderDiaryEditor({ heading: "일기 상세", diary: state.diaries[0] });
}

// Final overrides: keep the latest requested Duari flows after older prototype duplicates.
function makeToggleButtons(root, selector = ".chip-row .chip-btn", max = 2) {
  const buttons = root.matches?.(".chip-row") ? qsa(".chip-btn", root) : qsa(selector, root);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled || button.classList.contains("is-disabled")) return;
      const group = button.closest(".chip-row") || button.parentElement;
      const active = qsa(".chip-btn.active", group);
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        return;
      }
      if (active.length >= max) {
        showToast(`감정은 최대 ${max}개까지 선택할 수 있어요.`);
        return;
      }
      button.classList.add("active");
    });
  });
}

function emotionChipRow(items, selected = [], attr = "data-emotion-feelings") {
  return `<div class="chip-row diary-feelings-centered" ${attr}>${items.map((item) => `<button class="chip-btn ${selected.includes(item) ? "active" : ""}">${item}</button>`).join("")}</div>`;
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  openModal(`
    <div class="modal-sheet notification-page diary-write-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>${heading}</h3>
        <button class="notification-nav-btn" data-close aria-label="닫기">×</button>
      </header>
      <div class="section-stack">
        <div class="chip-row" data-diary-scope><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div>
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div>
        <div class="form-field"><label>본문</label><textarea id="diaryBody" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>
        ${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}
        <section class="linked-record-static"><div class="between"><h3>관련 기록 연결</h3><span class="meta">${linkedTitle}</span></div><p>${linkedTitle}</p><button class="ghost-btn full" data-action="memory-detail" data-index="${linkedMemoryIndex ?? 0}">기록 연결 추가</button></section>
        <button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button>
        <button class="primary-btn full" data-save-diary>${heading === "일기 상세" ? "수정 저장" : "임시 저장"}</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-save-diary]").addEventListener("click", () => {
    const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
    state.diaries.unshift({ title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기", body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문", scope: qs("[data-diary-scope] .chip-btn.active")?.textContent.includes("상대") ? "공유" : "개인", feelings: selectedFeelings.length ? selectedFeelings : ["고마움"], linked: linkedTitle, author: "나" });
    closeModal();
    renderDiary();
    showToast(heading === "일기 상세" ? "일기를 수정했어요." : "일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openDiaryModal(linkedMemoryIndex = null) {
  renderDiaryEditor({ heading: "일기 쓰기", linkedMemoryIndex });
}

function openDiaryDetail() {
  renderDiaryEditor({ heading: "일기 상세", diary: state.diaries[0] });
}

function openLinkedDiaryDetailLatest(index, backAction = restorePreviousModal) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  const linkedMemoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  renderDiaryEditor({ heading: "일기 상세", diary: { title: diary.title, body: diary.body, scope: diary.type === "나만 보기" ? "개인" : "공유", feelings: ["고마움", "안정"], linked: state.memories[linkedMemoryIndex]?.title || "관련 기록 없음" }, linkedMemoryIndex });
}

function openMemoryDetailLatestV3(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  openModal(`<div class="modal-sheet notification-page memory-detail-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>기록 상세</h3><span class="notification-header-spacer" aria-hidden="true"></span></header><div class="section-stack"><section class="memory-photo-gallery" aria-label="사진 영역"><div class="memory-photo-main"><div class="memory-photo-scroll">${memoryPhotoScrollerLatest(7)}</div></div></section><section class="card"><div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitMemoryTitleLatest(memory.title)}</h3><span class="meta">${memory.type}</span></div><p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p><p>${memory.note}</p></section><section class="card emotion-split-card"><div class="emotion-split"><div class="emotion-panel"><h3>내 감정</h3><div class="tag-row emotion-badge-row">${memory.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div></div><div class="emotion-divider" aria-hidden="true"></div><div class="emotion-panel"><h3>상대 감정</h3><div class="tag-row emotion-badge-row"><span class="chip-btn">고마움</span><span class="chip-btn">다정함</span></div></div></div></section><section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div><div class="linked-diary-list">${linkedDiaryCardsLatest()}</div></section><button class="primary-btn full" data-memory-edit-page data-index="${index}">기록 수정</button></div></div>`);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(index));
  bindActions(qs(".modal-sheet"));
}

function bindPhotoRoleSelectionLatest(root) {
  qsa("[data-photo-order-card]", root).forEach((card) => {
    card.addEventListener("click", () => {
      qsa("[data-photo-order-card]", root).forEach((item) => item.classList.remove("is-representative", "is-thumbnail"));
      card.classList.add("is-representative");
      const label = qs(".photo-role-label", card);
      if (label) label.textContent = "대표";
      showToast("대표 이미지로 표시했어요.");
    });
  });
}

function bindPhotoDragLatest(root) {
  const renumber = (grid) => {
    qsa("[data-photo-order-card]", grid).forEach((item, index) => {
      qs(".photo-order-number", item).textContent = index + 1;
    });
  };
  let activeCard = null;
  let activeGrid = null;
  let startX = 0;
  let startY = 0;
  let moved = false;
  const moveCard = (event) => {
    if (!activeCard || !activeGrid) return;
    const distance = Math.hypot(event.clientX - startX, event.clientY - startY);
    if (distance <= 4) return;
    moved = true;
    activeCard.dataset.dragMoved = "true";
    event.preventDefault();
    activeCard.style.transform = `translate(${event.clientX - startX}px, ${event.clientY - startY}px) scale(0.96)`;
    activeCard.style.zIndex = "5";
    activeCard.style.pointerEvents = "none";
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-photo-order-card]");
    activeCard.style.pointerEvents = "";
    if (!target || target === activeCard || !activeGrid.contains(target)) return;
    const targetRect = target.getBoundingClientRect();
    const placeAfter = event.clientY > targetRect.top + targetRect.height / 2 || event.clientX > targetRect.left + targetRect.width / 2;
    qsa("[data-photo-order-card]", activeGrid).forEach((item) => item.classList.remove("is-drop-target"));
    target.classList.add("is-drop-target");
    activeGrid.insertBefore(activeCard, placeAfter ? target.nextSibling : target);
    renumber(activeGrid);
  };
  const endDrag = () => {
    if (!activeCard || !activeGrid) return;
    activeCard.classList.remove("is-dragging");
    activeCard.style.transform = "";
    activeCard.style.zIndex = "";
    activeCard.style.pointerEvents = "";
    qsa("[data-photo-order-card]", activeGrid).forEach((item) => item.classList.remove("is-drop-target"));
    renumber(activeGrid);
    const finishedCard = activeCard;
    if (moved) {
      finishedCard.dataset.dragMoved = "true";
      window.setTimeout(() => {
        delete finishedCard.dataset.dragMoved;
      }, 80);
    }
    activeCard = null;
    activeGrid = null;
    moved = false;
    document.removeEventListener("pointermove", moveCard);
    document.removeEventListener("pointerup", endDrag);
    document.removeEventListener("pointercancel", endDrag);
  };
  qsa("[data-photo-order-card]", root).forEach((card) => {
    if (card.dataset.dragBound === "true") return;
    card.dataset.dragBound = "true";
    card.removeAttribute("draggable");
    card.addEventListener("pointerdown", (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      event.preventDefault();
      activeCard = card;
      activeGrid = card.parentElement;
      startX = event.clientX;
      startY = event.clientY;
      moved = false;
      card.classList.add("is-dragging");
      document.addEventListener("pointermove", moveCard);
      document.addEventListener("pointerup", endDrag);
      document.addEventListener("pointercancel", endDrag);
    });
  });
}

function openPhotoOrderManagerPageLatest() {
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>사진 순서 변경</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="photo-order-grid">${memoryPhotoCardsLatest(7)}</div>
        <button class="primary-btn full" data-close>완료</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  bindPhotoRoleSelectionLatest(sheet);
  bindPhotoDragLatest(sheet);
}

function bindPhotoRoleSelectionLatest(root) {
  qsa("[data-photo-order-card]", root).forEach((card) => {
    card.addEventListener("click", () => {
      const label = qs(".photo-role-label", card);
      const currentRole = label ? label.textContent.trim() : "";
      const nextRole = currentRole === "대표" ? "썸네일" : currentRole === "썸네일" ? "" : "대표";
      if (nextRole === "대표") {
        qsa("[data-photo-order-card]", root).forEach((item) => {
          item.classList.remove("is-representative");
          const itemLabel = qs(".photo-role-label", item);
          if (itemLabel && itemLabel.textContent.trim() === "대표") itemLabel.textContent = "";
        });
      }
      if (nextRole === "썸네일") {
        qsa("[data-photo-order-card]", root).forEach((item) => {
          item.classList.remove("is-thumbnail");
          const itemLabel = qs(".photo-role-label", item);
          if (itemLabel && itemLabel.textContent.trim() === "썸네일") itemLabel.textContent = "";
        });
      }
      card.classList.toggle("is-representative", nextRole === "대표");
      card.classList.toggle("is-thumbnail", nextRole === "썸네일");
      if (label) label.textContent = nextRole;
      showToast(nextRole ? `${nextRole}로 표시했어요.` : "사진 표시를 해제했어요.");
    });
  });
}

function linkedDiaryCardsLatest() {
  return linkedDiariesLatest().map((diary, index) => `
    <article class="linked-diary-card" role="button" tabindex="0" data-linked-diary-index="${index}">
      <div class="between"><strong>${diary.title}</strong><span class="linked-diary-type">${diary.type}</span></div>
      <p>${diary.body}</p>
    </article>
  `).join("");
}

function bindLinkedDiaryCardsLatest(root, backAction = closeModal) {
  qsa("[data-linked-diary-index]", root).forEach((card) => {
    card.addEventListener("click", () => openLinkedDiaryDetailLatest(Number(card.dataset.linkedDiaryIndex), backAction));
  });
}

function memoryPhotoCardsLatest(count = 7, photos = null, { showDelete = false, representativeIndex = 0 } = {}) {
  const photoList = Array.isArray(photos)
    ? photos
    : duariPhotoListForMemory(typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0);
  const safeRepresentativeIndex = Math.max(0, Number(representativeIndex) || 0);
  return Array.from({ length: count }, (_, index) => `
    <div class="photo-order-card ${index === safeRepresentativeIndex ? "is-representative" : ""}" role="button" tabindex="0" data-photo-order-card data-photo-index="${index}">
      ${duariPhotoSource(photoList[index]) ? `<img src="${signupAttr(duariPhotoSource(photoList[index]))}" alt="" />` : ""}
      ${showDelete ? `<button class="photo-delete-chip" type="button" data-photo-manage-delete="${index}" aria-label="사진 삭제">×</button>` : ""}
      <span class="photo-order-number">${index + 1}</span>
      <span class="photo-identity">사진 ${index + 1}</span>
      <span class="photo-role-label">${index === safeRepresentativeIndex ? "대표" : ""}</span>
    </div>
  `).join("");
}

function bindPhotoRoleSelectionLatest(root) {
  const cards = qsa("[data-photo-order-card]", root).filter((card) => !card.closest("[data-photo-manage-card]"));
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.dataset.dragMoved === "true") return;
      cards.forEach((item) => {
        item.classList.remove("is-representative", "is-thumbnail");
        const itemLabel = qs(".photo-role-label", item);
        if (itemLabel) itemLabel.textContent = "";
      });
      card.classList.add("is-representative");
      const label = qs(".photo-role-label", card);
      if (label) label.textContent = "대표";
      showToast("대표 이미지로 표시했어요.");
    });
  });
}

function openMemoryDetailLatestV3(index) {
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div>
          </div>
        </section>
        <section class="card">
          <div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3><span class="meta">${memory.type}</span></div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
          <p>${memory.note}</p>
        </section>
        <section class="card emotion-split-card">
          <div class="emotion-split">
            <div class="emotion-panel">
              <h3>내 감정</h3>
              <div class="tag-row emotion-badge-row">${memory.feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
            </div>
            <div class="emotion-divider" aria-hidden="true"></div>
            <div class="emotion-panel">
              <h3>상대 감정</h3>
              <div class="tag-row emotion-badge-row"><span class="chip-btn">고마움</span><span class="chip-btn">다정함</span></div>
            </div>
          </div>
        </section>
        <section class="card linked-diary-section">
          <div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page>기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(index));
  bindActions(qs(".modal-sheet"));
}

function openLinkedDiaryDetailLatest(index, backAction = restorePreviousModal) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  openModal(`
    <div class="modal-sheet notification-page diary-write-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-linked-diary-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <div class="between"><h3>${diary.title}</h3><span class="linked-diary-type">${diary.type}</span></div>
          <p>${diary.body}</p>
        </section>
        ${diary.editable ? `
          <div class="form-field"><label>제목</label><input value="${diary.title}" /></div>
          <div class="form-field"><label>본문</label><textarea>${diary.body}</textarea></div>
          <button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button>
          <button class="primary-btn full" data-linked-diary-back>수정 저장</button>
        ` : `
          <button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button>
        `}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qsa("[data-linked-diary-back]", qs(".modal-sheet")).forEach((button) => button.addEventListener("click", () => runWithoutModalHistory(backAction)));
  bindActions(qs(".modal-sheet"));
}

function limitMemoryEditTitle(value) {
  return Array.from(value || "").slice(0, 24).join("");
}

function syncMemoryTitleLimit(input, count) {
  input.value = limitMemoryEditTitle(input.value);
  count.textContent = `${Array.from(input.value).length}/24`;
}

function openMemoryEditPageLatest(index) {
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div>
          <input class="memory-title-input" value="${editTitle}" maxlength="24" />
        </div>
        <div class="form-field"><label>날짜</label><input value="${memory.date}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>한 줄 메모</label><textarea>${memory.note}</textarea></div>
        <section class="card">
          <div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div>
          <div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div>
          <button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button>
        </section>
        <section class="card linked-diary-section">
          <div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
          <button class="ghost-btn full" data-action="new-diary" style="margin-top:12px">일기 연결 추가</button>
        </section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runWithoutModalHistory(() => openMemoryDetailLatestV3(index)));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    openMemoryDetailLatestV3(index);
    showToast("기록 수정 내용을 저장했어요.");
  });
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => {
    syncMemoryTitleLimit(titleInput, titleCount);
  });
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index)));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function openPhotoOrderManagerPageLatest(backAction = restorePreviousModal) {
  const createMode = !!qs(".memory-create-page");
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  const photos = createMode
    ? (Array.isArray(state.memoryCreateDraft?.photos) ? state.memoryCreateDraft.photos : [])
    : duariPhotoListForMemory(memoryIndex);
  const representativeIndex = createMode
    ? (Number(state.memoryCreateDraft?.representativePhotoIndex) || 0)
    : (Number(state.memories?.[memoryIndex]?.representativePhotoIndex) || 0);
  const photoCount = photos.length;
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-photo-order-back aria-label="뒤로가기">←</button>
        <h3>사진 순서 변경</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${photoCount > 0
          ? `<div class="photo-order-grid">${memoryPhotoCardsLatest(photoCount, photos, {
            representativeIndex: createMode
              ? (Number(state.memoryCreateDraft?.representativePhotoIndex) || 0)
              : (Number(state.memories?.[memoryIndex]?.representativePhotoIndex) || 0)
          })}</div>`
          : `<section class="card"><p class="linked-record-empty">순서를 변경할 사진이 없어요.</p></section>`}
        <button class="primary-btn full" data-photo-order-back>완료</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  const savePhotoOrder = () => {
    const orderedCards = qsa("[data-photo-order-card]", sheet);
    const representativeCard = orderedCards.find((card) => card.classList.contains("is-representative")) || orderedCards[0];
    const representativePhoto = representativeCard ? photos[Number(representativeCard.dataset.photoIndex)] : null;
    const orderedPhotos = orderedCards
      .map((card) => photos[Number(card.dataset.photoIndex)])
      .filter(Boolean);
    const representativePhotoIndex = Math.max(0, orderedPhotos.indexOf(representativePhoto));
    if (createMode) {
      state.memoryCreateDraft = {
        ...(state.memoryCreateDraft || {}),
        photos: orderedPhotos,
        photoCount: orderedPhotos.length,
        representativePhoto,
        representativePhotoIndex
      };
      return;
    }
    const memory = state.memories?.[memoryIndex];
    if (!memory) return;
    memory.photos = orderedPhotos;
    memory.photoCount = orderedPhotos.length;
    memory.representativePhoto = representativePhoto || orderedPhotos[0] || null;
    memory.representativePhotoIndex = representativePhotoIndex;
    duariSavePersistentContent();
  };
  qsa("[data-photo-order-back]", sheet).forEach((button) => button.addEventListener("click", () => {
    savePhotoOrder();
    runWithoutModalHistory(backAction);
  }));
  bindPhotoRoleSelectionLatest(sheet);
  bindPhotoDragLatest(sheet);
}

function bindPhotoDragLatest(root) {
  qsa(".photo-order-grid", root).forEach((grid) => {
    if (grid.dataset.dragGridBound === "true") return;
    grid.dataset.dragGridBound = "true";

    const renumber = () => {
      qsa("[data-photo-order-card]", grid).forEach((item, index) => {
        qs(".photo-order-number", item).textContent = index + 1;
      });
    };

    let activeCard = null;
    let startX = 0;
    let startY = 0;
    let didMove = false;

    const clearDrag = () => {
      if (!activeCard) return;
      const finishedCard = activeCard;
      finishedCard.classList.remove("is-dragging");
      qsa("[data-photo-order-card]", grid).forEach((item) => item.classList.remove("is-drop-target"));
      renumber();
      if (didMove) {
        finishedCard.dataset.dragMoved = "true";
        window.setTimeout(() => delete finishedCard.dataset.dragMoved, 140);
      }
      activeCard = null;
      didMove = false;
      document.removeEventListener("pointermove", moveCard);
      document.removeEventListener("pointerup", clearDrag);
      document.removeEventListener("pointercancel", clearDrag);
    };

    const getNearestCard = (x, y) => {
      return qsa("[data-photo-order-card]", grid)
        .filter((item) => item !== activeCard)
        .map((item) => {
          const rect = item.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          return {
            item,
            rect,
            distance: Math.hypot(x - centerX, y - centerY)
          };
        })
        .sort((a, b) => a.distance - b.distance)[0];
    };

    const moveCard = (event) => {
      if (!activeCard) return;
      const distance = Math.hypot(event.clientX - startX, event.clientY - startY);
      if (distance < 5) return;
      didMove = true;
      activeCard.dataset.dragMoved = "true";
      event.preventDefault();

      const nearest = getNearestCard(event.clientX, event.clientY);
      if (!nearest) return;

      const { item: target, rect: targetRect } = nearest;
      const centerX = targetRect.left + targetRect.width / 2;
      const centerY = targetRect.top + targetRect.height / 2;
      const isSameRow = event.clientY >= targetRect.top && event.clientY <= targetRect.bottom;
      const shouldPlaceAfter = isSameRow ? event.clientX > centerX : event.clientY > centerY;
      qsa("[data-photo-order-card]", grid).forEach((item) => item.classList.remove("is-drop-target"));
      target.classList.add("is-drop-target");
      grid.insertBefore(activeCard, shouldPlaceAfter ? target.nextSibling : target);
      renumber();
    };

    grid.addEventListener("pointerdown", (event) => {
      const card = event.target.closest("[data-photo-order-card]");
      if (!card || !grid.contains(card)) return;
      if (event.button !== undefined && event.button !== 0) return;
      event.preventDefault();
      qsa("[data-photo-order-card]", grid).forEach((item) => item.removeAttribute("draggable"));
      activeCard = card;
      startX = event.clientX;
      startY = event.clientY;
      didMove = false;
      activeCard.classList.add("is-dragging");
      document.addEventListener("pointermove", moveCard, { passive: false });
      document.addEventListener("pointerup", clearDrag);
      document.addEventListener("pointercancel", clearDrag);
    }, { passive: false });
  });
}

function bindPhotoDragLatest(root) {
  qsa(".photo-order-grid", root).forEach((grid) => {
    if (grid.closest("[data-photo-manage-card]")) return;
    if (grid.dataset.placeholderDragBound === "true") return;
    grid.dataset.placeholderDragBound = "true";

    const renumber = () => {
      qsa("[data-photo-order-card]", grid).forEach((item, index) => {
        qs(".photo-order-number", item).textContent = index + 1;
      });
    };

    let activeCard = null;
    let placeholder = null;
    let offsetX = 0;
    let offsetY = 0;
    let didMove = false;

    const clearDropTargets = () => {
      qsa("[data-photo-order-card]", grid).forEach((item) => item.classList.remove("is-drop-target"));
    };

    const getInsertTarget = (x, y) => {
      const cards = qsa("[data-photo-order-card]", grid).filter((item) => item !== activeCard);
      return cards.find((item) => {
        const rect = item.getBoundingClientRect();
        const sameRow = y >= rect.top && y <= rect.bottom;
        if (sameRow) return x < rect.left + rect.width / 2;
        return y < rect.top + rect.height / 2;
      }) || null;
    };

    const movePlaceholder = (x, y) => {
      if (!placeholder) return;
      const target = getInsertTarget(x, y);
      clearDropTargets();
      if (target) {
        target.classList.add("is-drop-target");
        grid.insertBefore(placeholder, target);
      } else {
        grid.appendChild(placeholder);
      }
    };

    const moveCard = (event) => {
      if (!activeCard) return;
      const left = event.clientX - offsetX;
      const top = event.clientY - offsetY;
      activeCard.style.left = `${left}px`;
      activeCard.style.top = `${top}px`;
      didMove = true;
      activeCard.dataset.dragMoved = "true";
      event.preventDefault();
      movePlaceholder(event.clientX, event.clientY);
    };

    const finishDrag = () => {
      if (!activeCard || !placeholder) return;
      const finishedCard = activeCard;
      grid.insertBefore(finishedCard, placeholder);
      placeholder.remove();
      clearDropTargets();
      finishedCard.classList.remove("is-dragging", "is-floating-drag");
      finishedCard.style.left = "";
      finishedCard.style.top = "";
      finishedCard.style.width = "";
      finishedCard.style.height = "";
      finishedCard.style.pointerEvents = "";
      renumber();
      if (didMove) {
        finishedCard.dataset.dragMoved = "true";
        window.setTimeout(() => delete finishedCard.dataset.dragMoved, 180);
      }
      activeCard = null;
      placeholder = null;
      didMove = false;
      document.removeEventListener("pointermove", moveCard);
      document.removeEventListener("pointerup", finishDrag);
      document.removeEventListener("pointercancel", finishDrag);
    };

    grid.addEventListener("pointerdown", (event) => {
      const card = event.target.closest("[data-photo-order-card]");
      if (!card || !grid.contains(card)) return;
      if (event.button !== undefined && event.button !== 0) return;
      event.preventDefault();
      const rect = card.getBoundingClientRect();
      activeCard = card;
      didMove = false;
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
      placeholder = document.createElement("div");
      placeholder.className = "photo-order-placeholder";
      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;
      grid.insertBefore(placeholder, card);
      card.classList.add("is-dragging", "is-floating-drag");
      card.style.width = `${rect.width}px`;
      card.style.height = `${rect.height}px`;
      card.style.left = `${rect.left}px`;
      card.style.top = `${rect.top}px`;
      card.style.pointerEvents = "none";
      document.addEventListener("pointermove", moveCard, { passive: false });
      document.addEventListener("pointerup", finishDrag);
      document.addEventListener("pointercancel", finishDrag);
    }, { passive: false });
  });
}

function renderOnboarding() {
  const slide = onboardingSlides[state.slide];
  qs("#onboardingCard").innerHTML = `
    <div class="illustration ${slide.art}" aria-hidden="true"></div>
    <h2>${slide.title}</h2>
    <p>${slide.body}</p>
  `;
  qs("#onboardingDots").innerHTML = onboardingSlides
    .map((_, index) => `<button class="${index === state.slide ? "active" : ""}" aria-label="${index + 1}번째 소개"></button>`)
    .join("");
  qsa("#onboardingDots button").forEach((button, index) => {
    button.addEventListener("click", () => {
      state.slide = index;
      renderOnboarding();
    });
  });
}

function startSetup() {
  openModal(`
    <div class="modal-sheet">
      <div class="between"><h3>첫 설정</h3><button class="icon-btn" data-close>닫기</button></div>
      <div class="section-stack">
        <div class="form-field"><label>닉네임</label><input value="하린" /></div>
        <div class="form-field"><label>앱 보안 PIN 6자리</label><input maxlength="6" value="123456" aria-label="앱 보안 PIN" /></div>
        <section class="card"><h3>프로필 사진</h3><p>선택 사항입니다. 사진 권한은 온보딩에서 요청합니다.</p><button class="ghost-btn full" data-action="photo-permission">사진 권한 요청</button></section>
        <div class="tabs"><button class="chip-btn active">상대와 연결하기</button><button class="chip-btn">혼자 먼저 시작하기</button></div>
        <button class="primary-btn full" data-complete-setup>듀아리 시작</button>
      </div>
    </div>
  `);
  qs("[data-complete-setup]").addEventListener("click", () => {
    closeModal();
    qs("#onboarding").classList.add("is-hidden");
    qs("#app").classList.remove("is-hidden");
    showToast("닉네임, PIN, 사진 권한 설정 흐름을 완료했어요.");
    renderApp();
  });
  bindActions(qs(".modal-sheet"));
}

openMemoryDetailPageFinal = (index) => openMemoryDetail(index);

qs("#openNotifications").onclick = (event) => {
  event.preventDefault();
  event.stopPropagation();
  openNotificationPageV4();
};

const notificationFilterOptionsFinal = [
  { value: "all", label: "전체" },
  { value: "record", label: "기록" },
  { value: "diary", label: "다이어리" },
  { value: "message", label: "메시지" },
  { value: "anniversary", label: "기념일" },
  { value: "system", label: "시스템" },
];

const notificationItemsFinal = [
  { type: "record", title: "상대가 새 우리 기록을 추가함", body: "성수에서 보낸 오후 기록이 추가되었어요." },
  { type: "record", title: "상대가 기록에 반응함", body: "우리 기록에 '또 가자' 반응을 남겼어요." },
  { type: "diary", title: "상대가 공유 일기를 작성함", body: "새 공유 일기가 도착했어요." },
  { type: "diary", title: "상대가 내 공유 일기에 반응함", body: "공유 일기에 '고마워' 반응을 남겼어요." },
  { type: "message", title: "상대가 정리한 메시지를 보냄", body: "전하고 싶은 마음을 정리한 메시지가 도착했어요." },
  { type: "anniversary", title: "기념일 D-day", body: "오늘은 여행 1주년이에요." },
  { type: "anniversary", title: "가까운 기념일 D-7", body: "여행 1주년이 7일 남았어요." },
  { type: "system", title: "커플 연결 완료", body: "봄이와 하린의 공간이 연결되었어요." },
  { type: "system", title: "공유 동의 요청이 도착함", body: "상대 콘텐츠가 포함된 공유 요청을 확인해 주세요.", action: "share-consent-list" },
];

const notificationTypeLabelsFinal = {
  record: "기록",
  diary: "다이어리",
  message: "메시지",
  anniversary: "기념일",
  system: "시스템",
};

function renderNotificationItemsFinal(filter = "all") {
  const list = qs("[data-notification-list]");
  if (!list) return;
  const filtered = filter === "all" ? notificationItemsFinal : notificationItemsFinal.filter((item) => item.type === filter);
  list.innerHTML = filtered.map((item) => `
    <section class="card notification-item">
      <div class="notification-title-row">
        <strong>${item.title}</strong>
        <span class="notification-type-label">${notificationTypeLabelsFinal[item.type] || item.type}</span>
      </div>
      <p>${item.body}</p>
      ${item.action ? '<button class="ghost-btn full" data-action="share-consent-list">공유 요청 보기</button>' : ""}
    </section>
  `).join("") || `<section class="card notification-item"><strong>알림이 없어요</strong><p>선택한 유형의 알림이 아직 없습니다.</p></section>`;
  bindActions(list);
}

function openNotificationPageV4() {
  openModal(`
    <div class="modal-sheet notification-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>알림</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <label class="notification-filter-field" aria-label="알림 필터">
        <select class="notification-filter-select" data-notification-filter>
          ${notificationFilterOptionsFinal.map((option) => `<option value="${option.value}">${option.label}</option>`).join("")}
        </select>
      </label>
      <div class="list" data-notification-list></div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  renderNotificationItemsFinal("all");
  qs("[data-notification-filter]").addEventListener("change", (event) => {
    renderNotificationItemsFinal(event.target.value);
  });
}

const notificationButtonFinal = qs("#openNotifications");
notificationButtonFinal.onclick = (event) => {
  event.preventDefault();
  event.stopPropagation();
  openNotificationPageV4();
};

function renderHome() {
  const home = qs("#home");
  const questionActions = `
    <div class="home-question-actions">
      <button class="primary-btn" data-action="answer-question">답변 쓰기</button>
      <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
    </div>
  `;

  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <section class="card home-records-card"><h3>최근 우리 기록</h3><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
        <section class="diary-card"><h3>최근 공유 일기</h3><p>연결 전에는 공유 일기를 사용할 수 없어요.</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3>${questionActions}</section>
      </div>
    `;
    bindActions(home);
    return;
  }

  const sharedDiary = state.diaries.find((diary) => diary.scope === "공유") || state.diaries[0];
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
      <section class="card home-records-card"><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
      <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${sharedDiary?.body || "아직 공유 일기가 없어요."}</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3>${questionActions}</section>
    </div>
  `;
  bindActions(home);
}

function setTab(tab) {
  if (tab === "questions") {
    state.journalView = "question";
    tab = "diary";
  }
  const previousTab = state.tab;
  if (tab === "diary" && previousTab !== "diary" && state.journalView !== "question" && typeof duariResetDiaryVisibleCount === "function") {
    duariResetDiaryVisibleCount();
  }
  state.tab = tab;
  qsa(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.tab === tab));
  qsa(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === tab));
  qs("#screenTitle").textContent = titles[tab];
  qs("#relationshipKicker").textContent = state.connected ? "봄이와 현재 관계" : "혼자 쓰는 듀아리";
  renderApp();
}

function renderApp() {
  renderHome();
  renderAlbum();
  renderDiary();
  renderQuestions();
  renderMy();
}

function renderHome() {
  const home = qs("#home");
  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <div class="quick-grid"><button class="primary-btn" data-action="new-memory">나만 보기 기록</button><button class="ghost-btn" data-action="diary-scope-first">개인 일기</button></div>
        <section class="card"><h3>전할 말 초안</h3><p>연결 전에도 질문 답변, 개인 일기, 기록에서 전할 말을 정리해 둘 수 있어요.</p><button class="ghost-btn full" data-action="draft-list">저장된 초안 보기</button></section>
      </div>
    `;
    bindActions(home);
    return;
  }

  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
      <div class="quick-grid"><button class="primary-btn" data-action="new-memory">우리 기록 남기기</button><button class="ghost-btn" data-action="diary-scope-first">일기 쓰기</button></div>
      <section><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div></section>
      <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${state.diaries.find((diary) => diary.scope === "공유")?.body || "아직 공유 일기가 없어요."}</p></section>
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
    </div>
  `;
  bindActions(home);
}

function memoryCards(memories, homeCompact = false) {
  return memories
    .map((memory, index) => `
      <article class="memory-card ${homeCompact ? "home-memory-card" : ""}" role="button" tabindex="0" data-action="memory-detail" data-index="${index}">
        <div class="photo-stack" aria-label="사진 미리보기"></div>
        <div>
          <div class="${homeCompact ? "home-memory-title" : "between"}"><strong>${memory.title}</strong><span class="meta">${memory.type}</span></div>
          <p class="${homeCompact ? "home-memory-copy" : ""}">${memory.note}</p>
          <div class="tag-row ${homeCompact ? "home-memory-meta" : ""}" style="margin-top:8px"><span class="meta">${memory.date}</span><span class="meta">${memory.place}</span><span class="meta">${memory.scope}</span></div>
        </div>
      </article>
    `)
    .join("");
}

function renderAlbum() {
  const album = qs("#album");
  const views = ["record", "photo", "calendar"];
  const labels = { record: "기록", photo: "사진", calendar: "캘린더" };
  let content = "";
  if (state.albumView === "record") content = `<div class="list">${memoryCards(state.memories)}</div>`;
  if (state.albumView === "photo") {
    content = `<section class="card"><h3>사진 중심 보기</h3><p>사진은 기록 단위로 연결되며, 선택 순서 변경과 추가/삭제 정책은 기록 상세에서 관리합니다.</p></section><div class="quick-grid">${Array.from({ length: 6 }, (_, index) => `<button class="photo-stack" data-action="photo-detail" aria-label="${index + 1}번째 사진"></button>`).join("")}</div>`;
  }
  if (state.albumView === "calendar") {
    content = `<div class="calendar-grid">${Array.from({ length: 28 }, (_, index) => {
      const day = index + 1;
      const cls = day === 21 ? "today" : day === 26 ? "selected" : "";
      const mark = day === 21 ? "대화" : day === 26 ? "데이트 +1" : "";
      return `<div class="day ${cls}" aria-label="4월 ${day}일"><span>${day}</span><small>${mark}</small></div>`;
    }).join("")}</div><div class="list" style="margin-top:12px">${memoryCards(state.memories.slice(0, 1))}</div>`;
  }
  album.innerHTML = `
    <div class="section-stack">
      <div class="tabs">${views.map((view) => `<button class="chip-btn ${state.albumView === view ? "active" : ""}" data-album-view="${view}">${labels[view]}</button>`).join("")}</div>
      <div class="form-field"><label for="albumSearch">앨범 검색</label><input id="albumSearch" placeholder="제목, 장소, 메모, 기록 유형" /></div>
      ${content}
      <button class="primary-btn full" data-action="new-memory">새 기록 추가</button>
    </div>
  `;
  qsa("[data-album-view]", album).forEach((button) => {
    button.addEventListener("click", () => {
      state.albumView = button.dataset.albumView;
      if (state.albumView === "calendar") {
        state.calendarTouched = false;
        state.calendarMonth = "";
        state.calendarSelectedDate = "";
      }
      renderAlbum();
    });
  });
  bindActions(album);
}

function renderDiary() {
  const diary = qs("#diary");
  const targetScope = state.diaryView === "shared" ? "공유" : "개인";
  const diaries = state.diaries.filter((entry) => entry.scope === targetScope);
  diary.innerHTML = `
    <div class="section-stack">
      <div class="tabs"><button class="chip-btn ${state.diaryView === "shared" ? "active" : ""}" data-diary-view="shared">공유</button><button class="chip-btn ${state.diaryView === "personal" ? "active" : ""}" data-diary-view="personal">개인</button></div>
      <button class="primary-btn full" data-action="diary-scope-first">일기 쓰기</button>
      <div class="list">${diaries.map((entry) => `<article class="diary-card" data-action="diary-detail"><div class="between"><h3>${entry.title}</h3><span class="meta">${entry.scope}</span></div><p>${entry.body}</p><div class="tag-row" style="margin-top:10px">${entry.feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div></article>`).join("")}</div>
    </div>
  `;
  qsa("[data-diary-view]", diary).forEach((button) => {
    button.addEventListener("click", () => {
      state.diaryView = button.dataset.diaryView;
      renderDiary();
    });
  });
  bindActions(diary);
}

function renderQuestions() {
  qs("#questions").innerHTML = `
    <div class="section-stack">
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>내가 요즘 자주 떠올리는 우리의 순간은?</h3><p>개인 질문 70%, 관계 질문 30% 비율로 부담 없이 이어집니다.</p><div class="row" style="margin-top:12px"><button class="primary-btn" data-action="answer-question">답변 작성</button><button class="ghost-btn" data-action="new-question">직접 질문</button></div><button class="ghost-btn full" data-action="another-question">다른 질문 보기</button></section>
      <section class="card"><h3>답변 보내기</h3><div class="list"><button class="ghost-btn" data-action="private-answer">비공개 저장</button><button class="ghost-btn" data-action="send-to-partner">상대에게 보내기</button><button class="ghost-btn" data-action="ai-message">AI로 다듬어서 보내기</button><button class="ghost-btn" data-action="send-original">원문으로 보내기</button></div></section>
      <section class="card"><h3>메시지함</h3><p>받은 메시지는 최종 메시지만, 보낸 메시지는 원문과 실제 보낸 메시지를 함께 보여줍니다.</p><button class="primary-btn full" data-action="message-detail">메시지 상세 보기</button></section>
    </div>
  `;
  bindActions(qs("#questions"));
}

function renderMy() {
  const current = typeof currentRelationInfo === "function" ? currentRelationInfo() : { name: "봄이 & 하린", date: "2025.03.05" };
  qs("#my").innerHTML = `
    <div class="section-stack">
      <section class="card my-profile-card">
        <div class="my-profile-header">
          <div class="my-profile-summary">
            <div class="my-profile-text">
              <h3>${current.name}</h3>
              <p class="meta">${current.date}부터</p>
            </div>
          </div>
          <button class="chip-btn" data-action="account">우리 정보</button>
        </div>
      </section>
      <div class="list">${[
        ["관계 관리", "관계 전환, 관계 추가", "relation-management"],
        ["기념일 설정", "자동 기념일, 추가한 기념일", "couple-settings"],
        ["알림", "기본 알림, 기념일", "notification-settings"],
        ["PIN 재설정", "6자리 PIN 재설정, 관계 전환 확인", "security"],
        ["FAQ", "자주 묻는 질문", "support"],
        ["문의하기", "문의 접수와 문의내역", "support-contact"],
        ["이용약관", "서비스 이용 기준과 가입 동의 내용", "terms"],
        ["개인정보처리방침", "개인 데이터 처리와 탈퇴 시 보존 기준", "privacy-policy"],
      ].map(([title, body, action]) => `<button class="card" data-action="${action}" style="text-align:left"><div class="between"><strong>${title}</strong><span class="menu-chevron" aria-hidden="true">›</span></div><p>${body}</p></button>`).join("")}</div>
      <p class="tiny-note">Duari v0.1.0</p>
    </div>
  `;
  bindActions(qs("#my"));
}

function bindActions(root) {
  root.querySelectorAll("[data-tab-go]").forEach((button) => button.addEventListener("click", () => setTab(button.dataset.tabGo)));
  root.querySelectorAll("[data-action]").forEach((element) => element.addEventListener("click", () => handleAction(element.dataset.action, element)));
}

function toggleSettingSwitch(element) {
  const isActive = !element.classList.contains("active");
  element.classList.toggle("active", isActive);
  element.setAttribute("aria-pressed", String(isActive));
  if (element.dataset.stateKey) state[element.dataset.stateKey] = isActive;
  const label = element.querySelector(".setting-switch-label");
  if (label) label.textContent = isActive ? "켬" : "끔";
}

function handleAction(action, element) {
  const actions = {
    connect: openConnectModal,
    "continue-alone": () => {
      state.aloneCtaHidden = true;
      renderHome();
      showToast("큰 초대 카드는 숨겼어요. 작은 초대 버튼은 유지됩니다.");
    },
    "photo-permission": () => showToast("사진 권한을 거부해도 사진 없이 기록할 수 있어요."),
    "shared-diary-confirm": openSharedDiaryConfirmModal,
    "draft-list": openDraftListModal,
    "share-card": openShareCardModal,
    "error-policy": openErrorPolicyModal,
    "photo-upload-policy": openPhotoUploadPolicyModal,
    "album-search-policy": openAlbumSearchPolicyModal,
    "reaction-policy": openReactionPolicyModal,
    "download-share-policy": openDownloadSharePolicyModal,
    "notification-exclusions": openNotificationExclusionsModal,
    "anniversary-policy": openAnniversaryPolicyModal,
    "question-ratio": openQuestionRatioModal,
    "ai-reference-policy": openAiReferencePolicyModal,
    "hide-delete-policy": openHideDeletePolicyModal,
    "message-read-policy": openMessageReadPolicyModal,
    "solo-limit-policy": openSoloLimitPolicyModal,
    "multi-relation-policy": openMultiRelationPolicyModal,
    "withdrawal-display-policy": openWithdrawalDisplayPolicyModal,
    "privacy-scope-policy": openPrivacyScopePolicyModal,
    "permission-timing-policy": openPermissionTimingPolicyModal,
    "pin-usage-policy": openPinUsagePolicyModal,
    "share-consent-lifecycle": openShareConsentLifecycleModal,
    "archive-content-policy": openArchiveContentPolicyModal,
    "notification-types-policy": openNotificationTypesPolicyModal,
    "account-profile-policy": openAccountProfilePolicyModal,
    "author-permission-policy": openAuthorPermissionPolicyModal,
    "emotion-policy": openEmotionPolicyModal,
    "calendar-display-policy": openCalendarDisplayPolicyModal,
    "record-delete-policy": openRecordDeletePolicyModal,
    "diary-reaction-policy": openDiaryReactionPolicyModal,
    "invite-code-policy": openInviteCodePolicyModal,
    "private-diary-share-flow": openPrivateDiaryShareFlowModal,
    "draft-source-policy": openDraftSourcePolicyModal,
    "notification-filter-policy": openNotificationFilterPolicyModal,
    "custom-anniversary-policy": openCustomAnniversaryPolicyModal,
    "new-memory": openMemoryModal,
    "new-diary": openDiaryModal,
    "diary-scope-first": openDiaryScopeModal,
    "memory-detail": () => openMemoryDetailLatestV3(Number(element.dataset.index || 0)),
    "photo-detail": () => openPhotoDetail(element),
    "diary-detail": openDiaryDetail,
    "answer-question": openQuestionModal,
    "ai-message": openAiModal,
    "new-question": openDirectQuestionModal,
    "another-question": openAnotherQuestionModal,
    "send-to-partner": openSendToPartnerModal,
    "private-answer": () => showToast("비공개 답변으로 저장했어요."),
    "send-original": () => showToast("원문으로 보냈어요. 읽음은 보낸 상세에서만 보여요."),
    "message-detail": openMessageDetail,
    "share-consent": openShareConsentModal,
    "share-consent-list": openShareConsentListOverlay,
    "share-consent-requested": openShareConsentRequestedModal,
    "share-consent-complete": openShareConsentCompleteModal,
    "hide-photo-confirm": () => openConfirmModal("사진 숨김", "숨김은 내 화면에서만 적용되고 상대에게 알림이 가지 않습니다.", "숨기기", () => showToast("사진을 숨겼어요. 되돌리기")),
    "delete-photo-confirm": openPhotoDeleteConfirm,
    "restore-photo-confirm": () => openConfirmModal("사진 복구", "숨긴 사진을 다시 앨범과 기록 상세에 표시합니다.", "복구하기", () => showToast("숨긴 사진을 복구했어요.")),
    "hide-message-confirm": () => openConfirmModal("메시지 숨김", "숨김은 내 화면에서만 적용됩니다. 상대 화면에서는 그대로 유지돼요.", "숨기기", () => showToast("메시지를 내 화면에서 숨겼어요.")),
    "delete-message-confirm": () => openConfirmModal("메시지 삭제", "작성자만 양쪽 삭제를 할 수 있습니다. 삭제 후에는 복구할 수 없습니다.", "양쪽에서 삭제", () => showToast("메시지 삭제 확인 흐름을 완료했어요.")),
    "delete-draft-confirm": () => openConfirmModal("초안 삭제", "저장된 AI 초안을 삭제합니다. 삭제한 초안은 복구할 수 없습니다.", "초안 삭제", () => showToast("초안을 삭제했어요.")),
    "photo-order-manager": openPhotoOrderManagerPageLatest,
    "save-private-answer": () => showToast("비공개 답변으로 저장했어요. 나중에 보내기도 가능해요."),
    "edit-diary": () => showToast("작성자만 수정할 수 있어요."),
    "share-diary-copy": () => openDiaryCopyModal(),
    "delete-diary-confirm": () => openConfirmModal("일기 삭제", "작성자만 삭제할 수 있습니다. 공유 일기는 양쪽에서 삭제되고 알림은 보내지 않아요.", "삭제하기", () => showToast("일기 삭제 확인 흐름을 완료했어요.")),
    "edit-memory": () => showToast("기록 수정은 작성자만 가능해요. 수정 알림은 보내지 않습니다."),
    "add-photo": openPhotoOrderManagerPageLatest,
    "ai-redraft": () => showToast("같은 톤으로 다시 다듬었어요."),
    "ai-original": () => showToast("원문으로 돌아갔어요."),
    "save-draft": () => showToast("초안을 저장했어요. 출처 상세 하단에 보관됩니다."),
    "send-ai-result": () => (state.connected ? showToast("최종 메시지만 상대에게 보냈어요.") : openConnectModal()),
    "invite-link": () => showToast("초대 링크를 만들었어요. 코드는 7일 뒤 만료됩니다."),
    "relation-add": () => openRelationAddPage(1),
    "download-photo": duariDownloadCurrentPhotoAsPng,
    "download-all-photos": duariDownloadAllCurrentPhotosAsPng,
    "external-share": () => showToast("공유할 수 있어요. 상대 콘텐츠가 포함되면 동의가 필요합니다."),
    logout: logoutToLogin,
    "settings-toggle": (element) => {
      if (element.classList.contains("setting-switch")) {
        toggleSettingSwitch(element);
        return;
      }
      if (!element.classList.contains("chip-btn")) {
        showToast(`${element.textContent.trim()} 흐름을 확인했어요.`);
        return;
      }
      element.classList.toggle("active");
      element.textContent = element.classList.contains("active") ? "켬" : "끔";
    },
    "pin-reset-complete": () => showToast("PIN 재설정이 완료됐어요."),
    "hidden-photos": openHiddenPhotosModal,
    "relation-management": openRelationManagementModal,
    "couple-settings": openCoupleSettingsModal,
    "notification-settings": openNotificationSettingsModal,
    "relationship-notification-settings": openRelationshipNotificationSettingsModal,
    "album-management": openAlbumManagementModal,
    "terms": openTermsModal,
    "privacy-policy": openPrivacyPolicyModal,
    security: openSecurityModal,
    support: openSupportModal,
    "support-contact": openSupportContactPage,
    account: openAccountModal,
    "password-change": openPasswordChangePage,
    "previous-archive": () => openPinGate("이전 커플 보관함", openArchiveModal),
    "danger-disconnect": () => openPinGate("관계 연결 해제", () => showToast("연결 해제 확인 화면입니다. 실제 삭제는 일어나지 않아요.")),
    "danger-delete-archive": () => openPinGate("이전 관계 전체 삭제", () => showToast("전체 삭제는 PIN 확인 후 최종 확인이 필요합니다.")),
    "danger-withdraw": openWithdrawalModal,
    "toggle-connection": () => {
      if (state.switchPinEnabled) {
        openPinGate("관계 전환", () => {
          state.connected = !state.connected;
          setTab("home");
          showToast(state.connected ? "현재 관계 화면으로 전환했어요." : "혼자 쓰는 상태를 확인합니다.");
        });
      }
    },
  };
  actions[action]?.();
}

function openMemoryModal() {
  openModal(`
    <div class="modal-sheet"><div class="between"><h3>우리 기록 남기기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">
      <section class="card"><h3>사진 선택</h3><p>한 기록당 최대 30장까지 가능하며, 선택 순서 표시와 순서 변경을 지원합니다.</p><div class="row" style="margin-top:12px"><button class="ghost-btn">다중 선택</button><button class="ghost-btn">사진 없이 기록</button></div></section>
      <div class="form-field"><label>제목</label><input id="memoryTitle" placeholder="비어 있으면 자동 생성" /></div>
      <div class="form-field"><label>날짜</label><input value="2026-04-29" /></div>
      <div class="form-field"><label>장소</label><input placeholder="직접 입력" /></div>
      <div class="form-field"><label>기록 유형</label><select><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
      <div class="chip-row">${["기쁨", "편안함", "고마움", "설렘", "솔직함"].map((item) => `<button class="chip-btn">${item}</button>`).join("")}</div>
      <div class="form-field"><label>한 줄 메모</label><textarea placeholder="글자 수 제한 없음"></textarea></div>
      <div class="chip-row"><button class="chip-btn ${state.connected ? "active" : ""}">우리 둘이 보기</button><button class="chip-btn ${state.connected ? "" : "active"}">나만 보기</button></div>
      <button class="primary-btn full" data-save-memory>저장</button>
    </div></div>
  `);
  qs("[data-save-memory]").addEventListener("click", () => {
    state.memories.unshift({ title: qs("#memoryTitle").value.trim() || "2026년 4월의 일상", date: "2026.04.29", place: "직접 입력한 장소", type: "일상", note: "새 기록에서 작성한 한 줄 메모", scope: state.connected ? "우리 둘이 보기" : "나만 보기", feelings: ["기쁨"], reaction: "", author: "나" });
    closeModal();
    renderApp();
    openMemorySavedModal();
  });
}

function openMemorySavedModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>기록 저장 완료</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>기록 상세로 이동했습니다. 새 기록 추가 알림은 상대에게 전송됩니다.</p><section class="card"><h3>일기 추가 제안</h3><p>이 순간에 대한 일기를 이어서 남겨볼까요? 이 제안은 저장 직후 1회만 보여줍니다.</p></section><button class="ghost-btn" data-action="new-diary">일기 추가</button><button class="primary-btn" data-action="memory-detail" data-index="0">기록 상세 보기</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openDiaryScopeModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>일기 공개 범위</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>홈에서 일기 쓰기를 선택하면 먼저 공개 범위만 고릅니다.</p><button class="primary-btn" data-action="new-diary">나만 보기</button><button class="ghost-btn" data-action="${state.connected ? "new-diary" : "connect"}">상대에게 공유</button>${state.connected ? "" : '<p class="tiny-note">커플 연결 전에는 공유 일기를 작성할 수 없어요.</p>'}</div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openDiaryModal() {
  openModal(`
    <div class="modal-sheet"><div class="between"><h3>일기 쓰기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">
      <div class="chip-row"><button class="chip-btn active">나만 보기</button><button class="chip-btn">상대에게 공유</button></div>
      <div class="form-field"><label>제목</label><input id="diaryTitle" placeholder="선택 사항" /></div>
      <div class="form-field"><label>본문</label><textarea id="diaryBody" placeholder="오늘의 마음을 적어보세요."></textarea></div>
      <div class="chip-row">${["고마움", "안정", "서운함", "그리움", "기대"].map((item) => `<button class="chip-btn">${item}</button>`).join("")}</div>
      <section class="card"><h3>관련 기록 연결</h3><p>공유 일기에는 공유 기록만 연결할 수 있어요.</p><button class="ghost-btn full">기록 선택</button></section>
      <button class="ghost-btn full" data-ai-from-diary>전할 말로 정리하기</button><button class="ghost-btn full" data-action="shared-diary-confirm">공유 일기 저장 확인</button><button class="primary-btn full" data-save-diary>임시 저장</button>
    </div></div>
  `);
  qs("[data-ai-from-diary]").addEventListener("click", openAiModal);
  qs("[data-save-diary]").addEventListener("click", () => {
    state.diaries.unshift({ title: qs("#diaryTitle").value.trim() || "제목 없는 일기", body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문", scope: "개인", feelings: ["고마움"], linked: "관련 기록 없음", author: "나" });
    closeModal();
    renderDiary();
    showToast("일기를 임시 저장했어요.");
  });
}

function openMemoryDetailPageFinal(index) {
  const memory = state.memories[index] || state.memories[0];
  openModal(`
    <div class="modal-sheet"><div class="between"><h3>${memory.title}</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">
      <div class="photo-stack" style="height:170px"></div><p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p><p>${memory.note}</p>
      <section class="card"><h3>내 감정 / 상대 감정</h3><p>내 감정은 나만, 상대 감정은 상대만 수정할 수 있어요.</p><div class="tag-row" style="margin-top:8px">${memory.feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div></section>
      <section class="card"><h3>반응</h3><div class="chip-row">${["좋았어", "또 가자", "웃겼어", "고마워", "소중해"].map((item) => `<button class="chip-btn ${item === memory.reaction ? "active" : ""}">${item}</button>`).join("")}</div></section>
      <section class="card"><h3>사진 정책</h3><p>내가 올린 사진은 숨기기/삭제 가능, 상대가 올린 사진은 숨기기만 가능해요.</p><button class="ghost-btn full" data-action="share-card">기록 카드 공유 미리보기</button></section>
      <button class="ghost-btn" data-action="new-diary">연결된 일기 추가</button><button class="ghost-btn" data-action="ai-message">전할 말 정리하기</button><button class="ghost-btn">사진 추가</button><button class="primary-btn">기록 수정</button>
    </div></div>
  `);
  bindActions(qs(".modal-sheet"));
}

function startSetup() {
  openModal(`
    <div class="modal-sheet">
      <div class="between"><h3>첫 설정</h3><button class="icon-btn" data-close></button></div>
      <div class="section-stack">
        <div class="form-field"><label>닉네임</label><input value="하린" /></div>
        <div class="form-field"><label>앱 보안 PIN 6자리</label><input maxlength="6" value="123456" aria-label="앱 보안 PIN" /></div>
        <section class="card">
          <div class="between"><h3>프로필 사진</h3><span class="chip-btn">선택</span></div>
          <div class="profile-photo-actions">
            <button class="camera-icon-btn" data-camera-permission aria-label="사진 촬영">📷</button>
            <button class="ghost-btn full" data-album-open>앨범 보기</button>
          </div>
        </section>
        <div class="tabs">
          <button class="chip-btn active" data-action="connect">상대와 연결하기</button>
          <button class="chip-btn" data-start-alone>혼자 먼저 시작하기</button>
        </div>
        <button class="primary-btn full" data-complete-setup>듀아리 시작</button>
      </div>
    </div>
  `);
  qs("[data-camera-permission]").addEventListener("click", () => {
    showToast("사진 촬영을 위해 사진 권한을 요청합니다.");
  });
  qs("[data-album-open]").addEventListener("click", () => {
    showToast("앨범에서 프로필 사진을 선택할 수 있어요.");
  });
  qs("[data-start-alone]").addEventListener("click", openStartAlonePage);
  qs("[data-complete-setup]").addEventListener("click", () => {
    closeModal();
    qs("#onboarding").classList.add("is-hidden");
    qs("#app").classList.remove("is-hidden");
    state.connected = true;
    showToast("닉네임과 PIN 설정이 완료되었어요.");
    renderApp();
  });
  bindActions(qs(".modal-sheet"));
}

const notificationOptionsV4 = [
  { value: "all", label: "전체" },
  { value: "record", label: "기록" },
  { value: "diary", label: "다이어리" },
  { value: "message", label: "메시지" },
  { value: "anniversary", label: "기념일" },
  { value: "system", label: "시스템" },
];

const notificationItemsV4 = [
  { type: "record", title: "상대가 새 우리 기록을 추가함", body: "성수에서 보낸 오후 기록이 추가되었어요." },
  { type: "record", title: "상대가 기록에 반응함", body: "우리 기록에 '또 가자' 반응을 남겼어요." },
  { type: "diary", title: "상대가 공유 일기를 작성함", body: "새 공유 일기가 도착했어요." },
  { type: "diary", title: "상대가 내 공유 일기에 반응함", body: "공유 일기에 '고마워' 반응을 남겼어요." },
  { type: "message", title: "상대가 정리한 메시지를 보냄", body: "전하고 싶은 마음을 정리한 메시지가 도착했어요." },
  { type: "anniversary", title: "기념일 D-day", body: "오늘은 여행 1주년이에요." },
  { type: "anniversary", title: "가까운 기념일 D-7", body: "여행 1주년이 7일 남았어요." },
  { type: "system", title: "커플 연결 완료", body: "봄이와 하린의 공간이 연결되었어요." },
  { type: "system", title: "공유 동의 요청이 도착함", body: "상대 콘텐츠가 포함된 공유 요청을 확인해 주세요.", action: "share-consent-list" },
];

function renderNotificationItemsV4(filter = "all") {
  const list = qs("[data-notification-list]");
  if (!list) return;
  const filtered = filter === "all" ? notificationItemsV4 : notificationItemsV4.filter((item) => item.type === filter);
  list.innerHTML = filtered.length
    ? filtered.map((item) => `
      <section class="card notification-item">
        <strong>${item.title}</strong>
        <p>${item.body}</p>
        ${item.action ? '<button class="ghost-btn full" data-action="share-consent-list">공유 요청 보기</button>' : ""}
      </section>
    `).join("")
    : `<section class="card notification-item"><strong>알림이 없어요</strong><p>선택한 유형의 알림이 아직 없습니다.</p></section>`;
  bindActions(list);
}

function openNotificationPageV3() {
  openModal(`
    <div class="modal-sheet notification-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>알림</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <label class="notification-filter-field" aria-label="알림 필터">
        <select class="notification-filter-select" data-notification-filter>
          ${notificationOptionsV4.map((option) => `<option value="${option.value}">${option.label}</option>`).join("")}
        </select>
      </label>
      <div class="list" data-notification-list></div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  renderNotificationItemsV4("all");
  qs("[data-notification-filter]").addEventListener("change", (event) => {
    renderNotificationItemsV4(event.target.value);
  });
}

function renderHome() {
  const home = qs("#home");
  const questionActions = `
    <div class="home-question-actions">
      <button class="primary-btn" data-action="answer-question">답변 쓰기</button>
      <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
    </div>
  `;

  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <section class="card home-records-card"><h3>최근 우리 기록</h3><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
        <section class="diary-card"><h3>최근 공유 일기</h3><p>연결 전에는 공유 일기를 사용할 수 없어요.</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3>${questionActions}</section>
      </div>
    `;
    bindActions(home);
    return;
  }

  const sharedDiary = state.diaries.find((diary) => diary.scope === "공유") || state.diaries[0];
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
      <section class="card home-records-card"><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
      <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${sharedDiary?.body || "아직 공유 일기가 없어요."}</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3>${questionActions}</section>
    </div>
  `;
  bindActions(home);
}

function renderHome() {
  const home = qs("#home");
  const questionActions = `
    <div class="home-question-actions">
      <button class="primary-btn" data-action="answer-question">답변 쓰기</button>
      <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
      <button class="ghost-btn" data-action="new-question">직접 질문 작성하기</button>
    </div>
  `;

  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <section class="card home-records-card"><h3>최근 우리 기록</h3><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
        <section class="diary-card"><h3>최근 공유 일기</h3><p>연결 전에는 공유 일기를 사용할 수 없어요.</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3>${questionActions}</section>
      </div>
    `;
    bindActions(home);
    return;
  }

  const sharedDiary = state.diaries.find((diary) => diary.scope === "공유") || state.diaries[0];
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
      <section class="card home-records-card"><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
      <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${sharedDiary?.body || "아직 공유 일기가 없어요."}</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3>${questionActions}</section>
    </div>
  `;
  bindActions(home);
}

function renderQuestions() {
  qs("#questions").innerHTML = `
    <div class="section-stack">
      <section class="question-card">
        <p class="eyebrow">오늘의 질문</p>
        <h3>내가 요즘 자주 떠올리는 우리의 순간은?</h3>
        <p>개인 질문 70%, 관계 질문 30% 비율로 부담 없이 이어집니다.</p>
        <div class="row" style="margin-top:12px">
          <button class="primary-btn" data-action="answer-question">답변 작성</button>
          <button class="ghost-btn" data-action="new-question">직접 질문</button>
        </div>
        <button class="ghost-btn full" data-action="another-question">다른 질문 보기</button>
      </section>
      <section class="card"><h3>답변 보내기</h3><div class="list"><button class="ghost-btn" data-action="private-answer">비공개 저장</button><button class="ghost-btn" data-action="send-to-partner">상대에게 보내기</button><button class="ghost-btn" data-action="ai-message">AI로 다듬어서 보내기</button><button class="ghost-btn" data-action="send-original">원문으로 보내기</button></div></section>
      <section class="card"><h3>메시지함</h3><p>받은 메시지는 최종 메시지만, 보낸 메시지는 원문과 실제 보낸 메시지를 함께 보여줍니다.</p><button class="primary-btn full" data-action="message-detail">메시지 상세 보기</button></section>
    </div>
  `;
  bindActions(qs("#questions"));
}

function openStartAlonePage() {
  openModal(`
    <div class="modal-sheet notification-page start-alone-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-setup aria-label="뒤로가기">←</button>
        <h3>혼자 먼저 시작하기</h3>
        <button class="notification-nav-btn" data-close aria-label="닫기">×</button>
      </header>
      <div class="section-stack">
        <section class="hero-card">
          <h3>연결 전에도 듀아리를 사용할 수 있어요</h3>
          <p>나만 보기 기록과 개인 일기, 비공개 질문 답변, 전할 말 초안을 먼저 쌓아둘 수 있어요.</p>
        </section>
        <div class="solo-feature-grid">
          ${["나만 보기 기록", "개인 일기", "질문 답변 비공개 저장", "전할 말 초안 작성"].map((item) => `<section class="card"><strong>${item}</strong></section>`).join("")}
        </div>
        <section class="card">
          <h3>연결 전 제한</h3>
          <ul class="solo-limit-list">
            <li>상대에게 보내기</li>
            <li>공유 일기</li>
            <li>상대 반응</li>
            <li>커플 공동 기록</li>
          </ul>
        </section>
        <button class="primary-btn full" data-confirm-alone>혼자 시작하기</button>
        <button class="ghost-btn full" data-action="connect">상대와 연결하기</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-setup]").addEventListener("click", startSetup);
  qs("[data-confirm-alone]").addEventListener("click", () => {
    state.connected = false;
    state.aloneCtaHidden = false;
    closeModal();
    qs("#onboarding").classList.add("is-hidden");
    qs("#app").classList.remove("is-hidden");
    setTab("home");
    showToast("혼자 먼저 시작했어요. 상대 초대는 언제든 할 수 있어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function renderHome() {
  const home = qs("#home");
  const questionActions = `
    <div class="home-question-actions">
      <button class="primary-btn" data-action="answer-question">답변 쓰기</button>
      <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
    </div>
  `;

  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <section class="card home-records-card"><h3>최근 우리 기록</h3><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
        <section class="diary-card"><h3>최근 공유 일기</h3><p>연결 전에는 공유 일기를 사용할 수 없어요.</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3>${questionActions}</section>
      </div>
    `;
    bindActions(home);
    return;
  }

  const sharedDiary = state.diaries.find((diary) => diary.scope === "공유") || state.diaries[0];
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
      <section class="card home-records-card"><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
      <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${sharedDiary?.body || "아직 공유 일기가 없어요."}</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3>${questionActions}</section>
    </div>
  `;
  bindActions(home);
}

function renderQuestions() {
  qs("#questions").innerHTML = `
    <div class="section-stack">
      <section class="question-card">
        <p class="eyebrow">오늘의 질문</p>
        <h3>내가 요즘 자주 떠올리는 우리의 순간은?</h3>
        <p>개인 질문 70%, 관계 질문 30% 비율로 부담 없이 이어집니다.</p>
        <div class="row" style="margin-top:12px">
          <button class="primary-btn" data-action="answer-question">답변 작성</button>
          <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
        </div>
      </section>
      <section class="card"><h3>답변 보내기</h3><div class="list"><button class="ghost-btn" data-action="private-answer">비공개 저장</button><button class="ghost-btn" data-action="send-to-partner">상대에게 보내기</button><button class="ghost-btn" data-action="ai-message">AI로 다듬어서 보내기</button><button class="ghost-btn" data-action="send-original">원문으로 보내기</button></div></section>
      <section class="card"><h3>메시지함</h3><p>받은 메시지는 최종 메시지만, 보낸 메시지는 원문과 실제 보낸 메시지를 함께 보여줍니다.</p><button class="primary-btn full" data-action="message-detail">메시지 상세 보기</button></section>
    </div>
  `;
  bindActions(qs("#questions"));
}

function openPhotoDetail() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>사진 상세</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="photo-stack" style="height:240px"></div><button class="primary-btn">다운로드</button><button class="ghost-btn" data-action="share-consent">외부 공유 요청</button><button class="ghost-btn">내 화면에서 숨기기</button><button class="ghost-btn">사진 삭제</button><p class="tiny-note">상대가 올린 사진/글/메시지가 포함되면 동의가 필요합니다.</p></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openDiaryDetail() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>일기 상세</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>개인 일기는 상대에게 존재 자체가 보이지 않고, 공유할 때는 복사본 편집 화면을 거칩니다.</p><button class="ghost-btn">수정</button><button class="ghost-btn">상대에게 공유 복사본 만들기</button><button class="ghost-btn" data-action="ai-message">전할 말로 정리하기</button><button class="ghost-btn" data-action="share-consent">외부 공유</button><button class="primary-btn">삭제</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openQuestionModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>답변 작성</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p class="meta">답변 작성 시 감정 선택은 사용하지 않아요.</p><div class="form-field"><label>답변</label><textarea placeholder="솔직하게 적어보세요."></textarea></div><button class="ghost-btn">비공개 저장</button><button class="ghost-btn" data-action="ai-message">AI로 다듬어서 보내기</button><button class="primary-btn">원문으로 보내기</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openAiModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>전할 말 정리하기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="chip-row">${["부드럽게", "다정하게", "솔직하게", "짧게", "진지하게"].map((tone, index) => `<button class="chip-btn ${index === 0 ? "active" : ""}">${tone}</button>`).join("")}</div><div class="form-field"><label>원문</label><textarea>요즘 내가 조금 서운했던 마음을 차분히 전하고 싶어.</textarea></div><section class="card"><h3>AI 결과</h3><p>요즘 조금 서운했던 마음이 있었어. 탓하고 싶은 건 아니고, 우리 둘 다 편하게 이야기해보고 싶어서 조심스럽게 꺼내봐.</p></section><button class="ghost-btn">다시 다듬기</button><button class="ghost-btn">원문으로 돌아가기</button><button class="ghost-btn">초안 저장</button><button class="primary-btn">상대에게 보내기</button></div></div>`);
}

function openConnectModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>상대와 연결하기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><button class="primary-btn">초대 링크 공유</button><div class="form-field"><label>초대 코드</label><input placeholder="7일 안에 받은 코드 입력" /></div><section class="card"><h3>상대 프로필 미리보기</h3><p>코드 입력 후 상대 프로필을 확인하고 즉시 연결합니다. QR 코드는 2차 기능입니다.</p></section><div class="form-field"><label>내 닉네임</label><input value="하린" /></div><div class="form-field"><label>연애 시작일</label><input value="2025-03-05" /></div><button class="primary-btn full" data-connect-now>연결하기</button></div></div>`);
  qs("[data-connect-now]").addEventListener("click", () => {
    state.connected = true;
    closeModal();
    setTab("home");
    showToast("커플 연결이 완료됐어요. 알림 권한을 요청할 차례입니다.");
  });
}

function openDirectQuestionModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>직접 질문 만들기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="form-field"><label>질문</label><textarea placeholder="함께 이야기하고 싶은 질문"></textarea></div><p class="tiny-note">직접 만든 질문은 저장 후 수정할 수 없습니다.</p><button class="primary-btn full" data-close>저장</button></div></div>`);
}

function openMessageDetail() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>메시지 상세</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>받은 메시지</h3><p>최종 메시지만 표시하고, AI 사용 여부는 보여주지 않아요.</p></section><section class="card"><h3>보낸 메시지</h3><p>원문, 실제 보낸 메시지, 전송 방식, 전달됨/읽음, 상대 반응을 표시합니다.</p></section><div class="chip-row">${["고마워", "알겠어", "나도 그래", "생각해볼게", "미안해"].map((item) => `<button class="chip-btn">${item}</button>`).join("")}</div><button class="ghost-btn">내 화면에서 숨김</button><button class="primary-btn">양쪽에서 삭제</button></div></div>`);
}

function openShareConsentModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>공유 동의</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>상대 콘텐츠가 포함된 묶음 전체에 대해 한 번에 동의를 요청합니다.</p><section class="card"><h3>정책</h3><p>동의 유효 기간은 없고, 콘텐츠가 바뀌면 새 동의가 필요합니다. 공유 이력은 저장하지 않아요.</p></section><button class="ghost-btn">요청 취소</button><button class="primary-btn">알림으로 동의 요청</button></div></div>`);
}

function openRelationManagementModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>관계 관리</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><div class="between"><strong>봄이</strong><span class="chip-btn active">현재 사용 중</span></div><p>전환 후 홈으로 이동합니다.</p></section><section class="card"><div class="between"><strong>이전 관계</strong><span class="meta">보관됨</span></div><p>현재 관계와 완전히 분리됩니다.</p></section><button class="ghost-btn">관계 추가</button><button class="ghost-btn" data-action="previous-archive">이전 커플 보관함</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openCoupleSettingsModal() {
  openAnniversarySettingsPage();
}

function openAnniversariesModal() {
  openAnniversarySettingsPage();
}

function addCustomAnniversary(element) {
  const sheet = element.closest(".modal-sheet");
  const name = qs("[data-anniversary-name]", sheet)?.value.trim() || "새 기념일";
  const date = qs("[data-anniversary-date]", sheet)?.value || "2026-05-20";
  const repeat = qs("[data-anniversary-repeat]", sheet)?.classList.contains("active") ?? true;
  const newAnniversary = { name, date: date.replaceAll("-", "."), repeat, alert: true };
  state.anniversaries = [newAnniversary, ...state.anniversaries];
  openAnniversarySettingsPage();
  showToast("기념일 설정에 추가했어요.");
}

function saveEditedAnniversary(element, index) {
  const sheet = element.closest(".modal-sheet");
  const name = qs("[data-anniversary-name]", sheet)?.value.trim() || "새 기념일";
  const date = qs("[data-anniversary-date]", sheet)?.value || "2026-05-20";
  const repeat = qs("[data-anniversary-repeat]", sheet)?.classList.contains("active") ?? true;
  state.anniversaries[index] = { ...state.anniversaries[index], name, date: date.replaceAll("-", "."), repeat };
  openAnniversarySettingsPage();
  showToast("기념일을 수정했어요.");
}

function deleteAnniversary(index) {
  state.anniversaries.splice(index, 1);
  openAnniversarySettingsPage();
  showToast("기념일을 삭제했어요.");
}

function openAnniversaryDeleteConfirm(index) {
  const modal = qs("#modal");
  qs(".support-submit-overlay", modal)?.remove();
  modal.insertAdjacentHTML("beforeend", `
    <div class="support-submit-overlay" role="dialog" aria-modal="true">
      <div class="support-submit-sheet">
        <h3>기념일을 삭제할까요?</h3>
        <p>삭제한 기념일은 목록에서 사라지고 다시 복구할 수 없어요.</p>
        <div class="support-submit-actions">
          <button class="ghost-btn" type="button" data-anniversary-delete-cancel>취소</button>
          <button class="primary-btn" type="button" data-anniversary-delete-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-anniversary-delete-cancel]", modal)?.addEventListener("click", () => qs(".support-submit-overlay", modal)?.remove());
  qs("[data-anniversary-delete-confirm]", modal)?.addEventListener("click", () => {
    qs(".support-submit-overlay", modal)?.remove();
    deleteAnniversary(index);
  });
}

function openAddAnniversaryPage(editIndex = null) {
  const isEdit = Number.isInteger(editIndex);
  const editing = isEdit ? state.anniversaries[editIndex] : null;
  openModal(`
    <div class="modal-sheet notification-page anniversary-settings-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-anniversary-add-back aria-label="뒤로가기">←</button>
        <h3>${isEdit ? "기념일 수정" : "기념일 추가"}</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card anniversary-form-card">
          <h3>기념일 정보</h3>
          <div class="form-field">
            <label>이름</label>
            <input data-anniversary-name placeholder="예: 처음 여행 간 날" value="${editing?.name || ""}" />
          </div>
          <div class="form-field">
            <label>날짜</label>
            <input data-anniversary-date type="date" value="${editing?.date?.replaceAll(".", "-") || "2026-05-20"}" />
          </div>
          <div class="section-stack compact-stack">
            <div class="between anniversary-setting-row">
              <strong>매년 반복</strong>
              <button class="setting-switch ${editing?.repeat === false ? "" : "active"}" type="button" aria-pressed="${editing?.repeat === false ? "false" : "true"}" data-anniversary-repeat>
                <span class="setting-switch-track" aria-hidden="true"><span class="setting-switch-knob"></span></span>
                <span class="setting-switch-label">${editing?.repeat === false ? "끔" : "켬"}</span>
              </button>
            </div>
          </div>
          <button class="primary-btn full" type="button" data-save-anniversary>${isEdit ? "수정 완료" : "기념일 추가"}</button>
        </section>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  bindActions(sheet);
  qs("[data-anniversary-add-back]", sheet)?.addEventListener("click", openAnniversarySettingsPage);
  qs("[data-save-anniversary]", sheet)?.addEventListener("click", (event) => {
    if (isEdit) saveEditedAnniversary(event.currentTarget, editIndex);
    else addCustomAnniversary(event.currentTarget);
  });
  qsa(".setting-switch", sheet).forEach((button) => {
    button.addEventListener("click", () => toggleSettingSwitch(button));
  });
}

function openAnniversarySettingsPage() {
  openModal(`
    <div class="modal-sheet notification-page anniversary-settings-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기념일 설정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <h3>자동 기념일</h3>
          <p>우리의 시작일을 기준으로 100일 단위와 주년을 자동으로 보여줍니다.</p>
          <p>D-7과 D-day에 알려주고, 홈에는 가장 가까운 기념일 1개만 표시합니다.</p>
        </section>
        <section class="card">
          <h3>추가한 기념일</h3>
          <div class="between anniversary-list-header">
            <span class="meta">${state.anniversaries.length}개</span>
            <button class="chip-btn active" type="button" data-open-add-anniversary>기념일 추가</button>
          </div>
          <div class="list">
            ${state.anniversaries.map((item, index) => `
              <article class="card inner-card">
                <div class="between anniversary-item-header">
                  <div class="anniversary-item-text">
                    <strong>${item.name}</strong>
                    <p>${item.date} · ${item.repeat ? "매년 반복" : "반복 없음"}</p>
                  </div>
                  <div class="anniversary-menu-wrap">
                    <button class="icon-btn anniversary-kebab" type="button" data-anniversary-menu aria-label="더보기" title="더보기">
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                    </button>
                    <div class="anniversary-dropdown" data-anniversary-dropdown hidden>
                      <button type="button" data-edit-anniversary="${index}">수정</button>
                      <button type="button" data-delete-anniversary="${index}">삭제</button>
                    </div>
                  </div>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  bindActions(sheet);
  qs("[data-open-add-anniversary]", sheet)?.addEventListener("click", openAddAnniversaryPage);
  sheet.addEventListener("click", (event) => {
    const menuButton = event.target.closest("[data-anniversary-menu]");
    if (menuButton) {
      const menu = menuButton.closest(".anniversary-menu-wrap")?.querySelector("[data-anniversary-dropdown]");
      const willOpen = menu?.hidden;
      qsa("[data-anniversary-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-anniversary-menu]", sheet).forEach((item) => item.classList.remove("active"));
      if (menu && willOpen) {
        menu.hidden = false;
        menuButton.classList.add("active");
      }
      return;
    }
    const editButton = event.target.closest("[data-edit-anniversary]");
    if (editButton) {
      openAddAnniversaryPage(Number(editButton.dataset.editAnniversary));
      return;
    }
    const deleteButton = event.target.closest("[data-delete-anniversary]");
    if (deleteButton) {
      qsa("[data-anniversary-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-anniversary-menu]", sheet).forEach((item) => item.classList.remove("active"));
      openAnniversaryDeleteConfirm(Number(deleteButton.dataset.deleteAnniversary));
      return;
    }
    if (!event.target.closest(".anniversary-menu-wrap")) {
      qsa("[data-anniversary-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-anniversary-menu]", sheet).forEach((item) => item.classList.remove("active"));
    }
  });
  qsa(".setting-switch", sheet).forEach((button) => {
    button.addEventListener("click", () => toggleSettingSwitch(button));
  });
}

function openHiddenPhotosModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>숨긴 사진 관리</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>숨김은 내 화면에서만 적용되고 상대에게 알림이 가지 않아요.</p>${state.hiddenPhotos.map((photo) => `<section class="card"><div class="between"><strong>${photo}</strong><button class="chip-btn">복구</button></div></section>`).join("")}<p class="tiny-note">복구 시 확인을 거치고, 다중 선택은 2차 기능입니다.</p></div></div>`);
}

function openNotificationSettingsModal() {
  openModal(`
    <div class="modal-sheet notification-page notification-settings-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>알림 설정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${["알림", "기념일 알림"].map((item) => `
          <section class="card notification-setting-card">
            <div class="between">
              <strong>${item}</strong>
              <button class="setting-switch active" type="button" aria-pressed="true">
                <span class="setting-switch-track" aria-hidden="true"><span class="setting-switch-knob"></span></span>
                <span class="setting-switch-label">켬</span>
              </button>
            </div>
          </section>
        `).join("")}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  bindActions(sheet);
  qsa(".setting-switch", sheet).forEach((button) => {
    button.addEventListener("click", () => toggleSettingSwitch(button));
  });
}

function openRelationshipNotificationSettingsModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>관계별 알림 설정</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>현재 관계</h3><p>봄이와 하린 기준으로만 적용됩니다.</p></section>${["기록 알림", "다이어리 알림", "메시지 알림", "기념일 알림", "반응 알림"].map((item) => `<section class="card"><div class="between"><strong>${item}</strong><span class="chip-btn active">켬</span></div></section>`).join("")}</div></div>`);
}

function openAlbumManagementModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>앨범 관리</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>현재 선택된 관계의 앨범 설정입니다.</p><button class="ghost-btn" data-action="hidden-photos">숨긴 사진 관리</button><section class="card"><h3>사진 정책</h3><p>숨김은 내 화면에서만 적용되고 상대에게 알림을 보내지 않습니다.</p></section></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openSecurityModal() {
  openPinResetPage();
}

function openPinResetPage() {
  const switchActive = state.switchPinEnabled ? "active" : "";
  const switchPressed = state.switchPinEnabled ? "true" : "false";
  const switchLabel = state.switchPinEnabled ? "켬" : "끔";
  openModal(`
    <div class="modal-sheet notification-page pin-reset-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>PIN 재설정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <h3>본인 확인</h3>
          <p>계정 이메일로 받은 인증코드를 입력하면 새 PIN을 설정할 수 있어요.</p>
          <div class="form-field">
            <label>계정 이메일</label>
            <input value="harin@duari.app" readonly />
          </div>
          <button class="ghost-btn full" type="button" data-pin-send-code>인증 메일 보내기</button>
          <div class="form-field">
            <label>인증코드</label>
            <input data-pin-code-input inputmode="numeric" maxlength="6" placeholder="6자리 인증코드" disabled />
          </div>
          <button class="primary-btn full" type="button" data-pin-verify-code disabled>인증코드 확인</button>
          <p class="tiny-note" data-pin-auth-status>본인 확인 후 새 PIN 입력이 활성화됩니다.</p>
        </section>
        <section class="card">
          <h3>새 PIN</h3>
          <div class="form-field">
            <label>새 PIN 6자리</label>
            <input data-new-pin type="password" inputmode="numeric" maxlength="6" placeholder="숫자 6자리" disabled />
          </div>
          <div class="form-field">
            <label>새 PIN 확인</label>
            <input data-confirm-pin type="password" inputmode="numeric" maxlength="6" placeholder="한 번 더 입력" disabled />
          </div>
          <button class="primary-btn full" type="button" data-pin-reset-complete disabled>PIN 재설정 완료</button>
        </section>
        <section class="card notification-setting-card">
          <div class="between">
            <div>
              <strong>관계 전환 시 PIN 확인</strong>
              <p>마이 > 관계 관리에서 다른 관계로 전환할 때 PIN을 확인합니다.</p>
            </div>
            <button class="setting-switch ${switchActive}" type="button" data-state-key="switchPinEnabled" aria-pressed="${switchPressed}">
              <span class="setting-switch-track" aria-hidden="true"><span class="setting-switch-knob"></span></span>
              <span class="setting-switch-label">${switchLabel}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  bindActions(sheet);
  bindPinResetPage(sheet);
}

function bindPinResetPage(sheet) {
  qsa(".setting-switch", sheet).forEach((button) => {
    button.addEventListener("click", () => toggleSettingSwitch(button));
  });

  const sendCodeButton = qs("[data-pin-send-code]", sheet);
  const codeInput = qs("[data-pin-code-input]", sheet);
  const verifyButton = qs("[data-pin-verify-code]", sheet);
  const status = qs("[data-pin-auth-status]", sheet);
  const newPinInput = qs("[data-new-pin]", sheet);
  const confirmPinInput = qs("[data-confirm-pin]", sheet);
  const completeButton = qs("[data-pin-reset-complete]", sheet);
  const verificationCode = "123456";

  const updateCompleteState = () => {
    const isReady = !newPinInput.disabled && newPinInput.value.length === 6 && confirmPinInput.value.length === 6;
    completeButton.disabled = !isReady;
  };

  sendCodeButton.addEventListener("click", () => {
    codeInput.disabled = false;
    verifyButton.disabled = false;
    codeInput.focus();
    status.textContent = "인증 메일을 보냈어요. 프로토타입 인증코드는 123456입니다.";
    showToast("인증 메일을 보냈어요.");
  });

  verifyButton.addEventListener("click", () => {
    if (codeInput.value.trim() !== verificationCode) {
      status.textContent = "인증코드가 맞지 않아요. 다시 확인해 주세요.";
      showToast("인증코드를 확인해 주세요.");
      return;
    }
    codeInput.disabled = true;
    verifyButton.disabled = true;
    sendCodeButton.disabled = true;
    newPinInput.disabled = false;
    confirmPinInput.disabled = false;
    newPinInput.focus();
    status.textContent = "본인 확인이 완료됐어요. 새 PIN을 입력해 주세요.";
    showToast("본인 확인이 완료됐어요.");
  });

  [newPinInput, confirmPinInput].forEach((input) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(0, 6);
      updateCompleteState();
    });
  });

  completeButton.addEventListener("click", () => {
    if (newPinInput.value.length !== 6 || confirmPinInput.value.length !== 6) {
      showToast("새 PIN 6자리를 입력해 주세요.");
      return;
    }
    if (newPinInput.value !== confirmPinInput.value) {
      showToast("새 PIN이 서로 달라요.");
      return;
    }
    showToast("PIN 재설정이 완료됐어요.");
    closeModal();
  });
}

function openAccountModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>계정</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="form-field"><label>닉네임</label><input value="하린" /></div><button class="ghost-btn">로그아웃</button><button class="primary-btn" data-action="danger-withdraw">회원 탈퇴</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function getSupportFaqItems() {
  return [
    ["시작", "커플 연결 없이 혼자 먼저 사용할 수 있나요?", "네, 나만 보기 기록, 개인 일기, 비공개 답변, 전할 말 초안을 먼저 사용할 수 있어요."],
    ["시작", "상대와 연결하면 어떤 기능이 열리나요?", "공유 일기, 우리 둘이 보기 기록, 상대 반응, 메시지 전달 같은 함께 쓰는 기능을 사용할 수 있어요."],
    ["시작", "초대 코드는 얼마나 유지되나요?", "초대 코드는 7일 동안 사용할 수 있고, 만료되면 새로 초대하면 됩니다."],
    ["기록", "사진 권한을 거부해도 기록할 수 있나요?", "네, 사진 없이 기록을 남길 수 있어요."],
    ["기록", "한 기록에 사진을 몇 장까지 넣을 수 있나요?", "한 기록에는 최대 30장까지 추가할 수 있어요."],
    ["기록", "나만 보기 기록을 나중에 공유할 수 있나요?", "기록 수정에서 공개 범위를 바꾸는 흐름으로 공유 여부를 조정할 수 있어요."],
    ["기록", "기록을 삭제하면 연결된 일기도 같이 삭제되나요?", "기록만 삭제되고, 연결된 일기는 유지되며 기록 연결만 해제됩니다."],
    ["사진", "상대가 올린 사진도 다운로드할 수 있나요?", "네, 현재 관계와 이전 커플 보관함에서 사진 다운로드가 가능합니다."],
    ["사진", "상대가 올린 사진을 삭제할 수 있나요?", "상대가 올린 사진은 내 화면에서 숨길 수 있지만 삭제할 수는 없어요."],
    ["저장", "저장에 실패하면 작성 내용이 사라지나요?", "작성 내용은 유지하고, 기록 저장 실패 시 임시 저장을 제공합니다."],
    ["사진", "사진 일부 업로드에 실패하면 어떻게 되나요?", "실패한 사진만 제외하고 저장할 수 있어요."],
    ["일기", "개인 일기는 상대에게 보이나요?", "아니요. 개인 일기는 존재 자체도 상대에게 노출되지 않아요."],
    ["일기", "개인 일기를 공유하면 원본도 바뀌나요?", "아니요. 공유 복사본을 만들고, 원본 개인 일기는 계속 나만 보기로 남습니다."],
    ["일기", "공유 일기에 사진을 첨부할 수 있나요?", "아니요. 일기는 글과 감정, 관련 기록 연결 중심으로 작성합니다."],
    ["질문", "질문 답변을 비공개로 저장할 수 있나요?", "네, 상대에게 보내지 않고 내 답변으로 저장해둘 수 있어요."],
    ["질문", "직접 만든 질문은 수정할 수 있나요?", "직접 만든 질문은 수정하지 않고, 필요하면 새 질문을 만드는 흐름으로 사용합니다."],
    ["AI", "AI 정리에 실패하면 어떻게 하나요?", "다시 시도하거나 원문으로 보낼 수 있어요."],
    ["AI", "AI가 내 비공개 일기도 참고하나요?", "아니요. 기록 상세에서는 기록 정보와 내가 입력한 원문만 참고하고 비공개 일기는 참고하지 않아요."],
    ["계정", "PIN은 어디에 사용되나요?", "이전 커플 보관함 접근, 관계 연결 해제, 이전 관계 전체 삭제, 회원 탈퇴 같은 중요한 동작에 사용됩니다."],
  ];
}

function renderSupportFaqGroups(items, types) {
  return types.map((type) => {
    const typeItems = items.filter(([category]) => category === type);
    if (!typeItems.length) return "";
    return `
      <div class="faq-type-group">
        <p class="faq-type-label">${type}</p>
        <div class="list">
          ${typeItems.map(([, question, answer]) => `
            <article class="card inner-card">
              <strong>${question}</strong>
              <p>${answer}</p>
            </article>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

function bindSupportFaqFilters(sheet, faqItems, faqTypes) {
  const searchInput = qs("[data-faq-search]", sheet);
  const typeSelect = qs("[data-faq-type]", sheet);
  const count = qs("[data-faq-count]", sheet);
  const list = qs("[data-faq-list]", sheet);
  const render = () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedType = typeSelect.value;
    const filtered = faqItems.filter(([category, question, answer]) => {
      const matchesType = selectedType === "전체" || category === selectedType;
      const matchesKeyword = !keyword || `${category} ${question} ${answer}`.toLowerCase().includes(keyword);
      return matchesType && matchesKeyword;
    });
    const visibleTypes = selectedType === "전체" ? faqTypes : [selectedType];
    count.textContent = `${filtered.length}개`;
    list.innerHTML = filtered.length
      ? renderSupportFaqGroups(filtered, visibleTypes)
      : `<p class="tiny-note">검색 결과가 없어요. 문의하기로 알려주시면 확인해볼게요.</p>`;
  };
  searchInput.addEventListener("input", render);
  typeSelect.addEventListener("change", render);
}

function openSupportModal() {
  const faqItems = getSupportFaqItems();
  const faqTypes = ["시작", "기록", "사진", "저장", "일기", "질문", "AI", "계정"];
  openModal(`
    <div class="modal-sheet notification-page faq-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>FAQ</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <div class="form-field"><label>FAQ 검색</label><input data-faq-search placeholder="궁금한 내용을 입력해보세요." /></div>
          <div class="form-field">
            <label>FAQ 유형</label>
            <select data-faq-type>
              ${["전체", ...faqTypes].map((item) => `<option>${item}</option>`).join("")}
            </select>
          </div>
        </section>
        <section class="card">
          <div class="between"><h3>자주 묻는 질문</h3><span class="meta" data-faq-count>${faqItems.length}개</span></div>
          <div data-faq-list>${renderSupportFaqGroups(faqItems, faqTypes)}</div>
        </section>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  bindActions(sheet);
  bindSupportFaqFilters(sheet, faqItems, faqTypes);
}

function openSupportContactPage(initialTab = "form") {
  const showHistory = initialTab === "history";
  const inquiries = [
    {
      title: "사진 업로드 문의",
      status: "답변 완료",
      date: "2026.05.01",
      type: "사진",
      body: "기록 수정 화면에서 사진을 추가했는데 일부 사진만 올라가고 나머지는 실패로 표시됐어요. 실패한 사진을 다시 추가할 수 있는지 확인하고 싶어요.",
      photos: 2,
      answer: "일부 사진만 실패한 경우 실패한 사진을 제외하고 먼저 저장한 뒤, 사진 추가에서 다시 선택할 수 있어요.",
    },
    {
      title: "PIN 재설정 문의",
      status: "접수됨",
      date: "2026.04.29",
      type: "PIN",
      body: "PIN 재설정 인증 메일을 보냈는데 메일함에서 바로 확인되지 않았어요. 다시 보낼 수 있는지 궁금합니다.",
      photos: 1,
      answer: "",
    },
  ];
  openModal(`
    <div class="modal-sheet notification-page support-contact-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>문의하기</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="tabs support-tabs">
          <button class="chip-btn ${showHistory ? "" : "active"}" type="button" data-support-tab="form">문의하기</button>
          <button class="chip-btn ${showHistory ? "active" : ""}" type="button" data-support-tab="history">문의내역</button>
        </div>
        <section class="card support-tab-panel ${showHistory ? "" : "active"}" data-support-panel="form">
          <div class="form-field">
            <label>문의 유형</label>
            <select>
              <option>기록</option>
              <option>사진</option>
              <option>일기</option>
              <option>질문</option>
              <option>메시지</option>
              <option>계정</option>
              <option>PIN</option>
              <option>기타</option>
            </select>
          </div>
          <div class="form-field">
            <label>이메일</label>
            <input value="harin@duari.app" />
          </div>
          <div class="form-field">
            <label>문의 내용</label>
            <textarea placeholder="궁금한 점이나 문제가 생긴 상황을 적어주세요."></textarea>
          </div>
          <div class="form-field">
            <label>사진 추가</label>
            <section class="support-photo-field">
              <div class="support-photo-grid" data-support-photo-grid>
                <button class="support-photo-add" type="button" data-support-add-photo aria-label="사진 추가">+</button>
                <div class="support-photo-preview"><button class="support-photo-remove" type="button" data-support-remove-photo aria-label="사진 삭제">×</button><span>1</span></div>
                <div class="support-photo-preview"><button class="support-photo-remove" type="button" data-support-remove-photo aria-label="사진 삭제">×</button><span>2</span></div>
              </div>
            </section>
          </div>
          <button class="primary-btn full" type="button" data-support-submit>문의 보내기</button>
        </section>
        <section class="card support-tab-panel ${showHistory ? "active" : ""}" data-support-panel="history">
          <div class="between"><h3>문의내역</h3><span class="meta">${inquiries.length}개</span></div>
          <div class="list">
            ${inquiries.map((item, index) => `
              <button class="card inner-card support-history-card" type="button" data-support-inquiry-index="${index}">
                <div class="between"><strong>${item.title}</strong><span class="meta">${item.status}</span></div>
                <p>${item.body}</p>
                <div class="support-photo-grid support-history-photo-grid">
                  ${Array.from({ length: item.photos }, (_, photoIndex) => `<div class="support-photo-preview"><span>${photoIndex + 1}</span></div>`).join("")}
                </div>
                <p class="support-history-date">${item.date}</p>
              </button>
            `).join("")}
          </div>
        </section>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  bindActions(sheet);
  bindSupportTabs(sheet);
  qs("[data-support-submit]", sheet).addEventListener("click", () => openSupportSubmitNotice());
  qs("[data-support-add-photo]", sheet).addEventListener("click", () => {
    const grid = qs("[data-support-photo-grid]", sheet);
    const nextIndex = qsa(".support-photo-preview", grid).length + 1;
    grid.insertAdjacentHTML("beforeend", `<div class="support-photo-preview"><button class="support-photo-remove" type="button" data-support-remove-photo aria-label="사진 삭제">×</button><span>${nextIndex}</span></div>`);
  });
  qs("[data-support-photo-grid]", sheet).addEventListener("click", (event) => {
    const removeButton = event.target.closest?.("[data-support-remove-photo]");
    if (removeButton) removeButton.closest(".support-photo-preview")?.remove();
  });
  qsa("[data-support-inquiry-index]", sheet).forEach((button) => {
    button.addEventListener("click", () => openSupportInquiryDetail(inquiries[Number(button.dataset.supportInquiryIndex)]));
  });
}

function openSupportInquiryDetail(inquiry) {
  const editable = inquiry.status === "접수됨";
  openModal(`
    <div class="modal-sheet notification-page support-inquiry-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" type="button" data-support-detail-back aria-label="뒤로가기">←</button>
        <h3>문의 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <div class="between"><h3>${inquiry.title}</h3><span class="meta">${inquiry.status}</span></div>
          <p>${inquiry.date} · ${inquiry.type}</p>
        </section>
        <section class="card">
          <h3>문의 내용</h3>
          <p>${inquiry.body}</p>
        </section>
        <section class="card">
          <div class="between"><h3>첨부 사진</h3><span class="meta">${inquiry.photos}장</span></div>
          <div class="support-photo-grid">
            ${Array.from({ length: inquiry.photos }, (_, index) => `<div class="support-photo-preview"><span>${index + 1}</span></div>`).join("")}
          </div>
        </section>
        ${inquiry.answer ? `<section class="card"><h3>답변</h3><p>${inquiry.answer}</p></section>` : ""}
        ${editable ? `
          <div class="support-submit-actions">
            <button class="ghost-btn" type="button" data-support-inquiry-edit>수정</button>
            <button class="primary-btn" type="button" data-support-inquiry-delete>삭제</button>
          </div>
        ` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  bindActions(sheet);
  qs("[data-support-detail-back]", sheet).addEventListener("click", () => openSupportContactPage("history"));
  qs("[data-support-inquiry-edit]", sheet)?.addEventListener("click", () => openSupportInquiryEditPage(inquiry));
  qs("[data-support-inquiry-delete]", sheet)?.addEventListener("click", () => openSupportInquiryDeleteConfirm());
}

function openSupportInquiryEditPage(inquiry) {
  openModal(`
    <div class="modal-sheet notification-page support-contact-page">
      <header class="notification-header">
        <button class="notification-nav-btn" type="button" data-support-edit-back aria-label="뒤로가기">←</button>
        <h3>문의 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <div class="form-field">
            <label>문의 유형</label>
            <select>
              ${["기록", "사진", "일기", "질문", "메시지", "계정", "PIN", "기타"].map((type) => `<option ${type === inquiry.type ? "selected" : ""}>${type}</option>`).join("")}
            </select>
          </div>
          <div class="form-field">
            <label>이메일</label>
            <input value="harin@duari.app" />
          </div>
          <div class="form-field">
            <label>문의 내용</label>
            <textarea>${inquiry.body}</textarea>
          </div>
          <div class="form-field">
            <label>사진 추가</label>
            <section class="support-photo-field">
              <div class="support-photo-grid" data-support-photo-grid>
                <button class="support-photo-add" type="button" data-support-add-photo aria-label="사진 추가">+</button>
                ${Array.from({ length: inquiry.photos }, (_, index) => `<div class="support-photo-preview"><button class="support-photo-remove" type="button" data-support-remove-photo aria-label="사진 삭제">×</button><span>${index + 1}</span></div>`).join("")}
              </div>
            </section>
          </div>
          <button class="primary-btn full" type="button" data-support-edit-save>수정 저장</button>
        </section>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  bindActions(sheet);
  qs("[data-support-edit-back]", sheet).addEventListener("click", () => openSupportInquiryDetail(inquiry));
  qs("[data-support-edit-save]", sheet).addEventListener("click", () => {
    showToast("문의 수정 내용을 저장했어요.");
    openSupportInquiryDetail(inquiry);
  });
  qs("[data-support-add-photo]", sheet).addEventListener("click", () => {
    const grid = qs("[data-support-photo-grid]", sheet);
    const nextIndex = qsa(".support-photo-preview", grid).length + 1;
    grid.insertAdjacentHTML("beforeend", `<div class="support-photo-preview"><button class="support-photo-remove" type="button" data-support-remove-photo aria-label="사진 삭제">×</button><span>${nextIndex}</span></div>`);
  });
  qs("[data-support-photo-grid]", sheet).addEventListener("click", (event) => {
    const removeButton = event.target.closest?.("[data-support-remove-photo]");
    if (removeButton) removeButton.closest(".support-photo-preview")?.remove();
  });
}

function openSupportInquiryDeleteConfirm() {
  const modal = qs("#modal");
  const existing = qs(".support-submit-overlay", modal);
  if (existing) existing.remove();
  modal.insertAdjacentHTML("beforeend", `
    <div class="support-submit-overlay" role="dialog" aria-modal="true">
      <div class="support-submit-sheet">
        <h3>문의 삭제할까요?</h3>
        <p>삭제한 문의는 문의내역에서 사라지고 다시 확인할 수 없어요.</p>
        <div class="support-submit-actions">
          <button class="ghost-btn" type="button" data-support-delete-cancel>취소</button>
          <button class="primary-btn" type="button" data-support-delete-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-support-delete-cancel]", modal).addEventListener("click", () => qs(".support-submit-overlay", modal)?.remove());
  qs("[data-support-delete-confirm]", modal).addEventListener("click", () => {
    qs(".support-submit-overlay", modal)?.remove();
    openSupportContactPage("history");
    showToast("문의가 삭제됐어요.");
  });
}

function bindSupportTabs(sheet) {
  qsa("[data-support-tab]", sheet).forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.supportTab;
      qsa("[data-support-tab]", sheet).forEach((item) => item.classList.toggle("active", item === button));
      qsa("[data-support-panel]", sheet).forEach((panel) => panel.classList.toggle("active", panel.dataset.supportPanel === target));
    });
  });
}

function openSupportSubmitNotice() {
  const modal = qs("#modal");
  const existing = qs(".support-submit-overlay", modal);
  if (existing) existing.remove();
  modal.insertAdjacentHTML("beforeend", `
    <div class="support-submit-overlay" role="dialog" aria-modal="true">
      <div class="support-submit-sheet">
        <h3>문의 내용을 보낼까요?</h3>
        <p>문의 답변은 문의하기 &gt; 문의내역 탭에서 확인할 수 있어요.</p>
        <div class="support-submit-actions">
          <button class="ghost-btn" type="button" data-support-submit-cancel>취소</button>
          <button class="primary-btn" type="button" data-support-submit-confirm>보내기</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-support-submit-cancel]", modal).addEventListener("click", () => qs(".support-submit-overlay", modal)?.remove());
  qs("[data-support-submit-confirm]", modal).addEventListener("click", () => openSupportContactPage());
}

function openTermsModal() {
  openModal(`
    <div class="modal-sheet notification-page policy-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>이용약관</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="policy-content">
        <h4>서비스 이용</h4>
        <p>듀아리는 함께한 순간과 마음을 기록하는 관계 기록 앱입니다. 사용자는 개인 기록과 공유 기록을 목적에 맞게 작성하고 관리할 수 있습니다.</p>
        <h4>회원가입과 동의</h4>
        <p>회원가입 시 필수 약관에 동의해야 하며, 가입 후에도 마이 탭에서 이용약관을 다시 확인할 수 있습니다.</p>
        <h4>기록과 공유</h4>
        <p>나만 보기 기록은 본인에게만 보이고, 우리 둘이 보기 기록과 공유 일기는 연결된 상대에게 표시될 수 있습니다. 상대 콘텐츠가 포함된 외부 공유에는 별도 동의가 필요합니다.</p>
        <h4>안전한 사용</h4>
        <p>이전 커플 보관함 접근, 관계 연결 해제, 회원 탈퇴 등 중요한 동작에는 PIN 확인을 사용할 수 있습니다.</p>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindActions(qs(".modal-sheet"));
}

function openPrivacyPolicyModal() {
  openModal(`
    <div class="modal-sheet notification-page policy-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>개인정보처리방침</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="policy-content">
        <h4>수집하는 정보</h4>
        <p>계정 이메일, 닉네임, 프로필 사진, 관계 기록, 일기, 질문 답변, 알림 설정처럼 서비스 이용에 필요한 정보를 다룹니다.</p>
        <h4>개인 기록 보호</h4>
        <p>개인 일기, 개인 초안, 나만 보기 기록은 상대에게 존재 자체가 노출되지 않도록 분리합니다.</p>
        <h4>공유 공간 데이터</h4>
        <p>공유 기록, 공유 사진, 공유 일기, 보낸 메시지와 반응은 연결된 관계 공간에서 함께 확인될 수 있습니다.</p>
        <h4>회원 탈퇴</h4>
        <p>탈퇴 시 계정 정보와 개인 데이터는 삭제되며, 상대 공간에 남는 공유 데이터는 탈퇴한 사용자로 표시될 수 있습니다.</p>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindActions(qs(".modal-sheet"));
}

function openArchiveModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>이전 커플 보관함</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>조회 전용이며 현재 관계와 완전히 분리됩니다. 검색, 외부 공유, 데이터 내보내기는 제공하지 않아요.</p>${["우리 기록", "사진", "공유 일기", "질문/메시지", "정제 메시지", "반응", "기념일"].map((item) => `<section class="card"><div class="between"><strong>${item}</strong><span class="meta">조회 전용</span></div></section>`).join("")}<button class="ghost-btn">사진 다운로드</button><button class="primary-btn" data-action="danger-delete-archive">이전 관계 전체 삭제</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openWithdrawalModal() {
  openPinGate("회원 탈퇴", () => {
    openModal(`
      <div class="modal-sheet notification-page withdrawal-page">
        <header class="notification-header">
          <button class="notification-nav-btn" data-withdraw-back aria-label="뒤로가기">←</button>
          <h3>회원 탈퇴</h3>
          <span class="notification-header-spacer" aria-hidden="true"></span>
        </header>
        <div class="section-stack">
          <section class="card">
            <h3>탈퇴 사유</h3>
            <div class="chip-row withdrawal-reasons" data-withdraw-reasons>
              ${["사용 빈도가 낮아요", "기록을 정리하고 싶어요", "사용이 어려워요", "다른 서비스를 사용할게요", "기타"].map((reason) => `<button class="chip-btn" type="button" data-withdraw-reason="${reason}">${reason}</button>`).join("")}
            </div>
            <div class="form-field withdrawal-other-field" data-withdraw-other hidden>
              <label>기타 사유</label>
              <textarea placeholder="탈퇴 사유를 적어주세요."></textarea>
            </div>
          </section>
          <section class="card">
            <h3>탈퇴 후 데이터</h3>
            <p>공유 기록이나 일기, 전달한 질문은 상대방 화면에 보존되고 나머지는 영구적으로 삭제됩니다.</p>
          </section>
          <button class="primary-btn full" type="button" data-withdraw-final>최종 탈퇴</button>
        </div>
      </div>
    `);
    qs("#modal").classList.add("page-modal");
    const sheet = qs(".withdrawal-page");
    qs("[data-withdraw-back]", sheet)?.addEventListener("click", openAccountModal);
    qsa("[data-withdraw-reason]", sheet).forEach((button) => {
      button.addEventListener("click", () => {
        qsa("[data-withdraw-reason]", sheet).forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        const otherField = qs("[data-withdraw-other]", sheet);
        if (otherField) otherField.hidden = button.dataset.withdrawReason !== "기타";
      });
    });
    qs("[data-withdraw-final]", sheet)?.addEventListener("click", () => {
      deleteCurrentLoginAccount();
      closeModal();
      returnToEntryScreen("회원 탈퇴가 완료됐어요.");
    });
  });
}

function openPinGate(title, next) {
  openModal(`<div class="modal-sheet"><div class="between"><h3>${title}</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>고위험 동작이라 6자리 PIN 확인이 필요합니다.</p><div class="form-field"><label>PIN</label><input maxlength="6" value="123456" /></div><button class="primary-btn full" data-pin-ok>확인</button></div></div>`);
  qs("[data-pin-ok]").addEventListener("click", () => {
    closeModal();
    next();
  });
}

function openLoginModal(provider = "이메일") {
  const isEmail = provider === "이메일";
  openModal(`<div class="modal-sheet"><div class="between"><h3>${provider} 로그인</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${isEmail ? '<div class="form-field"><label>이메일</label><input placeholder="duari@example.com" /></div><div class="form-field"><label>비밀번호</label><input type="password" placeholder="비밀번호" /></div><button class="primary-btn full" data-complete-login>로그인</button><button class="ghost-btn full" data-signup>이메일로 회원가입</button>' : '<section class="card"><h3>소셜 로그인</h3><p>소셜 계정으로 로그인한 뒤 닉네임과 6자리 PIN 설정을 진행합니다.</p></section><button class="primary-btn full" data-complete-login>계속하기</button>'}</div></div>`);
  qs("[data-complete-login]")?.addEventListener("click", startSetup);
  qs("[data-signup]")?.addEventListener("click", openSignupModal);
}

function openSharedDiaryConfirmModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>공유 일기 저장</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>공유 일기는 상대가 볼 수 있고 반응할 수 있어요. 저장 후에도 작성자만 수정하거나 삭제할 수 있습니다.</p><section class="card"><div class="between"><strong>이후 다시 묻지 않기</strong><span class="chip-btn">끔</span></div></section><button class="ghost-btn">임시 저장</button><button class="primary-btn" data-close>공유 일기로 저장</button></div></div>`);
}

function openDraftListModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>저장된 초안</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["질문 답변에서 만든 초안", "개인 일기에서 만든 초안", "기록 상세에서 만든 초안"].map((item) => `<section class="card"><div class="between"><strong>${item}</strong><span class="meta">출처 저장</span></div><p>전송하면 초안은 삭제되고 보낸 메시지가 새로 생성됩니다.</p></section>`).join("")}<button class="primary-btn">선택한 초안 보내기</button></div></div>`);
}

function openShareCardModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>공유 카드 미리보기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>성수에서 보낸 오후</h3><p>바람이 좋아서 오래 걸었다.</p><p class="tiny-note" style="text-align:right">듀아리</p></section><p>사진 원본 공유에는 워터마크가 없고, 기록/일기/메시지 카드에는 하단 우측에 듀아리만 작게 표시됩니다.</p><button class="ghost-btn" data-action="share-consent">상대 콘텐츠 동의 확인</button><button class="primary-btn">외부 공유</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openErrorPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>오류/복구 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["작성 내용은 유지합니다.", "기록 저장 실패 시 임시 저장을 제공합니다.", "사진 일부 실패 시 실패한 사진만 제외하고 저장할 수 있습니다.", "AI 실패 시 다시 시도하거나 원문으로 보낼 수 있습니다.", "전송 실패 메시지는 사용자가 초안 저장을 선택합니다.", "목록 로딩 실패 시 가능하면 캐시를 먼저 표시합니다."].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}<button class="ghost-btn" data-action="photo-upload-policy">사진 업로드 정책</button><button class="ghost-btn" data-action="album-search-policy">앨범 검색 정책</button><button class="ghost-btn" data-action="reaction-policy">반응 정책</button><button class="ghost-btn" data-action="download-share-policy">다운로드/공유 정책</button><button class="ghost-btn" data-action="notification-exclusions">알림 제외 항목</button><button class="ghost-btn" data-action="anniversary-policy">기념일 자동 규칙</button><button class="ghost-btn" data-action="question-ratio">질문 구성 비율</button><button class="ghost-btn" data-action="ai-reference-policy">AI 참고 정보</button><button class="ghost-btn" data-action="hide-delete-policy">삭제/숨김 정책</button><button class="ghost-btn" data-action="message-read-policy">읽음/메시지 정책</button><button class="ghost-btn" data-action="solo-limit-policy">혼자 사용 제한</button><button class="ghost-btn" data-action="multi-relation-policy">복수 관계 고급 정책</button><button class="ghost-btn" data-action="withdrawal-display-policy">탈퇴 후 표시 정책</button><button class="ghost-btn" data-action="privacy-scope-policy">개인/공유 분리 정책</button><button class="ghost-btn" data-action="permission-timing-policy">권한 요청 타이밍</button><button class="ghost-btn" data-action="pin-usage-policy">PIN 사용 범위</button><button class="ghost-btn" data-action="share-consent-lifecycle">공유 동의 흐름</button><button class="ghost-btn" data-action="archive-content-policy">보관함 포함 데이터</button><button class="ghost-btn" data-action="notification-types-policy">전체 알림 종류</button><button class="ghost-btn" data-action="account-profile-policy">계정 프로필 정책</button><button class="ghost-btn" data-action="author-permission-policy">작성자 권한 정책</button><button class="ghost-btn" data-action="emotion-policy">감정 표시 정책</button><button class="ghost-btn" data-action="calendar-display-policy">캘린더 표시 정책</button><button class="ghost-btn" data-action="record-delete-policy">기록 수정/삭제 정책</button><button class="ghost-btn" data-action="diary-reaction-policy">일기 반응 정책</button><button class="ghost-btn" data-action="invite-code-policy">초대 코드 정책</button><button class="ghost-btn" data-action="private-diary-share-flow">개인 일기 공유 흐름</button><button class="ghost-btn" data-action="draft-source-policy">초안 출처 저장 정책</button><button class="ghost-btn" data-action="notification-filter-policy">알림 필터 정책</button><button class="ghost-btn" data-action="custom-anniversary-policy">직접 기념일 항목</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openPhotoUploadPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>사진 업로드 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["한 기록당 최대 30장까지 선택할 수 있습니다.", "선택 순서를 표시하고, 작성자가 사진 순서를 변경할 수 있습니다.", "원본은 보관하고 앱 표시용 썸네일을 생성합니다.", "기존 기록에 사진을 추가하거나 순서/감정을 수정해도 알림은 보내지 않습니다.", "사진 권한을 거부해도 사진 없이 기록할 수 있습니다."].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}</div></div>`);
}

function openAlbumSearchPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>앨범 검색 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>검색 대상</h3><p>기록 제목, 장소, 한 줄 메모, 기록 유형</p></section><section class="card"><h3>검색 제외</h3><p>감정 태그, 사진 내용, 얼굴 검색</p></section><section class="card"><h3>캘린더 표시</h3><p>날짜별 기록 유형 아이콘은 최대 2개까지 표시하고 더보기로 이어집니다.</p></section></div></div>`);
}

function openReactionPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>반응 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["콘텐츠별 반응은 1개만 선택할 수 있습니다.", "반응은 변경하거나 취소할 수 있습니다.", "반응 추가 시에만 알림을 보내고, 변경/취소 시에는 알림을 보내지 않습니다.", "자기 콘텐츠에는 반응할 수 없습니다.", "공유 일기 작성자는 자신의 일기에 반응할 수 없습니다."].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}</div></div>`);
}

function openDownloadSharePolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>다운로드/공유 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["내가 올린 사진과 상대가 올린 사진 모두 다운로드할 수 있습니다.", "이전 커플 보관함에서도 사진 다운로드는 가능합니다.", "다운로드 안내와 다운로드 알림은 제공하지 않습니다.", "이전 커플 보관함에서는 외부 공유를 제공하지 않습니다.", "상대가 올린 사진/글/메시지가 포함되면 상대 동의가 필요합니다.", "공유 완료 알림과 공유 이력은 저장하지 않습니다."].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}</div></div>`);
}

function openNotificationExclusionsModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>알림 제외 항목</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["상대가 메시지를 읽음", "접속 상태", "개인 일기 작성", "답변 지연", "사진 숨김", "공유 완료", "설정 변경 알림은 최소화"].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}</div></div>`);
}

function openAnniversaryPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>기념일 자동 규칙</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>자동 기념일</h3><p>연애 시작일을 기준으로 100일 단위와 주년을 자동 생성합니다.</p></section><section class="card"><h3>알림</h3><p>D-7, D-day, 오늘이 기념일, 연애 n일째 특별 알림을 제공합니다.</p></section><section class="card"><h3>홈 표시</h3><p>가장 가까운 기념일 1개만 표시하고, 고정 기능은 2차 기능입니다.</p></section></div></div>`);
}

function openQuestionRatioModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>질문 구성 비율</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>큰 비율</h3><p>개인 질문 70%, 관계 질문 30%</p></section>${["감정 25%", "취향 15%", "일상 15%", "가치관 15%", "애정 표현 10%", "추억 회상 8%", "서운함/갈등 7%", "미래/기대 5%"].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}</div></div>`);
}

function openAiReferencePolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>AI 참고 정보</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>기록 상세에서 참고</h3><p>기록 제목, 날짜, 장소, 기록 유형, 한 줄 메모, 내 감정 태그, 사용자가 입력한 원문</p></section><section class="card"><h3>참고하지 않음</h3><p>사진 내용, 상대 감정, 상대 일기, 비공개 일기</p></section><section class="card"><h3>전송 정책</h3><p>자동 전송은 없고, 상대에게는 최종 메시지만 전달됩니다. 원문과 정제본을 함께 보내지 않습니다.</p></section></div></div>`);
}

function openHideDeletePolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>삭제/숨김 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["사진 숨김은 확인 모달 후 내 화면에서만 적용하고, 토스트로 되돌리기를 제공합니다.", "메시지 숨김은 확인 모달을 거칩니다.", "사진 삭제는 작성자만 가능하며 양쪽에서 사라지고 복구는 없습니다.", "기록 삭제 시 연결된 일기는 유지하고 기록 연결만 해제됩니다.", "일기 삭제는 작성자만 가능하며 공유 일기는 양쪽에서 삭제됩니다.", "초안 삭제는 확인 모달을 거칩니다."].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}</div></div>`);
}

function openMessageReadPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>읽음/메시지 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>읽음</h3><p>읽음은 보낸 상세에서만 표시하고, 읽은 시간과 읽음 알림은 제공하지 않습니다.</p></section><section class="card"><h3>받은 메시지</h3><p>AI로 다듬은 메시지 여부는 표시하지 않고 최종 메시지만 보여줍니다.</p></section><section class="card"><h3>비공개 답변</h3><p>수정, 삭제, 나중에 보내기가 가능합니다.</p></section></div></div>`);
}

function openSoloLimitPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>혼자 사용 제한</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>혼자 가능</h3><p>나만 보기 기록, 개인 일기, 질문 답변 비공개 저장, 전할 말 초안 작성</p></section><section class="card"><h3>연결 전 제한</h3><p>상대에게 보내기, 공유 일기, 상대 반응, 커플 공동 기록</p></section><section class="card"><h3>홈 CTA</h3><p>혼자 계속 쓰기를 누르면 큰 CTA는 숨기고 작은 상대 초대 버튼은 유지합니다.</p></section></div></div>`);
}

function openMultiRelationPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>복수 관계 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>노출 위치</h3><p>복수 관계는 고급 기능처럼 숨기고, 홈에는 전환 버튼을 노출하지 않습니다.</p></section><section class="card"><h3>관리 위치</h3><p>마이 > 관계 관리에서만 관계 전환, 관계 추가, 이전 커플 보관함에 접근합니다.</p></section><section class="card"><h3>전환 후</h3><p>관계 전환 후 홈으로 이동하고, 사용자가 켠 경우 PIN 확인을 거칩니다.</p></section></div></div>`);
}

function openWithdrawalDisplayPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>탈퇴 후 표시 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>삭제</h3><p>계정 정보, 개인 일기, 개인 초안, 나만 보기 기록, 개인 설정</p></section><section class="card"><h3>상대 공간에 보존 가능</h3><p>공유 기록, 공유 사진, 공유 일기, 보낸 메시지, 반응</p></section><section class="card"><h3>표시 방식</h3><p>탈퇴한 사용자와 기본 프로필 이미지로 표시하고, 상대에게 탈퇴 알림은 보내지 않습니다.</p></section></div></div>`);
}

function openPrivacyScopePolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>개인/공유 분리 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>개인 일기</h3><p>상대에게 존재 자체도 노출되지 않고, 비밀번호와 사진 첨부는 제공하지 않습니다.</p></section><section class="card"><h3>상대에게 공유</h3><p>개인 일기를 직접 공개 전환하지 않고 공유 복사본을 생성하며, 반드시 공유본 편집 화면을 거칩니다.</p></section><section class="card"><h3>공유 일기</h3><p>상대가 볼 수 있고 반응 가능하지만 답장은 없으며, 작성자만 수정/삭제/문장 다듬기가 가능합니다.</p></section></div></div>`);
}

function openPermissionTimingPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>권한 요청 타이밍</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>사진 권한</h3><p>온보딩에서 요청하며, 거부해도 사진 없이 기록할 수 있습니다.</p></section><section class="card"><h3>알림 권한</h3><p>커플 연결 완료 직후 요청합니다.</p></section><section class="card"><h3>MVP 제외</h3><p>카메라, 위치, 연락처 권한은 MVP에서 제외합니다.</p></section></div></div>`);
}

function openPinUsagePolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>PIN 사용 범위</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["이전 커플 보관함 접근", "관계 연결 해제", "이전 관계 전체 삭제", "회원 탈퇴", "관계 전환 시 확인, 사용자가 켠 경우"].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}</div></div>`);
}

function openShareConsentLifecycleModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>공유 동의 흐름</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["상대 콘텐츠가 포함된 콘텐츠 묶음 전체에 대해 한 번에 동의를 요청합니다.", "동의 유효 기간은 없지만 콘텐츠가 바뀌면 새 동의가 필요합니다.", "요청자는 요청을 취소할 수 있고, 동의 철회는 제공하지 않습니다.", "공유 동의 요청은 알림에서만 관리합니다.", "동의 완료 후 요청자에게 알림을 보내고, 다시 공유 버튼을 눌러 공유합니다.", "공유 완료 알림과 공유 이력은 저장하지 않습니다."].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}</div></div>`);
}

function openArchiveContentPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>보관함 포함 데이터</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>포함</h3><p>우리 기록, 사진, 공유 일기, 질문/메시지, 정제 메시지, 반응, 기념일, 연애 시작일, 연결 기간</p></section><section class="card"><h3>개인 데이터</h3><p>개인 데이터는 개인 표시로 구분합니다.</p></section><section class="card"><h3>제한</h3><p>조회 전용이며 수정, 외부 공유, 검색, 데이터 내보내기는 제공하지 않습니다. 사진 다운로드와 전체 삭제만 가능합니다.</p></section></div></div>`);
}

function openNotificationTypesPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>전체 알림 종류</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["상대가 새 우리 기록을 추가함", "상대가 기록에 반응함", "상대가 공유 일기를 작성함", "상대가 내 공유 일기에 반응함", "상대가 정리한 메시지를 보냄", "기념일 D-day", "오늘이 기념일", "연애 n일째 특별 알림", "커플 연결 완료", "상대가 초대를 수락함"].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}</div></div>`);
}

function openAccountProfilePolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>계정 프로필 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>계정 공통</h3><p>닉네임과 프로필 사진은 계정 공통으로 사용하며 관계별 표시 정보는 없습니다.</p></section><section class="card"><h3>수정 가능</h3><p>프로필 수정, 닉네임 변경, 프로필 사진 변경/삭제, 계정 정보 확인을 제공합니다.</p></section><section class="card"><h3>보안</h3><p>이메일 사용자는 비밀번호 변경을 제공하고, 모든 사용자는 앱 보안 PIN 변경과 재설정을 제공합니다.</p></section></div></div>`);
}

function openAuthorPermissionPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>작성자 권한 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>우리 기록</h3><p>기록 수정은 작성자만 가능하고, 기록 작성자만 사진 순서를 변경할 수 있습니다.</p></section><section class="card"><h3>감정</h3><p>내 감정은 나만 수정할 수 있고, 상대 감정은 상대만 수정할 수 있습니다.</p></section><section class="card"><h3>사진</h3><p>내가 올린 사진은 숨기기/삭제가 가능하고, 상대가 올린 사진은 숨기기만 가능합니다. 삭제는 양쪽에서 사라지고 숨김은 내 화면에만 적용됩니다.</p></section></div></div>`);
}

function openEmotionPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>감정 표시 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>선택 규칙</h3><p>기록과 일기에서 감정은 최대 3개까지 선택할 수 있고 선택 사항입니다.</p></section><section class="card"><h3>일기 표시</h3><p>목록에서는 감정 아이콘만 표시하고, 상세/작성 화면에서는 아이콘과 텍스트를 함께 표시합니다.</p></section><section class="card"><h3>디자인</h3><p>감정은 앱 전용 라인 아이콘과 감정군별 은은한 색상으로 구분합니다.</p></section><section class="card"><h3>질문 답변</h3><p>질문 답변 작성 시에는 감정 선택을 사용하지 않습니다.</p></section></div></div>`);
}

function openCalendarDisplayPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>캘린더 표시 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>표시 방식</h3><p>캘린더에는 기록 유형을 아이콘으로 표시합니다.</p></section><section class="card"><h3>하루 표시 한도</h3><p>하루에 여러 기록이 있으면 최대 2개 아이콘과 더보기 표시를 사용합니다.</p></section><section class="card"><h3>날짜 선택</h3><p>날짜를 선택하면 해당 날짜의 기록 목록을 보여줍니다.</p></section></div></div>`);
}

function openRecordDeletePolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>기록 수정/삭제 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>수정</h3><p>기록 수정은 작성자만 가능합니다. 사진 추가, 감정 수정, 기록 수정에는 알림을 보내지 않습니다.</p></section><section class="card"><h3>삭제</h3><p>기록 삭제는 작성자만 가능하고 알림은 보내지 않습니다.</p></section><section class="card"><h3>연결된 일기</h3><p>기록을 삭제해도 연결된 일기는 유지하며, 기록 연결만 해제합니다.</p></section></div></div>`);
}

function openDiaryReactionPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>일기 반응 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>공유 일기 반응</h3><p>공유 일기는 상대가 반응할 수 있고 답장은 제공하지 않습니다.</p></section><section class="card"><h3>작성자 제한</h3><p>작성자는 자신의 공유 일기에 반응할 수 없습니다.</p></section><section class="card"><h3>반응 세트</h3><p>고마워, 나도 그래, 안아주고 싶어, 생각해볼게, 미안해</p></section><section class="card"><h3>알림</h3><p>반응 추가 시 알림을 보내고, 변경/취소 시에는 알림을 보내지 않습니다.</p></section></div></div>`);
}

function openInviteCodePolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>초대 코드 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>연결 방식</h3><p>초대 링크 공유와 초대 코드 입력을 제공합니다.</p></section><section class="card"><h3>만료</h3><p>초대 코드는 7일 뒤 만료됩니다.</p></section><section class="card"><h3>QR 코드</h3><p>QR 코드는 2차 기능으로 분리합니다.</p></section><section class="card"><h3>코드 입력 후</h3><p>상대 프로필 미리보기, 내 닉네임, 프로필 사진 선택, 연결하기, 즉시 연결, 연애 시작일 필수 입력 순서로 진행합니다.</p></section></div></div>`);
}

function openPrivateDiaryShareFlowModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>개인 일기 공유 흐름</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>원본 보호</h3><p>개인 일기를 상대에게 공유할 때 원본을 직접 공개 전환하지 않습니다.</p></section><section class="card"><h3>복사본 생성</h3><p>공유 복사본을 생성하고 반드시 공유본 편집 화면을 거칩니다.</p></section><section class="card"><h3>원본 상태</h3><p>원본 개인 일기는 계속 나만 보기로 유지됩니다.</p></section></div></div>`);
}

function openDraftSourcePolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>초안 출처 저장 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>저장</h3><p>AI 결과는 초안으로 저장할 수 있고 여러 개 저장할 수 있습니다.</p></section><section class="card"><h3>출처</h3><p>초안은 질문 답변, 개인 일기, 공유 일기, 기록 상세 등 출처 상세 하단에 저장됩니다.</p></section><section class="card"><h3>전송</h3><p>전송 시 초안은 삭제되고 보낸 메시지가 새로 생성됩니다.</p></section><section class="card"><h3>공유</h3><p>초안 자체의 외부 공유는 제공하지 않습니다.</p></section></div></div>`);
}

function openNotificationFilterPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>알림 필터 정책</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["전체", "기록", "다이어리", "메시지", "기념일", "시스템"].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}<section class="card"><h3>묶음</h3><p>질문 알림은 여러 개 가능하며 알림 묶음은 제공하지 않습니다.</p></section></div></div>`);
}

function openCustomAnniversaryPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>직접 기념일 항목</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["이름", "날짜", "매년 반복 켬/끔", "알림 켬/끔", "메모"].map((item) => `<section class="card"><p>${item}</p></section>`).join("")}<section class="card"><h3>알림 시점</h3><p>D-7과 D-day 알림을 제공합니다.</p></section></div></div>`);
}

function openAnotherQuestionModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>다른 질문 보기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["요즘 가장 자주 떠오르는 감정은 뭐야?", "우리의 작은 습관 중 좋아하는 건?", "최근에 고마웠던 순간은?", "앞으로 함께 기대하는 일은?"].map((item) => `<section class="card"><p>${item}</p><button class="ghost-btn full" data-action="answer-question">이 질문에 답하기</button></section>`).join("")}<p class="tiny-note">질문은 여러 개 받을 수 있고 알림 묶음은 제공하지 않아요.</p></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openSendToPartnerModal() {
  if (!state.connected) {
    openModal(`<div class="modal-sheet"><div class="between"><h3>연결 필요</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>상대에게 보내기는 커플 연결 후 사용할 수 있어요.</p><button class="primary-btn" data-action="connect">상대와 연결하기</button></div></div>`);
    bindActions(qs(".modal-sheet"));
    return;
  }
  openModal(`<div class="modal-sheet"><div class="between"><h3>상대에게 보내기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>최종 메시지만 상대에게 전달됩니다. AI 사용 여부와 원문은 상대에게 표시되지 않아요.</p><button class="ghost-btn" data-action="ai-message">AI로 다듬어서 보내기</button><button class="primary-btn" data-action="send-original">원문으로 보내기</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openConfirmModal(title, body, confirmText, afterConfirm) {
  openModal(`<div class="modal-sheet"><div class="between"><h3>${title}</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>${body}</p><div class="row"><button class="ghost-btn" data-close>취소</button><button class="primary-btn" data-confirm-action>${confirmText}</button></div></div></div>`);
  qs("[data-confirm-action]").addEventListener("click", () => {
    closeModal();
    if (afterConfirm) afterConfirm();
  });
}

function openPhotoOrderManagerModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>사진 선택/순서</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>한 기록에 최대 30장까지 담고, 선택 순서와 표시 순서를 따로 관리합니다.</p><div class="photo-grid">${[1, 2, 3, 4].map((item) => `<button class="photo-thumb"><span>${item}</span></button>`).join("")}</div><div class="row"><button class="ghost-btn">사진 추가</button><button class="ghost-btn">사진 없이 기록</button></div><section class="card"><h3>업로드 처리</h3><p>원본은 보관하고 앱 표시용 썸네일을 생성합니다. 일부 사진이 실패하면 실패한 사진만 제외하고 저장할 수 있어요.</p></section></div></div>`);
}

function openPhotoUploadPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>사진 선택/업로드</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>선택</h3><p>다중 선택, 선택 순서 표시, 사진 순서 변경, 사진 삭제와 추가를 지원합니다.</p></section><section class="card"><h3>권한 거부</h3><p>사진 권한을 거부해도 사진 없이 기록을 남길 수 있습니다.</p></section><section class="card"><h3>화질</h3><p>원본은 보관하고 앱 표시용 썸네일을 생성합니다.</p></section><button class="primary-btn" data-action="photo-order-manager">사진 순서 관리 보기</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openPhotoDetail() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>사진 상세</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="photo-stack" style="height:240px"></div><button class="primary-btn">다운로드</button><button class="ghost-btn" data-action="share-consent">외부 공유 요청</button><button class="ghost-btn" data-action="hide-photo-confirm">내 화면에서 숨기기</button><button class="ghost-btn" data-action="delete-photo-confirm">사진 삭제</button><p class="tiny-note">상대가 올린 사진도 다운로드할 수 있지만, 상대 콘텐츠를 외부 공유할 때는 동의가 필요합니다.</p></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openMessageDetail() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>메시지 상세</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>받은 메시지</h3><p>최종 메시지만 표시하고, AI 사용 여부는 보여주지 않아요.</p></section><section class="card"><h3>보낸 메시지</h3><p>원문, 실제 보낸 메시지, 전송 방식, 전달됨/읽음, 상대 반응을 표시합니다. 읽은 시간과 읽음 알림은 제공하지 않아요.</p></section><div class="chip-row">${["고마워", "알겠어", "나도 그래", "생각해볼게", "미안해"].map((item) => `<button class="chip-btn">${item}</button>`).join("")}</div><button class="ghost-btn" data-action="hide-message-confirm">내 화면에서 숨김</button><button class="primary-btn" data-action="delete-message-confirm">양쪽에서 삭제</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openShareConsentModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>공유 동의</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>상대 콘텐츠가 포함된 묶음 전체에 대해 한 번에 동의를 요청합니다.</p><section class="card"><h3>정책</h3><p>동의 유효 기간은 없고, 콘텐츠가 바뀌면 새 동의가 필요합니다. 공유 이력은 저장하지 않아요.</p></section><button class="ghost-btn" data-action="share-consent-requested">알림으로 동의 요청</button><button class="ghost-btn" data-close>요청 취소</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openShareConsentRequestedModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>동의 요청 알림</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>상대 화면</h3><p>공유 동의 요청은 알림에서만 관리됩니다. 요청한 콘텐츠 묶음을 확인한 뒤 동의할 수 있어요.</p></section><button class="primary-btn" data-action="share-consent-complete">상대가 동의함</button><button class="ghost-btn" data-close>요청 취소</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openShareConsentCompleteModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>동의 완료</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>요청자에게 동의 완료 알림이 도착했습니다. 실제 공유는 다시 공유 버튼을 눌러 진행합니다.</p><button class="primary-btn">다시 공유</button><p class="tiny-note">공유 완료 알림과 공유 이력 저장은 제공하지 않습니다.</p></div></div>`);
}

function openHiddenPhotosModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>숨긴 사진 관리</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>숨김은 내 화면에서만 적용되고 상대에게 알림이 가지 않아요.</p>${state.hiddenPhotos.map((photo) => `<section class="card"><div class="between"><strong>${photo}</strong><button class="chip-btn" data-action="restore-photo-confirm">복구</button></div></section>`).join("")}<p class="tiny-note">복구 시 확인을 거치고, 다중 선택은 2차 기능입니다.</p></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openDraftListModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>저장된 초안</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["질문 답변에서 만든 초안", "개인 일기에서 만든 초안", "기록 상세에서 만든 초안"].map((item) => `<section class="card"><div class="between"><strong>${item}</strong><span class="meta">출처 저장</span></div><p>전송하면 초안은 삭제되고 보낸 메시지가 새로 생성됩니다.</p><div class="row"><button class="ghost-btn" data-action="delete-draft-confirm">삭제</button><button class="ghost-btn">편집</button></div></section>`).join("")}<button class="primary-btn">선택한 초안 보내기</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function makeToggleButtons(root, selector = ".chip-row .chip-btn", max = 3) {
  const buttons = root.matches?.(".chip-row") ? qsa(".chip-btn", root) : qsa(selector, root);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".chip-row") || button.parentElement;
      const active = qsa(".chip-btn.active", group);
      if (!button.classList.contains("active") && active.length >= max) {
        showToast(`최대 ${max}개까지 선택할 수 있어요.`);
        return;
      }
      button.classList.toggle("active");
    });
  });
}

function openMemoryModal() {
  openModal(`
    <div class="modal-sheet"><div class="between"><h3>우리 기록 남기기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">
      <section class="card"><h3>사진 선택</h3><p>한 기록당 최대 30장까지 가능하며 선택 순서 표시와 순서 변경을 지원합니다.</p><div class="row" style="margin-top:12px"><button class="ghost-btn" data-action="photo-order-manager">다중 선택</button><button class="ghost-btn" data-action="add-photo">사진 없이 기록</button></div></section>
      <div class="form-field"><label>제목</label><input id="memoryTitle" placeholder="비어 있으면 자동 생성" /></div>
      <div class="form-field"><label>날짜</label><input value="2026-04-29" /></div>
      <div class="form-field"><label>장소</label><input placeholder="직접 입력" /></div>
      <div class="form-field"><label>기록 유형</label><select><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
      <div class="chip-row" data-memory-feelings>${["기쁨", "편안함", "고마움", "설렘", "솔직함"].map((item) => `<button class="chip-btn">${item}</button>`).join("")}</div>
      <div class="form-field"><label>한 줄 메모</label><textarea placeholder="글자 수 제한 없음"></textarea></div>
      <div class="chip-row" data-scope><button class="chip-btn ${state.connected ? "active" : "is-disabled"}" ${state.connected ? "" : "disabled"}>우리 둘이 보기</button><button class="chip-btn ${state.connected ? "" : "active"}">나만 보기</button></div>
      ${state.connected ? "" : '<p class="tiny-note">혼자 상태에서는 나만 보기만 가능해요.</p>'}
      <button class="primary-btn full" data-save-memory>저장</button>
    </div></div>
  `);
  makeToggleButtons(qs("[data-memory-feelings]"));
  qsa("[data-scope] .chip-btn:not([disabled])").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-save-memory]").addEventListener("click", () => {
    state.memories.unshift({ title: qs("#memoryTitle").value.trim() || "2026년 4월의 일상", date: "2026.04.29", place: "직접 입력한 장소", type: "일상", note: "새 기록에서 작성한 한 줄 메모", scope: state.connected ? "우리 둘이 보기" : "나만 보기", feelings: ["기쁨"], reaction: "", author: "나" });
    closeModal();
    renderApp();
    openMemorySavedModal();
  });
  bindActions(qs(".modal-sheet"));
}

function openDiaryModal() {
  openModal(`
    <div class="modal-sheet"><div class="between"><h3>일기 쓰기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">
      <div class="chip-row" data-diary-scope><button class="chip-btn active">나만 보기</button><button class="chip-btn ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div>
      <div class="form-field"><label>제목</label><input id="diaryTitle" placeholder="선택 사항" /></div>
      <div class="form-field"><label>본문</label><textarea id="diaryBody" placeholder="오늘의 마음을 적어보세요."></textarea></div>
      <div class="chip-row" data-diary-feelings>${["고마움", "안정", "서운함", "그리움", "기대"].map((item) => `<button class="chip-btn">${item}</button>`).join("")}</div>
      <section class="card"><h3>관련 기록 연결</h3><p>공유 일기에는 공유 기록만 연결할 수 있어요.</p><button class="ghost-btn full" data-action="memory-detail" data-index="0">기록 선택</button></section>
      <button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button><button class="ghost-btn full" data-action="shared-diary-confirm">공유 일기 저장 확인</button><button class="primary-btn full" data-save-diary>임시 저장</button>
    </div></div>
  `);
  makeToggleButtons(qs("[data-diary-feelings]"));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-save-diary]").addEventListener("click", () => {
    state.diaries.unshift({ title: qs("#diaryTitle").value.trim() || "제목 없는 일기", body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문", scope: "개인", feelings: ["고마움"], linked: "관련 기록 없음", author: "나" });
    closeModal();
    renderDiary();
    showToast("일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openMemoryDetail(index) {
  const memory = state.memories[index] || state.memories[0];
  openModal(`
    <div class="modal-sheet"><div class="between"><h3>${memory.title}</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">
      <div class="photo-stack" style="height:170px"></div><p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p><p>${memory.note}</p>
      <section class="card"><h3>내 감정 / 상대 감정</h3><p>내 감정은 나만, 상대 감정은 상대만 수정할 수 있어요.</p><div class="tag-row" style="margin-top:8px">${memory.feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div></section>
      <section class="card"><h3>반응</h3><div class="chip-row" data-reaction>${["좋았어", "또 가자", "웃겼어", "고마워", "소중해"].map((item) => `<button class="chip-btn ${item === memory.reaction ? "active" : ""}">${item}</button>`).join("")}</div><p class="tiny-note">자기 콘텐츠에는 반응할 수 없고, 추가 시에만 알림을 보냅니다.</p></section>
      <section class="card"><h3>사진 정책</h3><p>내가 올린 사진은 숨기기/삭제 가능, 상대가 올린 사진은 숨기기만 가능해요.</p><button class="ghost-btn full" data-action="share-card">기록 카드 공유 미리보기</button></section>
      <button class="ghost-btn" data-action="new-diary">연결된 일기 추가</button><button class="ghost-btn" data-action="ai-message">전할 말 정리하기</button><button class="ghost-btn" data-action="add-photo">사진 추가</button><button class="primary-btn" data-action="edit-memory">기록 수정</button>
    </div></div>
  `);
  qsa("[data-reaction] .chip-btn").forEach((button) => button.addEventListener("click", () => {
    const wasActive = button.classList.contains("active");
    qsa("[data-reaction] .chip-btn").forEach((item) => item.classList.remove("active"));
    if (!wasActive) {
      button.classList.add("active");
      showToast("반응을 남겼어요. 변경/취소 알림은 보내지 않습니다.");
    } else {
      showToast("반응을 취소했어요.");
    }
  }));
  bindActions(qs(".modal-sheet"));
}

function openDiaryDetail() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>일기 상세</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>개인 일기는 상대에게 존재 자체가 보이지 않고, 공유할 때는 복사본 편집 화면을 거칩니다.</p><button class="ghost-btn" data-action="edit-diary">수정</button><button class="ghost-btn" data-action="share-diary-copy">상대에게 공유 복사본 만들기</button><button class="ghost-btn" data-action="ai-message">전할 말로 정리하기</button><button class="ghost-btn" data-action="share-consent">외부 공유</button><button class="primary-btn" data-action="delete-diary-confirm">삭제</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openDiaryCopyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>공유본 편집</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>원본 개인 일기는 계속 나만 보기로 유지되고, 공유 복사본만 상대에게 보냅니다.</p><div class="form-field"><label>공유본 본문</label><textarea>상대에게 보여줄 내용만 남겨 편집합니다.</textarea></div><button class="primary-btn" data-action="shared-diary-confirm">공유 일기로 저장</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openQuestionModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>답변 작성</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p class="meta">답변 작성 시 감정 선택은 사용하지 않아요.</p><div class="form-field"><label>답변</label><textarea placeholder="솔직하게 적어보세요."></textarea></div><button class="ghost-btn" data-action="save-private-answer">비공개 저장</button><button class="ghost-btn" data-action="ai-message">AI로 다듬어서 보내기</button><button class="primary-btn" data-action="send-original">원문으로 보내기</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openAiModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>전할 말 정리하기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="chip-row" data-tone>${["부드럽게", "다정하게", "솔직하게", "짧게", "진지하게"].map((tone, index) => `<button class="chip-btn ${index === 0 ? "active" : ""}">${tone}</button>`).join("")}</div><div class="form-field"><label>원문</label><textarea>요즘 내가 조금 서운했던 마음을 차분히 전하고 싶어.</textarea></div><section class="card"><h3>AI 결과</h3><p>요즘 조금 서운했던 마음이 있었어. 탓하고 싶은 건 아니고, 우리 둘 다 편하게 이야기해보고 싶어서 조심스럽게 꺼내봐.</p></section><button class="ghost-btn" data-action="ai-redraft">다시 다듬기</button><button class="ghost-btn" data-action="ai-original">원문으로 돌아가기</button><button class="ghost-btn" data-action="save-draft">초안 저장</button><button class="primary-btn" data-action="send-ai-result">상대에게 보내기</button></div></div>`);
  qsa("[data-tone] .chip-btn").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-tone] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  bindActions(qs(".modal-sheet"));
}

function openConnectModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>상대와 연결하기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><button class="primary-btn" data-action="invite-link">초대 링크 공유</button><div class="form-field"><label>초대 코드</label><input placeholder="7일 안에 받은 코드 입력" /></div><section class="card"><h3>상대 프로필 미리보기</h3><p>코드 입력 후 상대 프로필을 확인하고 즉시 연결합니다. QR 코드는 2차 기능입니다.</p></section><div class="form-field"><label>내 닉네임</label><input value="하린" /></div><div class="form-field"><label>연애 시작일</label><input value="2025-03-05" /></div><button class="primary-btn full" data-connect-now>연결하기</button></div></div>`);
  qs("[data-connect-now]").addEventListener("click", () => {
    state.connected = true;
    closeModal();
    setTab("home");
    showToast("커플 연결이 완료됐어요. 알림 권한 요청 차례입니다.");
  });
  bindActions(qs(".modal-sheet"));
}

function currentRelationInfo() {
  if (!state.currentRelation) state.currentRelation = { name: "봄이 & 하린", date: "2025.03.05", status: "연결됨", myName: "하린" };
  return state.currentRelation;
}

function duariRelationDays(dateText = "") {
  const normalized = String(dateText || "").replaceAll(".", "-");
  const start = new Date(`${normalized}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 421;
  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.max(1, Math.floor((todayMidnight - start) / 86400000) + 1);
}

function saveCurrentRelationToAccount() {
  const account = typeof getSignupAccount === "function" ? getSignupAccount(state.currentLoginEmail) : null;
  if (!account) return;
  account.currentRelation = { ...currentRelationInfo() };
  account.connected = !!state.connected;
  try {
    localStorage.setItem("duariLastCurrentRelation", JSON.stringify(account.currentRelation));
  } catch {
    // Prototype fallback: keep the relation in memory when browser storage is unavailable.
  }
  if (typeof saveRegisteredAccounts === "function") saveRegisteredAccounts();
}

function applyCurrentAccountRelation() {
  const account = typeof getSignupAccount === "function" ? getSignupAccount(state.currentLoginEmail) : null;
  if (!account) return;
  if (account.currentRelation) state.currentRelation = { ...account.currentRelation };
  else {
    try {
      const savedRelation = JSON.parse(localStorage.getItem("duariLastCurrentRelation") || "null");
      if (savedRelation?.name && savedRelation?.date) {
        state.currentRelation = { ...savedRelation };
        account.currentRelation = { ...savedRelation };
        saveRegisteredAccounts();
      }
    } catch {
      // Ignore malformed prototype storage.
    }
  }
  if (typeof account.connected === "boolean") state.connected = account.connected;
}

function relationMyName(relation = currentRelationInfo()) {
  return relation.myName || "하린";
}

function relationPartnerName(relation = currentRelationInfo()) {
  const parts = String(relation.name || "").split("&").map((item) => item.trim()).filter(Boolean);
  const myName = relationMyName(relation);
  return parts.find((item) => item !== myName) || parts[0] || "봄이";
}

function relationSwitchOptions() {
  if (!state.relationOptions) {
    state.relationOptions = [
      { name: "지우 & 하린", date: "2024.08.12", status: "연결됨", myName: "하린" },
      { name: "민서 & 하린", date: "2023.11.20", status: "연결 해제됨", myName: "하린" },
    ];
  }
  return state.relationOptions;
}

function switchRelation(option) {
  const previous = currentRelationInfo();
  const completeSwitch = () => {
    state.currentRelation = { ...option };
    state.relationOptions = relationSwitchOptions().filter((item) => item.name !== option.name);
    state.relationOptions.unshift(previous);
    saveCurrentRelationToAccount();
    closeModal();
    setTab("home");
    renderHome();
    showToast(`${option.name} 관계로 전환했어요.`);
  };
  if (state.switchPinEnabled) openPinGate("관계 전환", completeSwitch);
  else completeSwitch();
}

function openRelationDeleteConfirm(option) {
  const modal = qs("#modal");
  qs(".support-submit-overlay", modal)?.remove();
  modal.insertAdjacentHTML("beforeend", `
    <div class="support-submit-overlay" role="dialog" aria-modal="true">
      <div class="support-submit-sheet">
        <h3>${option.name} 관계를 삭제할까요?</h3>
        <p>관계 계정 제목을 입력하면 삭제할 수 있어요. 기록된 모든 기록, 일기, 사진 등이 영구적으로 사라집니다.</p>
        <div class="form-field">
          <label>관계 계정 제목</label>
          <input data-relation-delete-title placeholder="${option.name}" />
        </div>
        <div class="support-submit-actions">
          <button class="ghost-btn" type="button" data-relation-delete-cancel>취소</button>
          <button class="primary-btn" type="button" data-relation-delete-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-relation-delete-cancel]", modal)?.addEventListener("click", () => qs(".support-submit-overlay", modal)?.remove());
  qs("[data-relation-delete-confirm]", modal)?.addEventListener("click", () => {
    const typedTitle = qs("[data-relation-delete-title]", modal)?.value.trim();
    if (typedTitle !== option.name) {
      showToast("관계 계정 제목을 정확히 입력해 주세요.");
      return;
    }
    state.relationOptions = relationSwitchOptions().filter((item) => item.name !== option.name);
    qs(".support-submit-overlay", modal)?.remove();
    openRelationManagementModal();
    showToast("관계를 삭제했어요.");
  });
}

function relationAddDraftDefaults(draft = {}) {
  return {
    method: draft.method || "link",
    code: draft.code || "DUARI-0520",
    partnerName: draft.partnerName || "봄이",
    myName: draft.myName || state.accountNickname || "하린",
    startDate: draft.startDate || "2026-05-02",
    fromOnboarding: !!draft.fromOnboarding,
  };
}

function relationAddPageShell(step, bodyHtml) {
  const progressItems = ["초대 코드", "닉네임", "시작일", "완료"];
  return `
    <div class="modal-sheet notification-page relation-add-page">
      <header class="notification-header">
        <button class="notification-nav-btn" type="button" data-relation-add-back aria-label="뒤로가기">←</button>
        <h3>관계 추가</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="relation-add-progress" aria-label="관계 추가 단계">
        ${progressItems.map((item, index) => `<span class="${index + 1 <= step ? "active" : ""}">${item}</span>`).join("")}
      </div>
      <div class="section-stack">${bodyHtml}</div>
    </div>
  `;
}

function collectRelationAddDraft(sheet, draft = {}) {
  const selectedMethod = qs("[data-relation-method].active", sheet)?.dataset.relationMethod || draft.method;
  return relationAddDraftDefaults({
    ...draft,
    method: selectedMethod,
    code: qs("[data-relation-add-code]", sheet)?.value.trim() || draft.code,
    partnerName: qs("[data-relation-add-partner]", sheet)?.value.trim() || draft.partnerName,
    myName: qs("[data-relation-add-my-name]", sheet)?.value.trim() || draft.myName,
    startDate: qs("[data-relation-add-start]", sheet)?.value || draft.startDate,
    fromOnboarding: !!draft.fromOnboarding,
  });
}

function openRelationAddPage(step = 1, draft = {}) {
  const data = relationAddDraftDefaults(draft);
  const stepBodies = {
    1: `
      <section class="card relation-add-card">
        <h3>연결 방식을 선택해 주세요</h3>
        <p>초대 링크를 보내거나, 상대에게 받은 초대 코드를 입력해서 새 관계를 추가할 수 있어요.</p>
        <div class="relation-method-grid">
          <button class="card inner-card relation-method-card ${data.method === "link" ? "active" : ""}" type="button" data-relation-method="link">
            <strong>초대 링크 공유</strong>
            <span class="meta">7일 동안 유효한 링크를 만들어요.</span>
          </button>
          <button class="card inner-card relation-method-card ${data.method === "code" ? "active" : ""}" type="button" data-relation-method="code">
            <strong>초대 코드 입력</strong>
            <span class="meta">상대가 보낸 코드를 입력해요.</span>
          </button>
        </div>
      </section>
      <div class="form-field">
        <label>초대 코드</label>
        <input data-relation-add-code value="${data.code}" placeholder="예: DUARI-0520" />
      </div>
      <div class="button-row two">
        <button class="ghost-btn" type="button" data-relation-link-copy>초대 링크 공유</button>
        <button class="primary-btn" type="button" data-relation-add-next>다음</button>
      </div>
    `,
    2: `
      <section class="card relation-add-card">
        <h3>상대 프로필 확인</h3>
        <div class="relation-preview-profile">
          <span class="avatar-mini" aria-hidden="true">♡</span>
          <div>
            <strong>봄이</strong>
            <p class="meta">초대 코드가 확인된 상대입니다.</p>
          </div>
        </div>
      </section>
      <div class="form-field">
        <div class="field-label-row">
          <label>내 닉네임</label>
          <span class="meta">완료 후 변경 불가</span>
        </div>
        <input data-relation-add-my-name value="${data.myName}" placeholder="내 닉네임" />
      </div>
      <div class="button-row two">
        <button class="ghost-btn" type="button" data-relation-add-prev>이전</button>
        <button class="primary-btn" type="button" data-relation-add-next>다음</button>
      </div>
    `,
    3: `
      <section class="card relation-add-card">
        <h3>우리 시작일을 입력해 주세요</h3>
        <p>홈의 함께한 날 수와 자동 기념일 계산에 사용돼요.</p>
      </section>
      <div class="form-field">
        <label>우리 시작일</label>
        <input type="date" data-relation-add-start value="${data.startDate}" />
      </div>
      <div class="button-row two">
        <button class="ghost-btn" type="button" data-relation-add-prev>이전</button>
        <button class="primary-btn" type="button" data-relation-add-complete>연결하기</button>
      </div>
    `,
    4: `
      <section class="card relation-add-complete-card">
        <h3>새 관계가 추가됐어요</h3>
        <p>${data.myName} & ${data.partnerName} 관계가 현재 사용 중으로 전환됐어요.</p>
      </section>
      <div class="button-row two">
        <button class="ghost-btn" type="button" data-relation-add-manage>관계 관리</button>
        <button class="primary-btn" type="button" data-relation-add-home>홈으로 이동</button>
      </div>
    `,
  };
  openModal(relationAddPageShell(step, stepBodies[step] || stepBodies[1]));
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".relation-add-page");
  const backTarget = () => {
    if (step <= 1) {
      if (data.fromOnboarding) openStartMethodPage();
      else openRelationManagementModal();
    }
    else if (step >= 4) {
      if (data.fromOnboarding) openStartMethodPage();
      else openRelationManagementModal();
    }
    else openRelationAddPage(step - 1, collectRelationAddDraft(sheet, data));
  };
  qs("[data-relation-add-back]", sheet)?.addEventListener("click", backTarget);
  qsa("[data-relation-method]", sheet).forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-relation-method]", sheet).forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-relation-link-copy]", sheet)?.addEventListener("click", () => showToast("초대 링크를 만들었어요. 코드는 7일 뒤 만료됩니다."));
  qs("[data-relation-add-prev]", sheet)?.addEventListener("click", backTarget);
  qs("[data-relation-add-next]", sheet)?.addEventListener("click", () => openRelationAddPage(step + 1, collectRelationAddDraft(sheet, data)));
  qs("[data-relation-add-complete]", sheet)?.addEventListener("click", () => {
    const nextData = collectRelationAddDraft(sheet, data);
    const previous = currentRelationInfo();
    state.relationOptions = relationSwitchOptions().filter((item) => item.name !== previous.name);
    state.relationOptions.unshift(previous);
    state.currentRelation = {
      name: `${nextData.myName} & ${nextData.partnerName}`,
      date: nextData.startDate.replaceAll("-", "."),
      status: "연결됨",
      myName: nextData.myName,
    };
    state.connected = true;
    markCurrentAccountSetupComplete();
    saveCurrentRelationToAccount();
    openRelationAddPage(4, nextData);
  });
  qs("[data-relation-add-home]", sheet)?.addEventListener("click", () => {
    markCurrentAccountSetupComplete();
    closeModal();
    qs("#onboarding")?.classList.add("is-hidden");
    qs("#app")?.classList.remove("is-hidden");
    setTab("home");
    renderHome();
    showToast("새 관계 홈으로 이동했어요.");
  });
  qs("[data-relation-add-manage]", sheet)?.addEventListener("click", openRelationManagementModal);
}

function openRelationManagementModal() {
  const current = currentRelationInfo();
  const options = relationSwitchOptions();
  openModal(`
    <div class="modal-sheet notification-page relation-management-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>관계 관리</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <div class="between">
            <div>
              <h3>${current.name}</h3>
              <p class="meta">${current.date}부터 · ${current.status}</p>
            </div>
            <span class="chip-btn active relation-current-badge">현재 사용 중</span>
          </div>
        </section>
        <section class="card relation-switch-card">
          <h3>관계 전환</h3>
          <div class="list">
            ${options.map((option, index) => `
            <article class="card inner-card relation-option-card">
              <div class="between">
                <div>
                  <strong>${option.name}</strong>
                  <p class="meta">${option.date}부터 · ${option.status}</p>
                </div>
                <div class="anniversary-menu-wrap">
                  <button class="icon-btn anniversary-kebab relation-kebab" type="button" data-relation-menu aria-label="더보기" title="더보기">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </button>
                  <div class="anniversary-dropdown relation-dropdown" data-relation-dropdown hidden>
                    <button type="button" data-relation-switch="${index}">전환</button>
                    <button type="button" data-relation-delete="${index}">삭제</button>
                  </div>
                </div>
              </div>
            </article>
            `).join("")}
          </div>
          <button class="primary-btn full" type="button" data-action="relation-add">관계 추가</button>
        </section>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  bindActions(sheet);
  sheet.addEventListener("click", (event) => {
    const menuButton = event.target.closest("[data-relation-menu]");
    if (menuButton) {
      const menu = menuButton.closest(".anniversary-menu-wrap")?.querySelector("[data-relation-dropdown]");
      const willOpen = menu?.hidden;
      qsa("[data-relation-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-relation-menu]", sheet).forEach((item) => item.classList.remove("active"));
      if (menu && willOpen) {
        menu.hidden = false;
        menuButton.classList.add("active");
      }
      return;
    }
    const switchButton = event.target.closest("[data-relation-switch]");
    if (switchButton) {
      const option = relationSwitchOptions()[Number(switchButton.dataset.relationSwitch)];
      if (option) switchRelation(option);
      return;
    }
    const deleteButton = event.target.closest("[data-relation-delete]");
    if (deleteButton) {
      qsa("[data-relation-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-relation-menu]", sheet).forEach((item) => item.classList.remove("active"));
      const option = relationSwitchOptions()[Number(deleteButton.dataset.relationDelete)];
      if (option) openRelationDeleteConfirm(option);
      return;
    }
    if (!event.target.closest(".anniversary-menu-wrap")) {
      qsa("[data-relation-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-relation-menu]", sheet).forEach((item) => item.classList.remove("active"));
    }
  });
}

function openAnniversariesModal() {
  openAnniversarySettingsPage();
}

function openSecurityModal() {
  openPinResetPage();
}

function openAccountModal() {
  const current = currentRelationInfo();
  const myName = relationMyName(current);
  const partnerName = relationPartnerName(current);
  openModal(`
    <div class="modal-sheet notification-page my-info-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>내 정보</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card my-info-readonly-card">
          <h3>계정 정보</h3>
          <div class="my-info-row"><span>닉네임</span><strong>${myName}</strong></div>
          <div class="my-info-row"><span>생년월일</span><strong>1998.08.14</strong></div>
          <div class="my-info-row"><span>로그인 방식</span><strong>이메일</strong></div>
          <div class="my-info-row"><span>이메일</span><strong>harin@duari.app</strong></div>
          <div class="my-info-row"><span>가입일</span><strong>2026.05.02</strong></div>
          <button class="ghost-btn full" type="button" data-action="password-change">비밀번호 변경</button>
        </section>
        <section class="card my-info-readonly-card">
          <h3>관계 정보</h3>
          <div class="my-info-row"><span>우리의 시작일</span><strong>${current.date}</strong></div>
          <div class="my-info-row"><span>연결된 상대</span><strong>${partnerName}</strong></div>
          <div class="my-info-row"><span>상대 생년월일</span><strong>1997.11.03</strong></div>
          <div class="my-info-row"><span>상태</span><strong>${current.status}</strong></div>
        </section>
        <div class="account-danger-actions">
          <button class="ghost-btn full" type="button" data-action="logout">로그아웃</button>
          <button class="ghost-btn danger-outline full" type="button" data-action="danger-withdraw">회원 탈퇴</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindActions(qs(".modal-sheet"));
}

function logoutToLogin() {
  duariSavePersistentContent();
  duariForgetCurrentLogin();
  closeModal();
  state.slide = 0;
  state.currentLoginEmail = "";
  qs("#app")?.classList.add("is-hidden");
  qs("#onboarding")?.classList.remove("is-hidden");
  qs("#onboarding")?.classList.add("is-visible");
  renderOnboarding();
  showToast("로그아웃했어요.");
}

function deleteCurrentLoginAccount() {
  const currentKey = normalizeSignupEmail(state.currentLoginEmail || "");
  if (!currentKey) return;
  duariForgetCurrentLogin();
  duariDeletePersistentContentForCurrentUser();
  state.registeredAccounts = Array.isArray(state.registeredAccounts)
    ? state.registeredAccounts.filter((account) => account.email !== currentKey)
    : [];
  state.registeredEmails = Array.isArray(state.registeredEmails)
    ? state.registeredEmails.filter((email) => normalizeSignupEmail(email) !== currentKey)
    : [];
  saveRegisteredAccounts();
  try {
    const savedRelation = JSON.parse(localStorage.getItem("duariLastCurrentRelation") || "null");
    const currentRelation = currentRelationInfo();
    if (savedRelation?.name === currentRelation.name && savedRelation?.date === currentRelation.date) {
      localStorage.removeItem("duariLastCurrentRelation");
    }
  } catch {
    localStorage.removeItem("duariLastCurrentRelation");
  }
  state.currentLoginEmail = "";
  state.signupDraft = null;
  state.emailSignupCompleted = false;
}

function openPasswordChangePage() {
  openModal(`
    <div class="modal-sheet notification-page password-change-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-password-back aria-label="뒤로가기">←</button>
        <h3>비밀번호 변경</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card password-change-card">
          <div class="form-field">
            <label for="currentPassword">현재 비밀번호</label>
            <input id="currentPassword" type="password" autocomplete="current-password" />
          </div>
          <div class="form-field">
            <label for="newPassword">새 비밀번호</label>
            <input id="newPassword" type="password" autocomplete="new-password" />
          </div>
          <div class="form-field">
            <label for="confirmPassword">새 비밀번호 확인</label>
            <input id="confirmPassword" type="password" autocomplete="new-password" />
          </div>
        </section>
        <section class="card password-rule-card">
          <h3>비밀번호 조건</h3>
          <ul class="password-rule-list">
            <li>8자 이상</li>
            <li>영문과 숫자 포함</li>
            <li>현재 비밀번호와 다르게 설정</li>
          </ul>
        </section>
        <div class="inline-action-pair">
          <button class="ghost-btn" type="button" data-password-back>취소</button>
          <button class="primary-btn" type="button" data-password-save>변경하기</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qsa("[data-password-back]").forEach((button) => button.addEventListener("click", openAccountModal));
  qs("[data-password-save]")?.addEventListener("click", () => {
    showToast("비밀번호 변경 확인 흐름을 완료했어요.");
    openAccountModal();
  });
}

function openArchiveModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>이전 커플 보관함</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>조회 전용이며 현재 관계와 완전히 분리됩니다. 검색, 외부 공유, 데이터 내보내기는 제공하지 않습니다.</p>${["우리 기록", "사진", "공유 일기", "질문/메시지", "정제 메시지", "반응", "기념일"].map((item) => `<section class="card"><div class="between"><strong>${item}</strong><span class="meta">조회 전용</span></div></section>`).join("")}<button class="ghost-btn" data-action="download-photo">사진 다운로드</button><button class="primary-btn" data-action="danger-delete-archive">이전 관계 전체 삭제</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openSharedDiaryConfirmModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>공유 일기 저장</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>공유 일기는 상대가 볼 수 있고 반응할 수 있어요. 저장 후에는 작성자만 수정하거나 삭제할 수 있습니다.</p><section class="card"><div class="between"><strong>이후 다시 묻지 않기</strong><button class="chip-btn" data-action="settings-toggle">끔</button></div></section><button class="ghost-btn" data-action="save-draft">임시 저장</button><button class="primary-btn" data-close>공유 일기로 저장</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openShareCardModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>공유 카드 미리보기</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>성수에서 보낸 오후</h3><p>바람이 좋아서 오래 걸었다.</p><p class="tiny-note" style="text-align:right">듀아리</p></section><p>사진 원본 공유에는 워터마크가 없고, 기록/일기/메시지 카드에는 하단 우측에 듀아리만 작게 표시합니다.</p><button class="ghost-btn" data-action="share-consent">상대 콘텐츠 동의 확인</button><button class="primary-btn" data-action="external-share">외부 공유</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openPhotoOrderManagerModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>사진 선택/순서</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>한 기록에 최대 30장까지 담고, 선택 순서와 표시 순서를 따로 관리합니다.</p><div class="photo-grid">${[1, 2, 3, 4].map((item) => `<button class="photo-thumb"><span>${item}</span></button>`).join("")}</div><div class="row"><button class="ghost-btn" data-action="settings-toggle">사진 추가</button><button class="ghost-btn" data-action="settings-toggle">사진 없이 기록</button></div><section class="card"><h3>업로드 처리</h3><p>원본은 보관하고 앱 표시용 썸네일을 생성합니다. 일부 사진이 실패하면 실패한 사진만 제외하고 저장할 수 있어요.</p></section></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openPhotoDetail() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>사진 상세</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="photo-stack" style="height:240px"></div><button class="primary-btn" data-action="download-photo">다운로드</button><button class="ghost-btn" data-action="share-consent">외부 공유 요청</button><button class="ghost-btn" data-action="hide-photo-confirm">내 화면에서 숨기기</button><button class="ghost-btn" data-action="delete-photo-confirm">사진 삭제</button><p class="tiny-note">상대가 올린 사진도 다운로드할 수 있지만, 상대 콘텐츠를 외부 공유할 때는 동의가 필요합니다.</p></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openMessageDetail() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>메시지 상세</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>받은 메시지</h3><p>최종 메시지만 표시하고, AI 사용 여부는 보여주지 않아요.</p></section><section class="card"><h3>보낸 메시지</h3><p>원문, 실제 보낸 메시지, 전송 방식, 전달됨/읽음, 상대 반응을 표시합니다. 읽은 시간과 읽음 알림은 제공하지 않아요.</p></section><div class="chip-row" data-message-reaction>${["고마워", "알겠어", "나도 그래", "생각해볼게", "미안해"].map((item) => `<button class="chip-btn">${item}</button>`).join("")}</div><button class="ghost-btn" data-action="hide-message-confirm">내 화면에서 숨김</button><button class="primary-btn" data-action="delete-message-confirm">양쪽에서 삭제</button></div></div>`);
  qsa("[data-message-reaction] .chip-btn").forEach((button) => button.addEventListener("click", () => {
    const wasActive = button.classList.contains("active");
    qsa("[data-message-reaction] .chip-btn").forEach((item) => item.classList.remove("active"));
    if (!wasActive) {
      button.classList.add("active");
      showToast("메시지에 반응했어요.");
    } else {
      showToast("메시지 반응을 취소했어요.");
    }
  }));
  bindActions(qs(".modal-sheet"));
}

function openShareConsentCompleteModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>동의 완료</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>요청자에게 동의 완료 알림이 도착했습니다. 실제 공유는 다시 공유 버튼을 눌러 진행합니다.</p><button class="primary-btn" data-action="external-share">다시 공유</button><p class="tiny-note">공유 완료 알림과 공유 이력 저장은 제공하지 않습니다.</p></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openDraftListModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>저장된 초안</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["질문 답변에서 만든 초안", "개인 일기에서 만든 초안", "기록 상세에서 만든 초안"].map((item) => `<section class="card"><div class="between"><strong>${item}</strong><span class="meta">출처 저장</span></div><p>전송하면 초안은 삭제되고 보낸 메시지가 새로 생성됩니다.</p><div class="row"><button class="ghost-btn" data-action="delete-draft-confirm">삭제</button><button class="ghost-btn" data-action="ai-message">편집</button></div></section>`).join("")}<button class="primary-btn" data-action="send-ai-result">선택한 초안 보내기</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

const modalHistory = [];
let suppressModalHistory = false;

function runWithoutModalHistory(action) {
  suppressModalHistory = true;
  action();
  suppressModalHistory = false;
}

function restorePreviousModal() {
  const snapshot = modalHistory.pop();
  if (!snapshot) {
    closeModal();
    return;
  }
  const modal = qs("#modal");
  modal.classList.toggle("page-modal", snapshot.pageModal);
  modal.innerHTML = snapshot.html;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  bindModalCloseButtons(modal);
  bindActions(modal);
  bindRestoredModalInteractions(modal);
}

function bindRestoredModalInteractions(root) {
  root.querySelectorAll("[data-memory-edit-page]").forEach((button) => {
    if (button.dataset.boundRestored) return;
    button.dataset.boundRestored = "true";
    button.addEventListener("click", () => openMemoryEditPageLatest(Number(button.dataset.index || 0)));
  });
  root.querySelectorAll("[data-linked-diary-index]").forEach((card) => {
    if (card.dataset.boundRestored) return;
    card.dataset.boundRestored = "true";
    card.addEventListener("click", () => openLinkedDiaryDetailLatest(Number(card.dataset.linkedDiaryIndex)));
  });
  root.querySelectorAll("[data-photo-order-page]").forEach((button) => {
    if (button.dataset.boundRestored) return;
    button.dataset.boundRestored = "true";
    button.addEventListener("click", () => openPhotoOrderManagerPageLatest());
  });
  const titleInput = root.querySelector(".memory-title-input");
  const titleCount = root.querySelector(".input-count");
  if (titleInput && titleCount && !titleInput.dataset.boundRestored) {
    titleInput.dataset.boundRestored = "true";
    syncMemoryTitleLimit(titleInput, titleCount);
    titleInput.addEventListener("input", () => {
      syncMemoryTitleLimit(titleInput, titleCount);
    });
  }
  if (root.querySelector("[data-photo-order-card]")) {
    bindPhotoRoleSelectionLatest(root);
    bindPhotoDragLatest(root);
  }
}

function bindModalCloseButtons(modal) {
  modal.querySelectorAll(".icon-btn[data-close]").forEach((button) => {
    button.textContent = "×";
    button.setAttribute("aria-label", "닫기");
  });
  modal.querySelectorAll(".notification-header .notification-nav-btn[data-close]:last-child").forEach((button) => {
    button.textContent = "×";
    button.setAttribute("aria-label", "닫기");
  });
  modal.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      const isBackButton = button.matches(".notification-header .notification-nav-btn[data-close]:first-child");
      if (isBackButton && modalHistory.length) {
        restorePreviousModal();
        return;
      }
      closeModal();
    });
  });
}

function openModal(html) {
  const modal = qs("#modal");
  if (!suppressModalHistory && modal.classList.contains("open") && modal.innerHTML.trim()) {
    modalHistory.push({
      html: modal.innerHTML,
      pageModal: modal.classList.contains("page-modal")
    });
  }
  modal.classList.remove("page-modal");
  modal.innerHTML = html;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modal.querySelectorAll(".icon-btn[data-close]").forEach((button) => {
    button.textContent = "×";
    button.setAttribute("aria-label", "닫기");
  });
  modal.querySelectorAll(".notification-header .notification-nav-btn[data-close]:last-child").forEach((button) => {
    button.textContent = "×";
    button.setAttribute("aria-label", "닫기");
  });
  normalizePageDetailHeaders(modal);
  bindModalCloseButtons(modal);
}

function normalizePageDetailHeaders(root) {
  root.querySelectorAll(".modal-sheet.notification-page .notification-header").forEach((header) => {
    const closeButtons = Array.from(header.querySelectorAll(".notification-nav-btn[data-close]"));
    if (closeButtons.length <= 1) return;

    closeButtons.slice(1).forEach((button) => {
      const spacer = document.createElement("span");
      spacer.className = "notification-header-spacer";
      spacer.setAttribute("aria-hidden", "true");
      button.replaceWith(spacer);
    });
  });
}

function closeModal() {
  const modal = qs("#modal");
  modalHistory.length = 0;
  modal.classList.remove("open");
  modal.classList.remove("page-modal");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = "";
}

function showToast(message) {
  const toast = qs("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function renderHome() {
  const home = qs("#home");
  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <section><h3>최근 우리 기록</h3><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
        <section class="diary-card"><h3>최근 공유 일기</h3><p>연결 전에는 공유 일기를 사용할 수 없어요.</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
      </div>
    `;
    bindActions(home);
    return;
  }

  const sharedDiary = state.diaries.find((diary) => diary.scope === "공유");
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
      <section><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
      <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${sharedDiary?.body || "아직 공유 일기가 없어요."}</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
    </div>
  `;
  bindActions(home);
}

function renderHome() {
  const home = qs("#home");
  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <section class="card home-records-card"><h3>최근 우리 기록</h3><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
        <section class="diary-card"><h3>최근 공유 일기</h3><p>연결 전에는 공유 일기를 사용할 수 없어요.</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button><button class="ghost-btn" data-action="new-question">직접 질문 작성하기</button></div></section>
      </div>
    `;
    bindActions(home);
    return;
  }

  const sharedDiary = state.diaries.find((diary) => diary.scope === "공유");
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
      <section class="card home-records-card"><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div><button class="primary-btn full" data-action="new-memory">새 기록 추가</button></section>
      <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${sharedDiary?.body || "아직 공유 일기가 없어요."}</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
    </div>
  `;
  bindActions(home);
}

function openNotificationPage() {
  const filters = [
    ["전체", "●"],
    ["기록", "▧"],
    ["다이어리", "✎"],
    ["메시지", "✉"],
    ["기념일", "D"],
    ["시스템", "⚙"],
  ];
  openModal(`<div class="modal-sheet notification-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>알림</h3><button class="notification-nav-btn" data-close aria-label="닫기">×</button></header><div class="notification-tabs" aria-label="알림 필터">${filters.map(([label, icon], index) => `<button class="notification-tab ${index === 0 ? "active" : ""}" aria-label="${label}" title="${label}">${icon}</button>`).join("")}</div><div class="list">${state.notifications.map((item) => `<section class="card notification-item"><strong>${item.text}</strong><p class="meta">${item.type}</p>${item.text.includes("공유 동의") ? '<button class="ghost-btn full" data-action="share-consent">공유 요청 보기</button>' : ""}</section>`).join("")}</div></div>`);
  qs("#modal").classList.add("page-modal");
  bindActions(qs(".modal-sheet"));
}

renderOnboarding();

qs("#startApp")?.addEventListener("click", startSetup);
qs("#openNotifications").addEventListener("click", () => {
  openModal(`<div class="modal-sheet"><div class="between"><h3>알림</h3><button class="icon-btn" data-close>닫기</button></div><div class="tabs" style="margin:10px 0">${["전체", "기록", "다이어리", "메시지", "기념일", "시스템"].map((item, index) => `<button class="chip-btn ${index === 0 ? "active" : ""}">${item}</button>`).join("")}</div><div class="list">${state.notifications.map((item) => `<section class="card"><div class="between"><strong>${item.type}</strong><span class="meta">알림</span></div><p>${item.text}</p>${item.text.includes("공유 동의") ? '<button class="ghost-btn full" data-action="share-consent">요청 보기</button>' : ""}</section>`).join("")}</div></div>`);
  bindActions(qs(".modal-sheet"));
});

qs("#openNotifications").addEventListener("click", openNotificationPage);

qsa(".nav-item").forEach((button) => button.addEventListener("click", () => setTab(button.dataset.tab)));

function openNotificationPageV2() {
  const filters = [
    ["전체", "●"],
    ["기록", "▧"],
    ["다이어리", "✎"],
    ["메시지", "✉"],
    ["기념일", "D"],
    ["시스템", "⚙"],
  ];
  openModal(`<div class="modal-sheet notification-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>알림</h3><button class="notification-nav-btn" data-close aria-label="닫기">×</button></header><div class="notification-tabs" aria-label="알림 필터">${filters.map(([label, icon], index) => `<button class="notification-tab ${index === 0 ? "active" : ""}" aria-label="${label}" title="${label}">${icon}</button>`).join("")}</div><div class="list">${state.notifications.map((item) => `<section class="card notification-item"><strong>${item.text}</strong><p class="meta">${item.type}</p>${item.text.includes("공유 동의") ? '<button class="ghost-btn full" data-action="share-consent">공유 요청 보기</button>' : ""}</section>`).join("")}</div></div>`);
  qs("#modal").classList.add("page-modal");
  bindActions(qs(".modal-sheet"));
}

const cleanNotificationButton = qs("#openNotifications").cloneNode(true);
qs("#openNotifications").replaceWith(cleanNotificationButton);
cleanNotificationButton.onclick = (event) => {
  event.preventDefault();
  event.stopPropagation();
  openNotificationPageV2();
};

function openNotificationPageV3() {
  const filters = [
    ["전체", "●"],
    ["기록", "▧"],
    ["다이어리", "✎"],
    ["메시지", "✉"],
    ["기념일", "D"],
    ["시스템", "⚙"],
  ];
  openModal(`<div class="modal-sheet notification-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>알림</h3><button class="notification-nav-btn" data-close aria-label="닫기">×</button></header><div class="notification-tabs" aria-label="알림 필터">${filters.map(([label, icon], index) => `<button class="notification-tab ${index === 0 ? "active" : ""}" aria-label="${label}" title="${label}">${icon}</button>`).join("")}</div><div class="list">${state.notifications.map((item) => `<section class="card notification-item"><strong>${item.text}</strong><p class="meta">${item.type}</p>${item.text.includes("공유 동의") ? '<button class="ghost-btn full" data-action="share-consent-list">공유 요청 보기</button>' : ""}</section>`).join("")}</div></div>`);
  qs("#modal").classList.add("page-modal");
  bindActions(qs(".modal-sheet"));
}

function openShareConsentListOverlay() {
  const modal = qs("#modal");
  const existing = qs(".share-consent-overlay", modal);
  if (existing) existing.remove();
  modal.insertAdjacentHTML("beforeend", `<div class="share-consent-overlay" role="dialog" aria-modal="true"><section class="share-consent-sheet"><header class="notification-header"><button class="notification-nav-btn" data-consent-close aria-label="뒤로가기">←</button><h3>공유 동의</h3><button class="notification-nav-btn" data-consent-close aria-label="닫기">×</button></header><div class="section-stack"><p class="meta">알림에서 도착한 공유 동의 요청을 확인해 주세요.</p><button class="card share-request-item" data-consent-detail><div class="between"><strong>성수에서 보낸 오후 공유 요청</strong><span class="meta">기록 카드</span></div><p>상대가 올린 글이 포함되어 동의가 필요합니다.</p></button><button class="card share-request-item" data-consent-detail><div class="between"><strong>공유 일기 카드 요청</strong><span class="meta">일기 카드</span></div><p>공유 일기 본문이 포함되어 동의가 필요합니다.</p></button></div></section></div>`);
  qsa("[data-consent-close]", modal).forEach((button) => button.addEventListener("click", () => qs(".share-consent-overlay", modal)?.remove()));
  qsa("[data-consent-detail]", modal).forEach((button) => button.addEventListener("click", openShareConsentDetailOverlay));
}

function openShareConsentDetailOverlay() {
  const overlay = qs(".share-consent-overlay");
  overlay.innerHTML = `<section class="share-consent-sheet"><header class="notification-header"><button class="notification-nav-btn" data-consent-back aria-label="뒤로가기">←</button><h3>공유 동의 상세</h3><button class="notification-nav-btn" data-consent-close aria-label="닫기">×</button></header><div class="section-stack"><section class="card"><h3>공유 요청한 콘텐츠</h3><div class="share-preview-card"><strong>성수에서 보낸 오후</strong><p>바람이 좋아서 오래 걸었다.</p><p class="tiny-note" style="text-align:right">듀아리</p></div><p class="meta">요청한 콘텐츠 묶음 전체에 대해 한 번에 동의합니다. 콘텐츠가 바뀌면 새 동의가 필요해요.</p></section><div class="row"><button class="ghost-btn" data-consent-reject>거절</button><button class="primary-btn" data-consent-accept>동의 수락</button></div></div></section>`;
  qs("[data-consent-back]", overlay).addEventListener("click", openShareConsentListOverlay);
  qs("[data-consent-close]", overlay).addEventListener("click", () => overlay.remove());
  qs("[data-consent-reject]", overlay).addEventListener("click", () => {
    overlay.remove();
    showToast("공유 동의 요청을 거절했어요.");
  });
  qs("[data-consent-accept]", overlay).addEventListener("click", () => {
    overlay.remove();
    showToast("공유 동의를 수락했어요. 요청자에게 알림이 전송됩니다.");
  });
}

const notificationButtonV3 = qs("#openNotifications");
notificationButtonV3.onclick = (event) => {
  event.preventDefault();
  event.stopPropagation();
  openNotificationPageV4();
};

function openDiaryModal() {
  openModal(`
    <div class="modal-sheet notification-page diary-write-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>일기 쓰기</h3>
        <button class="notification-nav-btn" data-close aria-label="닫기">×</button>
      </header>
      <div class="section-stack">
        <div class="chip-row" data-diary-scope><button class="chip-btn active">나만 보기</button><button class="chip-btn ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div>
        <div class="form-field"><label>제목</label><input id="diaryTitle" /></div>
        <div class="form-field"><label>본문</label><textarea id="diaryBody" placeholder="오늘의 마음을 적어보세요."></textarea></div>
        <div class="chip-row" data-diary-feelings>${["고마움", "안정", "서운함", "그리움", "기대"].map((item) => `<button class="chip-btn">${item}</button>`).join("")}</div>
        <section class="card">
          <div class="between"><h3>관련 기록 연결</h3><span class="chip-btn">선택</span></div>
          <p>공유 일기에는 공유 기록만 연결할 수 있어요.</p>
          <button class="ghost-btn full" data-action="memory-detail" data-index="0">기록 선택</button>
        </section>
        <button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button>
        <button class="primary-btn full" data-save-diary>임시 저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-save-diary]").addEventListener("click", () => {
    state.diaries.unshift({ title: qs("#diaryTitle").value.trim() || "제목 없는 일기", body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문", scope: "개인", feelings: ["고마움"], linked: "관련 기록 없음", author: "나" });
    closeModal();
    renderDiary();
    showToast("일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}
function memoryPhotoStripFinal(count = 7) {
  return Array.from({ length: Math.min(count, 10) }, (_, index) => `
    <button class="memory-photo-thumb" data-action="photo-detail" aria-label="${index + 1}번째 사진">
      <span>${index + 1}</span>
    </button>
  `).join("");
}

function openMemoryDetail(index) {
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const linkedDiaries = state.diaries.filter((diary) => diary.linked === memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>${memory.title}</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main"><span class="memory-photo-count">${photoCount}장</span></div>
          <div class="memory-photo-strip">${memoryPhotoStripFinal(photoCount)}</div>
        </section>
        <section class="card">
          <div class="between"><h3>${memory.title}</h3><span class="meta">${memory.type}</span></div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
          <p>${memory.note}</p>
        </section>
        <section class="card emotion-split-card">
          <div class="emotion-split">
            <div class="emotion-panel">
              <h3>내 감정</h3>
              <div class="tag-row">${memory.feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
            </div>
            <div class="emotion-divider" aria-hidden="true"></div>
            <div class="emotion-panel">
              <h3>상대 감정</h3>
              <div class="tag-row"><span class="chip-btn">고마움</span><span class="chip-btn">다정함</span></div>
            </div>
          </div>
        </section>
        <section class="card">
          <div class="between"><h3>연결된 일기</h3><span class="meta">${linkedDiaries.length}개</span></div>
          ${linkedDiaries.length ? linkedDiaries.map((diary) => `<p>${diary.title}</p>`).join("") : "<p>아직 연결된 일기가 없어요.</p>"}
        </section>
        <button class="primary-btn full" data-memory-edit-page>기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageFinal(index));
  bindActions(qs(".modal-sheet"));
}

function openMemoryEditPageFinal(index) {
  const memory = state.memories[index] || state.memories[0];
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field"><label>제목</label><input value="${memory.title}" /></div>
        <div class="form-field"><label>날짜</label><input value="${memory.date}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>한 줄 메모</label><textarea>${memory.note}</textarea></div>
        <section class="card">
          <div class="between"><h3>사진 관리</h3><span class="meta">최대 30장</span></div>
          <div class="memory-photo-strip">${memoryPhotoStripFinal(5)}</div>
          <div class="memory-edit-actions" style="margin-top:12px">
            <button class="ghost-btn full" data-action="photo-order-manager">사진 순서 변경</button>
            <button class="ghost-btn full" data-action="photo-upload-policy">사진 추가</button>
          </div>
        </section>
        <section class="card">
          <h3>연결된 일기</h3>
          <p>기록과 이어지는 일기를 선택하거나 새 일기를 연결할 수 있어요.</p>
          <button class="ghost-btn full" data-action="new-diary">연결된 일기 추가</button>
        </section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => openMemoryDetailPageFinal(index));
  const addPhotoButton = qs('[data-action="photo-upload-policy"]', qs(".modal-sheet"));
  if (addPhotoButton) {
    addPhotoButton.removeAttribute("data-action");
    addPhotoButton.addEventListener("click", () => showToast("사진 추가 화면을 열었어요. 기존 기록 사진 추가에는 알림을 보내지 않아요."));
  }
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    closeModal();
    showToast("기록 수정 내용을 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function makeToggleButtons(root, selector = ".chip-row .chip-btn", max = 2) {
  const buttons = root.matches?.(".chip-row") ? qsa(".chip-btn", root) : qsa(selector, root);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled || button.classList.contains("is-disabled")) return;
      const group = button.closest(".chip-row") || button.parentElement;
      const active = qsa(".chip-btn.active", group);
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        return;
      }
      if (active.length >= max) {
        showToast(`감정은 최대 ${max}개까지 선택할 수 있어요.`);
        return;
      }
      button.classList.add("active");
    });
  });
}

function emotionChipRow(items, selected = [], attr = "data-emotion-feelings") {
  return `<div class="chip-row diary-feelings-centered" ${attr}>${items.map((item) => `<button class="chip-btn ${selected.includes(item) ? "active" : ""}">${item}</button>`).join("")}</div>`;
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  openModal(`
    <div class="modal-sheet notification-page diary-write-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>${heading}</h3>
        <button class="notification-nav-btn" data-close aria-label="닫기">×</button>
      </header>
      <div class="section-stack">
        <div class="chip-row" data-diary-scope>
          <button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button>
          <button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button>
        </div>
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div>
          <input id="diaryTitle" value="${diaryTitle}" maxlength="24" />
        </div>
        <div class="form-field"><label>본문</label><textarea id="diaryBody" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>
        ${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}
        <section class="linked-record-static">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">${linkedTitle}</span></div>
          <p>${linkedTitle}</p>
          <button class="ghost-btn full" data-action="memory-detail" data-index="${linkedMemoryIndex ?? 0}">기록 연결 추가</button>
        </section>
        <button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button>
        <button class="primary-btn full" data-save-diary>${heading === "일기 상세" ? "수정 저장" : "임시 저장"}</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-save-diary]").addEventListener("click", () => {
    const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
    state.diaries.unshift({
      title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기",
      body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문",
      scope: qs("[data-diary-scope] .chip-btn.active")?.textContent.includes("상대") ? "공유" : "개인",
      feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
      linked: linkedTitle,
      author: "나"
    });
    closeModal();
    renderDiary();
    showToast(heading === "일기 상세" ? "일기를 수정했어요." : "일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openDiaryModal(linkedMemoryIndex = null) {
  renderDiaryEditor({ heading: "일기 쓰기", linkedMemoryIndex });
}

function openDiaryDetail() {
  renderDiaryEditor({ heading: "일기 상세", diary: state.diaries[0] });
}

function openLinkedDiaryDetailLatest(index, backAction = restorePreviousModal) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  const linkedMemoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  renderDiaryEditor({
    heading: "일기 상세",
    diary: {
      title: diary.title,
      body: diary.body,
      scope: diary.type === "나만 보기" ? "개인" : "공유",
      feelings: ["고마움", "안정"],
      linked: state.memories[linkedMemoryIndex]?.title || "관련 기록 없음"
    },
    linkedMemoryIndex
  });
  qsa("[data-close]", qs(".modal-sheet")).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      runWithoutModalHistory(backAction);
    }, { once: true });
  });
}

function openMemoryDetailLatestV3(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역"><div class="memory-photo-main"><div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div></div></section>
        <section class="card">
          <div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3><span class="meta">${memory.type}</span></div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
          <p>${memory.note}</p>
        </section>
        <section class="card emotion-split-card">
          <div class="emotion-split">
            <div class="emotion-panel"><h3>내 감정</h3><div class="tag-row emotion-badge-row">${memory.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div></div>
            <div class="emotion-divider" aria-hidden="true"></div>
            <div class="emotion-panel"><h3>상대 감정</h3><div class="tag-row emotion-badge-row"><span class="chip-btn">고마움</span><span class="chip-btn">다정함</span></div></div>
          </div>
        </section>
        <section class="card linked-diary-section">
          <div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page data-index="${index}">기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(index));
  bindActions(qs(".modal-sheet"));
}

function openMemoryEditPageLatest(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div><input class="memory-title-input" value="${editTitle}" maxlength="24" /></div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>${memory.type}</option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <section class="card"><h3>내 감정</h3>${emotionChipRow(["편안함", "고마움", "설렘", "솔직함", "기쁨"], (memory.feelings || []).slice(0, 2), "data-memory-edit-feelings")}</section>
        <div class="form-field"><label>한 줄 메모</label><textarea>${memory.note}</textarea></div>
        <section class="card">
          <div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div>
          <div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div>
          <button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button>
          <button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button>
        </section>
        <section class="card linked-diary-section">
          <div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
          <button class="ghost-btn full" data-linked-diary-add style="margin-top:12px">일기 연결 추가</button>
        </section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runWithoutModalHistory(() => openMemoryDetailLatestV3(index)));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  makeToggleButtons(qs("[data-memory-edit-feelings]"));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    openMemoryDetailLatestV3(index);
    showToast("기록 수정 내용을 저장했어요.");
  });
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function toDateInputValue(value) {
  const match = String(value || "").match(/(\d{4})[.-](\d{2})[.-](\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : "2026-04-30";
}

function openPhotoAddChoiceModal() {
  openModal(`
    <div class="modal-sheet">
      <div class="between"><h3>사진 추가</h3><button class="icon-btn" data-close>닫기</button></div>
      <div class="section-stack">
        <button class="primary-btn full" data-close>사진 촬영</button>
        <button class="ghost-btn full" data-close>앨범 보기</button>
      </div>
    </div>
  `);
}

function openDiaryModal(linkedMemoryIndex = null) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory ? linkedMemory.title : "관련 기록 없음";
  openModal(`
    <div class="modal-sheet notification-page diary-write-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>일기 쓰기</h3>
        <button class="notification-nav-btn" data-close aria-label="닫기">×</button>
      </header>
      <div class="section-stack">
        <div class="chip-row" data-diary-scope><button class="chip-btn active">나만 보기</button><button class="chip-btn ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div>
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>0/24</span></div>
          <input id="diaryTitle" maxlength="24" />
        </div>
        <div class="form-field"><label>본문</label><textarea id="diaryBody" placeholder="오늘의 마음을 적어보세요."></textarea></div>
        <div class="chip-row diary-feelings-centered" data-diary-feelings>${["고마움", "안정", "서운함", "그리움", "기대"].map((item) => `<button class="chip-btn">${item}</button>`).join("")}</div>
        <section class="linked-record-static">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">${linkedMemory ? "자동 연결" : "선택 안 함"}</span></div>
          <p>${linkedTitle}</p>
        </section>
        <button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button>
        <button class="primary-btn full" data-save-diary>임시 저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const diaryTitle = qs("#diaryTitle");
  const diaryTitleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(diaryTitle, diaryTitleCount);
  diaryTitle.addEventListener("input", () => syncMemoryTitleLimit(diaryTitle, diaryTitleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-save-diary]").addEventListener("click", () => {
    state.diaries.unshift({
      title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기",
      body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문",
      scope: "개인",
      feelings: ["고마움"],
      linked: linkedTitle,
      author: "나"
    });
    closeModal();
    renderDiary();
    showToast("일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openMemoryEditPageLatest(index) {
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div>
          <input class="memory-title-input" value="${editTitle}" maxlength="24" />
        </div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>한 줄 메모</label><textarea>${memory.note}</textarea></div>
        <section class="card">
          <div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div>
          <div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div>
          <button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button>
          <button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button>
        </section>
        <section class="card linked-diary-section">
          <div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
          <button class="ghost-btn full" data-linked-diary-add style="margin-top:12px">일기 연결 추가</button>
        </section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runWithoutModalHistory(() => openMemoryDetailLatestV3(index)));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    openMemoryDetailLatestV3(index);
    showToast("기록 수정 내용을 저장했어요.");
  });
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

// Definitive runtime overrides appended at EOF.
function makeToggleButtons(root, selector = ".chip-row .chip-btn", max = 2) {
  const buttons = root.matches?.(".chip-row") ? qsa(".chip-btn", root) : qsa(selector, root);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled || button.classList.contains("is-disabled")) return;
      const group = button.closest(".chip-row") || button.parentElement;
      const active = qsa(".chip-btn.active", group);
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        return;
      }
      if (active.length >= max) {
        showToast(`감정은 최대 ${max}개까지 선택할 수 있어요.`);
        return;
      }
      button.classList.add("active");
    });
  });
}

function emotionChipRow(items, selected = [], attr = "data-emotion-feelings") {
  return `<div class="chip-row diary-feelings-centered" ${attr}>${items.map((item) => `<button class="chip-btn ${selected.includes(item) ? "active" : ""}">${item}</button>`).join("")}</div>`;
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>${heading}</h3><button class="notification-nav-btn" data-close aria-label="닫기">×</button></header><div class="section-stack"><div class="chip-row" data-diary-scope><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}<section class="linked-record-static"><div class="between"><h3>관련 기록 연결</h3><span class="meta">${linkedTitle}</span></div><p>${linkedTitle}</p><button class="ghost-btn full" data-action="memory-detail" data-index="${linkedMemoryIndex ?? 0}">기록 연결 추가</button></section><button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button><button class="primary-btn full" data-save-diary>${heading === "일기 상세" ? "수정 저장" : "임시 저장"}</button></div></div>`);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  qs("[data-save-diary]").addEventListener("click", () => {
    const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
    state.diaries.unshift({ title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기", body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문", scope: qs("[data-diary-scope] .chip-btn.active")?.textContent.includes("상대") ? "공유" : "개인", feelings: selectedFeelings.length ? selectedFeelings : ["고마움"], linked: linkedTitle, author: "나" });
    closeModal();
    renderDiary();
    showToast(heading === "일기 상세" ? "일기를 수정했어요." : "일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openDiaryModal(linkedMemoryIndex = null) {
  renderDiaryEditor({ heading: "일기 쓰기", linkedMemoryIndex });
}

function openDiaryDetail() {
  renderDiaryEditor({ heading: "일기 상세", diary: state.diaries[0] });
}

// Final record-edit override appended at EOF.
function openMemoryEditPageLatest(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div><input class="memory-title-input" value="${editTitle}" maxlength="24" /></div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>${memory.type}</option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <section class="card"><h3>내 감정</h3>${emotionChipRow(["편안함", "고마움", "설렘", "솔직함", "기쁨"], (memory.feelings || []).slice(0, 2), "data-memory-edit-feelings")}</section>
        <div class="form-field"><label>한 줄 메모</label><textarea>${memory.note}</textarea></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div><div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div><button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button><button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div><div class="linked-diary-list">${linkedDiaryCardsLatest()}</div><button class="ghost-btn full" data-linked-diary-add style="margin-top:12px">일기 연결 추가</button></section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runWithoutModalHistory(() => openMemoryDetailLatestV3(index)));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  makeToggleButtons(qs("[data-memory-edit-feelings]"));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    openMemoryDetailLatestV3(index);
    showToast("기록 수정 내용을 저장했어요.");
  });
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

// Final diary editor override for linked records and larger body field.
function renderLinkedRecordCards(linkedTitle, linkedMemoryIndex = null) {
  const titles = linkedTitle && linkedTitle !== "관련 기록 없음"
    ? [linkedTitle]
    : state.memories.slice(0, 1).map((memory) => memory.title);
  return `<section class="card linked-record-card"><div class="between"><h3>관련 기록 연결</h3><span class="meta">${titles.length}개</span></div><div class="linked-record-list">${titles.map((title) => `<div class="linked-record-pill"><span>${title}</span></div>`).join("")}</div><button class="ghost-btn full" data-action="memory-detail" data-index="${linkedMemoryIndex ?? 0}">기록 연결 추가</button></section>`;
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>${heading}</h3><button class="notification-nav-btn" data-close aria-label="닫기">×</button></header><div class="section-stack"><div class="chip-row" data-diary-scope><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}${renderLinkedRecordCards(linkedTitle, linkedMemoryIndex)}<button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button><button class="primary-btn full" data-save-diary>${heading === "일기 상세" ? "수정 저장" : "임시 저장"}</button></div></div>`);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  qs("[data-save-diary]").addEventListener("click", () => {
    const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
    state.diaries.unshift({ title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기", body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문", scope: qs("[data-diary-scope] .chip-btn.active")?.textContent.includes("상대") ? "공유" : "개인", feelings: selectedFeelings.length ? selectedFeelings : ["고마움"], linked: linkedTitle, author: "나" });
    closeModal();
    renderDiary();
    showToast(heading === "일기 상세" ? "일기를 수정했어요." : "일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openDiaryModal(linkedMemoryIndex = null) {
  renderDiaryEditor({ heading: "일기 쓰기", linkedMemoryIndex });
}

function openDiaryDetail() {
  renderDiaryEditor({ heading: "일기 상세", diary: state.diaries[0] });
}

// Final diary-detail overrides at EOF: linked diary cards open a read-only detail first.
function normalizeDiaryForDetail(diary, fallbackIndex = 0) {
  const linkedMemoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  const linkedTitle = state.memories[linkedMemoryIndex]?.title || diary?.linked || "관련 기록 없음";
  return {
    title: diary?.title || "제목 없는 일기",
    body: diary?.body || "작성된 일기 본문이 없습니다.",
    type: diary?.type || (diary?.scope === "공유" ? "내 공유" : "나만 보기"),
    scope: diary?.scope || (diary?.type === "나만 보기" ? "개인" : "공유"),
    feelings: diary?.feelings || ["고마움", "안정"],
    linked: linkedTitle,
    editable: diary?.editable ?? diary?.type !== "상대 공유",
    index: fallbackIndex,
    linkedMemoryIndex
  };
}

function renderDiaryDetailReadOnly(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-feelings-centered">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list"><div class="linked-record-pill"><span>${detail.linked}</span></div></div>
        </section>
        <button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button>
        ${detail.editable ? `<button class="primary-btn full" data-diary-edit>수정하기</button>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(backAction));
  const editButton = qs("[data-diary-edit]");
  if (editButton) {
    editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, backAction)));
  }
  bindActions(qs(".modal-sheet"));
}

function openLinkedDiaryEditLatest(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  renderDiaryEditor({
    heading: "일기 수정",
    diary: {
      title: detail.title,
      body: detail.body,
      scope: detail.scope,
      feelings: detail.feelings,
      linked: detail.linked
    },
    linkedMemoryIndex: detail.linkedMemoryIndex
  });
  const saveButton = qs("[data-save-diary]");
  if (saveButton) saveButton.textContent = "수정 저장";
}

function openLinkedDiaryDetailLatest(index, backAction = restorePreviousModal) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(diary, index), backAction);
}

function openDiaryDetail() {
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(state.diaries[0] || linkedDiariesLatest()[0]), closeModal);
}

// Final requested layout overrides at EOF.
function renderDiaryDetailReadOnly(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list"><div class="linked-record-pill"><span>${detail.linked}</span></div></div>
        </section>
        ${detail.editable ? `<button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button><button class="primary-btn full" data-diary-edit>수정하기</button>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(backAction));
  const editButton = qs("[data-diary-edit]");
  if (editButton) {
    editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, backAction)));
  }
  bindActions(qs(".modal-sheet"));
}

function openLinkedDiaryDetailLatest(index, backAction = restorePreviousModal) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(diary, index), backAction);
}

function openDiaryDetail() {
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(state.diaries[0] || linkedDiariesLatest()[0]), closeModal);
}

function openMemoryEditPageLatest(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  const feelingButtons = ["편안함", "고마움", "설렘", "솔직함", "기쁨"].map((feeling) => `<button class="chip-btn ${(memory.feelings || []).slice(0, 2).includes(feeling) ? "active" : ""}">${feeling}</button>`).join("");
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div><input class="memory-title-input" value="${editTitle}" maxlength="24" /></div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>${memory.type}</option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <div class="form-field memory-edit-feelings"><label>내 감정</label><div class="chip-row" data-memory-edit-feelings>${feelingButtons}</div></div>
        <div class="form-field"><label>한 줄 메모</label><textarea>${memory.note}</textarea></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div><div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div><button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button><button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div><div class="linked-diary-list">${linkedDiaryCardsLatest()}</div><button class="ghost-btn full" data-linked-diary-add style="margin-top:12px">일기 연결 추가</button></section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runWithoutModalHistory(() => openMemoryDetailLatestV3(index)));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  makeToggleButtons(qs("[data-memory-edit-feelings]"));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    openMemoryDetailLatestV3(index);
    showToast("기록 수정 내용을 저장했어요.");
  });
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

// Final diary editor record-link picker flow at EOF.
function getDiaryDraftFromEditor(fallback = {}) {
  const activeScope = qs("[data-diary-scope] .chip-btn.active")?.textContent || fallback.scope || "개인";
  return {
    heading: fallback.heading || qs(".diary-write-page .notification-header h3")?.textContent || "일기 수정",
    title: qs("#diaryTitle")?.value || fallback.title || "",
    body: qs("#diaryBody")?.value || fallback.body || "",
    scope: activeScope.includes("상대") || activeScope.includes("공유") ? "공유" : "개인",
    feelings: qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2) || fallback.feelings || [],
    linkedMemoryIndex: typeof fallback.linkedMemoryIndex === "number" ? fallback.linkedMemoryIndex : null,
    linked: fallback.linked || "관련 기록 없음"
  };
}

function renderLinkedRecordCards(linkedTitle, linkedMemoryIndex = null) {
  const titles = linkedTitle && linkedTitle !== "관련 기록 없음"
    ? [linkedTitle]
    : state.memories.slice(0, 1).map((memory) => memory.title);
  return `<section class="card linked-record-card"><div class="between"><h3>관련 기록 연결</h3><span class="meta">${titles.length}개</span></div><div class="linked-record-list">${titles.map((title) => `<div class="linked-record-pill"><span>${title}</span></div>`).join("")}</div><button class="ghost-btn full" data-diary-record-picker>기록 연결 추가</button></section>`;
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>${heading}</h3><span class="notification-header-spacer" aria-hidden="true"></span></header><div class="section-stack"><div class="chip-row" data-diary-scope><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}${renderLinkedRecordCards(linkedTitle, linkedMemoryIndex)}<button class="ghost-btn full" data-action="ai-message">전할 말로 정리하기</button><button class="primary-btn full" data-save-diary>${heading === "일기 수정" || heading === "일기 상세" ? "수정 저장" : "임시 저장"}</button></div></div>`);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  qs("[data-diary-record-picker]").addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  qs("[data-save-diary]").addEventListener("click", () => {
    const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
    state.diaries.unshift({ title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기", body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문", scope: qs("[data-diary-scope] .chip-btn.active")?.textContent.includes("상대") ? "공유" : "개인", feelings: selectedFeelings.length ? selectedFeelings : ["고마움"], linked: linkedTitle, author: "나" });
    closeModal();
    renderDiary();
    showToast(heading === "일기 수정" || heading === "일기 상세" ? "일기를 수정했어요." : "일기를 임시 저장했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openDiaryRecordPickerPage(draft = {}) {
  const cards = state.memories.map((memory, index) => `
    <article class="record-picker-card">
      <div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.type}</span></div>
      <p class="meta">${memory.date} · ${memory.place}</p>
      <p>${memory.note}</p>
      <div class="record-picker-actions">
        <button class="ghost-btn" data-record-preview="${index}">상세 보기</button>
        <button class="primary-btn" data-record-select="${index}">선택 추가</button>
      </div>
    </article>
  `).join("");
  openModal(`
    <div class="modal-sheet notification-page diary-record-picker-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-picker-back aria-label="뒤로가기">←</button>
        <h3>기록 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="record-picker-list">${cards}</div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-picker-back]").addEventListener("click", () => renderDiaryEditor({ heading: draft.heading || "일기 수정", diary: draft, linkedMemoryIndex: draft.linkedMemoryIndex }));
  qsa("[data-record-preview]").forEach((button) => {
    button.addEventListener("click", () => openDiaryRecordPreviewPage(Number(button.dataset.recordPreview), draft));
  });
  qsa("[data-record-select]").forEach((button) => {
    button.addEventListener("click", () => addRecordToDiaryDraft(Number(button.dataset.recordSelect), draft));
  });
}

function openDiaryRecordPreviewPage(index, draft = {}) {
  const memory = state.memories[index] || state.memories[0];
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-preview-back aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역"><div class="memory-photo-main"><div class="memory-photo-scroll">${memoryPhotoScrollerLatest(7)}</div></div></section>
        <section class="card"><div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitMemoryTitleLatest(memory.title)}</h3><span class="meta">${memory.type}</span></div><p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p><p>${memory.note}</p></section>
        <button class="primary-btn full" data-preview-select>이 기록 추가</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-preview-back]").addEventListener("click", () => openDiaryRecordPickerPage(draft));
  qs("[data-preview-select]").addEventListener("click", () => addRecordToDiaryDraft(index, draft));
}

function addRecordToDiaryDraft(index, draft = {}) {
  const memory = state.memories[index] || state.memories[0];
  renderDiaryEditor({
    heading: draft.heading || "일기 수정",
    diary: {
      title: draft.title,
      body: draft.body,
      scope: draft.scope,
      feelings: draft.feelings,
      linked: memory.title
    },
    linkedMemoryIndex: index
  });
  showToast("관련 기록을 추가했어요.");
}

function openDiaryModal(linkedMemoryIndex = null) {
  renderDiaryEditor({ heading: "일기 쓰기", linkedMemoryIndex });
}

// Final diary record picker metadata/cancel override at EOF.
function openDiaryRecordPickerPage(draft = {}) {
  const cards = state.memories.map((memory, index) => `
    <article class="record-picker-card">
      <div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.type}</span></div>
      <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
      <p>${memory.note}</p>
      <div class="record-picker-actions">
        <button class="ghost-btn" data-record-preview="${index}">상세 보기</button>
        <button class="primary-btn" data-record-select="${index}">선택 추가</button>
      </div>
    </article>
  `).join("");
  openModal(`
    <div class="modal-sheet notification-page diary-record-picker-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-picker-back aria-label="뒤로가기">←</button>
        <h3>기록 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="record-picker-list">${cards}</div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-picker-back]").addEventListener("click", () => renderDiaryEditor({ heading: draft.heading || "일기 수정", diary: draft, linkedMemoryIndex: draft.linkedMemoryIndex }));
  qsa("[data-record-preview]").forEach((button) => {
    button.addEventListener("click", () => openDiaryRecordPreviewPage(Number(button.dataset.recordPreview), draft));
  });
  qsa("[data-record-select]").forEach((button) => {
    button.addEventListener("click", () => addRecordToDiaryDraft(Number(button.dataset.recordSelect), draft));
  });
}

function openDiaryRecordPreviewPage(index, draft = {}) {
  const memory = state.memories[index] || state.memories[0];
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-preview-back aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역"><div class="memory-photo-main"><div class="memory-photo-scroll">${memoryPhotoScrollerLatest(7)}</div></div></section>
        <section class="card"><div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitMemoryTitleLatest(memory.title)}</h3><span class="meta">${memory.type}</span></div><p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p><p>${memory.note}</p></section>
        <div class="record-picker-actions">
          <button class="ghost-btn" data-preview-cancel>취소</button>
          <button class="primary-btn" data-preview-select>이 기록 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const goBack = () => openDiaryRecordPickerPage(draft);
  qs("[data-preview-back]").addEventListener("click", goBack);
  qs("[data-preview-cancel]").addEventListener("click", goBack);
  qs("[data-preview-select]").addEventListener("click", () => addRecordToDiaryDraft(index, draft));
}

// Final AI refinement page flow at EOF.
const aiTonePresets = ["부드럽게", "다정하게", "솔직하게", "짧게", "진지하게"];
let aiRedraftCount = 0;

function getAiSourceText() {
  const activeTextarea = qs("#diaryBody") || qs("textarea");
  const value = activeTextarea?.value?.trim();
  if (value) return value;
  return "요즘 내가 조금 서운했던 마음을 차분히 전하고 싶어.";
}

function makeAiResult(original, tone = "부드럽게") {
  const base = original.trim() || "전하고 싶은 마음이 있어.";
  const variants = {
    "부드럽게": `내 마음을 탓하듯 말하고 싶지는 않아. ${base} 이 이야기를 우리 둘이 조금 편안하게 나눠보고 싶어.`,
    "다정하게": `네가 소중해서 조심스럽게 말해보고 싶어. ${base} 내 마음을 알아주면 고마울 것 같아.`,
    "솔직하게": `${base} 이 마음을 오래 혼자 두기보다 솔직하게 이야기해보고 싶어.`,
    "짧게": `${base} 우리 잠깐 이야기해볼 수 있을까?`,
    "진지하게": `${base} 가볍게 넘기기보다 차분히 이야기하고 서로의 마음을 확인하고 싶어.`
  };
  return variants[tone] || variants["부드럽게"];
}

function bindToneChoice(root) {
  qsa("[data-ai-tone] .chip-btn", root).forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-ai-tone] .chip-btn", root).forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

function openAiModal() {
  openAiSourcePage({ original: getAiSourceText(), tone: "부드럽게" });
}

function openAiSourcePage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || "부드럽게";
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-source-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-cancel aria-label="뒤로가기">←</button>
        <h3>전할 말 정리하기</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="tone-section">
          <h3>톤 선택</h3>
          <div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div>
        </section>
        <div class="form-field">
          <label>원문</label>
          <textarea id="aiOriginalText" class="diary-body-large">${original}</textarea>
        </div>
        <button class="primary-btn full" data-ai-make-result>AI로 정리하기</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-cancel]").addEventListener("click", restorePreviousModal);
  qs("[data-ai-make-result]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || "부드럽게";
    const nextOriginal = qs("#aiOriginalText").value.trim();
    openAiResultPage({ original: nextOriginal, tone: selectedTone, result: makeAiResult(nextOriginal, selectedTone) });
  });
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || "부드럽게";
  const result = draft.result || makeAiResult(original, tone);
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <h3>원문</h3>
          <p class="readonly-source">${original}</p>
        </section>
        <div class="form-field">
          <label>AI 결과</label>
          <textarea id="aiResultText" class="diary-body-large">${result}</textarea>
        </div>
        <section class="tone-section">
          <h3>톤 선택</h3>
          <div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div>
        </section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>저장하기</button>
          <button class="primary-btn" data-ai-send>상대에게 보내기</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => openAiSourcePage({ original, tone }));
  qs("[data-ai-cancel-result]").addEventListener("click", () => openAiSourcePage({ original, tone }));
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    aiRedraftCount += 1;
    qs("#aiResultText").value = `${makeAiResult(original, selectedTone)}\n\n조금 더 다듬은 버전 ${aiRedraftCount}`;
    showToast("선택한 톤으로 다시 다듬었어요.");
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("초안으로 저장했어요."));
  qs("[data-ai-send]").addEventListener("click", () => {
    if (!state.connected) {
      openConnectModal();
      return;
    }
    showToast("최종 메시지만 상대에게 보냈어요.");
    closeModal();
  });
}

// Final AI result action flow override at EOF.
function nextAiTone(currentTone) {
  const index = aiTonePresets.indexOf(currentTone);
  return aiTonePresets[(index + 1 + aiTonePresets.length) % aiTonePresets.length] || aiTonePresets[0];
}

function openAiCancelConfirmModal(draft = {}) {
  openModal(`
    <div class="modal-sheet">
      <div class="between"><h3>정리를 취소할까요?</h3><button class="icon-btn" data-close aria-label="닫기">×</button></div>
      <div class="section-stack">
        <p>취소하면 AI 정리 결과가 저장되지 않아요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-discard>확인</button>
          <button class="primary-btn" data-ai-save-before-cancel>저장하기</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-ai-discard]").addEventListener("click", closeModal);
  qs("[data-ai-save-before-cancel]").addEventListener("click", () => {
    showToast("초안으로 저장했어요.");
    closeModal();
  });
  bindModalCloseButtons(qs("#modal"));
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = draft.result || makeAiResult(original, tone);
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <h3>원문</h3>
          <p class="readonly-source">${original}</p>
        </section>
        <div class="form-field">
          <label>AI 결과</label>
          <textarea id="aiResultText" class="diary-body-large">${result}</textarea>
        </div>
        <section class="tone-section">
          <h3>톤 선택</h3>
          <div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div>
        </section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>저장하기</button>
          <button class="primary-btn" data-ai-share>상대와 공유하기</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => openAiSourcePage({ original, tone }));
  qs("[data-ai-cancel-result]").addEventListener("click", () => openAiCancelConfirmModal({ original, tone, result: qs("#aiResultText").value }));
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const changedTone = nextAiTone(selectedTone);
    aiRedraftCount += 1;
    openAiResultPage({
      original,
      tone: changedTone,
      result: `${makeAiResult(original, changedTone)}\n\nAI가 ${changedTone} 톤으로 다시 다듬은 버전 ${aiRedraftCount}`
    });
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("초안으로 저장했어요."));
  qs("[data-ai-share]").addEventListener("click", () => {
    if (!state.connected) {
      openConnectModal();
      return;
    }
    openAiShareRecordPickerPage({ original, tone, result: qs("#aiResultText").value });
  });
}

function openAiShareRecordPickerPage(draft = {}) {
  const cards = state.memories.map((memory, index) => `
    <article class="record-picker-card">
      <div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.type}</span></div>
      <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
      <p>${memory.note}</p>
      <button class="primary-btn full" data-ai-share-record="${index}">이 기록 선택</button>
    </article>
  `).join("");
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-share-record-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-share-back aria-label="뒤로가기">←</button>
        <h3>공유할 기록 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="record-picker-list">${cards}</div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-ai-share-back]").addEventListener("click", () => openAiResultPage(draft));
  qsa("[data-ai-share-record]").forEach((button) => {
    button.addEventListener("click", () => openAiShareConfirmPage({ ...draft, memoryIndex: Number(button.dataset.aiShareRecord) }));
  });
}

function openAiShareConfirmPage(draft = {}) {
  const memory = state.memories[draft.memoryIndex] || state.memories[0];
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-share-confirm-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-share-confirm-back aria-label="뒤로가기">←</button>
        <h3>상대와 공유하기</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.scope}</span></div>
          <p class="meta">${memory.date} · ${memory.place}</p>
        </section>
        <section class="card">
          <h3>공유할 메시지</h3>
          <p class="readonly-source">${draft.result}</p>
        </section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-share-cancel>취소</button>
          <button class="primary-btn" data-ai-share-final>공유하기</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-ai-share-confirm-back]").addEventListener("click", () => openAiShareRecordPickerPage(draft));
  qs("[data-ai-share-cancel]").addEventListener("click", () => openAiResultPage(draft));
  qs("[data-ai-share-final]").addEventListener("click", () => {
    showToast("선택한 기록과 함께 상대에게 공유했어요.");
    closeModal();
  });
}

// Final AI interaction refinements at EOF.
function refineAiResultFromCurrent(text, tone) {
  const source = (text || "").trim() || "전하고 싶은 마음이 있어.";
  const byTone = {
    "부드럽게": `조금 더 부드럽게 말해볼게. ${source} 내 마음을 전하면서도 네가 부담스럽지 않게 함께 이야기하고 싶어.`,
    "다정하게": `다정하게 다시 적어볼게. ${source} 너를 아끼는 마음이 있어서 조심스럽지만 솔직히 나눠보고 싶어.`,
    "솔직하게": `솔직하게 다시 정리하면, ${source} 이 마음을 숨기기보다 우리 사이에서 차분히 꺼내보고 싶어.`,
    "짧게": `${source} 우리 이 이야기 잠깐 나눠볼 수 있을까?`,
    "진지하게": `진지하게 다시 정리하면, ${source} 서로의 마음을 놓치지 않도록 차분하게 이야기하고 싶어.`
  };
  return byTone[tone] || byTone["부드럽게"];
}

function openAiCancelConfirmOverlay() {
  const page = qs(".ai-result-page");
  if (!page || qs(".ai-confirm-overlay")) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>정리를 취소할까요?</h3>
        <p>확인하면 AI 정리 결과가 저장되지 않아요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-confirm>확인</button>
          <button class="primary-btn" data-ai-cancel-save>저장하기</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-ai-cancel-confirm]", page).addEventListener("click", () => {
    closeModal();
    setTab("diary");
  });
  qs("[data-ai-cancel-save]", page).addEventListener("click", () => {
    showToast("초안으로 저장했어요.");
    qs(".ai-confirm-overlay", page)?.remove();
  });
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = draft.result || makeAiResult(original, tone);
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <h3>원문</h3>
          <p class="readonly-source">${original}</p>
        </section>
        <div class="form-field">
          <label>AI 결과</label>
          <textarea id="aiResultText" class="diary-body-large">${result}</textarea>
        </div>
        <section class="tone-section">
          <h3>톤 선택</h3>
          <div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div>
        </section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>저장하기</button>
          <button class="primary-btn" data-ai-share>상대와 공유하기</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => openAiSourcePage({ original, tone }));
  qs("[data-ai-cancel-result]").addEventListener("click", openAiCancelConfirmOverlay);
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const currentResult = qs("#aiResultText").value;
    aiRedraftCount += 1;
    qs("#aiResultText").value = `${refineAiResultFromCurrent(currentResult, selectedTone)}\n\nAI가 현재 내용과 ${selectedTone} 톤을 반영해 다시 다듬은 버전 ${aiRedraftCount}`;
    showToast("현재 내용과 선택한 톤으로 다시 다듬었어요.");
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("초안으로 저장했어요."));
  qs("[data-ai-share]").addEventListener("click", () => {
    if (!state.connected) {
      openConnectModal();
      return;
    }
    openAiShareRecordPickerPage({ original, tone, result: qs("#aiResultText").value });
  });
}

function openAiShareRecordPickerPage(draft = {}) {
  const cards = state.memories.map((memory, index) => `
    <article class="record-picker-card">
      <div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.type}</span></div>
      <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
      <p>${memory.note}</p>
      <div class="record-picker-actions">
        <button class="ghost-btn" data-ai-share-preview="${index}">상세 보기</button>
        <button class="primary-btn" data-ai-share-record="${index}">선택 추가</button>
      </div>
    </article>
  `).join("");
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-share-record-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-share-back aria-label="뒤로가기">←</button>
        <h3>공유할 기록 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="record-picker-list">${cards}</div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-ai-share-back]").addEventListener("click", () => openAiResultPage(draft));
  qsa("[data-ai-share-preview]").forEach((button) => {
    button.addEventListener("click", () => openAiShareRecordPreviewPage(Number(button.dataset.aiSharePreview), draft));
  });
  qsa("[data-ai-share-record]").forEach((button) => {
    button.addEventListener("click", () => openAiShareConfirmPage({ ...draft, memoryIndex: Number(button.dataset.aiShareRecord) }));
  });
}

function openAiShareRecordPreviewPage(index, draft = {}) {
  const memory = state.memories[index] || state.memories[0];
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-preview-back aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역"><div class="memory-photo-main"><div class="memory-photo-scroll">${memoryPhotoScrollerLatest(7)}</div></div></section>
        <section class="card"><div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitMemoryTitleLatest(memory.title)}</h3><span class="meta">${memory.type}</span></div><p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p><p>${memory.note}</p></section>
        <div class="record-picker-actions">
          <button class="ghost-btn" data-ai-preview-cancel>취소</button>
          <button class="primary-btn" data-ai-preview-select>이 기록 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const backToPicker = () => openAiShareRecordPickerPage(draft);
  qs("[data-ai-preview-back]").addEventListener("click", backToPicker);
  qs("[data-ai-preview-cancel]").addEventListener("click", backToPicker);
  qs("[data-ai-preview-select]").addEventListener("click", () => openAiShareConfirmPage({ ...draft, memoryIndex: index }));
}

// Final diary detail, AI record-link and diary tab label overrides at EOF.
function renderDiaryDetailReadOnly(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list"><div class="linked-record-pill"><span>${detail.linked}</span></div></div>
        </section>
        ${detail.editable ? `<button class="primary-btn full" data-diary-edit>수정하기</button>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(backAction));
  const editButton = qs("[data-diary-edit]");
  if (editButton) {
    editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, backAction)));
  }
  bindActions(qs(".modal-sheet"));
}

function openDiaryDetail() {
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(state.diaries[0] || linkedDiariesLatest()[0]), closeModal);
}

function renderDiary() {
  const diary = qs("#diary");
  const targetScope = state.diaryView === "shared" ? "공유" : "개인";
  const diaries = state.diaries.filter((entry) => entry.scope === targetScope);
  diary.innerHTML = `
    <div class="section-stack">
      <div class="tabs"><button class="chip-btn ${state.diaryView === "shared" ? "active" : ""}" data-diary-view="shared">공유</button><button class="chip-btn ${state.diaryView === "personal" ? "active" : ""}" data-diary-view="personal">나만보기</button></div>
      <button class="primary-btn full" data-action="diary-scope-first">일기 쓰기</button>
      <div class="list">${diaries.map((entry) => `<article class="diary-card" data-action="diary-detail"><div class="between"><h3>${entry.title}</h3><span class="meta">${entry.scope === "개인" ? "나만보기" : "공유"}</span></div><p>${entry.body}</p><div class="tag-row" style="margin-top:10px">${entry.feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div></article>`).join("")}</div>
    </div>
  `;
  qsa("[data-diary-view]", diary).forEach((button) => {
    button.addEventListener("click", () => {
      state.diaryView = button.dataset.diaryView;
      renderDiary();
    });
  });
  bindActions(diary);
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = draft.result || makeAiResult(original, tone);
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card"><h3>원문</h3><p class="readonly-source">${original}</p></section>
        <div class="form-field"><label>AI 결과</label><textarea id="aiResultText" class="diary-body-large">${result}</textarea></div>
        <section class="tone-section"><h3>톤 선택</h3><div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div></section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>저장하기</button>
          <button class="primary-btn" data-ai-share>기록 연결 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => openAiSourcePage({ original, tone }));
  qs("[data-ai-cancel-result]").addEventListener("click", openAiCancelConfirmOverlay);
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const currentResult = qs("#aiResultText").value;
    aiRedraftCount += 1;
    qs("#aiResultText").value = `${refineAiResultFromCurrent(currentResult, selectedTone)}\n\nAI가 현재 내용과 ${selectedTone} 톤을 반영해 다시 다듬은 버전 ${aiRedraftCount}`;
    showToast("현재 내용과 선택한 톤으로 다시 다듬었어요.");
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("초안으로 저장했어요."));
  qs("[data-ai-share]").addEventListener("click", () => openAiShareRecordPickerPage({ original, tone, result: qs("#aiResultText").value }));
}

function openAiShareRecordPickerPage(draft = {}) {
  const cards = state.memories.map((memory, index) => `
    <article class="record-picker-card">
      <div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.type}</span></div>
      <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
      <p>${memory.note}</p>
      <div class="record-picker-actions">
        <button class="ghost-btn" data-ai-share-preview="${index}">상세 보기</button>
        <button class="primary-btn" data-ai-share-record="${index}">선택 추가</button>
      </div>
    </article>
  `).join("");
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-share-record-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-share-back aria-label="뒤로가기">←</button>
        <h3>연결할 기록 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack"><div class="record-picker-list">${cards}</div></div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-ai-share-back]").addEventListener("click", () => openAiResultPage(draft));
  qsa("[data-ai-share-preview]").forEach((button) => button.addEventListener("click", () => openAiShareRecordPreviewPage(Number(button.dataset.aiSharePreview), draft)));
  qsa("[data-ai-share-record]").forEach((button) => button.addEventListener("click", () => openAiRecordScopeNotice({ ...draft, memoryIndex: Number(button.dataset.aiShareRecord) })));
}

function openAiShareRecordPreviewPage(index, draft = {}) {
  const memory = state.memories[index] || state.memories[0];
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-preview-back aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역"><div class="memory-photo-main"><div class="memory-photo-scroll">${memoryPhotoScrollerLatest(7)}</div></div></section>
        <section class="card"><div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitMemoryTitleLatest(memory.title)}</h3><span class="meta">${memory.type}</span></div><p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p><p>${memory.note}</p></section>
        <div class="record-picker-actions"><button class="ghost-btn" data-ai-preview-cancel>취소</button><button class="primary-btn" data-ai-preview-select>이 기록 추가</button></div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const backToPicker = () => openAiShareRecordPickerPage(draft);
  qs("[data-ai-preview-back]").addEventListener("click", backToPicker);
  qs("[data-ai-preview-cancel]").addEventListener("click", backToPicker);
  qs("[data-ai-preview-select]").addEventListener("click", () => openAiRecordScopeNotice({ ...draft, memoryIndex: index }));
}

function openAiRecordScopeNotice(draft = {}) {
  const memory = state.memories[draft.memoryIndex] || state.memories[0];
  openModal(`
    <div class="modal-sheet">
      <div class="section-stack">
        <section class="card"><h3>기록을 연결할까요?</h3><p>상대방과 공유하면 우리 둘이 보기로 전환되고, 나만 보기 기록은 내 공유 유형으로 바뀝니다.</p></section>
        <section class="card"><div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.scope}</span></div><p class="meta">${memory.date} · ${memory.place}</p></section>
        <div class="ai-action-grid"><button class="ghost-btn" data-ai-scope-cancel>취소</button><button class="primary-btn" data-ai-scope-confirm>확인</button></div>
      </div>
    </div>
  `);
  qs("[data-ai-scope-cancel]").addEventListener("click", () => openAiShareRecordPickerPage(draft));
  qs("[data-ai-scope-confirm]").addEventListener("click", () => openAiShareConfirmPage({ ...draft, linkedScope: memory.scope === "나만 보기" ? "내 공유" : memory.scope }));
}

function openAiShareConfirmPage(draft = {}) {
  const memory = state.memories[draft.memoryIndex] || state.memories[0];
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-share-confirm-page">
      <header class="notification-header"><button class="notification-nav-btn" data-ai-share-confirm-back aria-label="뒤로가기">←</button><h3>기록 연결 완료</h3><span class="notification-header-spacer" aria-hidden="true"></span></header>
      <div class="section-stack">
        <section class="card"><div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${draft.linkedScope || memory.scope}</span></div><p class="meta">${memory.date} · ${memory.place}</p></section>
        <section class="card"><h3>연결된 메시지</h3><p class="readonly-source">${draft.result}</p></section>
        <button class="primary-btn full" data-ai-link-final>확인</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-ai-share-confirm-back]").addEventListener("click", () => openAiShareRecordPickerPage(draft));
  qs("[data-ai-link-final]").addEventListener("click", () => {
    showToast("기록 연결을 추가했어요.");
    closeModal();
  });
}

// Final record-link overlay and diary-tab routing overrides at EOF.
function getCurrentLinkedMemoryForAi(draft = {}) {
  if (typeof draft.memoryIndex === "number") return state.memories[draft.memoryIndex];
  if (typeof state.activeMemoryIndex === "number") return state.memories[state.activeMemoryIndex];
  const linkedTitle = draft.linked || qs(".linked-record-pill span")?.textContent?.trim();
  return state.memories.find((memory) => memory.title === linkedTitle) || state.memories[0];
}

function openAiShareRecordPickerPage(draft = {}) {
  const currentMemory = getCurrentLinkedMemoryForAi(draft);
  const cards = state.memories.map((memory, index) => `
    <article class="record-picker-card">
      <div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.type}</span></div>
      <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
      <p>${memory.note}</p>
      <div class="record-picker-actions">
        <button class="ghost-btn" data-ai-share-preview="${index}">상세 보기</button>
        <button class="primary-btn" data-ai-share-record="${index}">선택 추가</button>
      </div>
    </article>
  `).join("");
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-share-record-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-share-back aria-label="뒤로가기">←</button>
        <h3>연결할 기록 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <div class="between"><h3>현재 연결된 기록</h3><span class="meta">${currentMemory?.scope || "없음"}</span></div>
          <p>${currentMemory ? currentMemory.title : "아직 연결된 기록이 없어요."}</p>
        </section>
        <div class="record-picker-list">${cards}</div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-ai-share-back]").addEventListener("click", () => openAiResultPage(draft));
  qsa("[data-ai-share-preview]").forEach((button) => button.addEventListener("click", () => openAiShareRecordPreviewPage(Number(button.dataset.aiSharePreview), draft)));
  qsa("[data-ai-share-record]").forEach((button) => button.addEventListener("click", () => openAiRecordScopeNoticeOverlay({ ...draft, memoryIndex: Number(button.dataset.aiShareRecord) })));
}

function openAiShareRecordPreviewPage(index, draft = {}) {
  const memory = state.memories[index] || state.memories[0];
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-preview-back aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역"><div class="memory-photo-main"><div class="memory-photo-scroll">${memoryPhotoScrollerLatest(7)}</div></div></section>
        <section class="card"><div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitMemoryTitleLatest(memory.title)}</h3><span class="meta">${memory.type}</span></div><p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p><p>${memory.note}</p></section>
        <div class="record-picker-actions"><button class="ghost-btn" data-ai-preview-cancel>취소</button><button class="primary-btn" data-ai-preview-select>이 기록 추가</button></div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const backToPicker = () => openAiShareRecordPickerPage(draft);
  qs("[data-ai-preview-back]").addEventListener("click", backToPicker);
  qs("[data-ai-preview-cancel]").addEventListener("click", backToPicker);
  qs("[data-ai-preview-select]").addEventListener("click", () => openAiShareRecordPickerPage({ ...draft, memoryIndex: index, pendingNotice: true }));
  setTimeout(() => {
    if (draft.pendingNotice) openAiRecordScopeNoticeOverlay({ ...draft, memoryIndex: index, pendingNotice: false });
  }, 0);
}

function openAiRecordScopeNoticeOverlay(draft = {}) {
  const page = qs(".ai-share-record-page");
  if (!page || qs(".ai-confirm-overlay")) return;
  const memory = state.memories[draft.memoryIndex] || state.memories[0];
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>기록을 연결할까요?</h3>
        <p>상대방과 공유하면 우리 둘이 보기로 전환되고, 나만 보기 기록은 내 공유 유형으로 바뀝니다.</p>
        <section class="card"><div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.scope}</span></div><p class="meta">${memory.date} · ${memory.place}</p></section>
        <section class="card"><h3>연결된 일기</h3><p class="readonly-source">${draft.result || "AI로 정리한 일기 내용"}</p></section>
        <div class="ai-action-grid"><button class="ghost-btn" data-ai-scope-cancel>취소</button><button class="primary-btn" data-ai-scope-confirm>확인</button></div>
      </div>
    </div>
  `);
  qs("[data-ai-scope-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-ai-scope-confirm]", page).addEventListener("click", () => {
    showToast("기록 연결을 추가했어요.");
    closeModal();
    setTab("diary");
  });
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = draft.result || makeAiResult(original, tone);
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card"><h3>원문</h3><p class="readonly-source">${original}</p></section>
        <div class="form-field"><label>AI 결과</label><textarea id="aiResultText" class="diary-body-large">${result}</textarea></div>
        <section class="tone-section"><h3>톤 선택</h3><div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div></section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>저장하기</button>
          <button class="primary-btn" data-ai-share>기록 연결 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => openAiSourcePage({ original, tone }));
  qs("[data-ai-cancel-result]").addEventListener("click", openAiCancelConfirmOverlay);
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const currentResult = qs("#aiResultText").value;
    aiRedraftCount += 1;
    qs("#aiResultText").value = `${refineAiResultFromCurrent(currentResult, selectedTone)}\n\nAI가 현재 내용과 ${selectedTone} 톤을 반영해 다시 다듬은 버전 ${aiRedraftCount}`;
    showToast("현재 내용과 선택한 톤으로 다시 다듬었어요.");
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("초안으로 저장했어요."));
  qs("[data-ai-share]").addEventListener("click", () => openAiShareRecordPickerPage({ original, tone, result: qs("#aiResultText").value }));
}

// Final linked diary notice card refinement at EOF.
function latestAiResultOnly(result = "") {
  const text = String(result || "").trim();
  if (!text) return "AI로 정리한 일기 내용";
  return text.replace(/\n\nAI가 .*$/s, "").trim() || text;
}

function openAiRecordScopeNoticeOverlay(draft = {}) {
  const page = qs(".ai-share-record-page");
  if (!page || qs(".ai-confirm-overlay")) return;
  const memory = state.memories[draft.memoryIndex] || state.memories[0];
  const latestResult = latestAiResultOnly(draft.result);
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>기록을 연결할까요?</h3>
        <p>상대방과 공유하면 우리 둘이 보기로 전환되고, 나만 보기 기록은 내 공유 유형으로 바뀝니다.</p>
        <section class="card"><div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.scope}</span></div><p class="meta">${memory.date} · ${memory.place}</p></section>
        <section class="card"><div class="between"><h3>연결된 일기</h3><span class="linked-diary-type">내 공유</span></div><p class="readonly-source">${latestResult}</p></section>
        <div class="ai-action-grid"><button class="ghost-btn" data-ai-scope-cancel>취소</button><button class="primary-btn" data-ai-scope-confirm>확인</button></div>
      </div>
    </div>
  `);
  qs("[data-ai-scope-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-ai-scope-confirm]", page).addEventListener("click", () => {
    showToast("기록 연결을 추가했어요.");
    closeModal();
    setTab("diary");
  });
}

// Final record-link scope choice override at EOF.
function openAiRecordScopeNoticeOverlay(draft = {}) {
  const page = qs(".ai-share-record-page");
  if (!page || qs(".ai-confirm-overlay")) return;
  const memory = state.memories[draft.memoryIndex] || state.memories[0];
  const latestResult = latestAiResultOnly(draft.result);
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>기록을 연결할까요?</h3>
        <section class="card"><div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.scope}</span></div><p class="meta">${memory.date} · ${memory.place}</p></section>
        <section class="tone-section">
          <h3>일기 공개 범위</h3>
          <div class="chip-row" data-linked-diary-scope>
            <button class="chip-btn active" data-scope-value="나만보기">나만보기</button>
            <button class="chip-btn" data-scope-value="내 공유">내 공유</button>
          </div>
        </section>
        <section class="card"><h3>연결된 일기</h3><p class="readonly-source">${latestResult}</p></section>
        <div class="ai-action-grid"><button class="ghost-btn" data-ai-scope-cancel>취소</button><button class="primary-btn" data-ai-scope-confirm>확인</button></div>
      </div>
    </div>
  `);
  qsa("[data-linked-diary-scope] .chip-btn", page).forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-linked-diary-scope] .chip-btn", page).forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-ai-scope-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-ai-scope-confirm]", page).addEventListener("click", () => {
    const selectedScope = qs("[data-linked-diary-scope] .chip-btn.active", page)?.dataset.scopeValue || "나만보기";
    showToast(`${selectedScope} 일기로 기록 연결을 추가했어요.`);
    closeModal();
    setTab("diary");
  });
}

// Final conditional diary-scope choice and share confirmation override at EOF.
function isMemoryPrivateScope(memory) {
  return String(memory?.scope || "").includes("나만") || String(memory?.scope || "").includes("?섎쭔");
}

function openAiRecordScopeNoticeOverlay(draft = {}) {
  const page = qs(".ai-share-record-page");
  if (!page || qs(".ai-confirm-overlay")) return;
  const memory = state.memories[draft.memoryIndex] || state.memories[0];
  const latestResult = latestAiResultOnly(draft.result);
  const isPrivate = isMemoryPrivateScope(memory);
  const scopeButtons = isPrivate
    ? `<button class="chip-btn active" data-scope-value="나만보기">나만보기</button>`
    : `<button class="chip-btn active" data-scope-value="나만보기">나만보기</button><button class="chip-btn" data-scope-value="내 공유">내 공유</button>`;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet" data-record-link-sheet>
        <h3>기록을 연결할까요?</h3>
        <section class="card"><div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.scope}</span></div><p class="meta">${memory.date} · ${memory.place}</p></section>
        <section class="tone-section">
          <h3>일기 공개 범위</h3>
          <div class="chip-row" data-linked-diary-scope>${scopeButtons}</div>
        </section>
        <section class="card"><h3>연결된 일기</h3><p class="readonly-source">${latestResult}</p></section>
        <div class="ai-action-grid"><button class="ghost-btn" data-ai-scope-cancel>취소</button><button class="primary-btn" data-ai-scope-confirm>확인</button></div>
      </div>
    </div>
  `);
  qsa("[data-linked-diary-scope] .chip-btn", page).forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-linked-diary-scope] .chip-btn", page).forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-ai-scope-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-ai-scope-confirm]", page).addEventListener("click", () => {
    const selectedScope = qs("[data-linked-diary-scope] .chip-btn.active", page)?.dataset.scopeValue || "나만보기";
    if (selectedScope === "내 공유") {
      openAiShareDiaryConfirmOverlay(draft);
      return;
    }
    showToast("나만보기 일기로 기록 연결을 추가했어요.");
    closeModal();
    setTab("diary");
  });
}

function openAiShareDiaryConfirmOverlay(draft = {}) {
  const page = qs(".ai-share-record-page");
  const overlay = qs(".ai-confirm-overlay", page);
  const sheet = qs("[data-record-link-sheet]", page);
  if (!page || !overlay || !sheet) return;
  sheet.innerHTML = `
    <h3>상대방과 공유하시겠습니까?</h3>
    <p>내 공유 일기로 저장하면 상대가 함께 볼 수 있어요.</p>
    <div class="ai-action-grid"><button class="ghost-btn" data-ai-share-diary-cancel>취소</button><button class="primary-btn" data-ai-share-diary-confirm>공유하기</button></div>
  `;
  qs("[data-ai-share-diary-cancel]", sheet).addEventListener("click", () => {
    overlay.remove();
    openAiRecordScopeNoticeOverlay(draft);
  });
  qs("[data-ai-share-diary-confirm]", sheet).addEventListener("click", () => {
    showToast("내 공유 일기로 기록 연결을 추가했어요.");
    closeModal();
    setTab("diary");
  });
}

// Final AI back-navigation override at EOF.
function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = draft.result || makeAiResult(original, tone);
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card"><h3>원문</h3><p class="readonly-source">${original}</p></section>
        <div class="form-field"><label>AI 결과</label><textarea id="aiResultText" class="diary-body-large">${result}</textarea></div>
        <section class="tone-section"><h3>톤 선택</h3><div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div></section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>저장하기</button>
          <button class="primary-btn" data-ai-share>기록 연결 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => {
    modalHistory.pop();
    runWithoutModalHistory(() => openAiSourcePage({ original, tone }));
  });
  qs("[data-ai-cancel-result]").addEventListener("click", openAiCancelConfirmOverlay);
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const currentResult = qs("#aiResultText").value;
    aiRedraftCount += 1;
    qs("#aiResultText").value = `${refineAiResultFromCurrent(currentResult, selectedTone)}\n\nAI가 현재 내용과 ${selectedTone} 톤을 반영해 다시 다듬은 버전 ${aiRedraftCount}`;
    showToast("현재 내용과 선택한 톤으로 다시 다듬었어요.");
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("초안으로 저장했어요."));
  qs("[data-ai-share]").addEventListener("click", () => openAiShareRecordPickerPage({ original, tone, result: qs("#aiResultText").value }));
}

// Final diary-detail back target and linked-record scope badges at EOF.
function scopeLabelForRecord(memory) {
  const scope = String(memory?.scope || "");
  if (scope.includes("나만") || scope.includes("?섎쭔")) return "나만 보기";
  return "우리 둘이 보기";
}

function recordByTitle(title, fallbackIndex = 0) {
  return state.memories.find((memory) => memory.title === title) || state.memories[fallbackIndex] || state.memories[0];
}

function renderLinkedRecordCards(linkedTitle, linkedMemoryIndex = null) {
  const records = linkedTitle && linkedTitle !== "관련 기록 없음" && linkedTitle !== "愿??湲곕줉 ?놁쓬"
    ? [recordByTitle(linkedTitle, linkedMemoryIndex ?? 0)]
    : state.memories.slice(0, 1);
  return `<section class="card linked-record-card"><div class="between"><h3>관련 기록 연결</h3><span class="meta">${records.length}개</span></div><div class="linked-record-list">${records.map((record) => `<div class="linked-record-pill"><span>${record.title}</span><em class="linked-record-scope">${scopeLabelForRecord(record)}</em></div>`).join("")}</div><button class="ghost-btn full" data-diary-record-picker>기록 연결 추가</button></section>`;
}

function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedRecord = recordByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0));
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list"><div class="linked-record-pill"><span>${linkedRecord.title}</span><em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em></div></div>
        </section>
        ${detail.editable ? `<button class="primary-btn full" data-diary-edit>수정하기</button>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  const editButton = qs("[data-diary-edit]");
  if (editButton) {
    editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  }
  bindActions(qs(".modal-sheet"));
}

function openDiaryDetail() {
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(state.diaries[0] || linkedDiariesLatest()[0]), () => openMemoryDetailLatestV3(memoryIndex));
}

function openLinkedDiaryDetailLatest(index, backAction = null) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(diary, index), backAction || (() => openMemoryDetailLatestV3(memoryIndex)));
}

function openLinkedDiaryDetailLatest(index, backAction = null) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(diary, index), resolvedBackAction);
}

function openDiaryDetail() {
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(state.diaries[0] || linkedDiariesLatest()[0]), closeModal);
}

// Final diary editor button wording/original-save override at EOF.
function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>${heading}</h3><span class="notification-header-spacer" aria-hidden="true"></span></header><div class="section-stack"><div class="chip-row" data-diary-scope><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}${renderLinkedRecordCards(linkedTitle, linkedMemoryIndex)}<button class="ghost-btn full" data-action="ai-message">AI로 정리하기</button><button class="ghost-btn full" data-save-original-diary>원본으로 저장</button><button class="primary-btn full" data-save-diary>${heading === "일기 수정" || heading === "일기 상세" ? "수정 저장" : "임시 저장"}</button></div></div>`);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  qs("[data-diary-record-picker]").addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  qs("[data-save-original-diary]").addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "원본으로 저장했어요."));
  qs("[data-save-diary]").addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, heading === "일기 수정" || heading === "일기 상세" ? "일기를 수정했어요." : "일기를 임시 저장했어요."));
  bindActions(qs(".modal-sheet"));
}

function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
  state.diaries.unshift({ title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기", body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문", scope: qs("[data-diary-scope] .chip-btn.active")?.textContent.includes("상대") ? "공유" : "개인", feelings: selectedFeelings.length ? selectedFeelings : ["고마움"], linked: linkedTitle, author: "나" });
  closeModal();
  renderDiary();
  showToast(toastMessage);
}

// Final simplification overrides at EOF.
function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  const isEditMode = heading === "일기 수정" || heading === "일기 상세";
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>${heading}</h3><span class="notification-header-spacer" aria-hidden="true"></span></header><div class="section-stack"><div class="chip-row" data-diary-scope><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}${renderLinkedRecordCards(linkedTitle, linkedMemoryIndex)}<button class="ghost-btn full" data-action="ai-message">AI로 정리하기</button>${isEditMode ? "" : `<button class="ghost-btn full" data-save-original-diary>원본으로 저장</button>`}<button class="primary-btn full" data-save-diary>${isEditMode ? "수정 저장" : "임시 저장"}</button></div></div>`);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  qs("[data-diary-record-picker]").addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  const originalButton = qs("[data-save-original-diary]");
  if (originalButton) originalButton.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "원본으로 저장했어요."));
  qs("[data-save-diary]").addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, isEditMode ? "일기를 수정했어요." : "일기를 임시 저장했어요."));
  bindActions(qs(".modal-sheet"));
}

function openAiShareRecordPickerPage(draft = {}) {
  const cards = state.memories.map((memory, index) => `
    <article class="record-picker-card">
      <div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="meta">${memory.type}</span></div>
      <p class="meta">${memory.date} · ${memory.place} · ${memory.scope}</p>
      <p>${memory.note}</p>
      <div class="record-picker-actions">
        <button class="ghost-btn" data-ai-share-preview="${index}">상세 보기</button>
        <button class="primary-btn" data-ai-share-record="${index}">선택 추가</button>
      </div>
    </article>
  `).join("");
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-share-record-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-share-back aria-label="뒤로가기">←</button>
        <h3>연결할 기록 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack"><div class="record-picker-list">${cards}</div></div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-ai-share-back]").addEventListener("click", () => openAiResultPage(draft));
  qsa("[data-ai-share-preview]").forEach((button) => button.addEventListener("click", () => openAiShareRecordPreviewPage(Number(button.dataset.aiSharePreview), draft)));
  qsa("[data-ai-share-record]").forEach((button) => button.addEventListener("click", () => openAiRecordScopeNoticeOverlay({ ...draft, memoryIndex: Number(button.dataset.aiShareRecord) })));
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = draft.result || makeAiResult(original, tone);
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card"><h3>원문</h3><p class="readonly-source">${original}</p></section>
        <div class="form-field"><label>AI 결과</label><textarea id="aiResultText" class="diary-body-large">${result}</textarea></div>
        <section class="tone-section"><h3>톤 선택</h3><div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div></section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>저장하기</button>
          <button class="primary-btn" data-ai-share>기록 연결 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => {
    modalHistory.pop();
    runWithoutModalHistory(() => openAiSourcePage({ original, tone }));
  });
  qs("[data-ai-cancel-result]").addEventListener("click", openAiCancelConfirmOverlay);
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const currentResult = qs("#aiResultText").value;
    qs("#aiResultText").value = refineAiResultFromCurrent(currentResult, selectedTone);
    showToast("현재 내용과 선택한 톤으로 다시 다듬었어요.");
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("초안으로 저장했어요."));
  qs("[data-ai-share]").addEventListener("click", () => openAiShareRecordPickerPage({ original, tone, result: qs("#aiResultText").value }));
}

// Final memory card/detail scope/type placement override at EOF.
function memoryCards(memories, homeCompact = false) {
  return memories
    .map((memory, index) => `
      <article class="memory-card ${homeCompact ? "home-memory-card" : ""}" role="button" tabindex="0" data-action="memory-detail" data-index="${index}">
        <div class="photo-stack" aria-label="사진 미리보기"></div>
        <div>
          <div class="${homeCompact ? "home-memory-title" : "between"}"><strong>${memory.title}</strong><span class="linked-record-scope">${scopeLabelForRecord(memory)}</span></div>
          <p class="${homeCompact ? "home-memory-copy" : ""}">${memory.note}</p>
          <div class="tag-row ${homeCompact ? "home-memory-meta" : ""}" style="margin-top:8px"><span class="meta">${memory.date}</span><span class="meta">${memory.place}</span><span class="meta">${memory.type}</span></div>
        </div>
      </article>
    `)
    .join("");
}

function openMemoryDetailLatestV3(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역"><div class="memory-photo-main"><div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div></div></section>
        <section class="card">
          <div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3><span class="linked-record-scope">${scopeLabelForRecord(memory)}</span></div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
          <p>${memory.note}</p>
        </section>
        <section class="card emotion-split-card"><div class="emotion-split"><div class="emotion-panel"><h3>내 감정</h3><div class="tag-row emotion-badge-row">${memory.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div></div><div class="emotion-divider" aria-hidden="true"></div><div class="emotion-panel"><h3>상대 감정</h3><div class="tag-row emotion-badge-row"><span class="chip-btn">고마움</span><span class="chip-btn">다정함</span></div></div></div></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div><div class="linked-diary-list">${linkedDiaryCardsLatest()}</div></section>
        <button class="primary-btn full" data-memory-edit-page data-index="${index}">기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(index));
  bindActions(qs(".modal-sheet"));
}

// Final diary edit scope-change confirmation override at EOF.
function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active")?.textContent || "나만 보기";
  const nextScope = selectedScopeText.includes("상대") ? "공유" : "개인";
  const draft = {
    title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기",
    body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문",
    scope: nextScope,
    feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
    linked: linkedTitle,
    author: "나"
  };
  const isEditMode = heading === "일기 수정" || heading === "일기 상세";
  if (isEditMode && nextScope === "공유") {
    openDiaryScopeChangeConfirm(draft, heading, linkedTitle);
    return;
  }
  state.diaries.unshift(draft);
  closeModal();
  renderDiary();
  showToast(toastMessage);
}

function openDiaryScopeChangeConfirm(draft, heading = "일기 수정", linkedTitle = "관련 기록 없음") {
  openModal(`
    <div class="modal-sheet">
      <div class="section-stack">
        <section class="card"><h3>일기 범위를 변경할까요?</h3><p>상대에게 공유로 변경하면 이 일기는 내 공유 일기로 저장되고 상대가 함께 볼 수 있어요.</p></section>
        <div class="ai-action-grid"><button class="ghost-btn" data-diary-scope-cancel>취소</button><button class="primary-btn" data-diary-scope-confirm>변경하기</button></div>
      </div>
    </div>
  `);
  qs("[data-diary-scope-cancel]").addEventListener("click", () => {
    renderDiaryEditor({ heading, diary: draft, linkedMemoryIndex: typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : null });
  });
  qs("[data-diary-scope-confirm]").addEventListener("click", () => {
    state.diaries.unshift(draft);
    closeModal();
    setTab("diary");
    showToast("일기 공개 범위를 변경했어요.");
  });
}

// Final diary edit back/scope-change overlay override at EOF.
function openLinkedDiaryEditLatest(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  renderDiaryEditor({
    heading: "일기 수정",
    diary: {
      title: detail.title,
      body: detail.body,
      scope: detail.scope,
      feelings: detail.feelings,
      linked: detail.linked,
      originalScope: detail.scope
    },
    linkedMemoryIndex: detail.linkedMemoryIndex
  });
  const saveButton = qs("[data-save-diary]");
  if (saveButton) saveButton.textContent = "수정 저장";
  const backButton = qs(".diary-write-page .notification-header .notification-nav-btn[data-close]");
  if (backButton) {
    backButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      runWithoutModalHistory(backAction);
    }, { capture: true });
  }
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  const isEditMode = heading === "일기 수정" || heading === "일기 상세";
  const originalScope = diary?.originalScope || diary?.scope || (diary?.type === "나만 보기" ? "개인" : diary?.type === "내 공유" ? "공유" : "개인");
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>${heading}</h3><span class="notification-header-spacer" aria-hidden="true"></span></header><div class="section-stack"><div class="chip-row" data-diary-scope data-original-scope="${originalScope}"><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}${renderLinkedRecordCards(linkedTitle, linkedMemoryIndex)}<button class="ghost-btn full" data-action="ai-message">AI로 정리하기</button>${isEditMode ? "" : `<button class="ghost-btn full" data-save-original-diary>원본으로 저장</button>`}<button class="primary-btn full" data-save-diary>${isEditMode ? "수정 저장" : "임시 저장"}</button></div></div>`);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  qs("[data-diary-record-picker]").addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  const originalButton = qs("[data-save-original-diary]");
  if (originalButton) originalButton.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "원본으로 저장했어요."));
  qs("[data-save-diary]").addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, isEditMode ? "일기를 수정했어요." : "일기를 임시 저장했어요."));
  bindActions(qs(".modal-sheet"));
}

function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active")?.textContent || "나만 보기";
  const nextScope = selectedScopeText.includes("상대") ? "공유" : "개인";
  const originalScope = qs("[data-diary-scope]")?.dataset.originalScope || nextScope;
  const draft = {
    title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기",
    body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문",
    scope: nextScope,
    originalScope,
    feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
    linked: linkedTitle,
    author: "나"
  };
  const isEditMode = heading === "일기 수정" || heading === "일기 상세";
  if (isEditMode && originalScope !== nextScope) {
    openDiaryScopeChangeConfirmOverlay(draft, heading, linkedTitle);
    return;
  }
  state.diaries.unshift(draft);
  closeModal();
  renderDiary();
  showToast(toastMessage);
}

function openDiaryScopeChangeConfirmOverlay(draft, heading = "일기 수정", linkedTitle = "관련 기록 없음") {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  const nextLabel = draft.scope === "공유" ? "상대에게 공유" : "나만 보기";
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>일기 범위를 변경할까요?</h3>
        <p>일기 공개 범위가 ${nextLabel}(으)로 변경됩니다.</p>
        <div class="ai-action-grid"><button class="ghost-btn" data-diary-scope-cancel>취소</button><button class="primary-btn" data-diary-scope-confirm>변경하기</button></div>
      </div>
    </div>
  `);
  qs("[data-diary-scope-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-scope-confirm]", page).addEventListener("click", () => {
    state.diaries.unshift(draft);
    closeModal();
    setTab("diary");
    showToast("일기 공개 범위를 변경했어요.");
  });
}

// Final AI redraft replacement and record picker badge override at EOF.
function refineAiResultFromCurrent(text, tone) {
  const source = latestAiResultOnly(text || "");
  const byTone = {
    "부드럽게": `조금 더 부드럽게 말해볼게. ${source} 내 마음을 전하면서도 네가 부담스럽지 않게 함께 이야기하고 싶어.`,
    "다정하게": `다정하게 다시 적어볼게. ${source} 너를 아끼는 마음이 있어서 조심스럽지만 솔직히 나눠보고 싶어.`,
    "솔직하게": `솔직하게 다시 정리하면, ${source} 이 마음을 숨기기보다 우리 사이에서 차분히 꺼내보고 싶어.`,
    "짧게": `${source} 우리 이 이야기 잠깐 나눠볼 수 있을까?`,
    "진지하게": `진지하게 다시 정리하면, ${source} 서로의 마음을 놓치지 않도록 차분하게 이야기하고 싶어.`
  };
  return byTone[tone] || byTone["부드럽게"];
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = latestAiResultOnly(draft.result || makeAiResult(original, tone));
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card"><h3>원문</h3><p class="readonly-source">${original}</p></section>
        <div class="form-field"><label>AI 결과</label><textarea id="aiResultText" class="diary-body-large">${result}</textarea></div>
        <section class="tone-section"><h3>톤 선택</h3><div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div></section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>임시 저장</button>
          <button class="primary-btn" data-ai-share>기록 연결 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => {
    modalHistory.pop();
    runWithoutModalHistory(() => openAiSourcePage({ original, tone }));
  });
  qs("[data-ai-cancel-result]").addEventListener("click", openAiCancelConfirmOverlay);
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const currentResult = qs("#aiResultText").value;
    qs("#aiResultText").value = refineAiResultFromCurrent(currentResult, selectedTone);
    showToast("현재 내용과 선택한 톤으로 다시 다듬었어요.");
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("임시 저장했어요."));
  qs("[data-ai-share]").addEventListener("click", () => openAiShareRecordPickerPage({ original, tone, result: qs("#aiResultText").value }));
}

// Final AI redraft replacement fix: clear the textarea and generate from the source,
// so the previous AI result never gets appended or reused.
function makeFreshAiRedraft(original, tone) {
  const source = cleanAiResultText(original || getAiSourceText()) || "전하고 싶은 마음이 있어.";
  const byTone = {
    "부드럽게": `내 마음을 조금 더 부드럽게 전하고 싶어. ${source} 우리 서로 편안하게 이야기할 수 있으면 좋겠어.`,
    "다정하게": `소중한 마음으로 말해볼게. ${source} 내 마음을 따뜻하게 받아주면 고마울 것 같아.`,
    "솔직하게": `${source} 이 마음을 오래 담아두기보다 솔직하게 이야기해보고 싶어.`,
    "짧게": `${source} 우리 잠깐 이야기해볼 수 있을까?`,
    "진지하게": `${source} 가볍게 넘기기보다 차분하게 이야기하고 서로의 마음을 확인하고 싶어.`
  };
  return byTone[tone] || byTone["부드럽게"];
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = cleanAiResultText(draft.result || makeAiResult(original, tone));
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">‹</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card"><h3>원문</h3><p class="readonly-source">${original}</p></section>
        <div class="form-field"><p class="ai-field-title">AI 결과</p><textarea id="aiResultText" class="diary-body-large">${result}</textarea></div>
        <section class="tone-section"><h3>톤 선택</h3><div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div></section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>임시 저장</button>
          <button class="primary-btn" data-ai-share>기록 연결 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => {
    modalHistory.pop();
    runWithoutModalHistory(() => openAiSourcePage({ original, tone }));
  });
  qs("[data-ai-cancel-result]").addEventListener("click", openAiCancelConfirmOverlay);
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const textarea = qs("#aiResultText");
    textarea.value = "";
    textarea.value = makeFreshAiRedraft(original, selectedTone);
    showToast("새 AI 결과로 완전히 교체했어요.");
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("임시 저장했어요."));
  qs("[data-ai-share]").addEventListener("click", () => openAiShareRecordPickerPage({ original, tone, result: qs("#aiResultText").value }));
}

function openAiShareRecordPickerPage(draft = {}) {
  const cards = state.memories.map((memory, index) => `
    <article class="record-picker-card">
      <div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="linked-record-scope">${scopeLabelForRecord(memory)}</span></div>
      <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
      <p>${memory.note}</p>
      <div class="record-picker-actions">
        <button class="ghost-btn" data-ai-share-preview="${index}">상세 보기</button>
        <button class="primary-btn" data-ai-share-record="${index}">선택 추가</button>
      </div>
    </article>
  `).join("");
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-share-record-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-share-back aria-label="뒤로가기">←</button>
        <h3>연결할 기록 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack"><div class="record-picker-list">${cards}</div></div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-ai-share-back]").addEventListener("click", () => openAiResultPage(draft));
  qsa("[data-ai-share-preview]").forEach((button) => button.addEventListener("click", () => openAiShareRecordPreviewPage(Number(button.dataset.aiSharePreview), draft)));
  qsa("[data-ai-share-record]").forEach((button) => button.addEventListener("click", () => openAiRecordScopeNoticeOverlay({ ...draft, memoryIndex: Number(button.dataset.aiShareRecord) })));
}

// Final AI redraft hard-replace override at EOF.
function cleanAiResultText(text = "") {
  return String(text || "")
    .replace(/\n\nAI가 .*$/s, "")
    .replace(/\n\n조금 더 다듬은 버전 .*$/s, "")
    .replace(/AI가 현재 내용과.*$/s, "")
    .trim();
}

function refineAiResultFromCurrent(text, tone) {
  const source = cleanAiResultText(text) || "전하고 싶은 마음이 있어.";
  const byTone = {
    "부드럽게": `내 마음을 탓하듯 말하고 싶지는 않아. ${source} 우리 둘 다 편안하게 이야기할 수 있으면 좋겠어.`,
    "다정하게": `네가 소중해서 조심스럽게 말해보고 싶어. ${source} 내 마음을 알아주면 고마울 것 같아.`,
    "솔직하게": `${source} 이 마음을 오래 혼자 두기보다 솔직하게 이야기해보고 싶어.`,
    "짧게": `${source} 우리 잠깐 이야기해볼 수 있을까?`,
    "진지하게": `${source} 가볍게 넘기기보다 차분히 이야기하고 서로의 마음을 확인하고 싶어.`
  };
  return byTone[tone] || byTone["부드럽게"];
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = cleanAiResultText(draft.result || makeAiResult(original, tone));
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card"><h3>원문</h3><p class="readonly-source">${original}</p></section>
        <div class="form-field"><p class="ai-field-title">AI 결과</p><textarea id="aiResultText" class="diary-body-large">${result}</textarea></div>
        <section class="tone-section"><h3>톤 선택</h3><div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div></section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>임시 저장</button>
          <button class="primary-btn" data-ai-share>기록 연결 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => {
    modalHistory.pop();
    runWithoutModalHistory(() => openAiSourcePage({ original, tone }));
  });
  qs("[data-ai-cancel-result]").addEventListener("click", openAiCancelConfirmOverlay);
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const currentText = qs("#aiResultText").value;
    qs("#aiResultText").value = refineAiResultFromCurrent(currentText, selectedTone);
    showToast("현재 결과를 새 AI 결과로 교체했어요.");
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("임시 저장했어요."));
  qs("[data-ai-share]").addEventListener("click", () => openAiShareRecordPickerPage({ original, tone, result: qs("#aiResultText").value }));
}

// Final override: AI redraft must clear current textarea and replace from original + selected tone only.
function makeFreshAiRedraftFromOriginal(original, tone) {
  const source = cleanAiResultText(original || getAiSourceText()) || "전하고 싶은 마음이 있어.";
  const byTone = {
    "부드럽게": `내 마음을 조금 더 부드럽게 전하고 싶어. ${source} 우리 서로 편안하게 이야기할 수 있으면 좋겠어.`,
    "다정하게": `소중한 마음으로 말해볼게. ${source} 내 마음을 따뜻하게 받아주면 고마울 것 같아.`,
    "솔직하게": `${source} 이 마음을 오래 담아두기보다 솔직하게 이야기해보고 싶어.`,
    "짧게": `${source} 우리 잠깐 이야기해볼 수 있을까?`,
    "진지하게": `${source} 가볍게 넘기기보다 차분하게 이야기하고 서로의 마음을 확인하고 싶어.`
  };
  return byTone[tone] || byTone["부드럽게"];
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = cleanAiResultText(draft.result || makeAiResult(original, tone));
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">‹</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card"><h3>원문</h3><p class="readonly-source">${original}</p></section>
        <div class="form-field"><p class="ai-field-title">AI 결과</p><textarea id="aiResultText" class="diary-body-large">${result}</textarea></div>
        <section class="tone-section"><h3>톤 선택</h3><div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div></section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="ghost-btn" data-ai-save>임시 저장</button>
          <button class="primary-btn" data-ai-share>기록 연결 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => {
    modalHistory.pop();
    runWithoutModalHistory(() => openAiSourcePage({ original, tone }));
  });
  qs("[data-ai-cancel-result]").addEventListener("click", openAiCancelConfirmOverlay);
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const textarea = qs("#aiResultText");
    textarea.value = "";
    textarea.value = makeFreshAiRedraftFromOriginal(original, selectedTone);
    showToast("새 AI 결과로 완전히 교체했어요.");
  });
  qs("[data-ai-save]").addEventListener("click", () => showToast("임시 저장했어요."));
  qs("[data-ai-share]").addEventListener("click", () => openAiShareRecordPickerPage({ original, tone, result: qs("#aiResultText").value }));
}

// Final UX refinements: AI cancel wording, diary linked-record navigation, compact diary editor actions, photo-add overlay.
function openAiCancelConfirmOverlay() {
  const page = qs(".ai-result-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>정리를 취소할까요?</h3>
        <p>확인하면 AI 정리 결과가 저장되지 않아요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-confirm>확인</button>
          <button class="primary-btn" data-ai-cancel-save>임시 저장</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-ai-cancel-confirm]", page).addEventListener("click", () => {
    closeModal();
    setTab("diary");
  });
  qs("[data-ai-cancel-save]", page).addEventListener("click", () => {
    showToast("임시 저장했어요.");
    qs(".ai-confirm-overlay", page)?.remove();
  });
}

function recordIndexByTitle(title, fallbackIndex = 0) {
  const index = state.memories.findIndex((memory) => memory.title === title);
  return index >= 0 ? index : fallbackIndex;
}

function renderLinkedRecordCards(linkedTitle, linkedMemoryIndex = null) {
  const fallbackIndex = linkedMemoryIndex ?? 0;
  const records = linkedTitle && linkedTitle !== "관련 기록 없음"
    ? [state.memories[recordIndexByTitle(linkedTitle, fallbackIndex)] || state.memories[fallbackIndex] || state.memories[0]]
    : state.memories.slice(0, 1);
  return `<section class="card linked-record-card"><div class="between"><h3>관련 기록 연결</h3><span class="meta">${records.length}개</span></div><div class="linked-record-list">${records.map((record) => {
    const index = recordIndexByTitle(record.title, fallbackIndex);
    return `<button class="linked-record-pill linked-record-button" data-linked-record-detail="${index}"><span>${record.title}</span><em class="linked-record-scope">${scopeLabelForRecord(record)}</em></button>`;
  }).join("")}</div><button class="ghost-btn full" data-diary-record-picker>기록 연결 추가</button></section>`;
}

function bindLinkedRecordDetailNavigation(root = document, backAction = null) {
  qsa("[data-linked-record-detail]", root).forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.linkedRecordDetail || 0);
      openMemoryDetailLatestV3(Number.isFinite(index) ? index : 0, backAction || undefined);
    });
    button.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const index = Number(button.dataset.linkedRecordDetail || 0);
      openMemoryDetailLatestV3(Number.isFinite(index) ? index : 0, backAction || undefined);
    });
  });
}

function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0));
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list"><button class="linked-record-pill linked-record-button" data-linked-record-detail="${linkedIndex}"><span>${linkedRecord.title}</span><em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em></button></div>
        </section>
        ${detail.editable ? `<button class="primary-btn full" data-diary-edit>수정하기</button>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) {
    editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  }
  bindActions(qs(".modal-sheet"));
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  const isEditMode = heading === "일기 수정" || heading === "일기 상세";
  const originalScope = diary?.originalScope || diary?.scope || (diary?.type === "나만 보기" ? "개인" : diary?.type === "내 공유" ? "공유" : "개인");
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>${heading}</h3><span class="notification-header-spacer" aria-hidden="true"></span></header><div class="section-stack"><div class="chip-row" data-diary-scope data-original-scope="${originalScope}"><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}${renderLinkedRecordCards(linkedTitle, linkedMemoryIndex)}<div class="diary-editor-action-stack"><button class="ghost-btn full" data-action="ai-message">AI로 정리하기</button>${isEditMode ? "" : `<button class="ghost-btn full" data-save-original-diary>원본으로 저장</button>`}<button class="primary-btn full" data-save-diary>${isEditMode ? "수정 저장" : "임시 저장"}</button></div></div></div>`);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  qs("[data-diary-record-picker]").addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  const originalButton = qs("[data-save-original-diary]");
  if (originalButton) originalButton.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "원본으로 저장했어요."));
  qs("[data-save-diary]").addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, isEditMode ? "일기를 수정했어요." : "일기를 임시 저장했어요."));
  bindActions(qs(".modal-sheet"));
}

function openPhotoAddChoiceModal() {
  const memoryPage = qs(".memory-detail-page");
  if (!memoryPage) {
    openModal(`<div class="modal-sheet photo-add-sheet"><div class="between"><h3>사진 추가</h3><button class="icon-btn" data-close aria-label="닫기">×</button></div><div class="photo-add-actions"><button class="primary-btn" data-close>사진 촬영</button><button class="ghost-btn" data-close>앨범 보기</button></div></div>`);
    return;
  }
  qs(".photo-add-overlay", memoryPage)?.remove();
  memoryPage.insertAdjacentHTML("beforeend", `
    <div class="photo-add-overlay" role="dialog" aria-modal="true">
      <div class="photo-add-sheet">
        <div class="between"><h3>사진 추가</h3><button class="icon-btn" data-photo-add-close aria-label="닫기">×</button></div>
        <div class="photo-add-actions">
          <button class="primary-btn" data-photo-add-close>사진 촬영</button>
          <button class="ghost-btn" data-photo-add-close>앨범 보기</button>
        </div>
      </div>
    </div>
  `);
  qsa("[data-photo-add-close]", memoryPage).forEach((button) => button.addEventListener("click", () => qs(".photo-add-overlay", memoryPage)?.remove()));
}

// Final diary detail override: record back target, bordered linked records, and delete for my diaries.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <button class="linked-record-pill linked-record-button" data-linked-record-detail="${linkedIndex}">
              <span>${linkedRecord.title}</span>
              <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
            </button>
          </div>
        </section>
        ${detail.editable ? `<button class="primary-btn full" data-diary-edit>수정하기</button><button class="ghost-btn full" data-diary-delete>삭제</button>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) {
    editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  }
  const deleteButton = qs("[data-diary-delete]");
  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      runWithoutModalHistory(resolvedBackAction);
      showToast("일기를 삭제했어요.");
    });
  }
  bindActions(qs(".modal-sheet"));
}

// Final absolute overrides for diary detail entry/back and full-screen photo overlay.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <button class="linked-record-pill linked-record-button" data-linked-record-detail="${linkedIndex}">
              <span>${linkedRecord.title}</span>
              <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
            </button>
          </div>
        </section>
        ${detail.editable ? `<button class="primary-btn full" data-diary-edit>수정하기</button><button class="ghost-btn full" data-diary-delete>삭제</button>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const deleteButton = qs("[data-diary-delete]");
  if (deleteButton) deleteButton.addEventListener("click", () => {
    runWithoutModalHistory(resolvedBackAction);
    showToast("일기를 삭제했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function openDiaryDetail() {
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(state.diaries[0] || linkedDiariesLatest()[0]), () => openMemoryDetailLatestV3(memoryIndex));
}

function openLinkedDiaryDetailLatest(index, backAction = null) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(diary, index), backAction || (() => openMemoryDetailLatestV3(memoryIndex)));
}

function openPhotoAddChoiceModal() {
  const existing = qs(".photo-add-overlay");
  if (existing) existing.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="photo-add-overlay" role="dialog" aria-modal="true">
      <div class="photo-add-sheet">
        <div class="between"><h3>사진 추가</h3><button class="icon-btn" data-photo-add-close aria-label="닫기">×</button></div>
        <div class="photo-add-actions">
          <button class="primary-btn" data-photo-add-close>사진 촬영</button>
          <button class="ghost-btn" data-photo-add-close>앨범 보기</button>
        </div>
      </div>
    </div>
  `);
  qsa("[data-photo-add-close]", document.body).forEach((button) => button.addEventListener("click", () => qs(".photo-add-overlay")?.remove()));
}

// Final diary action layout/save behavior override.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <button class="linked-record-pill linked-record-button" data-linked-record-detail="${linkedIndex}">
              <span>${linkedRecord.title}</span>
              <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
            </button>
          </div>
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button><button class="ghost-btn" data-diary-delete>삭제</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const deleteButton = qs("[data-diary-delete]");
  if (deleteButton) deleteButton.addEventListener("click", () => {
    runWithoutModalHistory(resolvedBackAction);
    showToast("일기를 삭제했어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  const isEditMode = heading === "일기 수정" || heading === "일기 상세";
  const originalScope = diary?.originalScope || diary?.scope || (diary?.type === "나만 보기" ? "개인" : diary?.type === "내 공유" ? "공유" : "개인");
  const actionButtons = isEditMode
    ? `<div class="diary-editor-action-row"><button class="ghost-btn" data-action="ai-message">AI로 정리하기</button><button class="primary-btn" data-save-diary>수정 저장</button></div>`
    : `<div class="diary-editor-action-stack"><button class="ghost-btn full" data-action="ai-message">AI로 정리하기</button><button class="ghost-btn full" data-save-original-diary>원본으로 저장</button><button class="primary-btn full" data-save-diary>임시 저장</button></div>`;
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button><h3>${heading}</h3><span class="notification-header-spacer" aria-hidden="true"></span></header><div class="section-stack"><div class="chip-row" data-diary-scope data-original-scope="${originalScope}"><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}${renderLinkedRecordCards(linkedTitle, linkedMemoryIndex)}${actionButtons}</div></div>`);
  qs("#modal").classList.add("page-modal");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  qs("[data-diary-record-picker]").addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  const originalButton = qs("[data-save-original-diary]");
  if (originalButton) originalButton.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "원본으로 저장했어요."));
  qs("[data-save-diary]").addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, isEditMode ? "일기를 수정했어요." : "일기를 임시 저장했어요."));
  bindActions(qs(".modal-sheet"));
}

function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active")?.textContent || "나만 보기";
  const nextScope = selectedScopeText.includes("공유") ? "공유" : "개인";
  const originalScope = qs("[data-diary-scope]")?.dataset.originalScope || nextScope;
  const linkedIndex = recordIndexByTitle(linkedTitle, typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0);
  const draft = {
    title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기",
    body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문",
    scope: nextScope,
    originalScope,
    feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
    linked: linkedTitle,
    linkedMemoryIndex: linkedIndex,
    author: "나",
    editable: true
  };
  const isEditMode = heading === "일기 수정" || heading === "일기 상세";
  if (isEditMode && originalScope !== nextScope) {
    openDiaryScopeChangeConfirmOverlay(draft, heading, linkedTitle);
    return;
  }
  state.diaries.unshift(draft);
  if (isEditMode) {
    renderDiaryDetailReadOnly(normalizeDiaryForDetail(draft), () => openMemoryDetailLatestV3(linkedIndex));
  } else {
    closeModal();
    renderDiary();
  }
  showToast(toastMessage);
}

function openDiaryScopeChangeConfirmOverlay(draft, heading = "일기 수정", linkedTitle = "관련 기록 없음") {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  const nextLabel = draft.scope === "공유" ? "상대에게 공유" : "나만 보기";
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>일기 범위를 변경할까요?</h3>
        <p>일기 공개 범위가 ${nextLabel}(으)로 변경됩니다.</p>
        <div class="ai-action-grid"><button class="ghost-btn" data-diary-scope-cancel>취소</button><button class="primary-btn" data-diary-scope-confirm>변경하기</button></div>
      </div>
    </div>
  `);
  qs("[data-diary-scope-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-scope-confirm]", page).addEventListener("click", () => {
    const linkedIndex = recordIndexByTitle(linkedTitle, typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0);
    state.diaries.unshift(draft);
    qs(".ai-confirm-overlay", page)?.remove();
    renderDiaryDetailReadOnly(normalizeDiaryForDetail(draft), () => openMemoryDetailLatestV3(linkedIndex));
    showToast("일기 공개 범위를 변경했어요.");
  });
}

// Final diary delete confirmation override.
function openDiaryDeleteConfirmOverlay(backAction) {
  const page = qs(".diary-detail-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>삭제할까요?</h3>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-diary-delete-cancel>취소</button>
          <button class="primary-btn" data-diary-delete-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-delete-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-delete-confirm]", page).addEventListener("click", () => {
    qs(".ai-confirm-overlay", page)?.remove();
    runWithoutModalHistory(backAction);
    showToast("일기를 삭제했어요.");
  });
}

function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <button class="linked-record-pill linked-record-button" data-linked-record-detail="${linkedIndex}">
              <span>${linkedRecord.title}</span>
              <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
            </button>
          </div>
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button><button class="ghost-btn" data-diary-delete>삭제</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const deleteButton = qs("[data-diary-delete]");
  if (deleteButton) deleteButton.addEventListener("click", () => openDiaryDeleteConfirmOverlay(resolvedBackAction));
  bindActions(qs(".modal-sheet"));
}

// Final diary related-record unlink flow: no standalone delete button.
function openDiaryUnlinkDeleteConfirmOverlay(backAction) {
  const page = qs(".diary-detail-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>연결을 해제할까요?</h3>
        <p>이 일기는 연결된 기록에서 사라지며 삭제와 동일하게 처리돼요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-diary-unlink-cancel>취소</button>
          <button class="primary-btn" data-diary-unlink-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-unlink-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-unlink-confirm]", page).addEventListener("click", () => {
    qs(".ai-confirm-overlay", page)?.remove();
    runWithoutModalHistory(backAction);
    showToast("연결을 해제했어요.");
  });
}

function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <div class="linked-record-pill linked-record-button linked-record-detail-card">
              <button class="linked-record-main" data-linked-record-detail="${linkedIndex}">
                <span>${linkedRecord.title}</span>
                <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
              </button>
              ${detail.editable ? `<button class="ghost-btn linked-record-unlink" data-diary-unlink-record>연결 해제</button>` : ""}
            </div>
          </div>
          ${detail.editable ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const unlinkButton = qs("[data-diary-unlink-record]");
  if (unlinkButton) unlinkButton.addEventListener("click", () => openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction));
  const pickerButton = qs("[data-diary-record-picker]");
  if (pickerButton) pickerButton.addEventListener("click", () => openDiaryRecordPickerPage({ ...detail, heading: "일기 수정", linkedMemoryIndex: linkedIndex }));
  bindActions(qs(".modal-sheet"));
}

// Final linked-record card layout in diary detail.
function isPartnerSharedDiary(detail) {
  const type = String(detail?.type || "");
  const author = String(detail?.author || "");
  return type.includes("상대") || author.includes("상대") || type.includes("partner");
}

function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const canEditLinks = detail.editable && !isPartnerSharedDiary(detail);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <article class="linked-record-pill linked-record-detail-card">
              <div class="linked-record-title-row">
                <span>${linkedRecord.title}</span>
                <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
              </div>
              ${canEditLinks ? `<div class="linked-record-mini-actions"><button class="ghost-btn" data-linked-record-detail="${linkedIndex}">상세 보기</button><button class="ghost-btn" data-diary-unlink-record>삭제</button></div>` : ""}
            </article>
          </div>
          ${canEditLinks ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const unlinkButton = qs("[data-diary-unlink-record]");
  if (unlinkButton) unlinkButton.addEventListener("click", () => openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction));
  const pickerButton = qs("[data-diary-record-picker]");
  if (pickerButton) pickerButton.addEventListener("click", () => openDiaryRecordPickerPage({ ...detail, heading: "일기 수정", linkedMemoryIndex: linkedIndex }));
  bindActions(qs(".modal-sheet"));
}

// Final linked-record icon actions and right-aligned scope badge.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const canEditLinks = detail.editable && !isPartnerSharedDiary(detail);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <article class="linked-record-pill linked-record-detail-card">
              <div class="linked-record-title-row">
                <span>${linkedRecord.title}</span>
                <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
              </div>
              ${canEditLinks ? `<div class="linked-record-icon-actions"><button class="icon-btn" data-linked-record-detail="${linkedIndex}" aria-label="상세 보기" title="상세 보기">⌕</button><button class="icon-btn" data-diary-unlink-record aria-label="삭제" title="삭제">🗑</button></div>` : ""}
            </article>
          </div>
          ${canEditLinks ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const unlinkButton = qs("[data-diary-unlink-record]");
  if (unlinkButton) unlinkButton.addEventListener("click", () => openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction));
  const pickerButton = qs("[data-diary-record-picker]");
  if (pickerButton) pickerButton.addEventListener("click", () => openDiaryRecordPickerPage({ ...detail, heading: "일기 수정", linkedMemoryIndex: linkedIndex }));
  bindActions(qs(".modal-sheet"));
}

// Final CSS-icon linked-record actions.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const canEditLinks = detail.editable && !isPartnerSharedDiary(detail);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <article class="linked-record-pill linked-record-detail-card">
              <div class="linked-record-title-row">
                <span>${linkedRecord.title}</span>
                <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
              </div>
              ${canEditLinks ? `<div class="linked-record-icon-actions"><button class="icon-btn" data-linked-record-detail="${linkedIndex}" aria-label="상세 보기" title="상세 보기"><span class="css-icon css-icon-search" aria-hidden="true"></span></button><button class="icon-btn" data-diary-unlink-record aria-label="삭제" title="삭제"><span class="css-icon css-icon-trash" aria-hidden="true"></span></button></div>` : ""}
            </article>
          </div>
          ${canEditLinks ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const unlinkButton = qs("[data-diary-unlink-record]");
  if (unlinkButton) unlinkButton.addEventListener("click", () => openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction));
  const pickerButton = qs("[data-diary-record-picker]");
  if (pickerButton) pickerButton.addEventListener("click", () => openDiaryRecordPickerPage({ ...detail, heading: "일기 수정", linkedMemoryIndex: linkedIndex }));
  bindActions(qs(".modal-sheet"));
}

// Final related-record kebab dropdown menu.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const canEditLinks = detail.editable && !isPartnerSharedDiary(detail);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <article class="linked-record-pill linked-record-detail-card">
              <div class="linked-record-title-row has-menu">
                <span>${linkedRecord.title}</span>
                <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
                ${canEditLinks ? `<button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="더보기" title="더보기"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button>` : ""}
              </div>
              ${canEditLinks ? `<div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${linkedIndex}">상세 보기</button><button data-diary-unlink-record>삭제</button></div>` : ""}
            </article>
          </div>
          ${canEditLinks ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  const menuButton = qs("[data-linked-record-menu]");
  const menu = qs("[data-linked-record-dropdown]");
  if (menuButton && menu) {
    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      menu.hidden = !menu.hidden;
      menuButton.classList.toggle("active", !menu.hidden);
    });
  }
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const unlinkButton = qs("[data-diary-unlink-record]");
  if (unlinkButton) unlinkButton.addEventListener("click", () => openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction));
  const pickerButton = qs("[data-diary-record-picker]");
  if (pickerButton) pickerButton.addEventListener("click", () => openDiaryRecordPickerPage({ ...detail, heading: "일기 수정", linkedMemoryIndex: linkedIndex }));
  bindActions(qs(".modal-sheet"));
}

// Final related-record title left / scope+kebab right layout.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const canEditLinks = detail.editable && !isPartnerSharedDiary(detail);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <article class="linked-record-pill linked-record-detail-card">
              <div class="linked-record-title-row title-between">
                <span>${linkedRecord.title}</span>
                <div class="linked-record-right-tools">
                  <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
                  ${canEditLinks ? `<button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="더보기" title="더보기"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button>` : ""}
                </div>
              </div>
              ${canEditLinks ? `<div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${linkedIndex}">상세 보기</button><button data-diary-unlink-record>삭제</button></div>` : ""}
            </article>
          </div>
          ${canEditLinks ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  const menuButton = qs("[data-linked-record-menu]");
  const menu = qs("[data-linked-record-dropdown]");
  if (menuButton && menu) {
    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      menu.hidden = !menu.hidden;
      menuButton.classList.toggle("active", !menu.hidden);
    });
  }
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const unlinkButton = qs("[data-diary-unlink-record]");
  if (unlinkButton) unlinkButton.addEventListener("click", () => openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction));
  const pickerButton = qs("[data-diary-record-picker]");
  if (pickerButton) pickerButton.addEventListener("click", () => openDiaryRecordPickerPage({ ...detail, heading: "일기 수정", linkedMemoryIndex: linkedIndex }));
  bindActions(qs(".modal-sheet"));
}

// Final safe kebab markup and strict flex-between layout.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const canEditLinks = detail.editable && !isPartnerSharedDiary(detail);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="back">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <article class="linked-record-pill linked-record-detail-card">
              <div class="linked-record-title-row title-between">
                <span class="linked-record-title-text">${linkedRecord.title}</span>
                <div class="linked-record-right-tools">
                  <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
                  ${canEditLinks ? `<button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="more" title="more"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button>` : ""}
                </div>
              </div>
              ${canEditLinks ? `<div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${linkedIndex}">상세 보기</button><button data-diary-unlink-record>삭제</button></div>` : ""}
            </article>
          </div>
          ${canEditLinks ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  const menuButton = qs("[data-linked-record-menu]");
  const menu = qs("[data-linked-record-dropdown]");
  if (menuButton && menu) {
    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      menu.hidden = !menu.hidden;
      menuButton.classList.toggle("active", !menu.hidden);
    });
  }
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const unlinkButton = qs("[data-diary-unlink-record]");
  if (unlinkButton) unlinkButton.addEventListener("click", () => openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction));
  const pickerButton = qs("[data-diary-record-picker]");
  if (pickerButton) pickerButton.addEventListener("click", () => openDiaryRecordPickerPage({ ...detail, heading: "일기 수정", linkedMemoryIndex: linkedIndex }));
  bindActions(qs(".modal-sheet"));
}

// Final remove linked-record-detail-card class from diary detail records.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const canEditLinks = detail.editable && !isPartnerSharedDiary(detail);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="back">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <article class="linked-record-pill">
              <div class="linked-record-title-row title-between">
                <span class="linked-record-title-text">${linkedRecord.title}</span>
                <div class="linked-record-right-tools">
                  <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
                  ${canEditLinks ? `<button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="more" title="more"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button>` : ""}
                </div>
              </div>
              ${canEditLinks ? `<div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${linkedIndex}">상세 보기</button><button data-diary-unlink-record>삭제</button></div>` : ""}
            </article>
          </div>
          ${canEditLinks ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  const menuButton = qs("[data-linked-record-menu]");
  const menu = qs("[data-linked-record-dropdown]");
  if (menuButton && menu) {
    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      menu.hidden = !menu.hidden;
      menuButton.classList.toggle("active", !menu.hidden);
    });
  }
  bindLinkedRecordDetailNavigation(qs(".modal-sheet"));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const unlinkButton = qs("[data-diary-unlink-record]");
  if (unlinkButton) unlinkButton.addEventListener("click", () => openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction));
  const pickerButton = qs("[data-diary-record-picker]");
  if (pickerButton) pickerButton.addEventListener("click", () => openDiaryRecordPickerPage({ ...detail, heading: "일기 수정", linkedMemoryIndex: linkedIndex }));
  bindActions(qs(".modal-sheet"));
}

// Final stable kebab dropdown: dropdown is anchored under the kebab button.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const canEditLinks = detail.editable && !isPartnerSharedDiary(detail);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="back">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <article class="linked-record-pill">
              <div class="linked-record-title-row title-between">
                <span class="linked-record-title-text">${linkedRecord.title}</span>
                <div class="linked-record-right-tools">
                  <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
                  ${canEditLinks ? `<div class="linked-record-menu-wrap"><button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="more" title="more"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${linkedIndex}">상세 보기</button><button data-diary-unlink-record>삭제</button></div></div>` : ""}
                </div>
              </div>
            </article>
          </div>
          ${canEditLinks ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  sheet.addEventListener("click", (event) => {
    const menuButton = event.target.closest("[data-linked-record-menu]");
    if (menuButton) {
      event.preventDefault();
      event.stopPropagation();
      const menu = menuButton.closest(".linked-record-menu-wrap")?.querySelector("[data-linked-record-dropdown]");
      if (!menu) return;
      const shouldOpen = menu.hidden;
      qsa("[data-linked-record-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      menu.hidden = !shouldOpen;
      menuButton.classList.toggle("active", shouldOpen);
    }
  });
  bindLinkedRecordDetailNavigation(sheet, () => renderDiaryDetailReadOnly(detail, resolvedBackAction));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const unlinkButton = qs("[data-diary-unlink-record]");
  if (unlinkButton) unlinkButton.addEventListener("click", () => openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction));
  const pickerButton = qs("[data-diary-record-picker]");
  if (pickerButton) pickerButton.addEventListener("click", () => openDiaryRecordPickerPage({ ...detail, heading: "일기 수정", linkedMemoryIndex: linkedIndex }));
  bindActions(sheet);
}

// Final unlink dropdown behavior: close dropdown before opening confirmation.
function bindDiaryLinkedRecordMenu(sheet, resolvedBackAction) {
  sheet.addEventListener("click", (event) => {
    const menuButton = event.target.closest("[data-linked-record-menu]");
    if (menuButton) {
      event.preventDefault();
      event.stopPropagation();
      const menu = menuButton.closest(".linked-record-menu-wrap")?.querySelector("[data-linked-record-dropdown]");
      if (!menu) return;
      const shouldOpen = menu.hidden;
      qsa("[data-linked-record-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-linked-record-menu]", sheet).forEach((item) => item.classList.remove("active"));
      menu.hidden = !shouldOpen;
      menuButton.classList.toggle("active", shouldOpen);
      return;
    }

    const unlinkButton = event.target.closest("[data-diary-unlink-record]");
    if (unlinkButton) {
      event.preventDefault();
      event.stopPropagation();
      qsa("[data-linked-record-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-linked-record-menu]", sheet).forEach((item) => item.classList.remove("active"));
      openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction);
    }
  });
}

// Absolute final record detail override: no one-line memo and no record-level feelings.
function openMemoryDetailLatestV3(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div>
          </div>
        </section>
        <section class="card">
          <div class="between">
            <h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3>
            <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
          </div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
        </section>
        <section class="card linked-diary-section">
          <div class="between">
            <h3>연결된 일기</h3>
            <span class="meta">3개</span>
          </div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page data-index="${index}">기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(index));
  bindActions(qs(".modal-sheet"));
}

openMemoryDetailPageFinal = (index) => openMemoryDetailLatestV3(index);

// Final no-record-note policy: records do not show or edit one-line memos.
// Record-level feelings are removed; linked diaries carry the feeling context.
function linkedDiariesLatest() {
  return [
    { type: "나만 보기", title: "아직 정리 중인 마음", body: "그 시간에 느꼈던 마음을 천천히 적어두고 있어요.", editable: true, feelings: ["편안함", "고마움"], partnerFeelings: ["다정함"] },
    { type: "내 공유", title: "오늘 고마웠던 것", body: "상대에게 함께 보여주고 싶은 마음을 담았어요.", editable: true, feelings: ["고마움", "안정"], partnerFeelings: ["소중함", "다정함"] },
    { type: "상대 공유", title: "나도 기억하고 있어", body: "상대가 이 기록에 이어서 남긴 공유 일기예요.", editable: false, feelings: ["기쁨"], partnerFeelings: ["고마움", "그리움"] },
  ];
}

function linkedDiaryEmotionRow(diary) {
  const myFeelings = (diary.feelings || []).slice(0, 2);
  const partnerFeelings = (diary.partnerFeelings || ["고마움"]).slice(0, 2);
  return `
    <div class="linked-diary-emotions" aria-label="일기 감정">
      <div>
        <span class="linked-diary-emotion-label">내 감정</span>
        <div class="tag-row">${myFeelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
      </div>
      <div>
        <span class="linked-diary-emotion-label">상대 감정</span>
        <div class="tag-row">${partnerFeelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
      </div>
    </div>
  `;
}

function linkedDiaryCardsLatest() {
  return linkedDiariesLatest().map((diary, index) => `
    <article class="linked-diary-card" role="button" tabindex="0" data-linked-diary-index="${index}">
      <div class="between"><strong>${diary.title}</strong><span class="linked-diary-type">${diary.type}</span></div>
      <p>${diary.body}</p>
      ${linkedDiaryEmotionRow(diary)}
    </article>
  `).join("");
}

function memoryCards(memories, homeCompact = false) {
  return memories
    .map((memory, index) => `
      <article class="memory-card ${homeCompact ? "home-memory-card" : ""}" role="button" tabindex="0" data-action="memory-detail" data-index="${index}">
        <div class="photo-stack" aria-label="사진 미리보기"></div>
        <div>
          <div class="${homeCompact ? "home-memory-title" : "between"}">
            <strong>${memory.title}</strong>
            <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
          </div>
          <div class="tag-row ${homeCompact ? "home-memory-meta" : ""}" style="margin-top:8px">
            <span class="meta">${memory.date}</span>
            <span class="meta">${memory.place}</span>
            <span class="meta">${memory.type}</span>
          </div>
        </div>
      </article>
    `)
    .join("");
}

function openMemoryDetailLatestV3(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div>
          </div>
        </section>
        <section class="card">
          <div class="between">
            <h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3>
            <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
          </div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
        </section>
        <section class="card linked-diary-section">
          <div class="between">
            <h3>연결된 일기</h3>
            <span class="meta">3개</span>
          </div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page data-index="${index}">기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(index));
  bindActions(qs(".modal-sheet"));
}

openMemoryDetailPageFinal = (index) => openMemoryDetailLatestV3(index);

function openMemoryEditPageLatest(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page memory-edit-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div>
          <input class="memory-title-input" value="${editTitle}" maxlength="24" />
        </div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>${memory.type}</option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div><div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div><button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button><button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div><div class="linked-diary-list">${linkedDiaryCardsLatest()}</div><button class="ghost-btn full" data-linked-diary-add style="margin-top:12px">일기 연결 추가</button></section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runWithoutModalHistory(() => openMemoryDetailLatestV3(index)));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    openMemoryDetailLatestV3(index);
    showToast("기록 수정 내용이 저장됐어요.");
  });
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function openMemoryModal() {
  openModal(`
    <div class="modal-sheet">
      <div class="between"><h3>우리 기록 남기기</h3><button class="icon-btn" data-close aria-label="닫기">×</button></div>
      <div class="section-stack">
        <button class="ghost-btn full">사진 선택</button>
        <button class="ghost-btn full">사진 없이 기록하기</button>
        <div class="form-field"><label>제목</label><input id="memoryTitle" placeholder="비어 있으면 자동 생성" maxlength="24" /></div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(new Date().toISOString().slice(0, 10))}" /></div>
        <div class="form-field"><label>장소</label><input placeholder="직접 입력" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>일상</option><option>데이트</option><option>여행</option><option>기념일</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <div class="chip-row"><button class="chip-btn active">${state.connected ? "우리 둘이 보기" : "나만 보기"}</button>${state.connected ? '<button class="chip-btn">나만 보기</button>' : ""}</div>
        ${state.connected ? "" : '<p class="tiny-note">혼자 상태에서는 나만 보기만 가능해요.</p>'}
        <button class="primary-btn full" data-save-memory>저장</button>
      </div>
    </div>
  `);
  qs("[data-save-memory]").addEventListener("click", () => {
    state.memories.unshift({ title: qs("#memoryTitle").value.trim() || "2026년 4월의 일상", date: "2026.04.29", place: "직접 입력한 장소", type: "일상", note: "", scope: state.connected ? "우리 둘이 보기" : "나만 보기", feelings: [], reaction: "", author: "나" });
    closeModal();
    render();
    showToast("기록이 저장됐어요.");
  });
  bindActions(qs(".modal-sheet"));
}

function renderAlbum() {
  qs("#album").innerHTML = `
    <div class="section-stack">
      <div class="form-field"><label for="albumSearch">앨범 검색</label><input id="albumSearch" placeholder="제목, 장소, 기록 유형" /></div>
      <div class="segmented" data-album-view>
        <button class="${state.albumView === "record" ? "active" : ""}" data-view="record">기록</button>
        <button class="${state.albumView === "photo" ? "active" : ""}" data-view="photo">사진</button>
        <button class="${state.albumView === "calendar" ? "active" : ""}" data-view="calendar">캘린더</button>
      </div>
      ${state.albumView === "record" ? `<div class="list">${memoryCards(state.memories)}</div>` : ""}
      ${state.albumView === "photo" ? `<div class="photo-grid">${Array.from({ length: 9 }, (_, i) => `<div class="photo-tile" data-action="photo-detail"><span>${i + 1}</span></div>`).join("")}</div>` : ""}
      ${state.albumView === "calendar" ? calendarView() : ""}
      <button class="primary-btn full" data-action="new-memory">새 기록 추가</button>
    </div>
  `;
  qsa("[data-album-view] button").forEach((button) => button.addEventListener("click", () => {
    state.albumView = button.dataset.view;
    renderAlbum();
  }));
  bindActions(qs("#album"));
}

function openAlbumSearchPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>앨범 검색 정책</h3><button class="icon-btn" data-close aria-label="닫기">×</button></div><div class="section-stack"><section class="card"><h3>검색 대상</h3><p>기록 제목, 장소, 기록 유형</p></section><section class="card"><h3>검색 제외</h3><p>감정 태그, 사진 내용, 얼굴 검색</p></section><section class="card"><h3>캘린더 표시</h3><p>날짜별 기록 유형 아이콘은 최대 2개까지 표시하고 더보기로 이어집니다.</p></section></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openAiReferencePolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>AI 참고 정보</h3><button class="icon-btn" data-close aria-label="닫기">×</button></div><div class="section-stack"><section class="card"><h3>기록에서 참고</h3><p>기록 제목, 날짜, 장소, 기록 유형, 사용자가 입력한 원문</p></section><section class="card"><h3>참고하지 않음</h3><p>사진 내용, 상대 감정, 상대 일기, 비공개 일기</p></section><section class="card"><h3>전송 정책</h3><p>자동 전송은 없고, 상대에게는 최종 메시지만 전달됩니다.</p></section></div></div>`);
  bindActions(qs(".modal-sheet"));
}

// Final record detail screen: record-level emotion sections are removed.
// Feelings are handled inside linked diaries only.
function openMemoryDetailLatestV3(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div>
          </div>
        </section>
        <section class="card">
          <div class="between">
            <h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3>
            <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
          </div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
          <p>${memory.note}</p>
        </section>
        <section class="card linked-diary-section">
          <div class="between">
            <h3>연결된 일기</h3>
            <span class="meta">3개</span>
          </div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page data-index="${index}">기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(index));
  bindActions(qs(".modal-sheet"));
}

openMemoryDetailPageFinal = (index) => openMemoryDetailLatestV3(index);

function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const canEditLinks = detail.editable && !isPartnerSharedDiary(detail);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="back">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <article class="linked-record-pill">
              <div class="linked-record-title-row title-between">
                <span class="linked-record-title-text">${linkedRecord.title}</span>
                <div class="linked-record-right-tools">
                  <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
                  ${canEditLinks ? `<div class="linked-record-menu-wrap"><button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="more" title="more"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${linkedIndex}">상세 보기</button><button data-diary-unlink-record>삭제</button></div></div>` : ""}
                </div>
              </div>
            </article>
          </div>
          ${canEditLinks ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindDiaryLinkedRecordMenu(sheet, resolvedBackAction);
  bindLinkedRecordDetailNavigation(sheet);
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  const pickerButton = qs("[data-diary-record-picker]");
  if (pickerButton) pickerButton.addEventListener("click", () => openDiaryRecordPickerPage({ ...detail, heading: "일기 수정", linkedMemoryIndex: linkedIndex }));
  bindActions(sheet);
}

// Final shared linked-record UI for diary detail and editor.
function renderLinkedRecordCardItems(linkedTitle, linkedMemoryIndex = null, options = {}) {
  const fallbackIndex = linkedMemoryIndex ?? (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0);
  const records = linkedTitle && linkedTitle !== "관련 기록 없음" && linkedTitle !== "愿??湲곕줉 ?놁쓬"
    ? [state.memories[recordIndexByTitle(linkedTitle, fallbackIndex)] || state.memories[fallbackIndex] || state.memories[0]]
    : state.memories.slice(0, 1);
  return records.map((record) => {
    const index = recordIndexByTitle(record.title, fallbackIndex);
    return `<article class="linked-record-pill">
      <div class="linked-record-title-row title-between">
        <span class="linked-record-title-text">${record.title}</span>
        <div class="linked-record-right-tools">
          <em class="linked-record-scope">${scopeLabelForRecord(record)}</em>
          ${options.showMenu ? `<div class="linked-record-menu-wrap"><button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="more" title="more"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${index}">상세 보기</button><button data-diary-unlink-record>삭제</button></div></div>` : ""}
        </div>
      </div>
    </article>`;
  }).join("");
}

function renderLinkedRecordCards(linkedTitle, linkedMemoryIndex = null, options = {}) {
  const showMenu = options.showMenu ?? true;
  return `<section class="card linked-record-card"><div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div><div class="linked-record-list">${renderLinkedRecordCardItems(linkedTitle, linkedMemoryIndex, { showMenu })}</div><button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button></section>`;
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  const isEditMode = heading === "일기 수정" || heading === "일기 상세";
  const originalScope = diary?.originalScope || diary?.scope || (diary?.type === "나만 보기" ? "개인" : diary?.type === "내 공유" ? "공유" : "개인");
  const actionButtons = isEditMode
    ? `<div class="diary-editor-action-row"><button class="ghost-btn" data-action="ai-message">AI로 정리하기</button><button class="primary-btn" data-save-diary>수정 저장</button></div>`
    : `<div class="diary-editor-action-stack"><button class="ghost-btn full" data-action="ai-message">AI로 정리하기</button><button class="ghost-btn full" data-save-original-diary>원본으로 저장</button><button class="primary-btn full" data-save-diary>임시 저장</button></div>`;
  openModal(`<div class="modal-sheet notification-page diary-write-page"><header class="notification-header"><button class="notification-nav-btn" data-close aria-label="back">←</button><h3>${heading}</h3><span class="notification-header-spacer" aria-hidden="true"></span></header><div class="section-stack"><div class="chip-row" data-diary-scope data-original-scope="${originalScope}"><button class="chip-btn ${diary?.scope !== "공유" ? "active" : ""}">나만 보기</button><button class="chip-btn ${diary?.scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button></div><div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div><div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}${renderLinkedRecordCards(linkedTitle, linkedMemoryIndex, { showMenu: true })}${actionButtons}</div></div>`);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  bindDiaryLinkedRecordMenu(sheet, () => openMemoryDetailLatestV3(linkedMemoryIndex ?? (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0)));
  bindLinkedRecordDetailNavigation(sheet);
  qs("[data-diary-record-picker]").addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  const originalButton = qs("[data-save-original-diary]");
  if (originalButton) originalButton.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "원본으로 저장했어요."));
  qs("[data-save-diary]").addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, isEditMode ? "일기를 수정했어요." : "일기를 임시 저장했어요."));
  bindActions(sheet);
}

// Final shared unlink confirmation works in diary detail and diary edit screens.
function openDiaryUnlinkDeleteConfirmOverlay(backAction) {
  const page = qs(".diary-detail-page") || qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>연결을 해제할까요?</h3>
        <p>이 일기는 연결된 기록에서 사라지며 삭제와 동일하게 처리돼요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-diary-unlink-cancel>취소</button>
          <button class="primary-btn" data-diary-unlink-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-unlink-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-unlink-confirm]", page).addEventListener("click", () => {
    qs(".ai-confirm-overlay", page)?.remove();
    runWithoutModalHistory(backAction);
    showToast("연결을 해제했어요.");
  });
}

function bindDiaryLinkedRecordMenu(sheet, resolvedBackAction) {
  sheet.addEventListener("click", (event) => {
    const menuButton = event.target.closest("[data-linked-record-menu]");
    if (menuButton) {
      event.preventDefault();
      event.stopPropagation();
      const menu = menuButton.closest(".linked-record-menu-wrap")?.querySelector("[data-linked-record-dropdown]");
      if (!menu) return;
      const shouldOpen = menu.hidden;
      qsa("[data-linked-record-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-linked-record-menu]", sheet).forEach((item) => item.classList.remove("active"));
      menu.hidden = !shouldOpen;
      menuButton.classList.toggle("active", shouldOpen);
      return;
    }

    const unlinkButton = event.target.closest("[data-diary-unlink-record]");
    if (unlinkButton) {
      event.preventDefault();
      event.stopPropagation();
      qsa("[data-linked-record-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-linked-record-menu]", sheet).forEach((item) => item.classList.remove("active"));
      openDiaryUnlinkDeleteConfirmOverlay(resolvedBackAction);
    }
  });
}

// Absolute EOF record detail override: no one-line memo and no record-level feelings.
function openMemoryDetailLatestV3(index) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div>
          </div>
        </section>
        <section class="card">
          <div class="between">
            <h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3>
            <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
          </div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
        </section>
        <section class="card linked-diary-section">
          <div class="between">
            <h3>연결된 일기</h3>
            <span class="meta">3개</span>
          </div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page data-index="${index}">기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(index));
  bindActions(qs(".modal-sheet"));
}

openMemoryDetailPageFinal = (index) => openMemoryDetailLatestV3(index);

// Absolute EOF linked diary feelings rule: my/private diaries show only my feelings; partner shared diaries show only partner feelings.
function linkedDiaryEmotionRow(diary) {
  const isPartnerShared = diary.type === "상대 공유" || String(diary.type || "").includes("상대");
  const label = isPartnerShared ? "상대 감정" : "내 감정";
  const feelings = (isPartnerShared ? diary.partnerFeelings : diary.feelings || []).slice(0, 2);
  return `
    <div class="linked-diary-emotions is-single" aria-label="일기 감정">
      <div>
        <span class="linked-diary-emotion-label">${label}</span>
        <div class="tag-row">${feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
      </div>
    </div>
  `;
}

function linkedDiaryCardsLatest() {
  return linkedDiariesLatest().map((diary, index) => `
    <article class="linked-diary-card" role="button" tabindex="0" data-linked-diary-index="${index}">
      <div class="between"><strong>${diary.title}</strong><span class="linked-diary-type">${diary.type}</span></div>
      <p>${diary.body}</p>
      ${linkedDiaryEmotionRow(diary)}
    </article>
  `).join("");
}

// Absolute EOF linked diary feeling chips only: no labels and no divider.
function linkedDiaryEmotionRow(diary) {
  const isPartnerShared = diary.type === "상대 공유" || String(diary.type || "").includes("상대");
  const feelings = (isPartnerShared ? diary.partnerFeelings : diary.feelings || []).slice(0, 2);
  return `
    <div class="linked-diary-emotions is-single" aria-label="일기 감정">
      <div class="tag-row">${feelings.map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
    </div>
  `;
}

// Absolute EOF diary save guard: original save requires at least one linked record.
function diaryHasLinkedRecord(linkedTitle) {
  if (!linkedTitle) return false;
  const normalized = String(linkedTitle).trim();
  if (!normalized || normalized === "관련 기록 없음" || normalized.includes("관련 기록 없음") || normalized.includes("湲곕줉 ?놁쓬")) return false;
  return state.memories.some((memory) => memory.title === normalized);
}

function isOriginalDiarySave(toastMessage) {
  const text = String(toastMessage || "");
  return text.includes("원본") || text.includes("?먮낯");
}

function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  if (isOriginalDiarySave(toastMessage) && !diaryHasLinkedRecord(linkedTitle)) {
    showToast("기록을 연결해야 원본으로 저장할 수 있어요.");
    return;
  }

  const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active")?.textContent || "나만 보기";
  const nextScope = selectedScopeText.includes("상대") || selectedScopeText.includes("공유") || selectedScopeText.includes("?곷?") || selectedScopeText.includes("怨듭쑀") ? "공유" : "개인";
  const originalScope = qs("[data-diary-scope]")?.dataset.originalScope || nextScope;
  const draft = {
    title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기",
    body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문",
    scope: nextScope,
    originalScope,
    feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
    linked: linkedTitle,
    author: "나"
  };
  const isEditMode = heading === "일기 수정" || heading === "일기 상세" || heading === "?쇨린 ?섏젙" || heading === "?쇨린 ?곸꽭";
  if (isEditMode && originalScope !== nextScope) {
    openDiaryScopeChangeConfirmOverlay(draft, heading, linkedTitle);
    return;
  }
  state.diaries.unshift(draft);
  closeModal();
  renderDiary();
  showToast(toastMessage);
}

// Absolute EOF unlink confirmation: deleting a linked record returns to the diary writing screen.
function openDiaryUnlinkDeleteConfirmOverlay(backAction) {
  const page = qs(".diary-detail-page") || qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>연결을 해제할까요?</h3>
        <p>이 일기는 연결된 기록에서 사라지며 삭제와 동일하게 처리돼요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-diary-unlink-cancel>취소</button>
          <button class="primary-btn" data-diary-unlink-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-unlink-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-unlink-confirm]", page).addEventListener("click", () => {
    const currentTitle = qs("#diaryTitle")?.value || qs(".diary-detail-summary h3")?.textContent?.trim() || "";
    const currentBody = qs("#diaryBody")?.value || qs(".diary-detail-body")?.textContent?.trim() || "";
    const currentFeelings = qsa("[data-diary-feelings] .chip-btn.active, .diary-detail-feelings .chip-btn").map((button) => button.textContent.trim()).slice(0, 2);
    qs(".ai-confirm-overlay", page)?.remove();
    runWithoutModalHistory(() => renderDiaryEditor({
      heading: "일기 쓰기",
      diary: {
        title: currentTitle,
        body: currentBody,
        scope: "개인",
        feelings: currentFeelings,
        linked: "관련 기록 없음"
      },
      linkedMemoryIndex: null
    }));
    showToast("연결을 해제했어요.");
  });
}

// Absolute EOF diary detail: linked records are read-only here.
function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const linkedIndex = recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0);
  const linkedRecord = state.memories[linkedIndex] || state.memories[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : linkedIndex;
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        <section class="card linked-record-card">
          <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
          <div class="linked-record-list">
            <article class="linked-record-pill" role="button" tabindex="0" data-linked-record-detail="${linkedIndex}">
              <div class="linked-record-title-row title-between">
                <span class="linked-record-title-text">${linkedRecord.title}</span>
                <div class="linked-record-right-tools">
                  <em class="linked-record-scope">${scopeLabelForRecord(linkedRecord)}</em>
                </div>
              </div>
            </article>
          </div>
        </section>
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(sheet);
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  bindActions(sheet);
}

// Absolute EOF diary tab: 내 공유 / 나만 보기 / 임시 저장.
function normalizeDiaryView() {
  if (state.diaryView === "shared") state.diaryView = "mineShared";
  if (state.diaryView === "personal") state.diaryView = "private";
  if (!state.diaryView || !["mineShared", "private", "draft"].includes(state.diaryView)) state.diaryView = "mineShared";
}

function diaryTypeLabel(entry) {
  if (entry.scope === "draft" || entry.type === "임시 저장") return "임시 저장";
  if (entry.scope === "공유" || entry.type === "내 공유") return "내 공유";
  return "나만 보기";
}

function diaryEntriesForCurrentView() {
  normalizeDiaryView();
  const source = state.diaries || [];
  if (state.diaryView === "mineShared") return source.filter((entry) => entry.scope === "공유" || entry.type === "내 공유");
  if (state.diaryView === "private") return source.filter((entry) => entry.scope === "개인" || entry.type === "나만 보기");
  const drafts = source.filter((entry) => entry.scope === "draft" || entry.type === "임시 저장");
  return drafts.length ? drafts : [
    { title: "아직 저장만 해둔 일기", body: "기록을 더 연결한 뒤 다시 다듬어볼 수 있어요.", scope: "draft", feelings: ["고마움"], linked: "관련 기록 없음", author: "나" }
  ];
}

function renderDiary() {
  normalizeDiaryView();
  const diary = qs("#diary");
  const entries = diaryEntriesForCurrentView();
  diary.innerHTML = `
    <div class="section-stack">
      <div class="tabs diary-tabs">
        <button class="chip-btn ${state.diaryView === "mineShared" ? "active" : ""}" data-diary-view="mineShared">내 공유</button>
        <button class="chip-btn ${state.diaryView === "private" ? "active" : ""}" data-diary-view="private">나만 보기</button>
        <button class="chip-btn ${state.diaryView === "draft" ? "active" : ""}" data-diary-view="draft">임시 저장</button>
      </div>
      <button class="primary-btn full" data-action="diary-scope-first">일기 쓰기</button>
      <div class="list">${entries.map((entry) => `<article class="diary-card" data-action="diary-detail"><div class="between"><h3>${entry.title}</h3><span class="linked-diary-type">${diaryTypeLabel(entry)}</span></div><p>${entry.body}</p><div class="tag-row" style="margin-top:10px">${(entry.feelings || []).slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div></article>`).join("")}</div>
    </div>
  `;
  qsa("[data-diary-view]", diary).forEach((button) => {
    button.addEventListener("click", () => {
      state.diaryView = button.dataset.diaryView;
      renderDiary();
    });
  });
  bindActions(diary);
}

// Absolute EOF diary save: temporary saves go to the 임시 저장 tab.
function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  if (isOriginalDiarySave(toastMessage) && !diaryHasLinkedRecord(linkedTitle)) {
    showToast("기록을 연결해야 원본으로 저장할 수 있어요.");
    return;
  }

  const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active")?.textContent || "나만 보기";
  const isDraftSave = String(toastMessage || "").includes("임시") || String(toastMessage || "").includes("?꾩떆");
  const nextScope = isDraftSave ? "draft" : (selectedScopeText.includes("상대") || selectedScopeText.includes("공유") || selectedScopeText.includes("?곷?") || selectedScopeText.includes("怨듭쑀") ? "공유" : "개인");
  const originalScope = qs("[data-diary-scope]")?.dataset.originalScope || nextScope;
  const draft = {
    title: limitMemoryEditTitle(qs("#diaryTitle").value.trim()) || "제목 없는 일기",
    body: qs("#diaryBody").value.trim() || "임시 저장한 일기 본문",
    scope: nextScope,
    type: nextScope === "draft" ? "임시 저장" : nextScope === "공유" ? "내 공유" : "나만 보기",
    originalScope,
    feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
    linked: linkedTitle,
    author: "나"
  };
  const isEditMode = heading === "일기 수정" || heading === "일기 상세" || heading === "?쇨린 ?섏젙" || heading === "?쇨린 ?곸꽭";
  if (!isDraftSave && isEditMode && originalScope !== nextScope) {
    openDiaryScopeChangeConfirmOverlay(draft, heading, linkedTitle);
    return;
  }
  state.diaries.unshift(draft);
  closeModal();
  state.diaryView = isDraftSave ? "draft" : nextScope === "공유" ? "mineShared" : "private";
  renderDiary();
  showToast(toastMessage);
}

// Absolute EOF diary editor: draft edits show status, final scope, and separate draft/final save actions.
function isDraftDiary(diary) {
  return diary?.scope === "draft" || diary?.type === "임시 저장" || diary?.type === "?꾩떆 ???";
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  const draftMode = isDraftDiary(diary);
  const isEditMode = draftMode || heading === "일기 수정" || heading === "일기 상세" || heading === "?쇨린 ?섏젙" || heading === "?쇨린 ?곸꽭";
  const desiredScope = diary?.finalScope || diary?.originalScope || (diary?.scope === "공유" || diary?.type === "내 공유" ? "공유" : "개인");
  const originalScope = draftMode ? desiredScope : (diary?.originalScope || diary?.scope || desiredScope);
  const statusSection = draftMode ? `<section class="card diary-draft-status"><div class="between"><h3>저장 상태</h3><span class="linked-diary-type">임시 저장</span></div></section>` : "";
  const actionButtons = draftMode
    ? `<div class="diary-editor-action-row"><button class="ghost-btn" data-save-draft-diary>임시 저장</button><button class="primary-btn" data-save-final-diary>저장</button></div>`
    : isEditMode
      ? `<div class="diary-editor-action-row"><button class="ghost-btn" data-action="ai-message">AI로 정리하기</button><button class="primary-btn" data-save-diary>수정 저장</button></div>`
      : `<div class="diary-editor-action-stack"><button class="ghost-btn full" data-action="ai-message">AI로 정리하기</button><button class="ghost-btn full" data-save-original-diary>원본으로 저장</button><button class="primary-btn full" data-save-diary>임시 저장</button></div>`;
  openModal(`
    <div class="modal-sheet notification-page diary-write-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>${heading}</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${statusSection}
        <div class="form-field diary-scope-field">
          <label>공개 범위</label>
          <div class="chip-row" data-diary-scope data-original-scope="${originalScope}">
            <button class="chip-btn ${desiredScope !== "공유" ? "active" : ""}">나만 보기</button>
            <button class="chip-btn ${desiredScope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button>
          </div>
        </div>
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div>
        <div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>
        ${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}
        ${renderLinkedRecordCards(linkedTitle, linkedMemoryIndex, { showMenu: true })}
        ${actionButtons}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  bindDiaryLinkedRecordMenu(sheet, () => openMemoryDetailLatestV3(linkedMemoryIndex ?? (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0)));
  bindLinkedRecordDetailNavigation(sheet);
  qs("[data-diary-record-picker]")?.addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  qs("[data-save-original-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "원본으로 저장했어요."));
  qs("[data-save-draft-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "일기를 임시 저장했어요."));
  qs("[data-save-final-diary]")?.addEventListener("click", () => saveDiaryFromEditor("일기 쓰기", linkedTitle, "일기를 저장했어요."));
  qs("[data-save-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, isEditMode ? "일기를 수정했어요." : "일기를 임시 저장했어요."));
  bindActions(sheet);
}

// Absolute EOF diary editor polish: draft status is a header badge, not a scope option/card.
function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = linkedMemoryIndex !== null ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  const draftMode = isDraftDiary(diary);
  const isEditMode = draftMode || heading === "일기 수정" || heading === "일기 상세" || heading === "?쇨린 ?섏젙" || heading === "?쇨린 ?곸꽭";
  const desiredScope = diary?.finalScope || diary?.originalScope || (diary?.scope === "공유" || diary?.type === "내 공유" || diary?.scope === "怨듭쑀" || diary?.type === "??怨듭쑀" ? "공유" : "개인");
  const originalScope = draftMode ? desiredScope : (diary?.originalScope || diary?.scope || desiredScope);
  const headerRight = draftMode ? `<span class="linked-diary-type diary-header-status">임시 저장</span>` : `<span class="notification-header-spacer" aria-hidden="true"></span>`;
  const actionButtons = draftMode
    ? `<div class="diary-editor-action-row"><button class="ghost-btn" data-save-draft-diary>임시 저장</button><button class="primary-btn" data-save-final-diary>저장</button></div>`
    : isEditMode
      ? `<div class="diary-editor-action-row"><button class="ghost-btn" data-action="ai-message">AI로 정리하기</button><button class="primary-btn" data-save-diary>수정 저장</button></div>`
      : `<div class="diary-editor-action-stack"><button class="ghost-btn full" data-action="ai-message">AI로 정리하기</button><button class="ghost-btn full" data-save-original-diary>원본으로 저장</button><button class="primary-btn full" data-save-diary>임시 저장</button></div>`;
  openModal(`
    <div class="modal-sheet notification-page diary-write-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>${heading}</h3>
        ${headerRight}
      </header>
      <div class="section-stack">
        <div class="form-field diary-scope-field">
          <label>공개 범위</label>
          <div class="chip-row" data-diary-scope data-original-scope="${originalScope}">
            <button class="chip-btn ${desiredScope !== "공유" ? "active" : ""}">나만 보기</button>
            <button class="chip-btn ${desiredScope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button>
          </div>
        </div>
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div>
        <div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>
        ${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}
        ${renderLinkedRecordCards(linkedTitle, linkedMemoryIndex, { showMenu: true })}
        ${actionButtons}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  bindDiaryLinkedRecordMenu(sheet, () => openMemoryDetailLatestV3(linkedMemoryIndex ?? (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0)));
  bindLinkedRecordDetailNavigation(sheet);
  qs("[data-diary-record-picker]")?.addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  qs("[data-save-original-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "원본으로 저장했어요."));
  qs("[data-save-draft-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "일기를 임시 저장했어요."));
  qs("[data-save-final-diary]")?.addEventListener("click", () => saveDiaryFromEditor("일기 쓰기", linkedTitle, "일기를 저장했어요."));
  qs("[data-save-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, isEditMode ? "일기를 수정했어요." : "일기를 임시 저장했어요."));
  bindActions(sheet);
}

// Absolute EOF diary scope-change confirmation: always confirm when an edited diary changes visibility.
function normalizeDiaryScopeValue(value) {
  const text = String(value || "").trim();
  if (text === "draft" || text.includes("임시") || text.includes("?꾩떆")) return "draft";
  if (text === "공유" || text.includes("공유") || text.includes("상대") || text.includes("怨듭쑀") || text.includes("?곷?") || text.includes("?⑤벊")) return "공유";
  if (text === "개인" || text.includes("나만") || text.includes("媛쒖씤") || text.includes("?섎쭔")) return "개인";
  return text || "개인";
}

function diaryScopeLabel(scope) {
  const normalized = normalizeDiaryScopeValue(scope);
  if (normalized === "공유") return "상대에게 공유";
  if (normalized === "draft") return "임시 저장";
  return "나만 보기";
}

function isDiaryEditSaveHeading(heading) {
  const text = String(heading || "");
  return text.includes("수정") || text.includes("상세") || text.includes("?섏젙") || text.includes("?곸꽭") || text.includes("??륁젟") || text.includes("?怨멸쉭");
}

function buildDiaryDraftFromCurrentEditor(linkedTitle, nextScope, originalScope) {
  const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
  return {
    title: limitMemoryEditTitle(qs("#diaryTitle")?.value.trim() || "") || "제목 없는 일기",
    body: qs("#diaryBody")?.value.trim() || "임시 저장한 일기 본문",
    scope: nextScope,
    type: nextScope === "draft" ? "임시 저장" : nextScope === "공유" ? "내 공유" : "나만 보기",
    originalScope,
    feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
    linked: linkedTitle,
    author: "나"
  };
}

function saveDiaryDraftAndReturn(draft, toastMessage) {
  state.diaries.unshift(draft);
  closeModal();
  state.diaryView = draft.scope === "draft" ? "draft" : draft.scope === "공유" ? "mineShared" : "private";
  renderDiary();
  showToast(toastMessage || "일기를 저장했어요.");
}

function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  if (isOriginalDiarySave(toastMessage) && !diaryHasLinkedRecord(linkedTitle)) {
    showToast("기록을 연결해야 원본으로 저장할 수 있어요.");
    return;
  }

  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active")?.textContent || "나만 보기";
  const isDraftSave = String(toastMessage || "").includes("임시") || String(toastMessage || "").includes("?꾩떆");
  const nextScope = isDraftSave ? "draft" : normalizeDiaryScopeValue(selectedScopeText);
  const originalScope = normalizeDiaryScopeValue(qs("[data-diary-scope]")?.dataset.originalScope || nextScope);
  const draft = buildDiaryDraftFromCurrentEditor(linkedTitle, nextScope, originalScope);

  if (!isDraftSave && isDiaryEditSaveHeading(heading) && originalScope !== nextScope) {
    openDiaryScopeChangeConfirmOverlay(draft, heading, linkedTitle, toastMessage);
    return;
  }

  saveDiaryDraftAndReturn(draft, toastMessage);
}

function openDiaryScopeChangeConfirmOverlay(draft, heading = "일기 수정", linkedTitle = "관련 기록 없음", toastMessage = "일기를 저장했어요.") {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  const previousLabel = diaryScopeLabel(draft.originalScope);
  const nextLabel = diaryScopeLabel(draft.scope);
  const title = draft.scope === "공유" ? "상대에게 공유할까요?" : "나만 보기로 변경할까요?";
  const body = draft.scope === "공유"
    ? `공개 범위가 ${previousLabel}에서 ${nextLabel}로 변경됩니다. 저장하면 이 일기는 내 공유 탭으로 이동하고 상대가 볼 수 있어요.`
    : `공개 범위가 ${previousLabel}에서 ${nextLabel}로 변경됩니다. 저장하면 이 일기는 나만 보기 탭으로 이동하고 상대에게 보이지 않아요.`;
  const confirmText = draft.scope === "공유" ? "공유로 변경" : "나만 보기로 변경";
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>${title}</h3>
        <p>${body}</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-diary-scope-cancel>취소</button>
          <button class="primary-btn" data-diary-scope-confirm>${confirmText}</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-scope-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-scope-confirm]", page).addEventListener("click", () => saveDiaryDraftAndReturn(draft, toastMessage || "일기 범위를 변경했어요."));
}

// Absolute EOF draft-final save confirmation: choosing a final scope from draft always asks first.
function isDraftFinalSaveHeading(heading) {
  const text = String(heading || "");
  return text.includes("일기 쓰기") || text.includes("?쇨린 ?곌린");
}

function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  if (isOriginalDiarySave(toastMessage) && !diaryHasLinkedRecord(linkedTitle)) {
    showToast("기록을 연결해야 원본으로 저장할 수 있어요.");
    return;
  }

  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active")?.textContent || "나만 보기";
  const isDraftSave = String(toastMessage || "").includes("임시") || String(toastMessage || "").includes("?꾩떆");
  const originalScope = normalizeDiaryScopeValue(qs("[data-diary-scope]")?.dataset.originalScope || "개인");
  const nextScope = isDraftSave ? "draft" : normalizeDiaryScopeValue(selectedScopeText);
  const draft = buildDiaryDraftFromCurrentEditor(linkedTitle, nextScope, originalScope);

  if (!isDraftSave && (isDiaryEditSaveHeading(heading) || isDraftFinalSaveHeading(heading)) && originalScope !== nextScope) {
    openDiaryScopeChangeConfirmOverlay(draft, heading, linkedTitle, toastMessage);
    return;
  }

  saveDiaryDraftAndReturn(draft, toastMessage);
}

function openDiaryScopeChangeConfirmOverlay(draft, heading = "일기 수정", linkedTitle = "관련 기록 없음", toastMessage = "일기를 저장했어요.") {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  const fromDraft = normalizeDiaryScopeValue(draft.originalScope) === "draft" || isDraftFinalSaveHeading(heading);
  const nextLabel = diaryScopeLabel(draft.scope);
  const title = fromDraft
    ? `${nextLabel}로 저장할까요?`
    : draft.scope === "공유" ? "상대에게 공유할까요?" : "나만 보기로 변경할까요?";
  const body = fromDraft
    ? (draft.scope === "공유"
      ? "임시 저장 일기를 내 공유 일기로 저장합니다. 저장하면 내 공유 탭으로 이동하고 상대가 볼 수 있어요."
      : "임시 저장 일기를 나만 보기 일기로 저장합니다. 저장하면 나만 보기 탭으로 이동하고 상대에게 보이지 않아요.")
    : (draft.scope === "공유"
      ? `공개 범위가 ${diaryScopeLabel(draft.originalScope)}에서 ${nextLabel}로 변경됩니다. 저장하면 이 일기는 내 공유 탭으로 이동하고 상대가 볼 수 있어요.`
      : `공개 범위가 ${diaryScopeLabel(draft.originalScope)}에서 ${nextLabel}로 변경됩니다. 저장하면 이 일기는 나만 보기 탭으로 이동하고 상대에게 보이지 않아요.`);
  const confirmText = draft.scope === "공유" ? "내 공유로 저장" : "나만 보기로 저장";
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>${title}</h3>
        <p>${body}</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-diary-scope-cancel>취소</button>
          <button class="primary-btn" data-diary-scope-confirm>${confirmText}</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-scope-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-scope-confirm]", page).addEventListener("click", () => saveDiaryDraftAndReturn(draft, toastMessage || "일기를 저장했어요."));
}

// Absolute EOF fix: draft final save must always show the scope confirmation modal.
function isScopeShared(scope) {
  const text = String(scope || "");
  return text === "공유" || text.includes("공유") || text.includes("상대") || text === "怨듭쑀" || text.includes("怨듭쑀") || text.includes("?곷?") || text.includes("?⑤벊");
}

function isScopeDraft(scope) {
  const text = String(scope || "");
  return text === "draft" || text.includes("임시") || text.includes("?꾩떆") || text.includes("?袁⑸");
}

function normalizeDiaryScopeValue(value) {
  if (isScopeDraft(value)) return "draft";
  if (isScopeShared(value)) return "공유";
  return "개인";
}

function diaryScopeLabel(scope) {
  const normalized = normalizeDiaryScopeValue(scope);
  if (normalized === "공유") return "상대에게 공유";
  if (normalized === "draft") return "임시 저장";
  return "나만 보기";
}

function isDraftFinalSaveHeading(heading) {
  const text = String(heading || "");
  return text === "draft-final" || text.includes("일기 쓰기") || text.includes("?쇨린 ?곌린") || !!qs(".diary-write-page [data-save-final-diary]");
}

function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  if (isOriginalDiarySave(toastMessage) && !diaryHasLinkedRecord(linkedTitle)) {
    showToast("기록을 연결해야 원본으로 저장할 수 있어요.");
    return;
  }

  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active")?.textContent || "나만 보기";
  const isDraftSave = String(toastMessage || "").includes("임시") || String(toastMessage || "").includes("?꾩떆");
  const isDraftFinal = !isDraftSave && isDraftFinalSaveHeading(heading);
  const originalScope = isDraftFinal ? "draft" : normalizeDiaryScopeValue(qs("[data-diary-scope]")?.dataset.originalScope || "개인");
  const nextScope = isDraftSave ? "draft" : normalizeDiaryScopeValue(selectedScopeText);
  const draft = buildDiaryDraftFromCurrentEditor(linkedTitle, nextScope, originalScope);

  if (!isDraftSave && (isDraftFinal || (isDiaryEditSaveHeading(heading) && originalScope !== nextScope))) {
    openDiaryScopeChangeConfirmOverlay(draft, isDraftFinal ? "draft-final" : heading, linkedTitle, toastMessage);
    return;
  }

  saveDiaryDraftAndReturn(draft, toastMessage);
}

function openDiaryScopeChangeConfirmOverlay(draft, heading = "일기 수정", linkedTitle = "관련 기록 없음", toastMessage = "일기를 저장했어요.") {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  const fromDraft = normalizeDiaryScopeValue(draft.originalScope) === "draft" || heading === "draft-final";
  const nextScope = normalizeDiaryScopeValue(draft.scope);
  const nextLabel = diaryScopeLabel(nextScope);
  const title = fromDraft
    ? `${nextLabel}로 저장할까요?`
    : nextScope === "공유" ? "상대에게 공유할까요?" : "나만 보기로 변경할까요?";
  const body = fromDraft
    ? (nextScope === "공유"
      ? "임시 저장 일기를 내 공유 일기로 저장합니다. 저장하면 내 공유 탭으로 이동하고 상대가 볼 수 있어요."
      : "임시 저장 일기를 나만 보기 일기로 저장합니다. 저장하면 나만 보기 탭으로 이동하고 상대에게 보이지 않아요.")
    : (nextScope === "공유"
      ? `공개 범위가 ${diaryScopeLabel(draft.originalScope)}에서 ${nextLabel}로 변경됩니다. 저장하면 이 일기는 내 공유 탭으로 이동하고 상대가 볼 수 있어요.`
      : `공개 범위가 ${diaryScopeLabel(draft.originalScope)}에서 ${nextLabel}로 변경됩니다. 저장하면 이 일기는 나만 보기 탭으로 이동하고 상대에게 보이지 않아요.`);
  const confirmText = nextScope === "공유" ? "내 공유로 저장" : "나만 보기로 저장";
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>${title}</h3>
        <p>${body}</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-diary-scope-cancel>취소</button>
          <button class="primary-btn" data-diary-scope-confirm>${confirmText}</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-scope-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-scope-confirm]", page).addEventListener("click", () => saveDiaryDraftAndReturn(draft, toastMessage || "일기를 저장했어요."));
}

// Absolute EOF draft-save notice: draft saves ignore visibility and linked-record choices.
function buildDraftOnlyDiaryFromCurrentEditor() {
  const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
  return {
    title: limitMemoryEditTitle(qs("#diaryTitle")?.value.trim() || "") || "제목 없는 일기",
    body: qs("#diaryBody")?.value.trim() || "임시 저장한 일기 본문",
    scope: "draft",
    type: "임시 저장",
    originalScope: "draft",
    finalScope: null,
    feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
    linked: "관련 기록 없음",
    author: "나"
  };
}

function openDraftSaveNoticeOverlay(toastMessage = "일기를 임시 저장했어요.") {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>임시 저장할까요?</h3>
        <p>임시 저장에는 나만 보기, 상대에게 공유, 관련 기록 연결이 적용되지 않아요. 나중에 저장할 때 공개 범위와 연결 기록을 다시 선택할 수 있어요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-draft-save-cancel>취소</button>
          <button class="primary-btn" data-draft-save-confirm>임시 저장</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-draft-save-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-draft-save-confirm]", page).addEventListener("click", () => {
    const draft = buildDraftOnlyDiaryFromCurrentEditor();
    qs(".ai-confirm-overlay", page)?.remove();
    saveDiaryDraftAndReturn(draft, toastMessage);
  });
}

function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  if (isOriginalDiarySave(toastMessage) && !diaryHasLinkedRecord(linkedTitle)) {
    showToast("기록을 연결해야 원본으로 저장할 수 있어요.");
    return;
  }

  const isDraftSave = String(toastMessage || "").includes("임시") || String(toastMessage || "").includes("?꾩떆");
  if (isDraftSave) {
    openDraftSaveNoticeOverlay(toastMessage);
    return;
  }

  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active")?.textContent || "나만 보기";
  const isDraftFinal = isDraftFinalSaveHeading(heading);
  const originalScope = isDraftFinal ? "draft" : normalizeDiaryScopeValue(qs("[data-diary-scope]")?.dataset.originalScope || "개인");
  const nextScope = normalizeDiaryScopeValue(selectedScopeText);
  const draft = buildDiaryDraftFromCurrentEditor(linkedTitle, nextScope, originalScope);

  if (isDraftFinal || (isDiaryEditSaveHeading(heading) && originalScope !== nextScope)) {
    openDiaryScopeChangeConfirmOverlay(draft, isDraftFinal ? "draft-final" : heading, linkedTitle, toastMessage);
    return;
  }

  saveDiaryDraftAndReturn(draft, toastMessage);
}

// Final draft diary flow override: draft detail/edit show no linked record fallback,
// draft edit starts with no visibility selected, and final save requires both.
function isScopeShared(scope) {
  const text = String(scope || "").trim();
  return text === "공유" || text === "怨듭쑀" || text.includes("공유") || text.includes("상대") || text.includes("怨듭쑀") || text.includes("?곷?");
}

function isScopeDraft(scope) {
  const text = String(scope || "").trim();
  return text === "draft" || text.includes("임시") || text.includes("?꾩떆") || text.includes("?袁⑸뻻");
}

function normalizeDiaryScopeValue(value) {
  if (isScopeDraft(value)) return "draft";
  if (isScopeShared(value)) return "공유";
  return "개인";
}

function diaryScopeLabel(scope) {
  const normalized = normalizeDiaryScopeValue(scope);
  if (normalized === "공유") return "상대에게 공유";
  if (normalized === "draft") return "임시 저장";
  return "나만 보기";
}

function isDraftDiary(diary) {
  return normalizeDiaryScopeValue(diary?.scope || diary?.type || diary?.originalScope) === "draft";
}

function diaryHasLinkedRecord(linkedTitle) {
  if (!linkedTitle) return false;
  const normalized = String(linkedTitle).trim();
  if (!normalized || normalized === "관련 기록 없음" || normalized.includes("관련 기록 없음") || normalized.includes("愿??湲곕줉 ?놁쓬") || normalized.includes("疫꿸퀡以???곸벉")) return false;
  return state.memories.some((memory) => memory.title === normalized);
}

function renderEmptyLinkedRecordSection(showPicker = false) {
  return `
    <section class="card linked-record-card">
      <div class="between"><h3>관련 기록 연결</h3><span class="meta">0개</span></div>
      <p class="linked-record-empty">연결된 기록이 없습니다.</p>
      ${showPicker ? `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>` : ""}
    </section>
  `;
}

function renderLinkedRecordCards(linkedTitle, linkedMemoryIndex = null, options = {}) {
  if (!diaryHasLinkedRecord(linkedTitle) && typeof linkedMemoryIndex !== "number") {
    return renderEmptyLinkedRecordSection(options.showPicker !== false);
  }
  const showMenu = options.showMenu ?? true;
  const fallbackIndex = typeof linkedMemoryIndex === "number" ? linkedMemoryIndex : (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0);
  const record = state.memories[recordIndexByTitle(linkedTitle, fallbackIndex)] || state.memories[fallbackIndex] || state.memories[0];
  const index = recordIndexByTitle(record.title, fallbackIndex);
  return `
    <section class="card linked-record-card">
      <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
      <div class="linked-record-list">
        <article class="linked-record-pill"${showMenu ? "" : ` role="button" tabindex="0" data-linked-record-detail="${index}"`}>
          <div class="linked-record-title-row title-between">
            <span class="linked-record-title-text">${record.title}</span>
            <div class="linked-record-right-tools">
              <em class="linked-record-scope">${scopeLabelForRecord(record)}</em>
              ${showMenu ? `<div class="linked-record-menu-wrap"><button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="더보기" title="더보기"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${index}">상세 보기</button><button data-diary-unlink-record>삭제</button></div></div>` : ""}
            </div>
          </div>
        </article>
      </div>
      ${options.showPicker === false ? "" : `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>`}
    </section>
  `;
}

function normalizeDiaryForDetail(diary, fallbackIndex = 0) {
  const base = diary || {};
  const scope = normalizeDiaryScopeValue(base.scope || base.type);
  return {
    title: base.title || "제목 없는 일기",
    body: base.body || "작성된 내용이 없습니다.",
    scope,
    type: diaryScopeLabel(scope),
    originalScope: base.originalScope || scope,
    finalScope: base.finalScope || null,
    feelings: Array.isArray(base.feelings) ? base.feelings : ["고마움"],
    linked: base.linked || "관련 기록 없음",
    linkedMemoryIndex: typeof base.linkedMemoryIndex === "number" ? base.linkedMemoryIndex : fallbackIndex,
    author: base.author || "나",
    editable: base.editable !== false
  };
}

function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const hasRecord = diaryHasLinkedRecord(detail.linked);
  const linkedIndex = hasRecord ? recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0) : null;
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : (linkedIndex ?? 0);
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const linkedSection = hasRecord ? renderLinkedRecordCards(detail.linked, linkedIndex, { showMenu: false, showPicker: false }) : renderEmptyLinkedRecordSection(false);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        ${linkedSection}
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(sheet);
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  bindActions(sheet);
}

function getDiaryDraftFromEditor(fallback = {}) {
  const selectedScope = qs("[data-diary-scope] .chip-btn.active")?.textContent || "";
  const draftEditor = qs(".diary-write-page")?.dataset.draftEditor === "true";
  const scope = selectedScope ? normalizeDiaryScopeValue(selectedScope) : (draftEditor ? "draft" : normalizeDiaryScopeValue(fallback.scope || "개인"));
  return {
    heading: fallback.heading || qs(".diary-write-page .notification-header h3")?.textContent || "일기 수정",
    title: qs("#diaryTitle")?.value || fallback.title || "",
    body: qs("#diaryBody")?.value || fallback.body || "",
    scope,
    originalScope: draftEditor ? "draft" : normalizeDiaryScopeValue(fallback.originalScope || scope),
    finalScope: fallback.finalScope || null,
    feelings: qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2),
    linkedMemoryIndex: typeof fallback.linkedMemoryIndex === "number" ? fallback.linkedMemoryIndex : null,
    linked: fallback.linked || "관련 기록 없음"
  };
}

function addRecordToDiaryDraft(index, draft = {}) {
  const memory = state.memories[index] || state.memories[0];
  renderDiaryEditor({
    heading: draft.heading || "일기 수정",
    diary: {
      title: draft.title,
      body: draft.body,
      scope: draft.scope,
      originalScope: draft.originalScope,
      finalScope: draft.finalScope,
      feelings: draft.feelings,
      linked: memory.title
    },
    linkedMemoryIndex: index
  });
  showToast("관련 기록을 추가했어요.");
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = typeof linkedMemoryIndex === "number" ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  const draftMode = isDraftDiary(diary);
  const isEditMode = draftMode || heading.includes("수정") || heading.includes("상세");
  const selectedScope = normalizeDiaryScopeValue(diary?.finalScope || diary?.scope || diary?.type);
  const originalScope = draftMode ? "draft" : normalizeDiaryScopeValue(diary?.originalScope || selectedScope);
  const scopeButtons = `
    <button class="chip-btn ${!draftMode && selectedScope !== "공유" ? "active" : ""}">나만 보기</button>
    <button class="chip-btn ${!draftMode && selectedScope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button>
  `;
  const actionButtons = draftMode
    ? `<div class="diary-editor-action-row"><button class="ghost-btn" data-save-draft-diary>임시 저장</button><button class="primary-btn" data-save-final-diary>저장</button></div>`
    : isEditMode
      ? `<div class="diary-editor-action-row"><button class="ghost-btn" data-action="ai-message">AI로 정리하기</button><button class="primary-btn" data-save-diary>수정 저장</button></div>`
      : `<div class="diary-editor-action-stack"><button class="ghost-btn full" data-action="ai-message">AI로 정리하기</button><button class="ghost-btn full" data-save-original-diary>원본으로 저장</button><button class="primary-btn full" data-save-diary>임시 저장</button></div>`;
  const linkedSection = diaryHasLinkedRecord(linkedTitle) || typeof linkedMemoryIndex === "number"
    ? renderLinkedRecordCards(linkedTitle, linkedMemoryIndex, { showMenu: true })
    : renderEmptyLinkedRecordSection(true);
  openModal(`
    <div class="modal-sheet notification-page diary-write-page" data-draft-editor="${draftMode ? "true" : "false"}">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>${heading}</h3>
        ${draftMode ? `<span class="linked-diary-type diary-header-status">임시 저장</span>` : `<span class="notification-header-spacer" aria-hidden="true"></span>`}
      </header>
      <div class="section-stack">
        <div class="form-field diary-scope-field">
          <label>공개 범위</label>
          <div class="chip-row" data-diary-scope data-original-scope="${originalScope}">${scopeButtons}</div>
        </div>
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div>
        <div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>
        ${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}
        ${linkedSection}
        ${actionButtons}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  bindDiaryLinkedRecordMenu(sheet, () => openMemoryDetailLatestV3(typeof linkedMemoryIndex === "number" ? linkedMemoryIndex : (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0)));
  bindLinkedRecordDetailNavigation(sheet);
  qs("[data-diary-record-picker]")?.addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  qs("[data-save-original-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "원본으로 저장했어요."));
  qs("[data-save-draft-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "일기를 임시 저장했어요."));
  qs("[data-save-final-diary]")?.addEventListener("click", () => saveDiaryFromEditor("draft-final", linkedTitle, "일기를 저장했어요."));
  qs("[data-save-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, isEditMode ? "일기를 수정했어요." : "일기를 임시 저장했어요."));
  bindActions(sheet);
}

function buildDiaryDraftFromCurrentEditor(linkedTitle, nextScope, originalScope) {
  const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
  return {
    title: limitMemoryEditTitle(qs("#diaryTitle")?.value.trim() || "") || "제목 없는 일기",
    body: qs("#diaryBody")?.value.trim() || "임시 저장한 일기 본문",
    scope: nextScope,
    type: diaryScopeLabel(nextScope),
    originalScope,
    feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
    linked: linkedTitle,
    author: "나"
  };
}

function buildDraftOnlyDiaryFromCurrentEditor() {
  const selectedFeelings = qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2);
  return {
    title: limitMemoryEditTitle(qs("#diaryTitle")?.value.trim() || "") || "제목 없는 일기",
    body: qs("#diaryBody")?.value.trim() || "임시 저장한 일기 본문",
    scope: "draft",
    type: "임시 저장",
    originalScope: "draft",
    finalScope: null,
    feelings: selectedFeelings.length ? selectedFeelings : ["고마움"],
    linked: "관련 기록 없음",
    author: "나"
  };
}

function openDraftSaveNoticeOverlay(toastMessage = "일기를 임시 저장했어요.") {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>임시 저장할까요?</h3>
        <p>임시 저장에는 공개 범위와 관련 기록 연결이 적용되지 않아요. 나중에 저장할 때 다시 선택할 수 있어요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-draft-save-cancel>취소</button>
          <button class="primary-btn" data-draft-save-confirm>임시 저장</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-draft-save-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-draft-save-confirm]", page).addEventListener("click", () => {
    const draft = buildDraftOnlyDiaryFromCurrentEditor();
    qs(".ai-confirm-overlay", page)?.remove();
    saveDiaryDraftAndReturn(draft, toastMessage);
  });
}

function openDraftFinalMissingInfoOverlay({ missingScope, missingRecord }) {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  const message = missingScope && missingRecord
    ? "임시 저장 일기를 저장하려면 공개 범위와 관련 기록을 선택해야 해요."
    : missingScope
      ? "임시 저장 일기를 저장하려면 공개 범위를 선택해야 해요."
      : "임시 저장 일기를 저장하려면 관련 기록을 연결해야 해요.";
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>저장할 수 없어요</h3>
        <p>${message}</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-draft-final-ok>확인</button>
          ${missingRecord ? `<button class="primary-btn" data-draft-final-record>기록 선택하기</button>` : `<button class="primary-btn" data-draft-final-scope>공개 범위 선택</button>`}
        </div>
      </div>
    </div>
  `);
  qs("[data-draft-final-ok]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-draft-final-scope]", page)?.addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-draft-final-record]", page)?.addEventListener("click", () => {
    qs(".ai-confirm-overlay", page)?.remove();
    const draft = getDiaryDraftFromEditor({ heading: "일기 수정", linked: "관련 기록 없음" });
    openDiaryRecordPickerPage(draft);
  });
}

function openDiaryScopeChangeConfirmOverlay(draft, heading = "일기 수정", linkedTitle = "관련 기록 없음", toastMessage = "일기를 저장했어요.") {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  const fromDraft = normalizeDiaryScopeValue(draft.originalScope) === "draft" || heading === "draft-final";
  const nextScope = normalizeDiaryScopeValue(draft.scope);
  const nextLabel = diaryScopeLabel(nextScope);
  const title = fromDraft ? `${nextLabel}로 저장할까요?` : "일기 범위를 변경할까요?";
  const body = fromDraft
    ? `임시 저장 일기를 ${nextLabel} 일기로 저장합니다. 저장 후 다이어리 탭에서 확인할 수 있어요.`
    : `공개 범위가 ${diaryScopeLabel(draft.originalScope)}에서 ${nextLabel}로 변경됩니다.`;
  const confirmText = fromDraft ? "저장하기" : "변경하기";
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>${title}</h3>
        <p>${body}</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-diary-scope-cancel>취소</button>
          <button class="primary-btn" data-diary-scope-confirm>${confirmText}</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-scope-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-scope-confirm]", page).addEventListener("click", () => saveDiaryDraftAndReturn(draft, toastMessage || "일기를 저장했어요."));
}

function isDraftFinalSaveHeading(heading) {
  return String(heading || "") === "draft-final" || !!qs(".diary-write-page[data-draft-editor='true'] [data-save-final-diary]");
}

function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  if (isOriginalDiarySave(toastMessage) && !diaryHasLinkedRecord(linkedTitle)) {
    showToast("기록을 연결해야 원본으로 저장할 수 있어요.");
    return;
  }

  const isDraftSave = String(toastMessage || "").includes("임시");
  if (isDraftSave) {
    openDraftSaveNoticeOverlay(toastMessage);
    return;
  }

  const selectedScopeButton = qs("[data-diary-scope] .chip-btn.active");
  const selectedScopeText = selectedScopeButton?.textContent || "";
  const isDraftFinal = isDraftFinalSaveHeading(heading);
  const missingScope = isDraftFinal && !selectedScopeButton;
  const missingRecord = isDraftFinal && !diaryHasLinkedRecord(linkedTitle);
  if (missingScope || missingRecord) {
    openDraftFinalMissingInfoOverlay({ missingScope, missingRecord });
    return;
  }

  const originalScope = isDraftFinal ? "draft" : normalizeDiaryScopeValue(qs("[data-diary-scope]")?.dataset.originalScope || selectedScopeText || "개인");
  const nextScope = normalizeDiaryScopeValue(selectedScopeText || "개인");
  const draft = buildDiaryDraftFromCurrentEditor(linkedTitle, nextScope, originalScope);

  if (isDraftFinal || (isDiaryEditSaveHeading(heading) && originalScope !== nextScope)) {
    openDiaryScopeChangeConfirmOverlay(draft, isDraftFinal ? "draft-final" : heading, linkedTitle, toastMessage);
    return;
  }

  saveDiaryDraftAndReturn(draft, toastMessage);
}

function diaryTypeLabel(entry) {
  return diaryScopeLabel(entry.scope || entry.type);
}

function diaryEntriesForCurrentView() {
  normalizeDiaryView();
  const source = state.diaries || [];
  if (state.diaryView === "mineShared") return source.filter((entry) => normalizeDiaryScopeValue(entry.scope || entry.type) === "공유");
  if (state.diaryView === "private") return source.filter((entry) => normalizeDiaryScopeValue(entry.scope || entry.type) === "개인");
  return source.filter((entry) => normalizeDiaryScopeValue(entry.scope || entry.type) === "draft");
}

function isDiaryEditSaveHeading(heading) {
  const text = String(heading || "");
  return text.includes("수정") || text.includes("상세") || text.includes("?섏젙") || text.includes("?곸꽭") || text.includes("??륁젟") || text.includes("?怨멸쉭");
}

function isOriginalDiarySave(toastMessage) {
  const text = String(toastMessage || "");
  return text.includes("원본") || text.includes("?먮낯") || text.includes("?癒?궚");
}

function saveDiaryDraftAndReturn(draft, toastMessage) {
  const normalizedScope = normalizeDiaryScopeValue(draft.scope);
  const normalizedDraft = {
    ...draft,
    scope: normalizedScope,
    type: diaryScopeLabel(normalizedScope)
  };
  state.diaries.unshift(normalizedDraft);
  closeModal();
  state.diaryView = normalizedScope === "draft" ? "draft" : normalizedScope === "공유" ? "mineShared" : "private";
  renderDiary();
  showToast(toastMessage || "일기를 저장했어요.");
}

// Final diary list/detail binding override: open the clicked diary entry, not a fixed sample.
function renderDiary() {
  normalizeDiaryView();
  const diary = qs("#diary");
  const entries = diaryEntriesForCurrentView();
  diary.innerHTML = `
    <div class="section-stack">
      <div class="tabs diary-tabs">
        <button class="chip-btn ${state.diaryView === "mineShared" ? "active" : ""}" data-diary-view="mineShared">내 공유</button>
        <button class="chip-btn ${state.diaryView === "private" ? "active" : ""}" data-diary-view="private">나만 보기</button>
        <button class="chip-btn ${state.diaryView === "draft" ? "active" : ""}" data-diary-view="draft">임시 저장</button>
      </div>
      <button class="primary-btn full" data-action="diary-scope-first">일기 쓰기</button>
      <div class="list">
        ${entries.map((entry, index) => `
          <article class="diary-card" data-diary-entry-index="${index}" role="button" tabindex="0">
            <div class="between"><h3>${entry.title}</h3><span class="linked-diary-type">${diaryTypeLabel(entry)}</span></div>
            <p>${entry.body}</p>
            <div class="tag-row" style="margin-top:10px">
              ${(entry.feelings || []).slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  `;
  qsa("[data-diary-view]", diary).forEach((button) => {
    button.addEventListener("click", () => {
      state.diaryView = button.dataset.diaryView;
      renderDiary();
    });
  });
  qsa("[data-diary-entry-index]", diary).forEach((card) => {
    const openEntry = () => {
      const entry = entries[Number(card.dataset.diaryEntryIndex)] || entries[0];
      renderDiaryDetailReadOnly(entry, () => renderDiary());
    };
    card.addEventListener("click", openEntry);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openEntry();
      }
    });
  });
  bindActions(diary);
}

function openDiaryDetail() {
  const entry = diaryEntriesForCurrentView()[0] || state.diaries[0] || { title: "제목 없는 일기", body: "작성된 내용이 없습니다.", scope: "draft", linked: "관련 기록 없음", feelings: [] };
  renderDiaryDetailReadOnly(entry, () => renderDiary());
}

function openLinkedDiaryEditLatest(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  const hasRecord = diaryHasLinkedRecord(detail.linked);
  renderDiaryEditor({
    heading: "일기 수정",
    diary: {
      title: detail.title,
      body: detail.body,
      scope: detail.scope,
      type: detail.type,
      feelings: detail.feelings,
      linked: hasRecord ? detail.linked : "관련 기록 없음",
      originalScope: detail.scope,
      finalScope: detail.finalScope
    },
    linkedMemoryIndex: hasRecord ? detail.linkedMemoryIndex : null
  });
  const saveButton = qs("[data-save-diary]");
  if (saveButton) saveButton.textContent = "수정 저장";
  const backButton = qs(".diary-write-page .notification-header .notification-nav-btn[data-close]");
  if (backButton) {
    backButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      runWithoutModalHistory(backAction);
    }, { capture: true });
  }
}

// Final robust scope normalizer for mixed existing/Korean/mojibake data.
function isScopeShared(scope) {
  const text = String(scope || "").trim();
  return text === "공유" || text === "怨듭쑀" || text === "내 공유" || text.includes("공유") || text.includes("상대") || text.includes("怨듭쑀") || text.includes("?곷?") || text.includes("??怨듭쑀");
}

function isScopeDraft(scope) {
  const text = String(scope || "").trim();
  return text === "draft" || text === "임시 저장" || text.includes("임시") || text.includes("?꾩떆") || text.includes("?袁⑸뻻") || text.includes("???");
}

function normalizeDiaryScopeValue(value) {
  if (isScopeDraft(value)) return "draft";
  if (isScopeShared(value)) return "공유";
  return "개인";
}

function diaryScopeLabel(scope) {
  const normalized = normalizeDiaryScopeValue(scope);
  if (normalized === "공유") return "내 공유";
  if (normalized === "draft") return "임시 저장";
  return "나만 보기";
}

// Final unlink behavior: in diary edit, remove only the linked record and stay on the same edit screen.
function currentDiaryEditorStateForUnlink() {
  const page = qs(".diary-write-page");
  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active", page)?.textContent || "";
  const originalScope = qs("[data-diary-scope]", page)?.dataset.originalScope || (page?.dataset.draftEditor === "true" ? "draft" : "개인");
  const originalIdentity = {
    title: page?.dataset.originalTitle || "",
    body: page?.dataset.originalBody || "",
    linked: page?.dataset.originalLinked || "",
    date: page?.dataset.originalDate || ""
  };
  return {
    heading: qs(".notification-header h3", page)?.textContent || "일기 수정",
    diary: {
      title: qs("#diaryTitle", page)?.value || "",
      body: qs("#diaryBody", page)?.value || "",
      scope: originalScope === "draft" ? "draft" : normalizeDiaryScopeValue(selectedScopeText || originalScope),
      originalScope,
      finalScope: selectedScopeText ? normalizeDiaryScopeValue(selectedScopeText) : null,
      feelings: qsa("[data-diary-feelings] .chip-btn.active", page).map((button) => button.textContent.trim()).slice(0, 2),
      linked: "관련 기록 없음",
      _duariOriginal: originalIdentity
    },
    selectedScopeText
  };
}

function openDiaryUnlinkDeleteConfirmOverlay(backAction) {
  const page = qs(".diary-detail-page") || qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>연결을 해제할까요?</h3>
        <p>이 일기에서 선택한 관련 기록 연결만 삭제돼요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-diary-unlink-cancel>취소</button>
          <button class="primary-btn" data-diary-unlink-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-unlink-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-unlink-confirm]", page).addEventListener("click", () => {
    qs(".ai-confirm-overlay", page)?.remove();
    if (page.classList.contains("diary-write-page")) {
      const snapshot = currentDiaryEditorStateForUnlink();
      runWithoutModalHistory(() => renderDiaryEditor({
        heading: snapshot.heading,
        diary: snapshot.diary,
        linkedMemoryIndex: null
      }));
      if (snapshot.selectedScopeText) {
        qsa("[data-diary-scope] .chip-btn").forEach((button) => {
          button.classList.toggle("active", button.textContent.trim() === snapshot.selectedScopeText.trim());
        });
      }
      showToast("관련 기록 연결을 삭제했어요.");
      return;
    }
    runWithoutModalHistory(backAction);
    showToast("연결을 해제했어요.");
  });
}

// Final related-record fallback rule: only draft diaries may show an empty related-record state.
function fallbackDiaryRecordIndex(linkedTitle, linkedMemoryIndex = null) {
  if (typeof linkedMemoryIndex === "number") return linkedMemoryIndex;
  if (diaryHasLinkedRecord(linkedTitle)) return recordIndexByTitle(linkedTitle, typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0);
  return typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
}

function renderLinkedRecordCards(linkedTitle, linkedMemoryIndex = null, options = {}) {
  const allowEmpty = options.allowEmpty === true;
  if (allowEmpty && !diaryHasLinkedRecord(linkedTitle) && typeof linkedMemoryIndex !== "number") {
    return renderEmptyLinkedRecordSection(options.showPicker !== false);
  }
  const showMenu = options.showMenu ?? true;
  const fallbackIndex = fallbackDiaryRecordIndex(linkedTitle, linkedMemoryIndex);
  const record = state.memories[fallbackIndex] || state.memories[0];
  const index = recordIndexByTitle(record.title, fallbackIndex);
  return `
    <section class="card linked-record-card">
      <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
      <div class="linked-record-list">
        <article class="linked-record-pill"${showMenu ? "" : ` role="button" tabindex="0" data-linked-record-detail="${index}"`}>
          <div class="linked-record-title-row title-between">
            <span class="linked-record-title-text">${record.title}</span>
            <div class="linked-record-right-tools">
              <em class="linked-record-scope">${scopeLabelForRecord(record)}</em>
              ${showMenu ? `<div class="linked-record-menu-wrap"><button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="더보기" title="더보기"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${index}">상세 보기</button><button data-diary-unlink-record>삭제</button></div></div>` : ""}
            </div>
          </div>
        </article>
      </div>
      ${options.showPicker === false ? "" : `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>`}
    </section>
  `;
}

function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const draftMode = isDraftDiary(detail);
  const hasRecord = diaryHasLinkedRecord(detail.linked);
  const linkedIndex = hasRecord ? recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0) : (draftMode ? null : fallbackDiaryRecordIndex(detail.linked, detail.linkedMemoryIndex));
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : (linkedIndex ?? 0);
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const linkedSection = draftMode && !hasRecord
    ? renderEmptyLinkedRecordSection(false)
    : renderLinkedRecordCards(detail.linked, linkedIndex, { showMenu: false, showPicker: false });
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        ${linkedSection}
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  qs("[data-diary-detail-back]").addEventListener("click", () => runWithoutModalHistory(resolvedBackAction));
  bindLinkedRecordDetailNavigation(sheet);
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  bindActions(sheet);
}

function renderDiaryEditor({ heading = "일기 쓰기", diary = null, linkedMemoryIndex = null } = {}) {
  const linkedMemory = typeof linkedMemoryIndex === "number" ? state.memories[linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary?.linked || "관련 기록 없음";
  const diaryTitle = limitMemoryEditTitle(diary?.title || "");
  const draftMode = isDraftDiary(diary);
  const isEditMode = draftMode || heading.includes("수정") || heading.includes("상세");
  const selectedScope = normalizeDiaryScopeValue(diary?.finalScope || diary?.scope || diary?.type);
  const originalScope = draftMode ? "draft" : normalizeDiaryScopeValue(diary?.originalScope || selectedScope);
  const scopeButtons = `
    <button class="chip-btn ${!draftMode && selectedScope !== "공유" ? "active" : ""}">나만 보기</button>
    <button class="chip-btn ${!draftMode && selectedScope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" ${state.connected ? "" : "disabled"}>상대에게 공유</button>
  `;
  const actionButtons = draftMode
    ? `<div class="diary-editor-action-row"><button class="ghost-btn" data-save-draft-diary>임시 저장</button><button class="primary-btn" data-save-final-diary>저장</button></div>`
    : isEditMode
      ? `<div class="diary-editor-action-row"><button class="ghost-btn" data-action="ai-message">AI로 정리하기</button><button class="primary-btn" data-save-diary>수정 저장</button></div>`
      : `<div class="diary-editor-action-stack"><button class="ghost-btn full" data-action="ai-message">AI로 정리하기</button><button class="ghost-btn full" data-save-original-diary>원본으로 저장</button><button class="primary-btn full" data-save-diary>임시 저장</button></div>`;
  const linkedSection = draftMode && !diaryHasLinkedRecord(linkedTitle) && typeof linkedMemoryIndex !== "number"
    ? renderEmptyLinkedRecordSection(true)
    : renderLinkedRecordCards(linkedTitle, linkedMemoryIndex, { showMenu: true, allowEmpty: false });
  openModal(`
    <div class="modal-sheet notification-page diary-write-page" data-draft-editor="${draftMode ? "true" : "false"}">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>${heading}</h3>
        ${draftMode ? `<span class="linked-diary-type diary-header-status">임시 저장</span>` : `<span class="notification-header-spacer" aria-hidden="true"></span>`}
      </header>
      <div class="section-stack">
        <div class="form-field diary-scope-field">
          <label>공개 범위</label>
          <div class="chip-row" data-diary-scope data-original-scope="${originalScope}">${scopeButtons}</div>
        </div>
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count" data-diary-title-count>${diaryTitle.length}/24</span></div><input id="diaryTitle" value="${diaryTitle}" maxlength="24" /></div>
        <div class="form-field"><label>본문</label><textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${diary?.body || ""}</textarea></div>
        ${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], diary?.feelings || [], "data-diary-feelings")}
        ${linkedSection}
        ${actionButtons}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  makeToggleButtons(qs("[data-diary-feelings]"));
  const titleInput = qs("#diaryTitle");
  const titleCount = qs("[data-diary-title-count]");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-diary-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-diary-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  bindDiaryLinkedRecordMenu(sheet, () => openMemoryDetailLatestV3(typeof linkedMemoryIndex === "number" ? linkedMemoryIndex : (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0)));
  bindLinkedRecordDetailNavigation(sheet);
  qs("[data-diary-record-picker]")?.addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  qs("[data-save-original-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "원본으로 저장했어요."));
  qs("[data-save-draft-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, "일기를 임시 저장했어요."));
  qs("[data-save-final-diary]")?.addEventListener("click", () => saveDiaryFromEditor("draft-final", linkedTitle, "일기를 저장했어요."));
  qs("[data-save-diary]")?.addEventListener("click", () => saveDiaryFromEditor(heading, linkedTitle, isEditMode ? "일기를 수정했어요." : "일기를 임시 저장했어요."));
  bindActions(sheet);
}

// Final save rule: every non-draft diary save requires one explicitly linked record.
function openRequiredLinkedRecordOverlay({ missingScope = false } = {}) {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  const message = missingScope
    ? "공개 범위와 관련 기록을 선택해야 저장할 수 있어요."
    : "관련 기록을 하나 이상 선택해야 저장할 수 있어요.";
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>저장할 수 없어요</h3>
        <p>${message}</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-required-link-ok>확인</button>
          <button class="primary-btn" data-required-link-pick>기록 선택하기</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-required-link-ok]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-required-link-pick]", page).addEventListener("click", () => {
    qs(".ai-confirm-overlay", page)?.remove();
    const draft = getDiaryDraftFromEditor({ heading: qs(".notification-header h3", page)?.textContent || "일기 수정", linked: "관련 기록 없음" });
    openDiaryRecordPickerPage(draft);
  });
}

function saveDiaryFromEditor(heading, linkedTitle, toastMessage) {
  const isDraftSave = String(toastMessage || "").includes("임시");
  if (isDraftSave) {
    openDraftSaveNoticeOverlay(toastMessage);
    return;
  }

  const selectedScopeButton = qs("[data-diary-scope] .chip-btn.active");
  const selectedScopeText = selectedScopeButton?.textContent || "";
  const isDraftFinal = isDraftFinalSaveHeading(heading);
  const missingScope = isDraftFinal && !selectedScopeButton;
  const missingRecord = !diaryHasLinkedRecord(linkedTitle);

  if (missingScope || missingRecord) {
    if (isDraftFinal) {
      openDraftFinalMissingInfoOverlay({ missingScope, missingRecord });
    } else {
      openRequiredLinkedRecordOverlay({ missingScope });
    }
    return;
  }

  if (isOriginalDiarySave(toastMessage) && !diaryHasLinkedRecord(linkedTitle)) {
    showToast("기록을 연결해야 원본으로 저장할 수 있어요.");
    return;
  }

  const originalScope = isDraftFinal ? "draft" : normalizeDiaryScopeValue(qs("[data-diary-scope]")?.dataset.originalScope || selectedScopeText || "개인");
  const nextScope = normalizeDiaryScopeValue(selectedScopeText || "개인");
  const draft = buildDiaryDraftFromCurrentEditor(linkedTitle, nextScope, originalScope);

  if (isDraftFinal || (isDiaryEditSaveHeading(heading) && originalScope !== nextScope)) {
    openDiaryScopeChangeConfirmOverlay(draft, isDraftFinal ? "draft-final" : heading, linkedTitle, toastMessage);
    return;
  }

  saveDiaryDraftAndReturn(draft, toastMessage);
}

// Final flow-aware back navigation: child pages return to their owning parent page.
function runFlowBack(action) {
  if (typeof action === "function") {
    runWithoutModalHistory(action);
    return;
  }
  if (modalHistory.length) {
    restorePreviousModal();
    return;
  }
  closeModal();
}

function bindLinkedDiaryCardsLatest(root, backAction = null) {
  root.addEventListener("click", (event) => {
    const menuButton = event.target.closest("[data-linked-diary-menu]");
    if (menuButton) {
      event.preventDefault();
      event.stopPropagation();
      const menu = menuButton.closest(".linked-diary-menu-wrap")?.querySelector("[data-linked-diary-dropdown]");
      const willOpen = !!menu?.hidden;
      qsa("[data-linked-diary-dropdown]", root).forEach((item) => { item.hidden = true; });
      qsa("[data-linked-diary-menu]", root).forEach((item) => item.classList.remove("active"));
      if (menu && willOpen) {
        menu.hidden = false;
        menuButton.classList.add("active");
      }
      return;
    }

    const detailButton = event.target.closest("[data-linked-diary-menu-detail]");
    if (detailButton) {
      event.preventDefault();
      event.stopPropagation();
      qsa("[data-linked-diary-dropdown]", root).forEach((item) => { item.hidden = true; });
      openLinkedDiaryDetailLatest(Number(detailButton.dataset.linkedDiaryMenuDetail), backAction);
      return;
    }

    const editButton = event.target.closest("[data-linked-diary-menu-edit]");
    if (editButton) {
      event.preventDefault();
      event.stopPropagation();
      qsa("[data-linked-diary-dropdown]", root).forEach((item) => { item.hidden = true; });
      const diary = linkedDiariesLatest()[Number(editButton.dataset.linkedDiaryMenuEdit)];
      if (diary) openLinkedDiaryEditLatest(normalizeDiaryForDetail(diary), () => runWithoutModalHistory(backAction || (() => openMemoryEditPageLatest(state.activeMemoryIndex || 0))));
      return;
    }

    const unlinkButton = event.target.closest("[data-linked-diary-menu-unlink]");
    if (unlinkButton) {
      event.preventDefault();
      event.stopPropagation();
      qsa("[data-linked-diary-dropdown]", root).forEach((item) => { item.hidden = true; });
      openLinkedDiaryUnlinkConfirm(Number(unlinkButton.dataset.linkedDiaryMenuUnlink), backAction);
    }
  });
  qsa("[data-linked-diary-index]", root).forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-linked-diary-menu], [data-linked-diary-dropdown], .linked-diary-menu-wrap")) return;
      openLinkedDiaryDetailLatest(Number(card.dataset.linkedDiaryIndex), backAction);
    });
  });
}

function openLinkedDiaryUnlinkConfirm(index, backAction = null) {
  const page = qs(".memory-edit-page") || qs(".memory-detail-page") || qs("#modal");
  const diary = linkedDiariesLatest()[index];
  if (!page || !diary) return;
  qs(".ai-confirm-overlay", page)?.remove();
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <section class="ai-confirm-sheet">
        <h3>연결을 해제할까요?</h3>
        <p>이 일기는 삭제되지 않고 현재 기록과의 연결만 해제돼요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" type="button" data-linked-diary-unlink-cancel>취소</button>
          <button class="primary-btn" type="button" data-linked-diary-unlink-confirm>연결 해제</button>
        </div>
      </section>
    </div>
  `);
  qs("[data-linked-diary-unlink-cancel]", page)?.addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-linked-diary-unlink-confirm]", page)?.addEventListener("click", () => {
    const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
    const memoryTitle = state.memories?.[memoryIndex]?.title || diary.linked;
    const savedIndex = (state.diaries || []).indexOf(diary);
    const nextDiary = { ...diary, linked: "관련 기록 없음" };
    if (nextDiary.linkedMemoryTitle === memoryTitle) delete nextDiary.linkedMemoryTitle;
    if (savedIndex >= 0) state.diaries[savedIndex] = nextDiary;
    if (typeof memoryLinkedAddedDiaries !== "undefined" && Array.isArray(memoryLinkedAddedDiaries[memoryIndex])) {
      memoryLinkedAddedDiaries[memoryIndex] = memoryLinkedAddedDiaries[memoryIndex].filter((item) => item !== diary);
    }
    duariInstallContentPersistenceHooks();
    duariSavePersistentContent();
    qs(".ai-confirm-overlay", page)?.remove();
    runWithoutModalHistory(() => {
      if (qs(".memory-edit-page")) openMemoryEditPageLatest(memoryIndex, backAction || (() => openMemoryDetailLatestV3(memoryIndex)));
      else openMemoryDetailLatestV3(memoryIndex, backAction);
    });
    showToast("일기 연결을 해제했어요.");
  });
}

function openMemoryDetailLatestV3(index, backAction = null) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const photoCount = 7;
  const limitedTitle = limitMemoryTitleLatest(memory.title);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-memory-detail-back aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount)}</div>
          </div>
        </section>
        <section class="card">
          <div class="between">
            <h3 class="memory-limited-title" title="${memory.title}">${limitedTitle}</h3>
            <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
          </div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
        </section>
        <section class="card linked-diary-section">
          <div class="between">
            <h3>연결된 일기</h3>
            <span class="meta">3개</span>
          </div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page data-index="${index}">기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-detail-back]").addEventListener("click", () => runFlowBack(backAction));
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(index, () => openMemoryDetailLatestV3(index, backAction)));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(index, backAction));
  bindActions(qs(".modal-sheet"));
}

openMemoryDetailPageFinal = (index) => openMemoryDetailLatestV3(index);

function openLinkedDiaryDetailLatest(index, backAction = null) {
  const diary = linkedDiariesLatest()[index] || linkedDiariesLatest()[0];
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  const resolvedBack = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  renderDiaryDetailReadOnly(normalizeDiaryForDetail(diary, index), resolvedBack);
}

function renderDiaryDetailReadOnly(diary, backAction = null) {
  const detail = normalizeDiaryForDetail(diary);
  const draftMode = isDraftDiary(detail);
  const hasRecord = diaryHasLinkedRecord(detail.linked);
  const linkedIndex = hasRecord ? recordIndexByTitle(detail.linked, detail.linkedMemoryIndex || 0) : (draftMode ? null : fallbackDiaryRecordIndex(detail.linked, detail.linkedMemoryIndex));
  const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : (linkedIndex ?? 0);
  const resolvedBackAction = backAction || (() => openMemoryDetailLatestV3(memoryIndex));
  const linkedSection = draftMode && !hasRecord
    ? renderEmptyLinkedRecordSection(false)
    : renderLinkedRecordCards(detail.linked, linkedIndex, { showMenu: false, showPicker: false });
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${detail.title}</h3><span class="linked-diary-type">${detail.type}</span></div>
          <p class="diary-detail-body">${detail.body}</p>
          <div class="tag-row diary-detail-feelings">${detail.feelings.slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </section>
        ${linkedSection}
        ${detail.editable ? `<div class="diary-detail-actions"><button class="primary-btn" data-diary-edit>수정</button></div>` : ""}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  qs("[data-diary-detail-back]").addEventListener("click", () => runFlowBack(resolvedBackAction));
  bindLinkedRecordDetailNavigation(sheet, () => renderDiaryDetailReadOnly(detail, resolvedBackAction));
  const editButton = qs("[data-diary-edit]");
  if (editButton) editButton.addEventListener("click", () => openLinkedDiaryEditLatest(detail, () => renderDiaryDetailReadOnly(detail, resolvedBackAction)));
  bindActions(sheet);
}

function openLinkedDiaryEditLatest(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  const hasRecord = diaryHasLinkedRecord(detail.linked);
  renderDiaryEditor({
    heading: "일기 수정",
    diary: {
      title: detail.title,
      body: detail.body,
      scope: detail.scope,
      type: detail.type,
      feelings: detail.feelings,
      linked: hasRecord ? detail.linked : "관련 기록 없음",
      originalScope: detail.scope,
      finalScope: detail.finalScope
    },
    linkedMemoryIndex: hasRecord ? detail.linkedMemoryIndex : null
  });
  const saveButton = qs("[data-save-diary]");
  if (saveButton) saveButton.textContent = "수정 저장";
  const backButton = qs(".diary-write-page .notification-header .notification-nav-btn[data-close]");
  if (backButton) {
    backButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      runFlowBack(backAction);
    }, { capture: true });
  }
}

function openMemoryEditPageLatest(index, backAction = null) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  const resolvedBack = backAction || (() => openMemoryDetailLatestV3(index));
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page memory-edit-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div>
          <input class="memory-title-input" value="${editTitle}" maxlength="24" />
        </div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>${memory.type}</option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div><div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div><button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button><button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div><div class="linked-diary-list">${linkedDiaryCardsLatest()}</div><button class="ghost-btn full" data-linked-diary-add style="margin-top:12px">일기 연결 추가</button></section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runFlowBack(resolvedBack));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    runWithoutModalHistory(() => openMemoryDetailLatestV3(index, backAction));
    showToast("기록 수정 내용이 저장됐어요.");
  });
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index, resolvedBack)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index, resolvedBack));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindPhotoManageDeleteButtons(qs(".modal-sheet"), { memoryIndex: index });
  bindActions(qs(".modal-sheet"));
}

// Final diary editor parent preservation across record picker/preview/select subflows.
let diaryEditorFlowBackAction = null;
const renderDiaryEditorFlowBase = renderDiaryEditor;
function attachDiaryEditorFlowBack(backAction) {
  const backButton = qs(".diary-write-page .notification-header .notification-nav-btn[data-close]");
  if (!backButton || typeof backAction !== "function") return;
  backButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    runFlowBack(backAction);
  }, { capture: true });
}

renderDiaryEditor = function renderDiaryEditor(args = {}) {
  renderDiaryEditorFlowBase(args);
  attachDiaryEditorFlowBack(args.backAction || diaryEditorFlowBackAction);
};

function openLinkedDiaryEditLatest(diary, backAction = restorePreviousModal) {
  const detail = normalizeDiaryForDetail(diary);
  const hasRecord = diaryHasLinkedRecord(detail.linked);
  diaryEditorFlowBackAction = backAction;
  renderDiaryEditor({
    heading: "일기 수정",
    diary: {
      title: detail.title,
      body: detail.body,
      scope: detail.scope,
      type: detail.type,
      feelings: detail.feelings,
      linked: hasRecord ? detail.linked : "관련 기록 없음",
      originalScope: detail.scope,
      finalScope: detail.finalScope
    },
    linkedMemoryIndex: hasRecord ? detail.linkedMemoryIndex : null,
    backAction
  });
  const saveButton = qs("[data-save-diary]");
  if (saveButton) saveButton.textContent = "수정 저장";
}

function getDiaryDraftFromEditor(fallback = {}) {
  const selectedScope = qs("[data-diary-scope] .chip-btn.active")?.textContent || "";
  const draftEditor = qs(".diary-write-page")?.dataset.draftEditor === "true";
  const scope = selectedScope ? normalizeDiaryScopeValue(selectedScope) : (draftEditor ? "draft" : normalizeDiaryScopeValue(fallback.scope || "개인"));
  return {
    heading: fallback.heading || qs(".diary-write-page .notification-header h3")?.textContent || "일기 수정",
    title: qs("#diaryTitle")?.value || fallback.title || "",
    body: qs("#diaryBody")?.value || fallback.body || "",
    scope,
    originalScope: draftEditor ? "draft" : normalizeDiaryScopeValue(fallback.originalScope || scope),
    finalScope: fallback.finalScope || null,
    feelings: qsa("[data-diary-feelings] .chip-btn.active").map((button) => button.textContent.trim()).slice(0, 2),
    linkedMemoryIndex: typeof fallback.linkedMemoryIndex === "number" ? fallback.linkedMemoryIndex : null,
    linked: fallback.linked || "관련 기록 없음",
    backAction: fallback.backAction || diaryEditorFlowBackAction
  };
}

function openDiaryRecordPickerPage(draft = {}) {
  const cards = state.memories.map((memory, index) => `
    <article class="record-picker-card">
      <div class="between"><h3>${limitMemoryTitleLatest(memory.title, 18)}</h3><span class="linked-record-scope">${scopeLabelForRecord(memory)}</span></div>
      <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
      <div class="record-picker-actions">
        <button class="ghost-btn" data-record-preview="${index}">상세 보기</button>
        <button class="primary-btn" data-record-select="${index}">선택 추가</button>
      </div>
    </article>
  `).join("");
  openModal(`
    <div class="modal-sheet notification-page diary-record-picker-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-picker-back aria-label="뒤로가기">←</button>
        <h3>기록 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="record-picker-list">${cards}</div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-picker-back]").addEventListener("click", () => runWithoutModalHistory(() => renderDiaryEditor({ heading: draft.heading || "일기 수정", diary: draft, linkedMemoryIndex: draft.linkedMemoryIndex, backAction: draft.backAction || diaryEditorFlowBackAction })));
  qsa("[data-record-preview]").forEach((button) => {
    button.addEventListener("click", () => openDiaryRecordPreviewPage(Number(button.dataset.recordPreview), draft));
  });
  qsa("[data-record-select]").forEach((button) => {
    button.addEventListener("click", () => addRecordToDiaryDraft(Number(button.dataset.recordSelect), draft));
  });
}

function openDiaryRecordPreviewPage(index, draft = {}) {
  const memory = state.memories[index] || state.memories[0];
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-preview-back aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역"><div class="memory-photo-main"><div class="memory-photo-scroll">${memoryPhotoScrollerLatest(7)}</div></div></section>
        <section class="card"><div class="between"><h3 class="memory-limited-title" title="${memory.title}">${limitMemoryTitleLatest(memory.title)}</h3><span class="linked-record-scope">${scopeLabelForRecord(memory)}</span></div><p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p></section>
        <div class="record-picker-actions">
          <button class="ghost-btn" data-preview-cancel>취소</button>
          <button class="primary-btn" data-preview-select>이 기록 추가</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const goBack = () => runWithoutModalHistory(() => openDiaryRecordPickerPage(draft));
  qs("[data-preview-back]").addEventListener("click", goBack);
  qs("[data-preview-cancel]").addEventListener("click", goBack);
  qs("[data-preview-select]").addEventListener("click", () => addRecordToDiaryDraft(index, draft));
}

function addRecordToDiaryDraft(index, draft = {}) {
  const memory = state.memories[index] || state.memories[0];
  runWithoutModalHistory(() => renderDiaryEditor({
    heading: draft.heading || "일기 수정",
    diary: {
      title: draft.title,
      body: draft.body,
      scope: draft.scope,
      originalScope: draft.originalScope,
      finalScope: draft.finalScope,
      feelings: draft.feelings,
      linked: memory.title,
      _duariOriginal: draft._duariOriginal,
      backAction: draft.backAction || diaryEditorFlowBackAction
    },
    linkedMemoryIndex: index,
    backAction: draft.backAction || diaryEditorFlowBackAction
  }));
  showToast("관련 기록을 추가했어요.");
}

// Final home copy and page-style record creation flow.
function renderHome() {
  const home = qs("#home");
  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <section class="card home-records-card"><h3>최근 우리 기록</h3><button class="primary-btn full" data-action="new-memory">기록 추가</button></section>
        <section class="diary-card"><h3>최근 공유 일기</h3><p>연결 전에는 공유 일기를 사용할 수 없어요.</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
      </div>
    `;
    bindActions(home);
    return;
  }

  const sharedDiary = state.diaries.find((diary) => normalizeDiaryScopeValue(diary.scope) === "공유");
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
      <section class="card home-records-card"><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div><button class="primary-btn full" data-action="new-memory">기록 추가</button></section>
      <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${sharedDiary?.body || "아직 공유 일기가 없어요."}</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
    </div>
  `;
  bindActions(home);
}

function openMemoryModal() {
  openMemoryCreatePage();
}

function openMemoryCreatePage(backAction = null) {
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page memory-edit-page memory-create-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-memory-create-back aria-label="뒤로가기">←</button>
        <h3>기록 추가</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count">0/24</span></div>
          <input class="memory-title-input" id="memoryTitle" value="" maxlength="24" />
        </div>
        <div class="form-field"><label>날짜</label><input id="memoryDate" type="date" value="" /></div>
        <div class="form-field"><label>장소</label><input id="memoryPlace" value="" /></div>
        <div class="form-field"><label>기록 유형</label><select id="memoryType"><option value="" selected></option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <div class="form-field"><label>공개 범위</label><div class="chip-row" data-memory-scope><button class="chip-btn ${state.connected ? "active" : ""}" ${state.connected ? "" : "disabled"}>우리 둘이 보기</button><button class="chip-btn ${state.connected ? "" : "active"}">나만 보기</button></div></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">0장</span></div><div class="photo-order-grid compact is-empty"><p class="linked-record-empty">추가된 사진이 없습니다.</p></div><button class="ghost-btn full" data-photo-add-choice style="margin-top:12px">사진 추가</button></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">0개</span></div><p class="linked-record-empty">연결된 일기가 없습니다.</p><button class="ghost-btn full" data-linked-diary-add style="margin-top:12px">일기 연결 추가</button></section>
        <button class="primary-btn full" data-save-memory-create>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-create-back]").addEventListener("click", () => runFlowBack(backAction));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  qsa("[data-memory-scope] .chip-btn:not([disabled])").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-memory-scope] .chip-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(null));
  qs("[data-save-memory-create]").addEventListener("click", () => {
    const title = limitMemoryEditTitle(qs("#memoryTitle")?.value.trim() || "") || "제목 없는 기록";
    const dateValue = qs("#memoryDate")?.value || new Date().toISOString().slice(0, 10);
    const place = qs("#memoryPlace")?.value.trim() || "";
    const type = qs("#memoryType")?.value || "일상";
    const scope = qs("[data-memory-scope] .chip-btn.active")?.textContent.trim() || "나만 보기";
    state.memories.unshift({
      title,
      date: dateValue.replaceAll("-", "."),
      place,
      type,
      note: "",
      scope,
      feelings: [],
      reaction: "",
      author: "나"
    });
    closeModal();
    render();
    showToast("기록이 저장됐어요.");
  });
  bindActions(qs(".modal-sheet"));
}

// Final record add/edit layout alignment: scope first, photo actions, diary action copy.
function memoryScopeFieldHtml(activeScope = null) {
  const scope = activeScope || (state.connected ? "우리 둘이 보기" : "나만 보기");
  return `<div class="form-field"><label>공개 범위</label><div class="chip-row" data-memory-scope><button class="chip-btn ${scope === "우리 둘이 보기" ? "active" : ""}" ${state.connected ? "" : "disabled"}>우리 둘이 보기</button><button class="chip-btn ${scope === "나만 보기" ? "active" : ""}>나만 보기</button></div></div>`;
}

function bindMemoryScopeButtons(root = document) {
  qsa("[data-memory-scope] .chip-btn:not([disabled])", root).forEach((button) => button.addEventListener("click", () => {
    qsa("[data-memory-scope] .chip-btn", root).forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  }));
}

function openMemoryEditPageLatest(index, backAction = null) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  const resolvedBack = backAction || (() => openMemoryDetailLatestV3(index));
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page memory-edit-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${memoryScopeFieldHtml(memory.scope)}
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div>
          <input class="memory-title-input" value="${editTitle}" maxlength="24" />
        </div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>${memory.type}</option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div><div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div><button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button><button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div><div class="linked-diary-list">${linkedDiaryCardsLatest()}</div><button class="ghost-btn full" data-linked-diary-select style="margin-top:12px">연결한 일기 선택</button><button class="ghost-btn full" data-linked-diary-add style="margin-top:8px">일기 추가</button></section>
        <button class="primary-btn full" data-save-memory-edit>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runFlowBack(resolvedBack));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  bindMemoryScopeButtons(qs(".modal-sheet"));
  qs("[data-save-memory-edit]").addEventListener("click", () => {
    runWithoutModalHistory(() => openMemoryDetailLatestV3(index, backAction));
    showToast("기록 수정 내용이 저장됐어요.");
  });
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index, resolvedBack)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  qs("[data-linked-diary-select]").addEventListener("click", () => showToast("연결할 일기 선택 화면을 열었어요."));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index, resolvedBack));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function openMemoryCreatePage(backAction = null) {
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page memory-edit-page memory-create-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-memory-create-back aria-label="뒤로가기">←</button>
        <h3>기록 추가</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${memoryScopeFieldHtml(state.connected ? "우리 둘이 보기" : "나만 보기")}
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count">0/24</span></div>
          <input class="memory-title-input" id="memoryTitle" value="" maxlength="24" />
        </div>
        <div class="form-field"><label>날짜</label><input id="memoryDate" type="date" value="" /></div>
        <div class="form-field"><label>장소</label><input id="memoryPlace" value="" /></div>
        <div class="form-field"><label>기록 유형</label><select id="memoryType"><option value="" selected></option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">0장</span></div><div class="photo-order-grid compact is-empty"><p class="linked-record-empty photo-empty-line">추가된 사진이 없습니다.</p></div><button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button><button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">0개</span></div><p class="linked-record-empty">연결된 일기가 없습니다.</p><button class="ghost-btn full" data-linked-diary-select style="margin-top:12px">연결한 일기 선택</button><button class="ghost-btn full" data-linked-diary-add style="margin-top:8px">일기 추가</button></section>
        <button class="primary-btn full" data-save-memory-create>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-create-back]").addEventListener("click", () => runFlowBack(backAction));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  bindMemoryScopeButtons(qs(".modal-sheet"));
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryCreatePage(backAction)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(null));
  qs("[data-linked-diary-select]").addEventListener("click", () => showToast("연결할 일기 선택 화면을 열었어요."));
  qs("[data-save-memory-create]").addEventListener("click", () => {
    const title = limitMemoryEditTitle(qs("#memoryTitle")?.value.trim() || "") || "제목 없는 기록";
    const dateValue = qs("#memoryDate")?.value || new Date().toISOString().slice(0, 10);
    const place = qs("#memoryPlace")?.value.trim() || "";
    const type = qs("#memoryType")?.value || "일상";
    const scope = qs("[data-memory-scope] .chip-btn.active")?.textContent.trim() || "나만 보기";
    state.memories.unshift({ title, date: dateValue.replaceAll("-", "."), place, type, note: "", scope, feelings: [], reaction: "", author: "나" });
    closeModal();
    render();
    showToast("기록이 저장됐어요.");
  });
  bindActions(qs(".modal-sheet"));
}

// Final correction for record add/edit: valid scope buttons and real linked-diary selection page.
const memoryLinkedDiarySelection = { create: null, edit: {} };

function memoryScopeFieldHtml(activeScope = null) {
  const scope = activeScope || (state.connected ? "우리 둘이 보기" : "나만 보기");
  return `<div class="form-field"><label>공개 범위</label><div class="chip-row" data-memory-scope><button class="chip-btn ${scope === "우리 둘이 보기" ? "active" : ""}" ${state.connected ? "" : "disabled"}>우리 둘이 보기</button><button class="chip-btn ${scope === "나만 보기" ? "active" : ""}">나만 보기</button></div></div>`;
}

function selectedLinkedDiaryCardsHtml(mode = "edit", index = null) {
  if (mode === "create" && memoryLinkedDiarySelection.createDiary) {
    const diary = memoryLinkedDiarySelection.createDiary;
    return {
      count: 1,
      html: `<div class="linked-diary-list"><article class="linked-diary-card" role="button" tabindex="0" data-memory-create-linked-diary><div class="between"><strong>${diary.title}</strong><span class="linked-diary-type">${diary.type}</span></div><p>${diary.body}</p>${linkedDiaryEmotionRow(diary)}</article></div>`
    };
  }
  const selectedIndex = mode === "create" ? memoryLinkedDiarySelection.create : memoryLinkedDiarySelection.edit[index];
  if (typeof selectedIndex === "number") {
    const diary = mode === "create"
      ? (state.diaries[selectedIndex] || state.diaries[0])
      : (linkedDiariesLatest()[selectedIndex] || linkedDiariesLatest()[0]);
    return {
      count: 1,
      html: `<div class="linked-diary-list"><article class="linked-diary-card" role="button" tabindex="0" data-memory-create-linked-diary data-memory-create-diary-index="${selectedIndex}"><div class="between"><strong>${diary.title}</strong><span class="linked-diary-type">${diary.type}</span></div><p>${diary.body}</p>${linkedDiaryEmotionRow(diary)}</article></div>`
    };
  }
  if (mode === "edit") {
    const diaries = linkedDiariesLatest();
    return {
      count: diaries.length,
      html: diaries.length ? `<div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>` : `<p class="linked-record-empty">연결된 일기가 없습니다.</p>`
    };
  }
  return { count: 0, html: `<p class="linked-record-empty">연결된 일기가 없습니다.</p>` };
}

function openLinkedDiarySelectPage({ mode = "edit", memoryIndex = null, backAction = null } = {}) {
  const diaries = mode === "create" ? (state.diaries || []) : linkedDiariesLatest();
  openModal(`
    <div class="modal-sheet notification-page diary-record-picker-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-linked-diary-select-back aria-label="뒤로가기">←</button>
        <h3>연결한 일기 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="record-picker-list">
          ${diaries.map((diary, diaryIndex) => `
            <article class="record-picker-card">
              <div class="between"><h3>${diary.title}</h3><span class="linked-diary-type">${diary.type}</span></div>
              <p>${diary.body}</p>
              ${linkedDiaryEmotionRow(diary)}
              <div class="record-picker-actions">
                <button class="ghost-btn" data-linked-diary-preview="${diaryIndex}">상세 보기</button>
                <button class="primary-btn" data-linked-diary-pick="${diaryIndex}">선택</button>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const returnToOwner = () => mode === "create" ? openMemoryCreatePage(backAction) : openMemoryEditPageLatest(memoryIndex ?? 0, backAction);
  qs("[data-linked-diary-select-back]").addEventListener("click", () => runWithoutModalHistory(returnToOwner));
  qsa("[data-linked-diary-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      const diaryIndex = Number(button.dataset.linkedDiaryPreview);
      openLinkedDiaryDetailLatest(diaryIndex, () => openLinkedDiarySelectPage({ mode, memoryIndex, backAction }));
    });
  });
  qsa("[data-linked-diary-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      const diaryIndex = Number(button.dataset.linkedDiaryPick);
      if (mode === "create") memoryLinkedDiarySelection.create = diaryIndex;
      else memoryLinkedDiarySelection.edit[memoryIndex ?? 0] = diaryIndex;
      runWithoutModalHistory(returnToOwner);
      showToast("연결할 일기를 선택했어요.");
    });
  });
}

function bindMemoryCreateLinkedDiaryCard(root, backAction = null, beforeOpen = null) {
  qsa("[data-memory-create-linked-diary]", root).forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-linked-diary-menu], [data-linked-diary-dropdown], .linked-diary-menu-wrap")) return;
      if (typeof beforeOpen === "function") beforeOpen();
      openMemoryCreateLinkedDiaryDetail(backAction, Number.isNaN(Number(card.dataset.memoryCreateDiaryIndex)) ? null : Number(card.dataset.memoryCreateDiaryIndex));
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      if (typeof beforeOpen === "function") beforeOpen();
      openMemoryCreateLinkedDiaryDetail(backAction, Number.isNaN(Number(card.dataset.memoryCreateDiaryIndex)) ? null : Number(card.dataset.memoryCreateDiaryIndex));
    });
  });
}

function memoryCreateSelectedDiaryCopy(selectedIndex = null) {
  const index = typeof selectedIndex === "number" ? selectedIndex : memoryLinkedDiarySelection.create;
  const diary = memoryLinkedDiarySelection.createDiary || (typeof index === "number" ? state.diaries[index] : null);
  return diary ? { ...diary, editable: true } : null;
}

function openMemoryCreateLinkedDiaryDetail(backAction = null, selectedIndex = null) {
  const diary = memoryCreateSelectedDiaryCopy(selectedIndex);
  if (!diary) {
    openMemoryCreatePage(backAction);
    return;
  }
  const feelings = (diary.feelings || []).slice(0, 2);
  openModal(`
    <div class="modal-sheet notification-page diary-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-create-diary-detail-back aria-label="뒤로가기">←</button>
        <h3>일기 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card diary-detail-summary">
          <div class="between"><h3>${duariEscapeHtml(diary.title || "제목 없는 일기")}</h3><span class="linked-diary-type">${duariEscapeHtml(diary.type || diaryScopeLabel(diary.scope))}</span></div>
          <p class="diary-detail-body">${duariEscapeHtml(diary.body || "작성한 내용이 없습니다.")}</p>
          <div class="tag-row diary-detail-feelings">${feelings.map((feeling) => `<span class="chip-btn">${duariEscapeHtml(feeling)}</span>`).join("")}</div>
        </section>
        <div class="diary-detail-actions">
          <button class="primary-btn" type="button" data-create-diary-edit>수정</button>
          <button class="ghost-btn" type="button" data-create-diary-delete>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-create-diary-detail-back]")?.addEventListener("click", () => runWithoutModalHistory(() => openMemoryCreatePage(backAction)));
  qs("[data-create-diary-edit]")?.addEventListener("click", () => openMemoryCreateLinkedDiaryEdit(backAction));
  qs("[data-create-diary-delete]")?.addEventListener("click", () => openMemoryCreateDiaryDeleteOverlay(backAction));
}

function openMemoryCreateLinkedDiaryEdit(backAction = null) {
  const diary = memoryCreateSelectedDiaryCopy();
  if (!diary) {
    openMemoryCreatePage(backAction);
    return;
  }
  renderDiaryEditor({
    heading: "일기 수정",
    diary: { ...diary, forceNoLinkedRecord: true },
    linkedMemoryIndex: null,
    forceNoLinkedRecord: true,
    backAction: () => openMemoryCreateLinkedDiaryDetail(backAction)
  });
  const saveButton = qs("[data-save-diary]");
  if (saveButton) {
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const draft = duariCurrentDiaryDraft({ ...diary, forceNoLinkedRecord: true });
      memoryLinkedDiarySelection.createDiary = {
        ...diary,
        title: draft.title || "제목 없는 일기",
        body: draft.body || "작성한 내용이 없습니다.",
        scope: draft.scope,
        type: diaryScopeLabel(draft.scope),
        feelings: draft.feelings.length ? draft.feelings : ["고마움"],
        linked: "기록 추가 중"
      };
      memoryLinkedDiarySelection.create = null;
      runWithoutModalHistory(() => openMemoryCreateLinkedDiaryDetail(backAction));
      showToast("일기를 수정했어요.");
    }, { capture: true });
  }
}

function duariAttachCreateDiaryToMemory(memory = {}) {
  const sourceDiary = memoryLinkedDiarySelection.createDiary || (
    typeof memoryLinkedDiarySelection.create === "number" ? state.diaries[memoryLinkedDiarySelection.create] : null
  );
  if (!sourceDiary || !memory.title) return null;
  const linkedDiary = {
    ...sourceDiary,
    linked: memory.title,
    linkedMemoryTitle: memory.title,
    date: sourceDiary.date || duariTodayDateText(),
    editable: true,
    author: sourceDiary.author || "나",
    type: sourceDiary.type || diaryScopeLabel?.(sourceDiary.scope) || "나만 보기",
  };
  state.diaries.unshift(linkedDiary);
  return linkedDiary;
}

function openMemoryCreateDiaryDeleteOverlay(backAction = null) {
  const page = qs(".diary-detail-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>삭제할까요?</h3>
        <p>기록 추가에 연결한 이 일기가 삭제돼요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" type="button" data-create-diary-delete-cancel>취소</button>
          <button class="primary-btn" type="button" data-create-diary-delete-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-create-diary-delete-cancel]", page)?.addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-create-diary-delete-confirm]", page)?.addEventListener("click", () => {
    memoryLinkedDiarySelection.createDiary = null;
    memoryLinkedDiarySelection.create = null;
    qs(".ai-confirm-overlay", page)?.remove();
    runWithoutModalHistory(() => openMemoryCreatePage(backAction));
    showToast("연결된 일기를 삭제했어요.");
  });
}

function openMemoryEditPageLatest(index, backAction = null) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  const resolvedBack = backAction || (() => openMemoryDetailLatestV3(index));
  const diarySelection = selectedLinkedDiaryCardsHtml("edit", index);
  const photoCount = duariPhotoCountForMemory(index);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page memory-edit-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${memoryScopeFieldHtml(memory.scope)}
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div>
          <input class="memory-title-input" value="${editTitle}" maxlength="24" />
        </div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>${memory.type}</option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div><div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div><button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button><button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">${diarySelection.count}개</span></div>${diarySelection.html}<button class="ghost-btn full" data-linked-diary-select style="margin-top:12px">연결한 일기 선택</button><button class="ghost-btn full" data-linked-diary-add style="margin-top:8px">일기 추가</button></section>
        <div class="diary-detail-actions">
          <button class="primary-btn" data-save-memory-edit>저장</button>
          <button class="ghost-btn" data-delete-memory-edit>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => runFlowBack(resolvedBack));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  bindMemoryScopeButtons(qs(".modal-sheet"));
  qs("[data-save-memory-edit]").addEventListener("click", async () => {
    const sheet = qs(".memory-edit-page");
    const fields = qsa(".form-field", sheet);
    const originalTitle = memory.title;
    const editedTitle = limitMemoryEditTitle(qs(".memory-title-input", sheet)?.value.trim() || "") || memory.title;
    const editedDate = fields[2]?.querySelector("input")?.value || toDateInputValue(memory.date);
    const editedPlace = fields[3]?.querySelector("input")?.value.trim() || "";
    const editedType = fields[4]?.querySelector("select")?.value || memory.type || "일상";
    const editedScope = qs("[data-memory-scope] .chip-btn.active", sheet)?.textContent.trim() || memory.scope || "나만 보기";
    const nextMemory = {
      ...memory,
      title: editedTitle,
      date: editedDate ? editedDate.replaceAll("-", ".") : memory.date,
      place: editedPlace,
      type: editedType,
      scope: editedScope
    };
    await duariCompactMemoryPhotos(nextMemory);
    state.memories[index] = nextMemory;
    if (originalTitle && originalTitle !== editedTitle) {
      state.diaries = (state.diaries || []).map((diary) => diary.linked === originalTitle ? { ...diary, linked: editedTitle } : diary);
    }
    duariInstallContentPersistenceHooks();
    duariSavePersistentContent();
    renderHome();
    renderAlbum();
    renderDiary();
    runWithoutModalHistory(() => openMemoryDetailLatestV3(index, backAction));
    showToast("기록 수정 내용이 저장됐어요.");
  });
  qs("[data-delete-memory-edit]")?.addEventListener("click", () => openMemoryDeleteConfirmOverlay(index, resolvedBack));
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index, resolvedBack)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  qs("[data-linked-diary-select]").addEventListener("click", () => openLinkedDiarySelectPage({ mode: "edit", memoryIndex: index, backAction: resolvedBack }));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index, resolvedBack));
  bindPhotoManageDeleteButtons(qs(".modal-sheet"), { memoryIndex: index });
  bindActions(qs(".modal-sheet"));
}

function openMemoryDeleteConfirmOverlay(index, backAction = null) {
  const page = qs(".memory-edit-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  const memory = state.memories[index] || state.memories[0];
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>기록을 삭제할까요?</h3>
        <p>삭제한 기록은 복구할 수 없어요. 연결된 일기는 유지되고, 기록 연결만 해제됩니다.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" type="button" data-memory-delete-cancel>취소</button>
          <button class="primary-btn" type="button" data-memory-delete-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-memory-delete-cancel]", page)?.addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-memory-delete-confirm]", page)?.addEventListener("click", () => {
    const deletedTitle = memory?.title || "";
    state.memories.splice(index, 1);
    (state.diaries || []).forEach((diary) => {
      if (diary.linked === deletedTitle) diary.linked = "관련 기록 없음";
      if (diary.linkedMemoryTitle === deletedTitle) delete diary.linkedMemoryTitle;
    });
    if (memoryLinkedAddedDiaries?.[index]) delete memoryLinkedAddedDiaries[index];
    state.activeMemoryIndex = 0;
    duariSavePersistentContent();
    qs(".ai-confirm-overlay", page)?.remove();
    closeModal();
    setTab(state.tab === "album" ? "album" : "home");
    showToast("기록을 삭제했어요.");
  });
}

function openMemoryCreatePage(backAction = null) {
  const draft = state.memoryCreateDraft || {};
  const diarySelection = selectedLinkedDiaryCardsHtml("create");
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page memory-edit-page memory-create-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-memory-create-back aria-label="뒤로가기">←</button>
        <h3>기록 추가</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${memoryScopeFieldHtml(state.connected ? "우리 둘이 보기" : "나만 보기")}
        <div class="form-field">
          <div class="field-label-row"><label>제목</label><span class="input-count">0/24</span></div>
          <input class="memory-title-input" id="memoryTitle" value="" maxlength="24" />
        </div>
        <div class="form-field"><label>날짜</label><input id="memoryDate" type="date" value="" /></div>
        <div class="form-field"><label>장소</label><input id="memoryPlace" value="" /></div>
        <div class="form-field"><label>기록 유형</label><select id="memoryType"><option value="" selected></option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">0장</span></div><div class="photo-order-grid compact is-empty"><p class="linked-record-empty photo-empty-line">추가된 사진이 없습니다.</p></div><button class="ghost-btn full" data-photo-order-page style="margin-top:12px">사진 순서 변경</button><button class="ghost-btn full" data-photo-add-choice style="margin-top:8px">사진 추가</button></section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">${diarySelection.count}개</span></div>${diarySelection.html}<button class="ghost-btn full" data-linked-diary-select style="margin-top:12px">연결한 일기 선택</button><button class="ghost-btn full" data-linked-diary-add style="margin-top:8px">일기 추가</button></section>
        <button class="primary-btn full" data-save-memory-create>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-create-back]").addEventListener("click", () => runFlowBack(backAction));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  bindMemoryScopeButtons(qs(".modal-sheet"));
  qs("[data-photo-order-page]").addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryCreatePage(backAction)));
  qs("[data-photo-add-choice]").addEventListener("click", openPhotoAddChoiceModal);
  qs("[data-linked-diary-add]").addEventListener("click", () => {
    saveMemoryCreateDraft();
    openDiaryModal(null, { forceNoLinkedRecord: true, backAction: () => openMemoryCreatePage(backAction) });
  });
  qs("[data-linked-diary-select]").addEventListener("click", () => {
    saveMemoryCreateDraft();
    openLinkedDiarySelectPage({ mode: "create", backAction });
  });
  bindMemoryCreateLinkedDiaryCard(qs(".modal-sheet"), backAction, saveMemoryCreateDraft);
  bindPhotoManageDeleteButtons(qs(".modal-sheet"), { createMode: true });
  qs("[data-save-memory-create]").addEventListener("click", () => {
    const title = limitMemoryEditTitle(qs("#memoryTitle")?.value.trim() || "") || "제목 없는 기록";
    const dateValue = qs("#memoryDate")?.value || new Date().toISOString().slice(0, 10);
    const place = qs("#memoryPlace")?.value.trim() || "";
    const type = qs("#memoryType")?.value || "일상";
    const scope = qs("[data-memory-scope] .chip-btn.active")?.textContent.trim() || "나만 보기";
    state.memories.unshift({ title, date: dateValue.replaceAll("-", "."), place, type, note: "", scope, feelings: [], reaction: "", author: "나" });
    memoryLinkedDiarySelection.create = null;
    memoryLinkedDiarySelection.createDiary = null;
    closeModal();
    render();
    showToast("기록이 저장됐어요.");
  });
  bindActions(qs(".modal-sheet"));
}

// Final diary edit related-record actions: add a direct record creation button everywhere.
function renderDiaryLinkedRecordActionButtons() {
  return `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button><button class="ghost-btn full" data-diary-new-record style="margin-top:8px">기록 추가</button>`;
}

function renderEmptyLinkedRecordSection(showPicker = false) {
  return `
    <section class="card linked-record-card">
      <div class="between"><h3>관련 기록 연결</h3><span class="meta">0개</span></div>
      <p class="linked-record-empty">연결된 기록이 없습니다.</p>
      ${showPicker ? renderDiaryLinkedRecordActionButtons() : ""}
    </section>
  `;
}

function renderLinkedRecordCards(linkedTitle, linkedMemoryIndex = null, options = {}) {
  const allowEmpty = options.allowEmpty === true;
  if (allowEmpty && !diaryHasLinkedRecord(linkedTitle) && typeof linkedMemoryIndex !== "number") {
    return renderEmptyLinkedRecordSection(options.showPicker !== false);
  }
  const showMenu = options.showMenu ?? true;
  const fallbackIndex = fallbackDiaryRecordIndex(linkedTitle, linkedMemoryIndex);
  const record = state.memories[fallbackIndex] || state.memories[0];
  const index = recordIndexByTitle(record.title, fallbackIndex);
  return `
    <section class="card linked-record-card">
      <div class="between"><h3>관련 기록 연결</h3><span class="meta">1개</span></div>
      <div class="linked-record-list">
        <article class="linked-record-pill">
          <div class="linked-record-title-row title-between">
            <span class="linked-record-title-text">${record.title}</span>
            <div class="linked-record-right-tools">
              <em class="linked-record-scope">${scopeLabelForRecord(record)}</em>
              ${showMenu ? `<div class="linked-record-menu-wrap"><button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="더보기" title="더보기"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${index}">상세 보기</button><button data-diary-unlink-record>삭제</button></div></div>` : ""}
            </div>
          </div>
        </article>
      </div>
      ${options.showPicker === false ? "" : renderDiaryLinkedRecordActionButtons()}
    </section>
  `;
}

function bindDiaryRecordActions(sheet, { heading, linkedMemoryIndex, linkedTitle } = {}) {
  qs("[data-diary-record-picker]", sheet)?.addEventListener("click", () => openDiaryRecordPickerPage(getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle })));
  qs("[data-diary-new-record]", sheet)?.addEventListener("click", () => openMemoryCreatePage(() => renderDiaryEditor({ heading: heading || "일기 수정", diary: getDiaryDraftFromEditor({ heading, linkedMemoryIndex, linked: linkedTitle }), linkedMemoryIndex, backAction: diaryEditorFlowBackAction })));
}

const renderDiaryEditorWithRecordAddBase = renderDiaryEditor;
renderDiaryEditor = function renderDiaryEditor(args = {}) {
  renderDiaryEditorWithRecordAddBase(args);
  const sheet = qs(".modal-sheet");
  if (!sheet?.classList.contains("diary-write-page")) return;
  const linkedMemory = typeof args.linkedMemoryIndex === "number" ? state.memories[args.linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || args.diary?.linked || "관련 기록 없음";
  bindDiaryRecordActions(sheet, { heading: args.heading, linkedMemoryIndex: args.linkedMemoryIndex, linkedTitle });
  attachDiaryEditorFlowBack(args.backAction || diaryEditorFlowBackAction);
};

// Final two-button row layout and copy: related records -> linked records.
function actionPairHtml(firstButtonHtml, secondButtonHtml) {
  return `<div class="inline-action-pair">${firstButtonHtml}${secondButtonHtml}</div>`;
}

function renderDiaryLinkedRecordActionButtons() {
  return actionPairHtml(
    `<button class="ghost-btn" data-diary-record-picker>연결할 기록 선택</button>`,
    `<button class="ghost-btn" data-diary-new-record>기록 추가</button>`
  );
}

function renderEmptyLinkedRecordSection(showPicker = false) {
  return `
    <section class="card linked-record-card">
      <div class="between"><h3>연결된 기록</h3><span class="meta">0개</span></div>
      <p class="linked-record-empty">연결된 기록이 없습니다.</p>
      ${showPicker ? renderDiaryLinkedRecordActionButtons() : ""}
    </section>
  `;
}

function renderLinkedRecordCards(linkedTitle, linkedMemoryIndex = null, options = {}) {
  const allowEmpty = options.allowEmpty === true;
  if (allowEmpty && !diaryHasLinkedRecord(linkedTitle) && typeof linkedMemoryIndex !== "number") {
    return renderEmptyLinkedRecordSection(options.showPicker !== false);
  }
  const showMenu = options.showMenu ?? true;
  const fallbackIndex = fallbackDiaryRecordIndex(linkedTitle, linkedMemoryIndex);
  const record = state.memories[fallbackIndex] || state.memories[0];
  const index = recordIndexByTitle(record.title, fallbackIndex);
  return `
    <section class="card linked-record-card">
      <div class="between"><h3>연결된 기록</h3><span class="meta">1개</span></div>
      <div class="linked-record-list">
        <article class="linked-record-pill"${showMenu ? "" : ` role="button" tabindex="0" data-linked-record-detail="${index}"`}>
          <div class="linked-record-title-row title-between">
            <span class="linked-record-title-text">${record.title}</span>
            <div class="linked-record-right-tools">
              <em class="linked-record-scope">${scopeLabelForRecord(record)}</em>
              ${showMenu ? `<div class="linked-record-menu-wrap"><button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="더보기" title="더보기"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${index}">상세 보기</button><button data-diary-unlink-record>삭제</button></div></div>` : ""}
            </div>
          </div>
        </article>
      </div>
      ${options.showPicker === false ? "" : renderDiaryLinkedRecordActionButtons()}
    </section>
  `;
}

function recordPhotoActionsHtml() {
  return actionPairHtml(
    `<button class="ghost-btn" data-photo-add-choice>사진 추가</button>`,
    `<button class="ghost-btn" data-photo-order-page>사진 순서 변경</button>`
  );
}

function recordPhotoManageHtml(photoCount = 0, { title = "사진 관리", photos = [], representativeIndex = 0 } = {}) {
  const photoList = Array.isArray(photos) ? photos : [];
  const safeCount = Math.max(0, Number(photoCount) || photoList.length || 0);
  const photoBody = safeCount > 0
    ? `<div class="photo-order-grid compact" data-photo-manage-grid>${memoryPhotoCardsLatest(safeCount, photoList, { showDelete: true, representativeIndex })}</div>${recordPhotoActionsHtml()}`
    : `<div class="photo-empty-state" data-photo-manage-grid><p class="linked-record-empty photo-empty-line">아직 추가된 사진이 없어요.</p></div><button class="primary-btn full" data-photo-add-choice>사진 추가</button>`;
  return `<section class="card" data-photo-manage-card><div class="between"><h3>${title}</h3><span class="meta" data-photo-manage-count>${safeCount}장</span></div>${photoBody}</section>`;
}

function duariCurrentPhotoManageCount(fallback = 0) {
  const counterText = qs("[data-photo-manage-count]")?.textContent || "";
  const count = Number(counterText.match(/\d+/)?.[0]);
  return Number.isFinite(count) ? count : Math.max(0, Number(fallback) || 0);
}

function recordLinkedDiaryActionsHtml() {
  return actionPairHtml(
    `<button class="ghost-btn" data-linked-diary-select>연결한 일기 선택</button>`,
    `<button class="ghost-btn" data-linked-diary-add>일기 추가</button>`
  );
}

function duariCloneMemory(memory) {
  try {
    return JSON.parse(JSON.stringify(memory || {}));
  } catch {
    return { ...(memory || {}) };
  }
}

function openMemoryEditBackConfirm(resolvedBack, memoryIndex = 0, originalMemory = null) {
  const modal = qs("#modal") || document.body;
  qs(".photo-delete-overlay", modal)?.remove();
  modal.insertAdjacentHTML("beforeend", `
    <div class="photo-delete-overlay" role="dialog" aria-modal="true">
      <section class="photo-delete-sheet">
        <h3>저장하지 않고 나갈까요?</h3>
        <p>수정한 내용이 있다면 저장해야 반영돼요. 나가면 저장하지 않은 변경사항은 사라질 수 있어요.</p>
        <div class="inline-action-pair">
          <button class="primary-btn" type="button" data-memory-edit-leave>나가기</button>
          <button class="ghost-btn" type="button" data-memory-edit-stay>취소</button>
        </div>
      </section>
    </div>
  `);
  qs("[data-memory-edit-stay]", modal)?.addEventListener("click", () => qs(".photo-delete-overlay", modal)?.remove());
  qs("[data-memory-edit-leave]", modal)?.addEventListener("click", () => {
    qs(".photo-delete-overlay", modal)?.remove();
    if (originalMemory && state.memories?.[memoryIndex]) {
      state.memories[memoryIndex] = duariCloneMemory(originalMemory);
      state.activeMemoryIndex = memoryIndex;
      duariSavePersistentContent();
      renderHome();
      renderAlbum();
      renderDiary();
    }
    runFlowBack(resolvedBack);
  });
}

function openMemoryEditPageLatest(index, backAction = null, originalMemorySnapshot = null) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editOriginalMemory = originalMemorySnapshot || duariCloneMemory(memory);
  const editTitle = limitMemoryEditTitle(memory.title);
  const resolvedBack = backAction || (() => openMemoryDetailLatestV3(index));
  const diarySelection = selectedLinkedDiaryCardsHtml("edit", index);
  const photoCount = duariPhotoCountForMemory(index);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page memory-edit-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-back-memory aria-label="뒤로가기">←</button>
        <h3>기록 수정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${memoryScopeFieldHtml(memory.scope)}
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count">${editTitle.length}/24</span></div><input class="memory-title-input" value="${editTitle}" maxlength="24" /></div>
        <div class="form-field"><label>날짜</label><input type="date" value="${toDateInputValue(memory.date)}" /></div>
        <div class="form-field"><label>장소</label><input value="${memory.place}" /></div>
        <div class="form-field"><label>기록 유형</label><select><option>${memory.type}</option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        ${recordPhotoManageHtml(photoCount, { photos: memory.photos || [], representativeIndex: memory.representativePhotoIndex || 0 })}
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">${diarySelection.count}개</span></div>${diarySelection.html}${recordLinkedDiaryActionsHtml()}</section>
        <div class="diary-detail-actions">
          <button class="primary-btn" data-save-memory-edit>저장</button>
          <button class="ghost-btn" data-delete-memory-edit>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-back-memory]").addEventListener("click", () => openMemoryEditBackConfirm(resolvedBack, index, editOriginalMemory));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  bindMemoryScopeButtons(qs(".modal-sheet"));
  qs("[data-save-memory-edit]").addEventListener("click", async () => {
    const sheet = qs(".memory-edit-page");
    const fields = qsa(".form-field", sheet);
    const originalTitle = memory.title;
    const editedTitle = limitMemoryEditTitle(qs(".memory-title-input", sheet)?.value.trim() || "") || memory.title;
    const editedDate = fields[2]?.querySelector("input")?.value || toDateInputValue(memory.date);
    const editedPlace = fields[3]?.querySelector("input")?.value.trim() || "";
    const editedType = fields[4]?.querySelector("select")?.value || memory.type || "일상";
    const editedScope = qs("[data-memory-scope] .chip-btn.active", sheet)?.textContent.trim() || memory.scope || "나만 보기";
    const nextMemory = {
      ...memory,
      title: editedTitle,
      date: editedDate ? editedDate.replaceAll("-", ".") : memory.date,
      place: editedPlace,
      type: editedType,
      scope: editedScope
    };
    await duariCompactMemoryPhotos(nextMemory);
    state.memories[index] = nextMemory;
    if (originalTitle && originalTitle !== editedTitle) {
      state.diaries = (state.diaries || []).map((diary) => diary.linked === originalTitle ? { ...diary, linked: editedTitle } : diary);
    }
    duariInstallContentPersistenceHooks();
    duariSavePersistentContent();
    renderHome();
    renderAlbum();
    renderDiary();
    runWithoutModalHistory(() => openMemoryDetailLatestV3(index, backAction));
    showToast("기록 수정 내용이 저장됐어요.");
  });
  qs("[data-delete-memory-edit]")?.addEventListener("click", () => openMemoryDeleteConfirmOverlay(index, resolvedBack));
  qs("[data-photo-order-page]")?.addEventListener("click", () => openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(index, resolvedBack, editOriginalMemory)));
  qs("[data-photo-add-choice]")?.addEventListener("click", () => openPhotoAddChoiceModal({ memoryIndex: index }));
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(index));
  qs("[data-linked-diary-select]").addEventListener("click", () => openLinkedDiarySelectPage({ mode: "edit", memoryIndex: index, backAction: resolvedBack }));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index, resolvedBack));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function openMemoryCreatePage(backAction = null) {
  const draft = state.memoryCreateDraft || {};
  const diarySelection = selectedLinkedDiaryCardsHtml("create");
  const draftPhotos = Array.isArray(draft.photos) ? draft.photos : [];
  const photoCount = Math.max(0, Number(draft.photoCount) || draftPhotos.length || 0);
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page memory-edit-page memory-create-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-memory-create-back aria-label="뒤로가기">←</button>
        <h3>기록 추가</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${memoryScopeFieldHtml(draft.scope || (state.connected ? "우리 둘이 보기" : "나만 보기"))}
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count">${Array.from(draft.title || "").length}/24</span></div><input class="memory-title-input" id="memoryTitle" value="${signupAttr(draft.title || "")}" maxlength="24" /></div>
        <div class="form-field"><label>날짜</label><input id="memoryDate" type="date" value="${signupAttr(draft.date || "")}" /></div>
        <div class="form-field"><label>장소</label><input id="memoryPlace" value="${signupAttr(draft.place || "")}" /></div>
        <div class="form-field"><label>기록 유형</label><select id="memoryType"><option value="" selected></option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        ${recordPhotoManageHtml(photoCount, { photos: draftPhotos, representativeIndex: draft.representativePhotoIndex || 0 })}
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">${diarySelection.count}개</span></div>${diarySelection.html}${recordLinkedDiaryActionsHtml()}</section>
        <button class="primary-btn full" data-save-memory-create>저장</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  if (draft.type) qs("#memoryType").value = draft.type;
  qs("[data-memory-create-back]").addEventListener("click", () => runFlowBack(backAction));
  const titleInput = qs(".memory-title-input");
  const titleCount = qs(".input-count");
  syncMemoryTitleLimit(titleInput, titleCount);
  titleInput.addEventListener("input", () => syncMemoryTitleLimit(titleInput, titleCount));
  bindMemoryScopeButtons(qs(".modal-sheet"));
  const saveMemoryCreateDraft = () => {
    state.memoryCreateDraft = {
      title: limitMemoryEditTitle(qs("#memoryTitle")?.value.trim() || ""),
      date: qs("#memoryDate")?.value || "",
      place: qs("#memoryPlace")?.value.trim() || "",
      type: qs("#memoryType")?.value || "",
      scope: qs("[data-memory-scope] .chip-btn.active")?.textContent.trim() || (state.connected ? "우리 둘이 보기" : "나만 보기"),
      photoCount: duariCurrentPhotoManageCount(state.memoryCreateDraft?.photoCount || 0),
      photos: Array.isArray(state.memoryCreateDraft?.photos) ? state.memoryCreateDraft.photos : [],
      representativePhoto: state.memoryCreateDraft?.representativePhoto || (Array.isArray(state.memoryCreateDraft?.photos) ? state.memoryCreateDraft.photos[0] : null),
      representativePhotoIndex: Number(state.memoryCreateDraft?.representativePhotoIndex) || 0,
    };
  };
  qs("[data-photo-order-page]")?.addEventListener("click", () => {
    saveMemoryCreateDraft();
    openPhotoOrderManagerPageLatest(() => openMemoryCreatePage(backAction));
  });
  qs("[data-photo-add-choice]")?.addEventListener("click", () => {
    saveMemoryCreateDraft();
    openPhotoAddChoiceModal({ createMode: true });
  });
  qs("[data-linked-diary-add]").addEventListener("click", () => {
    saveMemoryCreateDraft();
    openDiaryModal(null, { forceNoLinkedRecord: true, backAction: () => openMemoryCreatePage(backAction) });
  });
  qs("[data-linked-diary-select]").addEventListener("click", () => {
    saveMemoryCreateDraft();
    openLinkedDiarySelectPage({ mode: "create", backAction });
  });
  bindMemoryCreateLinkedDiaryCard(qs(".modal-sheet"), backAction, saveMemoryCreateDraft);
  bindPhotoManageDeleteButtons(qs(".modal-sheet"), { createMode: true });
  qs("[data-save-memory-create]").addEventListener("click", () => {
    const title = limitMemoryEditTitle(qs("#memoryTitle")?.value.trim() || "") || "제목 없는 기록";
    const dateValue = qs("#memoryDate")?.value || new Date().toISOString().slice(0, 10);
    const place = qs("#memoryPlace")?.value.trim() || "";
    const type = qs("#memoryType")?.value || "일상";
    const scope = qs("[data-memory-scope] .chip-btn.active")?.textContent.trim() || "나만 보기";
    const newMemory = {
      title,
      date: dateValue.replaceAll("-", "."),
      place,
      type,
      note: "",
      scope,
      feelings: [],
      reaction: "",
      author: "나",
      photoCount: duariCurrentPhotoManageCount(state.memoryCreateDraft?.photoCount || 0),
      photos: Array.isArray(state.memoryCreateDraft?.photos) ? state.memoryCreateDraft.photos : [],
      representativePhoto: state.memoryCreateDraft?.representativePhoto || (Array.isArray(state.memoryCreateDraft?.photos) ? state.memoryCreateDraft.photos[0] : null),
      representativePhotoIndex: Number(state.memoryCreateDraft?.representativePhotoIndex) || 0
    };
    state.memories.unshift(newMemory);
    duariAttachCreateDiaryToMemory(newMemory);
    memoryLinkedDiarySelection.create = null;
    memoryLinkedDiarySelection.createDiary = null;
    state.memoryCreateDraft = null;
    duariSavePersistentContent();
    closeModal();
    state.tab = "home";
    setTab("home");
    renderHome();
    renderAlbum();
    renderDiary();
    showToast("기록이 저장됐어요.");
  });
  bindActions(qs(".modal-sheet"));
}

// Final diary AI writing flow: Diary add -> AI refine -> result -> save into diary body.
let aiDiaryEditorDraft = null;

function normalizeDiaryEditorHeading(heading) {
  return String(heading || "") === "일기 쓰기" ? "일기 추가" : (heading || "일기 추가");
}

const renderDiaryEditorAiFlowBase = renderDiaryEditor;
renderDiaryEditor = function renderDiaryEditor(args = {}) {
  renderDiaryEditorAiFlowBase({ ...args, heading: normalizeDiaryEditorHeading(args.heading) });
};

function captureDiaryEditorForAi() {
  const page = qs(".diary-write-page");
  if (!page) return null;
  const linkedTitle = qs(".linked-record-title-text", page)?.textContent?.trim() || "관련 기록 없음";
  const linkedMemoryIndex = diaryHasLinkedRecord(linkedTitle) ? recordIndexByTitle(linkedTitle, typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0) : null;
  return getDiaryDraftFromEditor({
    heading: normalizeDiaryEditorHeading(qs(".notification-header h3", page)?.textContent || "일기 추가"),
    linked: linkedTitle,
    linkedMemoryIndex,
    backAction: diaryEditorFlowBackAction
  });
}

function returnToDiaryEditorFromAi(bodyOverride = null) {
  const draft = aiDiaryEditorDraft || captureDiaryEditorForAi() || { heading: "일기 추가", linked: "관련 기록 없음" };
  const nextDiary = {
    ...draft,
    body: bodyOverride !== null ? bodyOverride : draft.body
  };
  runWithoutModalHistory(() => renderDiaryEditor({
    heading: normalizeDiaryEditorHeading(draft.heading),
    diary: nextDiary,
    linkedMemoryIndex: draft.linkedMemoryIndex,
    backAction: draft.backAction || diaryEditorFlowBackAction
  }));
}

function openAiModal() {
  aiDiaryEditorDraft = captureDiaryEditorForAi();
  openAiSourcePage({ original: getAiSourceText(), tone: aiTonePresets[0], fromDiaryEditor: !!aiDiaryEditorDraft });
}

function openAiSourcePage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-source-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-cancel aria-label="뒤로가기">←</button>
        <h3>전할 말 정리하기</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="tone-section">
          <h3>톤 선택</h3>
          <div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div>
        </section>
        <div class="form-field">
          <label>원문</label>
          <textarea id="aiOriginalText" class="diary-body-large">${original}</textarea>
        </div>
        <button class="primary-btn full" data-ai-make-result>AI로 정리하기</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-cancel]").addEventListener("click", () => {
    if (aiDiaryEditorDraft) returnToDiaryEditorFromAi();
    else restorePreviousModal();
  });
  qs("[data-ai-make-result]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || aiTonePresets[0];
    const nextOriginal = qs("#aiOriginalText").value.trim();
    openAiResultPage({ original: nextOriginal, tone: selectedTone, result: makeAiResult(nextOriginal, selectedTone), fromDiaryEditor: !!aiDiaryEditorDraft });
  });
}

function openAiResultPage(draft = {}) {
  const original = draft.original || getAiSourceText();
  const tone = draft.tone || aiTonePresets[0];
  const result = cleanAiResultText(draft.result || makeAiResult(original, tone));
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card"><h3>원문</h3><p class="readonly-source">${original}</p></section>
        <div class="form-field"><p class="ai-field-title">AI 결과</p><textarea id="aiResultText" class="diary-body-large">${result}</textarea></div>
        <section class="tone-section"><h3>톤 선택</h3><div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}">${item}</button>`).join("")}</div></section>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="primary-btn" data-ai-apply-body>본문에 저장</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]").addEventListener("click", () => runWithoutModalHistory(() => openAiSourcePage({ original, tone, fromDiaryEditor: !!aiDiaryEditorDraft })));
  qs("[data-ai-cancel-result]").addEventListener("click", () => {
    if (aiDiaryEditorDraft) returnToDiaryEditorFromAi();
    else restorePreviousModal();
  });
  qs("[data-ai-redraft]").addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const textarea = qs("#aiResultText");
    textarea.value = "";
    textarea.value = makeFreshAiRedraftFromOriginal(original, selectedTone);
    showToast("새 AI 결과로 완전히 교체했어요.");
  });
  qs("[data-ai-apply-body]").addEventListener("click", () => {
    const nextBody = qs("#aiResultText")?.value || result;
    returnToDiaryEditorFromAi(nextBody);
    showToast("AI 결과를 본문에 저장했어요.");
  });
}

// Final diary add save flow: "원본으로 저장" becomes "저장" with scope confirmation.
const memoryLinkedAddedDiaries = {};
const linkedDiariesLatestSaveFlowBase = linkedDiariesLatest;
function linkedDiariesLatest() {
  const base = linkedDiariesLatestSaveFlowBase();
  const activeIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  const added = memoryLinkedAddedDiaries[activeIndex] || [];
  const seen = new Set();
  return [...base, ...added].filter((diary) => {
    const key = [
      diary.id || "",
      diary.title || "",
      diary.body || "",
      diary.linked || diary.linkedMemoryTitle || "",
    ].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function currentDiaryEditorLinkedContext(args = {}) {
  const forceNoLinkedRecord = args.forceNoLinkedRecord === true || args.diary?.forceNoLinkedRecord === true;
  const linkedMemory = !forceNoLinkedRecord && typeof args.linkedMemoryIndex === "number" ? state.memories[args.linkedMemoryIndex] : null;
  const linkedTitle = forceNoLinkedRecord ? "관련 기록 없음" : (linkedMemory?.title || args.diary?.linked || qs(".linked-record-title-text")?.textContent?.trim() || "관련 기록 없음");
  const linkedMemoryIndex = forceNoLinkedRecord ? null : (typeof args.linkedMemoryIndex === "number"
    ? args.linkedMemoryIndex
    : (diaryHasLinkedRecord(linkedTitle) ? recordIndexByTitle(linkedTitle, typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0) : null));
  return { linkedTitle, linkedMemoryIndex };
}

function diaryDraftForConfirmedSave(linkedTitle) {
  const selectedScopeText = qs("[data-diary-scope] .chip-btn.active")?.textContent || "나만 보기";
  const nextScope = normalizeDiaryScopeValue(selectedScopeText);
  const draft = buildDiaryDraftFromCurrentEditor(linkedTitle, nextScope, nextScope);
  return {
    ...draft,
    type: diaryScopeLabel(nextScope),
    editable: true
  };
}

function openDiaryAddSaveScopeOverlay({ linkedTitle, linkedMemoryIndex, backAction } = {}) {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  const scopeLabel = qs("[data-diary-scope] .chip-btn.active")?.textContent?.trim() || "나만 보기";
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>일기를 저장할까요?</h3>
        <p>선택한 공개 범위는 ${scopeLabel}입니다. 저장 후 공개 범위에 맞는 다이어리 목록과 연결된 기록에 반영돼요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" data-diary-add-save-cancel>취소</button>
          <button class="primary-btn" data-diary-add-save-confirm>저장</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-add-save-cancel]", page).addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-add-save-confirm]", page).addEventListener("click", () => {
    qs(".ai-confirm-overlay", page)?.remove();
    if (!diaryHasLinkedRecord(linkedTitle)) {
      openRequiredLinkedRecordOverlay({ missingScope: false });
      return;
    }
    const savedDiary = diaryDraftForConfirmedSave(linkedTitle);
    state.diaries.unshift(savedDiary);
    if (typeof linkedMemoryIndex === "number") {
      memoryLinkedAddedDiaries[linkedMemoryIndex] = memoryLinkedAddedDiaries[linkedMemoryIndex] || [];
      memoryLinkedAddedDiaries[linkedMemoryIndex].unshift(savedDiary);
      state.activeMemoryIndex = linkedMemoryIndex;
      closeModal();
      runWithoutModalHistory(() => openMemoryEditPageLatest(linkedMemoryIndex, backAction || (() => openMemoryDetailLatestV3(linkedMemoryIndex))));
      showToast("일기를 저장하고 연결된 일기에 추가했어요.");
      return;
    }
    closeModal();
    state.diaryView = normalizeDiaryScopeValue(savedDiary.scope) === "공유" ? "mineShared" : "private";
    renderDiary();
    showToast("일기를 저장했어요.");
  });
}

const renderDiaryEditorSaveFlowBase = renderDiaryEditor;
renderDiaryEditor = function renderDiaryEditor(args = {}) {
  renderDiaryEditorSaveFlowBase(args);
  const sheet = qs(".modal-sheet");
  if (!sheet?.classList.contains("diary-write-page")) return;
  const heading = qs(".notification-header h3", sheet)?.textContent?.trim() || normalizeDiaryEditorHeading(args.heading);
  const isAddMode = heading === "일기 추가";
  const saveButton = qs("[data-save-original-diary]", sheet);
  if (!saveButton || !isAddMode) return;
  saveButton.textContent = "저장";
  saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const context = currentDiaryEditorLinkedContext(args);
    openDiaryAddSaveScopeOverlay({ ...context, backAction: args.backAction || diaryEditorFlowBackAction });
  }, { capture: true });
};

function openDiaryModal(linkedMemoryIndex = null) {
  const linkedMemory = typeof linkedMemoryIndex === "number" ? state.memories[linkedMemoryIndex] : null;
  const backAction = typeof linkedMemoryIndex === "number" ? (() => openMemoryEditPageLatest(linkedMemoryIndex, () => openMemoryDetailLatestV3(linkedMemoryIndex))) : null;
  renderDiaryEditor({
    heading: "일기 추가",
    diary: linkedMemory ? { linked: linkedMemory.title, scope: "개인", originalScope: "개인" } : null,
    linkedMemoryIndex,
    backAction
  });
}

// Final memory-card navigation binding: home/album record cards always open record detail.
function bindMemoryCardNavigation(root = document) {
  qsa(".memory-card", root).forEach((card) => {
    if (card.dataset.memoryNavBound === "true") return;
    card.dataset.memoryNavBound = "true";
    const open = (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      const index = Number(card.dataset.index || 0);
      openMemoryDetailLatestV3(Number.isFinite(index) ? index : 0, () => {
        const activeTab = qs(".tab-content.active")?.id;
        if (activeTab === "album") {
          closeModal();
          setTab("album");
          return;
        }
        closeModal();
        setTab("home");
      });
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") open(event);
    });
  });
}

const renderHomeMemoryNavBase = renderHome;
function renderHome() {
  renderHomeMemoryNavBase();
  bindMemoryCardNavigation(qs("#home"));
}

const renderAlbumMemoryNavBase = renderAlbum;
function renderAlbum() {
  renderAlbumMemoryNavBase();
  bindMemoryCardNavigation(qs("#album"));
  qsa("[data-album-view] button", qs("#album")).forEach((button) => {
    if (button.dataset.memoryNavRebind === "true") return;
    button.dataset.memoryNavRebind = "true";
    button.addEventListener("click", () => window.setTimeout(() => bindMemoryCardNavigation(qs("#album")), 0));
  });
}

// Absolute final: intercept memory-card clicks before generic data-action handlers.
function bindMemoryCardNavigation(root = document) {
  qsa(".memory-card", root).forEach((card) => {
    if (card.dataset.memoryNavBound === "final") return;
    card.dataset.memoryNavBound = "final";
    const open = (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      event?.stopImmediatePropagation?.();
      const index = Number(card.dataset.index || 0);
      const currentTab = qs(".tab-content.active")?.id || "home";
      openMemoryDetailLatestV3(Number.isFinite(index) ? index : 0, () => {
        closeModal();
        setTab(currentTab === "album" ? "album" : "home");
      });
    };
    card.addEventListener("click", open, { capture: true });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") open(event);
    }, { capture: true });
  });
}

const renderHomeMemoryNavFinalBase = renderHome;
function renderHome() {
  renderHomeMemoryNavFinalBase();
  bindMemoryCardNavigation(qs("#home"));
}

const renderAlbumMemoryNavFinalBase = renderAlbum;
function renderAlbum() {
  renderAlbumMemoryNavFinalBase();
  bindMemoryCardNavigation(qs("#album"));
}

// Absolute final memory navigation fix: no wrappers, no recursion, delegated capture.
function renderHome() {
  const home = qs("#home");
  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <section class="card home-records-card"><h3>최근 우리 기록</h3><button class="primary-btn full" data-action="new-memory">기록 추가</button></section>
        <section class="diary-card"><h3>최근 공유 일기</h3><p>연결 전에는 공유 일기를 사용할 수 없어요.</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
      </div>
    `;
    bindActions(home);
    return;
  }

  const sharedDiary = state.diaries.find((diary) => normalizeDiaryScopeValue(diary.scope) === "공유");
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
      <section class="card home-records-card"><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div><button class="primary-btn full" data-action="new-memory">기록 추가</button></section>
      <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${sharedDiary?.body || "아직 공유 일기가 없어요."}</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
    </div>
  `;
  bindActions(home);
}

function renderAlbum() {
  const album = qs("#album");
  album.innerHTML = `
    <div class="section-stack">
      <div class="form-field"><label for="albumSearch">앨범 검색</label><input id="albumSearch" placeholder="제목, 장소, 기록 유형" /></div>
      <div class="segmented" data-album-view>
        <button class="${state.albumView === "record" ? "active" : ""}" data-view="record">기록</button>
        <button class="${state.albumView === "photo" ? "active" : ""}" data-view="photo">사진</button>
        <button class="${state.albumView === "calendar" ? "active" : ""}" data-view="calendar">캘린더</button>
      </div>
      ${state.albumView === "record" ? `<div class="list">${memoryCards(state.memories)}</div>` : ""}
      ${state.albumView === "photo" ? `<div class="photo-grid">${Array.from({ length: 9 }, (_, i) => `<div class="photo-tile" data-action="photo-detail"><span>${i + 1}</span></div>`).join("")}</div>` : ""}
      ${state.albumView === "calendar" ? calendarView() : ""}
      <button class="primary-btn full" data-action="new-memory">기록 추가</button>
    </div>
  `;
  qsa("[data-album-view] button", album).forEach((button) => button.addEventListener("click", () => {
    state.albumView = button.dataset.view;
    renderAlbum();
  }));
  bindActions(album);
}

function openMemoryCardFromElement(card) {
  if (!card) return;
  const index = Number(card.dataset.index || 0);
  const activeTab = qs(".tab-content.active")?.id || "home";
  openMemoryDetailLatestV3(Number.isFinite(index) ? index : 0, () => {
    closeModal();
    setTab(activeTab === "album" ? "album" : "home");
  });
}

if (!window.__duariMemoryCardDelegationInstalled) {
  window.__duariMemoryCardDelegationInstalled = true;
  document.addEventListener("click", (event) => {
    const card = event.target.closest?.(".memory-card");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openMemoryCardFromElement(card);
  }, true);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest?.(".memory-card");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openMemoryCardFromElement(card);
  }, true);
}

// Absolute final v2: reinstall memory navigation with a fresh flag and rerender current screens.
function openMemoryCardFromElementFinal(card) {
  if (!card) return;
  const index = Number(card.dataset.index || 0);
  const activeTab = qs(".tab-content.active")?.id || qs(".screen.active")?.id || state.tab || "home";
  openMemoryDetailLatestV3(Number.isFinite(index) ? index : 0, () => {
    closeModal();
    setTab(activeTab === "album" ? "album" : "home");
  });
}

if (!window.__duariMemoryCardDelegationInstalledV2) {
  window.__duariMemoryCardDelegationInstalledV2 = true;
  document.addEventListener("click", (event) => {
    const card = event.target.closest?.(".memory-card, [data-action='memory-detail']");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openMemoryCardFromElementFinal(card);
  }, true);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest?.(".memory-card, [data-action='memory-detail']");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openMemoryCardFromElementFinal(card);
  }, true);
}

function refreshCurrentScreenAfterFinalMemoryPatch() {
  if (!qs("#app") || qs("#app").classList.contains("is-hidden")) return;
  const activeTab = qs(".screen.active")?.id || state.tab || "home";
  if (activeTab === "album") renderAlbum();
  else if (activeTab === "home") renderHome();
}

window.setTimeout(refreshCurrentScreenAfterFinalMemoryPatch, 0);

// Absolute final v3: clean Korean home/album render and force current screen refresh.
function renderHome() {
  const home = qs("#home");
  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <section class="card home-records-card"><h3>최근 우리 기록</h3><button class="primary-btn full" data-action="new-memory">기록 추가</button></section>
        <section class="diary-card"><h3>최근 공유 일기</h3><p>연결 전에는 공유 일기를 사용할 수 없어요.</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
      </div>
    `;
    bindActions(home);
    return;
  }
  const sharedDiary = state.diaries.find((diary) => normalizeDiaryScopeValue(diary.scope) === "공유");
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
      <section class="card home-records-card"><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div><button class="primary-btn full" data-action="new-memory">기록 추가</button></section>
      <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${sharedDiary?.body || "아직 공유 일기가 없어요."}</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
      <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
    </div>
  `;
  bindActions(home);
}

function renderAlbum() {
  const album = qs("#album");
  album.innerHTML = `
    <div class="section-stack">
      <div class="form-field"><label for="albumSearch">앨범 검색</label><input id="albumSearch" placeholder="제목, 장소, 기록 유형" /></div>
      <div class="segmented" data-album-view>
        <button class="${state.albumView === "record" ? "active" : ""}" data-view="record">기록</button>
        <button class="${state.albumView === "photo" ? "active" : ""}" data-view="photo">사진</button>
        <button class="${state.albumView === "calendar" ? "active" : ""}" data-view="calendar">캘린더</button>
      </div>
      ${state.albumView === "record" ? `<div class="list">${memoryCards(state.memories)}</div>` : ""}
      ${state.albumView === "photo" ? `<div class="photo-grid">${Array.from({ length: 9 }, (_, i) => `<div class="photo-tile" data-action="photo-detail"><span>${i + 1}</span></div>`).join("")}</div>` : ""}
      ${state.albumView === "calendar" ? calendarView() : ""}
      <button class="primary-btn full" data-action="new-memory">기록 추가</button>
    </div>
  `;
  qsa("[data-album-view] button", album).forEach((button) => button.addEventListener("click", () => {
    state.albumView = button.dataset.view;
    renderAlbum();
  }));
  bindActions(album);
}

function openMemoryCardFromElementFinal(card) {
  if (!card) return;
  const index = Number(card.dataset.index || 0);
  const activeTab = qs(".screen.active")?.id || state.tab || "home";
  openMemoryDetailLatestV3(Number.isFinite(index) ? index : 0, () => {
    closeModal();
    setTab(activeTab === "album" ? "album" : "home");
  });
}

document.addEventListener("click", (event) => {
  const card = event.target.closest?.(".memory-card, [data-action='memory-detail']");
  if (!card) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  openMemoryCardFromElementFinal(card);
}, true);

function forceRenderActiveHomeOrAlbum() {
  if (!qs("#app") || qs("#app").classList.contains("is-hidden")) return;
  const activeTab = qs(".screen.active")?.id || state.tab || "home";
  if (activeTab === "album") renderAlbum();
  if (activeTab === "home") renderHome();
}

window.setTimeout(forceRenderActiveHomeOrAlbum, 0);

// Absolute final v4: direct memory cards and a clean record-detail page.
function memoryCards(memories, homeCompact = false) {
  return memories.map((memory, index) => `
    <article class="memory-card ${homeCompact ? "home-memory-card" : ""}" role="button" tabindex="0" data-memory-open="${index}" onclick="openMemoryDetailLatestV3(${index})">
      <div class="photo-stack" aria-label="사진 미리보기"></div>
      <div>
        <div class="${homeCompact ? "home-memory-title" : "between"}">
          <strong>${memory.title}</strong>
          <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
        </div>
        <div class="tag-row ${homeCompact ? "home-memory-meta" : ""}" style="margin-top:8px">
          <span class="meta">${memory.date}</span>
          <span class="meta">${memory.place}</span>
          <span class="meta">${memory.type}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function openMemoryDetailLatestV3(index, backAction = null) {
  const safeIndex = Number.isFinite(Number(index)) ? Number(index) : 0;
  state.activeMemoryIndex = safeIndex;
  const memory = state.memories[safeIndex] || state.memories[0];
  const photoCount = duariPhotoCountForMemory(safeIndex);
  const previousTab = qs(".screen.active")?.id || state.tab || "home";
  const goBack = backAction || (() => {
    closeModal();
    setTab(previousTab === "album" ? "album" : "home");
  });
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-memory-detail-back aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main"><div class="memory-photo-scroll">${memoryPhotoScrollerLatest(7)}</div></div>
        </section>
        <section class="card">
          <div class="between">
            <h3 class="memory-limited-title" title="${memory.title}">${limitMemoryTitleLatest(memory.title)}</h3>
            <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
          </div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
        </section>
        <section class="card linked-diary-section">
          <div class="between"><h3>연결된 일기</h3><span class="meta">3개</span></div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page data-index="${safeIndex}">기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-detail-back]").addEventListener("click", () => runFlowBack(goBack));
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(safeIndex, () => openMemoryDetailLatestV3(safeIndex, backAction)));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(safeIndex, backAction));
  bindActions(qs(".modal-sheet"));
}

function renderHome() {
  const home = qs("#home");
  const sharedDiary = state.diaries.find((diary) => normalizeDiaryScopeValue(diary.scope) === "공유");
  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between"><div><p class="eyebrow">내 공간</p><h3>하린</h3></div><button class="chip-btn" data-action="connect">상대 초대</button></div>
        ${state.aloneCtaHidden ? "" : `<section class="hero-card"><h3>함께 쓸 공간을 만들어볼까요?</h3><p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p><div class="row" style="margin-top:14px"><button class="primary-btn" data-action="connect">상대 초대하기</button><button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button></div></section>`}
        <section class="card home-records-card"><h3>최근 우리 기록</h3><button class="primary-btn full" data-action="new-memory">기록 추가</button></section>
        <section class="diary-card"><h3>최근 공유 일기</h3><p>연결 전에는 공유 일기를 사용할 수 없어요.</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
      </div>
    `;
  } else {
    home.innerHTML = `
      <div class="section-stack">
        <section class="hero-card home-hero"><div class="between"><div><p class="relationship-name">봄이 & 하린</p><h3>함께한 지 421일</h3></div><span class="anniversary-pill">D-7 여행 1주년</span></div></section>
        <section class="card home-records-card"><div class="between"><h3>최근 우리 기록</h3><button class="chip-btn" data-tab-go="album">더보기</button></div><div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div><button class="primary-btn full" data-action="new-memory">기록 추가</button></section>
        <section class="diary-card"><div class="between"><h3>최근 공유 일기</h3><span class="reaction-icon" aria-label="고마워 반응">♥</span></div><p>${sharedDiary?.body || "아직 공유 일기가 없어요."}</p><button class="ghost-btn full" data-action="diary-scope-first">일기 쓰기</button></section>
        <section class="question-card"><p class="eyebrow">오늘의 질문</p><h3>요즘 나에게 가장 큰 힘이 되는 말은 뭐야?</h3><div class="home-question-actions"><button class="primary-btn" data-action="answer-question">답변 쓰기</button><button class="ghost-btn" data-action="another-question">다른 질문 보기</button></div></section>
      </div>
    `;
  }
  bindActions(home);
}

function renderAlbum() {
  const album = qs("#album");
  album.innerHTML = `
    <div class="section-stack">
      <div class="form-field"><label for="albumSearch">앨범 검색</label><input id="albumSearch" placeholder="제목, 장소, 기록 유형" /></div>
      <div class="segmented" data-album-view>
        <button class="${state.albumView === "record" ? "active" : ""}" data-view="record">기록</button>
        <button class="${state.albumView === "photo" ? "active" : ""}" data-view="photo">사진</button>
        <button class="${state.albumView === "calendar" ? "active" : ""}" data-view="calendar">캘린더</button>
      </div>
      ${state.albumView === "record" ? `<div class="list">${memoryCards(state.memories)}</div>` : ""}
      ${state.albumView === "photo" ? `<div class="photo-grid">${Array.from({ length: 9 }, (_, i) => `<div class="photo-tile" data-action="photo-detail"><span>${i + 1}</span></div>`).join("")}</div>` : ""}
      ${state.albumView === "calendar" ? calendarView() : ""}
      <button class="primary-btn full" data-action="new-memory">기록 추가</button>
    </div>
  `;
  qsa("[data-album-view] button", album).forEach((button) => button.addEventListener("click", () => {
    state.albumView = button.dataset.view;
    renderAlbum();
  }));
  bindActions(album);
}

window.openMemoryDetailLatestV3 = openMemoryDetailLatestV3;
window.setTimeout(() => {
  if (!qs("#app") || qs("#app").classList.contains("is-hidden")) return;
  const activeTab = qs(".screen.active")?.id || state.tab || "home";
  if (activeTab === "album") renderAlbum();
  else renderHome();
}, 0);

// Final restore: keep the existing detail/edit/diary flows and only repair record navigation/rendering.
function duariRecordScopeLabel(memory) {
  return scopeLabelForRecord(memory);
}

function duariMemoryIndex(memory, fallbackIndex) {
  const found = state.memories.indexOf(memory);
  return found >= 0 ? found : fallbackIndex;
}

function duariRepresentativePhotoSource(memory = {}) {
  const photos = Array.isArray(memory.photos) ? memory.photos : [];
  const savedSrc = duariPhotoSource(memory.representativePhoto);
  if (savedSrc) return savedSrc;
  const savedIndex = Number(memory.representativePhotoIndex);
  if (Number.isFinite(savedIndex) && savedIndex >= 0 && photos[savedIndex]) return duariPhotoSource(photos[savedIndex]);
  return duariPhotoSource(photos[0]);
}

function duariMemoryCardPhotoHtml(memory = {}) {
  const src = duariRepresentativePhotoSource(memory);
  return `<div class="photo-stack" aria-label="사진 미리보기">${src ? `<img src="${signupAttr(src)}" alt="" />` : ""}</div>`;
}

function memoryCards(memories, homeCompact = false) {
  return memories.map((memory, fallbackIndex) => {
    const index = duariMemoryIndex(memory, fallbackIndex);
    return `
      <article class="memory-card ${homeCompact ? "home-memory-card" : ""}" role="button" tabindex="0" data-index="${index}" data-memory-open="${index}">
        ${duariMemoryCardPhotoHtml(memory)}
        <div>
          <div class="${homeCompact ? "home-memory-title" : "between"}">
            <strong>${memory.title}</strong>
            <span class="linked-record-scope">${duariRecordScopeLabel(memory)}</span>
          </div>
          <div class="tag-row ${homeCompact ? "home-memory-meta" : ""}" style="margin-top:8px">
            <span class="meta">${memory.date}</span>
            <span class="meta">${memory.place}</span>
            <span class="meta">${memory.type}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function openMemoryDetailLatestV3(index, backAction = null) {
  const safeIndex = Number.isFinite(Number(index)) ? Number(index) : 0;
  state.activeMemoryIndex = safeIndex;
  const memory = state.memories[safeIndex] || state.memories[0];
  const photoCount = duariPhotoCountForMemory(safeIndex);
  const previousTab = qs(".screen.active")?.id || state.tab || "home";
  const goBack = backAction || (() => {
    closeModal();
    setTab(previousTab === "album" ? "album" : "home");
  });

  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-memory-detail-back aria-label="뒤로가기">‹</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(7, safeIndex)}</div>
          </div>
        </section>
        <section class="card">
          <div class="between">
            <h3 class="memory-limited-title" title="${memory.title}">${limitMemoryTitleLatest(memory.title)}</h3>
            <span class="linked-record-scope">${duariRecordScopeLabel(memory)}</span>
          </div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
        </section>
        <section class="card linked-diary-section">
          <div class="between">
            <h3>연결된 일기</h3>
            <span class="meta">3개</span>
          </div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page data-index="${safeIndex}">기록 수정</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-memory-detail-back]").addEventListener("click", () => runFlowBack(goBack));
  qs("[data-memory-edit-page]").addEventListener("click", () => openMemoryEditPageLatest(safeIndex, () => openMemoryDetailLatestV3(safeIndex, backAction)));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(safeIndex, backAction));
  bindActions(qs(".modal-sheet"));
}

function renderAlbum() {
  const album = qs("#album");
  const view = ["record", "photo", "calendar"].includes(state.albumView) ? state.albumView : "record";
  state.albumView = view;
  album.innerHTML = `
    <div class="section-stack">
      <div class="form-field">
        <label for="albumSearch">앨범 검색</label>
        <input id="albumSearch" placeholder="제목, 장소, 기록 유형" />
      </div>
      <div class="segmented" data-album-view>
        <button class="${view === "record" ? "active" : ""}" data-view="record">기록</button>
        <button class="${view === "photo" ? "active" : ""}" data-view="photo">사진</button>
        <button class="${view === "calendar" ? "active" : ""}" data-view="calendar">캘린더</button>
      </div>
      ${view === "record" ? `<div class="list">${memoryCards(state.memories)}</div>` : ""}
      ${view === "photo" ? `<div class="photo-grid">${Array.from({ length: 9 }, (_, i) => `<button class="photo-tile" type="button" data-action="photo-detail"><span>${i + 1}</span></button>`).join("")}</div>` : ""}
      ${view === "calendar" ? calendarView() : ""}
      <button class="primary-btn full" data-action="new-memory">기록 추가</button>
    </div>
  `;
  qsa("[data-album-view] button", album).forEach((button) => button.addEventListener("click", () => {
    state.albumView = button.dataset.view;
    renderAlbum();
  }));
  bindActions(album);
}

function openMemoryCardFromElementFinal(card) {
  if (!card) return;
  const index = Number(card.dataset.memoryOpen || card.dataset.index || 0);
  const activeTab = qs(".screen.active")?.id || state.tab || "home";
  openMemoryDetailLatestV3(Number.isFinite(index) ? index : 0, () => {
    closeModal();
    setTab(activeTab === "album" ? "album" : "home");
  });
}

window.openMemoryDetailLatestV3 = openMemoryDetailLatestV3;
window.setTimeout(() => {
  if (!qs("#app") || qs("#app").classList.contains("is-hidden")) return;
  const activeTab = qs(".screen.active")?.id || state.tab || "home";
  if (activeTab === "album") renderAlbum();
  else if (activeTab === "home") renderHome();
}, 0);

function renderHome() {
  const home = qs("#home");
  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between">
          <div>
            <p class="eyebrow">내 공간</p>
            <h3>하린</h3>
          </div>
          <button class="chip-btn" data-action="connect">상대 초대</button>
        </div>
        ${state.aloneCtaHidden ? "" : `
          <section class="hero-card">
            <h3>함께 쓸 공간을 만들어볼까요?</h3>
            <p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p>
            <div class="row" style="margin-top:14px">
              <button class="primary-btn" data-action="connect">상대 초대하기</button>
              <button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button>
            </div>
          </section>
        `}
        <section class="card home-records-card">
          <h3>최근 기록</h3>
          <p>아직 최근 기록이 없어요.</p>
          <button class="primary-btn full" data-action="new-memory">기록 추가</button>
        </section>
        <section class="diary-card">
          <h3>최근 일기</h3>
          <p>아직 최근 일기가 없어요.</p>
          <button class="ghost-btn full" data-action="diary-scope-first">일기 추가</button>
        </section>
        <section class="question-card">
          <p class="eyebrow">오늘의 질문</p>
          <h3>요즘 나에게 가장 힘이 되는 말은 뭐야?</h3>
          <div class="home-question-actions">
            <button class="primary-btn" data-action="answer-question">답변 추가</button>
            <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
          </div>
        </section>
      </div>
    `;
    bindActions(home);
    return;
  }

  const sharedDiaries = typeof duariHomeSharedDiaries === "function"
    ? duariHomeSharedDiaries()
    : (state.diaries || []).slice(0, 3);
  const recentMemories = (state.memories || []).slice(0, 2);
  const homeRecentMemoryCards = recentMemories.length
    ? memoryCards(recentMemories, true)
    : `<p>아직 최근 기록이 없어요.</p>`;
  const homeSharedDiaryCards = sharedDiaries.length
    ? sharedDiaries.map((diary, index) => `
        <article class="linked-diary-card home-shared-diary-card" role="button" tabindex="0" data-home-shared-diary-index="${index}">
          <div class="between">
            <strong>${diary.title || "제목 없는 일기"}</strong>
            <span class="linked-diary-type">${diaryScopeLabel(diary.scope)}</span>
          </div>
          <p>${diary.body || "작성된 내용이 없습니다."}</p>
          <div class="tag-row">${(diary.feelings || []).slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </article>
      `).join("")
    : `<p>아직 최근 일기가 없어요.</p>`;
  const currentRelation = typeof currentRelationInfo === "function" ? currentRelationInfo() : { name: "봄이 & 하린", date: "2025.03.05" };
  const relationshipDays = typeof duariRelationDays === "function" ? duariRelationDays(currentRelation.date) : 421;
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero">
        <div class="between">
          <div>
            <p class="relationship-name">${currentRelation.name}</p>
            <h3 class="together-days"><span>함께한 지 </span><strong class="together-days-number">${relationshipDays}</strong><span>일</span></h3>
          </div>
          <span class="anniversary-pill">D-7 여행 1주년</span>
        </div>
      </section>
      <section class="card home-records-card">
        <div class="between">
          <h3>최근 기록</h3>
          <button class="chip-btn" data-tab-go="album">더보기</button>
        </div>
        <div class="list">${homeRecentMemoryCards}</div>
        <button class="primary-btn full" data-action="new-memory">기록 추가</button>
      </section>
      <section class="diary-card home-shared-diary-section">
        <div class="between">
          <h3>최근 일기</h3>
          <button class="chip-btn" data-tab-go="diary">더보기</button>
        </div>
        <div class="linked-diary-list">${homeSharedDiaryCards}</div>
        <button class="primary-btn full" data-action="diary-scope-first">일기 추가</button>
      </section>
      <section class="question-card">
        <p class="eyebrow">오늘의 질문</p>
        <h3>요즘 나에게 가장 힘이 되는 말은 뭐야?</h3>
        <div class="home-question-actions">
          <button class="primary-btn" data-action="answer-question">답변 추가</button>
          <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
        </div>
      </section>
    </div>
  `;
  bindActions(home);
}

window.setTimeout(() => {
  if (!qs("#app") || qs("#app").classList.contains("is-hidden")) return;
  const activeTab = qs(".screen.active")?.id || state.tab || "home";
  if (activeTab === "home") renderHome();
}, 0);

// Final interaction guard: preserve existing page flows while preventing older handlers from stealing clicks.
if (!window.__duariFinalRecordFlowGuard) {
  window.__duariFinalRecordFlowGuard = true;

  const duariOpenRecordFromCard = (card) => {
    const index = Number(card.dataset.memoryOpen || card.dataset.index || 0);
    const screen = card.closest(".screen");
    const sourceTab = screen?.id || state.tab || "home";
    openMemoryDetailLatestV3(Number.isFinite(index) ? index : 0, () => {
      closeModal();
      setTab(sourceTab === "album" ? "album" : "home");
    });
  };

  const duariHandleFinalRecordFlowClick = (event) => {
    const albumButton = event.target.closest?.("[data-album-view] button");
    if (albumButton) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      state.albumView = albumButton.dataset.view || "record";
      renderAlbum();
      return;
    }

    const card = event.target.closest?.("#home .memory-card, #album .memory-card, #home [data-memory-open], #album [data-memory-open]");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    duariOpenRecordFromCard(card);
  };

  window.addEventListener("click", duariHandleFinalRecordFlowClick, true);
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    duariHandleFinalRecordFlowClick(event);
  }, true);
}

// Final album restore: use the original tab styling and keep all album panels visible per selected tab.
function renderAlbum() {
  const album = qs("#album");
  const view = state.albumView || "record";
  const labels = { record: "기록", photo: "사진", calendar: "캘린더" };
  const views = ["record", "photo", "calendar"];
  const content = {
    record: `<div class="list">${memoryCards(state.memories)}</div>`,
    photo: `<div class="photo-grid">${Array.from({ length: 9 }, (_, index) => `
      <button class="photo-thumb" type="button" data-action="photo-detail" aria-label="${index + 1}번째 사진">
        <span>${index + 1}</span>
      </button>
    `).join("")}</div>`,
    calendar: calendarView()
  }[view];

  album.innerHTML = `
    <div class="section-stack">
      <div class="form-field">
        <label for="albumSearch">앨범 검색</label>
        <input id="albumSearch" placeholder="제목, 장소, 기록 유형" />
      </div>
      <div class="tabs" role="tablist" aria-label="앨범 보기 방식">
        ${views.map((item) => `
          <button class="chip-btn ${view === item ? "active" : ""}" type="button" data-album-view="${item}" role="tab" aria-selected="${view === item}">
            ${labels[item]}
          </button>
        `).join("")}
      </div>
      ${content}
      <button class="primary-btn full" data-action="new-memory">기록 추가</button>
    </div>
  `;

  qsa("[data-album-view]", album).forEach((button) => {
    button.addEventListener("click", () => {
      state.albumView = button.dataset.albumView || "record";
      renderAlbum();
    });
  });
  bindActions(album);
}

function openMemoryDetailLatestV3(index, backAction = null) {
  const safeIndex = Number.isFinite(Number(index)) ? Number(index) : 0;
  state.activeMemoryIndex = safeIndex;
  const memory = state.memories[safeIndex] || state.memories[0];
  const photoCount = duariPhotoCountForMemory(safeIndex);
  const previousTab = qs(".screen.active")?.id || state.tab || "home";
  const goBack = backAction || (() => {
    closeModal();
    setTab(previousTab === "album" ? "album" : "home");
  });

  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-memory-detail-back aria-label="뒤로가기">←</button>
        <h3>기록 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="memory-photo-gallery" aria-label="사진 영역">
          <div class="memory-photo-main">
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount, safeIndex)}</div>
          </div>
        </section>
        <section class="card">
          <div class="between">
            <h3 class="memory-limited-title" title="${memory.title}">${limitMemoryTitleLatest(memory.title)}</h3>
            <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
          </div>
          <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
        </section>
        <section class="card linked-diary-section">
          <div class="between">
            <h3>연결된 일기</h3>
            <span class="meta">${linkedDiariesLatest().length}개</span>
          </div>
          <div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>
        </section>
        <button class="primary-btn full" data-memory-edit-page data-index="${safeIndex}">기록 수정</button>
      </div>
    </div>
  `);

  qs("#modal").classList.add("page-modal");
  qs("[data-memory-detail-back]").addEventListener("click", () => runFlowBack(goBack));
  qs("[data-memory-edit-page]").addEventListener("click", () => {
    openMemoryEditPageLatest(safeIndex, () => openMemoryDetailLatestV3(safeIndex, backAction));
  });
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(safeIndex, backAction));
  bindActions(qs(".modal-sheet"));
}

function duariOpenRecordCardWithExistingFlow(card) {
  const index = Number(card.dataset.memoryOpen || card.dataset.index || 0);
  const sourceTab = card.closest(".screen")?.id || state.tab || "home";
  openMemoryDetailLatestV3(Number.isFinite(index) ? index : 0, () => {
    closeModal();
    setTab(sourceTab === "album" ? "album" : "home");
  });
}

if (!window.__duariFinalAlbumAndRecordRestore) {
  window.__duariFinalAlbumAndRecordRestore = true;
  window.addEventListener("click", (event) => {
    const albumTab = event.target.closest?.("#album [data-album-view]");
    if (albumTab) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      state.albumView = albumTab.dataset.albumView || albumTab.dataset.view || "record";
      renderAlbum();
      return;
    }

    const card = event.target.closest?.("#home .memory-card, #album .memory-card, #home [data-memory-open], #album [data-memory-open]");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    duariOpenRecordCardWithExistingFlow(card);
  }, true);

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest?.("#home .memory-card, #album .memory-card, #home [data-memory-open], #album [data-memory-open]");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    duariOpenRecordCardWithExistingFlow(card);
  }, true);
}

window.openMemoryDetailLatestV3 = openMemoryDetailLatestV3;
window.setTimeout(() => {
  if (!qs("#app") || qs("#app").classList.contains("is-hidden")) return;
  const activeTab = qs(".screen.active")?.id || state.tab || "home";
  if (activeTab === "album") renderAlbum();
  if (activeTab === "home") renderHome();
}, 0);

// Restore the original album tab content order and panels.
function renderAlbum() {
  const album = qs("#album");
  const views = ["record", "photo", "calendar"];
  const labels = { record: "기록", photo: "사진", calendar: "캘린더" };
  const currentView = views.includes(state.albumView) ? state.albumView : "record";
  state.albumView = currentView;

  let content = "";
  if (currentView === "record") {
    content = `<div class="list">${memoryCards(state.memories)}</div>`;
  }
  if (currentView === "photo") {
    content = `
      <section class="card">
        <h3>사진 중심 보기</h3>
        <p>사진은 기록 단위로 연결되며, 선택 순서 변경과 추가/삭제 정책은 기록 상세에서 관리합니다.</p>
      </section>
      <div class="quick-grid">
        ${Array.from({ length: 6 }, (_, index) => `<button class="photo-stack" data-action="photo-detail" aria-label="${index + 1}번째 사진"></button>`).join("")}
      </div>
    `;
  }
  if (currentView === "calendar") {
    content = `
      <div class="calendar-grid">
        ${Array.from({ length: 28 }, (_, index) => {
          const day = index + 1;
          const cls = day === 21 ? "today" : day === 26 ? "selected" : "";
          const mark = day === 21 ? "대화" : day === 26 ? "데이트 +1" : "";
          return `<div class="day ${cls}" aria-label="4월 ${day}일"><span>${day}</span><small>${mark}</small></div>`;
        }).join("")}
      </div>
      <div class="list" style="margin-top:12px">${memoryCards(state.memories.slice(0, 1))}</div>
    `;
  }

  album.innerHTML = `
    <div class="section-stack">
      <div class="tabs">
        ${views.map((view) => `<button class="chip-btn ${currentView === view ? "active" : ""}" data-album-view="${view}">${labels[view]}</button>`).join("")}
      </div>
      <div class="form-field">
        <label for="albumSearch">앨범 검색</label>
        <input id="albumSearch" placeholder="제목, 장소, 메모, 기록 유형" />
      </div>
      ${content}
      <button class="primary-btn full" data-action="new-memory">새 기록 추가</button>
    </div>
  `;
  qsa("[data-album-view]", album).forEach((button) => {
    button.addEventListener("click", () => {
      state.albumView = button.dataset.albumView;
      if (state.albumView === "calendar") {
        state.calendarTouched = false;
        state.calendarMonth = "";
        state.calendarSelectedDate = "";
      }
      renderAlbum();
    });
  });
  bindActions(album);
}

window.setTimeout(() => {
  if (!qs("#app") || qs("#app").classList.contains("is-hidden")) return;
  if ((qs(".screen.active")?.id || state.tab) === "album") renderAlbum();
}, 0);

// Duari final diary-add AI flow.
// Keeps the newest requested flow isolated from older generic data-action handlers.
let duariDiaryAiDraft = null;

function duariNormalizeDiaryHeading(heading) {
  const text = String(heading || "").trim();
  if (!text || text === "일기 쓰기") return "일기 추가";
  return text;
}

function duariEscapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function duariCurrentDiaryDraft(fallback = {}) {
  const page = qs(".diary-write-page");
  const activeScope = qs("[data-diary-scope] .chip-btn.active", page)?.textContent?.trim();
  const selectedDate = qs("#diaryDate", page)?.value;
  const forceNoLinkedRecord = fallback.forceNoLinkedRecord === true;
  const originalIdentity = fallback._duariOriginal || {
    title: page?.dataset.originalTitle || fallback.title || "",
    body: page?.dataset.originalBody || fallback.body || "",
    linked: page?.dataset.originalLinked || fallback.linked || "",
    date: page?.dataset.originalDate || fallback.date || fallback.createdAt || ""
  };
  const linkedTitle = forceNoLinkedRecord
    ? "관련 기록 없음"
    : (
      qs(".linked-record-title-text", page)?.textContent?.trim() ||
      qs(".linked-record-pill span", page)?.textContent?.trim() ||
      fallback.linked ||
      "관련 기록 없음"
    );
  const currentLinkedMemoryIndex = !forceNoLinkedRecord && diaryHasLinkedRecord?.(linkedTitle)
    ? recordIndexByTitle(linkedTitle, typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0)
    : null;
  const linkedMemoryIndex = forceNoLinkedRecord
    ? null
    : (typeof currentLinkedMemoryIndex === "number"
      ? currentLinkedMemoryIndex
      : typeof fallback.linkedMemoryIndex === "number"
      ? fallback.linkedMemoryIndex
      : null);

  return {
    heading: duariNormalizeDiaryHeading(qs(".notification-header h3", page)?.textContent || fallback.heading),
    title: qs("#diaryTitle", page)?.value || fallback.title || "",
    body: qs("#diaryBody", page)?.value || fallback.body || "",
    date: selectedDate ? selectedDate.replaceAll("-", ".") : (fallback.date || fallback.createdAt || originalIdentity.date || duariTodayDateText()),
    scope: activeScope?.includes("상대") ? "공유" : (fallback.scope || "개인"),
    feelings: qsa("[data-diary-feelings] .chip-btn.active", page).map((button) => button.textContent.trim()).slice(0, 2),
    linked: linkedTitle,
    linkedMemoryIndex,
    backAction: fallback.backAction || diaryEditorFlowBackAction,
    forceNoLinkedRecord,
    _duariOriginal: originalIdentity
  };
}

function duariLinkedRecordEditorHtml(linkedTitle, linkedMemoryIndex) {
  const hasLinked = diaryHasLinkedRecord?.(linkedTitle);
  const recordIndex = hasLinked ? (linkedMemoryIndex ?? recordIndexByTitle(linkedTitle, 0)) : null;
  const record = hasLinked ? state.memories[recordIndex] : null;
  const recordHtml = hasLinked && record ? `
    <article class="linked-record-pill linked-record-detail-card">
      <div class="linked-record-title-row title-between">
        <span class="linked-record-title-text">${duariEscapeHtml(record.title)}</span>
        <span class="linked-record-right-tools">
          <span class="linked-record-scope">${scopeLabelForRecord(record)}</span>
          <span class="linked-record-menu-wrap">
            <button class="icon-btn linked-record-kebab" type="button" data-linked-record-menu aria-label="더보기" title="더보기">
              <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
            </button>
            <span class="linked-record-dropdown" data-linked-record-dropdown hidden>
              <button type="button" data-linked-record-detail="${recordIndex}">상세 보기</button>
              <button type="button" data-diary-unlink-record>삭제</button>
            </span>
          </span>
        </span>
      </div>
    </article>
  ` : `<p class="linked-record-empty">연결된 기록이 없습니다.</p>`;

  return `
    <section class="card linked-record-card">
      <div class="between">
        <h3>연결된 기록</h3>
        <span class="meta">${hasLinked ? "1개" : "0개"}</span>
      </div>
      <div class="linked-record-list">${recordHtml}</div>
      <div class="inline-action-pair">
        <button class="ghost-btn" type="button" data-duari-record-picker>기록 선택</button>
        <button class="ghost-btn" type="button" data-duari-new-record>기록 추가</button>
      </div>
    </section>
  `;
}

function duariBindDiaryEditor(args = {}) {
  const sheet = qs(".diary-write-page");
  if (!sheet) return;

  makeToggleButtons?.(qs("[data-diary-feelings]", sheet));

  const titleInput = qs("#diaryTitle", sheet);
  const titleCount = qs("[data-diary-title-count]", sheet);
  const syncTitle = () => {
    if (!titleInput || !titleCount) return;
    if (titleInput.value.length > 24) titleInput.value = titleInput.value.slice(0, 24);
    titleCount.textContent = `${titleInput.value.length}/24`;
  };
  titleInput?.addEventListener("input", syncTitle);
  syncTitle();

  qsa("[data-diary-scope] .chip-btn:not([disabled])", sheet).forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-diary-scope] .chip-btn", sheet).forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  qs("[data-duari-diary-back]", sheet)?.addEventListener("click", () => runFlowBack(args.backAction || diaryEditorFlowBackAction));
  qs("[data-duari-record-picker]", sheet)?.addEventListener("click", () => {
    openDiaryRecordPickerPage(duariCurrentDiaryDraft(args));
  });
  qs("[data-duari-new-record]", sheet)?.addEventListener("click", () => {
    const draft = duariCurrentDiaryDraft(args);
    memoryLinkedDiarySelection.create = null;
    memoryLinkedDiarySelection.createDiary = null;
    openMemoryCreatePage(
      () => renderDiaryEditor({ heading: draft.heading, diary: draft, linkedMemoryIndex: draft.linkedMemoryIndex, backAction: draft.backAction }),
      { hideLinkedDiaries: true, returnToDiaryDraft: draft }
    );
  });
  sheet.addEventListener("click", (event) => {
    const menuButton = event.target.closest("[data-linked-record-menu]");
    if (menuButton) {
      event.preventDefault();
      event.stopPropagation();
      const menu = menuButton.closest(".linked-record-menu-wrap")?.querySelector("[data-linked-record-dropdown]");
      const willOpen = !!menu?.hidden;
      qsa("[data-linked-record-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      qsa("[data-linked-record-menu]", sheet).forEach((item) => item.classList.remove("active"));
      if (menu && willOpen) {
        menu.hidden = false;
        menuButton.classList.add("active");
      }
      return;
    }

    const detailButton = event.target.closest("[data-linked-record-detail]");
    if (detailButton) {
      event.preventDefault();
      event.stopPropagation();
      qsa("[data-linked-record-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      const draft = duariCurrentDiaryDraft(args);
      const index = Number(detailButton.dataset.linkedRecordDetail || draft.linkedMemoryIndex || 0);
      openMemoryDetailLatestV3(index, () => renderDiaryEditor({
        heading: draft.heading,
        diary: draft,
        linkedMemoryIndex: draft.linkedMemoryIndex,
        backAction: draft.backAction
      }));
      return;
    }

    const unlinkButton = event.target.closest("[data-diary-unlink-record]");
    if (unlinkButton) {
      event.preventDefault();
      event.stopPropagation();
      qsa("[data-linked-record-dropdown]", sheet).forEach((item) => { item.hidden = true; });
      openDiaryUnlinkDeleteConfirmOverlay?.(args.backAction || diaryEditorFlowBackAction);
    }
  });
  qs("[data-duari-ai-message]", sheet)?.addEventListener("click", () => {
    duariDiaryAiDraft = duariCurrentDiaryDraft(args);
    openAiSourcePage({
      original: duariDiaryAiDraft.body,
      tone: aiTonePresets[0],
      fromDiaryEditor: true
    });
  });
  qs("[data-save-original-diary]", sheet)?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const draft = duariCurrentDiaryDraft(args);
    if (args.forceNoLinkedRecord === true) {
      const savedDiary = {
        title: draft.title || "제목 없는 일기",
        body: draft.body || "작성한 내용이 없습니다.",
        scope: draft.scope,
        type: diaryScopeLabel?.(draft.scope) || (draft.scope === "공유" ? "내 공유" : "나만 보기"),
        feelings: draft.feelings.length ? draft.feelings : ["고마움"],
        linked: "기록 추가 중",
        author: "나",
        editable: true
      };
      memoryLinkedDiarySelection.createDiary = savedDiary;
      memoryLinkedDiarySelection.create = null;
      runWithoutModalHistory(() => (typeof args.backAction === "function" ? args.backAction() : openMemoryCreatePage()));
      showToast("새 일기를 기록 추가에 연결했어요.");
      return;
    }
    if (!diaryHasLinkedRecord?.(draft.linked)) {
      openRequiredLinkedRecordOverlay({ missingScope: false });
      return;
    }
    state.diaries.unshift({
      title: draft.title || "제목 없는 일기",
      body: draft.body || "작성한 내용이 없습니다.",
      scope: draft.scope,
      feelings: draft.feelings.length ? draft.feelings : ["고마움"],
      linked: draft.linked,
      author: "나",
      editable: true
    });
    closeModal();
    state.diaryView = draft.scope === "공유" ? "mineShared" : "private";
    renderDiary();
    showToast("일기를 저장했어요.");
  }, { capture: true });
  qs("[data-save-draft-diary]", sheet)?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    saveDiaryFromEditor(args.heading || "일기 추가", "관련 기록 없음", "일기를 임시 저장했어요.");
  }, { capture: true });
  qs("[data-delete-diary-edit]", sheet)?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openDiaryEditDeleteConfirmOverlay(args);
  });
  qs("[data-save-diary]", sheet)?.addEventListener("click", (event) => {
    const heading = duariNormalizeDiaryHeading(args.heading);
    if (heading !== "일기 수정" || args.forceNoLinkedRecord === true) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    duariUpdateEditedDiaryAndOpenTab(args);
  }, { capture: true });
}

function duariFindEditableDiaryIndex(diary = {}) {
  const original = diary._duariOriginal || diary;
  const title = diary.title || qs("#diaryTitle")?.value || "";
  const body = diary.body || qs("#diaryBody")?.value || "";
  const linked = diary.linked || "";
  const date = diary.date || diary.createdAt || "";
  const originalTitle = original.title || "";
  const originalBody = original.body || "";
  const originalLinked = original.linked || "";
  const originalDate = original.date || original.createdAt || "";
  return (state.diaries || []).findIndex((entry) => (
    entry === diary ||
    (entry.id && diary.id && entry.id === diary.id) ||
    (
      (!title || entry.title === title) &&
      (!body || entry.body === body) &&
      (!linked || entry.linked === linked) &&
      (!date || entry.date === date || entry.createdAt === date)
    ) ||
    (
      !!originalTitle &&
      entry.title === originalTitle &&
      (!originalDate || entry.date === originalDate || entry.createdAt === originalDate) &&
      (!originalLinked || entry.linked === originalLinked)
    ) ||
    (
      !!originalTitle &&
      !!originalBody &&
      entry.title === originalTitle &&
      entry.body === originalBody
    )
  ));
}

function openDiaryEditDeleteConfirmOverlay(args = {}) {
  const page = qs(".diary-write-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>일기를 삭제할까요?</h3>
        <p>삭제한 일기는 복구할 수 없어요.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" type="button" data-diary-edit-delete-cancel>취소</button>
          <button class="primary-btn" type="button" data-diary-edit-delete-confirm>삭제</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-diary-edit-delete-cancel]", page)?.addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-diary-edit-delete-confirm]", page)?.addEventListener("click", () => {
    const index = duariFindEditableDiaryIndex(args.diary || {});
    if (index >= 0) state.diaries.splice(index, 1);
    duariSavePersistentContent();
    qs(".ai-confirm-overlay", page)?.remove();
    const linkedTitle = args.diary?.linked || "";
    const linkedIndex = diaryHasLinkedRecord?.(linkedTitle) ? recordIndexByTitle(linkedTitle, args.linkedMemoryIndex || 0) : null;
    if (typeof linkedIndex === "number") {
      runWithoutModalHistory(() => openMemoryDetailLatestV3(linkedIndex));
    } else {
      closeModal();
      setTab("diary");
    }
    showToast("일기를 삭제했어요.");
  });
}

function duariDiaryViewFromScope(scope = "개인") {
  const normalized = normalizeDiaryScopeValue?.(scope) || scope;
  if (normalized === "공유") return "mineShared";
  if (normalized === "draft") return "draft";
  return "private";
}

function duariUpdateEditedDiaryAndOpenTab(args = {}) {
  const draft = duariCurrentDiaryDraft(args);
  const original = draft._duariOriginal || args.diary?._duariOriginal || args.diary || {};
  const index = duariFindEditableDiaryIndex(original);
  const nextDiary = {
    ...(args.diary || {}),
    title: draft.title || "제목 없는 일기",
    body: draft.body || "작성한 내용이 없습니다.",
    scope: draft.scope,
    type: diaryScopeLabel?.(draft.scope) || original.type || "나만 보기",
    originalScope: draft.scope,
    feelings: draft.feelings.length ? draft.feelings : (original.feelings || ["고마움"]),
    linked: draft.linked || original.linked || "관련 기록 없음",
    linkedMemoryIndex: draft.linkedMemoryIndex,
    author: original.author || "나",
    editable: original.editable !== false,
    date: draft.date || original.date || original.createdAt || duariTodayDateText(),
  };
  if (index >= 0) state.diaries[index] = nextDiary;
  else state.diaries.unshift(nextDiary);
  state.diaries = (state.diaries || []).filter((entry, entryIndex) => {
    if (entry === nextDiary || entryIndex === index) return true;
    const sameOriginalTitle = original.title && entry.title === original.title;
    const sameOriginalDate = original.date && (entry.date === original.date || entry.createdAt === original.date);
    const sameOriginalBody = original.body && entry.body === original.body;
    const sameOriginalLink = original.linked && entry.linked === original.linked;
    return !(sameOriginalTitle && (sameOriginalDate || sameOriginalBody) && sameOriginalLink);
  });
  duariSavePersistentContent();
  state.diaryView = duariDiaryViewFromScope(nextDiary.scope);
  closeModal();
  setTab("diary");
  showToast("일기를 수정했어요.");
}

renderDiaryEditor = function renderDiaryEditor(args = {}) {
  const heading = duariNormalizeDiaryHeading(args.heading);
  const diary = args.diary || {};
  const originalIdentity = diary._duariOriginal || {
    title: diary.title || "",
    body: diary.body || "",
    linked: diary.linked || "",
    date: diary.date || diary.createdAt || ""
  };
  const isEditMode = heading === "일기 수정";
  const forceNoLinkedRecord = args.forceNoLinkedRecord === true || diary.forceNoLinkedRecord === true;
  const linkedMemory = !forceNoLinkedRecord && typeof args.linkedMemoryIndex === "number" ? state.memories[args.linkedMemoryIndex] : null;
  const linkedTitle = forceNoLinkedRecord ? "관련 기록 없음" : (linkedMemory?.title || diary.linked || "관련 기록 없음");
  const linkedMemoryIndex = forceNoLinkedRecord ? null : args.linkedMemoryIndex;
  const title = String(diary.title || "").slice(0, 24);
  const body = diary.body || "";
  const scope = normalizeDiaryScopeValue?.(diary.scope || diary.originalScope || "개인") || "개인";
  const feelings = diary.feelings || [];
  const dateValue = toDateInputValue(diary.date || diary.createdAt || duariTodayDateText());

  openModal(`
    <div class="modal-sheet notification-page diary-write-page" data-original-title="${duariEscapeHtml(originalIdentity.title)}" data-original-body="${duariEscapeHtml(originalIdentity.body)}" data-original-linked="${duariEscapeHtml(originalIdentity.linked)}" data-original-date="${duariEscapeHtml(originalIdentity.date)}">
      <header class="notification-header">
        <button class="notification-nav-btn" data-duari-diary-back aria-label="뒤로가기">←</button>
        <h3>${heading}</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field">
          <label>공개 범위</label>
          <div class="chip-row" data-diary-scope data-original-scope="${scope}">
          <button class="chip-btn ${scope !== "공유" ? "active" : ""}" type="button">나만 보기</button>
          <button class="chip-btn ${scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" type="button" ${state.connected ? "" : "disabled"}>상대에게 공유</button>
          </div>
        </div>
        <div class="form-field">
          <div class="field-label-row">
            <label>제목</label>
            <span class="input-count" data-diary-title-count>${title.length}/24</span>
          </div>
          <input id="diaryTitle" value="${duariEscapeHtml(title)}" maxlength="24" />
        </div>
        <div class="form-field">
          <label>날짜</label>
          <input id="diaryDate" type="date" value="${dateValue}" />
        </div>
        <div class="form-field">
          <label>본문</label>
          <textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${duariEscapeHtml(body)}</textarea>
        </div>
        <div class="form-field">
          <label>내 감정</label>
          ${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], feelings, "data-diary-feelings")}
        </div>
        ${forceNoLinkedRecord ? "" : duariLinkedRecordEditorHtml(linkedTitle, linkedMemoryIndex)}
        <div class="${isEditMode ? "diary-editor-action-row" : "diary-editor-action-stack"}">
          <button class="ghost-btn ${isEditMode ? "" : "full"}" type="button" data-duari-ai-message>AI로 정리하기</button>
          ${isEditMode ? `<button class="ghost-btn" type="button" data-delete-diary-edit>삭제</button><button class="primary-btn" type="button" data-save-diary>수정 저장</button>` : `<button class="ghost-btn full" type="button" data-save-original-diary>원본으로 저장</button><button class="primary-btn full" type="button" data-save-draft-diary>임시 저장</button>`}
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  duariBindDiaryEditor({ ...args, heading, linkedMemoryIndex, forceNoLinkedRecord });
};

function returnToDiaryEditorFromAi(bodyOverride = null) {
  const draft = duariDiaryAiDraft || duariCurrentDiaryDraft({ heading: "일기 추가" });
  const nextDraft = {
    ...draft,
    body: bodyOverride !== null ? bodyOverride : draft.body
  };
  runWithoutModalHistory(() => renderDiaryEditor({
    heading: nextDraft.heading || "일기 추가",
    diary: nextDraft,
    linkedMemoryIndex: nextDraft.linkedMemoryIndex,
    backAction: nextDraft.backAction || diaryEditorFlowBackAction
  }));
}

function openAiModal() {
  duariDiaryAiDraft = duariCurrentDiaryDraft({ heading: "일기 추가" });
  openAiSourcePage({ original: duariDiaryAiDraft.body, tone: aiTonePresets[0], fromDiaryEditor: true });
}

function openAiSourcePage(draft = {}) {
  const original = draft.original ?? duariDiaryAiDraft?.body ?? getAiSourceText?.() ?? "";
  const tone = draft.tone || aiTonePresets[0];
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-source-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-cancel aria-label="뒤로가기">←</button>
        <h3>전할 말 정리하기</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="tone-section">
          <h3>톤 선택</h3>
          <div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}" type="button">${item}</button>`).join("")}</div>
        </section>
        <div class="form-field">
          <label>원문</label>
          <textarea id="aiOriginalText" class="diary-body-large">${duariEscapeHtml(original)}</textarea>
        </div>
        <button class="primary-btn full" type="button" data-ai-make-result>AI로 정리하기</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-cancel]")?.addEventListener("click", () => returnToDiaryEditorFromAi());
  qs("[data-ai-make-result]")?.addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || aiTonePresets[0];
    const nextOriginal = qs("#aiOriginalText")?.value.trim() || "";
    openAiResultPage({
      original: nextOriginal,
      tone: selectedTone,
      result: makeAiResult(nextOriginal, selectedTone),
      fromDiaryEditor: true
    });
  });
}

function openAiResultPage(draft = {}) {
  const original = draft.original ?? duariDiaryAiDraft?.body ?? "";
  const tone = draft.tone || aiTonePresets[0];
  const result = cleanAiResultText?.(draft.result || makeAiResult(original, tone)) || makeAiResult(original, tone);
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-ai-result-back aria-label="뒤로가기">←</button>
        <h3>AI 정리 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <h3>원문</h3>
          <p class="readonly-source">${duariEscapeHtml(original)}</p>
        </section>
        <div class="form-field">
          <p class="ai-field-title">AI 결과</p>
          <textarea id="aiResultText" class="diary-body-large">${duariEscapeHtml(result)}</textarea>
        </div>
        <section class="tone-section">
          <h3>톤 선택</h3>
          <div class="chip-row" data-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}" type="button">${item}</button>`).join("")}</div>
        </section>
        <div class="ai-action-grid">
          <button class="ghost-btn" type="button" data-ai-cancel-result>취소</button>
          <button class="ghost-btn" type="button" data-ai-redraft>AI로 다시 다듬기</button>
          <button class="primary-btn full-row" type="button" data-ai-apply-body>본문에 저장</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  bindToneChoice(qs(".modal-sheet"));
  qs("[data-ai-result-back]")?.addEventListener("click", () => runWithoutModalHistory(() => openAiSourcePage({ original, tone, fromDiaryEditor: true })));
  qs("[data-ai-cancel-result]")?.addEventListener("click", () => returnToDiaryEditorFromAi());
  qs("[data-ai-redraft]")?.addEventListener("click", () => {
    const selectedTone = qs("[data-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const textarea = qs("#aiResultText");
    if (!textarea) return;
    textarea.value = "";
    textarea.value = makeFreshAiRedraftFromOriginal(original, selectedTone);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  });
  qs("[data-ai-apply-body]")?.addEventListener("click", () => {
    const nextBody = qs("#aiResultText")?.value || result;
    returnToDiaryEditorFromAi(nextBody);
    showToast("AI 결과를 본문에 저장했어요.");
  });
}

function openDiaryModal(linkedMemoryIndex = null, options = {}) {
  const forceNoLinkedRecord = options.forceNoLinkedRecord === true;
  const linkedMemory = !forceNoLinkedRecord && typeof linkedMemoryIndex === "number" ? state.memories[linkedMemoryIndex] : null;
  renderDiaryEditor({
    heading: "일기 추가",
    diary: linkedMemory ? { linked: linkedMemory.title, scope: "개인" } : { scope: "개인", linked: "관련 기록 없음", forceNoLinkedRecord },
    linkedMemoryIndex: forceNoLinkedRecord ? null : linkedMemoryIndex,
    forceNoLinkedRecord,
    backAction: typeof options.backAction === "function"
      ? options.backAction
      : (typeof linkedMemoryIndex === "number"
      ? (() => openMemoryEditPageLatest(linkedMemoryIndex, () => openMemoryDetailLatestV3(linkedMemoryIndex)))
      : diaryEditorFlowBackAction)
  });
}

if (!window.__duariDiaryAddAiFlowGuard) {
  window.__duariDiaryAddAiFlowGuard = true;
  window.addEventListener("click", (event) => {
    const trigger = event.target.closest?.("[data-action='diary-scope-first'], [data-action='new-diary']");
    if (!trigger) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const linkedIndex = trigger.dataset.action === "new-diary" && typeof state.activeMemoryIndex === "number"
      ? state.activeMemoryIndex
      : null;
    openDiaryModal(linkedIndex);
  }, true);
}

// Final fix: the previous linkedDiariesLatest wrapper captured itself because
// later function declarations are hoisted. Keep record detail flows intact by
// sourcing linked diaries from stable defaults plus any diaries added per record.
const duariDefaultLinkedDiaries = [
  {
    type: "나만 보기",
    title: "아직 정리 중인 마음",
    body: "그 시간에 느꼈던 마음을 천천히 적어두고 있어요.",
    editable: true,
    feelings: ["편안함", "고마움"],
    partnerFeelings: [],
    scope: "개인",
    linked: "성수에서 보낸 오후",
    author: "나"
  },
  {
    type: "내 공유",
    title: "오늘 고마웠던 것",
    body: "함께 걸으면서 편하게 웃을 수 있어서 좋았어요.",
    editable: true,
    feelings: ["고마움", "다정함"],
    partnerFeelings: [],
    scope: "공유",
    linked: "성수에서 보낸 오후",
    author: "나"
  },
  {
    type: "상대 공유",
    title: "나도 기억하고 있어",
    body: "네가 남긴 기록을 읽으면서 그날의 공기가 다시 떠올랐어.",
    editable: false,
    feelings: [],
    partnerFeelings: ["고마움", "소중함"],
    scope: "공유",
    linked: "성수에서 보낸 오후",
    author: "봄이"
  }
];

function linkedDiariesLatest() {
  const activeIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  const activeMemory = state.memories?.[activeIndex] || state.memories?.[0];
  const activeTitle = activeMemory?.title || "";
  const added = typeof memoryLinkedAddedDiaries !== "undefined" ? (memoryLinkedAddedDiaries[activeIndex] || []) : [];
  const saved = (state.diaries || []).filter((diary) => diary.linked === activeTitle);
  const fallback = saved.length || added.length ? [] : duariDefaultLinkedDiaries.filter((diary) => diary.linked === activeTitle);
  const seen = new Set();
  return [...added, ...saved, ...fallback].filter((diary) => {
    const key = [
      diary.id || "",
      diary.title || "",
      diary.body || "",
      diary.linked || activeTitle,
      diary.date || diary.createdAt || ""
    ].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 6);
}

window.linkedDiariesLatest = linkedDiariesLatest;

const duariBundledDiarySignatures = new Set([
  "오늘 고마웠던 것|작은 말에도 내 편이 있다는 느낌이 들었다.",
  "천천히 걸었던 길|별말 없이 걸어도 마음이 편해지는 하루였다.",
  "기억하고 싶은 말|무심코 건넨 말이 오래 남아서 함께 적어두고 싶었다.",
  "같이 웃었던 순간|사소한 농담에도 한참 웃던 장면이 자꾸 떠오른다.",
  "다시 가고 싶은 곳|오늘의 공기와 온도가 우리 기록에 오래 남았으면 좋겠다.",
  "마음을 건넨 밤|조금 늦게 말했지만 그래도 전할 수 있어서 다행이었다.",
  "아직 정리 중인 마음|서운했던 일을 바로 말하기보다 조금 더 내 마음을 들여다보기.",
  "말하지 못한 이유|상대가 싫어서가 아니라 내가 아직 정리하지 못한 마음이었다.",
  "혼자 남겨둔 생각|오늘 느낀 감정을 조금 더 자세히 적어두고 싶었다.",
  "내가 바랐던 것|크게 바란 건 아니지만 알아주면 좋겠다고 생각했다.",
  "괜찮아지는 중|시간이 조금 지나니 마음이 부드럽게 가라앉았다.",
  "다음엔 이렇게 말하기|내 마음을 탓하지 않고 짧고 솔직하게 말해보기.",
  "고마운 마음|오늘 고마웠던 장면을 조금 더 다듬어서 전하고 싶다.",
  "서운했던 순간|서운함을 탓처럼 들리지 않게 정리해보고 있다.",
  "다음 데이트|다음에 같이 가고 싶은 곳과 이유를 적어두었다.",
  "미안한 마음|내가 놓쳤던 부분을 인정하고 부드럽게 말해보고 싶다.",
  "오래 남은 말|상대가 해준 말 중 오래 남은 문장을 정리 중이다.",
  "오늘의 마음|지금 바로 보내기보다 조금 더 생각해보고 싶다.",
]);

function duariIsBundledSampleDiary(diary = {}) {
  return duariBundledDiarySignatures.has(`${diary.title || ""}|${diary.body || ""}`);
}

function duariHomeSharedDiaries() {
  const source = (state.diaries || []).filter((diary) => !duariIsBundledSampleDiary(diary));
  return source.slice(0, 2);
}

function openHomeSharedDiaryDetail(index = 0) {
  const entry = duariHomeSharedDiaries()[Number(index)] || duariHomeSharedDiaries()[0];
  if (!entry) return;
  renderDiaryDetailReadOnly(entry, () => {
    closeModal();
    setTab("home");
  });
}

if (!window.__duariHomeSharedDiaryClickGuard) {
  window.__duariHomeSharedDiaryClickGuard = true;
  window.addEventListener("click", (event) => {
    const card = event.target.closest?.("[data-home-shared-diary-index]");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openHomeSharedDiaryDetail(card.dataset.homeSharedDiaryIndex || 0);
  }, true);
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest?.("[data-home-shared-diary-index]");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openHomeSharedDiaryDetail(card.dataset.homeSharedDiaryIndex || 0);
  }, true);
}

const duariQuestionAnswerDraft = {
  question: "요즘 나에게 가장 힘이 되는 말은 뭐야?",
  body: ""
};

function duariCurrentQuestionText() {
  return qs("#home .question-card h3")?.textContent?.trim()
    || qs("#questions .question-card h3")?.textContent?.trim()
    || duariQuestionAnswerDraft.question;
}

function openQuestionModal() {
  duariQuestionAnswerDraft.question = duariCurrentQuestionText();
  const activeTab = qs(".screen.active")?.id || state.tab || "home";
  openModal(`
    <div class="modal-sheet notification-page question-answer-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-question-back aria-label="뒤로가기">←</button>
        <h3>답변 추가</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <p class="eyebrow">오늘의 질문</p>
          <h3>${duariEscapeHtml(duariQuestionAnswerDraft.question)}</h3>
        </section>
        <div class="form-field">
          <label>답변</label>
          <textarea id="questionAnswerBody" class="diary-body-large" placeholder="솔직하게 적어보세요.">${duariEscapeHtml(duariQuestionAnswerDraft.body)}</textarea>
        </div>
        <p class="meta question-delivery-note">답변은 상대방에게 전달됩니다.</p>
        <div class="diary-editor-action-stack">
          <button class="ghost-btn full" type="button" data-question-ai>AI로 다듬어서 보내기</button>
          <button class="primary-btn full" type="button" data-question-send-original>원문으로 보내기</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-question-back]")?.addEventListener("click", () => {
    closeModal();
    setTab(activeTab);
  });
  qs("#questionAnswerBody")?.addEventListener("input", (event) => {
    duariQuestionAnswerDraft.body = event.target.value;
  });
  qs("[data-question-send-original]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.body = qs("#questionAnswerBody")?.value || "";
    openQuestionSendConfirmOverlay();
  });
  qs("[data-question-ai]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.body = qs("#questionAnswerBody")?.value || "";
    openQuestionAiResultPage({
      original: duariQuestionAnswerDraft.body,
      tone: "부드럽게",
      result: makeAiResult(duariQuestionAnswerDraft.body, "부드럽게")
    });
  });
}

function openQuestionSendConfirmOverlay() {
  const page = qs(".question-answer-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>상대방에게 전달할까요?</h3>
        <p>작성한 답변이 최종 메시지로 상대방에게 전달됩니다.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" type="button" data-question-send-cancel>취소</button>
          <button class="primary-btn" type="button" data-question-send-confirm>전달하기</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-question-send-cancel]", page)?.addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-question-send-confirm]", page)?.addEventListener("click", () => {
    qs(".ai-confirm-overlay", page)?.remove();
    closeModal();
    setTab("home");
    showToast("답변을 상대방에게 전달했어요.");
  });
}

function openQuestionAiResultPage({ original = "", tone = "부드럽게", result = "" } = {}) {
  const cleanResult = cleanAiResultText?.(result || makeAiResult(original, tone)) || makeAiResult(original, tone);
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page question-ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-question-ai-back aria-label="뒤로가기">←</button>
        <h3>AI 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <h3>원문</h3>
          <p class="readonly-source">${duariEscapeHtml(original)}</p>
        </section>
        <div class="form-field">
          <p class="ai-field-title">AI 결과</p>
          <textarea id="questionAiResultText" class="diary-body-large">${duariEscapeHtml(cleanResult)}</textarea>
        </div>
        <div class="ai-action-grid">
          <button class="ghost-btn" type="button" data-question-ai-cancel>취소</button>
          <button class="ghost-btn" type="button" data-question-ai-redraft>AI로 다시 다듬기</button>
          <button class="primary-btn full-row" type="button" data-question-ai-apply>본문에 저장</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-question-ai-back]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.body = original;
    openQuestionModal();
  });
  qs("[data-question-ai-cancel]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.body = original;
    openQuestionModal();
  });
  qs("[data-question-ai-redraft]")?.addEventListener("click", () => {
    const textarea = qs("#questionAiResultText");
    if (!textarea) return;
    textarea.value = "";
    textarea.value = makeFreshAiRedraftFromOriginal(original, tone);
  });
  qs("[data-question-ai-apply]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.method = "AI 다듬음";
    duariQuestionAnswerDraft.original = original || duariQuestionAnswerDraft.body || "";
    duariQuestionAnswerDraft.body = qs("#questionAiResultText")?.value || cleanResult;
    openQuestionModal();
    showToast("AI 결과를 답변 본문에 저장했어요.");
  });
}

function duariRestoreLoggedInSession() {
  let activeLogin = "";
  try {
    activeLogin = localStorage.getItem(DUARI_ACTIVE_LOGIN_STORAGE_KEY) || "";
  } catch {
    activeLogin = "";
  }
  const account = activeLogin ? getSignupAccount(activeLogin) : null;
  if (!account) {
    if (activeLogin) duariForgetCurrentLogin();
    return;
  }

  state.currentLoginEmail = account.email;
  if (!account.setupComplete) {
    openFirstSetupPage();
    return;
  }

  applyCurrentAccountRelation();
  duariLoadPersistentContent();
  if (typeof state.connected !== "boolean") state.connected = true;
  qs("#onboarding")?.classList.add("is-hidden");
  qs("#onboarding")?.classList.remove("is-visible");
  qs("#app")?.classList.remove("is-hidden");
  closeModal();
  setTab("home");
}

window.setTimeout(duariRestoreLoggedInSession, 0);

function duariDiaryBelongsToMemory(diary = {}, memoryTitle = "") {
  if (!memoryTitle) return false;
  return diary.linked === memoryTitle || diary.linkedMemoryTitle === memoryTitle;
}

function duariDeduplicateLinkedDiaries(diaries = [], memoryTitle = "") {
  const seen = new Set();
  return diaries.filter((diary) => {
    if (!duariDiaryBelongsToMemory(diary, memoryTitle)) return false;
    const key = [
      diary.id || "",
      diary.title || "",
      diary.body || "",
      diary.scope || "",
      memoryTitle
    ].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

linkedDiariesLatest = function linkedDiariesLatest() {
  const activeIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
  const activeMemory = state.memories?.[activeIndex];
  const activeTitle = activeMemory?.title || "";
  if (!activeTitle) return [];
  const added = typeof memoryLinkedAddedDiaries !== "undefined" ? (memoryLinkedAddedDiaries[activeIndex] || []) : [];
  const saved = state.diaries || [];
  return duariDeduplicateLinkedDiaries([...saved, ...added], activeTitle).slice(0, 6);
};

window.linkedDiariesLatest = linkedDiariesLatest;

function duariRefreshPhotoManageCard(count, options = {}) {
  const card = qs("[data-photo-manage-card]");
  if (!card) return;
  const safeCount = Math.max(0, Number(count) || 0);
  const createMode = options.createMode === true || !!qs(".memory-create-page");
  const memoryIndex = typeof options.memoryIndex === "number"
    ? options.memoryIndex
    : (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0);
  const photos = createMode
    ? (Array.isArray(state.memoryCreateDraft?.photos) ? state.memoryCreateDraft.photos : [])
    : duariPhotoListForMemory(memoryIndex);
  const representativeIndex = createMode
    ? (Number(state.memoryCreateDraft?.representativePhotoIndex) || 0)
    : (Number(state.memories?.[memoryIndex]?.representativePhotoIndex) || 0);
  const openAddChoice = () => openPhotoAddChoiceModal(createMode ? { createMode: true } : { memoryIndex });
  if (safeCount <= 0) {
    card.innerHTML = `<div class="between"><h3>사진 관리</h3><span class="meta" data-photo-manage-count>0장</span></div><div class="photo-empty-state" data-photo-manage-grid><p class="linked-record-empty photo-empty-line">아직 추가된 사진이 없어요.</p></div><button class="primary-btn full" data-photo-add-choice>사진 추가</button>`;
    qs("[data-photo-add-choice]", card)?.addEventListener("click", openAddChoice);
    return;
  }
  card.innerHTML = `<div class="between"><h3>사진 관리</h3><span class="meta" data-photo-manage-count>${safeCount}장</span></div><div class="photo-order-grid compact" data-photo-manage-grid>${memoryPhotoCardsLatest(safeCount, photos, { showDelete: true, representativeIndex })}</div>${recordPhotoActionsHtml()}`;
  qs("[data-photo-order-page]", card)?.addEventListener("click", () => {
    if (createMode) {
      state.memoryCreateDraft = {
        ...(state.memoryCreateDraft || {}),
        photoCount: duariCurrentPhotoManageCount(safeCount)
      };
      openPhotoOrderManagerPageLatest(() => openMemoryCreatePage());
      return;
    }
    openPhotoOrderManagerPageLatest(() => openMemoryEditPageLatest(memoryIndex));
  });
  qs("[data-photo-add-choice]", card)?.addEventListener("click", openAddChoice);
  bindPhotoManageDeleteButtons(card, createMode ? { createMode: true } : { memoryIndex });
}

function duariPhotoIsOwnedByMe(memoryIndex, photoIndex, createMode = false) {
  const photos = createMode
    ? (Array.isArray(state.memoryCreateDraft?.photos) ? state.memoryCreateDraft.photos : [])
    : duariPhotoListForMemory(memoryIndex);
  const photo = photos[photoIndex];
  if (photo && typeof photo === "object" && photo.owner) return photo.owner !== "상대";
  return createMode ? true : duariPhotoIsMine(memoryIndex, photoIndex);
}

function removePhotoFromManageState({ createMode = false, memoryIndex = 0, photoIndex = 0 } = {}) {
  if (createMode) {
    const draft = state.memoryCreateDraft || {};
    const photos = Array.isArray(draft.photos) ? [...draft.photos] : [];
    if (photos.length > photoIndex) photos.splice(photoIndex, 1);
    const currentCount = duariCurrentPhotoManageCount(draft.photoCount || photos.length);
    state.memoryCreateDraft = {
      ...draft,
      photos,
      photoCount: Math.max(0, Math.min(30, Math.max(currentCount - 1, photos.length)))
    };
    duariRefreshPhotoManageCard(state.memoryCreateDraft.photoCount, { createMode: true });
    return;
  }

  const memory = state.memories?.[memoryIndex];
  if (!memory) return;
  const photos = Array.isArray(memory.photos) ? [...memory.photos] : [];
  const deletedPhoto = photos[photoIndex] || null;
  if (photos.length > photoIndex) photos.splice(photoIndex, 1);
  const currentCount = duariPhotoCountForMemory(memoryIndex);
  memory.photos = photos;
  memory.photoCount = Math.max(0, Math.min(30, Math.max(currentCount - 1, photos.length)));
  if (duariPhotoSource(memory.representativePhoto) === duariPhotoSource(deletedPhoto)) {
    memory.representativePhoto = photos[0] || null;
    memory.representativePhotoIndex = 0;
  }
  duariSavePersistentContent();
  duariRefreshPhotoManageCard(memory.photoCount, { memoryIndex });
  renderAlbum();
  renderHome();
}

function openPhotoManageDeleteConfirm(options = {}) {
  const createMode = options.createMode === true;
  const memoryIndex = Number(options.memoryIndex) || 0;
  const photoIndex = Number(options.photoIndex) || 0;
  const modal = qs("#modal") || document.body;
  qs(".photo-delete-overlay", modal)?.remove();
  modal.insertAdjacentHTML("beforeend", `
    <div class="photo-delete-overlay" role="dialog" aria-modal="true">
      <section class="photo-delete-sheet">
        <h3>사진을 삭제할까요?</h3>
        <p>삭제하면 사진 관리에서 사라지고 복구할 수 없어요.</p>
        <div class="inline-action-pair">
          <button class="primary-btn" type="button" data-photo-manage-delete-confirm>삭제</button>
          <button class="ghost-btn" type="button" data-photo-manage-delete-cancel>취소</button>
        </div>
      </section>
    </div>
  `);
  qs("[data-photo-manage-delete-cancel]", modal)?.addEventListener("click", () => qs(".photo-delete-overlay", modal)?.remove());
  qs("[data-photo-manage-delete-confirm]", modal)?.addEventListener("click", () => {
    qs(".photo-delete-overlay", modal)?.remove();
    removePhotoFromManageState({ createMode, memoryIndex, photoIndex });
    showToast("사진을 삭제했어요.");
  });
}

function bindPhotoManageDeleteButtons(root, options = {}) {
  qsa("[data-photo-manage-delete]", root).forEach((button) => {
    if (button.dataset.photoDeleteBound === "true") return;
    button.dataset.photoDeleteBound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const photoIndex = Number(button.dataset.photoManageDelete) || 0;
      openPhotoManageDeleteConfirm({ ...options, photoIndex });
    });
  });
}

if (!window.__duariPhotoManageDeleteGuard) {
  window.__duariPhotoManageDeleteGuard = true;
  window.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-photo-manage-delete]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const createMode = !!button.closest(".memory-create-page");
    const editPage = button.closest(".memory-edit-page");
    const memoryIndex = createMode
      ? 0
      : (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0);
    openPhotoManageDeleteConfirm({
      createMode,
      memoryIndex,
      photoIndex: Number(button.dataset.photoManageDelete) || 0
    });
  }, true);
}

function readSelectedPhotoFiles(input) {
  const files = Array.from(input?.files || []).filter((file) => file.type.startsWith("image/"));
  return Promise.all(files.map((file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const src = await duariCompressImageDataUrl(String(reader.result || ""));
      resolve({ src, name: file.name, owner: "나" });
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  }))).then((items) => items.filter(Boolean));
}

function duariCompressImageDataUrl(dataUrl, maxSide = 1280, quality = 0.82) {
  return new Promise((resolve) => {
    if (!dataUrl) {
      resolve("");
      return;
    }
    const image = new Image();
    image.onload = () => {
      const width = image.naturalWidth || image.width;
      const height = image.naturalHeight || image.height;
      if (!width || !height) {
        resolve(dataUrl);
        return;
      }
      const scale = Math.min(1, maxSide / Math.max(width, height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        resolve(dataUrl);
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    image.onerror = () => resolve(dataUrl);
    image.src = dataUrl;
  });
}

async function duariCompactMemoryPhotos(memory = {}) {
  if (!Array.isArray(memory.photos)) return;
  let changed = false;
  const representativeSrc = duariPhotoSource(memory.representativePhoto);
  memory.photos = await Promise.all(memory.photos.map(async (photo) => {
    const src = duariPhotoSource(photo);
    if (!src || src.length < 700000) return photo;
    const nextSrc = await duariCompressImageDataUrl(src);
    changed = changed || nextSrc !== src;
    return typeof photo === "string" ? nextSrc : { ...photo, src: nextSrc };
  }));
  if (changed) {
    const representativeIndex = Number(memory.representativePhotoIndex) || 0;
    if (memory.photos[representativeIndex]) {
      memory.representativePhoto = memory.photos[representativeIndex];
    } else if (representativeSrc) {
      memory.representativePhoto = memory.photos.find((photo) => duariPhotoSource(photo) === representativeSrc) || memory.photos[0] || null;
      memory.representativePhotoIndex = Math.max(0, memory.photos.indexOf(memory.representativePhoto));
    }
  }
}

function openPhotoAddChoiceModal(options = {}) {
  const createMode = options.createMode === true || (!!qs(".memory-create-page") && typeof options.memoryIndex !== "number");
  const memoryIndex = typeof options.memoryIndex === "number"
    ? options.memoryIndex
    : (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0);
  qs(".photo-add-overlay")?.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <div class="photo-add-overlay" role="dialog" aria-modal="true">
      <div class="photo-add-sheet">
        <div class="between">
          <h3>사진 추가</h3>
          <button class="icon-btn" type="button" data-photo-add-close aria-label="닫기">×</button>
        </div>
        <input type="file" accept="image/*" multiple hidden data-photo-album-input />
        <input type="file" accept="image/*" capture="environment" hidden data-photo-camera-input />
        <div class="photo-add-actions">
          <button class="ghost-btn" type="button" data-photo-capture>사진 촬영</button>
          <button class="primary-btn" type="button" data-photo-album-open>앨범 보기</button>
        </div>
        <div class="photo-add-cancel-action">
          <button class="ghost-btn" type="button" data-photo-add-close>취소</button>
        </div>
      </div>
    </div>
  `);
  const overlay = qs(".photo-add-overlay");
  const albumInput = qs("[data-photo-album-input]", overlay);
  const cameraInput = qs("[data-photo-camera-input]", overlay);
  const addSelectedPhotos = async (input) => {
    const selectedPhotos = await readSelectedPhotoFiles(input);
    if (!selectedPhotos.length) return;
    const memory = state.memories?.[memoryIndex];
    const currentCount = createMode
      ? duariCurrentPhotoManageCount(state.memoryCreateDraft?.photoCount || 0)
      : duariPhotoCountForMemory(memoryIndex);
    const nextCount = Math.min(30, currentCount + selectedPhotos.length);
    const addedCount = nextCount - currentCount;
    if (addedCount <= 0) {
      showToast("한 기록에는 사진을 최대 30장까지 추가할 수 있어요.");
      return;
    }
    const photosToAdd = selectedPhotos.slice(0, addedCount);
    if (createMode) {
      state.memoryCreateDraft = {
        ...(state.memoryCreateDraft || {}),
        photoCount: nextCount,
        photos: [
          ...(Array.isArray(state.memoryCreateDraft?.photos) ? state.memoryCreateDraft.photos : []),
          ...photosToAdd
        ].slice(0, 30),
        representativePhoto: state.memoryCreateDraft?.representativePhoto || photosToAdd[0] || null,
        representativePhotoIndex: Number(state.memoryCreateDraft?.representativePhotoIndex) || 0
      };
    } else if (memory) {
      memory.photoCount = nextCount;
      memory.photos = [
        ...(Array.isArray(memory.photos) ? memory.photos : []),
        ...photosToAdd
      ].slice(0, 30);
      memory.representativePhoto = memory.representativePhoto || photosToAdd[0] || null;
      memory.representativePhotoIndex = Number(memory.representativePhotoIndex) || 0;
      duariSavePersistentContent();
    }
    duariRefreshPhotoManageCard(nextCount, createMode ? { createMode: true } : { memoryIndex });
    overlay.remove();
    showToast(`사진 ${addedCount}장을 추가했어요.`);
  };
  qsa("[data-photo-add-close]", overlay).forEach((button) => {
    button.addEventListener("click", () => overlay.remove());
  });
  qs("[data-photo-capture]", overlay)?.addEventListener("click", () => {
    cameraInput?.click();
  });
  qs("[data-photo-album-open]", overlay)?.addEventListener("click", () => albumInput?.click());
  albumInput?.addEventListener("change", () => addSelectedPhotos(albumInput));
  cameraInput?.addEventListener("change", () => addSelectedPhotos(cameraInput));
}

// Final entry flow: onboarding -> login/signup -> nickname/PIN -> start method -> home.
function openLoginModal(provider = "이메일") {
  const isEmail = provider === "이메일";
  openModal(`
    <div class="modal-sheet notification-page entry-flow-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>${isEmail ? "이메일 로그인" : `${provider} 로그인`}</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${isEmail ? `
          <div class="form-field"><label>이메일</label><input data-login-email placeholder="duari@example.com" /></div>
          <div class="form-field"><label>비밀번호</label><input data-login-password type="password" placeholder="비밀번호" /></div>
          <button class="primary-btn full" type="button" data-entry-login-complete>로그인</button>
        ` : `
          <section class="card">
            <h3>소셜 계정으로 계속하기</h3>
            <p>로그인 후 6자리 PIN만 설정하면 바로 시작할 수 있어요.</p>
          </section>
          <button class="primary-btn full" type="button" data-entry-login-complete>계속하기</button>
        `}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-entry-login-complete]")?.addEventListener("click", async () => {
    if (isEmail) {
      const email = normalizeSignupEmail(qs("[data-login-email]")?.value || "");
      const password = qs("[data-login-password]")?.value || "";
      if (!email || !password) {
        showToast("이메일과 비밀번호를 입력해 주세요.");
        return;
      }
      if (await loginCredentialsMatch(email, password)) {
        state.currentLoginEmail = email;
        completeEmailLogin();
      } else if (signupEmailExists(email)) {
        showToast("이메일 또는 비밀번호가 일치하지 않아요.");
      } else {
        returnToEntryScreen("회원가입 후 로그인해 주세요.");
      }
      return;
    }
    const account = registerSocialLoginAccount(provider);
    state.currentLoginEmail = account.email;
    completeEmailLogin();
  });
}

const signupTerms = [
  {
    key: "terms",
    name: "이용약관 동의",
    type: "필수",
    title: "이용약관",
    content: [
      ["서비스 이용", "듀아리는 커플의 사진, 기록, 일기, 질문 답변을 안전하게 정리하는 관계 기록 서비스입니다."],
      ["회원가입과 동의", "회원가입을 위해 이메일, 비밀번호, 필수 약관 동의가 필요합니다. 선택 약관은 동의하지 않아도 서비스를 이용할 수 있습니다."],
      ["기록과 공유", "나만 보기 기록은 본인에게만 보이며, 우리 둘이 보기 기록과 공유 일기는 연결된 상대에게 표시될 수 있습니다."],
    ],
  },
  {
    key: "privacy",
    name: "개인정보처리방침 동의",
    type: "필수",
    title: "개인정보처리방침",
    content: [
      ["수집하는 정보", "계정 이메일, 닉네임, 프로필 정보, 관계 기록, 일기, 질문 답변, 알림 설정처럼 서비스 이용에 필요한 정보를 다룹니다."],
      ["개인 기록 보호", "개인 일기, 개인 초안, 나만 보기 기록은 상대에게 존재 자체가 노출되지 않도록 분리해서 관리합니다."],
      ["탈퇴와 보존", "탈퇴 시 개인 데이터는 삭제되며, 공유 기록이나 공유 일기처럼 상대 공간에 남는 정보는 탈퇴한 사용자로 표시될 수 있습니다."],
    ],
  },
  {
    key: "marketing",
    name: "마케팅 정보 수신 동의",
    type: "선택",
    title: "마케팅 정보 수신 동의",
    content: [
      ["선택 동의", "이 항목은 선택 사항이며 동의하지 않아도 듀아리의 기본 기능을 사용할 수 있습니다."],
      ["수신 내용", "새 기능, 이벤트, 관계 기록 팁처럼 앱 이용에 도움이 되는 안내를 받을 수 있습니다."],
      ["철회", "마이 탭의 알림 또는 계정 설정에서 언제든 수신 동의를 변경할 수 있습니다."],
    ],
  },
];

function signupAttr(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;");
}

function normalizeSignupEmail(email = "") {
  return String(email).trim().toLowerCase();
}

function signupEmailExists(email = "") {
  const normalized = normalizeSignupEmail(email);
  const accounts = Array.isArray(state.registeredAccounts) ? state.registeredAccounts : [];
  return accounts.some((account) => account.email === normalized);
}

function getSignupAccount(email = "") {
  const normalized = normalizeSignupEmail(email);
  const accounts = Array.isArray(state.registeredAccounts) ? state.registeredAccounts : [];
  return accounts.find((account) => account.email === normalized) || null;
}

function socialAccountKey(provider = "") {
  return `social:${String(provider).trim().toLowerCase()}`;
}

function registerSocialLoginAccount(provider = "") {
  const key = socialAccountKey(provider);
  state.registeredAccounts = Array.isArray(state.registeredAccounts) ? state.registeredAccounts : [];
  let account = state.registeredAccounts.find((item) => item.email === key);
  if (!account) {
    account = {
      email: key,
      provider,
      type: "social",
      setupComplete: false,
    };
    state.registeredAccounts.push(account);
    saveRegisteredAccounts();
  }
  return account;
}

async function makeSignupPasswordHash(email = "", password = "") {
  const source = `${normalizeSignupEmail(email)}:${password}`;
  if (window.crypto?.subtle && window.TextEncoder) {
    const bytes = new TextEncoder().encode(source);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  return `prototype:${btoa(unescape(encodeURIComponent(source)))}`;
}

async function loginCredentialsMatch(email = "", password = "") {
  const normalized = normalizeSignupEmail(email);
  const accounts = Array.isArray(state.registeredAccounts) ? state.registeredAccounts : [];
  const passwordHash = await makeSignupPasswordHash(normalized, password);
  return accounts.some((account) => account.email === normalized && (account.passwordHash === passwordHash || account.password === password));
}

function saveRegisteredAccounts() {
  try {
    localStorage.setItem("duariRegisteredEmails", JSON.stringify(state.registeredEmails || []));
    localStorage.setItem("duariRegisteredAccounts", JSON.stringify(state.registeredAccounts || []));
  } catch {
    // Prototype fallback: keep accounts in memory when browser storage is unavailable.
  }
}

function markCurrentAccountSetupComplete() {
  const account = getSignupAccount(state.currentLoginEmail);
  if (!account) return;
  if (!duariHasStoredContentForCurrentUser()) {
    state.memories = [];
    state.diaries = [];
    state.questionHistory = [];
  } else {
    duariStripBundledSamplesFromAccountContent();
    if (!Array.isArray(state.questionHistory)) state.questionHistory = [];
  }
  account.setupComplete = true;
  account.currentRelation = { ...currentRelationInfo() };
  account.connected = !!state.connected;
  duariRememberCurrentLogin();
  duariInstallContentPersistenceHooks();
  duariSavePersistentContent();
  try {
    localStorage.setItem("duariLastCurrentRelation", JSON.stringify(account.currentRelation));
  } catch {
    // Prototype fallback: keep the relation in memory when browser storage is unavailable.
  }
  saveRegisteredAccounts();
}

async function registerSignupAccount(email = "", password = "") {
  const normalized = normalizeSignupEmail(email);
  if (!normalized) return;
  const passwordHash = await makeSignupPasswordHash(normalized, password);
  state.registeredEmails = Array.isArray(state.registeredEmails) ? state.registeredEmails : [];
  state.registeredAccounts = Array.isArray(state.registeredAccounts) ? state.registeredAccounts : [];
  if (!state.registeredEmails.includes(normalized)) {
    state.registeredEmails.push(normalized);
  }
  const existingAccount = state.registeredAccounts.find((account) => account.email === normalized);
  if (existingAccount) {
    existingAccount.passwordHash = passwordHash;
    existingAccount.setupComplete = false;
    delete existingAccount.password;
  } else {
    state.registeredAccounts.push({ email: normalized, passwordHash, setupComplete: false });
  }
  saveRegisteredAccounts();
}

function saveSignupDraft() {
  const terms = {};
  qsa("[data-terms-item]").forEach((item) => {
    terms[item.dataset.termKey] = item.classList.contains("is-checked");
  });
  state.signupDraft = {
    email: qs("[data-signup-email]")?.value || "",
    password: qs("[data-signup-password]")?.value || "",
    confirm: qs("[data-signup-password-confirm]")?.value || "",
    terms,
  };
}

function openSignupTermsPage(termKey) {
  saveSignupDraft();
  const term = signupTerms.find((item) => item.key === termKey) || signupTerms[0];
  openModal(`
    <div class="modal-sheet notification-page policy-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-signup-terms-back aria-label="뒤로가기">←</button>
        <h3>${term.title}</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="policy-content">
        ${term.content.map(([title, body]) => `
          <h4>${title}</h4>
          <p>${body}</p>
        `).join("")}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-signup-terms-back]")?.addEventListener("click", openSignupModal);
}

function openSignupModal() {
  const draft = state.signupDraft || { email: "", password: "", confirm: "", terms: {} };
  openModal(`
    <div class="modal-sheet notification-page entry-flow-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-entry-login-back aria-label="뒤로가기">←</button>
        <h3>회원가입</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="form-field">
          <label>이메일</label>
          <input data-signup-email placeholder="duari@example.com" autocomplete="email" value="${signupAttr(draft.email)}" />
        </div>
        <div class="form-field">
          <label>비밀번호</label>
          <input class="signup-password-input" data-signup-password type="password" autocomplete="new-password" value="${signupAttr(draft.password)}" />
          <p class="signup-password-rule" data-signup-password-rule>영문과 숫자를 포함해 8자 이상 입력해 주세요.</p>
        </div>
        <div class="form-field">
          <label>비밀번호 확인</label>
          <input class="signup-password-confirm" data-signup-password-confirm type="password" autocomplete="new-password" value="${signupAttr(draft.confirm)}" />
          <p class="signup-match-message" data-signup-password-message>비밀번호를 한 번 더 입력해 주세요.</p>
        </div>
        <section class="card signup-terms-card">
          <h3>약관 동의</h3>
          <button class="terms-row terms-all-row" type="button" data-terms-all>
            <span class="terms-check" aria-hidden="true"></span>
            <strong>전체 동의</strong>
          </button>
          ${signupTerms.map(({ key, name, type }) => `
            <div class="terms-row ${draft.terms?.[key] ? "is-checked" : ""}" data-terms-item data-term-key="${key}" data-required="${type === "필수"}">
              <button class="terms-check-button" type="button" data-terms-check aria-label="${name} 체크">
                <span class="terms-check" aria-hidden="true"></span>
              </button>
              <button class="terms-copy" type="button" data-terms-toggle>
                <span class="terms-kind ${type === "필수" ? "required" : "optional"}">(${type})</span>
                <strong>${name}</strong>
              </button>
              <button class="terms-chevron-btn" type="button" data-terms-open="${key}" aria-label="${name} 보기">›</button>
            </div>
          `).join("")}
        </section>
        <button class="primary-btn full" type="button" data-entry-signup-complete>가입 완료</button>
        <p class="entry-switch-text">이미 계정이 있나요? <button type="button" data-entry-signup-login>이메일 로그인</button></p>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-entry-login-back]")?.addEventListener("click", () => returnToEntryScreen());
  qs("[data-entry-signup-login]")?.addEventListener("click", () => openLoginModal("이메일"));
  const emailInput = qs("[data-signup-email]");
  const passwordInput = qs("[data-signup-password]");
  const confirmInput = qs("[data-signup-password-confirm]");
  const passwordRule = qs("[data-signup-password-rule]");
  const passwordMessage = qs("[data-signup-password-message]");
  const passwordIsValid = (password = "") => password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
  const updatePasswordRule = () => {
    const password = passwordInput?.value || "";
    if (!password) {
      passwordRule.textContent = "영문과 숫자를 포함해 8자 이상 입력해 주세요.";
      passwordRule.className = "signup-password-rule";
      passwordInput?.classList.remove("is-match", "is-mismatch");
      return;
    }
    const valid = passwordIsValid(password);
    passwordRule.textContent = valid ? "사용할 수 있는 비밀번호예요." : "영문과 숫자를 포함해 8자 이상이어야 해요.";
    passwordRule.className = `signup-password-rule ${valid ? "is-match" : "is-mismatch"}`;
    passwordInput?.classList.toggle("is-match", valid);
    passwordInput?.classList.toggle("is-mismatch", !valid);
  };
  const updatePasswordMessage = () => {
    const password = passwordInput?.value || "";
    const confirm = confirmInput?.value || "";
    if (!confirm) {
      passwordMessage.textContent = "비밀번호를 한 번 더 입력해 주세요.";
      passwordMessage.className = "signup-match-message";
      confirmInput?.classList.remove("is-match", "is-mismatch");
      return;
    }
    const matched = password === confirm;
    passwordMessage.textContent = matched ? "비밀번호가 일치해요." : "비밀번호가 일치하지 않아요.";
    passwordMessage.className = `signup-match-message ${matched ? "is-match" : "is-mismatch"}`;
    confirmInput?.classList.toggle("is-match", matched);
    confirmInput?.classList.toggle("is-mismatch", !matched);
  };
  passwordInput?.addEventListener("input", () => {
    updatePasswordRule();
    updatePasswordMessage();
  });
  confirmInput?.addEventListener("input", updatePasswordMessage);
  updatePasswordRule();
  updatePasswordMessage();
  const updateAllTerms = () => {
    const items = qsa("[data-terms-item]");
    const allChecked = items.length > 0 && items.every((item) => item.classList.contains("is-checked"));
    qs("[data-terms-all]")?.classList.toggle("is-checked", allChecked);
  };
  qsa("[data-terms-item]").forEach((row) => {
    qsa("[data-terms-check], [data-terms-toggle]", row).forEach((button) => button.addEventListener("click", () => {
      row.classList.toggle("is-checked");
      updateAllTerms();
    }));
  });
  qsa("[data-terms-open]").forEach((button) => button.addEventListener("click", () => openSignupTermsPage(button.dataset.termsOpen)));
  qs("[data-terms-all]")?.addEventListener("click", (event) => {
    const nextChecked = !event.currentTarget.classList.contains("is-checked");
    event.currentTarget.classList.toggle("is-checked", nextChecked);
    qsa("[data-terms-item]").forEach((item) => item.classList.toggle("is-checked", nextChecked));
  });
  updateAllTerms();
  qs("[data-entry-signup-complete]")?.addEventListener("click", async () => {
    const email = normalizeSignupEmail(emailInput?.value || "");
    const password = passwordInput?.value || "";
    const confirm = confirmInput?.value || "";
    const requiredTermsAccepted = qsa("[data-terms-item][data-required='true']").every((item) => item.classList.contains("is-checked"));
    if (!email || !password || !confirm) {
      showToast("이메일, 비밀번호, 비밀번호 확인은 필수 항목이에요.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("이메일 형식을 확인해 주세요.");
      return;
    }
    if (signupEmailExists(email)) {
      showToast("이미 가입된 이메일이에요. 이메일 로그인으로 진행해 주세요.");
      return;
    }
    if (!passwordIsValid(password)) {
      showToast("비밀번호는 영문과 숫자를 포함해 8자 이상이어야 해요.");
      return;
    }
    if (password !== confirm) {
      showToast("비밀번호 확인이 일치하지 않아요.");
      return;
    }
    if (!requiredTermsAccepted) {
      showToast("필수 약관에 동의해 주세요.");
      return;
    }
    await registerSignupAccount(email, password);
    state.emailSignupCompleted = true;
    state.signupDraft = null;
    openLoginModal("이메일");
    showToast("회원가입이 완료됐어요. 이메일로 로그인해 주세요.");
  });
}

function startSetup() {
  openFirstSetupPage();
}

function returnToEntryScreen(message = "") {
  closeModal();
  state.slide = 0;
  qs("#app")?.classList.add("is-hidden");
  qs("#onboarding")?.classList.remove("is-hidden");
  qs("#onboarding")?.classList.add("is-visible");
  renderOnboarding();
  if (message) showToast(message);
}

function completeEmailLogin() {
  const account = getSignupAccount(state.currentLoginEmail);
  if (account && !account.setupComplete) {
    duariRememberCurrentLogin();
    openFirstSetupPage();
    showToast("처음 로그인이라 첫 설정을 진행해 주세요.");
    return;
  }
  applyCurrentAccountRelation();
  duariLoadPersistentContent();
  if (account && account.setupComplete && account.connected !== false && !account.currentRelation) {
    account.setupComplete = false;
    saveRegisteredAccounts();
    openFirstSetupPage();
    showToast("관계 정보를 다시 설정해 주세요.");
    return;
  }
  closeModal();
  duariRememberCurrentLogin();
  if (typeof state.connected !== "boolean") state.connected = true;
  qs("#onboarding")?.classList.add("is-hidden");
  qs("#app")?.classList.remove("is-hidden");
  setTab("home");
  showToast("로그인했어요.");
}

function openFirstSetupPage() {
  openModal(`
    <div class="modal-sheet notification-page entry-flow-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-close aria-label="뒤로가기">←</button>
        <h3>첫 설정</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <h3>앱 보안 PIN</h3>
          <p>이전 커플 보관함, 관계 전환 확인, 회원 탈퇴 같은 중요한 동작에 사용할 6자리 PIN을 설정해요.</p>
        </section>
        <div class="form-field">
          <label>앱 보안 PIN 6자리</label>
          <input data-entry-pin maxlength="6" value="123456" inputmode="numeric" />
        </div>
        <button class="primary-btn full" type="button" data-entry-setup-next>시작 방식 선택</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-entry-setup-next]")?.addEventListener("click", () => {
    const pin = qs("[data-entry-pin]")?.value.trim();
    if (!/^\d{6}$/.test(pin || "")) {
      showToast("PIN은 숫자 6자리로 입력해 주세요.");
      return;
    }
    openStartMethodPage();
  });
}

function openStartMethodPage() {
  openModal(`
    <div class="modal-sheet notification-page entry-flow-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-entry-setup-back aria-label="뒤로가기">←</button>
        <h3>시작 방식</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <h3>어떻게 시작할까요?</h3>
          <p>상대와 연결해 함께 기록하거나, 혼자 먼저 기록을 시작할 수 있어요.</p>
        </section>
        <button class="primary-btn full" type="button" data-entry-connect>상대와 연결하기</button>
        <button class="ghost-btn full" type="button" data-entry-alone>혼자 먼저 시작하기</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-entry-setup-back]")?.addEventListener("click", openFirstSetupPage);
  qs("[data-entry-connect]")?.addEventListener("click", () => {
    openRelationAddPage(1, { fromOnboarding: true });
  });
  qs("[data-entry-alone]")?.addEventListener("click", openStartAlonePage);
}

function openStartAlonePage() {
  openModal(`
    <div class="modal-sheet notification-page start-alone-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-start-method-back aria-label="뒤로가기">←</button>
        <h3>혼자 먼저 시작하기</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="hero-card">
          <h3>연결 전에도 듀아리를 사용할 수 있어요</h3>
          <p>혼자 먼저 시작하면 나만보기 기록과 개인 일기만 사용할 수 있어요.</p>
        </section>
        <button class="primary-btn full" type="button" data-entry-confirm-alone>혼자 시작하기</button>
        <button class="ghost-btn full" type="button" data-entry-connect>상대와 연결하기</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-start-method-back]")?.addEventListener("click", openStartMethodPage);
  qs("[data-entry-confirm-alone]")?.addEventListener("click", () => {
    state.connected = false;
    state.aloneCtaHidden = false;
    markCurrentAccountSetupComplete();
    closeModal();
    qs("#onboarding").classList.add("is-hidden");
    qs("#app").classList.remove("is-hidden");
    setTab("home");
    showToast("혼자 먼저 시작했어요. 상대 초대는 언제든 할 수 있어요.");
  });
  qs("[data-entry-connect]")?.addEventListener("click", () => openRelationAddPage(1, { fromOnboarding: true }));
}

(() => {
  const onboarding = qs("#onboarding");
  const signupButton = qs("#signupApp");
  const loginButtons = qsa(".login-grid .ghost-btn");
  signupButton?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openSignupModal();
  }, true);
  loginButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      openLoginModal(button.textContent.trim() === "Apple" ? "애플" : button.textContent.trim());
    }, true);
  });
  onboarding?.classList.add("is-visible");
})();

openAnotherQuestionModal = function openAnotherQuestionPage() {
  const previousTab = qs(".screen.active")?.id || state.tab || "home";
  const questions = [
    "요즘 가장 자주 떠오르는 감정은 뭐야?",
    "우리의 작은 습관 중 좋아하는 건?",
    "최근에 고마웠던 순간은?",
    "앞으로 함께 기대하는 일은?",
    "내가 요즘 더 듣고 싶은 말은 뭐야?",
    "다음 데이트에서 꼭 하고 싶은 건?"
  ];

  openModal(`
    <div class="modal-sheet notification-page another-question-page">
      <header class="notification-header">
        <button class="notification-nav-btn" type="button" data-another-question-back aria-label="뒤로가기">←</button>
        <h3>다른 질문 보기</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        ${questions.map((question) => `
          <article class="question-history-card">
            <h3>${duariEscapeHtml(question)}</h3>
            <button class="ghost-btn full" type="button" data-question-option="${duariEscapeHtml(question)}">이 질문에 답하기</button>
          </article>
        `).join("")}
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-another-question-back]")?.addEventListener("click", () => {
    closeModal();
    setTab(previousTab === "questions" ? "diary" : previousTab);
  });
  qsa("[data-question-option]").forEach((button) => {
    button.addEventListener("click", () => {
      duariQuestionAnswerDraft.question = button.dataset.questionOption || "";
      openQuestionModal();
    });
  });
};

(function installAnotherQuestionPageFinalFlow() {
  const originalOpenQuestionModal = openQuestionModal;
  openQuestionModal = function openQuestionModalWithSelectedQuestion(...args) {
    const selectedQuestion = state.selectedQuestionForAnswer;
    const result = originalOpenQuestionModal.apply(this, args);
    if (selectedQuestion) {
      duariQuestionAnswerDraft.question = selectedQuestion;
      const title = qs(".question-answer-page .card h3") || qs(".question-answer-page h3");
      const questionTitle = qs(".question-answer-page .section-stack h3");
      if (questionTitle) questionTitle.textContent = selectedQuestion;
      state.selectedQuestionForAnswer = "";
    }
    return result;
  };

  openAnotherQuestionModal = function openAnotherQuestionPageFinal() {
    const previousTab = qs(".screen.active")?.id || state.tab || "home";
    const questions = [
      "요즘 가장 자주 떠오르는 감정은 뭐야?",
      "우리의 작은 습관 중 좋아하는 건?",
      "최근에 고마웠던 순간은?",
      "앞으로 함께 기대하는 일은?",
      "내가 요즘 더 듣고 싶은 말은 뭐야?",
      "다음 데이트에서 꼭 하고 싶은 건?"
    ];

    openModal(`
      <div class="modal-sheet notification-page another-question-page">
        <header class="notification-header">
          <button class="notification-nav-btn" type="button" data-another-question-back aria-label="뒤로가기">←</button>
          <h3>다른 질문 보기</h3>
          <span class="notification-header-spacer" aria-hidden="true"></span>
        </header>
        <div class="section-stack">
          ${questions.map((question) => `
            <article class="question-history-card">
              <h3>${duariEscapeHtml(question)}</h3>
              <button class="ghost-btn full" type="button" data-question-option="${duariEscapeHtml(question)}">이 질문에 답하기</button>
            </article>
          `).join("")}
        </div>
      </div>
    `);
    qs("#modal").classList.add("page-modal");
    qs("[data-another-question-back]")?.addEventListener("click", () => {
      closeModal();
      setTab(previousTab === "questions" ? "diary" : previousTab);
    });
    qsa("[data-question-option]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedQuestionForAnswer = button.dataset.questionOption || "";
        duariQuestionAnswerDraft.question = state.selectedQuestionForAnswer;
        openQuestionModal();
      });
    });
  };
})();

(function installCardClassRemoval() {
  const cardStyleAllowedPages = [
    ".memory-detail-page",
    ".memory-edit-page",
    ".memory-create-page",
    ".diary-detail-page",
    ".diary-write-page"
  ].join(", ");
  const shouldKeepCardClass = (element) => Boolean(element?.closest?.(cardStyleAllowedPages));
  const removeCardClasses = (root = document) => {
    if (!root) return;
    if (root.classList?.contains("card") && !shouldKeepCardClass(root)) root.classList.remove("card");
    root.querySelectorAll?.(".card").forEach((element) => {
      if (!shouldKeepCardClass(element)) element.classList.remove("card");
    });
  };

  const wrapRender = (name) => {
    const original = window[name];
    if (typeof original !== "function" || original.__duariCardRemovalWrapped) return;
    window[name] = function cardRemovalWrappedRender(...args) {
      const result = original.apply(this, args);
      removeCardClasses(document);
      return result;
    };
    window[name].__duariCardRemovalWrapped = true;
  };

  ["renderHome", "renderAlbum", "renderDiary", "renderQuestions", "renderMy", "renderApp"].forEach(wrapRender);

  if (typeof openModal === "function" && !openModal.__duariCardRemovalWrapped) {
    const originalOpenModal = openModal;
    openModal = function cardRemovalWrappedOpenModal(...args) {
      const result = originalOpenModal.apply(this, args);
      removeCardClasses(qs("#modal") || document);
      return result;
    };
    openModal.__duariCardRemovalWrapped = true;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        removeCardClasses(mutation.target);
        return;
      }
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) removeCardClasses(node);
      });
    });
  });

  [document.body].filter(Boolean).forEach((root) => {
    observer.observe(root, { attributes: true, attributeFilter: ["class"], childList: true, subtree: true });
  });

  removeCardClasses(document);
  window.duariRemoveCardClasses = removeCardClasses;
})();

renderHome = function renderHome() {
  const home = qs("#home");
  if (!home) return;

  const questionCard = `
    <section class="question-card">
      <p class="eyebrow">오늘의 질문</p>
      <h3>${duariEscapeHtml(duariCurrentQuestionText?.() || "요즘 나에게 가장 큰 힘이 되는 말은 뭐야?")}</h3>
      <div class="home-question-actions">
        <button class="primary-btn" data-action="answer-question">답변 추가</button>
        <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
      </div>
    </section>
  `;

  if (!state.connected) {
    home.innerHTML = `
      <div class="section-stack">
        <div class="between">
          <div>
            <p class="eyebrow">내 공간</p>
            <h3>${duariEscapeHtml(state.nickname || "하린")}</h3>
          </div>
          <button class="chip-btn" data-action="connect">상대 초대</button>
        </div>
        ${state.aloneCtaHidden ? "" : `
          <section class="hero-card">
            <h3>함께 쓸 공간을 만들어볼까요?</h3>
            <p>상대와 연결하면 기록과 일기를 함께 남기고, 전할 말을 보낼 수 있어요.</p>
            <div class="row" style="margin-top:14px">
              <button class="primary-btn" data-action="connect">상대 초대하기</button>
              <button class="ghost-btn" data-action="continue-alone">혼자 계속 쓰기</button>
            </div>
          </section>
        `}
        ${questionCard}
        <section class="card home-records-card">
          <h3>최근 기록</h3>
          <p>아직 최근 기록이 없어요.</p>
          <button class="primary-btn full" data-action="new-memory">기록 추가</button>
        </section>
      </div>
    `;
    bindActions(home);
    return;
  }

  const recentMemories = (state.memories || []).slice(0, 2);
  const homeRecentMemoryCards = recentMemories.length
    ? memoryCards(recentMemories, true)
    : `<p>아직 최근 기록이 없어요.</p>`;
  const currentRelation = typeof currentRelationInfo === "function" ? currentRelationInfo() : { name: "봄이 & 하린", date: "2025.03.05" };
  const relationshipDays = typeof duariRelationDays === "function" ? duariRelationDays(currentRelation.date) : 421;

  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero">
        <div class="between">
          <div>
            <p class="relationship-name">${duariEscapeHtml(currentRelation.name)}</p>
            <h3 class="together-days"><span>함께한 지 </span><strong class="together-days-number">${relationshipDays}</strong><span>일</span></h3>
          </div>
          <span class="anniversary-pill">D-7 여행 1주년</span>
        </div>
      </section>
      ${questionCard}
      <section class="card home-records-card">
        <div class="between">
          <h3>최근 기록</h3>
          <button class="chip-btn" data-tab-go="album">더보기</button>
        </div>
        <div class="list">${homeRecentMemoryCards}</div>
        <button class="primary-btn full" data-action="new-memory">기록 추가</button>
      </section>
    </div>
  `;
  bindActions(home);
};

window.setTimeout(() => {
  if (!qs("#app") || qs("#app").classList.contains("is-hidden")) return;
  if ((qs(".screen.active")?.id || state.tab) === "home") renderHome();
}, 0);

// Final diary date display across every diary card/detail surface.
function duariTodayDiaryDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function duariDiaryDateLabel(diary = {}) {
  if (diary.date) return diary.date;
  if (diary.createdAt) return diary.createdAt;
  if (diary.linked && typeof state !== "undefined") {
    const linkedMemory = state.memories?.find((memory) => memory.title === diary.linked);
    if (linkedMemory?.date) return linkedMemory.date;
  }
  return duariTodayDiaryDate();
}

function duariDiaryDateMeta(diary = {}) {
  return `<p class="meta diary-date-meta">${duariEscapeHtml(duariDiaryDateLabel(diary))}</p>`;
}

if (Array.isArray(state.diaries)) {
  state.diaries.forEach((diary) => {
    if (!diary.date) diary.date = duariDiaryDateLabel(diary);
  });
}

const duariNormalizeDiaryForDetailWithDateBase = normalizeDiaryForDetail;
normalizeDiaryForDetail = function normalizeDiaryForDetail(diary, fallbackIndex = 0) {
  const detail = duariNormalizeDiaryForDetailWithDateBase(diary, fallbackIndex);
  return {
    ...detail,
    date: duariDiaryDateLabel(diary || detail)
  };
};

const duariSaveDiaryDraftWithDateBase = saveDiaryDraftAndReturn;
if (typeof duariSaveDiaryDraftWithDateBase === "function") {
  saveDiaryDraftAndReturn = function saveDiaryDraftAndReturn(draft, toastMessage) {
    return duariSaveDiaryDraftWithDateBase({ ...draft, date: draft.date || duariTodayDiaryDate() }, toastMessage);
  };
}

const duariLinkedDiaryCardsWithDateBase = linkedDiaryCardsLatest;
function duariLinkedDiaryCardHtml(diary, index, options = {}) {
  const showMenu = options.showMenu !== false;
  const diaryType = String(diary?.type || "");
  const canEdit = diary?.editable !== false && !diaryType.includes("상대");
  const dataAttr = options.dataAttr || `data-linked-diary-index="${index}"`;
  const detailAction = options.detailAction || `data-linked-diary-menu-detail="${index}"`;
  const editAction = options.editAction || `data-linked-diary-menu-edit="${index}"`;
  const unlinkAction = options.unlinkAction || `data-linked-diary-menu-unlink="${index}"`;
  return `
    <article class="linked-diary-card" role="button" tabindex="0" ${dataAttr}>
      <div class="linked-diary-title-row">
        <strong>${duariEscapeHtml(diary?.title || "제목 없는 일기")}</strong>
        <span class="linked-diary-right-tools">
          <span class="linked-diary-type">${duariEscapeHtml(diary?.type || diaryScopeLabel?.(diary?.scope) || "나만 보기")}</span>
          ${showMenu ? `
            <span class="linked-diary-menu-wrap">
              <button class="linked-diary-kebab" type="button" data-linked-diary-menu onclick="event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();window.duariToggleLinkedDiaryDropdownFromButton?.(this);" aria-label="더보기" title="더보기">
                <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
              </button>
              <span class="linked-diary-dropdown" data-linked-diary-dropdown hidden>
                <button type="button" ${detailAction}>상세 보기</button>
                ${canEdit ? `<button type="button" ${editAction}>수정</button><button type="button" ${unlinkAction}>삭제</button>` : ""}
              </span>
            </span>
          ` : ""}
        </span>
      </div>
      <p>${duariEscapeHtml(diary?.body || "")}</p>
      ${linkedDiaryEmotionRow(diary || {})}
      ${duariDiaryDateMeta(diary || {})}
    </article>
  `;
}

linkedDiaryCardsLatest = function linkedDiaryCardsLatest() {
  return linkedDiariesLatest().map((diary, index) => duariLinkedDiaryCardHtml(diary, index)).join("");
};

selectedLinkedDiaryCardsHtml = function selectedLinkedDiaryCardsHtml(mode = "edit", index = null) {
  if (mode === "create" && memoryLinkedDiarySelection.createDiary) {
    const diary = memoryLinkedDiarySelection.createDiary;
    return {
      count: 1,
      html: `<div class="linked-diary-list">${duariLinkedDiaryCardHtml(diary, 0, {
        dataAttr: "data-memory-create-linked-diary",
        detailAction: "data-memory-create-linked-diary",
        editAction: "data-memory-create-linked-diary-edit",
        unlinkAction: "data-memory-create-linked-diary-unlink"
      })}</div>`
    };
  }
  const selectedIndex = mode === "create" ? memoryLinkedDiarySelection.create : memoryLinkedDiarySelection.edit[index];
  if (typeof selectedIndex === "number") {
    const diary = mode === "create"
      ? (state.diaries[selectedIndex] || state.diaries[0])
      : (linkedDiariesLatest()[selectedIndex] || linkedDiariesLatest()[0]);
    return {
      count: 1,
      html: `<div class="linked-diary-list">${duariLinkedDiaryCardHtml(diary, selectedIndex, {
        dataAttr: mode === "edit" ? `data-linked-diary-index="${selectedIndex}"` : `data-memory-create-linked-diary data-memory-create-diary-index="${selectedIndex}"`,
        detailAction: `data-linked-diary-menu-detail="${selectedIndex}"`,
        editAction: `data-linked-diary-menu-edit="${selectedIndex}"`,
        unlinkAction: `data-linked-diary-menu-unlink="${selectedIndex}"`
      })}</div>`
    };
  }
  if (mode === "edit") {
    const diaries = linkedDiariesLatest();
    return {
      count: diaries.length,
      html: diaries.length ? `<div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>` : `<p class="linked-record-empty">연결된 일기가 없습니다.</p>`
    };
  }
  return { count: 0, html: `<p class="linked-record-empty">연결된 일기가 없습니다.</p>` };
};

function duariLinkedDiaryMenuHtml(index, diary = {}) {
  const diaryType = String(diary?.type || "");
  const canEdit = diary?.editable !== false && !diaryType.includes("상대");
  return `
    <span class="linked-diary-menu-wrap">
      <button class="icon-btn linked-diary-kebab" type="button" data-linked-diary-menu onclick="event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();window.duariToggleLinkedDiaryDropdownFromButton?.(this);" aria-label="더보기" title="더보기">
        <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>
      <span class="linked-diary-dropdown" data-linked-diary-dropdown hidden>
        <button type="button" data-linked-diary-menu-detail="${index}">상세 보기</button>
        ${canEdit ? `<button type="button" data-linked-diary-menu-edit="${index}">수정</button><button type="button" data-linked-diary-menu-unlink="${index}">삭제</button>` : ""}
      </span>
    </span>
  `;
}

duariLinkedDiaryCardHtml = function duariLinkedDiaryCardHtml(diary, index, options = {}) {
  const showMenu = options.showMenu !== false;
  const diaryType = String(diary?.type || "");
  const canEdit = diary?.editable !== false && !diaryType.includes("상대");
  const dataAttr = options.dataAttr || `data-linked-diary-index="${index}"`;
  const detailAction = options.detailAction || `data-linked-diary-menu-detail="${index}"`;
  const editAction = options.editAction || `data-linked-diary-menu-edit="${index}"`;
  const unlinkAction = options.unlinkAction || `data-linked-diary-menu-unlink="${index}"`;
  return `
    <article class="linked-diary-card" role="button" tabindex="0" ${dataAttr}>
      <div class="linked-diary-title-row">
        <strong>${duariEscapeHtml(diary?.title || "제목 없는 일기")}</strong>
        <span class="linked-diary-right-tools">
          <span class="linked-diary-type">${duariEscapeHtml(diary?.type || diaryScopeLabel?.(diary?.scope) || "나만 보기")}</span>
          ${showMenu ? `
            <span class="linked-diary-menu-wrap">
              <button class="linked-diary-kebab" type="button" data-linked-diary-menu aria-label="more" title="more">
                <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
              </button>
              <span class="linked-diary-dropdown" data-linked-diary-dropdown hidden>
                <button type="button" ${detailAction}>상세 보기</button>
                ${canEdit ? `<button type="button" ${editAction}>수정</button><button type="button" ${unlinkAction}>삭제</button>` : ""}
              </span>
            </span>
          ` : ""}
        </span>
      </div>
      <p>${duariEscapeHtml(diary?.body || "")}</p>
      ${linkedDiaryEmotionRow(diary || {})}
      ${duariDiaryDateMeta(diary || {})}
    </article>
  `;
};

duariLinkedDiaryMenuHtml = function duariLinkedDiaryMenuHtml(index, diary = {}) {
  const diaryType = String(diary?.type || "");
  const canEdit = diary?.editable !== false && !diaryType.includes("상대");
  return `
    <span class="linked-diary-menu-wrap">
      <button class="linked-diary-kebab" type="button" data-linked-diary-menu aria-label="more" title="more">
        <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>
      <span class="linked-diary-dropdown" data-linked-diary-dropdown hidden>
        <button type="button" data-linked-diary-menu-detail="${index}">상세 보기</button>
        ${canEdit ? `<button type="button" data-linked-diary-menu-edit="${index}">수정</button><button type="button" data-linked-diary-menu-unlink="${index}">삭제</button>` : ""}
      </span>
    </span>
  `;
};

selectedLinkedDiaryCardsHtml = function selectedLinkedDiaryCardsHtml(mode = "edit", index = null) {
  if (mode === "create" && memoryLinkedDiarySelection.createDiary) {
    const diary = memoryLinkedDiarySelection.createDiary;
    return {
      count: 1,
      html: `<div class="linked-diary-list">${duariLinkedDiaryCardHtml(diary, 0, {
        dataAttr: "data-memory-create-linked-diary",
        detailAction: "data-memory-create-linked-diary",
        editAction: "data-memory-create-linked-diary-edit",
        unlinkAction: "data-memory-create-linked-diary-unlink"
      })}</div>`
    };
  }

  const selectedIndex = mode === "create" ? memoryLinkedDiarySelection.create : memoryLinkedDiarySelection.edit[index];
  if (typeof selectedIndex === "number") {
    const diary = mode === "create"
      ? (state.diaries[selectedIndex] || state.diaries[0])
      : (linkedDiariesLatest()[selectedIndex] || linkedDiariesLatest()[0]);
    return {
      count: 1,
      html: `<div class="linked-diary-list">${duariLinkedDiaryCardHtml(diary, selectedIndex, {
        dataAttr: mode === "edit" ? `data-linked-diary-index="${selectedIndex}" data-no-linked-diary-menu="true"` : `data-memory-create-linked-diary data-memory-create-diary-index="${selectedIndex}"`,
        showMenu: mode !== "edit",
        detailAction: `data-linked-diary-menu-detail="${selectedIndex}"`,
        editAction: `data-linked-diary-menu-edit="${selectedIndex}"`,
        unlinkAction: `data-linked-diary-menu-unlink="${selectedIndex}"`
      })}</div>`
    };
  }

  if (mode === "edit") {
    const diaries = linkedDiariesLatest();
    return {
      count: diaries.length,
      html: diaries.length ? `<div class="linked-diary-list">${diaries.map((diary, diaryIndex) => duariLinkedDiaryCardHtml(diary, diaryIndex, {
        dataAttr: `data-linked-diary-index="${diaryIndex}" data-no-linked-diary-menu="true"`,
        showMenu: false
      })).join("")}</div>` : `<p class="linked-record-empty">연결된 일기가 없습니다.</p>`
    };
  }
  return { count: 0, html: `<p class="linked-record-empty">연결된 일기가 없습니다.</p>` };
};

function duariMemoryEditLinkedDiaryCardHtml(diary, index) {
  return `
    <article class="linked-diary-card" data-linked-diary-index="${index}" data-disable-linked-diary-card-open="true">
      <div class="linked-diary-title-row">
        <strong>${duariEscapeHtml(diary?.title || "제목 없는 일기")}</strong>
        <span class="linked-diary-right-tools">
          <span class="linked-diary-type">${duariEscapeHtml(diary?.type || diaryScopeLabel?.(diary?.scope) || "나만 보기")}</span>
          <span class="linked-diary-menu-wrap">
            <button class="linked-diary-kebab" type="button" data-linked-diary-menu aria-label="more" title="more">
              <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
            </button>
            <span class="linked-diary-dropdown" data-linked-diary-dropdown hidden>
              <button type="button" data-linked-diary-menu-detail="${index}">상세 보기</button>
              <button type="button" data-linked-diary-menu-unlink="${index}">삭제</button>
            </span>
          </span>
        </span>
      </div>
      <p>${duariEscapeHtml(diary?.body || "")}</p>
      ${linkedDiaryEmotionRow(diary || {})}
      ${duariDiaryDateMeta(diary || {})}
    </article>
  `;
}

selectedLinkedDiaryCardsHtml = function selectedLinkedDiaryCardsHtml(mode = "edit", index = null) {
  if (mode === "create" && memoryLinkedDiarySelection.createDiary) {
    const diary = memoryLinkedDiarySelection.createDiary;
    return {
      count: 1,
      html: `<div class="linked-diary-list">${duariLinkedDiaryCardHtml(diary, 0, {
        dataAttr: "data-memory-create-linked-diary",
        detailAction: "data-memory-create-linked-diary",
        editAction: "data-memory-create-linked-diary-edit",
        unlinkAction: "data-memory-create-linked-diary-unlink"
      })}</div>`
    };
  }

  const selectedIndex = mode === "create" ? memoryLinkedDiarySelection.create : memoryLinkedDiarySelection.edit[index];
  if (typeof selectedIndex === "number") {
    const diary = mode === "create"
      ? (state.diaries[selectedIndex] || state.diaries[0])
      : (linkedDiariesLatest()[selectedIndex] || linkedDiariesLatest()[0]);
    return {
      count: 1,
      html: `<div class="linked-diary-list">${mode === "edit" ? duariMemoryEditLinkedDiaryCardHtml(diary, selectedIndex) : duariLinkedDiaryCardHtml(diary, selectedIndex, {
        dataAttr: `data-memory-create-linked-diary data-memory-create-diary-index="${selectedIndex}"`,
        detailAction: `data-linked-diary-menu-detail="${selectedIndex}"`,
        editAction: `data-linked-diary-menu-edit="${selectedIndex}"`,
        unlinkAction: `data-linked-diary-menu-unlink="${selectedIndex}"`
      })}</div>`
    };
  }

  if (mode === "edit") {
    const diaries = linkedDiariesLatest();
    return {
      count: diaries.length,
      html: diaries.length ? `<div class="linked-diary-list">${diaries.map((diary, diaryIndex) => duariMemoryEditLinkedDiaryCardHtml(diary, diaryIndex)).join("")}</div>` : `<p class="linked-record-empty">연결된 일기가 없습니다.</p>`
    };
  }
  return { count: 0, html: `<p class="linked-record-empty">연결된 일기가 없습니다.</p>` };
};

openLinkedDiarySelectPage = function openLinkedDiarySelectPage({ mode = "edit", memoryIndex = null, backAction = null } = {}) {
  const diaries = state.diaries || [];
  const safeMemoryIndex = Number.isFinite(Number(memoryIndex)) ? Number(memoryIndex) : 0;
  const returnToOwner = () => mode === "create" ? openMemoryCreatePage(backAction) : openMemoryEditPageLatest(safeMemoryIndex, backAction);
  const cards = diaries.length ? diaries.map((diary, diaryIndex) => `
    <article class="record-picker-card">
      <div class="between"><h3>${duariEscapeHtml(diary.title || "제목 없는 일기")}</h3><span class="linked-diary-type">${duariEscapeHtml(diary.type || diaryScopeLabel?.(diary.scope) || "나만 보기")}</span></div>
      <p>${duariEscapeHtml(diary.body || "작성된 내용이 없습니다.")}</p>
      ${linkedDiaryEmotionRow(diary)}
      ${typeof duariDiaryDateMeta === "function" ? duariDiaryDateMeta(diary) : ""}
      <div class="record-picker-actions">
        <button class="ghost-btn" data-linked-diary-preview="${diaryIndex}">상세 보기</button>
        <button class="primary-btn" data-linked-diary-pick="${diaryIndex}">선택</button>
      </div>
    </article>
  `).join("") : `<p class="linked-record-empty">작성된 일기가 없습니다.</p>`;

  openModal(`
    <div class="modal-sheet notification-page diary-record-picker-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-linked-diary-select-back aria-label="뒤로가기">←</button>
        <h3>연결한 일기 선택</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="record-picker-list">${cards}</div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-linked-diary-select-back]")?.addEventListener("click", () => runWithoutModalHistory(returnToOwner));
  qsa("[data-linked-diary-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      const diary = diaries[Number(button.dataset.linkedDiaryPreview)];
      if (!diary) return;
      renderDiaryDetailReadOnly(normalizeDiaryForDetail(diary), () => openLinkedDiarySelectPage({ mode, memoryIndex: safeMemoryIndex, backAction }));
    });
  });
  qsa("[data-linked-diary-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      const diaryIndex = Number(button.dataset.linkedDiaryPick);
      const diary = diaries[diaryIndex];
      if (!diary) return;
      if (mode === "create") {
        memoryLinkedDiarySelection.create = diaryIndex;
      } else {
        const memory = state.memories?.[safeMemoryIndex];
        if (memory) {
          state.diaries[diaryIndex] = { ...diary, linked: memory.title, linkedMemoryTitle: memory.title };
          memoryLinkedDiarySelection.edit[safeMemoryIndex] = null;
          duariInstallContentPersistenceHooks();
          duariSavePersistentContent();
        }
      }
      runWithoutModalHistory(returnToOwner);
      showToast("연결할 일기를 선택했어요.");
    });
  });
};

function duariEnsureLinkedDiaryMenus(root = document) {
  qsa(".linked-diary-card", root).forEach((card, fallbackIndex) => {
    if (card.dataset.noLinkedDiaryMenu === "true") return;
    if (qs("[data-linked-diary-menu]", card)) return;
    const index = Number(card.dataset.linkedDiaryIndex ?? card.dataset.memoryCreateDiaryIndex ?? fallbackIndex);
    const diary = linkedDiariesLatest()[index] || state.diaries?.[index] || {};
    const titleRow = qs(".linked-diary-title-row", card) || qs(".between", card);
    if (!titleRow) return;
    titleRow.classList.add("linked-diary-title-row");
    let tools = qs(".linked-diary-right-tools", titleRow);
    if (!tools) {
      tools = document.createElement("span");
      tools.className = "linked-diary-right-tools";
      const typeBadge = qs(".linked-diary-type", titleRow);
      if (typeBadge) {
        typeBadge.replaceWith(tools);
        tools.appendChild(typeBadge);
      } else {
        titleRow.appendChild(tools);
      }
    }
    tools.insertAdjacentHTML("beforeend", duariLinkedDiaryMenuHtml(index, diary));
  });
}

function duariNormalizeLinkedDiaryMenus(root = document) {
  qsa(".linked-diary-menu-wrap", root).forEach((wrap) => {
    wrap.classList.remove("linked-record-menu-wrap");
  });
  qsa("[data-linked-diary-menu]", root).forEach((button) => {
    button.classList.remove("icon-btn", "linked-record-kebab");
    button.classList.add("linked-diary-kebab");
    button.setAttribute("type", "button");
    button.setAttribute("aria-label", "more");
    button.setAttribute("title", "more");
  });
  qsa("[data-linked-diary-dropdown]", root).forEach((dropdown) => {
    dropdown.classList.remove("linked-record-dropdown");
    dropdown.classList.add("linked-diary-dropdown");
  });
}

function duariBindLinkedDiaryDropdowns(root = document) {
  duariNormalizeLinkedDiaryMenus(root);
  qsa("[data-linked-diary-menu]", root).forEach((button) => {
    if (button.dataset.duariDropdownBound === "true") return;
    button.dataset.duariDropdownBound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const menu = button.closest(".linked-diary-menu-wrap")?.querySelector("[data-linked-diary-dropdown]");
      const willOpen = !!menu?.hidden;
      qsa("[data-linked-diary-dropdown]", root).forEach((item) => { item.hidden = true; });
      qsa("[data-linked-diary-menu]", root).forEach((item) => item.classList.remove("active"));
      if (menu && willOpen) {
        menu.hidden = false;
        button.classList.add("active");
      }
    }, true);
  });
}

const duariBindLinkedDiaryCardsWithMenuBase = bindLinkedDiaryCardsLatest;
bindLinkedDiaryCardsLatest = function bindLinkedDiaryCardsLatest(root, backAction = null) {
  if (!root) return;
  duariEnsureLinkedDiaryMenus(root);
  duariBindLinkedDiaryDropdowns(root);
  duariBindLinkedDiaryCardsWithMenuBase(root, backAction);
};

const duariOpenMemoryEditWithLinkedDiaryMenusBase = openMemoryEditPageLatest;
openMemoryEditPageLatest = function openMemoryEditPageLatest(index, backAction = null, originalMemorySnapshot = null) {
  duariOpenMemoryEditWithLinkedDiaryMenusBase(index, backAction, originalMemorySnapshot);
  const sheet = qs(".memory-edit-page");
  if (sheet) {
    duariEnsureLinkedDiaryMenus(sheet);
    duariBindLinkedDiaryDropdowns(sheet);
  }
  window.setTimeout(() => {
    const nextSheet = qs(".memory-edit-page");
    if (nextSheet) {
      duariEnsureLinkedDiaryMenus(nextSheet);
      duariBindLinkedDiaryDropdowns(nextSheet);
    }
  }, 0);
};

if (!window.__duariLinkedDiaryMenuGlobalGuard) {
  window.__duariLinkedDiaryMenuGlobalGuard = true;
  window.duariToggleLinkedDiaryDropdownFromButton = (target) => {
    const tools = target.closest?.(".linked-diary-right-tools, .linked-diary-menu-wrap");
    const menuButton = target.closest?.("[data-linked-diary-menu]") || tools?.querySelector?.("[data-linked-diary-menu]");
    if (!menuButton) return false;
    const page = menuButton.closest(".modal-sheet") || qs(".modal-sheet") || document;
    const menu = menuButton.closest(".linked-diary-menu-wrap")?.querySelector("[data-linked-diary-dropdown]");
    const willOpen = !!menu?.hidden;
    qsa("[data-linked-diary-dropdown]", page).forEach((item) => { item.hidden = true; });
    qsa("[data-linked-diary-menu]", page).forEach((item) => item.classList.remove("active"));
    if (menu && willOpen) {
      menu.hidden = false;
      menuButton.classList.add("active");
    }
    return true;
  };
  window.addEventListener("pointerdown", (event) => {
    if (!event.target.closest?.("[data-linked-diary-menu], [data-linked-diary-dropdown], .linked-diary-menu-wrap, .memory-edit-page .linked-diary-right-tools")) return;
    event.stopPropagation();
    event.stopImmediatePropagation();
  }, true);
  window.addEventListener("click", (event) => {
    if (event.target.closest?.(".memory-edit-page .linked-diary-right-tools") && !event.target.closest?.("[data-linked-diary-dropdown]")) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      window.duariToggleLinkedDiaryDropdownFromButton(event.target);
      return;
    }
    const menuButton = event.target.closest?.("[data-linked-diary-menu]");
    const detailButton = event.target.closest?.("[data-linked-diary-menu-detail]");
    const editButton = event.target.closest?.("[data-linked-diary-menu-edit]");
    const unlinkButton = event.target.closest?.("[data-linked-diary-menu-unlink]");
    const actionButton = menuButton || detailButton || editButton || unlinkButton;
    if (!actionButton) return;

    const page = actionButton.closest(".modal-sheet") || qs(".modal-sheet") || document;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (menuButton) {
      const menu = menuButton.closest(".linked-diary-menu-wrap")?.querySelector("[data-linked-diary-dropdown]");
      const willOpen = !!menu?.hidden;
      qsa("[data-linked-diary-dropdown]", page).forEach((item) => { item.hidden = true; });
      qsa("[data-linked-diary-menu]", page).forEach((item) => item.classList.remove("active"));
      if (menu && willOpen) {
        menu.hidden = false;
        menuButton.classList.add("active");
      }
      return;
    }

    qsa("[data-linked-diary-dropdown]", page).forEach((item) => { item.hidden = true; });
    const memoryIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
    const backToMemoryEdit = () => openMemoryEditPageLatest(memoryIndex, () => openMemoryDetailLatestV3(memoryIndex));
    const backToMemoryDetail = () => openMemoryDetailLatestV3(memoryIndex);

    if (detailButton) {
      const index = Number(detailButton.dataset.linkedDiaryMenuDetail);
      openLinkedDiaryDetailLatest(index, qs(".memory-edit-page") ? backToMemoryEdit : backToMemoryDetail);
      return;
    }

    if (editButton) {
      const index = Number(editButton.dataset.linkedDiaryMenuEdit);
      const diary = linkedDiariesLatest()[index] || state.diaries?.[index];
      if (diary) openLinkedDiaryEditLatest(normalizeDiaryForDetail(diary), backToMemoryEdit);
      return;
    }

    if (unlinkButton) {
      openLinkedDiaryUnlinkConfirm(Number(unlinkButton.dataset.linkedDiaryMenuUnlink), qs(".memory-edit-page") ? backToMemoryEdit : backToMemoryDetail);
    }
  }, true);
}

// Last-resort guard for record edit: the linked-diary kebab must only open its dropdown.
// Older card click handlers exist above, so this capture listener stops them before they
// can route the click to a diary detail modal.
if (!window.__duariMemoryEditLinkedDiaryDropdownOnly) {
  window.__duariMemoryEditLinkedDiaryDropdownOnly = true;
  window.addEventListener("click", (event) => {
    const memoryEditPage = event.target.closest?.(".memory-edit-page");
    if (!memoryEditPage) return;

    const menuButton = event.target.closest?.("[data-linked-diary-menu]");
    if (!menuButton) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const menuWrap = menuButton.closest(".linked-diary-menu-wrap");
    const dropdown = menuWrap?.querySelector("[data-linked-diary-dropdown]");
    const willOpen = !!dropdown?.hidden;
    qsa("[data-linked-diary-dropdown]", memoryEditPage).forEach((item) => { item.hidden = true; });
    qsa("[data-linked-diary-menu]", memoryEditPage).forEach((item) => item.classList.remove("active"));
    if (dropdown && willOpen) {
      dropdown.hidden = false;
      menuButton.classList.add("active");
    }
  }, true);
}

bindLinkedDiaryCardsLatest = function bindLinkedDiaryCardsLatest(root, backAction = null) {
  if (!root) return;
  duariEnsureLinkedDiaryMenus(root);
  duariBindLinkedDiaryDropdowns(root);
  qsa("[data-linked-diary-index]", root).forEach((card) => {
    if (card.dataset.duariLinkedDiaryCardBound === "true") return;
    card.dataset.duariLinkedDiaryCardBound = "true";
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-linked-diary-menu], [data-linked-diary-dropdown], .linked-diary-menu-wrap, .linked-diary-right-tools")) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return;
      }
      openLinkedDiaryDetailLatest(Number(card.dataset.linkedDiaryIndex), backAction);
    });
  });
};

const duariRenderDiaryWithDateBase = renderDiary;
function duariDiaryVisibleCount() {
  state.diaryVisibleCounts = state.diaryVisibleCounts || {};
  const view = "all";
  if (!state.diaryVisibleCounts[view]) state.diaryVisibleCounts[view] = 5;
  return state.diaryVisibleCounts[view];
}

function duariIncreaseDiaryVisibleCount() {
  state.diaryVisibleCounts = state.diaryVisibleCounts || {};
  const view = "all";
  state.diaryVisibleCounts[view] = duariDiaryVisibleCount() + 5;
}

function duariResetDiaryVisibleCount() {
  state.diaryVisibleCounts = state.diaryVisibleCounts || {};
  state.diaryVisibleCounts.all = 5;
}

function duariDiaryFilterForCurrentView() {
  state.diaryFilters = state.diaryFilters || {};
  const view = "all";
  state.diaryFilters[view] = state.diaryFilters[view] || { query: "", month: "", type: "all" };
  return state.diaryFilters[view];
}

function duariFilterDiaryEntries(entries = [], filter = {}) {
  const normalizedQuery = String(filter.query || "").trim().toLowerCase();
  const normalizedMonth = String(filter.month || "").trim().replaceAll("-", ".");
  const type = String(filter.type || "all");
  return entries.filter((entry) => {
    const dateLabel = duariDiaryDateLabel(entry);
    const scopeValue = normalizeDiaryScopeValue(entry.scope || entry.type);
    const searchTarget = [
      entry.title,
      entry.body,
      entry.linked,
      entry.type,
      entry.scope,
      dateLabel,
      ...(entry.feelings || [])
    ].join(" ").toLowerCase();
    const matchesQuery = !normalizedQuery || searchTarget.includes(normalizedQuery);
    const matchesMonth = !normalizedMonth || dateLabel.startsWith(normalizedMonth);
    const matchesType =
      type === "all" ||
      (type === "mineShared" && scopeValue === "공유") ||
      (type === "private" && scopeValue === "개인") ||
      (type === "draft" && scopeValue === "draft");
    return matchesQuery && matchesMonth && matchesType;
  });
}

function duariEmptyDiaryMessage() {
  const type = duariDiaryFilterForCurrentView().type || "all";
  if (type === "mineShared") return "아직 내 공유 일기가 없어요.";
  if (type === "private") return "아직 나만 보기 일기가 없어요.";
  if (type === "draft") return "아직 임시 저장한 일기가 없어요.";
  return "아직 일기가 없어요.";
}

function duariJournalSubTabsHtml(activeView = "diary") {
  return `
    <div class="tabs diary-tabs">
      <button class="chip-btn ${activeView === "question" ? "active" : ""}" type="button" data-journal-view="question">질문</button>
      <button class="chip-btn ${activeView === "diary" ? "active" : ""}" type="button" data-journal-view="diary">일기</button>
    </div>
  `;
}

function duariQuestionPanelHtml() {
  const history = duariQuestionHistorySeed();
  const filtered = duariFilterQuestionHistory(history, "전체", "", "");
  const visibleCount = 10;
  return `
    <section class="question-card">
      <p class="eyebrow">오늘의 질문</p>
      <h3>${duariEscapeHtml(duariCurrentQuestionText())}</h3>
      <div class="home-question-actions question-action-row">
        <button class="primary-btn" data-action="answer-question">답변 추가</button>
        <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
      </div>
    </section>
    <section class="card question-history-section">
      <div class="between">
        <h3>전달한 질문</h3>
        <span class="meta question-history-count" data-question-history-count>총 ${filtered.length}개</span>
      </div>
      <div class="chip-row question-history-filters">
        ${["전체", "읽음", "전달됨"].map((item) => `<button class="chip-btn ${item === "전체" ? "active" : ""}" type="button" data-question-history-filter="${item}">${item}</button>`).join("")}
      </div>
      <div class="question-history-search-grid">
        <div class="form-field">
          <label for="questionHistoryInlineSearch">질문 검색</label>
          <input id="questionHistoryInlineSearch" placeholder="질문이나 답변 검색" />
        </div>
        <div class="form-field">
          <label for="questionHistoryInlineDate">월</label>
          <input id="questionHistoryInlineDate" type="month" />
        </div>
      </div>
      <div class="question-history-list" data-question-history-list>
        ${duariQuestionHistoryListHtml(history, filtered, visibleCount)}
      </div>
      <div data-question-history-load-more-slot>
        ${duariQuestionHistoryLoadMoreHtml(filtered, visibleCount)}
      </div>
    </section>
  `;
}

function duariBindInlineQuestionHistory(root) {
  const history = duariQuestionHistorySeed();
  let activeFilter = "전체";
  let visibleCount = 10;
  const searchInput = qs("#questionHistoryInlineSearch", root);
  const dateInput = qs("#questionHistoryInlineDate", root);
  const bindLoadMore = () => {
    qs("[data-question-history-load-more]", root)?.addEventListener("click", () => {
      visibleCount += 10;
      renderList();
    });
  };
  const renderList = () => {
    const filtered = duariFilterQuestionHistory(
      history,
      activeFilter,
      searchInput?.value || "",
      dateInput?.value || ""
    );
    const list = qs("[data-question-history-list]", root);
    if (list) list.innerHTML = duariQuestionHistoryListHtml(history, filtered, visibleCount);
    const count = qs("[data-question-history-count]", root);
    if (count) count.textContent = `총 ${filtered.length}개`;
    const loadMoreSlot = qs("[data-question-history-load-more-slot]", root);
    if (loadMoreSlot) loadMoreSlot.innerHTML = duariQuestionHistoryLoadMoreHtml(filtered, visibleCount);
    bindLoadMore();
  };
  qsa("[data-question-history-filter]", root).forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.questionHistoryFilter || "전체";
      visibleCount = 10;
      qsa("[data-question-history-filter]", root).forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      renderList();
    });
  });
  const resetAndRenderList = () => {
    visibleCount = 10;
    renderList();
  };
  searchInput?.addEventListener("input", resetAndRenderList);
  dateInput?.addEventListener("input", resetAndRenderList);
  dateInput?.addEventListener("change", resetAndRenderList);
  bindLoadMore();
}

function duariBindQuestionPanel(root) {
  bindActions(root);
  duariBindInlineQuestionHistory(root);
}

function duariBindJournalSubTabs(root) {
  qsa("[data-journal-view]", root).forEach((button) => {
    button.addEventListener("click", () => {
      state.journalView = button.dataset.journalView || "diary";
      if (state.journalView === "diary") duariResetDiaryVisibleCount();
      renderDiary();
    });
  });
}

renderDiary = function renderDiary() {
  const diary = qs("#diary");
  const activeJournalView = state.journalView === "question" ? "question" : "diary";
  if (activeJournalView === "question") {
    diary.innerHTML = `
      <div class="section-stack">
        ${duariJournalSubTabsHtml("question")}
        ${duariQuestionPanelHtml()}
      </div>
    `;
    duariBindJournalSubTabs(diary);
    duariBindQuestionPanel(diary);
    return;
  }

  const entries = state.diaries || [];
  const diaryFilter = duariDiaryFilterForCurrentView();
  const filteredEntries = duariFilterDiaryEntries(entries, diaryFilter);
  const visibleCount = duariDiaryVisibleCount();
  const visibleEntries = filteredEntries.slice(0, visibleCount);
  const hasMoreEntries = filteredEntries.length > visibleEntries.length;
  diary.innerHTML = `
    <div class="section-stack">
      ${duariJournalSubTabsHtml("diary")}
      <div class="diary-filter-grid">
        <div class="form-field">
          <label for="diarySearch">일기 검색</label>
          <input id="diarySearch" value="${duariEscapeHtml(diaryFilter.query || "")}" placeholder="제목이나 본문 검색" />
        </div>
        <div class="form-field">
          <label for="diaryMonthFilter">월</label>
          <input id="diaryMonthFilter" type="month" value="${String(diaryFilter.month || "").slice(0, 7).replaceAll(".", "-")}" />
        </div>
        <div class="form-field">
          <label for="diaryTypeFilter">일기 유형</label>
          <select id="diaryTypeFilter">
            <option value="all" ${diaryFilter.type === "all" ? "selected" : ""}>전체</option>
            <option value="mineShared" ${diaryFilter.type === "mineShared" ? "selected" : ""}>내 공유</option>
            <option value="private" ${diaryFilter.type === "private" ? "selected" : ""}>나만보기</option>
            <option value="draft" ${diaryFilter.type === "draft" ? "selected" : ""}>임시 저장</option>
          </select>
        </div>
      </div>
      <div class="diary-list-toolbar">
        <p class="meta diary-list-count">총 ${filteredEntries.length}개</p>
        <button class="primary-btn" data-action="diary-scope-first">일기 추가</button>
      </div>
      <div class="list">
        ${visibleEntries.length ? visibleEntries.map((entry, index) => `
          <article class="diary-card" data-diary-entry-index="${index}" role="button" tabindex="0">
            <div class="between"><h3>${entry.title}</h3><span class="linked-diary-type">${diaryTypeLabel(entry)}</span></div>
            <p>${entry.body}</p>
            <div class="tag-row" style="margin-top:10px">
              ${(entry.feelings || []).slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}
            </div>
            ${duariDiaryDateMeta(entry)}
          </article>
        `).join("") : `<p class="linked-record-empty">${duariEmptyDiaryMessage()}</p>`}
      </div>
      ${hasMoreEntries ? `<button class="ghost-btn full diary-load-more" type="button" data-diary-load-more>더보기</button>` : ""}
    </div>
  `;
  duariBindJournalSubTabs(diary);
  const searchInput = qs("#diarySearch", diary);
  const monthInput = qs("#diaryMonthFilter", diary);
  const typeInput = qs("#diaryTypeFilter", diary);
  if (state.diarySearchFocus) {
    searchInput?.focus();
    const caretPosition = searchInput?.value?.length || 0;
    searchInput?.setSelectionRange?.(caretPosition, caretPosition);
    state.diarySearchFocus = false;
  }
  const applyDiaryFilters = () => {
    const filter = duariDiaryFilterForCurrentView();
    filter.query = searchInput?.value || "";
    filter.month = monthInput?.value || "";
    filter.type = typeInput?.value || "all";
    duariResetDiaryVisibleCount();
    renderDiary();
  };
  searchInput?.addEventListener("input", () => {
    window.clearTimeout(state.diarySearchDebounce);
    state.diarySearchDebounce = window.setTimeout(() => {
      state.diarySearchFocus = true;
      applyDiaryFilters();
    }, 200);
  });
  searchInput?.addEventListener("change", applyDiaryFilters);
  monthInput?.addEventListener("input", applyDiaryFilters);
  monthInput?.addEventListener("change", applyDiaryFilters);
  typeInput?.addEventListener("change", applyDiaryFilters);
  qsa("[data-diary-entry-index]", diary).forEach((card) => {
    const openEntry = () => {
      const entry = filteredEntries[Number(card.dataset.diaryEntryIndex)] || filteredEntries[0] || entries[0];
      renderDiaryDetailReadOnly(entry, () => {
        closeModal();
        setTab("diary");
      });
    };
    card.addEventListener("click", openEntry);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openEntry();
      }
    });
  });
  qs("[data-diary-load-more]", diary)?.addEventListener("click", () => {
    duariIncreaseDiaryVisibleCount();
    renderDiary();
  });
  bindActions(diary);
};

const duariRenderDiaryDetailWithDateBase = renderDiaryDetailReadOnly;
renderDiaryDetailReadOnly = function renderDiaryDetailReadOnly(diary, backAction = null) {
  duariRenderDiaryDetailWithDateBase(diary, backAction);
  const summary = qs(".diary-detail-page .diary-detail-summary");
  if (!summary || qs(".diary-date-meta", summary)) return;
  qs(".diary-detail-summary .diary-detail-feelings")?.insertAdjacentHTML("afterend", duariDiaryDateMeta(diary));
};

const duariRenderHomeWithDiaryDateBase = renderHome;
renderHome = function renderHome() {
  duariRenderHomeWithDiaryDateBase();
  const cards = qsa("[data-home-shared-diary-index]");
  const diaries = typeof duariHomeSharedDiaries === "function" ? duariHomeSharedDiaries() : [];
  cards.forEach((card) => {
    if (qs(".diary-date-meta", card)) return;
    const diary = diaries[Number(card.dataset.homeSharedDiaryIndex)] || diaries[0] || {};
    qs(".tag-row", card)?.insertAdjacentHTML("afterend", duariDiaryDateMeta(diary));
  });
};

window.setTimeout(() => {
  const active = qs(".screen.active")?.id || state.tab;
  if (active === "diary") renderDiary();
  if (active === "home") renderHome();
}, 0);

// Final question history send/AI hooks. These run after older duplicated question flows.
function openQuestionSendConfirmOverlay() {
  const page = qs(".question-answer-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>상대방에게 전달할까요?</h3>
        <p>작성한 답변이 최종 메시지로 상대방에게 전달됩니다.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" type="button" data-question-send-cancel>취소</button>
          <button class="primary-btn" type="button" data-question-send-confirm>전달하기</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-question-send-cancel]", page)?.addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-question-send-confirm]", page)?.addEventListener("click", () => {
    duariQuestionAnswerDraft.body = qs("#questionAnswerBody")?.value || duariQuestionAnswerDraft.body || "";
    duariAddQuestionHistory({ method: duariQuestionAnswerDraft.method || "원문" });
    duariQuestionAnswerDraft.body = "";
    duariQuestionAnswerDraft.method = "원문";
    qs(".ai-confirm-overlay", page)?.remove();
    closeModal();
    setTab("questions");
    showToast("답변을 상대방에게 전달했어요.");
  });
}

const duariQuestionAiResultFinalBase = openQuestionAiResultPage;
openQuestionAiResultPage = function openQuestionAiResultPage(draft = {}) {
  duariQuestionAiResultFinalBase(draft);
  qs("[data-question-ai-apply]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.method = "AI 다듬음";
    duariQuestionAnswerDraft.original = draft.original || duariQuestionAnswerDraft.body || "";
  }, { capture: true });
};

window.setTimeout(() => {
  if ((qs(".screen.active")?.id || state.tab) === "questions") renderQuestions();
}, 0);

// Final question tab layout: keep the tab focused on today's question.
function renderQuestions() {
  const questions = qs("#questions");
  if (!questions) return;
  questions.innerHTML = `
    <div class="section-stack">
      <section class="question-card">
        <p class="eyebrow">오늘의 질문</p>
        <h3>${duariEscapeHtml(duariCurrentQuestionText())}</h3>
        <div class="home-question-actions question-action-row">
          <button class="primary-btn" data-action="answer-question">답변 추가</button>
          <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
        </div>
      </section>
    </div>
  `;
  bindActions(questions);
}

window.setTimeout(() => {
  if ((qs(".screen.active")?.id || state.tab) === "questions") renderQuestions();
}, 0);

function duariQuestionHistorySeed() {
  if (!Array.isArray(state.questionHistory)) state.questionHistory = [];
  duariWrapPersistentArray(state.questionHistory);
  return state.questionHistory;
}

function duariAddQuestionHistory({ method = "원문" } = {}) {
  const body = (qs("#questionAnswerBody")?.value || duariQuestionAnswerDraft.body || "").trim();
  const question = duariQuestionAnswerDraft.question || duariCurrentQuestionText();
  if (!body) return;
  duariQuestionHistorySeed().unshift({
    question,
    original: duariQuestionAnswerDraft.original || body,
    sent: body,
    method,
    status: "전달됨",
    date: duariTodayDiaryDate()
  });
  duariSavePersistentContent();
}

function duariQuestionHistoryCard(item, index) {
  return `
    <article class="question-history-card">
      <div class="between">
        <h3>${duariEscapeHtml(item.question)}</h3>
        <span class="linked-diary-type">${duariEscapeHtml(item.status)}</span>
      </div>
      <p>${duariEscapeHtml(item.sent)}</p>
      <div class="question-history-meta">
        <span>${duariEscapeHtml(item.date)}</span>
      </div>
    </article>
  `;
}

function bindQuestionHistoryCards(root, backAction) {
  qsa("[data-question-history-index]", root).forEach((card) => {
    const open = () => openQuestionHistoryDetail(Number(card.dataset.questionHistoryIndex || 0), backAction);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      open();
    });
  });
}

function renderQuestions() {
  const questions = qs("#questions");
  if (!questions) return;
  const history = duariQuestionHistorySeed();
  const filtered = duariFilterQuestionHistory(history, "전체", "", "");
  const visibleCount = 10;
  questions.innerHTML = `
    <div class="section-stack">
      <section class="question-card">
        <p class="eyebrow">오늘의 질문</p>
        <h3>${duariEscapeHtml(duariCurrentQuestionText())}</h3>
        <div class="home-question-actions question-action-row">
          <button class="primary-btn" data-action="answer-question">답변 추가</button>
          <button class="ghost-btn" data-action="another-question">다른 질문 보기</button>
        </div>
      </section>
      <section class="card question-history-section">
        <div class="between">
          <h3>전달한 질문</h3>
          <span class="meta question-history-count" data-question-history-count>총 ${filtered.length}개</span>
        </div>
        <div class="chip-row question-history-filters">
          ${["전체", "읽음", "전달됨"].map((item) => `<button class="chip-btn ${item === "전체" ? "active" : ""}" type="button" data-question-history-filter="${item}">${item}</button>`).join("")}
        </div>
        <div class="question-history-search-grid">
          <div class="form-field">
            <label for="questionHistoryInlineSearch">질문 검색</label>
            <input id="questionHistoryInlineSearch" placeholder="질문이나 답변 검색" />
          </div>
          <div class="form-field">
            <label for="questionHistoryInlineDate">월</label>
            <input id="questionHistoryInlineDate" type="month" />
          </div>
        </div>
        <div class="question-history-list" data-question-history-list>
          ${duariQuestionHistoryListHtml(history, filtered, visibleCount)}
        </div>
        <div data-question-history-load-more-slot>
          ${duariQuestionHistoryLoadMoreHtml(filtered, visibleCount)}
        </div>
      </section>
    </div>
  `;
  bindActions(questions);
  duariBindInlineQuestionHistory(questions);
}

function duariNormalizeQuestionHistoryDate(value = "") {
  return String(value || "").trim().replaceAll("-", ".");
}

function duariFilterQuestionHistory(history, filter = "전체", query = "", date = "") {
  const normalizedQuery = String(query || "").trim().toLowerCase();
  const normalizedDate = duariNormalizeQuestionHistoryDate(date);
  return history.filter((item) => {
    if (filter === "읽음") return item.status === "읽음";
    if (filter === "전달됨") return item.status === "전달됨";
    return true;
  }).filter((item) => {
    const searchTarget = [item.question, item.original, item.sent, item.status, item.date].join(" ").toLowerCase();
    const matchesQuery = !normalizedQuery || searchTarget.includes(normalizedQuery);
    const matchesDate = !normalizedDate || item.date.startsWith(normalizedDate);
    return matchesQuery && matchesDate;
  });
}

function duariQuestionHistoryListHtml(history, filtered, limit = filtered.length) {
  const visible = filtered.slice(0, limit);
  return visible.map((item) => duariQuestionHistoryCard(item, history.indexOf(item))).join("") || `<p class="linked-record-empty">아직 전달한 질문이 없어요.</p>`;
}

function duariQuestionHistoryLoadMoreHtml(filtered, visibleCount = 10) {
  return filtered.length > visibleCount
    ? `<button class="ghost-btn full diary-load-more" type="button" data-question-history-load-more>더보기</button>`
    : "";
}

function openQuestionHistoryPage(filter = "전체", query = "", date = "") {
  const history = duariQuestionHistorySeed();
  const filtered = duariFilterQuestionHistory(history, filter, query, date);
  openModal(`
    <div class="modal-sheet notification-page question-history-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-question-history-back aria-label="뒤로가기">←</button>
        <h3>전달한 질문</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="chip-row question-history-filters">
          ${["전체", "읽음", "전달됨"].map((item) => `<button class="chip-btn ${item === filter ? "active" : ""}" type="button" data-question-history-filter="${item}">${item}</button>`).join("")}
        </div>
        <div class="question-history-search-grid">
          <div class="form-field">
            <label for="questionHistorySearch">질문 검색</label>
            <input id="questionHistorySearch" value="${duariEscapeHtml(query)}" placeholder="질문이나 답변 검색" />
          </div>
          <div class="form-field">
            <label for="questionHistoryDate">월</label>
            <input id="questionHistoryDate" type="month" value="${String(date || "").slice(0, 7).replaceAll(".", "-")}" />
          </div>
        </div>
        <p class="meta question-history-count" data-question-history-count>총 ${filtered.length}개</p>
        <div class="question-history-list" data-question-history-list>
          ${duariQuestionHistoryListHtml(history, filtered)}
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".question-history-page");
  qs("[data-question-history-back]", sheet)?.addEventListener("click", () => {
    closeModal();
    setTab("questions");
  });
  qsa("[data-question-history-filter]", sheet).forEach((button) => {
    button.addEventListener("click", () => openQuestionHistoryPage(
      button.dataset.questionHistoryFilter || "전체",
      qs("#questionHistorySearch", sheet)?.value || "",
      qs("#questionHistoryDate", sheet)?.value || ""
    ));
  });
  const searchInput = qs("#questionHistorySearch", sheet);
  const dateInput = qs("#questionHistoryDate", sheet);
  const applyQuestionHistoryFilters = () => {
    const nextFiltered = duariFilterQuestionHistory(
      history,
      filter,
      searchInput?.value || "",
      dateInput?.value || ""
    );
    const list = qs("[data-question-history-list]", sheet);
    if (list) list.innerHTML = duariQuestionHistoryListHtml(history, nextFiltered);
    const count = qs("[data-question-history-count]", sheet);
    if (count) count.textContent = `총 ${nextFiltered.length}개`;
  };
  searchInput?.addEventListener("input", applyQuestionHistoryFilters);
  dateInput?.addEventListener("input", applyQuestionHistoryFilters);
  dateInput?.addEventListener("change", applyQuestionHistoryFilters);
  bindQuestionHistoryCards(sheet, () => openQuestionHistoryPage(filter, query, date));
}

function openQuestionHistoryDetail(index = 0, backAction = null) {
  const history = duariQuestionHistorySeed();
  const item = history[index] || history[0];
  if (!item) return;
  openModal(`
    <div class="modal-sheet notification-page question-history-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-question-detail-back aria-label="뒤로가기">←</button>
        <h3>질문 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <p class="eyebrow">질문</p>
          <h3>${duariEscapeHtml(item.question)}</h3>
        </section>
        <section class="card">
          <div class="between"><h3>보낸 답변</h3><span class="linked-diary-type">${duariEscapeHtml(item.status)}</span></div>
          <p>${duariEscapeHtml(item.sent)}</p>
          <div class="question-history-meta detail">
            <span>${duariEscapeHtml(item.date)}</span>
          </div>
        </section>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-question-detail-back]")?.addEventListener("click", () => {
    if (typeof backAction === "function") {
      runWithoutModalHistory(backAction);
      return;
    }
    closeModal();
    setTab("questions");
  });
}

function openQuestionSendConfirmOverlay() {
  const page = qs(".question-answer-page");
  if (!page || qs(".ai-confirm-overlay", page)) return;
  page.insertAdjacentHTML("beforeend", `
    <div class="ai-confirm-overlay" role="dialog" aria-modal="true">
      <div class="ai-confirm-sheet">
        <h3>상대방에게 전달할까요?</h3>
        <p>작성한 답변이 최종 메시지로 상대방에게 전달됩니다.</p>
        <div class="ai-action-grid">
          <button class="ghost-btn" type="button" data-question-send-cancel>취소</button>
          <button class="primary-btn" type="button" data-question-send-confirm>전달하기</button>
        </div>
      </div>
    </div>
  `);
  qs("[data-question-send-cancel]", page)?.addEventListener("click", () => qs(".ai-confirm-overlay", page)?.remove());
  qs("[data-question-send-confirm]", page)?.addEventListener("click", () => {
    duariQuestionAnswerDraft.body = qs("#questionAnswerBody")?.value || duariQuestionAnswerDraft.body || "";
    duariAddQuestionHistory({ method: duariQuestionAnswerDraft.method || "원문" });
    duariQuestionAnswerDraft.body = "";
    duariQuestionAnswerDraft.method = "원문";
    qs(".ai-confirm-overlay", page)?.remove();
    closeModal();
    setTab("questions");
    showToast("답변을 상대방에게 전달했어요.");
  });
}

const duariQuestionAiResultBase = openQuestionAiResultPage;
openQuestionAiResultPage = function openQuestionAiResultPage(draft = {}) {
  duariQuestionAiResultBase(draft);
  qs("[data-question-ai-apply]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.method = "AI 다듬음";
    duariQuestionAnswerDraft.original = draft.original || duariQuestionAnswerDraft.body || "";
  }, { capture: true });
};

window.setTimeout(() => {
  if ((qs(".screen.active")?.id || state.tab) === "questions") renderQuestions();
}, 0);

function duariAlbumFilterMemories({ query = "", date = "", type = "전체" } = {}) {
  const normalizedQuery = String(query || "").trim().toLowerCase();
  const normalizedDate = String(date || "").trim().replaceAll("-", ".");
  return state.memories.filter((memory) => {
    const matchesQuery = !normalizedQuery || [memory.title, memory.place, memory.type].some((value) => String(value || "").toLowerCase().includes(normalizedQuery));
    const matchesDate = !normalizedDate || String(memory.date || "").startsWith(normalizedDate);
    const matchesType = type === "전체" || memory.type === type;
    return matchesQuery && matchesDate && matchesType;
  });
}

const DUARI_ALBUM_RECORD_PAGE_SIZE = 5;

function duariAlbumRecordVisibleCount() {
  if (!state.albumRecordVisibleCount) state.albumRecordVisibleCount = DUARI_ALBUM_RECORD_PAGE_SIZE;
  return state.albumRecordVisibleCount;
}

function duariIncreaseAlbumRecordVisibleCount() {
  state.albumRecordVisibleCount = duariAlbumRecordVisibleCount() + DUARI_ALBUM_RECORD_PAGE_SIZE;
}

function renderAlbumRecordList(memories = state.memories) {
  const visibleCount = duariAlbumRecordVisibleCount();
  const visibleMemories = memories.slice(0, visibleCount);
  return {
    html: visibleMemories.length ? memoryCards(visibleMemories) : `<p class="linked-record-empty">아직 남긴 기록이 없어요.</p>`,
    hasMore: memories.length > visibleMemories.length
  };
}

function renderAlbumPhotoGroups(memories = state.memories) {
  const memoriesWithPhotos = memories.filter((memory) => {
    const memoryIndex = state.memories.indexOf(memory);
    return duariActualPhotoCountForMemory(memoryIndex) > 0;
  });
  if (!memoriesWithPhotos.length) return `<p class="linked-record-empty">아직 남긴 사진이 없어요.</p>`;
  const groups = memoriesWithPhotos.reduce((acc, memory) => {
    const date = memory.date || "날짜 없음";
    if (!acc.has(date)) acc.set(date, []);
    acc.get(date).push(memory);
    return acc;
  }, new Map());
  return Array.from(groups.entries()).map(([date, groupMemories]) => {
    const groupPhotoCount = groupMemories.reduce((sum, memory) => sum + duariActualPhotoCountForMemory(state.memories.indexOf(memory)), 0);
    return `
      <section class="album-photo-date-group">
        <div class="album-photo-date-head">
          <h3>${date}</h3>
          <span class="meta">${groupPhotoCount}장</span>
        </div>
        ${groupMemories.map((memory) => {
          const memoryIndex = state.memories.indexOf(memory);
          const photos = duariActualPhotosForMemory(memoryIndex);
          return `
            <div class="album-photo-record-group">
              <div class="album-photo-record-head">
                <div>
                  <strong>${memory.title}</strong>
                  <p class="meta">${memory.place} · ${memory.type}</p>
                </div>
                <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
              </div>
              <div class="album-photo-grid">
                ${photos.map((photo, photoIndex) => `
                  <button class="album-photo-thumb has-photo" type="button" data-action="photo-detail" data-memory-index="${memoryIndex}" data-photo-index="${photoIndex}" aria-label="${memory.title} ${photoIndex + 1}번째 사진">
                    <img src="${signupAttr(duariPhotoSource(photo))}" alt="" />
                  </button>
                `).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </section>
    `;
  }).join("");
}

function duariMemoryDateValue(memory) {
  const raw = String(memory?.date || memory?.createdAt || "");
  const match = raw.match(/(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);
  if (!match) return "";
  return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
}

function duariCalendarState(memories = state.memories) {
  const recordDates = (memories || []).map(duariMemoryDateValue).filter(Boolean);
  const fallback = recordDates[0] || "2026-04-01";
  const fallbackMonth = fallback.slice(0, 7);
  const monthHasRecord = recordDates.some((date) => date.startsWith(state.calendarMonth || ""));
  if (!state.calendarMonth || (!monthHasRecord && !state.calendarTouched)) state.calendarMonth = fallbackMonth;
  if (!state.calendarSelectedDate || !state.calendarSelectedDate.startsWith(state.calendarMonth)) {
    state.calendarSelectedDate = recordDates.find((date) => date.startsWith(state.calendarMonth)) || `${state.calendarMonth}-01`;
  }
  return {
    month: state.calendarMonth,
    selectedDate: state.calendarSelectedDate
  };
}

function duariCalendarMonthLabel(monthValue) {
  const [year, month] = String(monthValue || "").split("-");
  return `${year}년 ${Number(month)}월`;
}

function duariCalendarShiftMonth(amount, memories = state.memories) {
  const { month } = duariCalendarState(memories);
  const [year, monthNumber] = month.split("-").map(Number);
  const next = new Date(year, monthNumber - 1 + amount, 1);
  const nextMonth = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
  const firstMemory = (memories || []).find((memory) => duariMemoryDateValue(memory).startsWith(nextMonth));
  state.calendarMonth = nextMonth;
  state.calendarSelectedDate = duariMemoryDateValue(firstMemory) || `${nextMonth}-01`;
  state.calendarTouched = true;
}

function renderAlbumCalendar(memories = state.memories) {
  const { month, selectedDate } = duariCalendarState(memories);
  const [year, monthNumber] = month.split("-").map(Number);
  const firstDay = new Date(year, monthNumber - 1, 1);
  const daysInMonth = new Date(year, monthNumber, 0).getDate();
  const leadingBlankCount = firstDay.getDay();
  const todayValue = "2026-05-02";
  const memoriesByDate = (memories || []).reduce((acc, memory) => {
    const dateValue = duariMemoryDateValue(memory);
    if (!dateValue) return acc;
    if (!acc.has(dateValue)) acc.set(dateValue, []);
    acc.get(dateValue).push(memory);
    return acc;
  }, new Map());
  const selectedMemories = memoriesByDate.get(selectedDate) || [];
  const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];
  const dayCells = [
    ...Array.from({ length: leadingBlankCount }, (_, index) => `<div class="calendar-day is-empty" aria-hidden="true" data-empty="${index}"></div>`),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const dateValue = `${month}-${String(day).padStart(2, "0")}`;
      const dayMemories = memoriesByDate.get(dateValue) || [];
      const recordCountBadge = dayMemories.length ? `<small>${dayMemories.length > 9 ? "9+" : dayMemories.length}</small>` : "";
      const classes = [
        "calendar-day",
        dateValue === todayValue ? "is-today" : "",
        dateValue === selectedDate ? "is-selected" : "",
        dayMemories.length ? "has-record" : ""
      ].filter(Boolean).join(" ");
      return `
        <button class="${classes}" type="button" data-calendar-date="${dateValue}" aria-label="${monthNumber}월 ${day}일">
          <span class="calendar-day-number">${day}</span>
          <span class="calendar-day-marks">${recordCountBadge}</span>
        </button>
      `;
    })
  ].join("");

  return `
    <section class="album-calendar">
      <div class="album-calendar-month">
        <button class="chip-btn icon-only" type="button" data-calendar-prev aria-label="이전 월">‹</button>
        <h3>${duariCalendarMonthLabel(month)}</h3>
        <button class="chip-btn icon-only" type="button" data-calendar-next aria-label="다음 월">›</button>
      </div>
      <div class="calendar-weekdays">
        ${weekdayLabels.map((label) => `<span>${label}</span>`).join("")}
      </div>
      <div class="calendar-grid">
        ${dayCells}
      </div>
    </section>
    <section class="card selected-calendar-records">
      <div class="between">
        <h3>${Number(selectedDate.slice(5, 7))}월 ${Number(selectedDate.slice(8, 10))}일 기록</h3>
        <span class="meta">${selectedMemories.length}개</span>
      </div>
      <div class="list">
        ${selectedMemories.length ? memoryCards(selectedMemories) : `<p class="linked-record-empty">이 날짜에 남긴 기록이 없어요.</p>`}
      </div>
    </section>
  `;
}

function duariNormalizeTwoButtonRows(root = document) {
  qsa(".section-stack, .card, .diary-editor-action-stack, .ai-confirm-sheet", root).forEach((parent) => {
    if (parent.closest(".tabs, .chip-row, .home-question-actions, .inline-action-pair, .ai-action-grid, .record-picker-actions")) return;
    if (qs(":scope > .inline-action-pair", parent)) return;

    const directButtons = [...parent.children].filter((child) => child.matches?.("button"));
    const actionButtons = directButtons.filter((button) => button.matches(".ghost-btn, .primary-btn"));
    if (directButtons.length !== 2 || actionButtons.length !== 2) return;

    const children = [...parent.children];
    const firstIndex = children.indexOf(actionButtons[0]);
    const secondIndex = children.indexOf(actionButtons[1]);
    if (secondIndex !== firstIndex + 1) return;

    const row = document.createElement("div");
    row.className = "inline-action-pair auto-two-button-row";
    actionButtons[0].before(row);
    actionButtons.forEach((button) => {
      button.classList.remove("full");
      button.style.marginTop = "";
      row.appendChild(button);
    });
  });
}

const duariOpenModalBeforeTwoButtonRows = openModal;
openModal = function openModalWithTwoButtonRows(html) {
  duariOpenModalBeforeTwoButtonRows(html);
  duariNormalizeTwoButtonRows(qs("#modal"));
};

function renderAlbum() {
  const album = qs("#album");
  state.albumView = "calendar";

  album.innerHTML = `
    <div class="section-stack">
      <div class="album-record-toolbar">
        <div class="between">
          <span class="meta">총 ${state.memories.length}개</span>
          <button class="primary-btn" type="button" data-action="new-memory">기록 추가</button>
        </div>
      </div>
      ${renderAlbumCalendar()}
    </div>
  `;
  qs("[data-calendar-prev]", album)?.addEventListener("click", () => {
    duariCalendarShiftMonth(-1);
    renderAlbum();
  });
  qs("[data-calendar-next]", album)?.addEventListener("click", () => {
    duariCalendarShiftMonth(1);
    renderAlbum();
  });
  qsa("[data-calendar-date]", album).forEach((button) => {
    button.addEventListener("click", () => {
      state.calendarSelectedDate = button.dataset.calendarDate;
      renderAlbum();
    });
  });
  bindActions(album);
}

function duariPhotoCountForMemory(index) {
  const memory = state.memories?.[Number(index)];
  const savedCount = Number(memory?.photoCount);
  const photoListCount = Array.isArray(memory?.photos) ? memory.photos.length : 0;
  if (Number.isFinite(savedCount) && savedCount >= 0) return Math.max(savedCount, photoListCount);
  if (photoListCount > 0) return photoListCount;
  return 0;
}

if (!window.__duariMemoryEditButtonGuard) {
  window.__duariMemoryEditButtonGuard = true;
  window.addEventListener("click", (event) => {
    const editButton = event.target.closest?.(".memory-detail-page:not(.memory-edit-page) [data-memory-edit-page]");
    if (!editButton) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const memoryIndex = Number(editButton.dataset.index);
    const safeIndex = Number.isFinite(memoryIndex)
      ? memoryIndex
      : (typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0);
    openMemoryEditPageLatest(safeIndex, () => openMemoryDetailLatestV3(safeIndex));
  }, true);
}

function openPhotoDetail(trigger = null) {
  const requestedMemoryIndex = Number(trigger?.dataset?.memoryIndex);
  const requestedPhotoIndex = Number(trigger?.dataset?.photoIndex);
  const memoryIndex = Number.isFinite(requestedMemoryIndex) ? requestedMemoryIndex : Number(state.activeMemoryIndex) || 0;
  const photoCount = duariPhotoCountForMemory(memoryIndex);
  const photoIndex = Math.min(Math.max(Number.isFinite(requestedPhotoIndex) ? requestedPhotoIndex : Number(state.activePhotoIndex) || 0, 0), photoCount - 1);
  const memory = state.memories[memoryIndex] || state.memories[0];
  const photos = duariPhotoListForMemory(memoryIndex);
  state.activeMemoryIndex = memoryIndex;
  state.activePhotoIndex = photoIndex;

  openModal(`
    <div class="modal-sheet notification-page photo-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" type="button" data-photo-detail-back aria-label="뒤로가기">←</button>
        <h3>사진 상세</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="photo-detail-list" aria-label="${memory.title} 사진 목록">
          ${photos.length
            ? photos.map((photo, index) => {
              const src = duariPhotoSource(photo);
              return `<div class="photo-detail-image" data-photo-detail-item="${index}">
                ${src ? `<img src="${signupAttr(src)}" alt="" />` : ""}
              </div>`;
            }).join("")
            : `<div class="photo-detail-image"></div>`}
        </section>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const backTarget = trigger?.dataset?.photoBack || state.photoDetailBackTarget || "";
  state.photoDetailBackTarget = backTarget;
  const goBack = () => {
    if (backTarget === "memory") {
      openMemoryDetailLatestV3(memoryIndex);
      return;
    }
    closeModal();
  };
  qs("[data-photo-detail-back]")?.addEventListener("click", goBack);
  qsa("[data-photo-detail-item]", qs("#modal")).forEach((item) => {
    item.addEventListener("click", () => {
      state.activePhotoIndex = Number(item.dataset.photoDetailItem) || 0;
    });
  });
  bindActions(qs("#modal"));
}

function duariDownloadPhotoAsPng(memoryIndex = Number(state.activeMemoryIndex) || 0, photoIndex = Number(state.activePhotoIndex) || 0, { showDoneToast = true } = {}) {
  const memory = state.memories?.[memoryIndex] || {};
  const photoSrc = duariPhotoSource(duariPhotoListForMemory(memoryIndex)[photoIndex]);
  if (!photoSrc) {
    showToast("다운로드할 사진이 없어요.");
    return;
  }

  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    const context = canvas.getContext("2d");
    if (!context) {
      showToast("다운로드를 준비하지 못했어요.");
      return;
    }
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const link = document.createElement("a");
    const safeTitle = String(memory.title || "duari-photo")
      .trim()
      .replace(/[\\/:*?"<>|]+/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 40) || "duari-photo";
    link.href = canvas.toDataURL("image/png");
    link.download = `${safeTitle}-${photoIndex + 1}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    if (showDoneToast) showToast("PNG로 다운로드했어요.");
  };
  image.onerror = () => showToast("사진을 불러오지 못했어요.");
  image.src = photoSrc;
}

function duariDownloadCurrentPhotoAsPng() {
  duariDownloadPhotoAsPng();
}

function duariDownloadAllCurrentPhotosAsPng() {
  const memoryIndex = Number(state.activeMemoryIndex) || 0;
  const photos = duariPhotoListForMemory(memoryIndex);
  if (!photos.length) {
    showToast("다운로드할 사진이 없어요.");
    return;
  }
  photos.forEach((_photo, index) => {
    window.setTimeout(() => {
      duariDownloadPhotoAsPng(memoryIndex, index, { showDoneToast: false });
    }, index * 180);
  });
  showToast(`사진 ${photos.length}장을 다운로드했어요.`);
}

function duariPhotoIsMine(memoryIndex, photoIndex) {
  const photoCount = duariPhotoCountForMemory(memoryIndex);
  return Number(photoIndex) < Math.ceil(photoCount / 2);
}

function openPhotoDeleteConfirm() {
  const modal = qs("#modal");
  const inPhotoDetail = qs(".photo-detail-page", modal);
  if (!inPhotoDetail) {
    openConfirmModal("사진 삭제", "작성자가 올린 사진이면 삭제하면 양쪽에서 사라집니다.", "삭제", () => showToast("사진을 삭제했어요."));
    return;
  }

  const memoryIndex = Number(state.activeMemoryIndex) || 0;
  const photoIndex = Number(state.activePhotoIndex) || 0;
  const isMine = duariPhotoIsMine(memoryIndex, photoIndex);
  const existing = qs(".photo-delete-overlay", modal);
  if (existing) existing.remove();

  modal.insertAdjacentHTML("beforeend", `
    <div class="photo-delete-overlay" role="dialog" aria-modal="true">
      <section class="photo-delete-sheet">
        <h3>사진을 삭제할까요?</h3>
        <p>${isMine ? "작성자가 올린 사진이면 삭제하면 양쪽에서 사라집니다." : "이 사진은 상대방이 올린 사진이어서 삭제할 수 없습니다."}</p>
        <div class="inline-action-pair">
          <button class="ghost-btn" type="button" data-photo-delete-cancel>취소</button>
          <button class="primary-btn" type="button" data-photo-delete-confirm ${isMine ? "" : "disabled"}>삭제</button>
        </div>
      </section>
    </div>
  `);

  qs("[data-photo-delete-cancel]", modal)?.addEventListener("click", () => qs(".photo-delete-overlay", modal)?.remove());
  qs("[data-photo-delete-confirm]", modal)?.addEventListener("click", () => {
    qs(".photo-delete-overlay", modal)?.remove();
    closeModal();
    showToast("사진을 삭제했어요.");
  });
}

function openQuestionModal() {
  duariQuestionAnswerDraft.question = duariCurrentQuestionText();
  const activeTab = qs(".screen.active")?.id || state.tab || "home";
  openModal(`
    <div class="modal-sheet notification-page question-answer-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-question-back aria-label="뒤로가기">←</button>
        <h3>답변 추가</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <p class="eyebrow">오늘의 질문</p>
          <h3>${duariEscapeHtml(duariQuestionAnswerDraft.question)}</h3>
        </section>
        <div class="form-field">
          <label>답변</label>
          <textarea id="questionAnswerBody" class="diary-body-large" placeholder="솔직하게 적어보세요.">${duariEscapeHtml(duariQuestionAnswerDraft.body)}</textarea>
        </div>
        <p class="meta question-delivery-note">답변은 상대방에게 전달됩니다.</p>
        <div class="diary-editor-action-stack">
          <button class="ghost-btn full" type="button" data-question-ai>AI로 다듬어서 보내기</button>
          <button class="primary-btn full" type="button" data-question-send-original>상대에게 전달하기</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qs("[data-question-back]")?.addEventListener("click", () => {
    closeModal();
    setTab(activeTab);
  });
  qs("#questionAnswerBody")?.addEventListener("input", (event) => {
    duariQuestionAnswerDraft.body = event.target.value;
  });
  qs("[data-question-send-original]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.body = qs("#questionAnswerBody")?.value || "";
    openQuestionSendConfirmOverlay();
  });
  qs("[data-question-ai]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.body = qs("#questionAnswerBody")?.value || "";
    openQuestionAiSourcePage({
      original: duariQuestionAnswerDraft.body,
      tone: "부드럽게"
    });
  });
}

function openQuestionAiSourcePage({ original = "", tone = "부드럽게" } = {}) {
  openModal(`
    <div class="modal-sheet notification-page ai-page question-ai-source-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-question-ai-source-back aria-label="뒤로가기">←</button>
        <h3>AI로 다듬기</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="tone-section">
          <h3>톤 선택</h3>
          <div class="chip-row" data-question-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}" type="button">${item}</button>`).join("")}</div>
        </section>
        <div class="form-field">
          <label>원문</label>
          <textarea id="questionAiOriginalText" class="diary-body-large">${duariEscapeHtml(original)}</textarea>
        </div>
        <button class="primary-btn full" type="button" data-question-ai-generate>AI로 다듬기</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qsa("[data-question-ai-tone] .chip-btn").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-question-ai-tone] .chip-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-question-ai-source-back]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.body = qs("#questionAiOriginalText")?.value || original;
    openQuestionModal();
  });
  qs("[data-question-ai-generate]")?.addEventListener("click", () => {
    const nextOriginal = qs("#questionAiOriginalText")?.value || "";
    const selectedTone = qs("[data-question-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    openQuestionAiResultPage({
      original: nextOriginal,
      tone: selectedTone,
      result: makeAiResult(nextOriginal, selectedTone)
    });
  });
}

function openQuestionAiResultPage({ original = "", tone = "부드럽게", result = "" } = {}) {
  const cleanResult = cleanAiResultText?.(result || makeAiResult(original, tone)) || makeAiResult(original, tone);
  openModal(`
    <div class="modal-sheet notification-page ai-page ai-result-page question-ai-result-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-question-ai-back aria-label="뒤로가기">←</button>
        <h3>AI 결과</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <section class="card">
          <h3>원문</h3>
          <p class="readonly-source">${duariEscapeHtml(original)}</p>
        </section>
        <div class="form-field">
          <p class="ai-field-title">AI 결과</p>
          <textarea id="questionAiResultText" class="diary-body-large">${duariEscapeHtml(cleanResult)}</textarea>
        </div>
        <section class="tone-section">
          <h3>톤 선택</h3>
          <div class="chip-row" data-question-ai-tone>${aiTonePresets.map((item) => `<button class="chip-btn ${item === tone ? "active" : ""}" type="button">${item}</button>`).join("")}</div>
        </section>
        <div class="ai-action-grid">
          <button class="ghost-btn" type="button" data-question-ai-cancel>취소</button>
          <button class="ghost-btn" type="button" data-question-ai-redraft>AI로 다시 다듬기</button>
          <button class="primary-btn full-row" type="button" data-question-ai-apply>본문에 저장</button>
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  qsa("[data-question-ai-tone] .chip-btn").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-question-ai-tone] .chip-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  qs("[data-question-ai-back]")?.addEventListener("click", () => {
    openQuestionAiSourcePage({ original, tone });
  });
  qs("[data-question-ai-cancel]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.body = original;
    openQuestionModal();
  });
  qs("[data-question-ai-redraft]")?.addEventListener("click", () => {
    const selectedTone = qs("[data-question-ai-tone] .chip-btn.active")?.textContent.trim() || tone;
    const textarea = qs("#questionAiResultText");
    if (!textarea) return;
    textarea.value = "";
    textarea.value = makeFreshAiRedraftFromOriginal(original, selectedTone);
  });
  qs("[data-question-ai-apply]")?.addEventListener("click", () => {
    duariQuestionAnswerDraft.method = "AI 다듬음";
    duariQuestionAnswerDraft.original = original || duariQuestionAnswerDraft.body || "";
    duariQuestionAnswerDraft.body = qs("#questionAiResultText")?.value || cleanResult;
    openQuestionModal();
    showToast("AI 결과를 답변 본문에 저장했어요.");
  });
}
const duariOpenMemoryCreatePageWithoutLinkedDiaryBase = openMemoryCreatePage;
openMemoryCreatePage = function openMemoryCreatePage(backAction = null, options = {}) {
  duariOpenMemoryCreatePageWithoutLinkedDiaryBase(backAction);
  if (options.hideLinkedDiaries !== true) return;
  qs(".memory-create-page .linked-diary-section")?.remove();
  if (!options.returnToDiaryDraft) return;

  qs("[data-save-memory-create]")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const title = limitMemoryEditTitle(qs("#memoryTitle")?.value.trim() || "") || "제목 없는 기록";
    const dateValue = qs("#memoryDate")?.value || new Date().toISOString().slice(0, 10);
    const place = qs("#memoryPlace")?.value.trim() || "";
    const type = qs("#memoryType")?.value || "일상";
    const scope = qs("[data-memory-scope] .chip-btn.active")?.textContent.trim() || "나만 보기";
    const newMemory = {
      title,
      date: dateValue.replaceAll("-", "."),
      place,
      type,
      note: "",
      scope,
      feelings: [],
      reaction: "",
      author: "나",
      photoCount: duariCurrentPhotoManageCount(state.memoryCreateDraft?.photoCount || 0),
      photos: Array.isArray(state.memoryCreateDraft?.photos) ? state.memoryCreateDraft.photos : [],
      representativePhoto: state.memoryCreateDraft?.representativePhoto || (Array.isArray(state.memoryCreateDraft?.photos) ? state.memoryCreateDraft.photos[0] : null),
      representativePhotoIndex: Number(state.memoryCreateDraft?.representativePhotoIndex) || 0
    };
    state.memories.unshift(newMemory);
    state.activeMemoryIndex = 0;
    state.memoryCreateDraft = null;
    duariSavePersistentContent();
    runWithoutModalHistory(() => renderDiaryEditor({
      heading: options.returnToDiaryDraft.heading || "일기 추가",
      diary: {
        ...options.returnToDiaryDraft,
        linked: newMemory.title,
        linkedMemoryIndex: 0
      },
      linkedMemoryIndex: 0,
      backAction: options.returnToDiaryDraft.backAction || diaryEditorFlowBackAction
    }));
    showToast("기록을 저장하고 일기에 연결했어요.");
  }, { capture: true });
};


// Inlined from linked-diary-final.js
(() => {
  function belongsToMemory(diary = {}, memoryTitle = "") {
    return !!memoryTitle && (diary.linked === memoryTitle || diary.linkedMemoryTitle === memoryTitle);
  }

  function linkedDiariesForMemory(memoryIndex = 0) {
    const safeIndex = Number.isFinite(Number(memoryIndex)) ? Number(memoryIndex) : 0;
    const memory = state.memories?.[safeIndex];
    const memoryTitle = memory?.title || "";
    if (!memoryTitle) return [];
    const added = typeof memoryLinkedAddedDiaries !== "undefined" ? (memoryLinkedAddedDiaries[safeIndex] || []) : [];
    const seen = new Set();
    return [...(state.diaries || []), ...added].filter((diary) => {
      if (!belongsToMemory(diary, memoryTitle)) return false;
      const key = [
        diary.id || "",
        diary.title || "",
        diary.body || "",
        diary.scope || "",
        memoryTitle
      ].join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 6);
  }

  linkedDiariesLatest = function linkedDiariesLatest() {
    const activeIndex = typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0;
    return linkedDiariesForMemory(activeIndex);
  };

  linkedDiaryCardsLatest = function linkedDiaryCardsLatest(memoryIndex = state.activeMemoryIndex) {
    const safeIndex = Number.isFinite(Number(memoryIndex)) ? Number(memoryIndex) : 0;
    return linkedDiariesForMemory(safeIndex).map((diary, index) => `
      <article class="linked-diary-card" role="button" tabindex="0" data-linked-diary-index="${index}" data-linked-diary-memory-index="${safeIndex}">
        <div class="between">
          <strong>${duariEscapeHtml(diary.title || "제목 없는 일기")}</strong>
          <span class="linked-diary-type">${duariEscapeHtml(diary.type || diaryScopeLabel(diary.scope))}</span>
        </div>
        <p>${duariEscapeHtml(diary.body || "작성한 내용이 없습니다.")}</p>
        ${linkedDiaryEmotionRow(diary)}
        ${typeof duariDiaryDateMeta === "function" ? duariDiaryDateMeta(diary) : ""}
      </article>
    `).join("");
  };

  bindLinkedDiaryCardsLatest = function bindLinkedDiaryCardsLatest(root, backAction = null) {
    if (typeof duariBindLinkedDiaryDropdowns === "function") duariBindLinkedDiaryDropdowns(root);
    qsa("[data-linked-diary-index]", root).forEach((card) => {
      if (card.dataset.disableLinkedDiaryCardOpen === "true") return;
      const open = () => {
        window.duariOpenLinkedDiaryCard(card, null, backAction);
      };
      card.addEventListener("click", (event) => {
        if (event.target.closest?.("[data-linked-diary-menu], [data-linked-diary-dropdown], .linked-diary-menu-wrap, .linked-diary-right-tools")) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          return;
        }
        open();
      });
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        if (event.target.closest?.("[data-linked-diary-menu], [data-linked-diary-dropdown], .linked-diary-menu-wrap, .linked-diary-right-tools")) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          return;
        }
        event.preventDefault();
        open();
      });
    });
  };

  window.duariOpenLinkedDiaryCard = function duariOpenLinkedDiaryCard(card, event = null, backAction = null) {
    if (!card) return;
    if (card.dataset.disableLinkedDiaryCardOpen === "true") return;
    if (event?.target?.closest?.("[data-linked-diary-menu], [data-linked-diary-dropdown], .linked-diary-menu-wrap, .linked-diary-right-tools")) return;
    event?.preventDefault?.();
    event?.stopPropagation?.();
    event?.stopImmediatePropagation?.();
    const memoryIndex = Number(card.dataset.linkedDiaryMemoryIndex);
    const safeMemoryIndex = Number.isFinite(memoryIndex) ? memoryIndex : state.activeMemoryIndex;
    openLinkedDiaryDetailLatest(
      Number(card.dataset.linkedDiaryIndex || 0),
      backAction || (() => openMemoryDetailLatestV3(safeMemoryIndex)),
      safeMemoryIndex
    );
  };

  window.duariOpenDiaryEntryCard = function duariOpenDiaryEntryCard(card, event = null) {
    if (!card) return;
    event?.preventDefault?.();
    event?.stopPropagation?.();
    event?.stopImmediatePropagation?.();
    const entries = typeof diaryEntriesForCurrentView === "function"
      ? diaryEntriesForCurrentView()
      : (state.diaries || []);
    const filter = typeof duariDiaryFilterForCurrentView === "function" ? duariDiaryFilterForCurrentView() : null;
    const filteredEntries = typeof duariFilterDiaryEntries === "function"
      ? duariFilterDiaryEntries(entries, filter)
      : entries;
    const index = Number(card.dataset.diaryEntryIndex || 0);
    const entry = filteredEntries[index] || entries[index] || filteredEntries[0] || entries[0];
    if (!entry || typeof renderDiaryDetailReadOnly !== "function") return;
    renderDiaryDetailReadOnly(entry, () => {
      if (typeof duariDiaryViewFromScope === "function") state.diaryView = duariDiaryViewFromScope(entry.scope || entry.type);
      if (typeof closeModal === "function") closeModal();
      if (typeof setTab === "function") setTab("diary");
    });
  };

  window.duariOpenHomeDiaryCard = function duariOpenHomeDiaryCard(card, event = null) {
    if (!card) return;
    event?.preventDefault?.();
    event?.stopPropagation?.();
    event?.stopImmediatePropagation?.();
    if (typeof openHomeSharedDiaryDetail === "function") {
      openHomeSharedDiaryDetail(card.dataset.homeSharedDiaryIndex || 0);
      return;
    }
    const diaries = typeof duariHomeSharedDiaries === "function" ? duariHomeSharedDiaries() : (state.diaries || []);
    const entry = diaries[Number(card.dataset.homeSharedDiaryIndex || 0)] || diaries[0];
    if (!entry || typeof renderDiaryDetailReadOnly !== "function") return;
    renderDiaryDetailReadOnly(entry, () => {
      if (typeof closeModal === "function") closeModal();
      if (typeof setTab === "function") setTab("home");
    });
  };

  openLinkedDiaryDetailLatest = function openLinkedDiaryDetailLatest(index, backAction = null, memoryIndex = state.activeMemoryIndex) {
    const safeMemoryIndex = Number.isFinite(Number(memoryIndex)) ? Number(memoryIndex) : 0;
    const diary = linkedDiariesForMemory(safeMemoryIndex)[Number(index)] || linkedDiariesForMemory(safeMemoryIndex)[0];
    if (!diary) return;
    renderDiaryDetailReadOnly(
      normalizeDiaryForDetail(diary, index),
      backAction || (() => openMemoryDetailLatestV3(safeMemoryIndex))
    );
  };

  function validLinkedRecordIndex(linkedTitle, linkedMemoryIndex = null) {
    const normalizedTitle = String(linkedTitle || "").trim();
    if (!normalizedTitle || normalizedTitle.includes("관련 기록 없음")) return null;
    const byTitle = (state.memories || []).findIndex((memory) => memory.title === normalizedTitle);
    if (byTitle >= 0) return byTitle;
    if (typeof linkedMemoryIndex === "number") {
      const memory = state.memories?.[linkedMemoryIndex];
      if (memory?.title === normalizedTitle) return linkedMemoryIndex;
    }
    return null;
  }

  const renderEmptyLinkedRecordSectionSafe = (showPicker = false) => {
    if (typeof renderEmptyLinkedRecordSection === "function") return renderEmptyLinkedRecordSection(showPicker);
    return `
      <section class="card linked-record-card">
        <div class="between"><h3>연결된 기록</h3><span class="meta">0개</span></div>
        <p class="linked-record-empty">연결된 기록이 없습니다.</p>
      </section>
    `;
  };

  fallbackDiaryRecordIndex = function fallbackDiaryRecordIndex(linkedTitle, linkedMemoryIndex = null) {
    return validLinkedRecordIndex(linkedTitle, linkedMemoryIndex);
  };

  renderLinkedRecordCards = function renderLinkedRecordCards(linkedTitle, linkedMemoryIndex = null, options = {}) {
    const showMenu = options.showMenu ?? true;
    const index = validLinkedRecordIndex(linkedTitle, linkedMemoryIndex);
    if (index === null) return renderEmptyLinkedRecordSectionSafe(options.showPicker !== false);
    const record = state.memories[index];
    return `
      <section class="card linked-record-card">
        <div class="between"><h3>연결된 기록</h3><span class="meta">1개</span></div>
        <div class="linked-record-list">
          <article class="linked-record-pill"${showMenu ? "" : ` role="button" tabindex="0" data-linked-record-detail="${index}"`}>
            <div class="linked-record-title-row title-between">
              <span class="linked-record-title-text">${duariEscapeHtml(record.title || "제목 없는 기록")}</span>
              <div class="linked-record-right-tools">
                <em class="linked-record-scope">${scopeLabelForRecord(record)}</em>
                ${showMenu ? `<div class="linked-record-menu-wrap"><button class="icon-btn linked-record-kebab" data-linked-record-menu aria-label="더보기" title="더보기"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><div class="linked-record-dropdown" data-linked-record-dropdown hidden><button data-linked-record-detail="${index}">상세 보기</button><button data-diary-unlink-record>삭제</button></div></div>` : ""}
              </div>
            </div>
          </article>
        </div>
        ${options.showPicker === false ? "" : `<button class="ghost-btn full" data-diary-record-picker>연결할 기록 선택</button>`}
      </section>
    `;
  };

  openMemoryDetailLatestV3 = function openMemoryDetailLatestV3(index, backAction = null) {
    const safeIndex = Number.isFinite(Number(index)) ? Number(index) : 0;
    state.activeMemoryIndex = safeIndex;
    const memory = state.memories[safeIndex];
    if (!memory) return;
    const photoCount = duariPhotoCountForMemory(safeIndex);
    const linkedDiaries = linkedDiariesForMemory(safeIndex);
    const previousTab = qs(".screen.active")?.id || state.tab || "home";
    const goBack = backAction || (() => {
      closeModal();
      setTab(previousTab === "album" ? "album" : "home");
    });
    openModal(`
      <div class="modal-sheet notification-page memory-detail-page">
        <header class="notification-header">
          <button class="notification-nav-btn" data-memory-detail-back aria-label="뒤로가기">←</button>
          <h3>기록 상세</h3>
          <span class="notification-header-spacer" aria-hidden="true"></span>
        </header>
        <div class="section-stack">
          <section class="memory-photo-gallery" aria-label="사진 영역">
            <div class="memory-photo-main">
              <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(photoCount, safeIndex)}</div>
            </div>
          </section>
          <section class="card">
            <div class="between">
              <h3 class="memory-limited-title" title="${duariEscapeHtml(memory.title)}">${limitMemoryTitleLatest(memory.title)}</h3>
              <span class="linked-record-scope">${scopeLabelForRecord(memory)}</span>
            </div>
            <p class="meta">${memory.date} · ${memory.place} · ${memory.type}</p>
          </section>
          <section class="card linked-diary-section">
            <div class="between">
              <h3>연결된 일기</h3>
              <span class="meta">${linkedDiaries.length}개</span>
            </div>
            ${linkedDiaries.length ? `<div class="linked-diary-list">${linkedDiaryCardsLatest(safeIndex)}</div>` : `<p class="linked-record-empty">연결된 일기가 없습니다.</p>`}
          </section>
          <button class="primary-btn full" data-memory-edit-page data-index="${safeIndex}">기록 수정</button>
        </div>
      </div>
    `);
    qs("#modal").classList.add("page-modal");
    qs("[data-memory-detail-back]")?.addEventListener("click", () => runFlowBack(goBack));
    qs("[data-memory-edit-page]")?.addEventListener("click", () => openMemoryEditPageLatest(safeIndex, () => openMemoryDetailLatestV3(safeIndex, backAction)));
    bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryDetailLatestV3(safeIndex, backAction));
    bindActions(qs(".modal-sheet"));
  };

  window.openMemoryDetailLatestV3 = openMemoryDetailLatestV3;

  if (!window.__duariLinkedDiaryFinalClickGuard) {
    window.__duariLinkedDiaryFinalClickGuard = true;
    window.addEventListener("click", (event) => {
      if (event.target.closest?.("[data-linked-diary-menu], [data-linked-diary-dropdown], .linked-diary-menu-wrap, .linked-diary-right-tools")) return;
      const card = event.target.closest?.(".memory-detail-page [data-linked-diary-index]");
      if (card?.dataset?.disableLinkedDiaryCardOpen === "true") return;
      if (!card) return;
      window.duariOpenLinkedDiaryCard(card, event);
    }, true);

    window.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest?.("[data-linked-diary-menu], [data-linked-diary-dropdown], .linked-diary-menu-wrap, .linked-diary-right-tools")) return;
      const card = event.target.closest?.(".memory-detail-page [data-linked-diary-index]");
      if (card?.dataset?.disableLinkedDiaryCardOpen === "true") return;
      if (!card) return;
      window.duariOpenLinkedDiaryCard(card, event);
    }, true);
  }
})();

(function installTrueFinalQuestionRotationAfterAnswer() {
  const questions = [
    "요즘 나에게 가장 큰 힘이 되는 말은 뭐야?",
    "오늘 하루 중 가장 기억에 남는 순간은 뭐야?",
    "요즘 우리 사이에서 고마웠던 일은 뭐야?",
    "다음에 함께 해보고 싶은 작은 일은 뭐야?",
    "최근에 나에게 전하고 싶었던 마음은 뭐야?",
    "우리의 어떤 습관이 오래 이어졌으면 좋겠어?",
    "지금 가장 듣고 싶은 말은 뭐야?"
  ];
  const storageKey = "duari.currentQuestionIndex";
  const normalizeIndex = (value) => {
    const index = Number(value);
    return Number.isFinite(index) ? ((index % questions.length) + questions.length) % questions.length : 0;
  };
  const answeredQuestions = () => new Set((state.questionHistory || []).map((item) => String(item.question || "").trim()).filter(Boolean));
  const firstUnansweredIndex = (startIndex = 0) => {
    const answered = answeredQuestions();
    for (let offset = 0; offset < questions.length; offset += 1) {
      const index = normalizeIndex(startIndex + offset);
      if (!answered.has(questions[index])) return index;
    }
    return normalizeIndex(startIndex);
  };
  const currentIndex = () => firstUnansweredIndex(normalizeIndex(localStorage.getItem(storageKey) ?? state.currentQuestionIndex));
  const setQuestionIndex = (index) => {
    const nextIndex = normalizeIndex(index);
    state.currentQuestionIndex = nextIndex;
    localStorage.setItem(storageKey, String(nextIndex));
    duariQuestionAnswerDraft.question = questions[nextIndex];
    return questions[nextIndex];
  };
  const refreshQuestionSurfaces = () => {
    const activeTab = qs(".screen.active")?.id || state.tab;
    if (activeTab === "home") renderHome();
    if (activeTab === "diary" && state.journalView === "question") renderDiary();
  };
  window.duariAdvanceTodayQuestion = function duariAdvanceTodayQuestion() {
    const nextQuestion = setQuestionIndex(firstUnansweredIndex(currentIndex() + 1));
    refreshQuestionSurfaces();
    return nextQuestion;
  };
  duariCurrentQuestionText = function duariCurrentQuestionText() {
    return questions[currentIndex()] || questions[0];
  };
  setQuestionIndex(currentIndex());
  if (typeof openQuestionSendConfirmOverlay === "function") {
    const originalOpenQuestionSendConfirmOverlay = openQuestionSendConfirmOverlay;
    openQuestionSendConfirmOverlay = function openQuestionSendConfirmOverlayWithTrueFinalQuestionRotation(...args) {
      const result = originalOpenQuestionSendConfirmOverlay.apply(this, args);
      qs(".question-answer-page [data-question-send-confirm]")?.addEventListener("click", () => {
        window.setTimeout(() => window.duariAdvanceTodayQuestion?.(), 0);
      }, { once: true });
      return result;
    };
  }
})();

(function installTrueFinalSelectedQuestionFlow() {
  if (typeof openQuestionModal !== "function") return;
  const originalOpenQuestionModal = openQuestionModal;
  openQuestionModal = function openQuestionModalWithTrueFinalSelectedQuestion(...args) {
    const selectedQuestion = state.selectedQuestionForAnswer;
    const result = originalOpenQuestionModal.apply(this, args);
    if (selectedQuestion) {
      duariQuestionAnswerDraft.question = selectedQuestion;
      const questionTitle = qs(".question-answer-page .section-stack h3");
      if (questionTitle) questionTitle.textContent = selectedQuestion;
      state.selectedQuestionForAnswer = "";
    }
    return result;
  };
})();

(function installTrueFinalOtherQuestionPool() {
  const questionPool = [
    "요즘 가장 자주 떠오르는 감정은 뭐야?",
    "우리의 작은 습관 중 좋아하는 건?",
    "최근에 고마웠던 순간은?",
    "앞으로 함께 기대하는 일은?",
    "내가 요즘 더 듣고 싶은 말은 뭐야?",
    "다음 데이트에서 꼭 하고 싶은 건?",
    "요즘 나를 웃게 한 우리 순간은 뭐야?",
    "내가 더 잘 표현하고 싶은 마음은 뭐야?",
    "우리에게 새로 만들고 싶은 약속은 뭐야?",
    "함께 쉬고 싶은 날에는 뭘 하고 싶어?",
    "최근에 내가 놓친 네 마음이 있다면 뭐야?",
    "서로에게 더 편안해지려면 뭐가 필요할까?",
    "기억하고 싶은 대화가 있다면 뭐야?",
    "다음에 꼭 같이 먹고 싶은 음식은 뭐야?",
    "내가 해주면 힘이 될 것 같은 일은 뭐야?"
  ];

  const otherQuestionItems = () => {
    const answered = new Set((state.questionHistory || []).map((item) => String(item.question || "").trim()).filter(Boolean));
    const current = typeof duariCurrentQuestionText === "function" ? duariCurrentQuestionText() : "";
    const fresh = questionPool.filter((question) => !answered.has(question) && question !== current);
    const fallback = questionPool.filter((question) => question !== current);
    return (fresh.length ? fresh : fallback).slice(0, 6);
  };

  openAnotherQuestionModal = function openAnotherQuestionPageWithFreshPool() {
    const previousTab = qs(".screen.active")?.id || state.tab || "home";
    const questions = otherQuestionItems();

    openModal(`
      <div class="modal-sheet notification-page another-question-page">
        <header class="notification-header">
          <button class="notification-nav-btn" type="button" data-another-question-back aria-label="뒤로가기">←</button>
          <h3>다른 질문 보기</h3>
          <span class="notification-header-spacer" aria-hidden="true"></span>
        </header>
        <div class="section-stack">
          ${questions.map((question) => `
            <article class="question-history-card">
              <h3>${duariEscapeHtml(question)}</h3>
              <button class="ghost-btn full" type="button" data-question-option="${duariEscapeHtml(question)}">이 질문에 답하기</button>
            </article>
          `).join("")}
        </div>
      </div>
    `);
    qs("#modal").classList.add("page-modal");
    qs("[data-another-question-back]")?.addEventListener("click", () => {
      closeModal();
      setTab(previousTab === "questions" ? "diary" : previousTab);
    });
    qsa("[data-question-option]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedQuestionForAnswer = button.dataset.questionOption || "";
        duariQuestionAnswerDraft.question = state.selectedQuestionForAnswer;
        openQuestionModal();
      });
    });
  };
})();

(function clearQuestionHistoryOnceForRetest() {
  try {
    const resetKey = `${duariContentStorageKey()}.questionHistoryCleared.20260509`;
    if (localStorage.getItem(resetKey)) return;
    state.questionHistory = [];
    localStorage.setItem(resetKey, "1");
    duariSavePersistentContent();
    const activeTab = qs(".screen.active")?.id || state.tab;
    if (activeTab === "diary" && state.journalView === "question") renderDiary();
  } catch {
    state.questionHistory = [];
  }
})();
