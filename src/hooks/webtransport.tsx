import { useContext } from "react";
import { WebTransportContext } from "../contexts/webtransport";

export const useWebTransport = () => useContext(WebTransportContext);
