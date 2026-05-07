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
    qsa("[data-linked-diary-index]", root).forEach((card) => {
      const open = () => {
        window.duariOpenLinkedDiaryCard(card, null, backAction);
      };
      card.addEventListener("click", open);
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        open();
      });
    });
  };

  window.duariOpenLinkedDiaryCard = function duariOpenLinkedDiaryCard(card, event = null, backAction = null) {
    if (!card) return;
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
      const card = event.target.closest?.(".memory-detail-page [data-linked-diary-index]");
      if (!card) return;
      window.duariOpenLinkedDiaryCard(card, event);
    }, true);

    window.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const card = event.target.closest?.(".memory-detail-page [data-linked-diary-index]");
      if (!card) return;
      window.duariOpenLinkedDiaryCard(card, event);
    }, true);
  }
})();
