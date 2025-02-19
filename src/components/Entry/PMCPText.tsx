import PMCPMainText from './PMCPMainText'
import Tooltip from '@/components/Entry/Tooltip'
import { MatchedToken, Token } from '@/consts/types'
import style from '@/styles/tooltip.module.css'

type Props = {
  hasTooltip: boolean,
  token: Token,
  comparedToken: string | MatchedToken
}

const PMCPText = ({ hasTooltip, token, comparedToken }: Props) => {
  return (
    <span className={style.hoverText}>
      <PMCPMainText token={token} comparedToken={comparedToken} />
      {hasTooltip ? <Tooltip text={token.content} /> : <></>}
    </span>
  )
}

export default PMCPText