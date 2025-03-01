import { links } from './links.js';

// Lista de contraseñas válidas
const validPasswords = ['98765432', '10293847', '56473829', '01928374', '84736251', '90817263', '73648291', '19283746', '37482910', '48392017', '65748392', '92038471', '73829104', '83920174'];

// Variable para almacenar la contraseña actual
let correctPassword = validPasswords[Math.floor(Math.random() * validPasswords.length)];

// Selección de elementos del DOM
const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');
const passwordInput = document.getElementById('passwordInput');
const enterButton = document.getElementById('enterButton');
const togglePasswordButton = document.getElementById('togglePasswordButton');
const searchBar = document.getElementById('searchBar');
const linksContainer = document.getElementById('linksContainer');
const categoryButtons = document.querySelectorAll('.category-btn');

// Función para manejar el acceso con contraseña
function handleEnter() {
    const password = passwordInput.value;

    if (validPasswords.includes(password)) {
        welcomeScreen.style.display = 'none';
        mainContent.style.display = 'block';
        displayLinks(links); // Mostrar los enlaces
    } else {
        alert('Contraseña incorrecta');
    }
}

// Función para mostrar los enlaces en pantalla
function displayLinks(linksToDisplay) {
    linksContainer.innerHTML = ''; // Limpiar el contenedor

    linksToDisplay.forEach(link => {
        const linkCard = document.createElement('div');
        linkCard.classList.add('link-card');

        linkCard.innerHTML = `
            <h3 class="link-title">${link.title}</h3>
            <a href="${link.url}" class="link-url" target="_blank">${link.url}</a>
            <div class="tags">
                ${link.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        linksContainer.appendChild(linkCard);
    });
}

// Filtro de categoría
function filterCategory(category) {
    const filteredLinks = links.filter(link => category === 'todos' || link.category === category);
    displayLinks(filteredLinks);
}

// Filtro de búsqueda
function filterLinks() {
    const query = searchBar.value.toLowerCase();
    const filteredLinks = links.filter(
        link =>
            link.title.toLowerCase().includes(query) ||
            link.tags.some(tag => tag.toLowerCase().includes(query))
    );
    displayLinks(filteredLinks);
}

// Listeners para los botones y la barra de búsqueda
enterButton.addEventListener('click', handleEnter);
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Listeners para los botones de categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterCategory(category);

            // Actualizar la clase activa
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});
