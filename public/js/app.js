/**
 * HACK NÃO 1500 - FRONTEND APPLICATION SCRIPT
 * Full CRUD, Live Search, Filter, Modal Management, Flashcard, Quiz, TTS
 */

// Application State
const state = {
  items: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1
  },
  filters: {
    q: '',
    unit: 'all',
    category: 'all',
    word_type: 'all',
    status: 'all',
    sort_by: 'id',
    order: 'ASC'
  },
  viewMode: localStorage.getItem('hacknao_view_mode') || 'grid',
  theme: localStorage.getItem('hacknao_theme') || 'dark',
  currentDetailItem: null,
  deleteTargetId: null,
  deleteTargetName: '',
  dbConnected: true,
  // Flashcard state
  flashcards: [],
  fcIndex: 0,
  fcFlipped: false,
  // Quiz state
  quizList: [],
  quizIndex: 0,
  quizScore: 0,
  currentQuestion: null,
  importFileData: null
};

// DOM Elements
const DOM = {
  // Banner
  dbBanner: document.getElementById('db-alert-banner'),
  btnReconnectDb: document.getElementById('btn-reconnect-db'),

  // Header & Global Controls
  globalSearchInput: document.getElementById('global-search-input'),
  btnClearSearch: document.getElementById('btn-clear-search'),
  btnThemeToggle: document.getElementById('btn-theme-toggle'),
  btnOpenCreateModal: document.getElementById('btn-open-create-modal'),
  btnFlashcardMode: document.getElementById('btn-flashcard-mode'),
  btnQuizMode: document.getElementById('btn-quiz-mode'),
  btnPdfViewer: document.getElementById('btn-pdf-viewer'),
  btnToolsMenu: document.getElementById('btn-tools-menu'),
  toolsDropdown: document.getElementById('tools-dropdown'),
  btnExportJson: document.getElementById('btn-export-json'),
  btnOpenImport: document.getElementById('btn-open-import'),
  btnResetData: document.getElementById('btn-reset-data'),

  // Stats
  statTotal: document.getElementById('stat-total'),
  statUnitsCount: document.getElementById('stat-units-count'),
  statMastered: document.getElementById('stat-mastered'),
  statProgressBar: document.getElementById('stat-progress-bar'),
  statPercent: document.getElementById('stat-percent'),
  statLearning: document.getElementById('stat-learning'),
  statNew: document.getElementById('stat-new'),

  // Filters & Toolbar
  filterUnit: document.getElementById('filter-unit'),
  filterCategory: document.getElementById('filter-category'),
  filterWordType: document.getElementById('filter-word-type'),
  filterStatus: document.getElementById('filter-status'),
  btnResetFilters: document.getElementById('btn-reset-filters'),
  sortBy: document.getElementById('sort-by'),
  btnViewGrid: document.getElementById('btn-view-grid'),
  btnViewTable: document.getElementById('btn-view-table'),
  activeFiltersBar: document.getElementById('active-filters-bar'),
  filterTagsContainer: document.getElementById('filter-tags-container'),

  // Views & States
  loadingState: document.getElementById('loading-state'),
  emptyState: document.getElementById('empty-state'),
  btnEmptyReset: document.getElementById('btn-empty-reset'),
  vocabGridView: document.getElementById('vocab-grid-view'),
  vocabTableView: document.getElementById('vocab-table-view'),
  vocabTableBody: document.getElementById('vocab-table-body'),

  // Pagination
  paginationWrapper: document.getElementById('pagination-wrapper'),
  pageItemRange: document.getElementById('page-item-range'),
  pageTotalItems: document.getElementById('page-total-items'),
  btnPagePrev: document.getElementById('btn-page-prev'),
  btnPageNext: document.getElementById('btn-page-next'),
  pageNumbersContainer: document.getElementById('page-numbers-container'),
  selectLimit: document.getElementById('select-limit'),

  // Detail Modal
  modalDetail: document.getElementById('modal-detail'),
  modalDetailUnit: document.getElementById('modal-detail-unit'),
  modalDetailCategory: document.getElementById('modal-detail-category'),
  modalDetailWord: document.getElementById('modal-detail-word'),
  modalDetailPhonetic: document.getElementById('modal-detail-phonetic'),
  modalDetailType: document.getElementById('modal-detail-type'),
  btnDetailSpeak: document.getElementById('btn-detail-speak'),
  modalDetailStatusSelect: document.getElementById('modal-detail-status-select'),
  modalDetailMeaning: document.getElementById('modal-detail-meaning'),
  modalDetailBridge: document.getElementById('modal-detail-bridge'),
  modalDetailDefinition: document.getElementById('modal-detail-definition'),
  modalDetailExampleEn: document.getElementById('modal-detail-example-en'),
  btnExampleSpeak: document.getElementById('btn-example-speak'),
  modalDetailExampleVi: document.getElementById('modal-detail-example-vi'),
  modalDetailNumber: document.getElementById('modal-detail-number'),
  modalDetailPage: document.getElementById('modal-detail-page'),
  modalDetailNote: document.getElementById('modal-detail-note'),
  btnDetailViewPdfPage: document.getElementById('btn-detail-view-pdf-page'),
  btnDetailEdit: document.getElementById('btn-detail-edit'),
  btnDetailDelete: document.getElementById('btn-detail-delete'),

  // Form Modal (Create / Edit)
  modalForm: document.getElementById('modal-form'),
  modalFormTitle: document.getElementById('modal-form-title'),
  vocabForm: document.getElementById('vocab-form'),
  formItemId: document.getElementById('form-item-id'),
  formWord: document.getElementById('form-word'),
  formPhonetic: document.getElementById('form-phonetic'),
  formWordType: document.getElementById('form-word-type'),
  formMeaningVi: document.getElementById('form-meaning-vi'),
  formSoundBridge: document.getElementById('form-sound-bridge'),
  formDefinitionEn: document.getElementById('form-definition-en'),
  formExampleEn: document.getElementById('form-example-en'),
  formExampleVi: document.getElementById('form-example-vi'),
  formUnit: document.getElementById('form-unit'),
  formUnitTitle: document.getElementById('form-unit-title'),
  formCategory: document.getElementById('form-category'),
  formPageNumber: document.getElementById('form-page-number'),
  formStatus: document.getElementById('form-status'),
  formNote: document.getElementById('form-note'),
  btnSaveVocab: document.getElementById('btn-save-vocab'),

  // Delete Modal
  modalDelete: document.getElementById('modal-delete'),
  deleteWordName: document.getElementById('delete-word-name'),
  btnConfirmDelete: document.getElementById('btn-confirm-delete'),

  // Flashcard Modal
  modalFlashcard: document.getElementById('modal-flashcard'),
  flashcardProgressText: document.getElementById('flashcard-progress-text'),
  flashcardElement: document.getElementById('flashcard-element'),
  fcFrontUnit: document.getElementById('fc-front-unit'),
  fcFrontType: document.getElementById('fc-front-type'),
  fcFrontWord: document.getElementById('fc-front-word'),
  fcFrontPhonetic: document.getElementById('fc-front-phonetic'),
  btnFcSpeak: document.getElementById('btn-fc-speak'),
  fcBackMeaning: document.getElementById('fc-back-meaning'),
  fcBackBridge: document.getElementById('fc-back-bridge'),
  fcBackExampleEn: document.getElementById('fc-back-example-en'),
  fcBackExampleVi: document.getElementById('fc-back-example-vi'),
  btnFcPrev: document.getElementById('btn-fc-prev'),
  btnFcNext: document.getElementById('btn-fc-next'),
  btnFcFlip: document.getElementById('btn-fc-flip'),
  btnFcMaster: document.getElementById('btn-fc-master'),

  // Quiz Modal
  modalQuiz: document.getElementById('modal-quiz'),
  quizScore: document.getElementById('quiz-score'),
  quizQuestionNum: document.getElementById('quiz-question-num'),
  quizQuestionPrompt: document.getElementById('quiz-question-prompt'),
  quizTargetText: document.getElementById('quiz-target-text'),
  quizHintBridge: document.getElementById('quiz-hint-bridge'),
  quizHintText: document.getElementById('quiz-hint-text'),
  quizOptionsContainer: document.getElementById('quiz-options-container'),
  quizFeedback: document.getElementById('quiz-feedback'),
  btnQuizHint: document.getElementById('btn-quiz-hint'),
  btnQuizNext: document.getElementById('btn-quiz-next'),

  // PDF Modal
  modalPdf: document.getElementById('modal-pdf'),
  pdfPageImage: document.getElementById('pdf-page-image'),
  pdfCurrentPageBadge: document.getElementById('pdf-current-page-badge'),
  pdfPageSelect: document.getElementById('pdf-page-select'),
  btnPdfPrev: document.getElementById('btn-pdf-prev'),
  btnPdfNext: document.getElementById('btn-pdf-next'),

  // Import Modal
  modalImport: document.getElementById('modal-import'),
  importDropzone: document.getElementById('import-dropzone'),
  importFileInput: document.getElementById('import-file-input'),
  importPreviewInfo: document.getElementById('import-preview-info'),
  importFilename: document.getElementById('import-filename'),
  importFileCount: document.getElementById('import-file-count'),
  btnSubmitImport: document.getElementById('btn-submit-import'),

  // Toasts
  toastContainer: document.getElementById('toast-container')
};

