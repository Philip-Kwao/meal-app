"use server";

import { db } from "@/db/db";
import { string, z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";
// Define a max file size and allowed image types
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);
// const mealTypeEnum = ["BreakFast", "Lunch", "Dinner"] as const
const addMealSchema = z.object({
  name_of_meal: z.string().min(1),
  price_of_meal: z.coerce.number().int().min(1),
  description_of_meal: z.string().min(1),
  type: z.string(),
  the_meal:string().optional(),
  meal_image: imageSchema
    .refine((file) => file.size > 0, "Required ")
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .png, and .gif files are allowed",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Image must be smaller than 5MB",
    }),
});


export async function addMeal(prevState:unknown,formdata: FormData) {
    const results = addMealSchema.safeParse(
        Object.fromEntries(formdata.entries())
    );
    console.log(results)
  
  if (results.success === false) {
      return results.error.formErrors.fieldErrors;
    }
    
    const data = results.data;
    // console.log(data)

  await fs.mkdir("public/meals", { recursive: true });
  const image = `/meals/${crypto.randomUUID()}-${data.meal_image.name}`;
  await fs.writeFile(
    `public${image}`,
    Buffer.from(await data.meal_image.arrayBuffer())
  );

  await db.meal.create({
    data: {
      name: data.name_of_meal,
      description: data.description_of_meal,
      price: data.price_of_meal,
      image,
      isAvailableForPurchase: false,
      type: data.type
    },
  });

  redirect("/admin/meals");
}

// Meal Type Schema
const addMealTypeSchema = z.object({
    name:z.string().min(1),
})

export async function addMealType(prevState:unknown,formdata: FormData) {
  const results = addMealTypeSchema.safeParse(Object.fromEntries(formdata.entries()))

  if (results.success === false){
    return results.error.formErrors.fieldErrors
  }

  const data = results.data

  await db.mealType.create({
    data:{
        name:data.name,
    },
  })
  redirect("/admin/meals/new")
}
