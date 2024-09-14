"use client"
import { Label } from "@/components/ui/label";
import { PageHeader } from "../../_components/PageHeader";
import { Input } from "@/components/ui/input";
import { addMealType } from "../../_actions/addMeal";
import { SubmitButton } from "@/components/SubmitButton";
import { useFormState } from "react-dom";

export default function TypeOfMeal(){
    const [error, action] = useFormState(addMealType,{})
    return(
        <>
        <PageHeader>Add Meal Type</PageHeader>
        <form action={action} className="space-y-4 m-10 p-5 max-w-sm border rounded-lg">
            <Label htmlFor="name">Meal Type</Label>
            <Input type="text" name="name" id="name" required />
            {error?.name && <div className="text-destructive">{error.name}</div> }
            <SubmitButton />
        </form>
        </>
    )
}