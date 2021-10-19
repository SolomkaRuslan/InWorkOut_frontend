import Notification from "./Notification";
import { v4 } from "uuid";
import { useReducer, createContext } from "react/cjs/react.development";
import "./notification.css";

export const NotificationContext = createContext();

const reducer = (store, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      return [...store, { ...action.payload, id: v4() }];
    }
    case "REMOVE_NOTIFICATION": {
      return store.filter((note) => note.id !== action.payload);
    }
    default: {
      return store;
    }
  }
};

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <NotificationContext.Provider value={dispatch}>
      <div className="notification-wrapper">
        {state.map((note) => (
          <Notification key={note.id} {...note} />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
