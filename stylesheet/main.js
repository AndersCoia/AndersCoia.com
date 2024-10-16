class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <p>©</p>
                <p>2023-2024</p>
                <p>Anders Coia</p>
            </footer>
        `
    }
}

customElements.define('site-footer', SiteFooter)

class SiteNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav>
            <input type="checkbox"/>
                <span></span>
                <span></span>
                <span></span>
                </label>
            <ul>
                <li class="navname"><a href="/"><h1>Anders Coia</h1></a></li>
                <li><a href="design">Design</a></li>
                <li><a href="photography">Photography</a></li>
                <li><a href="animation">Animation</a></li>
                <li><a href="about">About</a></li>
                <li><a href="contact">Contact</a></li>
            </ul>
        </nav>
        `
    }
}

customElements.define('site-nav', SiteNav)

class PortfolioNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav>
            <input type="checkbox"/>
                <span></span>
                <span></span>
                <span></span>
                </label>
            <ul>
                <li class="navname"><a href="../"><h1>Anders Coia</h1></a></li>
                <li><a href="../design">Design</a></li>
                <li><a href="../photography">Photography</a></li>
                <li><a href="../animation">Animation</a></li>
                <li><a href="../about">About</a></li>
                <li><a href="../contact">Contact</a></li>
            </ul>
        </nav>
        `
    }
}

customElements.define('portfolio-nav', PortfolioNav)