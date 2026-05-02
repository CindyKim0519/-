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
  tab: "home",
  albumView: "record",
  diaryView: "shared",
  memories: [
    { title: "성수에서 보낸 오후", date: "2026.04.26", place: "서울숲", type: "데이트", note: "바람이 좋아서 오래 걸었다.", scope: "우리 둘이 보기", feelings: ["편안함", "고마움"], reaction: "또 가자", author: "나" },
    { title: "비 오는 날의 통화", date: "2026.04.21", place: "집", type: "대화", note: "말하기 어려운 것도 천천히 꺼냈다.", scope: "나만 보기", feelings: ["솔직함"], reaction: "", author: "나" },
  ],
  diaries: [
    { title: "오늘 고마웠던 것", body: "작은 말에도 내 편이 있다는 느낌이 들었다.", scope: "공유", feelings: ["고마움", "안정"], linked: "성수에서 보낸 오후", author: "나" },
    { title: "아직 정리 중인 마음", body: "서운했던 일을 바로 말하기보다 조금 더 내 마음을 들여다보기.", scope: "개인", feelings: ["서운함"], linked: "비 오는 날의 통화", author: "나" },
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

const titles = { home: "홈", album: "기록", diary: "일기", questions: "질문", my: "마이" };

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

function memoryPhotoScrollerLatest(count = 7, memoryIndex = Number(state.activeMemoryIndex) || 0) {
  return Array.from({ length: count }, (_, index) => `
    <button class="memory-photo-slide" type="button" data-action="photo-detail" data-memory-index="${memoryIndex}" data-photo-index="${index}" data-photo-back="memory" aria-label="${index + 1}번째 사진">
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
            <span class="memory-photo-count">${photoCount}/30</span>
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
          <div class="between"><h3>사진 관리</h3><span class="meta">7/30</span></div>
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

function memoryPhotoCardsLatest(count = 7) {
  return Array.from({ length: count }, (_, index) => `
    <div class="photo-order-card ${index === 0 ? "is-representative" : ""}" role="button" tabindex="0" data-photo-order-card data-photo-index="${index}">
      <span class="photo-order-number">${index + 1}</span>
      <span class="photo-identity">사진 ${index + 1}</span>
      <span class="photo-role-label">${index === 0 ? "대표" : ""}</span>
    </div>
  `).join("");
}

function bindPhotoRoleSelectionLatest(root) {
  qsa("[data-photo-order-card]", root).forEach((card) => {
    card.addEventListener("click", () => {
      if (card.dataset.dragMoved === "true") return;
      qsa("[data-photo-order-card]", root).forEach((item) => {
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
  openModal(`
    <div class="modal-sheet notification-page memory-detail-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-photo-order-back aria-label="뒤로가기">←</button>
        <h3>사진 순서 변경</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="photo-order-grid">${memoryPhotoCardsLatest(7)}</div>
        <button class="primary-btn full" data-photo-order-back>완료</button>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  const sheet = qs(".modal-sheet");
  qsa("[data-photo-order-back]", sheet).forEach((button) => button.addEventListener("click", () => runWithoutModalHistory(backAction)));
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
  qs("#my").innerHTML = `
    <div class="section-stack">
      <section class="card"><div class="between"><div><p class="eyebrow">계정</p><h3>하린</h3></div><button class="chip-btn" data-action="toggle-connection">${state.connected ? "혼자 상태 보기" : "연결 상태 보기"}</button></div></section>
      <div class="list">${[
        ["계정", "프로필 수정, 로그아웃, 회원 탈퇴", "account"],
        ["관계 관리", "관계 전환, 관계 추가, 이전 커플 보관함", "relation-management"],
        ["커플 설정", "연애 시작일, 기념일, 숨긴 사진 관리, 연결 해제", "couple-settings"],
        ["알림", "질문, 기념일, 반응, 푸시 미리보기", "notification-settings"],
        ["개인정보", "보안 PIN 변경, PIN 재설정", "security"],
        ["고객센터/약관", "문의, FAQ, 약관, 개인정보처리방침", "support"],
      ].map(([title, body, action]) => `<button class="card" data-action="${action}" style="text-align:left"><div class="between"><strong>${title}</strong><span class="meta">열기</span></div><p>${body}</p></button>`).join("")}</div>
      <p class="tiny-note">Duari v0.1.0</p>
    </div>
  `;
  bindActions(qs("#my"));
}

function bindActions(root) {
  root.querySelectorAll("[data-tab-go]").forEach((button) => button.addEventListener("click", () => setTab(button.dataset.tabGo)));
  root.querySelectorAll("[data-action]").forEach((element) => element.addEventListener("click", () => handleAction(element.dataset.action, element)));
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
    "relation-add": openConnectModal,
    "add-anniversary": () => showToast("직접 기념일을 추가했어요. D-7과 D-day 알림을 사용할 수 있어요."),
    "download-photo": () => showToast("다운로드가 완료됐어요."),
    "external-share": () => showToast("공유할 수 있어요. 상대 콘텐츠가 포함되면 동의가 필요합니다."),
    "settings-toggle": (element) => {
      if (!element.classList.contains("chip-btn")) {
        showToast(`${element.textContent.trim()} 흐름을 확인했어요.`);
        return;
      }
      element.classList.toggle("active");
      element.textContent = element.classList.contains("active") ? "켬" : "끔";
    },
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
    account: openAccountModal,
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
  openModal(`<div class="modal-sheet"><div class="between"><h3>커플 설정</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><div class="between"><div><h3>봄이</h3><p>상대 프로필 사진 작게 표시</p></div><span class="chip-btn">프로필</span></div></section><section class="card"><h3>연애 시작일</h3><p>2025.03.05 · 수정 가능</p></section><button class="ghost-btn" data-action="anniversaries">기념일 관리</button><button class="ghost-btn" data-action="relationship-notification-settings">관계별 알림 설정</button><button class="ghost-btn" data-action="album-management">앨범 관리</button><button class="primary-btn" data-action="danger-disconnect">연결 해제</button></div></div>`);
  qs('[data-action="anniversaries"]').addEventListener("click", openAnniversariesModal);
  bindActions(qs(".modal-sheet"));
}

function openAnniversariesModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>기념일 관리</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${state.anniversaries.map((item) => `<section class="card"><div class="between"><strong>${item.name}</strong><span class="meta">${item.date}</span></div><p>${item.repeat ? "매년 반복" : "반복 없음"} · ${item.alert ? "알림 켬" : "알림 끔"}</p></section>`).join("")}<div class="form-field"><label>직접 기념일 이름</label><input placeholder="예: 처음 여행 간 날" /></div><div class="form-field"><label>날짜</label><input value="2026-05-20" /></div><button class="primary-btn full">기념일 추가</button></div></div>`);
}

function openHiddenPhotosModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>숨긴 사진 관리</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>숨김은 내 화면에서만 적용되고 상대에게 알림이 가지 않아요.</p>${state.hiddenPhotos.map((photo) => `<section class="card"><div class="between"><strong>${photo}</strong><button class="chip-btn">복구</button></div></section>`).join("")}<p class="tiny-note">복구 시 확인을 거치고, 다중 선택은 2차 기능입니다.</p></div></div>`);
}

function openNotificationSettingsModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>알림 설정</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${["앱 내부 알림", "휴대폰 푸시", "오늘의 질문 알림", "기념일 알림", "반응 알림", "푸시 미리보기 숨기기"].map((item, index) => `<section class="card"><div class="between"><strong>${item}</strong><span class="chip-btn ${index === 5 ? "" : "active"}">${index === 5 ? "끔" : "켬"}</span></div></section>`).join("")}</div></div>`);
}

function openRelationshipNotificationSettingsModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>관계별 알림 설정</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>현재 관계</h3><p>봄이와 하린 기준으로만 적용됩니다.</p></section>${["기록 알림", "다이어리 알림", "메시지 알림", "기념일 알림", "반응 알림"].map((item) => `<section class="card"><div class="between"><strong>${item}</strong><span class="chip-btn active">켬</span></div></section>`).join("")}</div></div>`);
}

function openAlbumManagementModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>앨범 관리</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>현재 선택된 관계의 앨범 설정입니다.</p><button class="ghost-btn" data-action="hidden-photos">숨긴 사진 관리</button><section class="card"><h3>사진 정책</h3><p>숨김은 내 화면에서만 적용되고 상대에게 알림을 보내지 않습니다.</p></section></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openSecurityModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>보안</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><button class="ghost-btn">비밀번호 변경</button><button class="ghost-btn">앱 보안 PIN 변경</button><button class="ghost-btn">PIN 재설정</button><section class="card"><div class="between"><strong>관계 전환 시 PIN 확인</strong><span class="chip-btn active">켬</span></div></section></div></div>`);
}

function openAccountModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>계정</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="form-field"><label>닉네임</label><input value="하린" /></div><button class="ghost-btn">프로필 사진 변경</button><button class="ghost-btn">프로필 사진 삭제</button><button class="ghost-btn">로그아웃</button><button class="primary-btn" data-action="danger-withdraw">회원 탈퇴</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openSupportModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>고객센터/약관</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="form-field"><label>앱 내 문의</label><textarea placeholder="문의 내용을 남겨주세요."></textarea></div><section class="card"><h3>FAQ</h3><p>사진 권한을 거부해도 사진 없이 기록할 수 있나요? 네, 가능합니다.</p></section><button class="ghost-btn" data-action="error-policy">오류/복구 정책</button><button class="ghost-btn" data-action="terms">이용약관</button><button class="ghost-btn" data-action="privacy-policy">개인정보처리방침</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openTermsModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>이용약관</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>회원가입 동의</h3><p>회원가입 화면에서 필수 약관에 동의합니다.</p></section><section class="card"><h3>마이 하단 확인</h3><p>가입 후에도 고객센터/약관 메뉴에서 언제든 확인할 수 있습니다.</p></section></div></div>`);
}

function openPrivacyPolicyModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>개인정보처리방침</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><h3>개인 데이터</h3><p>개인 일기, 개인 초안, 나만 보기 기록은 상대에게 노출되지 않습니다.</p></section><section class="card"><h3>탈퇴 시</h3><p>계정 정보와 개인 데이터는 삭제되고, 공유 공간 데이터는 탈퇴한 사용자로 남을 수 있습니다.</p></section></div></div>`);
}

function openArchiveModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>이전 커플 보관함</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><p>조회 전용이며 현재 관계와 완전히 분리됩니다. 검색, 외부 공유, 데이터 내보내기는 제공하지 않아요.</p>${["우리 기록", "사진", "공유 일기", "질문/메시지", "정제 메시지", "반응", "기념일"].map((item) => `<section class="card"><div class="between"><strong>${item}</strong><span class="meta">조회 전용</span></div></section>`).join("")}<button class="ghost-btn">사진 다운로드</button><button class="primary-btn" data-action="danger-delete-archive">이전 관계 전체 삭제</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openWithdrawalModal() {
  openPinGate("회원 탈퇴", () => {
    openModal(`<div class="modal-sheet"><div class="between"><h3>회원 탈퇴</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="form-field"><label>탈퇴 사유 설문</label><textarea placeholder="선택 사항"></textarea></div><section class="card"><h3>삭제되는 데이터</h3><p>계정 정보, 개인 일기, 개인 초안, 나만 보기 기록, 개인 설정</p></section><section class="card"><h3>상대 공간에 보존 가능</h3><p>공유 기록, 공유 사진, 공유 일기, 보낸 메시지, 반응은 탈퇴한 사용자로 표시될 수 있어요.</p></section><button class="primary-btn">최종 탈퇴</button></div></div>`);
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

function openSignupModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>회원가입</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="form-field"><label>이메일</label><input placeholder="duari@example.com" /></div><div class="form-field"><label>비밀번호</label><input type="password" /></div><div class="form-field"><label>비밀번호 확인</label><input type="password" /></div><section class="card"><h3>약관 동의</h3><p>이용약관과 개인정보처리방침에 동의한 뒤 가입합니다.</p><div class="chip-row" style="margin-top:10px"><button class="chip-btn active">필수 약관</button><button class="chip-btn active">개인정보</button></div></section><button class="primary-btn full" data-complete-login>가입 후 설정</button></div></div>`);
  qs("[data-complete-login]").addEventListener("click", startSetup);
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

function openRelationManagementModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>관계 관리</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><section class="card"><div class="between"><strong>봄이</strong><span class="chip-btn active">현재 사용 중</span></div><p>전환 후 홈으로 이동합니다.</p></section><section class="card"><div class="between"><strong>이전 관계</strong><span class="meta">보관됨</span></div><p>현재 관계와 완전히 분리됩니다.</p></section><button class="ghost-btn" data-action="relation-add">관계 추가</button><button class="ghost-btn" data-action="previous-archive">이전 커플 보관함</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openAnniversariesModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>기념일 관리</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack">${state.anniversaries.map((item) => `<section class="card"><div class="between"><strong>${item.name}</strong><span class="meta">${item.date}</span></div><p>${item.repeat ? "매년 반복" : "반복 없음"} · ${item.alert ? "알림 켬" : "알림 끔"}</p></section>`).join("")}<div class="form-field"><label>직접 기념일 이름</label><input placeholder="첫 여행 간 날" /></div><div class="form-field"><label>날짜</label><input value="2026-05-20" /></div><button class="primary-btn full" data-action="add-anniversary">기념일 추가</button></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openSecurityModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>보안</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><button class="ghost-btn" data-action="settings-toggle">비밀번호 변경</button><button class="ghost-btn" data-action="settings-toggle">앱 보안 PIN 변경</button><button class="ghost-btn" data-action="settings-toggle">PIN 재설정</button><section class="card"><div class="between"><strong>관계 전환 시 PIN 확인</strong><button class="chip-btn active" data-action="settings-toggle">켬</button></div></section></div></div>`);
  bindActions(qs(".modal-sheet"));
}

