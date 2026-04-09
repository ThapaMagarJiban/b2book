/* === Book Manager Client Application === */

// API base URL – change this if your API runs on a different host/port
const API_BASE = (window.BOOK_MANAGER_API_BASE || 'http://localhost:3000/api');

// --- DOM references ---
const booksGrid    = document.getElementById('booksGrid');
const searchInput  = document.getElementById('searchInput');
const searchBtn    = document.getElementById('searchBtn');
const clearBtn     = document.getElementById('clearBtn');
const genreFilter  = document.getElementById('genreFilter');
const availFilter  = document.getElementById('availFilter');
const addBookBtn   = document.getElementById('addBookBtn');
const statusMsg    = document.getElementById('statusMsg');
const BOOK_COVER_FALLBACK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="104" viewBox="0 0 72 104"><rect width="72" height="104" rx="8" fill="#f0f4f8"/><rect x="8" y="12" width="56" height="80" rx="4" fill="#e2e8f0"/><text x="36" y="56" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="12" fill="#4a5568">No Cover</text></svg>';
const BOOK_COVER_FALLBACK = `data:image/svg+xml,${encodeURIComponent(BOOK_COVER_FALLBACK_SVG)}`;
const MAX_COVER_IMAGE_BYTES = 2 * 1024 * 1024;

// Add/Edit modal
const modal        = document.getElementById('modal');
const modalClose   = document.getElementById('modalClose');
const modalTitle   = document.getElementById('modalTitle');
const bookForm     = document.getElementById('bookForm');
const bookIdField  = document.getElementById('bookId');
const fTitle       = document.getElementById('fTitle');
const fAuthor      = document.getElementById('fAuthor');
const fGenre       = document.getElementById('fGenre');
const fYear        = document.getElementById('fYear');
const fIsbn        = document.getElementById('fIsbn');
const fDesc        = document.getElementById('fDescription');
const fCoverImage  = document.getElementById('fCoverImage');
const fCoverFile   = document.getElementById('fCoverFile');
const fAvail       = document.getElementById('fAvailable');
const saveBtn      = document.getElementById('saveBtn');
const cancelBtn    = document.getElementById('cancelBtn');

// Delete modal
const deleteModal       = document.getElementById('deleteModal');
const deleteMsg         = document.getElementById('deleteMsg');
const confirmDeleteBtn  = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn   = document.getElementById('cancelDeleteBtn');

let pendingDeleteId = null;

// ===================== FETCH HELPERS =====================

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

// ===================== LOAD GENRES =====================

async function loadGenres() {
  try {
    const { data } = await apiFetch('/books/genres');
    data.forEach((genre) => {
      const opt = document.createElement('option');
      opt.value = genre;
      opt.textContent = genre;
      genreFilter.appendChild(opt);
    });
  } catch (e) {
    console.warn('Could not load genres:', e.message);
  }
}

// ===================== LOAD BOOKS =====================

async function loadBooks() {
  const q        = searchInput.value.trim();
  const genre    = genreFilter.value;
  const available = availFilter.value;

  const params = new URLSearchParams();
  if (q)        params.set('q', q);
  if (genre)    params.set('genre', genre);
  if (available !== '') params.set('available', available);

  booksGrid.innerHTML = '<div class="loading">Loading books…</div>';

  try {
    const { data } = await apiFetch(`/books?${params.toString()}`);
    renderBooks(data);
  } catch (e) {
    booksGrid.innerHTML = `<div class="empty">⚠️ Could not load books. Is the API running?<br><small>${e.message}</small></div>`;
  }
}

// ===================== RENDER =====================

function renderBooks(books) {
  if (!books || books.length === 0) {
    booksGrid.innerHTML = '<div class="empty">📭 No books found.</div>';
    return;
  }

  booksGrid.innerHTML = books.map((book) => `
    <div class="book-card" data-id="${book.id}">
      <span class="badge ${book.available ? 'badge-available' : 'badge-unavailable'}">
        ${book.available ? '✅ Available' : '❌ Not Available'}
      </span>
      <div class="book-head">
        <img
          class="book-cover"
          src="${BOOK_COVER_FALLBACK}"
          data-cover-url="${escHtml(bookCoverUrl(book))}"
          alt="Cover of ${escHtml(book.title)}"
          loading="lazy"
        />
        <h3>${escHtml(book.title)}</h3>
      </div>
      <p class="author">by ${escHtml(book.author)}</p>
      <p class="meta">${escHtml(book.genre)} &bull; ${book.year} &bull; <em>${escHtml(book.isbn)}</em></p>
      <p class="description">${escHtml(book.description || '')}</p>
      <div class="card-actions">
        <button class="btn btn-primary view-btn" data-id="${book.id}">👁️ View</button>
        <button class="btn btn-warning edit-btn" data-id="${book.id}">✏️ Edit</button>
        <button class="btn btn-danger delete-btn" data-id="${book.id}">🗑️ Delete</button>
      </div>
    </div>
  `).join('');

  // Attach event listeners
  booksGrid.querySelectorAll('.view-btn').forEach((btn) =>
    btn.addEventListener('click', () => openViewModal(Number(btn.dataset.id)))
  );
  booksGrid.querySelectorAll('.edit-btn').forEach((btn) =>
    btn.addEventListener('click', () => openEditModal(Number(btn.dataset.id)))
  );
  booksGrid.querySelectorAll('.delete-btn').forEach((btn) =>
    btn.addEventListener('click', () => openDeleteModal(Number(btn.dataset.id), btn))
  );
  booksGrid.querySelectorAll('.book-cover').forEach(hydrateBookCover);
}

