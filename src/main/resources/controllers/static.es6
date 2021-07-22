const libPortal = require('/lib/xp/portal');
const libStatic = require('/lib/enonic/static');

const { prettify, prettyReq } = require('/lib/utils');

const getStatic = libStatic.buildGetter(
    {
        root: `static`,
        getCleanPath: request => {
            const basePath = `${libPortal.getSite()._path}/static/`;
            const idx = request.rawPath.indexOf(basePath);
            if (idx === -1) {
                throw Error(`static.es6 controller basePath ('${basePath}') was not found in request.rawPath ('${request.rawPath}')`);
            }
            return request.rawPath.substring(idx + basePath.length);
        },
        etag: true
    }
);

exports.get = req => {
                                                                                                                        log.info(prettify(prettyReq(req),"------ Static req"));
    return getStatic(req);
};
