import React, { Component } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import Navbar from "../Components/Navbar";
import "../styles/Analysis.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

export class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "crops",
      selectedItem: "wheat",
      dataSets: {
        crops: {
          wheat: [50, 70, 65, 90, 80],
          rice: [55, 75, 60, 85, 78],
          maize: [45, 65, 70, 80, 82],
        },
        fruits: {
          apple: [100, 120, 110, 130, 140],
          banana: [40, 50, 55, 60, 58],
          mango: [90, 95, 100, 110, 120],
        },
        vegetables: {
          tomato: [30, 35, 40, 45, 42],
          potato: [20, 25, 22, 28, 30],
          onion: [25, 30, 35, 38, 40],
        },
      },
      regions: ["Mumbai", "Pune", "Raigad", "Sangli", "Kolhapur"],
    };
  }

  handleCategoryChange = (event) => {
    const category = event.target.value;
    const firstItem = Object.keys(this.state.dataSets[category])[0];
    this.setState({ selectedCategory: category, selectedItem: firstItem });
  };

  handleItemChange = (event) => {
    this.setState({ selectedItem: event.target.value });
  };

  getChartData = () => {
    const { selectedCategory, selectedItem, dataSets, regions } = this.state;
    return {
      labels: regions,
      datasets: [
        {
          label: `${selectedItem} Prices (₹ per kg)`,
          data: dataSets[selectedCategory][selectedItem],
          backgroundColor: ["rgba(75, 192, 192, 0.5)"],
          borderColor: ["rgba(75, 192, 192, 1)"],
          borderWidth: 3,
          pointBackgroundColor: "white",
          pointBorderColor: "rgb(75, 192, 192)",
          pointBorderWidth: 2,
          pointRadius: 6,
          tension: 0.4,
        },
      ],
    };
  };

  getPieData = () => {
    const { selectedCategory, selectedItem, dataSets, regions } = this.state;
    return {
      labels: regions,
      datasets: [
        {
          data: dataSets[selectedCategory][selectedItem],
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  render() {
    const { selectedCategory, selectedItem, dataSets } = this.state;

    return (
      <div>
        <Navbar />
        <div className="chart-container">
          <h2>Market Price Analysis</h2>

          {/* Category & Item Selection */}
          <div className="crop-selector">
            <label>Select Category:</label>
            <select onChange={this.handleCategoryChange} value={selectedCategory}>
              <option value="crops">🌾 Crops</option>
              <option value="fruits">🍎 Fruits</option>
              <option value="vegetables">🥦 Vegetables</option>
            </select>

            <label>Select Item:</label>
            <select onChange={this.handleItemChange} value={selectedItem}>
              {Object.keys(dataSets[selectedCategory]).map((item) => (
                <option key={item} value={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Line Chart */}
          <div className="chart">
            <h3>Price Trend Over Regions</h3>
            <div className="chart-wrapper">
              <Line
                data={this.getChartData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "top" } },
                  scales: {
                    y: { beginAtZero: true, grid: { display: true, color: "rgba(200, 200, 200, 0.3)" } },
                    x: { grid: { display: false } },
                  },
                }}
              />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="chart">
            <h3>Comparison of Prices</h3>
            <div className="chart-wrapper">
              <Bar data={this.getChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="chart">
            <h3>Percentage Share of Prices</h3>
            <div className="chart-wrapper">
              <Pie data={this.getPieData()} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Analysis;
