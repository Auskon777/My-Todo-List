import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import {Provider} from "react-redux";
import {store} from "./appStore/store";
import {CssBaseline, GlobalStyles} from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          },
          body: {
            margin: 0,
            padding: 0,
            boxSizing: "inherit",
            backgroundColor: "rgba(0, 0, 0,0.8)",
          },
        }}
      />
      <App />
    </Provider>
  </StrictMode>
);
