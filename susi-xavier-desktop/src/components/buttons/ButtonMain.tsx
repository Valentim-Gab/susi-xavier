import React from 'react'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

const buttonStyle = tv({
  base: 'flex justify-center items-center gap-2 px-8 py-4 text-white bg-primary rounded font-bold hover:brightness-95',
  variants: {
    variant: {
      google: 'gap-4 text-black bg-white font-medium border border-black',
      outline: 'text-primary bg-transparent border-2 border-primary',
    },
    screen: {
      lg: 'lg:text-lg',
    },
  },
})

interface ButtonMainProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps<typeof buttonStyle> {}

export default function ButtonMain({
  variant,
  screen,
  ...rest
}: ButtonMainProps) {
  function getChildren() {
    if (variant === 'google') {
      return (
        <>
          <i className="icon-[logos--google-icon] w-[24px] h-[24px]"></i>
          Entrar com Google
        </>
      )
    }

    return rest.children
  }

  return (
    <button
      {...rest}
      className={twMerge(buttonStyle({ variant, screen }), rest.className)}
    >
      {getChildren()}
    </button>
  )
}
