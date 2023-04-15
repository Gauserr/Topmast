import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

// ## CHART STUFF ##
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
//import Bar from '../components/Chart_Bar';
import { Doughnut } from "react-chartjs-2";
// import Doughnut from '../components/Chart-Doughnut';

// FAKER FOR DEV TESTING
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Very Important Container Data",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// bar chart data, generated by faker
export const barData = {
  labels,
  datasets: [
    {
      label: "Important Dataset 1",
      // data: [120, 190, 300, 500, 900, 350, 200],
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Important Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const doughData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Things",
      // data: [12, 19, 3, 5, 2, 3],
      data: labels.map(() => faker.datatype.number({ min: 1, max: 15 })),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// # end chart stuff #

type Props = {};

export default function ContainerView(props: Props) {
  return (
    <div>

      <h3>Content in the container view</h3>

      <Link to="/">Link to Dashboard (/)</Link>

      <div
        style={{
          position: "relative",
          height: "20vh",
          width: "80vw",
          margin: "auto",
        }}
      >
        <Bar options={barOptions} data={barData} />
      </div>

      <div style={{ position: "relative", height: "40vw", width: "80vh" }}>
        <Doughnut data={doughData} />
      </div>

    </div>
  );
}
