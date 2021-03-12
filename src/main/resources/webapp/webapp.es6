const libPortal = require('/lib/xp/portal');

const libRouter = require('/lib/router')();

const libStatic = require('/lib/enonic/static');


// -------------------------------------  Initiating 2 different static-getters:

const getAsset = libStatic.static(
    {
        root: 'assets',
        getCleanPath: request => request.pathParams.libRouterPath
    }
);

const getVersioned = libStatic.static(
    `fingerprinted/version/${app.version}`,
    {
        getCleanPath: request => request.pathParams.libRouterPath,
        etag: true
    }
);


// -------------------------------------  Initiating lib-router:

exports.all = function(req) {
    return libRouter.dispatch(req);
};

libRouter.get(`/assetByStatic/{libRouterPath:.+}`, req => {
                                                                                                                        // log.info("Getting asset with lib-static... Request: " + JSON.stringify(req));
    const response = getAsset(req);
                                                                                                                        /*
                                                                                                                        log.info("response (" +
                                                                                                                            (Array.isArray(response)
                                                                                                                                ? ("array[" + response.length + "]")
                                                                                                                                : (typeof response + (response && typeof response === 'object' ? (" with keys: " + JSON.stringify(Object.keys(response))) : "")) ) + "): " + JSON.stringify(response, null, 2) + "\n\n\n"
                                                                                                                        );
                                                                                                                         */
    return response;
});

libRouter.get(`/versionedAsset/{libRouterPath:.+}`, req => {
                                                                                                                        // log.info("Getting versioned resource with lib-static... Request: " + JSON.stringify(req));
    const response = getVersioned(req);
                                                                                                                        /*
                                                                                                                        log.info("response (" +
                                                                                                                            (Array.isArray(response)
                                                                                                                                ? ("array[" + response.length + "]")
                                                                                                                                : (typeof response + (response && typeof response === 'object' ? (" with keys: " + JSON.stringify(Object.keys(response))) : "")) ) + "): " + JSON.stringify(response, null, 2) + "\n\n\n"
                                                                                                                        );
                                                                                                                         */
    return response;
});


// -----------------------------------------  Route to main. Fingerprinted is the third static-getter, wrapped in a service:

libRouter.get(`/`, () => {
    const fingerprintedUrl = libPortal.serviceUrl({service: 'fingerprinted'});
    return {
        body: `
            <html>
              <head>
                <title>It works</title>
                <link rel="stylesheet" type="text/css" href="assetByStatic/styles.css"/>
              </head>
              
              <body>
                  <h1>Sweet, it works!</h1>
                  <img src="assetByStatic/images/html5logo.svg"/>
                  
                  <img src="versionedAsset/church.jpg" />
                  
                  <script src="${fingerprintedUrl}/fetcher.6cf506f0.js"></script>
                  
                  <script>
                    fetchAndAlert('https://jsonplaceholder.typicode.com/todos/1');
                  </script>
                  
              </body>
            </html>
        `
    };
});
