'use client'

import * as Toast from '@radix-ui/react-toast'
import { useEffect, useState } from 'react'

interface ToastProps {
  errorMessage: string | null
}

const ErrorToastComponent = ({ errorMessage }: ToastProps) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (errorMessage) {
      setOpen(true)
    }
  }, [errorMessage])

  if (!errorMessage) return null 

  return (
    <Toast.Provider swipeDirection="up">
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        duration={5000}
        className="w-[500] z-100 bg-danger-higlighter text-white px-4 py-2 rounded shadow-md"
      >
        <Toast.Description>{errorMessage}
        <Toast.Close aria-label="Close" className="ml-2 text-white justify-end place-content-end items-end">
          <span aria-hidden>×</span>
        </Toast.Close>
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-4 right-4 z-50" />
    </Toast.Provider>
  )
}

export default ErrorToastComponent
