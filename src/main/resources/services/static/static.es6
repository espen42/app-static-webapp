const libStatic = require('/lib/enonic/static');

const getStatic = libStatic.buildGetter({
    root: 'static',
});


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

    																													log.info(prettify(req, "STATIC req"));

    const response = getStatic(req);

    																													log.info(prettify(response, "STATIC response"));
    return response;
}

/*


exports.get = libStatic.static('static/fingerprinted', {etag: false});


 */
