document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('homeButton');
    const aboutButton = document.getElementById('aboutButton');
    const contactButton = document.getElementById('contactButton');
    const linksButton = document.getElementById('linksButton');

    if (homeButton) {
        homeButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    if (aboutButton) {
        aboutButton.addEventListener('click', () => {
            window.location.href = 'about.html';
        });
    }

    if (contactButton) {
        contactButton.addEventListener('click', () => {
            window.location.href = 'contact.html';
        });
    }

    if (linksButton) {
        linksButton.addEventListener('click', () => {
            window.location.href = 'links.html';
        });
    }
});
