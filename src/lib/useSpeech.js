import useAudio from "react-use/lib/useAudio";

import { CONFIG } from "../config";

const src = ({ input, voice }) => {
  const engine = voice.SupportedEngines.includes("neural")
    ? "neural"
    : "standard";
  return `${CONFIG.apiEndpoint}/?redirect=true&voice=${
    voice.Id
  }&engine=${engine}&input=${encodeURIComponent(input)}`;
};

export const useSpeech = ({ input, voice }) => {
  const [audio, state, controls, ref] = useAudio({
    src: src({ input, voice }),
    autoPlay: true
  });

  return [audio, state, controls, ref];
};
