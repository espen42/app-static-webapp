const libPortal = require('/lib/xp/portal');
const libStatic = require('/lib/enonic/static');

                                                                                                                        // const { prettify, prettyReq } = require('/lib/utils');

const getAsset = libStatic.buildGetter(
    {
        root: 'assets',
        getCleanPath: request => {
            const basePath = `${libPortal.getSite()._path}/assets`;
            const pattern = new RegExp(`${basePath}(/.*)?$`);
            const matched = (request.rawPath || '').match(pattern);

            if (!matched) {
                throw Error(`assets.es6 controller basePath (${JSON.stringify(basePath)}) was not found in request.rawPath (${JSON.stringify(request.rawPath)}`);
            }

            const output = matched[1] || '';

                                                                                                                        log.info("------ assets cleanPath: " + JSON.stringify(output));
            return output;
        },
        cacheControl: false
    }
);

exports.get = req => {
                                                                                                                        //log.info(prettify(prettyReq(req), "------ AssetsController req"));
    return getAsset(req);
};
