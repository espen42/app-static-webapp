const libPortal = require('/lib/xp/portal');

const libStatic = require('/lib/enonic/static');

const libRouter = require('/lib/router')();

const { prettify, prettyReq } = require('/lib/utils');

exports.all = function(req) {
    return libRouter.dispatch(req);
};




// -------------------------------------  Initiating static-getter #1, and then its lib-route, for clarity:

const assetByStaticGetter = libStatic.buildGetter(
    {
        root: 'assets',
        getCleanPath: request => {
                                                                                                                        log.info(prettify(request.pathParams.libRouterPath, "assetByStatic libRouterPath"));
            return request.pathParams.libRouterPath;
        }
    }
);

libRouter.get(`/assetByStatic/{libRouterPath:.+}`, req => {
                                                                                                                        log.info(prettify(prettyReq(req), "assetByStatic req"));
    const response = assetByStaticGetter(req);
    return response;
});





// -------------------------------------  Shorthand: initiating static-getter #2 and its lib-route, all in one:

const versionedAssetGetter = libStatic.buildGetter(
    {
        root: `static/versioned/${app.version}`,
        getCleanPath: request => {
                                                                                                                        log.info(prettify(request.pathParams.libRouterPath, "versionedAsset libRouterPath"));
            return request.pathParams.libRouterPath;
        },
        etag: true
    }
);
libRouter.get(
    `/versionedAsset/{libRouterPath:.+}`,
    req => {

        																												log.info(prettify(prettyReq(req), "versionedAsset req"));
        return versionedAssetGetter(req);
    }
);


// -----------------------------------------  Route to main. Fingerprinted is the static-getter #3, wrapped in a service:


libRouter.get(`/`, req => {

    																													log.info(prettify(prettyReq(req), "WEBAPP request"));
    const staticServiceUrl = libPortal.serviceUrl({service: 'static'});
    return {
        body: `
            <html>
              <head>
                <meta charset="UTF-8">
                <title>It works - but does slashless index2 redirect in prod runmode?</title>
                <link rel="stylesheet" type="text/css" href="${req.contextPath}/assetByStatic/styles.css"/>
              </head>
              
              <body>
                  <h1>Sweet, it works!</h1>
                  <img src="${req.contextPath}/assetByStatic/images/html5logo.svg"/>
                  
                  <img src="${req.contextPath}/versionedAsset/church.jpg" />
                  
                  <script src="${staticServiceUrl}/fingerprinted/fetcher.1bce7a40.js"></script>
                  <!--script>
                    fetchAndAlert('https://jsonplaceholder.typicode.com/todos/1');
                  </script-->
                  
                  <script src="${staticServiceUrl}/fingerprinted/fetcher.1bce7a40.js"></script>
                  <br />
                  👉 Test the index fallback: <a href="${staticServiceUrl}">static</a>, or try <a href="${staticServiceUrl}/">static/</a> (with a slash)
              </body>
            </html>
        `
    };
});
