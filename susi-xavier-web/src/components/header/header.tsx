'use client'

import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Navbar from './navbar'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className="items-center justify-center hidden w-full lg:flex">
      <div className="w-full max-w-[1400px] flex px-8 py-4 justify-between items-center">
        <Link href="/" className="logo text-2xl font-black cursor-pointer px-2">
          <Image
            src={'/logos/logo.png'}
            alt="Site logo"
            width={530}
            height={530}
            priority={true}
            className="w-auto h-[96px]"
          />
        </Link>
        <div className="flex justify-end items-center gap-8 self-stretch">
          <Navbar />
          <DropdownMenu onOpenChange={() => setDrawerOpen(!drawerOpen)}>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                data-active={drawerOpen}
                className="rounded-full mr-2 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none bg-background text-primary data-[active=true]:bg-primary data-[active=true]:text-background dark:data-[active=true]:text-white"
              >
                <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-2">
              <DropdownMenuLabel>Tema do site</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem
                  value="light"
                  className="cursor-pointer focus:bg-primary focus:text-white"
                >
                  Claro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="dark"
                  className="cursor-pointer focus:bg-primary focus:text-white"
                >
                  Escuro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="system"
                  className="cursor-pointer focus:bg-primary focus:text-white"
                >
                  Sistema
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
