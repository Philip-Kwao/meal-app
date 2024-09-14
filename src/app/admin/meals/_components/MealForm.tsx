"use client"

import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormState } from "react-dom";
import { addMeal } from "../../_actions/addMeal";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react"; 

interface Meal_Type{
    id: string
    name: string
}

export function MealForm() {
    const [mealState, setMealState]=useState<Meal_Type[]>([])
    useEffect(()=>{
        const fetchMeal = async () =>{
                try{
                const data = await fetch("/admin/api/mealType")
                const results: Meal_Type[] = await data.json()
                // console.log(results)
                setMealState(results)
            }
                catch(err){
                    console.log(err)
                }
            }
            fetchMeal()
    },[])
    const [error, action] = useFormState(addMeal, {});
    // console.log(mealState)
    return (
        <form
        action={action}
        className="space-y-4 m-10 border border-spacing-4 p-5 rounded-xl"
        >
  <div className="space-y-2">
    <Label htmlFor="name_of_meal">Name Of Meal</Label>
    <Input type="text" name="name_of_meal" id="name_of_meal" required />
    {error.name_of_meal && (
      <div className="text-destructive">{error.name_of_meal}</div>
    )}
  </div>
  <div className="space-y-2">
    <Label htmlFor="price_of_meal">Price Of Meal</Label>
    <Input type="number" name="price_of_meal" id="price_of_meal" required />
    {error.price_of_meal && (
      <div className="text-destructive">{error.price_of_meal}</div>
    )}
  </div>
  <div className="space-y-2">
    <Label htmlFor="description_of_meal">Description Of Meal</Label>
    <Textarea
      name="description_of_meal"
      id="description_of_meal"
      required
    />
    {error.description_of_meal && (
      <div className="text-destructive">{error.description_of_meal}</div>
    )}
  </div>
  <div className="space-y-2">
    <Label htmlFor="type">Type Of Meal</Label>
    <Select name="type" required>
      <SelectTrigger className="">
        <SelectValue placeholder="Select Meal Type" />
      </SelectTrigger>
      <SelectContent>
      {
        mealState.map((meal_type)=>(
        <SelectItem key={meal_type.id} value={meal_type.name} id="" className="capitalize">
          {meal_type.name}
        </SelectItem>
        ))
        }
      </SelectContent>
    </Select>
  </div>
  <div className="space-y-2">
    <Label htmlFor="meal_image">Name Of Meal</Label>
    <Input type="file" name="meal_image" id="meal_image" required />
    {error.meal_image && (
      <div className="text-destructive">{error.meal_image}</div>
    )}
  </div>
  <SubmitButton />
</form>
);
}