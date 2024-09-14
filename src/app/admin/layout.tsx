import { Navbar, NavbarLink } from "@/components/Navbar";

export const dynamic = "force-dynamic"

export default function AdminLayout({children}: {children: React.ReactNode}){
    return(
        <>
        <Navbar>
            <NavbarLink href={"/admin"}>Dashboard</NavbarLink>
            <NavbarLink href={"/admin/meals"}>Meals</NavbarLink>
            <NavbarLink href={"/admin/checkout"}>Checkout</NavbarLink>
            <NavbarLink href={"/admin/users"}>Users</NavbarLink>
            </Navbar>
        {children}
        </>
    )
}