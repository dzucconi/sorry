import React, { useEffect, useReducer } from "react";
import parameters from "queryparams";
import axios from "axios";
import styled from "styled-components";

import { CONFIG } from "./config";
import { VOICES } from "./lib/voices";
import { mispell } from "./lib/mispell";
import { randomGrab } from "./lib/randomGrab";
import { useSpeech } from "./lib/useSpeech";
import { Message } from "./components/Message";
import { Spinner } from "./components/Spinner";
import { Loading } from "./components/Loading";

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

const { message: INITIAL_MESSAGE } = parameters({
  message: "sorry"
});

const reducer = (state, action) => {
  switch (action.type) {
    case "READY":
      return {
        ...state,
        ready: true,
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
  const [{ voice, message, ready }, dispatch] = useReducer(reducer, {
    ready: false,
    voices: VOICES,
    voice: randomGrab({}, VOICES),
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

  useEffect(() => {
    document.title = message;
  }, [message]);

  return (
    <>
      {audio}

      {!ready && <Spinner />}

      <Loading ready={ready}>
        <Container>
          <Message>{message}</Message>
        </Container>
      </Loading>
    </>
  );
}

export default App;
