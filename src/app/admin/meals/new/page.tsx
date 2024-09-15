import { Button } from "@/components/ui/button";
import { PageHeader } from "../../_components/PageHeader";
import { MealForm } from "../_components/MealForm";
import Link from "next/link";

export default async function AddNewMeal() {
    
  return (
    <div>
     <div className="flex items-center justify-between p-10">
        <PageHeader>Meals Page</PageHeader>
        <Button asChild>
          <Link href={"/admin/meals/typeOfMeal"}>Add Meal Type</Link>
        </Button>
      </div><MealForm />
    </div>
  );
}




