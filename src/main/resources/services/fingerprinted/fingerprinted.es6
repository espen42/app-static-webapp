const libStatic = require('/lib/enonic/static');

const getStatic = libStatic.static({
    root: 'fingerprinted/filename',
    etag: false
});

exports.get = (req) => {
    return getStatic(req);
}

/*


exports.get = libStatic.static('fingerprinted/filename', {etag: false});


 */
