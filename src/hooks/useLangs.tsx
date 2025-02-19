import React, { createContext, useContext } from 'react';
import { Langs } from '@/consts/lang';

type LangsContextType = {
  langs: Langs,
  setLangs: React.Dispatch<React.SetStateAction<Langs>>
}

export const langContext = createContext<LangsContextType | undefined>(undefined)
export const useLangs = (): LangsContextType => {
  const context = useContext(langContext)
  if (!context) {
    throw new Error('useLangs muse be used within a LangsContextProvider')
  }
  return context
}