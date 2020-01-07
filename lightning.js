import "@lightning-components/youtube"
import "@lightning-components/image"
import "@lightning-components/google-maps"

class Lightning {
    constructor(template, options = {}) {
        if (!(template instanceof HTMLTemplateElement)) {
            throw new Error("You must supply an HTMLTemplateElement to LightningComponents.");
        }

        this.fragment = template.content;
        this.options = options;
    }

    renderNode() {
        this.replaceWithLightningComponent('iframe[src*="youtube.com/embed/"]', 'lightning-youtube');
        this.replaceWithLightningComponent('iframe[src*="google.com/maps/embed"]', 'lightning-google-maps');
        this.replaceWithLightningComponent('img', 'lightning-image');

        return document.importNode(this.fragment, true);
    }

    replaceTag(node, lightningTag) {
        const originalTag = node.tagName.toLowerCase();

        const regex = new RegExp(originalTag, 'g');

        return node.outerHTML.replace(regex, lightningTag).trim();
    }

    replaceWithLightningComponent(selector, originalTag, lightningTag) {
        this.fragment.querySelectorAll(selector).forEach(node => {
            const tpl = document.createElement('template');
            tpl.innerHTML = this.replaceTag(node, originalTag, lightningTag);
            const tag = tpl.content.firstChild;

            for (let option of Object.getOwnPropertyNames(this.options)) {
                const attrName = option.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, '-').toLowerCase();

                tag.setAttribute(attrName, this.options[option]);
            }

            node.parentNode.replaceChild(tag, node);
        });
    }
}

(function(document) {

    /**
     * Wait until DOMContentLoaded in case the script is included
     * in the head without a defer attribute.
     */
    document.addEventListener('DOMContentLoaded', () => {

        /**
         * Get any of our supported attributes that are on the template.
         */
        function getLightningComponentOptions(template) {
            let options = {};

            if (template.hasAttribute('disable-native-lazyloading') && template.getAttribute('disable-native-lazyloading') !== 'false') {
                options.disableNativeLazyloading = '';
            }

            return options;
        };

        /**
         * Search for the syntax that we expect (a template tag with a lightning-components attribute) and
         * transform all the html inside the template to use lightning-components versions of the supported elements.
         */
        document.querySelectorAll('template[lightning-components]').forEach(template => {
            const lightning = new Lightning(template, getLightningComponentOptions(template));

            // replace the original template element with the lightning-transformed html
            template.parentNode.replaceChild(lightning.renderNode(), template);
        });

    });

})(document);
