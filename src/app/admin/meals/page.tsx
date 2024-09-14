import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { db } from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

export default async function MealsPage() {
  const mealData = await db.meal.findMany({
    orderBy: { name: "asc" },
    select:{
      id:true,
      name:true,
      price:true,
      isAvailableForPurchase:true,
      _count:{select:{checkOutMealRelation:true}},
      type:true
    }
  });

  return (
    <>
      <div className="flex items-center justify-between p-10">
        <PageHeader>Meals Page</PageHeader>
        <Button asChild>
          <Link href={"/admin/meals/new"}>Add Meal</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span className="sr-only w-0">Available Meals</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type Of Meal</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>
              <span className="sr-only w-0">Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mealData.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell className="font-medium">
                <span className="w-0 sr-only">Is Meal Available
                </span>
                  {meal.isAvailableForPurchase ? <CheckCircle2 />:<XCircle />}
              </TableCell>
              <TableCell className="font-medium">{meal.name}</TableCell>
              <TableCell className="font-medium">{meal.type}</TableCell>
              <TableCell className="font-medium">{formatCurrency(meal.price)}</TableCell>
              <TableCell className="font-medium">{formatNumber(meal._count.checkOutMealRelation)}</TableCell>
              <TableCell className="font-medium">
                <span className="w-0 sr-only">Actions</span>
                <MoreVertical />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