function hydrateBookCover(img) {
  const target = String(img.dataset.coverUrl || '').trim();
  if (!target || target === BOOK_COVER_FALLBACK) {
    img.src = BOOK_COVER_FALLBACK;
    return;
  }

  const probe = new Image();
  probe.onload = () => {
    if (probe.naturalWidth && probe.naturalWidth > 1) {
      img.src = target;
    } else {
      img.src = BOOK_COVER_FALLBACK;
    }
  };
  probe.onerror = () => {
    img.src = BOOK_COVER_FALLBACK;
  };
  probe.src = target;
}

function bookCoverUrl(book) {
  const customCover = sanitizeCoverImage(book?.cover_image ?? book?.coverImage);
  if (customCover) return customCover;

  const isbn = normalizeIsbn(book?.isbn);
  if (!isbn) return BOOK_COVER_FALLBACK;
  return `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-M.jpg?default=false`;
}

function sanitizeCoverImage(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (raw.startsWith('data:image/')) {
    const dataSize = dataUrlByteSize(raw);
    return Number.isFinite(dataSize) && dataSize <= MAX_COVER_IMAGE_BYTES ? raw : '';
  }

  try {
    const parsed = new URL(raw, window.location.origin);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch (_) {
    // Invalid URL
  }
  return '';
}

function dataUrlByteSize(dataUrl) {
  const commaIndex = dataUrl.indexOf(',');
  if (commaIndex < 0) return Infinity;

  const metadata = dataUrl.slice(5, commaIndex).toLowerCase();
  const payload = dataUrl.slice(commaIndex + 1);
  if (metadata.includes(';base64')) {
    const normalized = payload.replace(/\s/g, '');
    if (!normalized) return 0;
    const padding = normalized.endsWith('==') ? 2 : (normalized.endsWith('=') ? 1 : 0);
    return Math.floor((normalized.length * 3) / 4) - padding;
  }

  try {
    return new TextEncoder().encode(decodeURIComponent(payload)).length;
  } catch (_) {
    return Infinity;
  }
}

function normalizeIsbn(isbn) {
  return String(isbn || '').replace(/[^0-9Xx]/g, '').toUpperCase();
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ===================== STATUS MESSAGES =====================

function showStatus(message, type = 'success') {
  statusMsg.textContent = message;
  statusMsg.className = `status-msg ${type}`;
  statusMsg.classList.remove('hidden');
  setTimeout(() => statusMsg.classList.add('hidden'), 4000);
}

// ===================== ADD/EDIT MODAL =====================

function openAddModal() {
  modalTitle.textContent = 'Add New Book';
  bookForm.reset();
  bookIdField.value = '';
  setFormReadOnly(false);
  saveBtn.classList.remove('hidden');
  openModal(modal);
}

async function openEditModal(id) {
  try {
    const { data } = await apiFetch(`/books/${id}`);
    modalTitle.textContent = 'Edit Book';
    bookIdField.value = data.id;
    fTitle.value  = data.title;
    fAuthor.value = data.author;
    fGenre.value  = data.genre;
    fYear.value   = data.year;
    fIsbn.value   = data.isbn;
    fDesc.value   = data.description || '';
    fCoverImage.value = data.cover_image || '';
    fCoverFile.value = '';
    fAvail.value  = String(data.available);
    setFormReadOnly(false);
    saveBtn.classList.remove('hidden');
    openModal(modal);
  } catch (e) {
    showStatus('Could not load book details: ' + e.message, 'error');
  }
}

async function openViewModal(id) {
  try {
    const { data } = await apiFetch(`/books/${id}`);
    modalTitle.textContent = 'Book Details';
    bookIdField.value = data.id;
    fTitle.value = data.title;
    fAuthor.value = data.author;
    fGenre.value = data.genre;
    fYear.value = data.year;
    fIsbn.value = data.isbn;
    fDesc.value = data.description || '';
    fCoverImage.value = data.cover_image || '';
    fCoverFile.value = '';
    fAvail.value = String(data.available);
    setFormReadOnly(true);
    saveBtn.classList.add('hidden');
    openModal(modal);
  } catch (e) {
    showStatus('Could not load book details: ' + e.message, 'error');
  }
}

bookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Basic validation
  let valid = true;
  [fTitle, fAuthor, fGenre, fYear, fIsbn].forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add('invalid');
      valid = false;
    } else {
      field.classList.remove('invalid');
    }
  });
  if (!valid) return;

  const coverImage = sanitizeCoverImage(fCoverImage.value);
  if (fCoverImage.value.trim() && !coverImage) {
    showStatus('Cover image must be a valid image URL or uploaded image under 2MB.', 'error');
    return;
  }

  const payload = {
    title: fTitle.value.trim(),
    author: fAuthor.value.trim(),
    genre: fGenre.value.trim(),
    year: Number(fYear.value),
    isbn: fIsbn.value.trim(),
    description: fDesc.value.trim(),
    coverImage,
    available: Number(fAvail.value)
  };

  const id = bookIdField.value;
  try {
    if (id) {
      await apiFetch(`/books/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
      showStatus('Book updated successfully!');
    } else {
      await apiFetch('/books', { method: 'POST', body: JSON.stringify(payload) });
      showStatus('Book added successfully!');
    }
    closeModal(modal);
    // Only reload genres when a new genre was introduced
    const existingGenres = Array.from(genreFilter.options).map((o) => o.value.toLowerCase());
    if (!existingGenres.includes(payload.genre.toLowerCase())) {
      await loadGenres();
    }
    loadBooks();
  } catch (e) {
    showStatus(e.message, 'error');
  }
});

// ===================== DELETE MODAL =====================

function openDeleteModal(id, btn) {
  pendingDeleteId = id;
  const title = btn.closest('.book-card').querySelector('h3').textContent;
  deleteMsg.textContent = `Are you sure you want to delete "${title}"?`;
  openModal(deleteModal);
}

confirmDeleteBtn.addEventListener('click', async () => {
  if (!pendingDeleteId) return;
  try {
    await apiFetch(`/books/${pendingDeleteId}`, { method: 'DELETE' });
    showStatus('Book deleted successfully!');
    closeModal(deleteModal);
    loadBooks();
  } catch (e) {
    showStatus('Could not delete book: ' + e.message, 'error');
    closeModal(deleteModal);
  }
  pendingDeleteId = null;
});

// ===================== MODAL HELPERS =====================

function openModal(m) { m.classList.remove('hidden'); }
function closeModal(m) {
  m.classList.add('hidden');
  if (m === modal) {
    setFormReadOnly(false);
    saveBtn.classList.remove('hidden');
  }
}

function setFormReadOnly(isReadOnly) {
  [fTitle, fAuthor, fGenre, fYear, fIsbn, fDesc, fCoverImage].forEach((field) => {
    field.readOnly = isReadOnly;
  });
  [fAvail, fCoverFile].forEach((field) => {
    field.disabled = isReadOnly;
  });
  saveBtn.disabled = isReadOnly;
}

fCoverFile.addEventListener('change', () => {
  const file = fCoverFile.files && fCoverFile.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showStatus('Please select a valid image file.', 'error');
    fCoverFile.value = '';
    return;
  }
  if (file.size > MAX_COVER_IMAGE_BYTES) {
    showStatus('Image file is too large. Please choose an image under 2MB.', 'error');
    fCoverFile.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const result = String(reader.result || '');
    fCoverImage.value = sanitizeCoverImage(result);
  };
  reader.onerror = () => {
    showStatus('Could not read selected image file.', 'error');
  };
  reader.readAsDataURL(file);
});

// Close buttons
modalClose.addEventListener('click', () => closeModal(modal));
cancelBtn.addEventListener('click',  () => closeModal(modal));
cancelDeleteBtn.addEventListener('click', () => closeModal(deleteModal));

// Close on overlay click
[modal, deleteModal].forEach((m) => {
  m.querySelector('.modal-overlay').addEventListener('click', () => closeModal(m));
});

// ===================== EVENT WIRING =====================

addBookBtn.addEventListener('click', openAddModal);
searchBtn.addEventListener('click', loadBooks);
searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') loadBooks(); });
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  genreFilter.value = '';
  availFilter.value = '';
  loadBooks();
});
genreFilter.addEventListener('change', loadBooks);
availFilter.addEventListener('change', loadBooks);

// ===================== INIT =====================

(async () => {
  await loadGenres();
  await loadBooks();
})();
