const libPortal = require('/lib/xp/portal');

const libStatic = require('/lib/enonic/static');

const libRouter = require('/lib/router')();

exports.all = function(req) {
    return libRouter.dispatch(req);
};





// -------------------------------------  Initiating static-getter #1, and then its lib-route, for clarity:

const getAsset = libStatic.buildGetter(
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

const versionedGetter = libStatic.buildGetter(
    {
        root: `static/versioned/${app.version}`,
        getCleanPath: request => request.pathParams.libRouterPath,
        etag: true
    }
);
libRouter.get(
    `/versionedAsset/{libRouterPath:.+}`,
    req => {

        																												log.info(prettify(req, "VERSIONED req"));
        return versionedGetter(req);
    }
);


// -----------------------------------------  Route to main. Fingerprinted is the static-getter #3, wrapped in a service:


                                                                                                                        const prettify = (obj, label, suppressCode = false, indent = 0) => {
                                                                                                                            let str = " ".repeat(indent) + (
                                                                                                                                label !== undefined
                                                                                                                                    ? label + ": "
                                                                                                                                    : ""
                                                                                                                            );

                                                                                                                            if (typeof obj === 'function') {
                                                                                                                                if (!suppressCode) {
                                                                                                                                    return `${str}···· (function)\n${" ".repeat(indent + 4)}` +
                                                                                                                                        obj.toString()
                                                                                                                                            .replace(
                                                                                                                                                /\r?\n\r?/g,
                                                                                                                                                `\n${" ".repeat(indent + 4)}`
                                                                                                                                            ) +
                                                                                                                                        "\n" + " ".repeat(indent) + "····"
                                                                                                                                        ;
                                                                                                                                } else {
                                                                                                                                    return `${str}···· (function)`;
                                                                                                                                }

                                                                                                                            } else if (Array.isArray(obj)) {
                                                                                                                                return obj.length === 0
                                                                                                                                    ? `${str}[]`
                                                                                                                                    : (
                                                                                                                                        `${str}[\n` +
                                                                                                                                        obj.map(
                                                                                                                                            (item, i) =>
                                                                                                                                                prettify(item, i, suppressCode, indent + 4)
                                                                                                                                        )
                                                                                                                                            .join(",\n") +
                                                                                                                                        `\n${" ".repeat(indent)}]`
                                                                                                                                    );

                                                                                                                            } else if (obj && typeof obj === 'object') {
                                                                                                                                try {
                                                                                                                                    if (Object.keys(obj).length === 0) {
                                                                                                                                        return `${str}{}`;
                                                                                                                                    } else {
                                                                                                                                        return `${str}{\n` +
                                                                                                                                            Object.keys(obj).map(
                                                                                                                                                key => prettify(obj[key], key, suppressCode, indent + 4)
                                                                                                                                            ).join(",\n") +
                                                                                                                                            `\n${" ".repeat(indent)}}`
                                                                                                                                    }
                                                                                                                                } catch (e) {
                                                                                                                                    log.info(e);
                                                                                                                                    return `${str}···· (${typeof obj})\n${" ".repeat(indent + 4)}` +
                                                                                                                                        obj.toString()
                                                                                                                                            .replace(
                                                                                                                                                /\r?\n\r?/g,
                                                                                                                                                `\n${" ".repeat(indent + 4)}`
                                                                                                                                            ) +
                                                                                                                                        "\n" + " ".repeat(indent) + `····`;
                                                                                                                                }
                                                                                                                            } else if (obj === undefined || obj === null) {
                                                                                                                                return `${str}${obj}`;
                                                                                                                            } else if (JSON.stringify(obj) !== undefined) {
                                                                                                                                return `${str}` + JSON.stringify(obj, null, 2).replace(
                                                                                                                                    /\r?\n\r?/g,
                                                                                                                                    `\n${" ".repeat(indent + 2)}`
                                                                                                                                );
                                                                                                                            } else {
                                                                                                                                return `${str}···· (${typeof obj})\n${" ".repeat(indent + 4)}` +
                                                                                                                                    obj.toString()
                                                                                                                                        .replace(
                                                                                                                                            /\r?\n\r?/g,
                                                                                                                                            `\n${" ".repeat(indent + 4)}`
                                                                                                                                        ) +
                                                                                                                                    "\n" + " ".repeat(indent) + `····`;
                                                                                                                            }
                                                                                                                        };

libRouter.get(`/`, req => {

    																													log.info(prettify(req, "WEBAPP request"));
    const staticServiceUrl = libPortal.serviceUrl({service: 'static'});
    return {
        body: `
            <html>
              <head>
                <meta charset="UTF-8">
                <title>It works</title>
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
