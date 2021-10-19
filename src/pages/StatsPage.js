import React, { useState, useEffect } from "react";
import { WORKOUTS, EXERCISES_SIDEBAR } from "../data/graphqlQueries";
import { useQuery } from "@apollo/client";
import { Line } from "react-chartjs-2";
import { chartColors } from "../data/chartStyles";
import SidebarOption from "../components/SidebarOption/SidebarOption";
import "./StatsPage.css";

const StatsPage = () => {
  const [workoutsData, setWorkoutsData] = useState([]);
  const [exercisesData, setExercisesData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedExercises, setSelectedExercises] = useState([]);

  const exercisesQuery = useQuery(EXERCISES_SIDEBAR, {
    onCompleted: (data) => {
      setExercisesData(data.exercises);
    },
  });

  const workoutsQuery = useQuery(WORKOUTS, {
    onCompleted: (data) => {
      setWorkoutsData(data.workouts);
    },
  });

  const addExercise = (exercise) => {
    for (let ex of selectedExercises) {
      if (ex.id === exercise.id) {
        setSelectedExercises((old) => {
          return old.filter((el) => el.id !== exercise.id);
        });
        return;
      }
    }

    setSelectedExercises((old) => {
      if (old.length === 3) {
        return [...old.splice(2, 1), { name: exercise.name, id: exercise.id }];
      }
      return [...old, { name: exercise.name, id: exercise.id }];
    });
  };

  const selectExercise = (exercise) => {
    if (
      selectedExercises.length === 1 &&
      selectedExercises[0].id === exercise.id
    ) {
      setSelectedExercises([]);
      return;
    }
    setSelectedExercises([exercise]);
  };

  useEffect(() => {
    if (workoutsData.length < 1 || exercisesData.length < 1) {
      return;
    }
    let chartLabels = [];
    const chartValues = [[], [], []];

    workoutsData.forEach((workout) => {
      workout.details.forEach((d) => {
        selectedExercises.forEach((selExercise, index) => {
          if (d.exercise._id === selExercise.id) {
            chartValues[index].push(d.maxWeight);
            // if (index === 0) chartLabels.push(chartLabels.length + 1);
          }
        });
      });
    });

    chartValues.forEach((arr) => {
      if (arr.length > chartLabels.length) {
        chartLabels = [...arr.keys()];
      }
    });

    const chartDatasets = selectedExercises.map((chart, index) => {
      return {
        label: chart.name,
        data: chartValues[index],
        backgroundColor: chartColors[index],
        borderColor: chartColors[index],
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      };
    });

    setChartData({
      labels: chartLabels,
      datasets: chartDatasets,
    });
  }, [workoutsData, exercisesData, selectedExercises]);

  const getStyles = (id) => {
    if (selectedExercises[0] && id === selectedExercises[0].id) {
      return "first-style";
    }

    if (selectedExercises[1] && id === selectedExercises[1].id) {
      return "second-style";
    }

    if (selectedExercises[2] && id === selectedExercises[2].id) {
      return "third-style";
    }

    return "";
  };

  return (
    <div className="stats--page">
      <div className="sidebar">
        <h2 className="sidebar-title">Check your stats</h2>
        <div className="sidebar-options">
          {exercisesData.length > 0 ? (
            exercisesData.map((exercise) => (
              <SidebarOption
                key={exercise._id}
                id={exercise._id}
                name={exercise.name}
                handleAdd={addExercise}
                handleSelect={selectExercise}
                styles={getStyles(exercise._id)}
              />
            ))
          ) : (
            <h4 className="center">No exercises yet</h4>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="chart-container">
          <Line
            data={chartData}
            options={{
              legend: {
                labels: {
                  fontColor: "rgba(255, 255, 255, 0.651)",
                  fontSize: 16,
                  fontFamily: "Merriweather Sans",
                },
              },

              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      fontColor: "rgba(255, 255, 255, 0.651)",
                      callback: function (value) {
                        return value + " kg";
                      },
                    },
                    gridLines: {
                      zeroLineColor: "rgba(211,211,211, 0.3)",
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: "rgba(255, 255, 255, 0.651)",
                    },
                    gridLines: {
                      zeroLineColor: "rgba(211,211,211, 0.3)",
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
