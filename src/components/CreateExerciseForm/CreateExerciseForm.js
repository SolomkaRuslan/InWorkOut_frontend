import React, { useRef } from "react";
import DropDown from "../DropDown/DropDown";
import BODY_PARTS_LIST from "../../data/bodyPartsList";
import { FaCheckSquare } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import useNotification from "../../hooks/useNotification";

const CreateExerciseForm = ({
  makeRequest,
  requestInputName,
  title,
  exerciseId = null,
  callback = () => {},
}) => {
  const [selectedBodyPart, setSelecteBodyPart] = useState(null);
  const displayNotification = useNotification();
  const name = useRef();
  const targetMuscle = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.current.value || !selectedBodyPart) {
      displayNotification("ERROR", "Please fill in all fields");
      return;
    }

    const vars = {
      [requestInputName]: {
        name: name.current.value,
        targetBodyPart: selectedBodyPart,
        targetMuscle: targetMuscle.current.value,
      },
    };

    if (exerciseId) vars.updateExerciseId = exerciseId;

    makeRequest({
      variables: vars,
    });
    name.current.value = "";
    targetMuscle.current.value = "";
    setSelecteBodyPart(null);
    callback();
  };

  return (
    <form className="myform" onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <p>{title}</p>
        <button type="submit" className="myform-btn">
          Submit
          <FaCheckSquare />
        </button>
      </div>
      <input
        type="text"
        className="name"
        placeholder="Name of the exercise"
        ref={name}
      />
      <div className="row">
        <DropDown
          classes="part margin-b"
          title="Targeted body part"
          options={BODY_PARTS_LIST}
          selectedValue={selectedBodyPart}
          handleChange={setSelecteBodyPart}
        />
        <input
          type="text"
          className="part"
          placeholder="Muscle (Optional)"
          ref={targetMuscle}
        />
      </div>
    </form>
  );
};

export default CreateExerciseForm;
