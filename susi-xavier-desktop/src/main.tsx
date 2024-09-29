import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SideBarProvider } from './components/providers/SidebarProvider'
import { Toaster } from './components/ui/toaster'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './stores/store'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SideBarProvider>
          <App />
          <Toaster />
        </SideBarProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
