import { createContext } from 'react';
import { Langs } from '../consts/lang';

export const langContext = createContext<Langs>({
  searchLang: 'x-pmcp',
  envLang: 'x-pmcp',
})

export default langContext