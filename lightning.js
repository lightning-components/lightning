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

            if (!this.firstElementChild || this.firstElementChild.tagName.toLowerCase() !== 'template') {
                throw new Error("You must have a template tag as the first child under the lightning-components tag.");
            }

            // store all the html for later use and immediately clear it all
            this.fragment = this.querySelector('template').content;
            this.innerHTML = '';

            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(this.template());
        }

        connectedCallback() {
            this._upgradeProperty('disableNativeLazyloading');

            const options = {};

            if (this.disableNativeLazyloading) {
                options.disableNativeLazyloading = '';
            }

            this.replaceWithLightningComponent('iframe[src*="youtube.com/embed/"]', 'iframe', 'lightning-youtube', options);
            this.replaceWithLightningComponent('iframe[src*="google.com/maps/embed"]', 'iframe', 'lightning-google-maps', options);
            this.replaceWithLightningComponent('img', 'img', 'lightning-image', options);

            const cloned = document.importNode(this.fragment, true);
            this.appendChild(cloned);
        }

        template() {
            return template.content.cloneNode(true);
        }

        toAttributeName(propertyName) {
            return propertyName.replace(/([a-z])([A-Z])/g, "$1-$2")
                .replace(/\s+/g, '-')
                .toLowerCase();
        }

        replaceTag(node, originalTag, lightningTag) {
            const regex = new RegExp(originalTag, 'g');

            return node.outerHTML.replace(regex, lightningTag).trim();
        }

        replaceWithLightningComponent(selector, originalTag, lightningTag, options = {}) {
            this.fragment.querySelectorAll(selector).forEach(node => {
                const tpl = document.createElement('template');
                tpl.innerHTML = this.replaceTag(node, originalTag, lightningTag);
                const tag = tpl.content.firstChild;

                for (let option of Object.getOwnPropertyNames(options)) {
                    tag.setAttribute(this.toAttributeName(option), options[option]);
                }

                node.parentNode.replaceChild(tag, node);
            });
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
