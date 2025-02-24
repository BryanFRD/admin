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
  const [status, setStatus] = useState<
    "connected" | "disconnected" | "connecting" | "disconnecting"
  >("disconnected");
  const [transport, setTransport] = useState<WebTransport | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    let webtransport: WebTransport | null = null;

    const connect = async () => {
      try {
        setStatus("connecting");
        webtransport = new WebTransport(config.WEBTRANSPORT_URL);
        await webtransport.ready;

        setTransport(webtransport);

        const reader = webtransport.datagrams.readable.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          console.log("value:", new TextDecoder().decode(value));

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
      webtransport?.closed.then(() => {
        webtransport?.close();
      });
    };
  }, []);

  const sendMessage = async (message: string) => {
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
