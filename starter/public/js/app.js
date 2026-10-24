// Offline SVG Fallback for missing/broken sprites
const DEFAULT_IMAGE = "data:image/svg+xml;utf8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="100%" height="100%" fill="#2b3035"/>
    <circle cx="100" cy="100" r="60" fill="none" stroke="#6c757d" stroke-width="8"/>
    <line x1="40" y1="100" x2="160" y2="100" stroke="#6c757d" stroke-width="8"/>
    <circle cx="100" cy="100" r="18" fill="#2b3035" stroke="#6c757d" stroke-width="8"/>
    <text x="50%" y="185" font-family="sans-serif" font-size="14" fill="#adb5bd" text-anchor="middle">No Image</text>
  </svg>
`);

// DOM Elements
const catalogGrid = document.getElementById('catalog-grid');
const catalogSection = document.getElementById('catalog-section');
const catalogCount = document.getElementById('catalog-count');
const catalogSubtitle = document.getElementById('catalog-subtitle');
const loadingSpinner = document.getElementById('loading-spinner');
const errorView = document.getElementById('error-view');
const errorMessage = document.getElementById('error-message');

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const errorResetBtn = document.getElementById('error-reset-btn');
const brandReset = document.getElementById('brand-reset');

// Modal Elements
const modalElement = document.getElementById('characters-modal');
const characterModal = new bootstrap.Modal(modalElement);
const modalName = document.getElementById('modal-name');
const modalId = document.getElementById('modal-id');
const modalImg = document.getElementById('modal-img');
const modalSpecies = document.getElementById('modal-species');
const modalGender = document.getElementById('modal-gender');
const modalWiki = document.getElementById('modal-wiki');

const modalHeight = document.getElementById('modal-height');
const modalMass = document.getElementById('modal-mass');
const modalHomeworld = document.getElementById('modal-homeworld');

const modalAffiliations = document.getElementById('modal-affiliations');
const modalForceSection = document.getElementById('modal-force-section');
const modalMasters = document.getElementById('modal-masters');
const modalApprentices = document.getElementById('modal-apprentices');

const modalDroidSection = document.getElementById('modal-droid-section');
const modalCreator = document.getElementById('modal-creator');
const modalModel = document.getElementById('modal-model');

const modalCharacteristics = document.getElementById('modal-characteristics');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Navigation state
let currentPrevId = null;
let currentNextId = null;
let isModalOpen = false;

modalElement.addEventListener('shown.bs.modal', () => { isModalOpen = true; });
modalElement.addEventListener('hidden.bs.modal', () => { isModalOpen = false; });

/**
 * Fetch and render the catalog list from the student's Express API
 */
async function loadCatalog(searchQuery = '') {
  showLoading(true);
  hideError();

  try {
    // Define your search enpoint here.
    const endpoint = searchQuery
      ? `/api/characters?search=${encodeURIComponent(searchQuery)}`
      : `/api/characters?search=`;

    const response = await fetch(endpoint);
    if (response.status === 404) {
      showError(`No character matched "${searchQuery}".`);
      return;
    }
    if (!response.ok) throw new Error(`Server responded with status ${response.status}`);

    const data = await response.json();
    const list = Array.isArray(data) ? data : (data.results || []);

    if (list.length === 0) {
      showError(searchQuery ? `No character found matching "${searchQuery}".` : 'The catalog is empty.');
      return;
    }

    renderCatalog(list, searchQuery);
  } catch (err) {
    showError(`Failed to communicate with backend API: ${err.message}`);
  } finally {
    showLoading(false);
  }
}

/**
 * Render catalog cards inside the scrollable container
 */
function renderCatalog(characterList, searchQuery) {
  catalogSection.classList.remove('d-none');
  catalogGrid.innerHTML = '';
  catalogCount.textContent = `${characterList.length} entries`;
  catalogSubtitle.textContent = searchQuery ? `Search Results for "${searchQuery}"` : 'All Characters';

  characterList.forEach((character) => {
    const col = document.createElement('div');
    col.className = 'col';

    const card = document.createElement('div');
    card.className = 'card h-100 char-card text-center p-2';
    card.addEventListener('click', () => openDetail(character.id));

    const img = document.createElement('img');
    img.className = 'card-img-top char-card-img mx-auto my-2';
    img.alt = character.name;
    img.src = character.image || DEFAULT_IMAGE;
    img.onerror = () => { img.onerror = null; img.src = DEFAULT_IMAGE; };

    const body = document.createElement('div');
    body.className = 'card-body p-1';

    const idBadge = document.createElement('span');
    idBadge.className = 'badge bg-secondary-subtle text-secondary-emphasis mb-1';
    idBadge.textContent = character.id ? `#${String(character.id).padStart(3, '0')}` : '';

    const title = document.createElement('h6');
    title.className = 'card-title text-capitalize mb-1 fw-bold text-truncate';
    title.textContent = character.name;

    body.append(idBadge, title);
    card.append(img, body);
    col.appendChild(card);
    catalogGrid.appendChild(col);
  });
}

