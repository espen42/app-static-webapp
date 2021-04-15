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


                                                                                                                                const prettify = (obj, label, suppressCode = false, indent = 0) => {
                                                                                                                                    let str = " ".repeat(indent) + (
                                                                                                                                        label !== undefined
                                                                                                                                            ? label + ": "
                                                                                                                                            : ""
                                                                                                                                    );

                                                                                                                                    if (typeof obj === 'function') {
                                                                                                                                        if (!suppressCode) {
                                                                                                                                            return `${str}···· (function)\n${" ".repeat(indent + 4)}` +
                                                                                                                                                obj.toString()
                                                                                                                                                    .replace(
                                                                                                                                                        /\r?\n\r?/g,
                                                                                                                                                        `\n${" ".repeat(indent + 4)}`
                                                                                                                                                    ) +
                                                                                                                                                "\n" + " ".repeat(indent) + "····"
                                                                                                                                                ;
                                                                                                                                        } else {
                                                                                                                                            return `${str}···· (function)`;
                                                                                                                                        }

                                                                                                                                    } else if (Array.isArray(obj)) {
                                                                                                                                        return obj.length === 0
                                                                                                                                            ? `${str}[]`
                                                                                                                                            : (
                                                                                                                                                `${str}[\n` +
                                                                                                                                                obj.map(
                                                                                                                                                    (item, i) =>
                                                                                                                                                        prettify(item, i, suppressCode, indent + 4)
                                                                                                                                                )
                                                                                                                                                    .join(",\n") +
                                                                                                                                                `\n${" ".repeat(indent)}]`
                                                                                                                                            );

                                                                                                                                    } else if (obj && typeof obj === 'object') {
                                                                                                                                        try {
                                                                                                                                            if (Object.keys(obj).length === 0) {
                                                                                                                                                return `${str}{}`;
                                                                                                                                            } else {
                                                                                                                                                return `${str}{\n` +
                                                                                                                                                    Object.keys(obj).map(
                                                                                                                                                        key => prettify(obj[key], key, suppressCode, indent + 4)
                                                                                                                                                    ).join(",\n") +
                                                                                                                                                    `\n${" ".repeat(indent)}}`
                                                                                                                                            }
                                                                                                                                        } catch (e) {
                                                                                                                                            log.info(e);
                                                                                                                                            return `${str}···· (${typeof obj})\n${" ".repeat(indent + 4)}` +
                                                                                                                                                obj.toString()
                                                                                                                                                    .replace(
                                                                                                                                                        /\r?\n\r?/g,
                                                                                                                                                        `\n${" ".repeat(indent + 4)}`
                                                                                                                                                    ) +
                                                                                                                                                "\n" + " ".repeat(indent) + `····`;
                                                                                                                                        }
                                                                                                                                    } else if (obj === undefined || obj === null) {
                                                                                                                                        return `${str}${obj}`;
                                                                                                                                    } else if (JSON.stringify(obj) !== undefined) {
                                                                                                                                        return `${str}` + JSON.stringify(obj, null, 2).replace(
                                                                                                                                            /\r?\n\r?/g,
                                                                                                                                            `\n${" ".repeat(indent + 2)}`
                                                                                                                                        );
                                                                                                                                    } else {
                                                                                                                                        return `${str}···· (${typeof obj})\n${" ".repeat(indent + 4)}` +
                                                                                                                                            obj.toString()
                                                                                                                                                .replace(
                                                                                                                                                    /\r?\n\r?/g,
                                                                                                                                                    `\n${" ".repeat(indent + 4)}`
                                                                                                                                                ) +
                                                                                                                                            "\n" + " ".repeat(indent) + `····`;
                                                                                                                                    }
                                                                                                                                };

exports.get = (req) => {

    																													log.info(prettify(req, "GET req"));

    const options = parseOptionParams(req);



    																													log.info(prettify(options, "GET options"));

    const absolutePath = req.rawPath.substring(req.contextPath.length);

    // http://localhost:8080/_/service/test.enonic.staticapp/get/assets/images/html5logo.svg
    // --> /assets/images/html5logo.svg


    																													log.info(prettify(absolutePath, "GET absolutePath"));


    const response = libStatic.get(absolutePath, options);

    // const response = libStatic.get(absolutePath);

    /*
       const response = libStatic.get({
           path: absolutePath,
           ...options
       });
    */


    																													log.info(prettify(response, "GET response"));

    return response;
}

/*


exports.get = libStatic.static('static/fingerprinted', {etag: false});


 */
