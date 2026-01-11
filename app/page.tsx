"use client"
// app/page.tsx
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace("me")
  },[router])
  return (
    <main>
    </main>
  );
}