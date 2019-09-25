import React from "react";
import ReactDOM from "react-dom";
import { block } from "audiate";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

block({
  onEnable: () => ReactDOM.render(<App />, document.getElementById("root"))
});

serviceWorker.unregister();
