import { MdDeleteForever } from "react-icons/md";

const ExerciseInput = ({ name, keyId, handleChange, handleRemove }) => {
  return (
    <div className="exercise-input">
      <div className="row title">
        <h1>{name}</h1>
        <MdDeleteForever onClick={() => handleRemove(keyId)} />
      </div>
      <div className="row">
        <input
          type="number"
          placeholder="Sets"
          className="part"
          onChange={(e) => {
            handleChange(keyId, "sets", e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Reps"
          className="part"
          onChange={(e) => {
            handleChange(keyId, "reps", e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Max Weight"
          className="part"
          onChange={(e) => {
            handleChange(keyId, "maxWeight", e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default ExerciseInput;
