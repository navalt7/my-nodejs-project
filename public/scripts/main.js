document.getElementById('homeButton').addEventListener('click', function () {
    window.location.href = "index.html";
});

document.getElementById('aboutButton').addEventListener('click', function () {
    window.location.href = "about.html";
});

document.getElementById('contactButton').addEventListener('click', function () {
    window.location.href = "contact.html";
});

document.getElementById('linksButton').addEventListener('click', function () {
    window.location.href = "links.html";
});

function isAuthenticated() {
    // Check if the user is authenticated based on session token
    // For example, if a session token named 'sessionToken' is set in cookies
    return document.cookie.includes('sessionToken');
}



