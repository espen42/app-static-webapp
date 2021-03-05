const assetService = require('/services/assets/assets');

exports.get = req => {
    const title = 'Hello Web app';
    return  {
        body: `
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" type="text/css" href="${assetService.staticUrl('styles.css')}">
  </head>
  <body>
      <h1>Sweet, "${title}" is working!</h1>
      <!--img src="/webapp/${app.name}/asset/blah/html5logo.svg"/-->
  </body>
</html>
`
    };
};

/*
const getStatic = (req) => ({
    contentType: 'application/json',
    body: '{"getStatic":' + JSON.stringify(req, null, 2) + '}'
});

const getImmutable = (req) => ({
    contentType: 'application/json',
    body: '{"getImmutable":' + JSON.stringify(req, null, 2) + '}'
});

/*const getAsset = (req) => ({
    contentType: 'application/json',
    body: '{"getAsset":' + JSON.stringify(req, null, 2) + '}'
});

const getStatic2Service = (req) => ({
    contentType: 'application/json',
    body: '{"getAsset":' + JSON.stringify(req, null, 2) + '}'
});

const ROUTES = {
    '/static/': getStatic,
    '/immutable/': getImmutable,

    '/asset/': (req) => {
        log.info("Get asset: " + req.rawPath);
        const response = getTheAsset(req);
        log.info("theAsset (" +
        	(Array.isArray(response) ?
        		("array[" + response.length + "]") :
        		(typeof response + (response && typeof response === 'object' ? (" with keys: " + JSON.stringify(Object.keys(response))) : ""))
        	) + "): " + JSON.stringify(response, null, 2)
        );
        return response;
    },

    '/static2/': getStatic2Service,
};



exports.get = req => {
    log.info("/webapp/ (" +
        (Array.isArray(req) ?
                ("array[" + req.length + "]") :
                (typeof req + (req && typeof req === 'object' ? (" with keys: " + JSON.stringify(Object.keys(req))) : ""))
        ) + "): " + JSON.stringify(req, null, 2)
    );

    let response;
    for (let route of Object.keys(ROUTES)) {
        if (req.rawPath.startsWith(req.contextPath + route)) {
            response = ROUTES[route](req);
            break;
        }
    }
    log.info("asset response (" +
    	(Array.isArray(response) ?
    		("array[" + response.length + "]") :
    		(typeof response + (response && typeof response === 'object' ? (" with keys: " + JSON.stringify(Object.keys(response))) : ""))
    	) + "): " + JSON.stringify(response, null, 2)
    );
    if (response) {
        return response;
    }

    if (req.rawPath !== req.contextPath) {
        return {
            status: 404,
            body: "Nope nope nope"
        };
    }

    return getApp(req);
};


 */
