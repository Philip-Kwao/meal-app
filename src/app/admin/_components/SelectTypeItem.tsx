
import { SelectItem } from "@/components/ui/select";
import { db } from "@/db/db";

export async function SelectMealType() {
    const typeData = await db.mealType.findMany({
      orderBy: { name: "asc" },
    });
    return (
      <>
        {typeData.length > 0 ? (
          typeData.map((item) => (
            <SelectItem key={item.id} value={item.name} className="capitalize">
              {item.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="">No Meal Type Available</SelectItem>
        )}
      </>
    );
  }