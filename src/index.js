import React from "react";
import ReactDOM from "react-dom";
import audiate from "audiate";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

audiate({
  onEnable: () => ReactDOM.render(<App />, document.getElementById("root"))
});

serviceWorker.unregister();
