import useNotification from "../../hooks/useNotification";

const AuthForm = ({
  title,
  values,
  handleSubmit,
  submitInputName,
  submitBtnLabel,
  children,
}) => {
  const displayNotification = useNotification();

  const validateInputData = (e) => {
    e.preventDefault();
    console.log("Pressing");

    for (const key of Object.keys(values)) {
      if (!values[key] || values[key] === "") {
        displayNotification("ERROR", "Please fill in all fields");
        console.log("ERROR");
        return;
      }
    }

    console.log("NO ERROR");
    handleSubmit({
      variables: {
        [submitInputName]: values,
      },
    });
  };

  return (
    <form className="auth-form" onSubmit={(e) => validateInputData(e)}>
      <p>{title}</p>
      {children}
      <button className="auth-btn" type="submit">
        {submitBtnLabel}
      </button>
    </form>
  );
};

export default AuthForm;
