import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./context/ThemeContext";
import { TodoProvider } from "./context/TodoContext";

import { store, persistor } from "./redux/store";
import { App } from "./App";

import "./scss/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
