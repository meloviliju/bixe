import { MatchedToken } from '@/consts/types'
import style from '@/styles/entry.module.css'

type Props = {
  matchedToken: MatchedToken
}

const MatchedPortion = ({ matchedToken }: Props) => {
  const { content, isZeroWidth } = matchedToken.matchedPortion
  return (
    <span className={`${style.matchedPortion} ${isZeroWidth ? style.isZeroWidth : ''}`}>
      {content}
    </span>
  )
}

export default MatchedPortion