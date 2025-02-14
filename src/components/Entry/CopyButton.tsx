import copyIcon from '@/assets/copyIcon.svg'
import style from '@/styles/entry.module.css'

type Props = {
  copiedText: string
}

const CopyButton = ({ copiedText }: Props) => {
  return (
    <span>
      <img
        src={copyIcon}
        className={style.copyButton}
        onClick={() => {
          try {
            navigator.clipboard.writeText(copiedText).then(
              () => {
                // handleOpen()
                console.log('successfully copied!')
                // setTimeout(() => handleClose(), 2500)
              }
            )
          } catch {
            console.log('failed to copy')
          }
        }} />
    </span>)
}

export default CopyButton