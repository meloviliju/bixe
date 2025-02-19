import { Source } from "@/hooks/ts-src/linkMap"

export type Word = {
  headword: string,
  pronunciation: string,
  partOfSpeech: string,
  translation: string
}

export type Token = { kind: 'pmcp-word', content: string }
  | { kind: 'others', content: string }
  | { kind: 'problematic-brace', content: string }
  | { kind: 'eof', content: '' }

export type MatchedToken = {
  beforeMatch: string,
  matchedPortion: {
    content: string,
    isZeroWidth: boolean
  },
  afterMatch: string
}

type CorpusElem = {
  source: Source;
  pmcp: string;
  directJa: string;
  ja: string;
  en: string;
};

export type Result = {
  item: CorpusElem;
  matchedPortions: {
    match: string;
    beginIndex: number;
    endIndex: number;
  }[];
}