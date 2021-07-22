const libPortal = require('/lib/xp/portal');
const libStatic = require('/lib/enonic/static');

const { prettify, prettyReq } = require('/lib/utils');

const getAsset = libStatic.buildGetter(
    {
        root: 'assets',
        getCleanPath: request => {
            const basePath = `${libPortal.getSite()._path}/assets/`;
            const idx = request.rawPath.indexOf(basePath);
            if (idx === -1) {
                throw Error(`assets.es6 controller basePath ('${basePath}') was not found in request.rawPath ('${request.rawPath}')`);
            }
            return request.rawPath.substring(idx + basePath.length);
        },
        etag: true
    }
);

exports.get = req => {
                                                                                                                        log.info(prettify(prettyReq(req), "------ Assets req"));
                                                                                                                        log.info(prettify(libPortal.getSite()), "Site data");
    return getAsset(req);
};
