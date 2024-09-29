"use client"

import { SessionProvider } from "next-auth/react"

const SessionWrapper = ({children}) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
        {children}
    </SessionProvider>
      
  )
}

export default SessionWrapper
