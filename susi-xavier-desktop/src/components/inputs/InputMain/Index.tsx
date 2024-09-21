import { tv } from 'tailwind-variants'
import InputMainDate from './IndexMainDate'
import InputMainInput from './InputMainInput'
import InputMainInputMask from './InputMainInputMask'
import InputMainLabel from './InputMainLabel'
import InputMainRoot from './InputMainRoot'
import './InputMain.scss'

export const inputMainInputStyle = tv({
  base: 'focus-visible:outline-none bg-transparent form-input w-full p-4',
  variants: {
    styleLabel: {
      primary: 'label-primary',
    },
    screen: {
      lg: 'screen-lg lg:p-5 lg:text-lg lg:font-medium',
    },
  },
})

export const InputMain = {
  InputMask: InputMainInputMask,
  Input: InputMainInput,
  Root: InputMainRoot,
  Label: InputMainLabel,
  Date: InputMainDate,
}
