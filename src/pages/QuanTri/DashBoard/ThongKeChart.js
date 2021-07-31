import React from "react";
import {
  G2,
  Chart,
  Tooltip,
  Interval,
} from "bizcharts";

const data = [
  { name: 'London', Month : 'Jan.', 月均降雨量: 18.9 },
  { name: 'London', Month : 'Feb.', 月均降雨量: 28.8 },
  { name: 'London', Month : 'Mar.', 月均降雨量: 39.3 },
  { name: 'London', Month : 'Apr.', 月均降雨量: 81.4 },
  { name: 'London', Month : 'May', 月均降雨量: 47 },
  { name: 'London', Month : 'Jun.', 月均降雨量: 20.3 },
  { name: 'London', Month : 'Jul.', 月均降雨量: 24 },
  { name: 'London', Month : 'Aug.', 月均降雨量: 35.6 },
  { name: 'Berlin', Month : 'Jan.', 月均降雨量: 12.4 },
  { name: 'Berlin', Month : 'Feb.', 月均降雨量: 23.2 },
  { name: 'Berlin', Month : 'Mar.', 月均降雨量: 34.5 },
  { name: 'Berlin', Month : 'Apr.', 月均降雨量: 99.7 },
  { name: 'Berlin', Month : 'May', 月均降雨量: 52.6 },
  { name: 'Berlin', Month : 'Jun.', 月均降雨量: 35.5 },
  { name: 'Berlin', Month : 'Jul.', 月均降雨量: 37.4 },
  { name: 'Berlin', Month : 'Aug.', 月均降雨量: 42.4 },
];

export default function ThongKeChart() {
  return (
    <Chart height={400} padding="auto" data={data} autoFit>
      <Interval
        adjust={[
         {
            type: 'dodge',
            marginRatio: 0,
          },
        ]}
        color="name"
        position="Month*月均降雨量"
      />
      <Tooltip shared />
    </Chart>
  );
}