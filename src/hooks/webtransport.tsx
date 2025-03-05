import { useContext } from "react";
import { WebTransportContext } from "../contexts/webtransport";

export const useWebTransport = () => {
  const context = useContext(WebTransportContext);
  if (!context) {
    throw new Error("WebTransportContext is undefined");
  }
  return context;
};
