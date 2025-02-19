import { ReactNode, useState } from 'react'
import { Langs } from '@/consts/lang'
import { langContext } from '@/hooks/useLangs'

type Props = {
  children: ReactNode
}

const LangsContextProvider = ({ children }: Props) => {
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

export default LangsContextProvider