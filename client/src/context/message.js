import { createContext, useReducer, useContext } from "react";

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, action) => {
  let updatedUsers;
  let userIndex;
  const { username, message, messages } = action.payload;
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_USER_MESSAGES":
      updatedUsers = [...state.users];

      userIndex = updatedUsers.findIndex((u) => u.username === username);

      updatedUsers[userIndex] = { ...updatedUsers[userIndex], messages };

      return {
        ...state,
        users: updatedUsers,
      };
    case "SET_SELECTED_USER":
      updatedUsers = state.users.map((user) => ({
        ...user,
        selected: user.username === action.payload,
      }));

      return {
        ...state,
        users: updatedUsers,
      };
    case "ADD_MESSAGE":
      updatedUsers = [...state.users];

      userIndex = updatedUsers.findIndex((u) => u.username === username);

      let upadtedUser = {
        ...updatedUsers[userIndex],
        messages: updatedUsers[userIndex].messages
          ? [message, ...updatedUsers[userIndex].messages]
          : null,
        latestMessage: message,
      };
      updatedUsers[userIndex] = upadtedUser;

      return {
        ...state,
        users: updatedUsers,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null });

  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

export const useMessageState = () => useContext(MessageStateContext);
export const useMessageDispatch = () => useContext(MessageDispatchContext);
