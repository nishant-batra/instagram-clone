import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";
import { configureStore } from "./store";
import { Provider } from "react-redux";
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,

  document.getElementById("root")
);