/* =========================================================
   SPEECH SYNTHESIS (Phát Âm Tiếng Anh)
   ========================================================= */
function playAudio(text, lang = 'en-US') {
  if (!('speechSynthesis' in window)) {
    showToast('Trình duyệt không hỗ trợ Web Speech API', 'info');
    return;
  }
  window.speechSynthesis.cancel(); // Stop any pending speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // Slightly slower for clear learning
  window.speechSynthesis.speak(utterance);
}

/* =========================================================
   TOAST NOTIFICATION HELPER
   ========================================================= */
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';
  if (type === 'info') icon = 'fa-circle-info';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* =========================================================
   API CALLS
   ========================================================= */

// Check Database Connection Health
async function checkDbConnection() {
  try {
    const res = await fetch('/api/vocabularies/status');
    const data = await res.json();
    if (data.status && data.status.connected) {
      DOM.dbBanner.classList.add('hidden');
      state.dbConnected = true;
    } else {
      DOM.dbBanner.classList.remove('hidden');
      state.dbConnected = false;
    }
  } catch (err) {
    DOM.dbBanner.classList.remove('hidden');
    state.dbConnected = false;
  }
}

// Fetch Filter Options (Units & Categories)
async function fetchFilterOptions() {
  try {
    const res = await fetch('/api/vocabularies/filters');
    const result = await res.json();
    if (result.success) {
      // Units
      const currentUnit = DOM.filterUnit.value;
      DOM.filterUnit.innerHTML = '<option value="all">Tất cả Unit</option>';
      result.data.units.forEach(u => {
        const opt = document.createElement('option');
        opt.value = u.unit;
        opt.textContent = `Unit ${u.unit} - ${u.title}`;
        DOM.filterUnit.appendChild(opt);
      });
      DOM.filterUnit.value = currentUnit;

      // Categories
      const currentCategory = DOM.filterCategory.value;
      DOM.filterCategory.innerHTML = '<option value="all">Tất cả Chủ đề</option>';
      result.data.categories.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        DOM.filterCategory.appendChild(opt);
      });
      DOM.filterCategory.value = currentCategory;
    }
  } catch (err) {
    console.error('Error fetching filter options:', err);
  }
}

// Fetch Dashboard Statistics
async function fetchStats() {
  try {
    const res = await fetch('/api/vocabularies/stats');
    const result = await res.json();
    if (result.success) {
      const { total, mastered, learning, new: newCount, masteredPercent, unitsCount } = result.data;
      DOM.statTotal.textContent = total;
      DOM.statUnitsCount.textContent = `${unitsCount} Units`;
      DOM.statMastered.textContent = mastered;
      DOM.statLearning.textContent = learning;
      DOM.statNew.textContent = newCount;
      DOM.statPercent.textContent = `${masteredPercent}%`;
      DOM.statProgressBar.style.width = `${masteredPercent}%`;
    }
  } catch (err) {
    console.error('Error fetching stats:', err);
  }
}

