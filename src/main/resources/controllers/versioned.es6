const libPortal = require('/lib/xp/portal');
const libStatic = require('/lib/enonic/static');

                                                                                                                        // const { prettify, prettyReq } = require('/lib/utils');

const getVersionedAsset = libStatic.buildGetter(
    {
        root: `static/versioned/${app.version}`,
        getCleanPath: request => {
            const basePath = `${libPortal.getSite()._path}/versioned`;
            const pattern = new RegExp(`${basePath}(/.*)?$`);
            const matched = (request.rawPath || '').match(pattern);

            if (!matched) {
                throw Error(`versioned.es6 controller basePath (${JSON.stringify(basePath)}) was not found in request.rawPath (${JSON.stringify(request.rawPath)}`);
            }

            const output = matched[1] || '';

                                                                                                                        log.info("------ versioned cleanPath: " + JSON.stringify(output));
            return output;
        },
        cacheControl: false
    }
);

exports.get = req => {
                                                                                                                        //log.info(prettify(prettyReq(req),"------ VersionedController req"));
    return getVersionedAsset(req);
};
