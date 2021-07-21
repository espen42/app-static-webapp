const libStatic = require('/lib/enonic/static');

const { prettify, prettyReq } = require('/lib/utils');


const getStatic = libStatic.buildGetter({
    root: 'static',
    etag: true
});


exports.get = (req) => {
    																													log.info(prettify(prettyReq(req), "-------------> STATIC service req"));

    const response = getStatic(req);

    																													log.info(prettify(response, "<-------------- STATIC service response"));
    return response;
}

/*


exports.get = libStatic.static('static/fingerprinted', {etag: false});


 */
