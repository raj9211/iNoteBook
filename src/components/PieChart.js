import React, { useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useNavigate } from 'react-router-dom';

function PieChart({ chartData }) {
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/chart");
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="row">
            <div className="chart-container col-5">
                <h2 style={{ textAlign: "center" }}> Chart</h2>
                <Pie
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Users Gained between 2016-2020"
                            }
                        }
                    }}
                />
            </div>
            <div className="chart-container col-6">
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Users Gained between 2016-2020"
                            },
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}
export default PieChart;