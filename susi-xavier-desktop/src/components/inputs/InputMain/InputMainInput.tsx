import React, { forwardRef } from 'react'
import './InputMain.scss'
import { VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import { inputMainInputStyle } from './Index'

interface InputMainInputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    VariantProps<typeof inputMainInputStyle> {}

const InputMainInput = forwardRef<HTMLInputElement, InputMainInputProps>(
  (props, ref) => {
    const { styleLabel, screen, className, ...rest } = props

    return (
      <input
        {...rest}
        ref={ref}
        data-input={
          (typeof props.value === 'string' && props.value !== '') ||
          (typeof props.value === 'number' && props.value !== undefined)
        }
        className={twMerge(
          inputMainInputStyle({ styleLabel, screen }),
          className
        )}
        spellCheck={false}
      />
    )
  }
)

InputMainInput.displayName = 'InputMainInput'

export default InputMainInput
