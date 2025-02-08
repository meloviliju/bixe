import { Fragment, useContext } from 'react'
import langContext from '@/hooks/langContext'
import { toLowerCaseIgnoringRomanC } from '@/hooks/ts-src/case_conversion_ignoring_roman_c'
import { queryLemma } from '@/hooks/ts-src/query_lemma'
import { kana_words } from '@/hooks/ts-src/to_kana'
import style from '@/styles/tooltip.module.css'
import { correctBlatantTypo, isBlatantTypo } from '@/hooks/ts-src/blatant-typo'
import { isEarthlingWord } from '@/hooks/ts-src/earthling'

type Props = {
  text: string,
}

const Tooltip = ({ text }: Props) => {
  const { envLang } = useContext(langContext)
  const description = queryLemma(text, true)
  if (description.kind === 'ok') {
    return (
      <span className={`${style.tooltipText} ${style.bottomTooltipText}`}>
        {
          description.words.map((word, index) => {
            const [headword, partOfSpeech, content] = [toLowerCaseIgnoringRomanC(word.語), word.品詞, word.意味_日]
            return (
              <Fragment key={index}>
                <div>
                  <span className={style.headword}>{headword.toUpperCase()}</span>
                  <span className={style.pronunciation} lang={envLang}>{`［${kana_words(headword)}］`}</span>
                </div>
                <div className={style.wordDescription} lang={envLang}>
                  <span className={style.partOfSpeech}>{partOfSpeech}</span>
                  <span className={style.translation}>{content}</span>
                </div>
              </Fragment>
            )
          })
        }
      </span>
    )
  } else if (isBlatantTypo(text)) {
    const correctedHeadword = correctBlatantTypo(text)
    if (correctedHeadword == undefined) {
      throw new Error()
    }
    return (
      <span className={`${style.tooltipText} ${style.bottomTooltipText} ${style.blatantTypo}`}>
        <>
          <div>
            <span className={style.headword}>{text.toUpperCase()}</span>
            <span className={style.pronunciation} lang={envLang}>{`［${kana_words(correctedHeadword)}］`}</span>
          </div>
          <div className={style.wordDescription} lang={envLang}>
            <span className={style.partOfSpeech}>明確な誤字</span>
            <span className={style.translation} lang={envLang}>{correctedHeadword.toUpperCase()}の誤字</span>
          </div>
        </>
      </span>
    )
  } else if (isEarthlingWord(text)) {
    return (
      <span className={`${style.tooltipText} ${style.bottomTooltipText} ${style.inEarthlingList}`}>
        <div>
          <span className={style.headword}>{text.toUpperCase()}</span>
          <span className={style.pronunciation} lang={envLang}>{`［${kana_words(text)}］`}</span>
        </div>
        <div className={style.wordDescription} lang={envLang}>
          <span className={style.partOfSpeech}>現世の単語</span>
          <span className={style.translation} />
        </div>
      </span>
    )
  } else {
    return <></>
  }

}

export default Tooltip