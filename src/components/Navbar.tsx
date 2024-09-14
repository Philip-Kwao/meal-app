"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Navbar({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between p-10">
      <span className="font-extrabold text-2xl">Meal WebApp</span>
      <nav className="">{children}</nav>
    </div>
  );
}

export function NavbarLink(
  props: Omit<ComponentProps<typeof Link>, "className">
) {
    const pathname = usePathname()
  return <Link {...props} className={`${cn(`mr-4 duration-300 ease-in-out no-underline hover:underline underline-offset-0 hover:underline-offset-4 hover:text-green-500 ${pathname === props.href ? "text-green-500 underline underline-offset-4":""}`)}`} />;
}
