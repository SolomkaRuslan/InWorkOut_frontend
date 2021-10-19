import { useContext } from "react";
import { NotificationContext } from "../helpers/notifications/NotificationProvider";

function useNotification() {
  const dispatchNotification = useContext(NotificationContext);

  const displayNotification = (
    type = "ERROR",
    message = "Something went wrong here"
  ) => {
    dispatchNotification({
      type: "ADD_NOTIFICATION",
      payload: {
        type,
        message,
        title: type === "ERROR" ? "Opps an Error!" : "Well done!",
      },
    });
  };

  return displayNotification;
}

export default useNotification;
