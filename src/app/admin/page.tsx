import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/db/db"
import { formatCurrency, formatNumber } from "@/lib/formatters"

async function getSalesData(){
    const data = await db?.checkOut.aggregate({
        _sum:{price:true},
        _count:true
    })
    return{
        amount: data._sum.price||0,
        totalSales: data._count
    }
}

async function getUserData(){
    const [userData, avgPriceValue] = await Promise.all([db?.user.count(),db?.checkOut.aggregate({
        _sum:{price:true} 
    })])

    return{
        userData,
        avgPricePerUser: userData === 0 ? 0 : (avgPriceValue._sum.price || 0)/userData
    }
}

async function getMealData(){
    const [availableMeals, unavailableMeals] = await Promise.all([
        db?.meal.count({where:{
            isAvailableForPurchase: true
        }}), db?.meal.count({where:{
            isAvailableForPurchase:false
        }})
    ])

    return {
        availableMeals,
        unavailableMeals
    }
}

export default async function AdminDashboard(){
    const salesData = await getSalesData()
    const userData = await getUserData()
    const mealData = await getMealData()
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
        <DashboardCard title="Sales" subtitle={`${formatNumber(salesData.totalSales)} Orders`} description={formatCurrency(salesData.amount)} />

        <DashboardCard title="Customers" subtitle={`${formatNumber(userData.userData)}`} description={`${formatCurrency(userData.avgPricePerUser)} Avg`} />
        
        <DashboardCard title="Available Meals" subtitle={`${formatNumber(mealData.availableMeals)} Available`} description={`${formatNumber(mealData.unavailableMeals)} Unavailable`} />
        </div>
    )
}

type DashboardCardType = {
    title: string,
    subtitle: string,
    description: string
}

export function DashboardCard({title, subtitle, description}: DashboardCardType){
    return(
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
        </Card>
    )
}