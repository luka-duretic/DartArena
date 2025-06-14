import { axisClasses } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";

export function ScoreLineChart({ data }: any) {

  return (
    <LineChart
    sx={(theme) => ({
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: '#614EDC',
            strokeWidth: 3,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: '#006BD6',
          },
        },
      })}
      xAxis={[
        {
          data: Array.from({ length: data.dates.length }, (_, i) => i),
          scaleType: "linear", // ravnomjeran razmak
          valueFormatter: (index) =>
            data.dates[index]
              ? new Date(data.dates[index]).toLocaleDateString()
              : "", // prikaži datum samo za neke tickove
          tickMinStep: 1000, // svakih koliko se prikaze oznaka x-osi
          tickLabelStyle: { fill: "#ccc" }, // boja oznaka
        },
      ]}
      yAxis={[
        {
          tickLabelStyle: { fill: "#614EDC", fontSize: 16, font: "bold" },
        },
      ]}
      series={[
        {
          label: "60+ throws",
          data: data.score60Plus,
          valueFormatter: (value) => (value == null ? "/" : value.toString()),
          color: "#2BB0B5",
        },
        {
          label: "100+ throws",
          data: data.score100Plus,
          valueFormatter: (value) => (value == null ? "/" : value.toString()),
          color: "#C842E6",
        },
        {
          label: "140+ throws",
          data: data.score140Plus,
          valueFormatter: (value) => (value == null ? "/" : value.toString()),
          color: "#BBFA32",
        },
      ]}
      height={400}
      width={undefined}
      margin={{ bottom: 30, top: 30 }}
    />
  );
}
