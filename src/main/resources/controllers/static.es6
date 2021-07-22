const libPortal = require('/lib/xp/portal');
const libStatic = require('/lib/enonic/static');

                                                                                                                        // const { prettify, prettyReq } = require('/lib/utils');

const getStatic = libStatic.buildGetter(
    {
        root: `static`,
        getCleanPath: request => {
            const basePath = `${libPortal.getSite()._path}/static`;
            const pattern = new RegExp(`${basePath}(/.*)?$`);
            const matched = (request.rawPath || '').match(pattern);

            if (!matched) {
                throw Error(`static.es6 controller basePath (${JSON.stringify(basePath)}) was not found in request.rawPath (${JSON.stringify(request.rawPath)}`);
            }

            const output = matched[1] || '';

            																											log.info("------ Static cleanPath: " + JSON.stringify(output));
            return output;
        },
        etag: true
    }
);

exports.get = req => {
                                                                                                                        //log.info(prettify(prettyReq(req),"------ StaticController req"));
    return getStatic(req);
};
