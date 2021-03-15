const libPortal = require('/lib/xp/portal');

const libStatic = require('/lib/enonic/static');

const libRouter = require('/lib/router')();

exports.all = function(req) {
    return libRouter.dispatch(req);
};





// -------------------------------------  Initiating static-getter #1, and then its lib-route, for clarity:

const getAsset = libStatic.static(
    {
        root: 'assets',
        getCleanPath: request => request.pathParams.libRouterPath
    }
);

libRouter.get(`/assetByStatic/{libRouterPath:.+}`, req => {
    const response = getAsset(req);
    return response;
});





// -------------------------------------  Shorthand: initiating static-getter #2 and its lib-route, all in one:

libRouter.get(
    `/versionedAsset/{libRouterPath:.+}`,
    libStatic.static(
        {
            root: `static/versioned/${app.version}`,
            getCleanPath: request => request.pathParams.libRouterPath,
            etag: true
        }
    )
);


// -----------------------------------------  Route to main. Fingerprinted is the static-getter #3, wrapped in a service:

libRouter.get(`/`, () => {
    const staticServiceUrl = libPortal.serviceUrl({service: 'static'});
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
                  
                  <script src="${staticServiceUrl}/fingerprinted/fetcher.6cf506f0.js"></script>
                  <!--script>
                    fetchAndAlert('https://jsonplaceholder.typicode.com/todos/1');
                  </script-->
                  
              </body>
            </html>
        `
    };
});
