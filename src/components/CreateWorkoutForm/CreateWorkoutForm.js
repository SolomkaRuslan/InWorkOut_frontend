import React, { useRef } from "react";
import ExerciseInput from "../ExerciseInput/ExerciseInput";
import { FaCheckSquare } from "react-icons/fa";
import useNotification from "../../hooks/useNotification";

const CreateWorkoutForm = ({
  exercises,
  handleChange,
  handleCreate,
  handleRemove,
}) => {
  const displayNotification = useNotification();
  const dateRef = useRef();
  const lengthRef = useRef();

  const handleCreateWorkout = () => {
    if (exercises.length < 1) {
      displayNotification("ERROR", "You need to add some exerises first");
      return;
    }
    const normalDetails = exercises.map((item) => {
      return {
        exercise: item.exercise,
        reps: item.reps,
        sets: item.sets,
        maxWeight: item.maxWeight,
      };
    });
    let goodDetails = true;
    normalDetails.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!item[key]) {
          goodDetails = false;
          return;
        }
      });
    });

    if (!dateRef.current.value || !lengthRef.current.value || !goodDetails) {
      displayNotification("ERROR", "Please fill in all fields");
      return;
    }

    const vars = {
      variables: {
        createWorkoutWorkoutInput: {
          date: dateRef.current.value,
          length: +lengthRef.current.value,
          details: [...normalDetails],
        },
      },
    };
    dateRef.current.value = "";
    lengthRef.current.value = "";
    handleCreate(vars);
  };

  return (
    <form className="myform">
      <div className="row">
        <p className="white">Create new Workout</p>
        <button
          type="button"
          className="myform-btn"
          onClick={() => handleCreateWorkout()}
        >
          Submit
          <FaCheckSquare />
        </button>
      </div>
      <div className="row">
        <input type="date" lang="en-GB" className="part" ref={dateRef} />
        <input
          type="number"
          placeholder="How many minutes"
          className="part"
          ref={lengthRef}
        />
      </div>
      <div className="exercise-input-list">
        {exercises.length > 0 ? (
          exercises.map((item) => (
            <ExerciseInput
              key={item.keyId}
              keyId={item.keyId}
              name={item.name}
              handleChange={handleChange}
              handleRemove={handleRemove}
            />
          ))
        ) : (
          <h4>Add some exercises to your workout</h4>
        )}
      </div>
    </form>
  );
};

export default CreateWorkoutForm;
