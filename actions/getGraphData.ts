import prisma from "@/libs/prismadb";
import moment from "moment";

export default async function getGraphData() {
  try {
    //Get the start and end range for the data range(7 days)
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    //Query the database to get order data grouped by createdDate
    const result = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    //Initialize an object to aggregate the data by day
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    //create a clone of start date to iterate over each day
    const currentDate = startDate.clone();

    // iterarte over each date in the date range
    while (currentDate <= endDate) {
      //format the day as a string (e.g. Monday)
      const day = currentDate.format("dddd");
      console.log("day<<<", day, currentDate);

      //Initialize the aggregated data for the day with the day, date and totalAmount
      aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      //Move on the next day
      currentDate.add(1, "day");
    }

    //Calculate the totalAmount for each day by summing the order amounts
    result.forEach((entry) => {
      const day = moment(entry.createdAt).format("dddd");
      const amount = entry._sum?.amount || 0;
      aggregatedData[day].totalAmount += amount;
    });

    //Convert the aggregatedData object to an array ans sort it by date
    const formattedData = Object.values(aggregatedData).sort((a,b) => {
      return moment(a.date).diff(moment(b.date));
    });

    //return formatted Date
    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
}
