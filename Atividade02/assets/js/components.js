function loadComponent(selector, file) {
    fetch(file)
        .then(reponse => reponse.text())
        .then(html => {
            document.querySelector(selector).innerHTML = html;
        })
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent(".menu-container", "components/menu.html");
    loadComponent(".footer-container", "components/footer.html")
})