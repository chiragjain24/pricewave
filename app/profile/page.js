"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react"

const ProfilePage = () => {
    const { status } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null;
  }
  return (
    <>
    <p>Edit your profile here</p>

    </>
  )
}

export default ProfilePage
