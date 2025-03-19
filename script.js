const config = {
    projectName: '',
    description: '',
    features: [],
    installSteps: [],
    license: 'MIT',
    badges: []
};

function updatePreview() {
    const mdContent = generateMarkdown();
    document.getElementById('previewContent').innerHTML = marked.parse(mdContent);
}

function generateMarkdown() {
    return `# ${config.projectName}
${config.badges.join(' ')}

## Descripción
${config.description}

## Características
${config.features.map(f => `- ${f}`).join('\n')}

## Instalación
\`\`\`bash
${config.installSteps.join('\n')}
\`\`\`

## Licencia
[${config.license}](${config.licenseUrl})`;
}

// Funciones para copiar y descargar
function copyToClipboard() {
    navigator.clipboard.writeText(generateMarkdown());
}

function downloadMD() {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(generateMarkdown()));
    element.setAttribute('download', 'README.md');
    element.click();
}

// Event listeners para actualización en tiempo real
document.querySelectorAll('input, textarea, select').forEach(element => {
    element.addEventListener('input', updatePreview);
});
