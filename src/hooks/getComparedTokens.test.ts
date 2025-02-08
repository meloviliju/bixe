import { describe, expect, it } from 'vitest'
import getComparedToken from './getComparedToken'

describe('getComparedToken', () => {
  it('sample', () => {
    expect(getComparedToken(0, 0, 8, { kind: 'pmcp-word', content: 'cecnutit' }, { beginIndex: 0, endIndex: 8, match: 'cecnutit' })).toStrictEqual({
      'afterMatch': '',
      'beforeMatch': '',
      'matchedPortion': {
        'content': 'cecnutit',
        'isZeroWidth': false,
      },
    })
  })
})