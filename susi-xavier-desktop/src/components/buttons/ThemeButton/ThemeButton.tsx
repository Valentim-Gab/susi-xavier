import { HTMLAttributes } from 'react'
import './ThemeButton.scss'
import { twMerge } from 'tailwind-merge'

export default function ThemeButton(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={twMerge('theme', props.className)}>
      <input id="switch" type="checkbox" />
      <div className="app-theme">
        <nav>
          <time className="time">4:20 AM</time>
          <div className="icons">
            <span className="network"></span>
            <span className="battery"></span>
          </div>
        </nav>
        <div className="circle"></div>
        <label htmlFor="switch">
          <span className="light">light</span>
          <span>dark</span>
        </label>
      </div>
    </div>
  )
}
