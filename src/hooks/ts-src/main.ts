import './case_conversion_ignoring_roman_c.js';
import './corpus.js';
import './display_result.js';
import './to_kana.js';
import './corpus.js';
import './linkMap.js';
import './search.js';
import './get_hoverable_text.js';
import './words.js';
import './query_lemma.js';
import './get_singly_annotated_line.js';
import './display_result.js';
import './keyboard.js';
import { display_result } from './display_result.js';
import { insertAtCursor } from './keyboard.js';
import { kana_words } from './to_kana.js';

// Expose to global scope: a dirty hack
(window as any).display_result = display_result;
(window as any).insertAtCursor = insertAtCursor;
(window as any).kana_words = kana_words;
