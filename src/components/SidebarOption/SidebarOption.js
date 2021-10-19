import { FaPlusSquare } from "react-icons/fa";

const SidebarOption = ({ id, name, handleAdd, handleSelect, styles }) => {
  return (
    <div className={`sidebaroption row ${styles}`}>
      <h2>{name}</h2>
      <div className="row side-btns">
        <button
          className="btn btn-primary btn-small"
          onClick={() => handleSelect({ name, id })}
        >
          Select
        </button>
        <FaPlusSquare onClick={() => handleAdd({ name, id })} />
      </div>
    </div>
  );
};

export default SidebarOption;
