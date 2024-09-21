import Link from 'next/link'
import React from 'react'
import './header.scss'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const items = [
    {
      text: 'Inicio',
      url: '/',
    },
    {
      text: 'Sobre',
      url: '/sobre',
    },
    {
      text: 'Contato',
      url: '/contato',
    },
  ]

  return (
    <nav className='z-20'>
      <ul className="flex gap-16 items-center relative">
        {items &&
          items.map((item, index) => (
            <li key={index} className='relative'>
              <Link
                href={item.url}
                className="font-medium text-lg uppercase"
              >
                {item.text}
              </Link>
              <hr
                data-active={pathname === item.url}
                className="absolute w-full hidden border-primary border-t-[2px] data-[active=true]:block"
              />
            </li>
          ))}
      </ul>
    </nav>
  )
}
