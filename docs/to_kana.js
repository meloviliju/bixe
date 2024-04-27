const KANA_TABLE = {
    'p': { 'a': 'パ', 'i': 'ピ', 'u': 'プ', 'e': 'ペ', 'o': 'ポ', '': 'ㇷ゚' },
    'b': { 'a': 'バ', 'i': 'ビ', 'u': 'ブ', 'e': 'ベ', 'o': 'ボ', '': null },
    'm': { 'a': 'マ', 'i': 'ミ', 'u': 'ム', 'e': 'メ', 'o': 'モ', '': null },
    'k': { 'a': 'カ', 'i': 'キ', 'u': 'ク', 'e': 'ケ', 'o': 'コ', '': 'ㇰ' },
    'l': { 'a': 'ラ', 'i': 'リ', 'u': 'ル', 'e': 'レ', 'o': 'ロ', '': 'ㇽ' },
    'n': { 'a': 'ナ', 'i': 'ニ', 'u': 'ヌ', 'e': 'ネ', 'o': 'ノ', '': 'ン' },
    'c': { 'a': 'サ', 'i': 'スィ', 'u': 'ス', 'e': 'セ', 'o': 'ソ', '': 'ㇲ' },
    'x': { 'a': 'シャ', 'i': 'シ', 'u': 'シュ', 'e': 'シェ', 'o': 'ショ', '': null },
    'z': { 'a': 'ツァ', 'i': 'チ', 'u': 'ツ', 'e': 'チェ', 'o': 'ツォ', '': null },
    't': { 'a': 'タ', 'i': 'ティ', 'u': 'トゥ', 'e': 'テ', 'o': 'ト', '': 'ㇳ' },
    'd': { 'a': 'ダ', 'i': 'ディ', 'u': 'ドゥ', 'e': 'デ', 'o': 'ド', '': null },
    'j': { 'a': 'ヤ', 'i': 'イィ', 'u': 'ユ', 'e': 'イェ', 'o': 'ヨ', '': null },
    'w': { 'a': 'ワ', 'i': 'ウィ', 'u': 'ウゥ', 'e': 'ウェ', 'o': 'ウォ', '': null },
    '': { 'a': 'ア', 'i': 'イ', 'u': 'ウ', 'e': 'エ', 'o': 'オ', '': '' },
    'h': { 'a': 'ハ', 'i': 'ヒ', 'u': 'フ', 'e': 'ヘ', 'o': 'ホ', '': null },
    'g': { 'a': 'ガ', 'i': 'ギ', 'u': 'グ', 'e': 'ゲ', 'o': 'ゴ', '': null },
    's': { 'a': 'ザ', 'i': 'ズィ', 'u': 'ズ', 'e': 'ゼ', 'o': 'ゾ', '': null },
};

function to_kana(str) {
    const whole_word = str;
    const MONOSYLLABLE = /^([pbmklncxztdjwhgs]?)([aeiou])([ptkcln](?![aeiou])|)/;
    let ans = "";

    while (str != "") {
        const [syll, onset, vowel, coda] = str.match(MONOSYLLABLE) ?? (() => { throw new Error(`In word "${whole_word}"\nCannot read off a syllable from the beginning of the substring "${str}"`) })();

        ans += KANA_TABLE[onset][vowel] + KANA_TABLE[coda][""];
        str = str.slice(syll.length);
    }
    return ans;
}

test_cases.forEach(([pmcp, kana]) => {
    console.assert(to_kana(pmcp) === kana, to_kana(pmcp), kana)
});

function kana_words(form) {
    const normalized = form.toLowerCase();
    const spacing = '·';
    console.log(spacing);
    return normalized
        .split(/[^ABCDEGHIJKLMNOPSTUWXZ]/i)
        .map(to_kana).join(spacing)
        .replaceAll(/··+/g, "　").replaceAll(/^·|·$/g, "");
}