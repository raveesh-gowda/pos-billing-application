import React from "react";
import { useSelector } from "react-redux";
import Chart from "react-google-charts";
import moment from "moment";

const Charts = (props) => {
   const { bills } = useSelector((state) => state);

   const recentMonth = moment().month() + 1;
   const salesPerMonth = {};

   for (let i = recentMonth; i > recentMonth - 6; i--) {
      let recentSales = 0;
      bills.data.forEach((bill) => {
         if (moment(bill.date).month() + 1 === i) {
            recentSales += bill.total;
         }
      });
      salesPerMonth[moment(i, "M").format("MMMM")] = recentSales;
   }

   const chartData = Object.entries(salesPerMonth);
   chartData.unshift(["Month", "Sales"]);

   return (
      <div>
         <h1>Sales Data</h1>
         <div className="container card border-dark shadow" style={{width:"90rem", height:"40rem"}}>
            <Chart
               height={"38rem"}
               chartType="Bar"
               loader={<div>Loading Chart</div>}
               data={chartData}
               options={{
                  chart: {
                     subtitle: "Sales per Month",
                  },
               }}
               rootProps={{ "data-testid": "2" }}
            />
         </div>
      </div>
   );
};

export default Charts;
