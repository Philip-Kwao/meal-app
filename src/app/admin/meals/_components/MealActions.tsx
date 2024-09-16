"use client"

import { useTransition } from "react"
import { DeleteMealFunc, toggleAvailability } from "../../_actions/addMeal"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function ToggleActivate({id, isAvailableForPurchase}:{id:string,isAvailableForPurchase:boolean}){
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    return(
    <DropdownMenuItem 
    disabled={isPending}
    onClick={()=>{
        startTransition(async()=>{
            await toggleAvailability(id, !isAvailableForPurchase)
        })
        router.refresh()
    }}>
        {isAvailableForPurchase ? "Deactivate": "Activate"}
    </DropdownMenuItem>
    )
}
export function DeleteMeal({id, disabled}:{id:string, disabled:boolean}){
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    return(
    <DropdownMenuItem
    variant="destructive"
    disabled={disabled || isPending}
    onClick={()=>{
        startTransition(async()=>{
            await DeleteMealFunc({id})
            router.refresh()
        })
    }}>
        Delete
    </DropdownMenuItem>
    )
}