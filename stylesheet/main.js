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
                <li class="nav-logo"><a href="/"><img src="images/icons/nav-logo.svg" alt=""></a></li>
                <li><a href="projects">Projects</a></li>
                <li><a href="about">About</a></li>
                <li><a href="contact">Contact</a></li>
            </ul>
        </nav>
        `
    }
}

customElements.define('site-nav', SiteNav)
class HomeNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav>
            <input type="checkbox"/>
                <span></span>
                <span></span>
                <span></span>
                </label>
            <ul>
                <li class="nav-logo"><a href="/"><img src="images/icons/nav-logo-home.svg" alt="logo"></a></li>
                <li><a href="projects">Projects</a></li>
                <li><a href="about">About</a></li>
                <li><a href="contact">Contact</a></li>
            </ul>
        </nav>
        `
    }
}

customElements.define('home-nav', HomeNav)

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
                <li class="nav-logo"><a href="/"><img src="/images/icons/nav-logo.svg" alt="logo"></a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
        `
    }
}

customElements.define('portfolio-nav', PortfolioNav)