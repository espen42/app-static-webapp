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
        getCleanPath: request => {
            return (
                (request.pathParams || {}).libRouterPath ||
                request.rawPath.substring(`${request.contextPath}/assetByStatic`.length)
            );
        },
        cacheControl: false
    }
);
libRouter.get(
    '/assetByStatic',
    req => {
                                                                                                                        log.info(prettify(prettyReq(req), "assetByStatic req"));
        return assetByStaticGetter(req);
    }
);

libRouter.get(
    '/test1',
    req => {
        log.info("Test1");
        return { body: '<html><body>Test1</body></html>'}
    }
);

libRouter.get(
    '/test2/',
    req => {
        log.info("Test2/");
        return { body: '<html><body>Test2/</body></html>'}
    }
);

libRouter.get(
    [
        '/test3',
        '/test3/'
    ],
    req => {
        log.info("Test3 (array)");
        return { body: '<html><body>Test3 (array)</body></html>'}
    }
);

libRouter.get(
    '/test4/?',
    req => {
        log.info("Test4/?");
        return { body: '<html><body>Test4/?</body></html>'}
    }
);



// -------------------------------------  Shorthand: initiating static-getter #2 and its lib-route, all in one:

const versionedAssetGetter = libStatic.buildGetter(
    {
        root: `static/versioned/${app.version}`,
        getCleanPath: request => {
                                                                                                                        log.info(prettify(request.pathParams.libRouterPath, "versionedAsset libRouterPath"));
            return (
                (request.pathParams || {}).libRouterPath ||
                request.rawPath.substring(`${request.contextPath}/versionedAsset`.length)
            );
        },
        cacheControl: false
    }
);
libRouter.get(
    [
        '/versionedAsset/',
        '/versionedAsset/{libRouterPath:.+}'
    ],
    req => {
        																												log.info(prettify(prettyReq(req), "versionedAsset req"));
        return versionedAssetGetter(req);
    }
);


// -----------------------------------------  Route to main. Fingerprinted is the static-getter #3, wrapped in a service:


libRouter.get(
    [
        '/?',
    ], req => {

    if (!(req.rawPath || '').endsWith('/')) {
                                                                                                                        log.info("Redirecting!");
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
