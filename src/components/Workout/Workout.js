import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import "./Workout.css";

const Workout = ({ workout, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const tags = [];
  workout.details.forEach((item) => {
    if (!tags.includes(item.exercise.targetBodyPart)) {
      tags.push(item.exercise.targetBodyPart);
    }
  });

  return (
    <div className="workout">
      <div className="row">
        <p className="wrk">
          <span className="statik-text">Date:</span>
          {workout.date}
        </p>
        <p className="wrk">
          <span className="statik-text"> Minutes:</span>
          {workout.length}
        </p>
        <p className="wrk">
          <span className="statik-text">Exercises:</span>
          {workout.details.length}
        </p>
        <div className="long">
          <span className="statik-text">Trained:</span>
          {tags.map((item) => item + " ")}
        </div>

        <div className="btns">
          <button
            className={
              showDetails
                ? "btn btn-secondary active-details"
                : "btn btn-secondary"
            }
            onClick={() => setShowDetails((old) => !old)}
          >
            Details
          </button>
          <MdDeleteForever
            onClick={() =>
              handleDelete({
                variables: {
                  deleteWorkoutId: workout._id,
                },
              })
            }
          />
        </div>
      </div>
      {showDetails && (
        <div className="details">
          {workout.details.map((d) => (
            <div key={d._id} className="workout-exercise row">
              <div className="row longer">
                <p className="big">
                  <span className="statik-text">Exercise:</span>
                  {d.exercise.name}
                </p>
                <p className="big">
                  <span className="statik-text">Trained:</span>
                  {d.exercise.targetMuscle
                    ? `${d.exercise.targetBodyPart} - ${d.exercise.targetMuscle}`
                    : `${d.exercise.targetBodyPart}`}
                </p>
              </div>
              <div className="row long">
                <p className="big">
                  <span className="statik-text">Sets:</span>
                  {d.sets}
                </p>
                <p className="big">
                  <span className="statik-text">Reps:</span>
                  {d.reps}
                </p>
                <p className="big">
                  <span className="statik-text">Weight:</span>
                  {d.maxWeight}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workout;
