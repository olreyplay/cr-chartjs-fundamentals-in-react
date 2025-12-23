import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function App() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [salesData, setSalesData] = useState([12, 19, 8, 15, 10, 7]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Monthly Sales (k$)",
            data: salesData,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
      },
    });

    chartRef.current = chart;
    return () => chart.destroy();
  }, [salesData]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    chart.data.datasets[0].data = salesData;
    chart.update();
  }, [salesData]);

  const randomizeData = () => {
    setSalesData(salesData.map(() => Math.floor(Math.random() * 20) + 5));
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <button
        onClick={randomizeData}
        style={{ padding: "8px 16px", marginBottom: 16 }}
      >
        Randomize Data
      </button>
      <div style={{ height: 400 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default App;
