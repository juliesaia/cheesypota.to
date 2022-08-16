import { createContext, useContext, onMount } from "solid-js";

import { createStore } from "solid-js/store";

const GlobalContext = createContext<{ isMobile: boolean | null }>();

export function GlobalProvider(props) {
  const [global, setGlobal] = createStore({ isMobile: null });

  onMount(() => {
    setGlobal("isMobile", navigator.userAgentData.mobile);
    console.log(navigator.userAgentData.mobile);
  });

  return (
    <GlobalContext.Provider value={global}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