function openAccountModal() {
  openModal(`<div class="modal-sheet"><div class="between"><h3>계정</h3><button class="icon-btn" data-close>닫기</button></div><div class="section-stack"><div class="form-field"><label>닉네임</label><input value="하린" /></div><button class="ghost-btn" data-action="settings-toggle">프로필 사진 변경</button><button class="ghost-btn" data-action="settings-toggle">프로필 사진 삭제</button><button class="ghost-btn" data-action="settings-toggle">로그아웃</button><button class="primary-btn" data-action="danger-withdraw">회원 탈퇴</button></div></div>`);
  bindActions(qs(".modal-sheet"));
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

qsa(".login-grid .ghost-btn").forEach((button) => {
  button.addEventListener("click", () => openLoginModal(button.textContent.trim()));
});

qs("#startApp").addEventListener("click", startSetup);
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
          <div class="memory-photo-main"><span class="memory-photo-count">${photoCount}/30</span></div>
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
  const drafts = source.filter((entry) => normalizeDiaryScopeValue(entry.scope || entry.type) === "draft");
  return drafts.length ? drafts : [
    { title: "아직 저장만 해둔 일기", body: "공개 범위와 관련 기록은 저장할 때 다시 선택할 수 있어요.", scope: "draft", type: "임시 저장", feelings: ["고마움"], linked: "관련 기록 없음", author: "나" }
  ];
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
  return {
    heading: qs(".notification-header h3", page)?.textContent || "일기 수정",
    diary: {
      title: qs("#diaryTitle", page)?.value || "",
      body: qs("#diaryBody", page)?.value || "",
      scope: originalScope === "draft" ? "draft" : normalizeDiaryScopeValue(selectedScopeText || originalScope),
      originalScope,
      finalScope: selectedScopeText ? normalizeDiaryScopeValue(selectedScopeText) : null,
      feelings: qsa("[data-diary-feelings] .chip-btn.active", page).map((button) => button.textContent.trim()).slice(0, 2),
      linked: "관련 기록 없음"
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
  qsa("[data-linked-diary-index]", root).forEach((card) => {
    card.addEventListener("click", () => openLinkedDiaryDetailLatest(Number(card.dataset.linkedDiaryIndex), backAction));
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
  const selectedIndex = mode === "create" ? memoryLinkedDiarySelection.create : memoryLinkedDiarySelection.edit[index];
  if (typeof selectedIndex === "number") {
    const diary = linkedDiariesLatest()[selectedIndex] || linkedDiariesLatest()[0];
    return {
      count: 1,
      html: `<div class="linked-diary-list"><article class="linked-diary-card" data-linked-diary-index="${selectedIndex}"><div class="between"><strong>${diary.title}</strong><span class="linked-diary-type">${diary.type}</span></div><p>${diary.body}</p>${linkedDiaryEmotionRow(diary)}</article></div>`
    };
  }
  if (mode === "edit") {
    return { count: 3, html: `<div class="linked-diary-list">${linkedDiaryCardsLatest()}</div>` };
  }
  return { count: 0, html: `<p class="linked-record-empty">연결된 일기가 없습니다.</p>` };
}

function openLinkedDiarySelectPage({ mode = "edit", memoryIndex = null, backAction = null } = {}) {
  const diaries = linkedDiariesLatest();
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

function openMemoryEditPageLatest(index, backAction = null) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  const resolvedBack = backAction || (() => openMemoryDetailLatestV3(index));
  const diarySelection = selectedLinkedDiaryCardsHtml("edit", index);
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
  qs("[data-linked-diary-select]").addEventListener("click", () => openLinkedDiarySelectPage({ mode: "edit", memoryIndex: index, backAction: resolvedBack }));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index, resolvedBack));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function openMemoryCreatePage(backAction = null) {
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
  qs("[data-linked-diary-add]").addEventListener("click", () => openDiaryModal(null));
  qs("[data-linked-diary-select]").addEventListener("click", () => openLinkedDiarySelectPage({ mode: "create", backAction }));
  qs("[data-save-memory-create]").addEventListener("click", () => {
    const title = limitMemoryEditTitle(qs("#memoryTitle")?.value.trim() || "") || "제목 없는 기록";
    const dateValue = qs("#memoryDate")?.value || new Date().toISOString().slice(0, 10);
    const place = qs("#memoryPlace")?.value.trim() || "";
    const type = qs("#memoryType")?.value || "일상";
    const scope = qs("[data-memory-scope] .chip-btn.active")?.textContent.trim() || "나만 보기";
    state.memories.unshift({ title, date: dateValue.replaceAll("-", "."), place, type, note: "", scope, feelings: [], reaction: "", author: "나" });
    memoryLinkedDiarySelection.create = null;
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
    `<button class="ghost-btn" data-photo-order-page>사진 순서 변경</button>`,
    `<button class="ghost-btn" data-photo-add-choice>사진 추가</button>`
  );
}

function recordLinkedDiaryActionsHtml() {
  return actionPairHtml(
    `<button class="ghost-btn" data-linked-diary-select>연결한 일기 선택</button>`,
    `<button class="ghost-btn" data-linked-diary-add>일기 추가</button>`
  );
}

function openMemoryEditPageLatest(index, backAction = null) {
  state.activeMemoryIndex = index;
  const memory = state.memories[index] || state.memories[0];
  const editTitle = limitMemoryEditTitle(memory.title);
  const resolvedBack = backAction || (() => openMemoryDetailLatestV3(index));
  const diarySelection = selectedLinkedDiaryCardsHtml("edit", index);
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
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">7장</span></div><div class="photo-order-grid compact">${memoryPhotoCardsLatest(7)}</div>${recordPhotoActionsHtml()}</section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">${diarySelection.count}개</span></div>${diarySelection.html}${recordLinkedDiaryActionsHtml()}</section>
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
  qs("[data-linked-diary-select]").addEventListener("click", () => openLinkedDiarySelectPage({ mode: "edit", memoryIndex: index, backAction: resolvedBack }));
  bindLinkedDiaryCardsLatest(qs(".modal-sheet"), () => openMemoryEditPageLatest(index, resolvedBack));
  bindPhotoRoleSelectionLatest(qs(".modal-sheet"));
  bindPhotoDragLatest(qs(".modal-sheet"));
  bindActions(qs(".modal-sheet"));
}

function openMemoryCreatePage(backAction = null) {
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
        <div class="form-field"><div class="field-label-row"><label>제목</label><span class="input-count">0/24</span></div><input class="memory-title-input" id="memoryTitle" value="" maxlength="24" /></div>
        <div class="form-field"><label>날짜</label><input id="memoryDate" type="date" value="" /></div>
        <div class="form-field"><label>장소</label><input id="memoryPlace" value="" /></div>
        <div class="form-field"><label>기록 유형</label><select id="memoryType"><option value="" selected></option><option>데이트</option><option>여행</option><option>기념일</option><option>일상</option><option>대화</option><option>마음 기록</option><option>기타</option></select></div>
        <section class="card"><div class="between"><h3>사진 관리</h3><span class="meta">0장</span></div><div class="photo-order-grid compact is-empty"><p class="linked-record-empty photo-empty-line">추가된 사진이 없습니다.</p></div>${recordPhotoActionsHtml()}</section>
        <section class="card linked-diary-section"><div class="between"><h3>연결된 일기</h3><span class="meta">${diarySelection.count}개</span></div>${diarySelection.html}${recordLinkedDiaryActionsHtml()}</section>
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
  qs("[data-linked-diary-select]").addEventListener("click", () => openLinkedDiarySelectPage({ mode: "create", backAction }));
  qs("[data-save-memory-create]").addEventListener("click", () => {
    const title = limitMemoryEditTitle(qs("#memoryTitle")?.value.trim() || "") || "제목 없는 기록";
    const dateValue = qs("#memoryDate")?.value || new Date().toISOString().slice(0, 10);
    const place = qs("#memoryPlace")?.value.trim() || "";
    const type = qs("#memoryType")?.value || "일상";
    const scope = qs("[data-memory-scope] .chip-btn.active")?.textContent.trim() || "나만 보기";
    state.memories.unshift({ title, date: dateValue.replaceAll("-", "."), place, type, note: "", scope, feelings: [], reaction: "", author: "나" });
    memoryLinkedDiarySelection.create = null;
    closeModal();
    render();
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
  return [...added, ...base];
}

function currentDiaryEditorLinkedContext(args = {}) {
  const linkedMemory = typeof args.linkedMemoryIndex === "number" ? state.memories[args.linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || args.diary?.linked || qs(".linked-record-title-text")?.textContent?.trim() || "관련 기록 없음";
  const linkedMemoryIndex = typeof args.linkedMemoryIndex === "number"
    ? args.linkedMemoryIndex
    : (diaryHasLinkedRecord(linkedTitle) ? recordIndexByTitle(linkedTitle, typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0) : null);
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

function memoryCards(memories, homeCompact = false) {
  return memories.map((memory, fallbackIndex) => {
    const index = duariMemoryIndex(memory, fallbackIndex);
    return `
      <article class="memory-card ${homeCompact ? "home-memory-card" : ""}" role="button" tabindex="0" data-index="${index}" data-memory-open="${index}">
        <div class="photo-stack" aria-label="사진 미리보기"></div>
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
          <h3>최근 우리 기록</h3>
          <button class="primary-btn full" data-action="new-memory">기록 추가</button>
        </section>
        <section class="diary-card">
          <h3>최근 공유 일기</h3>
          <p>연결 전에는 공유 일기를 사용할 수 없어요.</p>
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

  const sharedDiaries = state.diaries
    .filter((diary) => normalizeDiaryScopeValue(diary.scope) === "공유")
    .slice(0, 2);
  const homeSharedDiaryCards = sharedDiaries.length
    ? sharedDiaries.map((diary, index) => `
        <article class="linked-diary-card home-shared-diary-card" role="button" tabindex="0" data-home-shared-diary-index="${index}">
          <div class="between">
            <strong>${diary.title || "제목 없는 일기"}</strong>
            <span class="linked-diary-type">내 공유</span>
          </div>
          <p>${diary.body || "작성된 내용이 없습니다."}</p>
          <div class="tag-row">${(diary.feelings || []).slice(0, 2).map((feeling) => `<span class="chip-btn">${feeling}</span>`).join("")}</div>
        </article>
      `).join("")
    : `<p>아직 공유 일기가 없어요.</p>`;
  home.innerHTML = `
    <div class="section-stack">
      <section class="hero-card home-hero">
        <div class="between">
          <div>
            <p class="relationship-name">봄이 & 하린</p>
            <h3 class="together-days"><span>함께한 지 </span><strong class="together-days-number">421</strong><span>일</span></h3>
          </div>
          <span class="anniversary-pill">D-7 여행 1주년</span>
        </div>
      </section>
      <section class="card home-records-card">
        <div class="between">
          <h3>최근 우리 기록</h3>
          <button class="chip-btn" data-tab-go="album">더보기</button>
        </div>
        <div class="list">${memoryCards(state.memories.slice(0, 2), true)}</div>
        <button class="primary-btn full" data-action="new-memory">기록 추가</button>
      </section>
      <section class="diary-card home-shared-diary-section">
        <div class="between">
          <h3>최근 공유 일기</h3>
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
            <div class="memory-photo-scroll">${memoryPhotoScrollerLatest(7)}</div>
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
  const linkedTitle =
    qs(".linked-record-title-text", page)?.textContent?.trim() ||
    qs(".linked-record-pill span", page)?.textContent?.trim() ||
    fallback.linked ||
    "관련 기록 없음";
  const linkedMemoryIndex = typeof fallback.linkedMemoryIndex === "number"
    ? fallback.linkedMemoryIndex
    : (diaryHasLinkedRecord?.(linkedTitle) ? recordIndexByTitle(linkedTitle, typeof state.activeMemoryIndex === "number" ? state.activeMemoryIndex : 0) : null);

  return {
    heading: duariNormalizeDiaryHeading(qs(".notification-header h3", page)?.textContent || fallback.heading),
    title: qs("#diaryTitle", page)?.value || fallback.title || "",
    body: qs("#diaryBody", page)?.value || fallback.body || "",
    scope: activeScope?.includes("상대") ? "공유" : (fallback.scope || "개인"),
    feelings: qsa("[data-diary-feelings] .chip-btn.active", page).map((button) => button.textContent.trim()).slice(0, 2),
    linked: linkedTitle,
    linkedMemoryIndex,
    backAction: fallback.backAction || diaryEditorFlowBackAction
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
    openMemoryCreatePage(() => renderDiaryEditor({ heading: draft.heading, diary: draft, linkedMemoryIndex: draft.linkedMemoryIndex, backAction: draft.backAction }));
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
}

renderDiaryEditor = function renderDiaryEditor(args = {}) {
  const heading = duariNormalizeDiaryHeading(args.heading);
  const diary = args.diary || {};
  const isEditMode = heading === "일기 수정";
  const linkedMemory = typeof args.linkedMemoryIndex === "number" ? state.memories[args.linkedMemoryIndex] : null;
  const linkedTitle = linkedMemory?.title || diary.linked || "관련 기록 없음";
  const title = String(diary.title || "").slice(0, 24);
  const body = diary.body || "";
  const scope = normalizeDiaryScopeValue?.(diary.scope || diary.originalScope || "개인") || "개인";
  const feelings = diary.feelings || [];

  openModal(`
    <div class="modal-sheet notification-page diary-write-page">
      <header class="notification-header">
        <button class="notification-nav-btn" data-duari-diary-back aria-label="뒤로가기">←</button>
        <h3>${heading}</h3>
        <span class="notification-header-spacer" aria-hidden="true"></span>
      </header>
      <div class="section-stack">
        <div class="chip-row" data-diary-scope data-original-scope="${scope}">
          <button class="chip-btn ${scope !== "공유" ? "active" : ""}" type="button">나만 보기</button>
          <button class="chip-btn ${scope === "공유" ? "active" : ""} ${state.connected ? "" : "is-disabled"}" type="button" ${state.connected ? "" : "disabled"}>상대에게 공유</button>
        </div>
        <div class="form-field">
          <div class="field-label-row">
            <label>제목</label>
            <span class="input-count" data-diary-title-count>${title.length}/24</span>
          </div>
          <input id="diaryTitle" value="${duariEscapeHtml(title)}" maxlength="24" />
        </div>
        <div class="form-field">
          <label>본문</label>
          <textarea id="diaryBody" class="diary-body-large" placeholder="오늘의 마음을 적어보세요.">${duariEscapeHtml(body)}</textarea>
        </div>
        <div class="form-field">
          <label>내 감정</label>
          ${emotionChipRow(["고마움", "안정", "서운함", "그리움", "기대"], feelings, "data-diary-feelings")}
        </div>
        ${duariLinkedRecordEditorHtml(linkedTitle, args.linkedMemoryIndex)}
        <div class="${isEditMode ? "diary-editor-action-row" : "diary-editor-action-stack"}">
          <button class="ghost-btn ${isEditMode ? "" : "full"}" type="button" data-duari-ai-message>AI로 정리하기</button>
          ${isEditMode ? `<button class="primary-btn" type="button" data-save-diary>수정 저장</button>` : `<button class="ghost-btn full" type="button" data-save-original-diary>원본으로 저장</button><button class="primary-btn full" type="button" data-save-draft-diary>임시 저장</button>`}
        </div>
      </div>
    </div>
  `);
  qs("#modal").classList.add("page-modal");
  duariBindDiaryEditor({ ...args, heading });
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

function openDiaryModal(linkedMemoryIndex = null) {
  const linkedMemory = typeof linkedMemoryIndex === "number" ? state.memories[linkedMemoryIndex] : null;
  renderDiaryEditor({
    heading: "일기 추가",
    diary: linkedMemory ? { linked: linkedMemory.title, scope: "개인" } : { scope: "개인" },
    linkedMemoryIndex,
    backAction: typeof linkedMemoryIndex === "number"
      ? (() => openMemoryEditPageLatest(linkedMemoryIndex, () => openMemoryDetailLatestV3(linkedMemoryIndex)))
      : diaryEditorFlowBackAction
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
  const added = typeof memoryLinkedAddedDiaries !== "undefined" ? (memoryLinkedAddedDiaries[activeIndex] || []) : [];
  return [...added, ...duariDefaultLinkedDiaries].slice(0, 6);
}

window.linkedDiariesLatest = linkedDiariesLatest;

function duariHomeSharedDiaries() {
  return state.diaries
    .filter((diary) => normalizeDiaryScopeValue(diary.scope) === "공유")
    .slice(0, 2);
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
    duariQuestionAnswerDraft.body = qs("#questionAiResultText")?.value || cleanResult;
    openQuestionModal();
    showToast("AI 결과를 답변 본문에 저장했어요.");
  });
}

function duariAlbumFilterMemories({ query = "", date = "", type = "전체" } = {}) {
  const normalizedQuery = String(query || "").trim().toLowerCase();
  return state.memories.filter((memory) => {
    const matchesQuery = !normalizedQuery || [memory.title, memory.place, memory.type].some((value) => String(value || "").toLowerCase().includes(normalizedQuery));
    const matchesDate = !date || toDateInputValue(memory.date) === date;
    const matchesType = type === "전체" || memory.type === type;
    return matchesQuery && matchesDate && matchesType;
  });
}

const DUARI_ALBUM_RECORD_PAGE_SIZE = 10;

function duariAlbumRecordPageInfo(memories = state.memories) {
  const totalPages = Math.max(1, Math.ceil(memories.length / DUARI_ALBUM_RECORD_PAGE_SIZE));
  const currentPage = Math.min(Math.max(Number(state.albumRecordPage) || 1, 1), totalPages);
  const start = (currentPage - 1) * DUARI_ALBUM_RECORD_PAGE_SIZE;
  state.albumRecordPage = currentPage;
  return {
    currentPage,
    totalPages,
    pageMemories: memories.slice(start, start + DUARI_ALBUM_RECORD_PAGE_SIZE)
  };
}

function renderAlbumRecordPage(memories = state.memories) {
  const { currentPage, totalPages, pageMemories } = duariAlbumRecordPageInfo(memories);
  return {
    html: pageMemories.length ? memoryCards(pageMemories) : `<p class="linked-record-empty">조건에 맞는 기록이 없습니다.</p>`,
    currentPage,
    totalPages
  };
}

function renderAlbumPhotoGroups(memories = state.memories) {
  if (!memories.length) return `<p class="linked-record-empty">조건에 맞는 사진이 없습니다.</p>`;
  const groups = memories.reduce((acc, memory) => {
    const date = memory.date || "날짜 없음";
    if (!acc.has(date)) acc.set(date, []);
    acc.get(date).push(memory);
    return acc;
  }, new Map());
  return Array.from(groups.entries()).map(([date, groupMemories]) => {
    const groupPhotoCount = groupMemories.reduce((sum, memory) => sum + (state.memories.indexOf(memory) === 0 ? 7 : 4), 0);
    return `
      <section class="album-photo-date-group">
        <div class="album-photo-date-head">
          <h3>${date}</h3>
          <span class="meta">${groupPhotoCount}장</span>
        </div>
        ${groupMemories.map((memory) => {
          const memoryIndex = state.memories.indexOf(memory);
          const photoCount = memoryIndex === 0 ? 7 : 4;
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
                ${Array.from({ length: photoCount }, (_, photoIndex) => `
                  <button class="album-photo-thumb" type="button" data-action="photo-detail" data-memory-index="${memoryIndex}" data-photo-index="${photoIndex}" aria-label="${memory.title} ${photoIndex + 1}번째 사진">
                    <span>${photoIndex + 1}</span>
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
  const raw = String(memory?.date || "");
  const match = raw.match(/(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);
  if (!match) return "";
  return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
}

function duariCalendarState() {
  const fallback = duariMemoryDateValue(state.memories[0]) || "2026-04-01";
  const fallbackMonth = fallback.slice(0, 7);
  if (!state.calendarMonth) state.calendarMonth = fallbackMonth;
  if (!state.calendarSelectedDate) state.calendarSelectedDate = fallback;
  return {
    month: state.calendarMonth,
    selectedDate: state.calendarSelectedDate
  };
}

function duariCalendarMonthLabel(monthValue) {
  const [year, month] = String(monthValue || "").split("-");
  return `${year}년 ${Number(month)}월`;
}

function duariCalendarShiftMonth(amount) {
  const { month } = duariCalendarState();
  const [year, monthNumber] = month.split("-").map(Number);
  const next = new Date(year, monthNumber - 1 + amount, 1);
  const nextMonth = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
  const firstMemory = state.memories.find((memory) => duariMemoryDateValue(memory).startsWith(nextMonth));
  state.calendarMonth = nextMonth;
  state.calendarSelectedDate = duariMemoryDateValue(firstMemory) || `${nextMonth}-01`;
}

function renderAlbumCalendar() {
  const { month, selectedDate } = duariCalendarState();
  const [year, monthNumber] = month.split("-").map(Number);
  const firstDay = new Date(year, monthNumber - 1, 1);
  const daysInMonth = new Date(year, monthNumber, 0).getDate();
  const leadingBlankCount = firstDay.getDay();
  const todayValue = "2026-05-02";
  const memoriesByDate = state.memories.reduce((acc, memory) => {
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
        ${selectedMemories.length ? memoryCards(selectedMemories) : `<p class="linked-record-empty">선택한 날짜에 기록이 없습니다.</p>`}
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
  const views = ["record", "photo", "calendar"];
  const labels = { record: "기록", photo: "사진", calendar: "캘린더" };
  const currentView = views.includes(state.albumView) ? state.albumView : "record";
  const recordTypes = ["데이트", "여행", "기념일", "일상", "대화", "마음 기록", "기타"];
  state.albumView = currentView;

  let content = "";
  if (currentView === "record") {
    const recordPage = renderAlbumRecordPage(state.memories);
    content = `
      <div class="album-record-toolbar">
        <div class="between">
          <span class="meta" data-record-count>총 ${state.memories.length}개</span>
          <button class="primary-btn" type="button" data-action="new-memory">새 기록 추가</button>
        </div>
      </div>
      <div class="list album-record-list" data-album-record-list>${recordPage.html}</div>
      <nav class="record-pagination" aria-label="기록 페이지">
        <button class="chip-btn icon-only" type="button" data-record-page-prev ${recordPage.currentPage <= 1 ? "disabled" : ""} aria-label="이전">‹</button>
        <span class="meta" data-record-page-label>${recordPage.currentPage} / ${recordPage.totalPages}</span>
        <button class="chip-btn icon-only" type="button" data-record-page-next ${recordPage.currentPage >= recordPage.totalPages ? "disabled" : ""} aria-label="다음">›</button>
      </nav>
    `;
  }
  if (currentView === "photo") {
    content = `
      <div class="album-photo-summary">
        <span class="meta" data-photo-count>총 ${state.memories.reduce((sum, _memory, index) => sum + (index === 0 ? 7 : 4), 0)}장</span>
      </div>
      <div class="album-photo-groups" data-album-photo-groups>${renderAlbumPhotoGroups(state.memories)}</div>
    `;
  }
  if (currentView === "calendar") {
    content = renderAlbumCalendar();
  }

  album.innerHTML = `
    <div class="section-stack">
      <div class="tabs">
        ${views.map((view) => `<button class="chip-btn ${currentView === view ? "active" : ""}" type="button" data-album-view="${view}">${labels[view]}</button>`).join("")}
      </div>
      ${currentView === "record" || currentView === "photo" ? `
        <div class="form-field">
          <label for="albumSearch">기록 검색</label>
          <input id="albumSearch" placeholder="제목, 장소, 기록 유형" />
        </div>
      ` : ""}
      ${currentView === "record" || currentView === "photo" ? `
        <div class="album-filter-grid">
          <div class="form-field">
            <label for="albumDateFilter">날짜</label>
            <input id="albumDateFilter" type="date" />
          </div>
          <div class="form-field">
            <label for="albumTypeFilter">기록 유형</label>
            <select id="albumTypeFilter">
              <option>전체</option>
              ${recordTypes.map((type) => `<option>${type}</option>`).join("")}
            </select>
          </div>
        </div>
      ` : ""}
      ${content}
    </div>
  `;
  qsa("[data-album-view]", album).forEach((button) => {
    button.addEventListener("click", () => {
      state.albumView = button.dataset.albumView;
      renderAlbum();
    });
  });
  if (currentView === "record" || currentView === "photo") {
    const searchInput = qs("#albumSearch", album);
    const dateInput = qs("#albumDateFilter", album);
    const typeSelect = qs("#albumTypeFilter", album);
    let filteredRecords = state.memories;
    const renderRecordPagination = (filtered) => {
      const recordPage = renderAlbumRecordPage(filtered);
      qs("[data-album-record-list]", album).innerHTML = recordPage.html;
      qs("[data-record-count]", album).textContent = `총 ${filtered.length}개`;
      qs("[data-record-page-label]", album).textContent = `${recordPage.currentPage} / ${recordPage.totalPages}`;
      qs("[data-record-page-prev]", album).disabled = recordPage.currentPage <= 1;
      qs("[data-record-page-next]", album).disabled = recordPage.currentPage >= recordPage.totalPages;
    };
    const applyFilters = () => {
      const filtered = duariAlbumFilterMemories({
        query: searchInput?.value,
        date: dateInput?.value,
        type: typeSelect?.value || "전체"
      });
      filteredRecords = filtered;
      if (currentView === "record") {
        state.albumRecordPage = 1;
        renderRecordPagination(filtered);
      }
      if (currentView === "photo") {
        const totalPhotos = filtered.reduce((sum, memory) => sum + (state.memories.indexOf(memory) === 0 ? 7 : 4), 0);
        qs("[data-album-photo-groups]", album).innerHTML = renderAlbumPhotoGroups(filtered);
        qs("[data-photo-count]", album).textContent = `총 ${totalPhotos}장`;
      }
    };
    [searchInput, dateInput, typeSelect].forEach((input) => {
      input?.addEventListener("input", applyFilters);
      input?.addEventListener("change", applyFilters);
    });
    qs("[data-record-page-prev]", album)?.addEventListener("click", () => {
      state.albumRecordPage = (Number(state.albumRecordPage) || 1) - 1;
      renderRecordPagination(filteredRecords);
      bindActions(album);
    });
    qs("[data-record-page-next]", album)?.addEventListener("click", () => {
      state.albumRecordPage = (Number(state.albumRecordPage) || 1) + 1;
      renderRecordPagination(filteredRecords);
      bindActions(album);
    });
  }
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
  return Number(index) === 0 ? 7 : 4;
}

function openPhotoDetail(trigger = null) {
  const requestedMemoryIndex = Number(trigger?.dataset?.memoryIndex);
  const requestedPhotoIndex = Number(trigger?.dataset?.photoIndex);
  const memoryIndex = Number.isFinite(requestedMemoryIndex) ? requestedMemoryIndex : Number(state.activeMemoryIndex) || 0;
  const photoCount = duariPhotoCountForMemory(memoryIndex);
  const photoIndex = Math.min(Math.max(Number.isFinite(requestedPhotoIndex) ? requestedPhotoIndex : Number(state.activePhotoIndex) || 0, 0), photoCount - 1);
  const memory = state.memories[memoryIndex] || state.memories[0];
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
        <section class="photo-detail-viewer" aria-label="${memory.title} 사진 ${photoIndex + 1}">
          <button class="photo-detail-chevron" type="button" data-photo-prev ${photoIndex <= 0 ? "disabled" : ""} aria-label="이전 사진">‹</button>
          <div class="photo-detail-image"></div>
          <button class="photo-detail-chevron" type="button" data-photo-next ${photoIndex >= photoCount - 1 ? "disabled" : ""} aria-label="다음 사진">›</button>
        </section>
        <p class="photo-detail-count">${photoIndex + 1} / ${photoCount}</p>
        <div class="inline-action-pair">
          <button class="primary-btn" type="button" data-action="download-photo">다운로드</button>
          <button class="ghost-btn" type="button" data-action="delete-photo-confirm">삭제</button>
        </div>
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
  qs("[data-photo-prev]")?.addEventListener("click", () => openPhotoDetail({ dataset: { memoryIndex: String(memoryIndex), photoIndex: String(photoIndex - 1), photoBack: backTarget } }));
  qs("[data-photo-next]")?.addEventListener("click", () => openPhotoDetail({ dataset: { memoryIndex: String(memoryIndex), photoIndex: String(photoIndex + 1), photoBack: backTarget } }));
  bindActions(qs("#modal"));
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
    duariQuestionAnswerDraft.body = qs("#questionAiResultText")?.value || cleanResult;
    openQuestionModal();
    showToast("AI 결과를 답변 본문에 저장했어요.");
  });
}
