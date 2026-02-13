const BasicJavaScriptCourseData = {

  name: 'Curso Básico de JavaScript',
  description: 'Recurso educativo digital para aprender los fundamentos de JavaScript.',
  identifier: 'DR-001',

  
  contact: {
    email: 'KnowledgeHubLibrary@instituto.edu',
    location: 'Biblioteca Virtual'
  },


  items: [
    { name: 'Variables', level: 90, category: 'Tema' },
    { name: 'Funciones', level: 85, category: 'Tema' },
    { name: 'DOM', level: 75, category: 'Tema' },
    { name: 'Eventos', level: 70, category: 'Tema' },
    { name: 'APIs', level: 60, category: 'Tema' }
   ],

  stats: {
   total: 1500,
    active: 320,
    rating: 4.8,
    custom: 120
  }
};

const entityName = document.getElementById('entity-name');
const entityDescription = document.getElementById('entity-description');
const itemsList = document.getElementById('items-list');
const statsContainer = document.getElementById('stats');
const themeToggle = document.getElementById('theme-toggle');
const copyBtn = document.getElementById('copy-btn');
const toggleItemsBtn = document.getElementById('toggle-items');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

const renderBasicInfo = () => {
  const { name, description } = BasicJavaScriptCourseData;
  entityName.textContent = name;
  entityDescription.innerHTML = `<p>${description}</p>`;
};

const renderItems = (showAll = false) => {
  const { items } = BasicJavaScriptCourseData;
  const itemsToShow = showAll ? items : items.slice(0, 4);
  
  const itemsHtml = itemsToShow.map(({ name, level }) => `
    <div class="item">
      <div class="item-name">${name}</div>
      <div class="item-level">
        <span>${level}%</span>
        <div class="level-bar">
          <div class="level-fill" style="width: ${level}%"></div>
        </div>
      </div>
    </div>
  `).join('');

  itemsList.innerHTML = itemsHtml;
};

const renderStats = () => {
  const { stats } = BasicJavaScriptCourseData;
  
  const statsArray = [
    { label: 'Estudiantes', value: stats.total },
    { label: 'Activos', value: stats.active },
    { label: 'Calificación', value: stats.rating },
    { label: 'Horas', value: stats.custom }
  ];

  const statsHtml = statsArray.map(({ label, value }) => `
    <div class="stat-item">
      <span class="stat-value">${value}</span>
      <span class="stat-label">${label}</span>
    </div>
  `).join('');

  statsContainer.innerHTML = statsHtml;
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = newTheme;
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

const copyInfo = () => {
  const { name, description, contact } = BasicJavaScriptCourseData;
  const infoText = `
${name}
${description}
Contacto: ${contact?.email ?? 'No disponible'}
Ubicación: ${contact?.location ?? 'No disponible'}
  `.trim();

  navigator.clipboard.writeText(infoText);
  showToast('✅ ¡Información copiada al portapapeles!');
};

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  toggleItemsBtn.textContent = showingAllItems ? 'Mostrar menos' : 'Mostrar más';
};

themeToggle.addEventListener('click', toggleTheme);
copyBtn.addEventListener('click', copyInfo);
toggleItemsBtn.addEventListener('click', handleToggleItems);

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderStats();
  console.log('✅ Aplicación inicializada correctamente');
};

init();
