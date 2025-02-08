export type Lang = 'ja' | 'x-pmcp'
const langs: Lang[] = ['ja', 'x-pmcp']
export type Langs = {
  searchLang: Lang,
  envLang: Lang
}
export const isLang = (str: string): str is Lang => {
  return (langs as string[]).includes(str)
}