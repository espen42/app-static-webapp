const { prettify, prettyReq } = require('/lib/utils');

exports.get = req => {
                                                                                                                        log.info(prettify(prettyReq(req), "------ Assets req"));
    return {
        body: `
            <html>
                <head>
                    <title>Assets</title>
                </head>
                <body>
                    <h1>Assets</h1>
                </body>
            </html>`
    };
};
