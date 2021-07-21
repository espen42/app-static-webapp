const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');

const view = resolve('test.html');

exports.get = function(request) {

    const content = portal.getContent();

    const modeLink = request.mode === 'preview'
        ? {
            url: `/site/default/master/${content._name}`,
            text: 'Live'
        }
        : {
            url: `/admin/site/preview/default/draft/${content._name}`,
            text: 'Preview'
        };

    const appLink = {
        url: `/webapp/${app.name}`,
        text: 'Webapp'
    }

    const staticIndexUrlNoSlash = {
        url: `${portal.serviceUrl({service: 'static'})}`,
        text: 'Static (/index.html - NO trailing slash)'
    }
    const staticIndexUrlSlash = {
        url: `${portal.serviceUrl({service: 'static'})}/`,
        text: 'Static (/index.html - WITH trailing slash)'
    }

    const staticIndex2UrlNoSlash = {
        url: `${portal.serviceUrl({service: 'static'})}/index2`,
        text: 'Static/index2 (/index.html - NO trailing slash)'
    }
    const staticIndex2UrlSlash = {
        url: `${portal.serviceUrl({service: 'static'})}/index2/`,
        text: 'Static/index2 (/index.html - WITH trailing slash)'
    }

    const mainRegion = content.page.regions["main"];

    const model = {
        links: [
            modeLink,
            appLink,
            staticIndexUrlNoSlash,
            staticIndexUrlSlash,
            staticIndex2UrlNoSlash,
            staticIndex2UrlSlash
        ],
        urls: {
            styles: `/webapp/${app.name}/assetByStatic/styles.css`,
            html5logo:  `/webapp/${app.name}/assetByStatic/images/html5logo.svg`,
            church: {
                versionedAsset: `/webapp/${app.name}/versionedAsset/church.jpg`,
                service: `${portal.serviceUrl({service: 'static'})}/versioned/${app.version}/church.jpg`,
            }
        },
        mainRegion
    };

    return thymeleaf.render(view, model);
};