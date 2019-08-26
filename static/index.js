const options = {
    excludes: {userAgent: true}
}

if (window.requestIdleCallback) {
    requestIdleCallback(function () {
        Fingerprint2.get(options, function (components) {
            printInfo(components);
        })
    })
} else {
    setTimeout(function () {
        Fingerprint2.get(options, function (components) {
            printInfo(components);
        })  
    }, 500)
}

function printInfo(components) {
    result = {};
    for (let el of components)
        result[el.key] = el.value;
    var values = components.map(function (component) { return component.value })
    var murmur = Fingerprint2.x64hash128(values.join(''), 31)
    console.log(result)
    console.log(murmur)

    const cont = document.querySelector(".cntnr")
    cont.innerHTML = cont.innerHTML + `<b>HASH: </b> ${murmur}<br>`;
    for (let el of components)
        cont.innerHTML = cont.innerHTML + `<b>${el.key}: </b> ${el.value}<br>`;
}