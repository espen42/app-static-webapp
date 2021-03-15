const libStatic = require('/lib/enonic/static');

const getStatic = libStatic.static({
    root: 'static/fingerprinted',
});

exports.get = (req) => {
    return getStatic(req);
}

/*


exports.get = libStatic.static('static/fingerprinted', {etag: false});


 */
