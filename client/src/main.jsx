import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./redux/reducers/userReducer";
import teamReducer from "./redux/reducers/teamReducer";

// Combine multiple reducers if needed
const rootReducer = combineReducers({
  users: userReducer,
  team: teamReducer,
});

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode> 
);






