const libStatic = require('/lib/enonic/static');

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

    const options = parseOptionParams(req);

                                                                                                                        log.info("options (" +
                                                                                                                            (Array.isArray(options) ?
                                                                                                                                ("array[" + options.length + "]") :
                                                                                                                                (typeof options + (options && typeof options === 'object' ? (" with keys: " + JSON.stringify(Object.keys(options))) : ""))
                                                                                                                            ) + "): " + JSON.stringify(options, null, 2)
                                                                                                                        );

    const relativePath = req.rawPath.substring(req.contextPath.length);

                                                                                                                        log.info("relativePath (" +
                                                                                                                            (Array.isArray(relativePath) ?
                                                                                                                                ("array[" + relativePath.length + "]") :
                                                                                                                                (typeof relativePath + (relativePath && typeof relativePath === 'object' ? (" with keys: " + JSON.stringify(Object.keys(relativePath))) : ""))
                                                                                                                            ) + "): " + JSON.stringify(relativePath, null, 2)
                                                                                                                        );


    const response = libStatic.get(relativePath, options);
                                                                                                                        log.info("response (" +
                                                                                                                            (Array.isArray(response) ?
                                                                                                                                ("array[" + response.length + "]") :
                                                                                                                                (typeof response + (response && typeof response === 'object' ? (" with keys: " + JSON.stringify(Object.keys(response))) : ""))
                                                                                                                            ) + "): " + JSON.stringify(response, null, 2) + "\n\n\n"
                                                                                                                        );

    return response;
}

/*


exports.get = libStatic.static('static/fingerprinted', {etag: false});


 */
