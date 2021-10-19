import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import CreateExerciseForm from "../CreateExerciseForm/CreateExerciseForm";

import { FaEdit, FaPlusSquare } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import "./Exercise.css";

const Exercise = ({ exercise, handleDelete, handleUpdate, handleSelect }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="exercise">
      <div className="body-info">
        <span>{exercise.targetBodyPart}</span>
        <span>
          {exercise.targetMuscle ? ` - ${exercise.targetMuscle}` : ""}
        </span>{" "}
      </div>
      <div className="row wrap">
        <div className="exercise-title">{exercise.name}</div>

        <div className="buttons">
          <FaPlusSquare
            onClick={() => {
              handleSelect(exercise);
            }}
          />
          <FaEdit onClick={() => setShowEditForm((old) => !old)} />

          <MdDeleteForever
            onClick={() =>
              handleDelete({
                variables: {
                  deleteExerciseId: exercise._id,
                },
              })
            }
          />
        </div>
      </div>

      {showEditForm && (
        <OutsideClickHandler onOutsideClick={() => setShowEditForm(false)}>
          <CreateExerciseForm
            makeRequest={handleUpdate}
            requestInputName="updateExerciseExerciseInput"
            title="Edit your exercise"
            exerciseId={exercise._id}
            callback={() => setShowEditForm(false)}
          />
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default Exercise;
