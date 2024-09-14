import { db } from "@/db/db";

export async function GET(){
    const req = await db.mealType.findMany({
        orderBy:{name:"asc"}
    })

    return Response.json(req)
}