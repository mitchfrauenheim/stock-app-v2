"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SnapshotsChartDataPoint } from "@/lib/definitions";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type SnapshotsChartProps = {
  data: SnapshotsChartDataPoint[];
  users: string[];
};

const chartConfig = {
  Mitch: {
    label: "Mitch",
    color: "#52AEFF",
  },
  Bill: {
    label: "Bill",
    color: "#F87274",
  },
  Sandy: {
    label: "Sandy",
    color: "#F5B047",
  },
  Havila: {
    label: "Havila",
    color: "#6CDA76",
  },
  Bob: {
    label: "Bob",
    color: "#45DEC4",
  },
  Dan: {
    label: "Dan",
    color: "#BE89EC",
  },
  Monique: {
    label: "Monique",
    color: "#F476AB",
  },
  Alexa: {
    label: "Alexa",
    color: "#00000057",
  },
  Greg: {
    label: "Greg",
    color: "#A8A8A8",
  },
} satisfies ChartConfig;

export default function SnapshotsChart({ data, users }: SnapshotsChartProps) {
  console.log(data);
  return (
    <ChartContainer config={chartConfig} className="w-full min-h-50">
      <LineChart accessibilityLayer data={data} margin={{ top: 20, bottom: 10, left: 40, right: 40 }} style={{ fontSize: 12 }}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={40} />
        <YAxis domain={[17000, 27000]} allowDataOverflow tickLine={false} axisLine={false} tickMargin={4} />
        {users.map((user) => (
          <Line key={user} type="monotone" dataKey={user} strokeWidth={2} dot={false} stroke={`var(--color-${user})`} />
        ))}
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  );
}
