// ============================================
// BIBLIOTECA DIGITAL - GESTOR DE RECURSOS
// ============================================

// Estado global
let items = [];
let editingItemId = null;

// Categorías del dominio
const CATEGORIES = {
  pdf: { name: 'Documento PDF', emoji: '📄' },
  video: { name: 'Video educativo', emoji: '🎥' },
  course: { name: 'Curso online', emoji: '💻' },
  presentation: { name: 'Presentación', emoji: '📊' },
  book: { name: 'Libro digital', emoji: '📚' }
};

// Prioridades
const PRIORITIES = {
  high: { name: 'Alta', color: '#ef4444' },
  medium: { name: 'Media', color: '#f59e0b' },
  low: { name: 'Baja', color: '#22c55e' }
};

// ============================================
// PERSISTENCIA
// ============================================

const loadItems = () => {
  return JSON.parse(localStorage.getItem('libraryItems') ?? '[]');
};

const saveItems = itemsToSave => {
  localStorage.setItem('libraryItems', JSON.stringify(itemsToSave));
};

// ============================================
// CRUD
// ============================================

const createItem = (itemData = {}) => {
  const newItem = {
    id: Date.now(),
    name: itemData.name ?? '',
    description: itemData.description ?? '',
    category: itemData.category ?? 'pdf',
    priority: itemData.priority ?? 'medium',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };

  const newItems = [...items, newItem];
  saveItems(newItems);
  return newItems;
};

const updateItem = (id, updates) => {
  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );

  saveItems(updatedItems);
  return updatedItems;
};

const deleteItem = id => {
  const filteredItems = items.filter(item => item.id !== id);
  saveItems(filteredItems);
  return filteredItems;
};

const toggleItemActive = id => {
  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, active: !item.active, updatedAt: new Date().toISOString() }
      : item
  );

  saveItems(updatedItems);
  return updatedItems;
};

const clearInactive = () => {
  const activeItems = items.filter(item => item.active);
  saveItems(activeItems);
  return activeItems;
};

// ============================================
// FILTROS Y BÚSQUEDA
// ============================================

const filterByStatus = (itemsToFilter, status = 'all') => {
  if (status === 'active') return itemsToFilter.filter(i => i.active);
  if (status === 'inactive') return itemsToFilter.filter(i => !i.active);
  return itemsToFilter;
};

const filterByCategory = (itemsToFilter, category = 'all') => {
  if (category === 'all') return itemsToFilter;
  return itemsToFilter.filter(i => i.category === category);
};

const filterByPriority = (itemsToFilter, priority = 'all') => {
  if (priority === 'all') return itemsToFilter;
  return itemsToFilter.filter(i => i.priority === priority);
};

const searchItems = (itemsToFilter, query = '') => {
  if (!query.trim()) return itemsToFilter;

  const term = query.toLowerCase();

  return itemsToFilter.filter(item =>
    item.name.toLowerCase().includes(term) ||
    (item.description ?? '').toLowerCase().includes(term)
  );
};

const applyFilters = (itemsToFilter, filters = {}) => {
  const {
    status = 'all',
    category = 'all',
    priority = 'all',
    search = ''
  } = filters;

  let result = filterByStatus(itemsToFilter, status);
  result = filterByCategory(result, category);
  result = filterByPriority(result, priority);
  result = searchItems(result, search);

  return result;
};

// ============================================
// ESTADÍSTICAS
// ============================================

const getStats = (itemsToAnalyze = []) => {
  const total = itemsToAnalyze.length;
  const active = itemsToAnalyze.filter(i => i.active).length;
  const inactive = total - active;

  const byCategory = itemsToAnalyze.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const byPriority = itemsToAnalyze.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] ?? 0) + 1;
    return acc;
  }, {});

  return { total, active, inactive, byCategory, byPriority };
};

// ============================================
// RENDER
// ============================================

const getCategoryEmoji = category => {
  return CATEGORIES[category]?.emoji ?? '📌';
};

const formatDate = dateString => {
  return new Date(dateString).toLocaleDateString();
};

