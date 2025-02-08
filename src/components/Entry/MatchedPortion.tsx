import entry from '@/styles/entry.module.css'

type Props = {
  content: string;
  isZeroWidth: boolean;
}

const MatchedPortion = ({ content, isZeroWidth }: Props) => {
  return (
    <span className={`${entry.matchedPortion} ${isZeroWidth ? entry.isZeroWidth : ''}`}>
      {content}
    </span>
  )
}

export default MatchedPortion