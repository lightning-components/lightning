# Lightning Components

Improve your websites page speed performance by slow elements with faster alternatives.

## Features

- Lazy load images that are not yet on screen to improve performance.
- Lazy load youtube videos.
- Replace youtube videos with a static image until it is played.
- Lazy load google maps.
- It's just a vanilla web component, no frameworks to install.
- Will use the browser's built in native lazy loading if it supports it.
- Only loads the scripts required for your particular page.

## Install

###### Install with npm

```
npm install @lightning-components/lightning
```

After installing, import it into your project.

```
import '@lightning-components/lightning'
```

## Usage

Lightning Components require a specific syntax to work properly. All you need to do is add a ``` <template lightning-components> ``` tag to your already existing html, right after the ```body``` tag.

So if this was the original html on your page:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <title>Example Usage</title>
    </head>
    <body>
        <h1>Example Usage</h1>
        <iframe width="560" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42562.2757072101!2d-75.15273957606611!3d39.94151589949284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c8830b04502f%3A0xce39e053fb81ef23!2sLiberty%20Bell!5e0!3m2!1sen!2sus!4v1574103352377!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
        <img src="https://placehold.it/399x399" width="399" height="399" alt="">
        <img src="https://placehold.it/400x400" width="400" height="400" alt="">
    </body>
</html>
```
You would rewrite that as:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <title>Example Usage</title>
    </head>
    <body>
        <template lightning-components>
            <h1>Example Usage</h1>
            <iframe width="560" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42562.2757072101!2d-75.15273957606611!3d39.94151589949284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c8830b04502f%3A0xce39e053fb81ef23!2sLiberty%20Bell!5e0!3m2!1sen!2sus!4v1574103352377!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
            <img src="https://placehold.it/399x399" width="399" height="399" alt="">
            <img src="https://placehold.it/400x400" width="400" height="400" alt="">
        </template>
    </body>
</html>
```
