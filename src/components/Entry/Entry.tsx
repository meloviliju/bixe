import CorpusText from '@/components/Entry/CorpusText';
import { Result } from '@/consts/types';
import langContext from '@/hooks/langContext';
import { HYPERLINKS, is_valid_source, Source } from '@/hooks/ts-src/linkMap';
import { kana_words } from '@/hooks/ts-src/to_kana';
import style from '@/styles/entry.module.css'
import { JSX, useContext } from 'react';
import TranslationJa from './TranslationJa';

type Props = {
  result: Result,
}

const Entry = ({ result }: Props) => {
  const { searchLang } = useContext(langContext)
  const { pmcp: pmcp_text, ja, directJa, en, source } = result.item;
  const kana = (() => {
    try {
      return kana_words(pmcp_text);
    } catch (e) {
      return '';
    }
  })();

  const source_signifier = source;
  if (!is_valid_source(source_signifier)) {
    throw new Error(`Invalid source signifier: ${source_signifier}`);
  }

  const pmcpText: JSX.Element[] = searchLang === 'x-pmcp'
    ? result.matchedPortions.map((matchedPortion, index) => {
      return (
        <CorpusText key={index} fullText={pmcp_text} highlighted={matchedPortion} />
      )
    })
    : [<CorpusText fullText={pmcp_text} />]

  const jaText: JSX.Element[] = searchLang === 'ja'
    ? result.matchedPortions.map((matchedPortion, index) => {
      return (
        <TranslationJa key={index} fullText={ja} highlighted={matchedPortion} />
      )
    })
    : [<TranslationJa fullText={ja} />]

  return (
    <div className={style.searchedItem}>
      {...pmcpText}
      <div className={style.pronunciation}>{kana}</div>
      <div className={style.translationJa}>
        {...jaText}
        {directJa && <div className={style.translationJaDirect}>{directJa}</div>}
      </div>
      {en && <div className={style.translationEn}>{en}</div>}
      <details>
        <summary className={style.summary}><span className={style.sourceName}>{source}</span></summary>
        <ul>
          {HYPERLINKS[source as Source].map(
            (link, index) => <li key={index}><a href={link}>{link}</a></li>)
          }
        </ul>
      </details>
    </div>
  )
}

export default Entry