// Fetch Vocabularies List with Filters & Pagination
async function fetchVocabularies() {
  showLoading(true);
  try {
    const params = new URLSearchParams({
      q: state.filters.q,
      unit: state.filters.unit,
      category: state.filters.category,
      word_type: state.filters.word_type,
      status: state.filters.status,
      page: state.pagination.page,
      limit: state.pagination.limit,
      sort_by: state.filters.sort_by,
      order: state.filters.order
    });

    const res = await fetch(`/api/vocabularies?${params.toString()}`);
    const result = await res.json();

    if (result.success) {
      DOM.dbBanner.classList.add('hidden');
      state.items = result.data;
      state.pagination = result.pagination;
      renderVocabularies();
      renderPagination();
      renderActiveFilters();
    } else {
      if (result.dbStatus && !result.dbStatus.connected) {
        DOM.dbBanner.classList.remove('hidden');
      }
      showToast(result.message || 'Lỗi khi lấy dữ liệu', 'error');
      renderEmptyState();
    }
  } catch (err) {
    console.error('Fetch error:', err);
    DOM.dbBanner.classList.remove('hidden');
    renderEmptyState();
  } finally {
    showLoading(false);
  }
}

/* =========================================================
   UI RENDERING FUNCTIONS
   ========================================================= */

function showLoading(isLoading) {
  if (isLoading) {
    DOM.loadingState.classList.remove('hidden');
    DOM.emptyState.classList.add('hidden');
    DOM.vocabGridView.classList.add('hidden');
    DOM.vocabTableView.classList.add('hidden');
  } else {
    DOM.loadingState.classList.add('hidden');
  }
}

function renderEmptyState() {
  DOM.emptyState.classList.remove('hidden');
  DOM.vocabGridView.classList.add('hidden');
  DOM.vocabTableView.classList.add('hidden');
  DOM.pageItemRange.textContent = '0-0';
  DOM.pageTotalItems.textContent = '0';
  DOM.pageNumbersContainer.innerHTML = '';
}

function renderVocabularies() {
  if (!state.items || state.items.length === 0) {
    renderEmptyState();
    return;
  }

  DOM.emptyState.classList.add('hidden');

  if (state.viewMode === 'grid') {
    DOM.vocabGridView.classList.remove('hidden');
    DOM.vocabTableView.classList.add('hidden');
    renderGridView();
  } else {
    DOM.vocabGridView.classList.add('hidden');
    DOM.vocabTableView.classList.remove('hidden');
    renderTableView();
  }
}

