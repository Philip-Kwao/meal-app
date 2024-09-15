"use client";
import { Label } from "@/components/ui/label";
import { PageHeader } from "../../_components/PageHeader";
import { Input } from "@/components/ui/input";
import { addMealType } from "../../_actions/addMeal";
import { SubmitButton } from "@/components/SubmitButton";
import { useFormState } from "react-dom";
import MealTypes from "../_components/MealTypes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TypeOfMeal() {
  const [error, action] = useFormState(addMealType, {});
  return (
    <>
      <div className="flex items-center justify-between p-10">
        <PageHeader>Meals Page</PageHeader>
        <Button asChild>
          <Link href={"/admin/meals/new"}>Add Meal</Link>
        </Button>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between p-10 max-w-[60vw] mx-auto">
        <form
          action={action}
          className="space-y-4 m-10 p-5 max-w-xl border rounded-lg w-full"
        >
          <Label htmlFor="name">Meal Type</Label>
          <Input type="text" name="name" id="name" required />
          {error?.name && <div className="text-destructive">{error.name}</div>}
          <SubmitButton />
        </form>
        <div className="">
            <MealTypes />
        </div>
      </div>
    </>
  );
}
