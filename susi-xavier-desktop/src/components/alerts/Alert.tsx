import { ReactNode } from 'react'

export default function Alert({ children }: { children: ReactNode }) {
  return (
    <div className="bg-secondary text-white font-semibold w-full p-4">
      {children}
    </div>
  )
}
