const libPortal = require('/lib/xp/portal');
const libStatic = require('/lib/enonic/static');

exports.staticUrl;

let getStatic;

exports.get = req => {
    if (!getStatic) {
        exports.staticUrl = (path) => `${libPortal.serviceUrl('assets')}/${path}`;
        getStatic = libStatic.static('assets');
    }


    log.info("req (" +
    	(Array.isArray(req) ?
    		("array[" + req.length + "]") :
    		(typeof req + (req && typeof req === 'object' ? (" with keys: " + JSON.stringify(Object.keys(req))) : ""))
    	) + "): " + JSON.stringify(req, null, 2)
    );

    const response = getStatic(req);
    log.info("response (" +
    	(Array.isArray(response) ?
    		("array[" + response.length + "]") :
    		(typeof response + (response && typeof response === 'object' ? (" with keys: " + JSON.stringify(Object.keys(response))) : ""))
    	) + "): " + JSON.stringify(response, null, 2)
    );

    return response;
};
