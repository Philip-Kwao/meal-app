import { PageHeader } from "@/app/admin/_components/PageHeader"
import { db } from "@/db/db"
import { MealForm } from "../../_components/MealForm"

export default async function EditMealPage({params:{id}}:{params:{id:string}}) {
    const meal = await db.meal.findUnique({where:{
        id
    }})
  return (
    <>
    <PageHeader>Edit Meals</PageHeader>
    <MealForm meal={meal} />
    </>
  )
}
