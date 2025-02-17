import React, { createContext, useState, ReactNode, useEffect } from "react";
import { config } from "../configs/config";

interface WebTransportContextProps {
  messages: string[];
  sendMessage: (message: string) => Promise<void>;
}

const WebTransportContext = createContext<WebTransportContextProps | undefined>(
  undefined,
);

const WebTransportProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transport, setTransport] = useState<WebTransport | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    let webtransport: WebTransport | null = null;

    const connect = async () => {
      try {
        webtransport = new WebTransport(config.WEBTRANSPORT_URL);
        await webtransport.ready;

        setTransport(webtransport);

        const reader = webtransport.datagrams.readable.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          setMessages((prevValue) => [
            ...prevValue,
            new TextDecoder().decode(value),
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    connect();

    return () => {
      webtransport?.close();
    };
  }, []);

  const sendMessage = async (message: string) => {
    console.log("message:", message);
    console.log("transport:", transport);
    if (transport) {
      const writer = transport.datagrams.writable.getWriter();
      await writer.write(new TextEncoder().encode(message));
      writer.releaseLock();
    }
  };

  return (
    <WebTransportContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebTransportContext.Provider>
  );
};

export default WebTransportProvider;
export { WebTransportContext };
