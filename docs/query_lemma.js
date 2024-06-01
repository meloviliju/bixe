"use strict";
const words = WORDS.filter(w => !w.目録から排除);
function normalize_word(w) {
    return w.語.toLowerCase()
        .replaceAll(/-(leti|it)\b(?!-)/g, "$1");
    /* ハイフン + leti または ハイフン + it の後に語境界があって、そしてハイフンが直後に後続しないなら、前の単語とくっつける */
}
// 実際には無い語形も登場する、緩めのリスト
const loose_list = words
    .map(normalize_word)
    .flatMap(phrase => phrase.split(/[^a-z]/))
    .flatMap(word => {
    if (word.endsWith("it") && word.length > 2) {
        return [word, word.slice(0, -2)];
    }
    else if (word !== "moleti" && word.endsWith("leti") && word.length > 4) {
        return [word, word.slice(0, -4)];
    }
    else {
        return [word];
    }
});
loose_list.sort();
function queryLemma(word, allow_strip) {
    if (allow_strip) {
        if (word.endsWith("it") && word.length > 2) {
            const without_it = queryLemma(word.slice(0, -2), false);
            if (without_it.kind === "ok") {
                return without_it;
            }
        }
        else if (word !== "moleti" && word.endsWith("leti") && word.length > 4) {
            const without_leti = queryLemma(word.slice(0, -4), false);
            if (without_leti.kind === "ok") {
                return without_leti;
            }
        }
    }
    if (word === "e") {
        // 全ての動詞 (e tata とか)を表示するわけにはいかない
        return { kind: "ok", words: words.filter(w => w.語 === "e") };
    }
    const filtered = words.filter(w => normalize_word(w).split(/[^a-z]/).includes(word));
    const filtered_with_it = words.filter(w => normalize_word(w).split(/[^a-z]/).includes(word + "it"));
    const filtered_with_leti = words.filter(w => normalize_word(w).split(/[^a-z]/).includes(word + "leti"));
    if (filtered.length + filtered_with_it.length + filtered_with_leti.length > 0)
        return { kind: "ok", words: [...filtered, ...filtered_with_it, ...filtered_with_leti] };
    else
        return { kind: "err" };
}
