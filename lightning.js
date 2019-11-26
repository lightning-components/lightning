// navigator.serviceWorker.register('/examples/sw.js');

// (function () {
//     document.querySelectorAll('iframe').forEach(el => {
//         el.outerHTML = el.outerHTML.replace(/iframe/g, 'lightning-youtube').trim();
//     });
//
//     document.querySelectorAll('img').forEach(el => {
//         // el.outerHTML = el.outerHTML.replace(/img/g, 'lightning-image').trim();
//
//         el.src = 'data:image/gif;base64,R0lGOD lhCwAOAMQfAP////7+/vj4+Hh4eHd3d/v7+/Dw8HV1dfLy8ubm5vX19e3t7fr 6+nl5edra2nZ2dnx8fMHBwYODg/b29np6eujo6JGRkeHh4eTk5LCwsN3d3dfX 13Jycp2dnevr6////yH5BAEAAB8ALAAAAAALAA4AAAVq4NFw1DNAX/o9imAsB tKpxKRd1+YEWUoIiUoiEWEAApIDMLGoRCyWiKThenkwDgeGMiggDLEXQkDoTh CKNLpQDgjeAsY7MHgECgx8YR8oHwNHfwADBACGh4EDA4iGAYAEBAcQIg0DkgcEIQA7';
//     });
// })();






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

<div class="lightning-components">
</div>

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

            let html = this.innerHTML;
            this.innerHTML = '';

            html = html.replace(/<noscript>/g, '').trim();
            html = html.replace(/<\/noscript>/g, '').trim();

            html = this.replaceWithLightningComponent(/<iframe(.+youtube\.com\/embed.+)\/iframe>/, 'lightning-youtube', html);
            html = this.replaceWithLightningComponent(/<iframe(.+google\.com\/maps\/embed.+)\/iframe>/, 'lightning-google-maps', html);
            html = this.replaceWithLightningComponent(/<img([^>]+)>/, 'lightning-image', html);

            this.innerHTML = html;

            // this.attachShadow({mode: 'open'});
            // this.shadowRoot.appendChild(this.template());
        }

        // template() {
        //     return template.content.cloneNode(true);
        // }

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
