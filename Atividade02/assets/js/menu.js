class SidebarMenu extends HTMLElement {
    constructor() {
        super();

        const shadowDOM = this.attachShadow({mode: 'open'});
        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="assets/css/menu.css">
            <nav class="menu">
                <div class="logo">
                    <img src="assets/images/dollar-finance-money-9-svgrepo-com.svg" alt="Logo empresa">
                </div>
                <div class="menu-divider"></div>
                <ul class="menu-links">
                    <li><a href="index.html">Início</a></li>
                    <li><a href="emprestimos.html">Empréstimos</a></li>
                    <li><a href="sejacliente.html">Seja Cliente</a></li>
                </ul>
            </nav>
        `;

        shadowDOM.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('sidebar-menu', SidebarMenu);