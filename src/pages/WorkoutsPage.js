import { useContext } from "react";
import { NotificationContext } from "../helpers/notifications/NotificationProvider";
import { WORKOUTS, DELETE_WORKOUT } from "../data/graphqlQueries";
import { useQuery, useMutation } from "@apollo/client";
import SecondaryNavigation from "../components/SecondaryNavigation/SecondaryNavigation";
import DropDown from "../components/DropDown/DropDown";
import Workout from "../components/Workout/Workout";
import Spiner from "../helpers/Spiner/Spiner";

import "./WorkoutsPage.css";
import { useState } from "react/cjs/react.development";

const WorkoutsPage = () => {
  console.log("Workouts page rendered");
  const [sortingValue, setSortingValue] = useState("Date");
  const [lowToHigh, setLowToHigh] = useState(-1);
  const dispatchNotification = useContext(NotificationContext);
  const { loading, error, data } = useQuery(WORKOUTS);
  const [deleteWorkoutMutation, deleteWorkoutInfo] = useMutation(
    DELETE_WORKOUT,
    {
      update(cache, { data: { deleteWorkout } }) {
        cache.modify({
          fields: {
            workouts(existingItems = []) {
              return existingItems.filter(
                (item) => item.__ref !== `Workout:${deleteWorkout._id}`
              );
            },
          },
        });
      },

      onCompleted: (data) => {
        dispatchNotification({
          type: "ADD_NOTIFICATION",
          payload: {
            message: `Deleted ${data.deleteWorkout.date}`,
            title: "Congratulations!",
            type: "GOOD",
          },
        });
      },
      onError: (err) => {
        dispatchNotification({
          type: "ADD_NOTIFICATION",
          payload: {
            message: err.message,
            title: "Opps an Error!",
            type: "ERROR",
          },
        });
      },
    }
  );

  if (loading) console.log("Loading");
  if (error) console.log(error.message);

  return (
    <div className="main--container">
      <div className="workouts--page">
        <SecondaryNavigation>
          <h2>Your workouts library</h2>

          <div className="row">
            <button
              type="button"
              className="small-btn"
              onClick={() => setLowToHigh((old) => old * -1)}
            >
              {lowToHigh > 0 ? "Low to High" : "High to Low"}
            </button>
            <DropDown
              classes="small-dd m-left"
              options={["Date", "Time", "Exercises"]}
              title="Sorting"
              handleChange={setSortingValue}
              selectedValue={sortingValue}
            />
          </div>
        </SecondaryNavigation>
        <div className="standart-list">
          {data ? (
            [...data.workouts]
              .sort((a, b) => {
                if (sortingValue === "Time")
                  return (a.length - b.length) * lowToHigh;
                if (sortingValue === "Exercises")
                  return (a.details.length - b.details.length) * lowToHigh;
                if (sortingValue === "Date")
                  return (new Date(a.date) - new Date(b.date)) * lowToHigh;
                return 0;
              })
              .map((workout) => (
                <Workout
                  key={workout._id}
                  workout={workout}
                  handleDelete={deleteWorkoutMutation}
                />
              ))
          ) : (
            <Spiner />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPage;
