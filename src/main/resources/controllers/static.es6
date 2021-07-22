const { prettify, prettyReq } = require('/lib/utils');

exports.get = req => {
                                                                                                                        log.info(prettify(prettyReq(req),"------ Static req"));
    return {
        body: `
            <html>
                <head>
                    <title>Static</title>
                </head>
                <body>
                    <h1>Static</h1>
                </body>
            </html>`
    };
};
