import { NotificationContext } from "./NotificationProvider";
import React, { useState, useEffect, useContext } from "react";
import { IoCloseCircle } from "react-icons/io5";

const Notification = ({ id, type, title, message }) => {
  const [width, setWidth] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [intervalId, setInntervalId] = useState(null);
  const dispatch = useContext(NotificationContext);

  const startNotificationTimer = () => {
    if (hasEnded) return;

    const iid = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        prepareRomoveNotification();
        clearInterval(iid);
        return prev;
      });
    }, 15);
    setInntervalId(iid);
  };

  const stopNotificationTimer = () => {
    clearInterval(intervalId);
  };

  const prepareRomoveNotification = () => {
    setHasEnded(true);
    removeNotification();
  };

  const removeNotification = () => {
    setTimeout(() => {
      dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
    }, 800);
  };

  useEffect(() => {
    startNotificationTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`notification ${hasEnded ? "exit " : ""} ${
        type === "ERROR" ? "error" : "succsess"
      }`}
      onMouseEnter={stopNotificationTimer}
      onMouseLeave={startNotificationTimer}
    >
      <h5 className={type === "ERROR" ? "h5error" : "h5succsess"}>{title}</h5>

      <span className="notification-message">{message}</span>
      <span
        className="notification-btn"
        onClick={() => prepareRomoveNotification()}
      >
        {<IoCloseCircle />}
      </span>

      <div className="notification-bar" style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;
