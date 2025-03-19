const config = {
    projectName: 'Mi Proyecto',
    description: '',
    features: [],
    installSteps: [],
    license: 'MIT',
    badges: []
};

// Tema inicial
let isDarkMode = localStorage.getItem('theme') === 'dark';

// Elementos del DOM
const elements = {
    projectName: document.getElementById('projectName'),
    description: document.getElementById('description'),
    features: document.getElementById('features'),
    installSteps: document.getElementById('installSteps'),
    license: document.getElementById('license')
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Configurar tema
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Event listeners
    Object.entries(elements).forEach(([key, element]) => {
        element.addEventListener('input', updateConfig);
    });
    
    // Valores iniciales
    updateConfig();
});

function updateConfig() {
    config.projectName = elements.projectName.value;
    config.description = elements.description.value;
    config.features = elements.features.value.split(',').map(f => f.trim());
    config.installSteps = elements.installSteps.value.split('\n');
    config.license = elements.license.value;
    
    updatePreview();
}

function updatePreview() {
    const mdContent = generateMarkdown();
    document.getElementById('previewContent').innerHTML = marked.parse(mdContent);
    Prism.highlightAll();
}

function generateMarkdown() {
    return `# ${config.projectName || 'Nombre del Proyecto'}
${config.badges.join(' ')}

## 📖 Descripción
${config.description || 'Describe tu proyecto aquí'}

## ✨ Características
${config.features.map(f => `- ${f}`).join('\n') || '- Agrega características'}

## 🚀 Instalación
\`\`\`bash
${config.installSteps.join('\n') || '# Comandos de instalación'}
\`\`\`

## 📄 Licencia
Distribuido bajo la licencia ${config.license}. Ver [LICENSE](LICENSE) para más información.`;
}

// Funciones de utilidad
function copyToClipboard() {
    navigator.clipboard.writeText(generateMarkdown());
    alert('¡Markdown copiado al portapapeles!');
}

function downloadMD() {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(generateMarkdown()));
    element.setAttribute('download', 'README.md');
    element.click();
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}
