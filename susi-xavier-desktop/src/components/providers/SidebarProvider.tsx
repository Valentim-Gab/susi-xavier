import { createContext, useContext, useReducer } from 'react'

const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

const sidebarReducer = (
  state: { isOpen: boolean },
  action: { type: string }
) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        isOpen: !state.isOpen,
      }
    default:
      return state
  }
}

const initialState = { isOpen: false }

interface SidebarContextType {
  state: { isOpen: boolean }
  dispatch: React.Dispatch<{ type: string }>
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

import { ReactNode } from 'react'

interface SidebarProviderProps {
  children: ReactNode
}

export const SideBarProvider = ({ children }: SidebarProviderProps) => {
  const [state, dispatch] = useReducer(sidebarReducer, initialState)

  return (
    <SidebarContext.Provider value={{ state, dispatch }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  return useContext(SidebarContext)
}
