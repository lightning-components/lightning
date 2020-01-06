import "@lightning-components/youtube"
import "@lightning-components/image"
import "@lightning-components/google-maps"

(function() {
    /*
     *
     *     Shadow DOM Template
     * ---------------------------
     *
     */
    const template = document.createElement('template');
    template.innerHTML = `

<style>
</style>

<!-- We want all the elements to live outside of the shadowDOM so that it is fully query-able, style-able, etc as if it wasn't
 inside the shadowDOM at all. The <slot> element allows us to accomplish this. -->
<slot></slot>

`;




    /**
     *
     *     Custom Element
     * ----------------------
     *
     */
    class LightningComponents extends HTMLElement {
        constructor() {
            super();

            // store all the html for later use and immediately clear it all
            this.html = this.innerHTML;
            this.innerHTML = '';

            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(this.template());
        }

        connectedCallback() {
            const template = document.createElement('template');

            let html = this.html;

            html = this.replaceWithLightningComponent(/<iframe(.+youtube\.com\/embed.+)\/iframe>/, 'lightning-youtube', html);
            html = this.replaceWithLightningComponent(/<iframe(.+google\.com\/maps\/embed.+)\/iframe>/, 'lightning-google-maps', html);
            html = this.replaceWithLightningComponent(/<img([^>]+)>/, 'lightning-image', html);

            template.innerHTML = html;
            const noscript = template.content.firstChild;
            this.innerHTML = noscript.innerHTML;
        }

        template() {
            return template.content.cloneNode(true);
        }

        replaceWithLightningComponent(regex, componentName, html) {
            let matches;

            while ((matches = regex.exec(html)) !== null) {
                const replacement = `<${componentName}${matches[1]}></${componentName}>`;

                html = html.replace(regex, replacement).trim();
            }

            return html;
        }
    }

    customElements.define('lightning-components', LightningComponents);
})();
