function atomToString(content) {
    return content.replace(/[\w]*:/g, (match) => {
        return `"${cleanUpMatch(match)}" =>`;
    });
}

function stringToAtom(content) {
    return content.replace(/"[\w]*"( )?=>/g, (match) => {
        return `${cleanUpMatch(match)}:`;
    });
}

function cleanUpMatch(match) {
    return match.replace(/(\W)*/g, "");
}

module.exports = {
    atomToString,
    stringToAtom
};