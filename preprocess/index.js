import fs from 'fs';

// There are two Roman numerals:
// U+216D Roman Numeral One Hundred
// U+217D Small Roman Numeral One Hundred

// We only want the capital Roman numeral, 
// so we replace the small Roman numeral with the capital Roman numeral right after converting the string to lowercase.

function toLowerCaseIgnoringRomanC(str) {
  return str.toLowerCase().replaceAll('\u217d', '\u216d');
}


const corpus = fs.readFileSync('corpus.tsv', 'utf8').split(/\r\n|\n/).map(line => {
  const [source, pmcp, directJa, ja, en] = line.split('\t');
  return { source, pmcp: toLowerCaseIgnoringRomanC(pmcp), directJa, ja, en };
});

const links = fs.readFileSync('links.tsv', 'utf8').split(/\r\n|\n/).map(line => {
  const [source, ...links] = line.split('\t');

  // Remove the trailing empty strings
  while (links[links.length - 1] === '') {
    links.pop();
  }

  return { source, links };
});

const sources = [];

const linkMap = links.reduce((acc, { source, links }) => {
  sources.push(source);
  acc[source] = links;
  return acc;
}, {});

fs.writeFileSync('../src/hooks/ts-src/corpus.ts', `/* AUTOMATICALLY GENERATED. DO NOT EDIT MANUALLY */
type CorpusElem = {
  source: string;
  pmcp: string;
  directJa: string;
  ja: string;
  en: string;
};
export const CORPUS: CorpusElem[] = ${JSON.stringify(corpus.slice(1), null, 2)};`);
fs.writeFileSync('../src/hooks/ts-src/linkMap.ts', `/* AUTOMATICALLY GENERATED. DO NOT EDIT MANUALLY */
export type Source = ${sources.map(s => JSON.stringify(s)).join(' | ')};
export const sourcesNewToOld: string[] = ${JSON.stringify(sources)};
export const isValidSource = (source: string): source is Source => {
  return sourcesNewToOld.includes(source);
}

export type Hyperlinks = {
  [key in Source]: string[]
};

export const HYPERLINKS: Hyperlinks = ${JSON.stringify(linkMap, null, 2)};`);


// trigram
const [_, ...corpus_] = corpus;
const sourceText = toLowerCaseIgnoringRomanC(corpus_
  .map(item => item.pmcp)
  .join('        ')
  .replaceAll(/\{[\s\S]*?\}/g, ' ')
);

// Make a table of trigrams
const trigrams = {};
for (let i = 0; i < sourceText.length - 2; i++) {
  const trigram = sourceText.slice(i, i + 3);
  if (trigram in trigrams) {
    trigrams[trigram]++;
  } else {
    trigrams[trigram] = 1;
  }
}

fs.writeFileSync('../src/hooks/ts-src/trigrams.ts', `/* AUTOMATICALLY GENERATED. DO NOT EDIT MANUALLY */
const TRIGRAMS = ${JSON.stringify(trigrams, null, 2)};`);

// words
const words = fs.readFileSync('words.tsv', 'utf8').split(/\r\n|\n/).map(line => {
  const [_0, 語, _2, 品詞, 目録から排除, _5, _6, _7, 意味_日, 意味_理] = line.split('\t');
  return { 語, 品詞, 目録から排除: 目録から排除 === 'TRUE', 意味_日 };
});

fs.writeFileSync('../src/hooks/ts-src/words.ts', `/* AUTOMATICALLY GENERATED. DO NOT EDIT MANUALLY */
export type Word = {
  語: string;
  品詞: string;
  目録から排除: boolean;
  意味_日: string;
};
export const WORDS: Word[] = ${JSON.stringify(words.slice(1), null, 2)};`);
