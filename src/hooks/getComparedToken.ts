import { MatchedToken, Token } from '../consts/types'

const getComparedToken = (
  offset: number,
  tokenStart: number,
  tokenEnd: number,
  token: Token,
  highlight: {
    beginIndex: number,
    endIndex: number,
    match: string
  }): (string | MatchedToken) => {
  const { kind, content } = token
  if (highlight.beginIndex === highlight.endIndex /* is zero-width match */
    && tokenStart <= highlight.beginIndex /* when the match lies at the leftmost position of the token, we want to include it */
    && (kind === 'eof' || highlight.endIndex < tokenEnd
      /* We don't want to include the highlight when the match lies at the rightmost position of the token, to avoid duplication.
      The exception is when the token is a zero-width EOF token
      */
    )) {
    // zero-width match requires special handling
    // but in a way it is simpler
    const splittingIndex = highlight.beginIndex - offset

    return {
      beforeMatch: content.slice(0, splittingIndex),
      matchedPortion: {
        content: '',
        isZeroWidth: true
      },
      afterMatch: content.slice(splittingIndex)
    }
  } else if (highlight.endIndex <= tokenStart || tokenEnd <= highlight.beginIndex) { // non-zero width and no overlap
    return content;
  } else {
    // non-zero width; we have to consider the case when the token partially contains the highlight
    // We already know that `tok_start < o.endIndex` and `o.beginIndex < tok_end`

    const highlightStart = Math.max(tokenStart, highlight.beginIndex);
    const highlightEnd = Math.min(tokenEnd, highlight.endIndex);

    const beforeMatch = token.content.slice(0, highlightStart - offset);
    const matchedPortion = token.content.slice(highlightStart - offset, highlightEnd - offset);
    const afterMatch = token.content.slice(highlightEnd - offset);

    return {
      beforeMatch: beforeMatch,
      matchedPortion: {
        content: matchedPortion,
        isZeroWidth: false
      },
      afterMatch: afterMatch
    };
  }
}

export default getComparedToken