const renderItem = item => {
  const { id, name, description, category, priority, active, createdAt } = item;

  return `
    <div class="item ${active ? '' : 'inactive'}" data-item-id="${id}">
      <div>
        <div class="item-name">
          ${getCategoryEmoji(category)} ${name}
        </div>
        ${description ? `<div>${description}</div>` : ''}
        <small>
          ${CATEGORIES[category]?.name} |
          Prioridad: ${PRIORITIES[priority]?.name} |
          ${formatDate(createdAt)}
        </small>
      </div>

      <div class="item-actions">
        <button class="btn-toggle">${active ? 'Desactivar' : 'Activar'}</button>
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Eliminar</button>
      </div>
    </div>
  `;
};

const renderItems = itemsToRender => {
  const list = document.getElementById('item-list');
  const empty = document.getElementById('empty-state');

  if (itemsToRender.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    list.innerHTML = itemsToRender.map(renderItem).join('');
  }
};

const renderStats = stats => {
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;

  const details = Object.entries(stats.byCategory)
    .map(([cat, count]) =>
      `${getCategoryEmoji(cat)} ${CATEGORIES[cat]?.name}: ${count}`
    )
    .join(' | ');

  document.getElementById('stats-details').textContent = details;
};

// ============================================
// EVENTOS
// ============================================

const handleFormSubmit = e => {
  e.preventDefault();

  const name = document.getElementById('item-name').value.trim();
  const description = document.getElementById('item-description').value.trim();
  const category = document.getElementById('item-category').value;
  const priority = document.getElementById('item-priority').value;

  if (!name) {
    alert('El nombre es obligatorio');
    return;
  }

  const itemData = { name, description, category, priority };

  if (editingItemId) {
    items = updateItem(editingItemId, itemData);
  } else {
    items = createItem(itemData);
  }

  resetForm();
  refreshUI();
};

const handleItemClick = e => {
  const itemElement = e.target.closest('.item');
  if (!itemElement) return;

  const id = Number(itemElement.dataset.itemId);

  if (e.target.classList.contains('btn-delete')) {
    if (confirm('¿Eliminar recurso?')) {
      items = deleteItem(id);
      refreshUI();
    }
  }

  if (e.target.classList.contains('btn-toggle')) {
    items = toggleItemActive(id);
    refreshUI();
  }

  if (e.target.classList.contains('btn-edit')) {
    const item = items.find(i => i.id === id);
    if (!item) return;

    document.getElementById('item-name').value = item.name;
    document.getElementById('item-description').value = item.description;
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-priority').value = item.priority;

    editingItemId = id;
  }
};

const getCurrentFilters = () => {
  return {
    status: document.getElementById('filter-status').value,
    category: document.getElementById('filter-category').value,
    priority: document.getElementById('filter-priority').value,
    search: document.getElementById('search-input').value
  };
};

const applyCurrentFilters = () => {
  return applyFilters(items, getCurrentFilters());
};

const handleFilterChange = () => {
  renderItems(applyCurrentFilters());
};

// ============================================
// UTILIDADES
// ============================================

const resetForm = () => {
  document.getElementById('item-form').reset();
  editingItemId = null;
};

const refreshUI = () => {
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

// ============================================
// INICIALIZACIÓN
// ============================================

const attachEventListeners = () => {
  document.getElementById('item-form').addEventListener('submit', handleFormSubmit);
  document.getElementById('item-list').addEventListener('click', handleItemClick);
  document.getElementById('filter-status').addEventListener('change', handleFilterChange);
  document.getElementById('filter-category').addEventListener('change', handleFilterChange);
  document.getElementById('filter-priority').addEventListener('change', handleFilterChange);
  document.getElementById('search-input').addEventListener('input', handleFilterChange);
  document.getElementById('clear-inactive').addEventListener('click', () => {
    if (confirm('¿Eliminar todos los inactivos?')) {
      items = clearInactive();
      refreshUI();
    }
  });
};

const init = () => {
  items = loadItems();
  refreshUI();
  attachEventListeners();
  console.log('Biblioteca Digital lista');
};

document.addEventListener('DOMContentLoaded', init);
