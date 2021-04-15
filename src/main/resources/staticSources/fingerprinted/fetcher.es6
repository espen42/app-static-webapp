import 'whatwg-fetch'

window.fetchAndAlert = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(json => alert(JSON.stringify(json, null, 4)));
};
