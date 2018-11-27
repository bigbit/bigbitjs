function getCodePoint(str, i) {
    var first = str.charCodeAt(i);

    if (first >= 0xD800 && first <= 0xDBFF && str.length > 1) {
        var second = str.charCodeAt(i+1);

        if (second >= 0xDC00 && second <= 0xDFFF) {
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
    }

    return first;
};

module.exports = {
    getCodePoint : getCodePoint
}