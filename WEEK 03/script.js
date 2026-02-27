// ============================================
// CLASE BASE: LibraryItem
// ============================================

class LibraryItem {
  #id;
  #title;
  #active;
  #shelf;
  #dateCreated;

  constructor(title, shelf) {
    this.#id = crypto.randomUUID();
    this.#title = title;
    this.#shelf = shelf;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }

  get id() { return this.#id; }
  get title() { return this.#title; }
  get shelf() { return this.#shelf; }
  get active() { return this.#active; }
  get dateCreated() { return this.#dateCreated; }

  set shelf(value) {
    if (!value || value.trim() === '') {
      throw new Error('La estantería no puede estar vacía');
    }
    this.#shelf = value.trim();
  }

  activate() {
    if (this.#active) return;
    this.#active = true;
  }

  deactivate() {
    if (!this.#active) return;
    this.#active = false;
  }

  getType() {
    return this.constructor.name;
  }

  getInfo() {
    throw new Error('Debe implementarse en clase hija');
  }
}

// ============================================
// CLASES DERIVADAS
// ============================================

class Novel extends LibraryItem {
  #author;
  #pages;
  #genre;

  constructor(title, shelf, author, pages, genre) {
    super(title, shelf);
    this.#author = author;
    this.#pages = pages;
    this.#genre = genre;
  }

  getInfo() {
    return {
      id: this.id,
      title: this.title,
      type: this.getType(),
      author: this.#author,
      pages: this.#pages,
      genre: this.#genre,
      active: this.active
    };
  }
}

class ScienceBook extends LibraryItem {
  #author;
  #field;
  #complexity;

  constructor(title, shelf, author, field, complexity) {
    super(title, shelf);
    this.#author = author;
    this.#field = field;
    this.#complexity = complexity;
  }

  getInfo() {
    return {
      id: this.id,
      title: this.title,
      type: this.getType(),
      author: this.#author,
      field: this.#field,
      complexity: this.#complexity,
      active: this.active
    };
  }
}

class HistoryBook extends LibraryItem {
  #author;
  #period;
  #region;

  constructor(title, shelf, author, period, region) {
    super(title, shelf);
    this.#author = author;
    this.#period = period;
    this.#region = region;
  }

  getInfo() {
    return {
      id: this.id,
      title: this.title,
      type: this.getType(),
      author: this.#author,
      period: this.#period,
      region: this.#region,
      active: this.active
    };
  }
}

// ============================================
// SISTEMA PRINCIPAL
// ============================================

class MainSystem {
  #items = [];

  addItem(item) {
    if (!(item instanceof LibraryItem)) return;
    this.#items.push(item);
  }

  removeItem(id) {
    this.#items = this.#items.filter(item => item.id !== id);
  }

  findItem(id) {
    return this.#items.find(item => item.id === id);
  }

  getAllItems() {
    return [...this.#items];
  }

  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(item => item.active).length;
    const inactive = total - active;

    return { total, active, inactive };
  }
}

// ============================================
// INSTANCIA Y DATOS DE PRUEBA
// ============================================

const system = new MainSystem();

system.addItem(
  new Novel("Cien años de soledad", "A1", "Gabriel García Márquez", 417, "Realismo mágico")
);

system.addItem(
  new ScienceBook("Breve historia del tiempo", "B2", "Stephen Hawking", "Física", "Intermedio")
);

system.addItem(
  new HistoryBook("Sapiens", "C3", "Yuval Noah Harari", "Prehistoria - Moderna", "Global")
);

// ============================================
// REFERENCIAS DOM
// ============================================

const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const filterType = document.getElementById('filter-type');
const filterStatus = document.getElementById('filter-status');
const searchInput = document.getElementById('search-input');

// ============================================
// RENDER
// ============================================

const renderItem = item => `
  <div class="item ${item.active ? '' : 'inactive'}" data-id="${item.id}">
    <div class="item-header">
      <h3>${item.title}</h3>
      <span class="badge">${item.getType()}</span>
    </div>
    <div class="item-details">
      <p>Estantería: ${item.shelf}</p>
      <p>Estado: ${item.active ? 'Activo' : 'Inactivo'}</p>
    </div>
    <div class="item-actions">
      <button class="btn-toggle" data-id="${item.id}">
        ${item.active ? 'Desactivar' : 'Activar'}
      </button>
      <button class="btn-delete" data-id="${item.id}">
        Eliminar
      </button>
    </div>
  </div>
`;

const renderItems = items => {
  if (!items.length) {
    itemList.innerHTML = '<p>No hay libros</p>';
    return;
  }
  itemList.innerHTML = items.map(renderItem).join('');
};

// ============================================
// EVENTOS
// ============================================

const handleFormSubmit = e => {
  e.preventDefault();

  const title = document.getElementById('item-name').value;
  const shelf = document.getElementById('item-location').value;
  const type = document.getElementById('item-type').value;

  let newItem;

  if (type === 'Novela') {
    newItem = new Novel(title, shelf, "Autor Desconocido", 200, "General");
  }

  if (type === 'Ciencia') {
    newItem = new ScienceBook(title, shelf, "Autor Científico", "General", "Básico");
  }

  if (type === 'Historia') {
    newItem = new HistoryBook(title, shelf, "Autor Histórico", "General", "Global");
  }

  if (!newItem) return;

  system.addItem(newItem);
  renderItems(system.getAllItems());
  itemForm.reset();
};

const handleFilterChange = () => {
  let filtered = system.getAllItems();

  if (filterType.value !== 'all') {
    filtered = filtered.filter(item => item.getType() === filterType.value);
  }

  if (filterStatus.value !== 'all') {
    const isActive = filterStatus.value === 'active';
    filtered = filtered.filter(item => item.active === isActive);
  }

  if (searchInput.value) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }

  renderItems(filtered);
};

const handleItemAction = e => {
  const id = e.target.dataset.id;
  if (!id) return;

  const item = system.findItem(id);
  if (!item) return;

  if (e.target.classList.contains('btn-toggle')) {
    item.active ? item.deactivate() : item.activate();
  }

  if (e.target.classList.contains('btn-delete')) {
    if (confirm('¿Eliminar este libro?')) {
      system.removeItem(id);
    }
  }

  renderItems(system.getAllItems());
};

// ============================================
// LISTENERS
// ============================================

itemForm.addEventListener('submit', handleFormSubmit);
filterType.addEventListener('change', handleFilterChange);
filterStatus.addEventListener('change', handleFilterChange);
searchInput.addEventListener('input', handleFilterChange);
itemList.addEventListener('click', handleItemAction);

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  renderItems(system.getAllItems());
  console.log("Sistema cargado correctamente");
});
