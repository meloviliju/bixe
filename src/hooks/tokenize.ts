import { Token } from '../consts/types';

export default function tokenize(full_text: string): Token[] {
  const ans: Token[] = [];
  type TokenizerState = { kind: 'handling-word', current: string }
      | { kind: 'inside-brace', depth: number, content: string }
      | { kind: 'handling-others', current: string }
      ;
  let state: TokenizerState = { kind: 'handling-word', current: '' };
  for (let i = 0; i < full_text.length; i++) {
      // Since we will be using regex's index, we need the surrogate pair to be separated
      const c = full_text[i];
      switch (state.kind) {
          case 'handling-word': {
              if (c === '{') {
                  if (state.current !== '') {
                      ans.push({ kind: 'pmcp-word', content: state.current });
                  }
                  state = { kind: 'inside-brace', depth: 1, content: '{' };
              } else if (c === '}') {
                  throw new Error(`Unexpected closing } encountered while handling words. The full text is:\n\n${full_text}`);
              } else if (/[a-zA-Z]/.exec(c)) { // word character
                  state.current += c;
              } else { // other character; word ends
                  if (state.current !== '') {
                      ans.push({ kind: 'pmcp-word', content: state.current });
                  }
                  state = { kind: 'handling-others', current: c };
              }
          } break;
          case 'handling-others': {
              if (c === '{') {
                  if (state.current !== '') {
                      ans.push({ kind: 'others', content: state.current });
                  }
                  state = { kind: 'inside-brace', depth: 1, content: '{' };
              } else if (c === '}') {
                  throw new Error(`Unexpected closing } encountered while handling words. The full text is:\n\n${full_text}`);
              } else if (/[a-zA-Z]/.exec(c)) { // word character; word begins
                  if (state.current !== '') {
                      ans.push({ kind: 'others', content: state.current });
                  }
                  state = { kind: 'handling-word', current: c };
              } else { // other character;
                  state.current += c;
              }
          } break;
          case 'inside-brace': {
              if (c === '{') {
                  state = { kind: 'inside-brace', depth: state.depth + 1, content: state.content + '{' };
              } else if (c === '}') {
                  if (state.depth === 1) {
                      ans.push({ kind: 'problematic-brace', content: state.content + '}' });
                      state = { kind: 'handling-word', current: '' };
                  } else {
                      state = { kind: 'inside-brace', depth: state.depth - 1, content: state.content + '}' };
                  }
              } else {
                  state.content += c;
              }
          } break;
          default: state satisfies never; throw new Error('unreachable');
      }
  }

  if (state.kind === 'handling-word') {
      if (state.current !== '') {
          ans.push({ kind: 'pmcp-word', content: state.current });
      }
  } else if (state.kind === 'handling-others') {
      if (state.current !== '') {
          ans.push({ kind: 'others', content: state.current });
      }
  } else if (state.kind === 'inside-brace') {
      throw new Error(`Closing } not encountered. The full text is:\n\n${full_text}`)
  } else {
      state satisfies never; throw new Error('unreachable');
  }

  // Add EOF token so that the zero-width match at the end of the string is properly displayed
  ans.push({ kind: 'eof', content: '' });

  return ans;
}