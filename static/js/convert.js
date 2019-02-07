// convert to/from various values

var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length) str = padString + str;
    return str;
}

// Convert a byte array to a hex string
bytesToHex = function(bytes) {
    return bytes.map(function(x) { return x.toString(16).lpad('0',2) }).join('');
};

// Convert a byte array to a base-64 string
bytesToBase64 = function(bytes) {
    for(var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 <= bytes.length * 8)
                base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
            else base64.push("=");
        }
    }

    return base64.join("");
}

bytesToBin = function(bytes) {
    return bytes.map(function(x) { return x.toString(2).lpad('0',8) }).join('');
}
