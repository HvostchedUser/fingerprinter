var options = {
    preprocessor: null,
    audio: {
      timeout: 1000,
      // On iOS 11, audio context can only be used in response to user interaction.
      // We require users to explicitly enable audio fingerprinting on iOS 11.
      // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
      excludeIOS11: true
    },
    fonts: {
      swfContainerId: 'fingerprintjs2',
      swfPath: 'flash/compiled/FontList.swf',
      userDefinedFonts: [],
      extendedJsFonts: false
    },
    screen: {
      // To ensure consistent fingerprints when users rotate their mobile devices
      detectScreenOrientation: true
    },
    plugins: {
      sortPluginsFor: [/palemoon/i],
      excludeIE: false
    },
    extraComponents: [],
    excludes: {
      // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
      'enumerateDevices': true,
      // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
      'pixelRatio': true,
      // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
      'doNotTrack': true,
      // uses js fonts already
      'fontsFlash': true,
      'userAgent': true
    },
    NOT_AVAILABLE: 'not available',
    ERROR: 'error',
    EXCLUDED: 'excluded'
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