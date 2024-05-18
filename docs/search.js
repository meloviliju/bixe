"use strict";
let corpus_new_to_old = [...CORPUS];
corpus_new_to_old.sort((a, b) => sources_new_to_old.indexOf(a.source) - sources_new_to_old.indexOf(b.source));
function get_matches(regex_str) {
    return corpus_new_to_old.filter(item => item.pmcp.match(new RegExp(regex_str, "gi"))).map(item => {
        const matched_portions = [];
        /*
        g - global
        i - case insensitive
        d - get the indices */
        const myRe = new RegExp(regex_str, "gid");
        let myArray;
        while ((myArray = myRe.exec(item.pmcp)) !== null) {
            matched_portions.push({
                match: myArray[0],
                beginIndex: myArray.indices[0][0],
                endIndex: myRe.lastIndex
            });
            // zero-width match
            if (myArray.indices[0][0] === myRe.lastIndex) {
                // According to MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
                // > If the regex may match zero-length characters (e.g. /^/gm), increase its lastIndex manually each time to avoid being stuck in the same place.
                myRe.lastIndex++;
            }
        }
        return { item, matched_portions };
    });
}
