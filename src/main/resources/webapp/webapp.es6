exports.get = function (req) {
  const title = 'Hello Web app';
  return  {
    body: `
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" type="text/css" href="styles.css"/>
  </head>
  <body>
      <h1>Sweet, "${title}" is working!</h1>
      <img src="html5logo.svg"/>
  </body>
</html>
`
  };
};
