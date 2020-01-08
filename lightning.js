const LIGHTNING_COMPONENTS = {
    'lightning-youtube': {
        selector: 'iframe[src*="youtube.com/embed/"]',
        importer: import('@lightning-components/youtube'),
    },
    'lightning-google-maps': {
        selector: 'iframe[src*="google.com/maps/embed"]',
        importer: import('@lightning-components/google-maps'),
    },
    'lightning-image': {
        selector: 'img',
        importer: import('@lightning-components/image'),
    },
}

class Lightning {
    constructor(template, options = {}) {
        if (!(template instanceof HTMLTemplateElement)) {
            throw new Error("You must supply an HTMLTemplateElement to LightningComponents.");
        }

        this.fragment = template.content;
        this.options = options;
    }

    renderNode() {
        const promises = [];

        for (let component of Object.getOwnPropertyNames(LIGHTNING_COMPONENTS)) {
            promises.push(this.replaceWithLightningComponent(LIGHTNING_COMPONENTS[component].selector, component));
        }

        return Promise.all(promises).then(() => document.adoptNode(this.fragment));
    }

    replaceTag(node, lightningTag) {
        const originalTag = node.tagName.toLowerCase();

        const regex = new RegExp(originalTag, 'g');

        return node.outerHTML.replace(regex, lightningTag).trim();
    }

    replaceNodes(nodes, lightningTag) {
        nodes.forEach(node => {
            const tpl = document.createElement('template');
            tpl.innerHTML = this.replaceTag(node, lightningTag);
            const tag = tpl.content.firstChild;

            for (let option of Object.getOwnPropertyNames(this.options)) {
                const attrName = option.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, '-').toLowerCase();

                tag.setAttribute(attrName, this.options[option]);
            }

            node.parentNode.replaceChild(tag, node);
        });
    }

    replaceWithLightningComponent(selector, component) {
        const foundNodes = this.fragment.querySelectorAll(selector);

        // if we did not find any elements that can be turned into a lightning-component,
        // then don't do anything
        if (!foundNodes.length) {
            return;
        }

        // we found elements that can be turned into lightning-components, so import the related module
        // then replace all the nodes with a lightning-component version of them.
        return LIGHTNING_COMPONENTS[component].importer.then(() => this.replaceNodes(foundNodes, component));
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

            lightning.renderNode().then(node => {
                // replace the original template element with the lightning-transformed html
                template.parentNode.replaceChild(node, template);
            });

        });

    });

})(document);
