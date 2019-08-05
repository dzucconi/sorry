import React, { useEffect, useReducer } from "react";
import parameters from "queryparams";
import axios from "axios";
import styled from "styled-components";

import { CONFIG } from "./config";
import { mispell } from "./lib/mispell";
import { randomGrab } from "./lib/randomGrab";
import { useSpeech } from "./lib/useSpeech";
import { Message } from "./components/Message";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 5rem;
  padding: 1em;
`;

const DEFAULT_VOICE = {
  Gender: "Male",
  Id: "Matthew",
  LanguageCode: "en-US",
  LanguageName: "US English",
  Name: "Matthew",
  SupportedEngines: ["neural", "standard"]
};

const { message: INITIAL_MESSAGE } = parameters({
  message: "sorry"
});

const reducer = (state, action) => {
  switch (action.type) {
    case "READY":
      return {
        ...state,
        voices: action.voices
      };
    case "NEXT":
      return {
        ...state,
        voice: randomGrab(state.voice, state.voices),
        message: mispell(state.message)
      };
    default:
      throw new Error(`${action.type} is unimplemented`);
  }
};

function App() {
  const [{ voice, message }, dispatch] = useReducer(reducer, {
    voices: [],
    voice: DEFAULT_VOICE,
    message: mispell(INITIAL_MESSAGE)
  });

  const [audio, state] = useSpeech({ input: INITIAL_MESSAGE, voice });

  useEffect(() => {
    if (state.time > 0 && state.duration > 0 && state.time === state.duration) {
      // Wait a moment before moving on...
      setTimeout(() => dispatch({ type: "NEXT" }), 1500);
    }
  }, [state.time, state.duration]);

  useEffect(() => {
    axios
      .get(`${CONFIG.apiEndpoint}/voices`)
      .then(({ data: voices }) => dispatch({ type: "READY", voices }));
  }, []);

  return (
    <>
      {audio}

      <Container>
        <Message>{message}</Message>
      </Container>
    </>
  );
}

export default App;
