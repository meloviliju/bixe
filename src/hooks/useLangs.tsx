import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Langs } from '@/consts/lang';

type LangsContextType = {
  langs: Langs,
  setLangs: React.Dispatch<React.SetStateAction<Langs>>
}

const langContext = createContext<LangsContextType | undefined>(undefined)
export const useLangs = (): LangsContextType => {
  const context = useContext(langContext)
  if (!context) {
    throw new Error('useLangs muse be used within a LangsContextProvider')
  }
  return context
}

type Props = {
  children: ReactNode
}

export const LangsContextProvider = ({ children }: Props) => {
  const [langs, setLangs] = useState<Langs>({
    envLang: 'ja',
    searchLang: 'ja'
  })

  return (
    <langContext.Provider value={{ langs, setLangs }}>
      {children}
    </langContext.Provider>
  )
}