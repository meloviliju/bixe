import { describe, expect, it } from 'vitest'
import tokenize from './tokenize'

describe('tokenize', ()=> {
  it('sample', () => {
    expect(tokenize('ail icco')).toStrictEqual([{
      'content': 'ail',
      'kind': 'pmcp-word'
    }, {
      'content': ' ',
      'kind': 'others'
    }, {
      'content': 'icco',
      'kind': 'pmcp-word'
    }, {
      'content': '',
      'kind': 'eof'
    }])
  })
})