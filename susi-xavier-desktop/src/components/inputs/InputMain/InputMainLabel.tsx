import React, { ReactNode } from 'react'
import './InputMain.scss'
import { VariantProps, tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const inputMainLabelStyle = tv({
  base: 'form-label',
  variants: {
    styleLabel: {
      primary: 'label-primary',
    },
    screen: {
      lg: 'screen-lg lg:text-lg lg:font-medium',
    },
  },
})

interface InputMainLabelProps
  extends VariantProps<typeof inputMainLabelStyle>,
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    > {
  value: string | number
  children: ReactNode
  className?: string
}

export default function InputMainLabel({
  value,
  children,
  styleLabel,
  screen,
  className,
  ...rest
}: InputMainLabelProps) {
  return (
    <label
      {...rest}
      className={twMerge(
        inputMainLabelStyle({ styleLabel, screen }),
        className
      )}
      data-label={
        (typeof value === 'string' && value !== '') ||
        (typeof value === 'number' && value !== undefined)
      }
    >
      {children}
    </label>
  )
}
