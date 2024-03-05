"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data } = useSession();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