/**
 * Fetch single Character detail and open/update modal
 */
async function openDetail(identifier) {
  if (identifier === null || identifier === undefined) return;

  try {
    // Set the enpoint for retrieving the information.
    const response = await fetch(`/api/characters/${identifier}`);

    if (response.status === 404) {
      if (isModalOpen) characterModal.hide();
      showError(`Character "${identifier}" was not found.`);
      return;
    }

    if (!response.ok) {
      throw new Error(`Server status ${response.status}`);
    }

    const character = await response.json();
    populateModal(character);

    if (!isModalOpen) {
      characterModal.show();
    }
  } catch (err) {
    if (isModalOpen) characterModal.hide();
    showError(`Error loading character details: ${err.message}`);
  }
}

/**
 * Populate modal DOM elements with backend payload
 */
function populateModal(character) {
  modalName.textContent = character.name || 'Unknown';
  modalId.textContent = character.id !== undefined ?`#${String(character.id).padStart(3, '0')}` : '#???';

  modalImg.src = character.image || DEFAULT_IMAGE;
  modalImg.onerror = () => { modalImg.onerror = null; modalImg.src = DEFAULT_IMAGE; };

  modalSpecies.textContent = `Species: ${character.species || 'Unknown'}`;
  modalGender.textContent = `Gender: ${character.gender || 'Unknown'}`;

  if (character.wiki) {
    modalWiki.href = character.wiki;
    modalWiki.classList.remove('disabled');
    modalWiki.textContent = 'View on Star Wars Wiki ↗';
  } else {
    modalWiki.href = '#';
    modalWiki.classList.add('disabled');
    modalWiki.textContent = 'No Wiki Available';
  }

  modalHeight.textContent = character.height ? `${character.height} m` : '-';
  modalMass.textContent = character.mass ? `${character.mass} kg` :'-';
  modalHomeworld.textContent = Array.isArray(character.homeworld)
    ? character.homeworld.join(', ')
    : (character.homeworld || '-');

  // afiliaciones
  modalAffiliations.innerHTML = '';

  const currentAff = Array.isArray(character.affiliations) ? character.affiliations : (character.affiliations ? [character.affiliations] : []);
  const formerAff = Array.isArray(character.formerAffiliations) ? character.formerAffiliations : (character.formerAffiliations ? [character.formerAffiliations] : []);
  const totalAffiliations = [...new Set([...currentAff, ...formerAff])];
  
  if (totalAffiliations.length === 0) {
    modalAffiliations.innerHTML = '<span class="text-secondar small">No affiliations listed</span>';
  } else {
    totalAffiliations.forEach((aff) => {
      const badge = document.createElement('span');
      badge.className = 'badge border border-warning text-warning-emphasis me-1 mb-1';
      badge.textContent = aff;
      modalAffiliations.appendChild(badge);
    });
  }

  // maestros y aprendices
  const masters = Array.isArray(character.masters) ? character.masters : (character.masters ? [character.masters] : []);
  const apprentices = Array.isArray(character.apprentices) ? character.apprentices : (character.apprentices ? [character.apprentices] : []);

  if (masters.length === 0 && apprentices.length === 0) {
    modalForceSection.classList.add('d-none');
  } else {
    modalForceSection.classList.remove('d-none');
    modalMasters.innerHTML = masters.length ? '<strong class="small me-1 text-secondary">Masters:</strong>' : '';
    masters.forEach(m => {
      const b = document.createElement('span');
      b.className = 'badge bg-dark border text-light me-1';
      b.textContent = m;
      modalMasters.appendChild(b);
    });

    modalApprentices.innerHTML = apprentices.length ? '<strong class="small me-1 text-secondary">Apprentices:</strong>' : '';
    apprentices.forEach(a => {
      const b = document.createElement('span');
      b.className = 'badge bg-dark border text-light me-1';
      b.textContent = a;
      modalApprentices.appendChild(b);
    });
  }

  //droides 
  const isDroid = character.species?.toLowerCase() === 'droid' || character.manufacturer || character.model;
  if (isDroid) {
    modalDroidSection.classList.remove('d-none');
    modalCreator.textContent = character.creator || character.manufacturer || '-';
    modalModel.textContent = character.model || character.class || '-';
  } else {
    modalDroidSection.classList.add('d-none');
  }

  // cosas adicionales
  modalCharacteristics.innerHTML = '';
  const extras = [];
  if (character.eyeColor) extras.push(`Eyes: ${character.eyeColor}`);
  if (character.hairColor) extras.push(`Hair: ${character.hairColor}`);
  if (character.skinColor) extras.push(`Skin: ${character.skinColor}`);
  if (character.bornLocation) extras.push(`Born at: ${character.bornLocation}`);
  if (character.diedLocation) extras.push(`Died at: ${character.diedLocation}`);
  if (character.cybernetics) extras.push(`Cybernetics: ${character.cybernetics}`);

  if (extras.length === 0) {
    modalCharacteristics.innerHTML = '<span class="text-secondary small">No additional physical traits</span>';
  } else {
    extras.forEach(trait => {
      const badge = document.createElement('span');
      badge.className = 'badge border text-secondary me-1 mb-1';
      badge.textContent = trait;
      modalCharacteristics.appendChild(badge);
    });
  }
      
  //navegacion circular
  currentPrevId = character.prevIndex ?? character.prevId ?? null;
  currentNextId = character.nextIndex ?? character.nextId ?? null;

  prevBtn.disabled = currentPrevId === null || currentPrevId === undefined;
  nextBtn.disabled = currentNextId === null || currentNextId === undefined;
  }

  // botones de navegación Modal
  prevBtn.addEventListener('click', () => {
    if (currentPrevId !== null && currentPrevId !== undefined) openDetail(currentPrevId);
  });

  nextBtn.addEventListener('click', () => {
    if (currentNextId !== null && currentNextId !== undefined) openDetail(currentNextId);
  });

  // navegación con flechas del teclado
  document.addEventListener('keydown', (e) => {
    if (!isModalOpen) return;
    if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
      e.preventDefault();
      prevBtn.click();
    } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
      e.preventDefault();
      nextBtn.click();
    }
  });

  // formulario de búsqueda
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    clearSearchBtn.classList.remove('d-none');
    loadCatalog(query);
  });

  // botones para resetear la búsqueda
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('d-none');
    loadCatalog();
  });

  errorResetBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('d-none');
    loadCatalog();
  });

  brandReset.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.value = '';
    clearSearchBtn.classList.add('d-none');
    loadCatalog();
  });

  // helpers de interfaz
  function showLoading(show) {
    loadingSpinner.classList.toggle('d-none', !show);
    if (show) {
      catalogSection.classList.add('d-none');
      errorView.classList.add('d-none');
    }
  }

  function showError(msg) {
    loadingSpinner.classList.add('d-none');
    catalogSection.classList.add('d-none');
    errorView.classList.remove('d-none');
    errorMessage.textContent = msg;
  }

  function hideError() {
    errorView.classList.add('d-none');
  }

  // Carga inicial del catálogo completo
  loadCatalog();