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
            this.html = this.querySelector('template').innerHTML;
            this.innerHTML = '';

            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(this.template());
        }

        connectedCallback() {
            this._upgradeProperty('disableNativeLazyloading');

            let html = this.html;

            const options = {};

            if (this.disableNativeLazyloading) {
                options.disableNativeLazyloading = '';
            }

            html = this.replaceWithLightningComponent(/<iframe(.+youtube\.com\/embed.+)\/iframe>/, 'lightning-youtube', html, options);
            html = this.replaceWithLightningComponent(/<iframe(.+google\.com\/maps\/embed.+)\/iframe>/, 'lightning-google-maps', html, options);
            html = this.replaceWithLightningComponent(/<img([^>]+)>/, 'lightning-image', html, options);

            this.innerHTML = html;
        }

        template() {
            return template.content.cloneNode(true);
        }

        toAttributeName(propertyName) {
            return propertyName.replace(/([a-z])([A-Z])/g, "$1-$2")
                .replace(/\s+/g, '-')
                .toLowerCase();
        }

        replaceWithLightningComponent(regex, componentName, html, options = {}) {
            let matches;

            let attrs = '';

            for (let option of Object.getOwnPropertyNames(options)) {
                const value = options[option];

                attrs += ` ${this.toAttributeName(option)}="${value}"`;
            }

            while ((matches = regex.exec(html)) !== null) {
                const replacement = `<${componentName}${attrs}${matches[1]}></${componentName}>`;

                html = html.replace(regex, replacement).trim();
            }

            return html;
        }

        _upgradeProperty(prop) {
            if (this.hasOwnProperty(prop)) {
                let value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }

        set disableNativeLazyloading(value) {
            if (!value) {
                return this.removeAttribute('disable-native-lazyloading');
            }

            this.setAttribute('disable-native-lazyloading', value);
        }

        get disableNativeLazyloading() {
            return this.hasAttribute('disable-native-lazyloading') && this.getAttribute('disable-native-lazyloading') !== 'false';
        }
    }

    customElements.define('lightning-components', LightningComponents);
})();