// Render Grid Card View
function renderGridView() {
  DOM.vocabGridView.innerHTML = state.items.map(item => {
    const statusLabel = item.status === 'mastered' ? 'Đã thuộc' : (item.status === 'learning' ? 'Đang học' : 'Mới');
    const wordTypeClass = `badge-${item.word_type || 'noun'}`;

    return `
      <div class="vocab-card" data-id="${item.id}">
        <div>
          <div class="card-top">
            <span class="card-number">#${item.word_number || item.id}</span>
            <div class="card-badges">
              <span class="badge ${wordTypeClass}">${item.word_type || 'noun'}</span>
              <span class="status-pill status-${item.status}">${statusLabel}</span>
            </div>
          </div>

          <div class="card-word-row">
            <h3 class="card-word">${escapeHtml(item.word)}</h3>
            <span class="card-phonetic">${escapeHtml(item.phonetic || '')}</span>
          </div>

          <div class="card-meaning-box">
            ${escapeHtml(item.meaning_vi)}
          </div>

          ${item.sound_bridge ? `
            <div class="card-bridge-box">
              <div class="card-bridge-label"><i class="fa-solid fa-lightbulb"></i> Mẹo âm thanh tương tự:</div>
              <p class="card-bridge-text">${escapeHtml(item.sound_bridge)}</p>
            </div>
          ` : ''}

          ${item.example_en ? `
            <div class="card-example-row">
              "${escapeHtml(item.example_en)}"
            </div>
          ` : ''}
        </div>

        <div class="card-footer">
          <div class="card-footer-info">
            <span class="badge badge-unit">Unit ${item.unit || 1}</span>
            ${item.page_number ? `<span class="badge" style="background: var(--border-color); color: var(--text-muted);">Trang ${item.page_number}</span>` : ''}
          </div>

          <div class="card-footer-actions">
            <button class="card-btn-action btn-action-speak" data-speak="${escapeHtml(item.word)}" title="Phát âm từ này">
              <i class="fa-solid fa-volume-high"></i>
            </button>
            <button class="card-btn-action" data-detail-id="${item.id}" title="Xem chi tiết">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="card-btn-action" data-edit-id="${item.id}" title="Chỉnh sửa">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="card-btn-action btn-action-delete" data-delete-id="${item.id}" data-word="${escapeHtml(item.word)}" title="Xóa từ này">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Data Table View
function renderTableView() {
  DOM.vocabTableBody.innerHTML = state.items.map(item => {
    const statusLabel = item.status === 'mastered' ? 'Đã thuộc' : (item.status === 'learning' ? 'Đang học' : 'Mới');
    const wordTypeClass = `badge-${item.word_type || 'noun'}`;

    return `
      <tr>
        <td class="text-muted font-mono">#${item.word_number || item.id}</td>
        <td class="table-word-cell">
          <strong>${escapeHtml(item.word)}</strong>
          <button class="btn-speak-sm ml-1" data-speak="${escapeHtml(item.word)}" title="Phát âm">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </td>
        <td class="font-mono text-muted">${escapeHtml(item.phonetic || '-')}</td>
        <td><span class="badge ${wordTypeClass}">${item.word_type || 'noun'}</span></td>
        <td><strong>${escapeHtml(item.meaning_vi)}</strong></td>
        <td class="table-sound-cell">${escapeHtml(item.sound_bridge || '-')}</td>
        <td><span class="badge badge-unit">Unit ${item.unit || 1}</span></td>
        <td><span class="status-pill status-${item.status}">${statusLabel}</span></td>
        <td>
          <div class="table-actions">
            <button class="card-btn-action" data-detail-id="${item.id}" title="Chi tiết">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="card-btn-action" data-edit-id="${item.id}" title="Sửa">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="card-btn-action btn-action-delete" data-delete-id="${item.id}" data-word="${escapeHtml(item.word)}" title="Xóa">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Render Pagination
function renderPagination() {
  const { total, page, limit, totalPages } = state.pagination;

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  DOM.pageItemRange.textContent = `${start}-${end}`;
  DOM.pageTotalItems.textContent = total;

  DOM.btnPagePrev.disabled = page <= 1;
  DOM.btnPageNext.disabled = page >= totalPages;

  // Generate Page Numbers
  let pagesHtml = '';
  const maxButtons = 5;
  let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pagesHtml += `
      <button class="btn-page ${i === page ? 'active' : ''}" data-goto-page="${i}">
        ${i}
      </button>
    `;
  }
  DOM.pageNumbersContainer.innerHTML = pagesHtml;
}

// Render Active Filter Tags
function renderActiveFilters() {
  const tags = [];
  if (state.filters.q) {
    tags.push({ key: 'q', label: `Tìm kiếm: "${state.filters.q}"` });
  }
  if (state.filters.unit !== 'all') {
    tags.push({ key: 'unit', label: `Unit: ${state.filters.unit}` });
  }
  if (state.filters.category !== 'all') {
    tags.push({ key: 'category', label: `Chủ đề: ${state.filters.category}` });
  }
  if (state.filters.word_type !== 'all') {
    tags.push({ key: 'word_type', label: `Loại từ: ${state.filters.word_type}` });
  }
  if (state.filters.status !== 'all') {
    const sMap = { new: 'Mới', learning: 'Đang học', mastered: 'Đã thuộc' };
    tags.push({ key: 'status', label: `Trạng thái: ${sMap[state.filters.status] || state.filters.status}` });
  }

  if (tags.length > 0) {
    DOM.activeFiltersBar.classList.remove('hidden');
    DOM.filterTagsContainer.innerHTML = tags.map(t => `
      <span class="filter-tag">
        ${t.label}
        <button data-remove-filter="${t.key}"><i class="fa-solid fa-xmark"></i></button>
      </span>
    `).join('');
  } else {
    DOM.activeFiltersBar.classList.add('hidden');
    DOM.filterTagsContainer.innerHTML = '';
  }
}

/* =========================================================
   DETAIL MODAL LOGIC
   ========================================================= */
async function openDetailModal(id) {
  try {
    const res = await fetch(`/api/vocabularies/${id}`);
    const result = await res.json();
    if (!result.success) {
      showToast('Không tìm thấy thông tin từ vựng', 'error');
      return;
    }

    const item = result.data;
    state.currentDetailItem = item;

    DOM.modalDetailUnit.textContent = `Unit ${item.unit || 1} - ${item.unit_title || 'General'}`;
    DOM.modalDetailCategory.textContent = item.category || 'General';
    DOM.modalDetailWord.textContent = item.word;
    DOM.modalDetailPhonetic.textContent = item.phonetic || '';
    DOM.modalDetailType.textContent = item.word_type || 'noun';
    DOM.modalDetailType.className = `badge badge-${item.word_type || 'noun'}`;
    DOM.modalDetailStatusSelect.value = item.status || 'new';

    DOM.modalDetailMeaning.textContent = item.meaning_vi;
    DOM.modalDetailBridge.textContent = item.sound_bridge || 'Chưa có câu chuyện âm thanh tương tự.';
    DOM.modalDetailDefinition.textContent = item.definition_en || 'No English definition provided.';
    
    DOM.modalDetailExampleEn.textContent = item.example_en || 'No example sentence provided.';
    DOM.modalDetailExampleVi.textContent = item.example_vi || '';

    DOM.modalDetailNumber.textContent = `#${item.word_number || item.id}`;
    DOM.modalDetailPage.textContent = item.page_number ? `Trang ${item.page_number}` : 'Chưa cập nhật';
    DOM.modalDetailNote.textContent = item.note || 'Chưa có ghi chú nào.';

    DOM.modalDetail.classList.remove('hidden');
  } catch (err) {
    console.error('Error opening detail modal:', err);
    showToast('Lỗi khi mở chi tiết từ vựng', 'error');
  }
}

/* =========================================================
   CREATE / EDIT MODAL LOGIC
   ========================================================= */
function openCreateModal() {
  DOM.modalFormTitle.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Thêm Từ Vựng Mới';
  DOM.vocabForm.reset();
  DOM.formItemId.value = '';
  DOM.formUnit.value = state.filters.unit !== 'all' ? state.filters.unit : '1';
  DOM.formWordType.value = 'noun';
  DOM.formStatus.value = 'new';
  DOM.btnSaveVocab.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Thêm Mới';
  DOM.modalForm.classList.remove('hidden');
  DOM.formWord.focus();
}

async function openEditModal(id) {
  try {
    const res = await fetch(`/api/vocabularies/${id}`);
    const result = await res.json();
    if (!result.success) {
      showToast('Không tìm thấy từ vựng để sửa', 'error');
      return;
    }

    const item = result.data;
    DOM.modalFormTitle.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Chỉnh Sửa Từ Vựng';
    DOM.formItemId.value = item.id;
    DOM.formWord.value = item.word;
    DOM.formPhonetic.value = item.phonetic || '';
    DOM.formWordType.value = item.word_type || 'noun';
    DOM.formMeaningVi.value = item.meaning_vi;
    DOM.formSoundBridge.value = item.sound_bridge || '';
    DOM.formDefinitionEn.value = item.definition_en || '';
    DOM.formExampleEn.value = item.example_en || '';
    DOM.formExampleVi.value = item.example_vi || '';
    DOM.formUnit.value = item.unit || 1;
    DOM.formUnitTitle.value = item.unit_title || '';
    DOM.formCategory.value = item.category || '';
    DOM.formPageNumber.value = item.page_number || '';
    DOM.formStatus.value = item.status || 'new';
    DOM.formNote.value = item.note || '';

    DOM.btnSaveVocab.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu Cập Nhật';
    DOM.modalDetail.classList.add('hidden');
    DOM.modalForm.classList.remove('hidden');
    DOM.formWord.focus();
  } catch (err) {
    showToast('Lỗi khi tải dữ liệu chỉnh sửa', 'error');
  }
}

async function handleSaveVocab(e) {
  e.preventDefault();
  const id = DOM.formItemId.value;
  const isEditing = Boolean(id);

  const payload = {
    word: DOM.formWord.value.trim(),
    phonetic: DOM.formPhonetic.value.trim(),
    word_type: DOM.formWordType.value,
    meaning_vi: DOM.formMeaningVi.value.trim(),
    sound_bridge: DOM.formSoundBridge.value.trim(),
    definition_en: DOM.formDefinitionEn.value.trim(),
    example_en: DOM.formExampleEn.value.trim(),
    example_vi: DOM.formExampleVi.value.trim(),
    unit: parseInt(DOM.formUnit.value, 10) || 1,
    unit_title: DOM.formUnitTitle.value.trim(),
    category: DOM.formCategory.value.trim() || 'General',
    page_number: DOM.formPageNumber.value ? parseInt(DOM.formPageNumber.value, 10) : null,
    status: DOM.formStatus.value,
    note: DOM.formNote.value.trim()
  };

  DOM.btnSaveVocab.disabled = true;
  DOM.btnSaveVocab.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...';

  try {
    const url = isEditing ? `/api/vocabularies/${id}` : '/api/vocabularies';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (result.success) {
      showToast(result.message || 'Lưu thành công!', 'success');
      DOM.modalForm.classList.add('hidden');
      await fetchVocabularies();
      await fetchStats();
      await fetchFilterOptions();
    } else {
      showToast(result.message || 'Lỗi khi lưu dữ liệu', 'error');
    }
  } catch (err) {
    showToast('Lỗi kết nối máy chủ', 'error');
  } finally {
    DOM.btnSaveVocab.disabled = false;
    DOM.btnSaveVocab.innerHTML = isEditing ? '<i class="fa-solid fa-floppy-disk"></i> Lưu Cập Nhật' : '<i class="fa-solid fa-floppy-disk"></i> Thêm Mới';
  }
}

/* =========================================================
   DELETE MODAL LOGIC
   ========================================================= */
function openDeleteModal(id, wordName) {
  state.deleteTargetId = id;
  state.deleteTargetName = wordName;
  DOM.deleteWordName.textContent = `"${wordName}"`;
  DOM.modalDelete.classList.remove('hidden');
}

async function handleConfirmDelete() {
  if (!state.deleteTargetId) return;

  DOM.btnConfirmDelete.disabled = true;
  DOM.btnConfirmDelete.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang xóa...';

  try {
    const res = await fetch(`/api/vocabularies/${state.deleteTargetId}`, {
      method: 'DELETE'
    });
    const result = await res.json();

    if (result.success) {
      showToast(result.message || 'Đã xóa từ vựng thành công', 'success');
      DOM.modalDelete.classList.add('hidden');
      DOM.modalDetail.classList.add('hidden');
      await fetchVocabularies();
      await fetchStats();
      await fetchFilterOptions();
    } else {
      showToast(result.message || 'Lỗi khi xóa từ vựng', 'error');
    }
  } catch (err) {
    showToast('Lỗi kết nối khi xóa', 'error');
  } finally {
    DOM.btnConfirmDelete.disabled = false;
    DOM.btnConfirmDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i> Xóa Vĩnh Viễn';
    state.deleteTargetId = null;
  }
}

/* =========================================================
   FLASHCARD MODE LOGIC
   ========================================================= */
async function openFlashcardMode() {
  try {
    // Fetch up to 50 items for practice
    const res = await fetch('/api/vocabularies?limit=50&sort_by=id');
    const result = await res.json();
    if (!result.success || result.data.length === 0) {
      showToast('Chưa có từ vựng nào để ôn tập Flashcard', 'info');
      return;
    }

    state.flashcards = result.data;
    state.fcIndex = 0;
    state.fcFlipped = false;

    renderCurrentFlashcard();
    DOM.modalFlashcard.classList.remove('hidden');
  } catch (err) {
    showToast('Lỗi mở chế độ Flashcard', 'error');
  }
}

function renderCurrentFlashcard() {
  if (!state.flashcards || state.flashcards.length === 0) return;
  const item = state.flashcards[state.fcIndex];
  state.fcFlipped = false;
  DOM.flashcardElement.classList.remove('flipped');

  DOM.flashcardProgressText.textContent = `Thẻ ${state.fcIndex + 1} / ${state.flashcards.length}`;
  DOM.fcFrontUnit.textContent = `Unit ${item.unit || 1}`;
  DOM.fcFrontType.textContent = item.word_type || 'noun';
  DOM.fcFrontWord.textContent = item.word;
  DOM.fcFrontPhonetic.textContent = item.phonetic || '';

  DOM.fcBackMeaning.textContent = item.meaning_vi;
  DOM.fcBackBridge.textContent = item.sound_bridge || 'Chưa có câu chuyện âm thanh tương tự';
  DOM.fcBackExampleEn.textContent = item.example_en ? `"${item.example_en}"` : '';
  DOM.fcBackExampleVi.textContent = item.example_vi || '';

  DOM.btnFcPrev.disabled = state.fcIndex <= 0;
  DOM.btnFcNext.disabled = state.fcIndex >= state.flashcards.length - 1;
}

function flipFlashcard() {
  state.fcFlipped = !state.fcFlipped;
  DOM.flashcardElement.classList.toggle('flipped', state.fcFlipped);
}

/* =========================================================
   QUIZ MODE LOGIC
   ========================================================= */
async function openQuizMode() {
  try {
    const res = await fetch('/api/vocabularies?limit=50');
    const result = await res.json();
    if (!result.success || result.data.length < 4) {
      showToast('Cần ít nhất 4 từ vựng trong cơ sở dữ liệu để tạo trắc nghiệm', 'info');
      return;
    }

    // Shuffle and pick 10 questions
    const pool = [...result.data].sort(() => 0.5 - Math.random());
    state.quizList = pool.slice(0, 10);
    state.quizIndex = 0;
    state.quizScore = 0;
    DOM.quizScore.textContent = '0';

    loadQuizQuestion();
    DOM.modalQuiz.classList.remove('hidden');
  } catch (err) {
    showToast('Lỗi khi khởi tạo trắc nghiệm', 'error');
  }
}

function loadQuizQuestion() {
  if (state.quizIndex >= state.quizList.length) {
    // Finished Quiz
    DOM.quizQuestionNum.textContent = 'Hoàn thành!';
    DOM.quizQuestionPrompt.textContent = 'Kết quả bài kiểm tra của bạn:';
    DOM.quizTargetText.textContent = `🎉 Đạt ${state.quizScore} / ${state.quizList.length * 10} điểm!`;
    DOM.quizHintBridge.classList.add('hidden');
    DOM.quizOptionsContainer.innerHTML = '';
    DOM.quizFeedback.className = 'quiz-feedback correct';
    DOM.quizFeedback.textContent = state.quizScore >= 70 ? 'Xuất sắc! Bạn ghi nhớ từ rất tốt.' : 'Hãy tiếp tục ôn tập thêm nhé!';
    DOM.quizFeedback.classList.remove('hidden');
    DOM.btnQuizHint.classList.add('hidden');
    DOM.btnQuizNext.innerHTML = '<i class="fa-solid fa-rotate"></i> Làm lại bài mới';
    DOM.btnQuizNext.disabled = false;
    return;
  }

  const currentItem = state.quizList[state.quizIndex];
  state.currentQuestion = currentItem;

  DOM.quizQuestionNum.textContent = `Câu ${state.quizIndex + 1}/${state.quizList.length}`;
  DOM.quizQuestionPrompt.textContent = 'Từ vựng tiếng Anh nào mang ý nghĩa dưới đây?';
  DOM.quizTargetText.textContent = `"${currentItem.meaning_vi}"`;

  DOM.quizHintBridge.classList.add('hidden');
  DOM.quizHintText.textContent = currentItem.sound_bridge || 'Không có gợi ý';
  DOM.btnQuizHint.classList.remove('hidden');

  DOM.quizFeedback.classList.add('hidden');
  DOM.btnQuizNext.disabled = true;
  DOM.btnQuizNext.innerHTML = 'Câu Tiếp Theo <i class="fa-solid fa-chevron-right"></i>';

  // Generate 4 options (1 correct, 3 wrong)
  const distractors = state.quizList
    .filter(item => item.id !== currentItem.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const options = [currentItem, ...distractors].sort(() => 0.5 - Math.random());

  DOM.quizOptionsContainer.innerHTML = options.map(opt => `
    <button class="quiz-option-btn" data-word="${escapeHtml(opt.word)}" data-is-correct="${opt.id === currentItem.id}">
      ${escapeHtml(opt.word)} <small class="text-muted">(${opt.phonetic || ''})</small>
    </button>
  `).join('');
}

function handleAnswerOption(button) {
  const isCorrect = button.getAttribute('data-is-correct') === 'true';
  const allButtons = DOM.quizOptionsContainer.querySelectorAll('.quiz-option-btn');

  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.getAttribute('data-is-correct') === 'true') {
      btn.classList.add('correct');
    }
  });

  if (isCorrect) {
    button.classList.add('correct');
    state.quizScore += 10;
    DOM.quizScore.textContent = state.quizScore;
    DOM.quizFeedback.className = 'quiz-feedback correct';
    DOM.quizFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Chính xác! Tuyệt vời!';
    playAudio(state.currentQuestion.word);
  } else {
    button.classList.add('wrong');
    DOM.quizFeedback.className = 'quiz-feedback wrong';
    DOM.quizFeedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Chưa đúng! Đáp án đúng là: <strong>${escapeHtml(state.currentQuestion.word)}</strong>`;
  }

  DOM.quizFeedback.classList.remove('hidden');
  DOM.btnQuizNext.disabled = false;
}

/* =========================================================
   PDF READER VIEWER LOGIC
   ========================================================= */
function openPdfViewer(pageNumber = 14) {
  DOM.pdfPageSelect.value = pageNumber.toString();
  loadPdfPage(pageNumber);
  DOM.modalPdf.classList.remove('hidden');
}

function loadPdfPage(pageNum) {
  DOM.pdfCurrentPageBadge.textContent = `Trang ${pageNum}`;
  DOM.pdfPageImage.src = `pages/page_${pageNum}.png`;
}

/* =========================================================
   IMPORT / EXPORT / RESET LOGIC
   ========================================================= */
function handleExportJSON() {
  window.open('/api/vocabularies/export', '_blank');
  showToast('Đang tải xuống file dữ liệu JSON...', 'info');
}

async function handleResetData() {
  if (!confirm('Bạn có chắc chắn muốn khôi phục lại dữ liệu gốc từ file Hack Não 1500 không? Mọi chỉnh sửa thêm bớt sẽ được nạp lại mặc định.')) {
    return;
  }

  try {
    const res = await fetch('/api/vocabularies/reset-default', { method: 'POST' });
    const result = await res.json();
    if (result.success) {
      showToast(result.message, 'success');
      await fetchVocabularies();
      await fetchStats();
      await fetchFilterOptions();
    } else {
      showToast(result.message || 'Lỗi khôi phục', 'error');
    }
  } catch (err) {
    showToast('Lỗi kết nối khi khôi phục dữ liệu', 'error');
  }
}

function handleFileSelect(file) {
  if (!file || !file.name.endsWith('.json')) {
    showToast('Vui lòng chọn file có định dạng .json', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) {
        showToast('File JSON phải chứa một mảng danh sách từ vựng', 'error');
        return;
      }
      state.importFileData = data;
      DOM.importFilename.textContent = file.name;
      DOM.importFileCount.textContent = `${data.length} từ vựng`;
      DOM.importPreviewInfo.classList.remove('hidden');
      DOM.btnSubmitImport.disabled = false;
    } catch (err) {
      showToast('File JSON không đúng định dạng', 'error');
    }
  };
  reader.readAsText(file);
}

async function submitImport() {
  if (!state.importFileData || state.importFileData.length === 0) return;

  DOM.btnSubmitImport.disabled = true;
  DOM.btnSubmitImport.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang import vào MySQL...';

  try {
    const res = await fetch('/api/vocabularies/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.importFileData)
    });
    const result = await res.json();

    if (result.success) {
      showToast(result.message, 'success');
      DOM.modalImport.classList.add('hidden');
      state.importFileData = null;
      await fetchVocabularies();
      await fetchStats();
      await fetchFilterOptions();
    } else {
      showToast(result.message || 'Lỗi khi import', 'error');
    }
  } catch (err) {
    showToast('Lỗi kết nối import', 'error');
  } finally {
    DOM.btnSubmitImport.disabled = false;
    DOM.btnSubmitImport.innerHTML = '<i class="fa-solid fa-upload"></i> Tiến Hành Import Vào MySQL';
  }
}

/* =========================================================
   UTILITIES & EVENT LISTENERS
   ========================================================= */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Debounce helper for live search
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Attach all DOM Event Listeners
function setupEventListeners() {
  // Theme Toggle
  DOM.btnThemeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('hacknao_theme', state.theme);
  });

  // Reconnect DB
  DOM.btnReconnectDb.addEventListener('click', async () => {
    DOM.btnReconnectDb.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang thử lại...';
    await checkDbConnection();
    await fetchVocabularies();
    await fetchStats();
    await fetchFilterOptions();
    DOM.btnReconnectDb.innerHTML = '<i class="fa-solid fa-rotate"></i> Thử kết nối lại';
  });

  // Global Search Debounced
  const debouncedSearch = debounce(() => {
    state.filters.q = DOM.globalSearchInput.value.trim();
    state.pagination.page = 1;
    DOM.btnClearSearch.classList.toggle('hidden', state.filters.q === '');
    fetchVocabularies();
  }, 300);

  DOM.globalSearchInput.addEventListener('input', debouncedSearch);

  DOM.btnClearSearch.addEventListener('click', () => {
    DOM.globalSearchInput.value = '';
    state.filters.q = '';
    DOM.btnClearSearch.classList.add('hidden');
    state.pagination.page = 1;
    fetchVocabularies();
  });

  // Filter Dropdowns
  DOM.filterUnit.addEventListener('change', (e) => {
    state.filters.unit = e.target.value;
    state.pagination.page = 1;
    fetchVocabularies();
  });

  DOM.filterCategory.addEventListener('change', (e) => {
    state.filters.category = e.target.value;
    state.pagination.page = 1;
    fetchVocabularies();
  });

  DOM.filterWordType.addEventListener('change', (e) => {
    state.filters.word_type = e.target.value;
    state.pagination.page = 1;
    fetchVocabularies();
  });

  DOM.filterStatus.addEventListener('change', (e) => {
    state.filters.status = e.target.value;
    state.pagination.page = 1;
    fetchVocabularies();
  });

  // Reset Filters
  DOM.btnResetFilters.addEventListener('click', resetFilters);
  DOM.btnEmptyReset.addEventListener('click', resetFilters);

  function resetFilters() {
    state.filters.q = '';
    state.filters.unit = 'all';
    state.filters.category = 'all';
    state.filters.word_type = 'all';
    state.filters.status = 'all';
    DOM.globalSearchInput.value = '';
    DOM.filterUnit.value = 'all';
    DOM.filterCategory.value = 'all';
    DOM.filterWordType.value = 'all';
    DOM.filterStatus.value = 'all';
    DOM.btnClearSearch.classList.add('hidden');
    state.pagination.page = 1;
    fetchVocabularies();
  }

  // Sort By
  DOM.sortBy.addEventListener('change', (e) => {
    const [col, dir] = e.target.value.split('-');
    state.filters.sort_by = col;
    state.filters.order = dir;
    state.pagination.page = 1;
    fetchVocabularies();
  });

  // View Switch (Grid vs Table)
  DOM.btnViewGrid.addEventListener('click', () => {
    state.viewMode = 'grid';
    DOM.btnViewGrid.classList.add('active');
    DOM.btnViewTable.classList.remove('active');
    localStorage.setItem('hacknao_view_mode', 'grid');
    renderVocabularies();
  });

  DOM.btnViewTable.addEventListener('click', () => {
    state.viewMode = 'table';
    DOM.btnViewTable.classList.add('active');
    DOM.btnViewGrid.classList.remove('active');
    localStorage.setItem('hacknao_view_mode', 'table');
    renderVocabularies();
  });

  // Stat Card Clicks (Filter by status)
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', () => {
      const status = card.getAttribute('data-filter-status');
      DOM.filterStatus.value = status;
      state.filters.status = status;
      state.pagination.page = 1;
      fetchVocabularies();
    });
  });

  // Pagination Clicks
  DOM.btnPagePrev.addEventListener('click', () => {
    if (state.pagination.page > 1) {
      state.pagination.page--;
      fetchVocabularies();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  });

  DOM.btnPageNext.addEventListener('click', () => {
    if (state.pagination.page < state.pagination.totalPages) {
      state.pagination.page++;
      fetchVocabularies();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  });

  DOM.pageNumbersContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-goto-page]');
    if (btn) {
      state.pagination.page = parseInt(btn.getAttribute('data-goto-page'), 10);
      fetchVocabularies();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  });

  DOM.selectLimit.addEventListener('change', (e) => {
    state.pagination.limit = parseInt(e.target.value, 10);
    state.pagination.page = 1;
    fetchVocabularies();
  });

  // Remove Active Filter Tag Click
  DOM.filterTagsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove-filter]');
    if (btn) {
      const key = btn.getAttribute('data-remove-filter');
      if (key === 'q') {
        state.filters.q = '';
        DOM.globalSearchInput.value = '';
        DOM.btnClearSearch.classList.add('hidden');
      } else {
        state.filters[key] = 'all';
        if (key === 'unit') DOM.filterUnit.value = 'all';
        if (key === 'category') DOM.filterCategory.value = 'all';
        if (key === 'word_type') DOM.filterWordType.value = 'all';
        if (key === 'status') DOM.filterStatus.value = 'all';
      }
      state.pagination.page = 1;
      fetchVocabularies();
    }
  });

  // Card / Table Action Clicks (Delegation)
  document.addEventListener('click', (e) => {
    // Speak Button
    const speakBtn = e.target.closest('[data-speak]');
    if (speakBtn) {
      e.stopPropagation();
      playAudio(speakBtn.getAttribute('data-speak'));
      return;
    }

    // Detail Button
    const detailBtn = e.target.closest('[data-detail-id]');
    if (detailBtn) {
      e.stopPropagation();
      openDetailModal(detailBtn.getAttribute('data-detail-id'));
      return;
    }

    // Edit Button
    const editBtn = e.target.closest('[data-edit-id]');
    if (editBtn) {
      e.stopPropagation();
      openEditModal(editBtn.getAttribute('data-edit-id'));
      return;
    }

    // Delete Button
    const delBtn = e.target.closest('[data-delete-id]');
    if (delBtn) {
      e.stopPropagation();
      openDeleteModal(delBtn.getAttribute('data-delete-id'), delBtn.getAttribute('data-word'));
      return;
    }
  });

  // Modal Close Buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('hidden');
    });
  });

  // Close modal when clicking outside card
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // Modal Open Buttons
  DOM.btnOpenCreateModal.addEventListener('click', openCreateModal);
  DOM.vocabForm.addEventListener('submit', handleSaveVocab);
  DOM.btnConfirmDelete.addEventListener('click', handleConfirmDelete);

  // Detail Modal Actions
  DOM.btnDetailSpeak.addEventListener('click', () => {
    if (state.currentDetailItem) playAudio(state.currentDetailItem.word);
  });
  DOM.btnExampleSpeak.addEventListener('click', () => {
    if (state.currentDetailItem && state.currentDetailItem.example_en) {
      playAudio(state.currentDetailItem.example_en);
    }
  });
  DOM.modalDetailStatusSelect.addEventListener('change', async (e) => {
    if (!state.currentDetailItem) return;
    const newStatus = e.target.value;
    try {
      const res = await fetch(`/api/vocabularies/${state.currentDetailItem.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await res.json();
      if (result.success) {
        showToast('Đã cập nhật trạng thái học', 'success');
        state.currentDetailItem.status = newStatus;
        await fetchVocabularies();
        await fetchStats();
      }
    } catch (err) {
      showToast('Lỗi cập nhật trạng thái', 'error');
    }
  });
  DOM.btnDetailViewPdfPage.addEventListener('click', () => {
    const page = state.currentDetailItem?.page_number || 14;
    DOM.modalDetail.classList.add('hidden');
    openPdfViewer(page);
  });
  DOM.btnDetailEdit.addEventListener('click', () => {
    if (state.currentDetailItem) openEditModal(state.currentDetailItem.id);
  });
  DOM.btnDetailDelete.addEventListener('click', () => {
    if (state.currentDetailItem) openDeleteModal(state.currentDetailItem.id, state.currentDetailItem.word);
  });

  // Flashcard Mode Controls
  DOM.btnFlashcardMode.addEventListener('click', openFlashcardMode);
  DOM.flashcardElement.addEventListener('click', flipFlashcard);
  DOM.btnFcFlip.addEventListener('click', flipFlashcard);
  DOM.btnFcPrev.addEventListener('click', () => {
    if (state.fcIndex > 0) {
      state.fcIndex--;
      renderCurrentFlashcard();
    }
  });
  DOM.btnFcNext.addEventListener('click', () => {
    if (state.fcIndex < state.flashcards.length - 1) {
      state.fcIndex++;
      renderCurrentFlashcard();
    }
  });
  DOM.btnFcSpeak.addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.flashcards[state.fcIndex]) {
      playAudio(state.flashcards[state.fcIndex].word);
    }
  });
  DOM.btnFcMaster.addEventListener('click', async () => {
    const item = state.flashcards[state.fcIndex];
    if (!item) return;
    try {
      await fetch(`/api/vocabularies/${item.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'mastered' })
      });
      showToast(`Đã đánh dấu "${item.word}" là Đã thuộc!`, 'success');
      item.status = 'mastered';
      if (state.fcIndex < state.flashcards.length - 1) {
        state.fcIndex++;
        renderCurrentFlashcard();
      }
      fetchStats();
      fetchVocabularies();
    } catch (err) {}
  });

  // Quiz Mode Controls
  DOM.btnQuizMode.addEventListener('click', openQuizMode);
  DOM.btnQuizHint.addEventListener('click', () => {
    DOM.quizHintBridge.classList.remove('hidden');
    DOM.btnQuizHint.classList.add('hidden');
  });
  DOM.quizOptionsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.quiz-option-btn');
    if (btn && !btn.disabled) {
      handleAnswerOption(btn);
    }
  });
  DOM.btnQuizNext.addEventListener('click', () => {
    state.quizIndex++;
    if (state.quizIndex <= state.quizList.length) {
      loadQuizQuestion();
    }
  });

  // PDF Viewer Controls
  DOM.btnPdfViewer.addEventListener('click', () => openPdfViewer(14));
  DOM.pdfPageSelect.addEventListener('change', (e) => {
    loadPdfPage(parseInt(e.target.value, 10));
  });
  DOM.btnPdfPrev.addEventListener('click', () => {
    const pages = Array.from(DOM.pdfPageSelect.options).map(o => parseInt(o.value, 10));
    const current = parseInt(DOM.pdfPageSelect.value, 10);
    const currIdx = pages.indexOf(current);
    if (currIdx > 0) {
      DOM.pdfPageSelect.value = pages[currIdx - 1];
      loadPdfPage(pages[currIdx - 1]);
    }
  });
  DOM.btnPdfNext.addEventListener('click', () => {
    const pages = Array.from(DOM.pdfPageSelect.options).map(o => parseInt(o.value, 10));
    const current = parseInt(DOM.pdfPageSelect.value, 10);
    const currIdx = pages.indexOf(current);
    if (currIdx < pages.length - 1) {
      DOM.pdfPageSelect.value = pages[currIdx + 1];
      loadPdfPage(pages[currIdx + 1]);
    }
  });

  // Tools Menu Dropdown
  DOM.btnToolsMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    DOM.toolsDropdown.classList.toggle('hidden');
  });
  document.addEventListener('click', () => {
    DOM.toolsDropdown.classList.add('hidden');
  });

  DOM.btnExportJson.addEventListener('click', handleExportJSON);
  DOM.btnResetData.addEventListener('click', handleResetData);

  // Import Modal & Drag-and-drop
  DOM.btnOpenImport.addEventListener('click', () => {
    DOM.importPreviewInfo.classList.add('hidden');
    DOM.btnSubmitImport.disabled = true;
    DOM.importFileInput.value = '';
    DOM.modalImport.classList.remove('hidden');
  });

  DOM.importDropzone.addEventListener('click', () => DOM.importFileInput.click());
  DOM.importFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFileSelect(e.target.files[0]);
  });

  DOM.importDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    DOM.importDropzone.style.borderColor = 'var(--primary)';
  });
  DOM.importDropzone.addEventListener('dragleave', () => {
    DOM.importDropzone.style.borderColor = 'var(--border-color)';
  });
  DOM.importDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    DOM.importDropzone.style.borderColor = 'var(--border-color)';
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  });
  DOM.btnSubmitImport.addEventListener('click', submitImport);

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl + K or '/' to focus search
    if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement !== DOM.globalSearchInput && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
      e.preventDefault();
      DOM.globalSearchInput.focus();
      DOM.globalSearchInput.select();
    }

    // Escape closes modals
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
    }

    // Flashcard Arrow Keys
    if (!DOM.modalFlashcard.classList.contains('hidden')) {
      if (e.key === 'ArrowLeft') DOM.btnFcPrev.click();
      if (e.key === 'ArrowRight') DOM.btnFcNext.click();
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        flipFlashcard();
      }
    }
  });
}

/* =========================================================
   INITIALIZATION
   ========================================================= */
async function initApp() {
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', state.theme);

  // Apply saved view mode
  if (state.viewMode === 'table') {
    DOM.btnViewTable.classList.add('active');
    DOM.btnViewGrid.classList.remove('active');
  }

  // Setup Event Listeners
  setupEventListeners();

  // Initial Data Fetch
  await checkDbConnection();
  await fetchVocabularies();
  await fetchStats();
  await fetchFilterOptions();

  // Periodic DB Health Check (every 10s if offline)
  setInterval(() => {
    if (!state.dbConnected) {
      checkDbConnection().then(() => {
        if (state.dbConnected) {
          fetchVocabularies();
          fetchStats();
          fetchFilterOptions();
        }
      });
    }
  }, 10000);
}

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);
