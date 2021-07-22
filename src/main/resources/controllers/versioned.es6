const libPortal = require('/lib/xp/portal');
const libStatic = require('/lib/enonic/static');

const { prettify, prettyReq } = require('/lib/utils');

const getVersionedAsset = libStatic.buildGetter(
    {
        root: `static/versioned/${app.version}`,
        getCleanPath: request => {
            const basePath = `${libPortal.getSite()._path}/versioned/`;
            const idx = request.rawPath.indexOf(basePath);
            if (idx === -1) {
                throw Error(`versioned.es6 controller basePath ('${basePath}') was not found in request.rawPath ('${request.rawPath}')`);
            }
            return request.rawPath.substring(idx + basePath.length);
        },
        etag: true
    }
);

exports.get = req => {
                                                                                                                        log.info(prettify(prettyReq(req),"------ Versioned req"));
    return getVersionedAsset(req);
};
