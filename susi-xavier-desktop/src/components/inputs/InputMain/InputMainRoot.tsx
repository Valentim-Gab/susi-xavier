import React, { DetailedHTMLProps, ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import './InputMain.scss'

const InputMainStyle = tv({
  base: 'flex items-center gap-2 w-full rounded border relative',
})

function checkChildren(children: any) {
  if (
    Array.isArray(children) &&
    children[0].type.name === 'InputMainLabel' &&
    (children[1].type.displayName === 'InputMainInput' ||
      children[1].type.displayName === 'InputMainInputMask')
  ) {
    throw new Error(
      'A ordem de children deve ser InputMainInput e em seguida InputMainLabel'
    )
  }

  if (Array.isArray(children) && checkInputMainDate(children)) {
    throw new Error(
      'Um InputMainDate não pode ter como irmão um InputMainLabel ao passar outro InputMainLabel em props.label'
    )
  }
}

function checkInputMainDate(children: any) {
  if (
    children[0].type.displayName === 'InputMainDate' &&
    children[1].type.name === 'InputMainLabel' &&
    children[0].props.label
  ) {
    return true
  }

  return (
    children[0].type.name === 'InputMainLabel' &&
    children[1].type.displayName === 'InputMainDate' &&
    children[1].props.label
  )
}

interface InputMainInputProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: ReactNode
}

const InputMainRoot = forwardRef<HTMLDivElement, InputMainInputProps>(
  (props, ref) => {
    const { children, ...rest } = props

    checkChildren(children)

    return (
      <div ref={ref} className={twMerge(InputMainStyle(), rest.className)}>
        {children}
      </div>
    )
  }
)

InputMainRoot.displayName = 'InputMainRoot'

export default InputMainRoot
