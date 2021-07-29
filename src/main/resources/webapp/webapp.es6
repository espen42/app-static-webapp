const libPortal = require('/lib/xp/portal');

const libStatic = require('/lib/enonic/static');

const libRouter = require('/lib/router')();

const { prettify, prettyReq } = require('/lib/utils');

exports.all = function(req) {
                                                                                                                        log.info(prettify(prettyReq(req), "------------------\nRAW req"));
    return libRouter.dispatch(req);
};




// -------------------------------------  Initiating static-getter #1, and then its lib-route, for clarity:

const assetByStaticGetter = libStatic.buildGetter(
    {
        root: 'assets',
        // If no root index fallback:          getCleanPath: request => request.pathParams.libRouterPath,
        getCleanPath: request => (
            request.pathParams.libRouterPath ||
            (request.rawPath.endsWith("/")
                    ? "/"
                    : ""
            )
        ),
        cacheControl: false
    }
);
libRouter.get(
    // If no root index fallback: '/assetByStatic/{libRouterPath:.+}'  note the +
    // For root index fallback (requires lib-router 3+) :
    [
        '/assetByStatic',
        '/assetByStatic/{libRouterPath:.*}'
    ],
    req => {
                                                                                                                        log.info(prettify(prettyReq(req), "assetByStatic req"));
        return assetByStaticGetter(req);
    }
);



// -------------------------------------  Shorthand: initiating static-getter #2 and its lib-route, all in one:

const versionedAssetGetter = libStatic.buildGetter(
    {
        root: `static/versioned/${app.version}`,
        // If no root index fallback:          getCleanPath: request => request.pathParams.libRouterPath,
        getCleanPath: request => (
            request.pathParams.libRouterPath ||
            (request.rawPath.endsWith("/")
                    ? "/"
                    : ""
            )
        ),
        cacheControl: false
    }
);
libRouter.get(
    // If no root index fallback: '/assetByStatic/{libRouterPath:.+}'  note the +
    // For root index fallback (requires lib-router 3+) :
    [
        '/versionedAsset',
        '/versionedAsset/{libRouterPath:.*}'
    ],
    req => {
        																												log.info(prettify(prettyReq(req), "versionedAsset req"));
        return versionedAssetGetter(req);
    }
);


// -----------------------------------------  Route to main. Fingerprinted is the static-getter #3, wrapped in a service:

//   '/?' catches webapp root, both with and without a trailing slash. This syntax requires lib-router 3+
libRouter.get('/?', req => {

    if (!(req.rawPath || '').endsWith('/')) {
                                                                                                                        log.info("Redirecting...");
        return {
            redirect: req.path + '/'
        }
    }

                                                                                                                        log.info(prettify(prettyReq(req), "WEBAPP request"));
    const staticServiceUrl = libPortal.serviceUrl({service: 'static'});

    return {
        body: `
            <html>
              <head>
                <meta charset="UTF-8">
                <title>It works - but does slashless index2 redirect in prod runmode?</title>
                <link rel="stylesheet" type="text/css" href="assetByStatic/styles.css"/>
              </head>
              
              <body>
                  <h1>Sweet, it works!</h1>
                  <img src="assetByStatic/images/html5logo.svg"/>
                  
                  <img src="versionedAsset/church.jpg" />
                  
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
