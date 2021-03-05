

const getApp = (req) => {
    const title = 'Hello Web app';
    return  {
        body: `
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" type="text/css" href="styles.css"/>
  </head>
  <body>
      <h1>Sweet, "${title}" is working!</h1>
      <img src="html5logo.svg"/>
  </body>
</html>
`
    };
};



const getStatic = (req) => ({
    contentType: 'application/json',
    body: '{"getStatic":' + JSON.stringify(req, null, 2) + '}'
});

const getImmutable = (req) => ({
    contentType: 'application/json',
    body: '{"getImmutable":' + JSON.stringify(req, null, 2) + '}'
});

const getAsset = (req) => ({
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
    '/asset/': getAsset,
    '/static2/': getStatic2Service,
};



exports.get = req => {
    log.info("/webapp/ (" +
        (Array.isArray(req) ?
                ("array[" + req.length + "]") :
                (typeof req + (req && typeof req === 'object' ? (" with keys: " + JSON.stringify(Object.keys(req))) : ""))
        ) + "): " + JSON.stringify(req, null, 2)
    );

    for (let route of Object.keys(ROUTES)) {
        if (req.rawPath.startsWith(req.contextPath + route)) {
            return ROUTES[route](req);
        }
    }

    if (req.rawPath.replace(/\/+$/, '') !== req.contextPath) {
        return {
            status: 404,
            body: "Nope nope nope"
        };
    }

    return getApp(req);
};
