'use client'

import Link from 'next/link'
import React from 'react'
import DrawerThemeMobile from './drawer-theme-mobile'
import { usePathname } from 'next/navigation'
import './navbar-mobile.scss'

interface NavbarProps {
  isOpen: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavbarMobile({
  isOpen,
  setActive
}: NavbarProps) {
  const pathname = usePathname()

  const items = [
    {
      icon: '',
      text: 'Início',
      url: '/',
    },
    {
      icon: '',
      text: 'Sobre',
      url: '/sobre',
    },
    {
      icon: '',
      text: 'Contato',
      url: '/contato',
    },
  ]

  return (
    <nav data-open={isOpen} className="bg-background navbar-mobile w-full">
      <ul className="items py-2">
        {items &&
          items.map((item, index) => (
            <li key={index} className="flex justify-between items-center gap-2">
              <Link
                href={item.url}
                onClick={() => {
                  setActive(false)
                }}
                data-active={pathname === item.url}
                className="flex items-center self-stretch cursor-pointer p-4 w-full data-[active=true]:py-1"
              >
                <div
                  data-active={pathname === item.url}
                  className="item flex items-center justify-center gap-2"
                >
                  <hr
                    data-active={pathname === item.url}
                    className="hidden border-primary border-r-[2px] w-fit h-8 data-[active=true]:block"
                  />
                  {item.icon && <i className={`${item.icon} text-lg`}></i>}
                  <p className="font-medium">{item.text}</p>
                </div>
              </Link>
              {index === 0 && <DrawerThemeMobile />}
            </li>
          ))}
      </ul>
    </nav>
  )
}
