import React from "react";
import {
  Chart,
  Tooltip,
  Interval,
} from "bizcharts";

const data = [
  { name: 'Số lượt đặt phim', Month : 'Jan.', 月均降雨量: 80 },
  { name: 'Số lượt đặt phim', Month : 'Feb.', 月均降雨量: 160 },
  { name: 'Số lượt đặt phim', Month : 'Mar.', 月均降雨量: 300 },
  { name: 'Số lượt đặt phim', Month : 'Apr.', 月均降雨量: 850 },
  { name: 'Số lượt đặt phim', Month : 'May', 月均降雨量: 420 },
  { name: 'Số lượt đặt phim', Month : 'Jun.', 月均降雨量: 310 },
  { name: 'Số lượt đặt phim', Month : 'Jul.', 月均降雨量: 300 },
  { name: 'Số lượt đặt phim', Month : 'Aug.', 月均降雨量: 340 },
  { name: 'Lịch chiếu ra rạp', Month : 'Jan.', 月均降雨量: 120 },
  { name: 'Lịch chiếu ra rạp', Month : 'Feb.', 月均降雨量: 230 },
  { name: 'Lịch chiếu ra rạp', Month : 'Mar.', 月均降雨量: 340 },
  { name: 'Lịch chiếu ra rạp', Month : 'Apr.', 月均降雨量: 990 },
  { name: 'Lịch chiếu ra rạp', Month : 'May', 月均降雨量: 520 },
  { name: 'Lịch chiếu ra rạp', Month : 'Jun.', 月均降雨量: 350 },
  { name: 'Lịch chiếu ra rạp', Month : 'Jul.', 月均降雨量: 370 },
  { name: 'Lịch chiếu ra rạp', Month : 'Aug.', 月均降雨量: 420 },
  { name: 'Số phim xuất bản', Month : 'Jan.', 月均降雨量: 6 },
  { name: 'Số phim xuất bản', Month : 'Feb.', 月均降雨量: 11 },
  { name: 'Số phim xuất bản', Month : 'Mar.', 月均降雨量: 17 },
  { name: 'Số phim xuất bản', Month : 'Apr.', 月均降雨量: 36 },
  { name: 'Số phim xuất bản', Month : 'May', 月均降雨量: 26 },
  { name: 'Số phim xuất bản', Month : 'Jun.', 月均降雨量: 17 },
  { name: 'Số phim xuất bản', Month : 'Jul.', 月均降雨量: 18 },
  { name: 'Số phim xuất bản', Month : 'Aug.', 月均降雨量: 21 },
  
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