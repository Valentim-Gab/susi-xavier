'use client'

import React, { useState } from 'react'
import NavbarMobile from './navbar-mobile'
import Image from 'next/image'

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false)

  function showItems() {
    setIsOpen(!isOpen)
  }

  return (
    <header className="flex justify-between items-center z-30 bg-background h-14 shadow-md sticky top-0 sm:h-16 lg:hidden">
      <Image
        src={'/logos/logo.png'}
        alt="Site logo"
        width={530}
        height={530}
        priority={true}
        className="w-auto h-10 ml-1 sm:h-12 sm:ml-2"
      />
      <div className="flex justify-center items-center">
        <button
          onClick={showItems}
          className="flex justify-center items-center"
        >
          {!isOpen ? (
            <span className="flex items-center justify-center w-14 h-14">
              <i className="transition-all duration-200 icon-[solar--hamburger-menu-broken] text-secondary dark:text-white w-14 h-14"></i>
            </span>
          ) : (
            <span className="flex items-center justify-center w-14 h-14">
              <i className="transition-all duration-200 icon-[solar--close-circle-broken] text-secondary dark:text-white w-10 h-10"></i>
            </span>
          )}
        </button>
      </div>
      <NavbarMobile isOpen={isOpen} setActive={setIsOpen} />
    </header>
  )
}
