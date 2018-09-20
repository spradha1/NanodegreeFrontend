if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then((reg) => {
        console.log("Registration of service worker successsful: " + reg.scope);
    })
    .catch((error) => {
        console.log("Registration of service worker failed: " + error);
    });
}