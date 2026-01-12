"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart"

const chartConfig = {
  count: {
    label: "Jumlah Foto",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

interface ChartData {
  month: string
  count: number
}

interface DashChartProps {
  initialData: ChartData[]
}

export function DashChart({ initialData }: DashChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Jumlah Foto</CardTitle>
        <CardDescription>
          Jumlah foto dalam 15 bulan (12 bulan lalu hingga 3 bulan ke depan)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart accessibilityLayer data={initialData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
