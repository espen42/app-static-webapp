const { prettify, prettyReq } = require('/lib/utils');

exports.get = req => {
                                                                                                                        log.info(prettify(prettyReq(req),"------ Versioned req"));
    return {
        body: `
            <html>
                <head>
                    <title>Versioned</title>
                </head>
                <body>
                    <h1>Versioned</h1>
                </body>
            </html>`
    };
};
