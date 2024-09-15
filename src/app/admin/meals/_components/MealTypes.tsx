import { Button } from "@/components/ui/button"
import { db } from "@/db/db"
import Link from "next/link"

export default async function MealTypes(){
    const types = await db.mealType.findMany({
        orderBy:{name:"asc"}
    })
    return(
        <div className="grid grid-cols-3 items-center justify-center space-x-4 space-y-4 gap-5 w-full">
            {types.map((type)=>(
                <Button className="m-4" key={type.id} asChild>
                    <Link href={""} className="" >{type.name}</Link>
                </Button>
            ))}
        </div>
    )
}