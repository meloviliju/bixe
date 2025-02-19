import { useState } from 'react'

const Toggle = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div className="toggle_button">
      <span className="letter-spacing: -2px;">㗊㗊㗊</span>
      <input id="toggle_keyboard_balloon" className="toggle_input" type='checkbox' checked={isChecked} onChange={() => {setIsChecked(!isChecked)}} />
      <label htmlFor="toggle_keyboard_balloon" className="toggle_label" />
    </div>
  )
}

export default Toggle