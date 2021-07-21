const libStatic = require('/lib/enonic/static');

const { prettify, prettyReq } = require('/lib/utils');

const parseParam = (params, key) => {
    let output;
    if (params[key]) {
        output = params[key];
        if (output.startsWith('"')) {
            output = output
                .replace(/^\"+/, '')
                .replace(/\"+$/, '')
                .split(/\",\s*\"/);

            if (output.length === 1) {
                output = output[0];

            } else {
                const outputObj = {};
                for (let i=0; i<output.length; i += 2) {
                    outputObj[output[i]] = output[i+1];
                }
                output = outputObj;
            }
        }

        if (typeof output === 'string') {
            if (output==="0" || output.toLowerCase()==="false") {
                output = false;
            } else if (output==="1" || output.toLowerCase()==="true") {
                output = true;
            }
        }
    }

    return output;
}


const parseOptionParams = (req) => {
    const options = {};
    for (let i=0; i<Object.keys(req.params).length; i++) {
        const key = Object.keys(req.params)[i];
        options[key] = parseParam(req.params, key);
    }
    return options;
}



exports.get = (req) => {

    																													log.info(prettify(prettyReq(req), "---------------> GET service req"));

    const options = parseOptionParams(req);



    																													log.info(prettify(options, "GET service options"));

    const absolutePath = req.rawPath.substring(req.contextPath.length);

    // http://localhost:8080/_/service/test.enonic.staticapp/get/assets/images/html5logo.svg
    // --> /assets/images/html5logo.svg


    																													log.info(prettify(absolutePath, "GET service absolutePath"));


    const response = libStatic.get(absolutePath, options);

    // const response = libStatic.get(absolutePath);

    /*
       const response = libStatic.get({
           path: absolutePath,
           ...options
       });
    */


    																													log.info(prettify(response, "<------------- GET service response"));

    return response;
}

/*


exports.get = libStatic.static('static/fingerprinted', {etag: false});


 */
