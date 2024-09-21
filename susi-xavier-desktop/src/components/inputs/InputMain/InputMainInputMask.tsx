import React, { forwardRef, useState } from 'react'
import './InputMain.scss'
import { useMask, MaskProps } from '@react-input/mask'
import { VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import { inputMainInputStyle } from './Index'

interface InputMainInputMaskProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    VariantProps<typeof inputMainInputStyle>,
    MaskProps {
  showMaskOnFocus?: boolean
}

const InputMainInputMask = forwardRef<
  HTMLInputElement,
  InputMainInputMaskProps
>((props, ref) => {
  const {
    className,
    mask,
    replacement,
    modify,
    showMaskOnFocus,
    showMask,
    styleLabel,
    screen,
    ...rest
  } = props
  const [showMaskFocus, setShowMaskFocus] = useState(false)

  const inputRef = useMask({
    mask: mask,
    replacement: replacement,
    modify: modify,
    showMask: showMask ?? showMaskFocus,
  })

  return (
    <input
      {...rest}
      data-input={
        (typeof props.value === 'string' && props.value !== '') ||
        (typeof props.value === 'number' && props.value !== undefined)
      }
      className={twMerge(
        inputMainInputStyle({ styleLabel, screen }),
        className
      )}
      spellCheck="false"
      ref={inputRef}
      onFocus={() => {
        if (showMaskOnFocus) {
          setShowMaskFocus(true)
        }
      }}
    />
  )
})

InputMainInputMask.displayName = 'InputMainInputMask'

export default InputMainInputMask
