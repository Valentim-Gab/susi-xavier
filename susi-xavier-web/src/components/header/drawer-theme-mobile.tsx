'use client'

import React, { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function DrawerThemeMobile() {
  const { setTheme } = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)

  function changeTheme(theme: string) {
    setTheme(theme)
    setDrawerOpen(false)
  }

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} noBodyStyles>
      <DrawerTrigger className="mr-3 p-1">
        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Selecionar tema</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <Button
            className="cursor-pointer hover:bg-background hover:text-primary hover:border hover:border-primary"
            onClick={() => changeTheme('light')}
          >
            Claro
          </Button>
          <Button
            className="cursor-pointer hover:bg-background hover:text-primary hover:border hover:border-primary"
            onClick={() => changeTheme('dark')}
          >
            Escuro
          </Button>
          <Button
            className="cursor-pointer hover:bg-background hover:text-primary hover:border hover:border-primary"
            onClick={() => changeTheme('system')}
          >
            Sistema
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
