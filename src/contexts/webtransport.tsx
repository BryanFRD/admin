import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
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
  const [reader, setReader] = useState<
    ReadableStreamDefaultReader | undefined
  >();
  const [writer, setWriter] = useState<
    WritableStreamDefaultWriter | undefined
  >();
  const [messages, setMessages] = useState<string[]>([]);
  const [sendMessage, setSendMessage] = useState< 
    (message: string) => Promise<void>
  >(async () => {});

  useEffect(() => {
    let webtransport: WebTransport | null = null;

    const connect = async () => {
      try {
        webtransport = new WebTransport(config.WEBTRANSPORT_URL);
        await webtransport.ready;

        const bidirectionalStream =
          await webtransport.createBidirectionalStream();
        setReader(bidirectionalStream.readable.getReader());
        setWriter(bidirectionalStream.writable.getWriter());

        const readStream = async () => {
          while (true) {
            if (reader === undefined) {
              break;
            }

            const { value, done } = await reader.read();
            if (done) {
              break;
            }
            setMessages((prevValue) => [
              ...prevValue,
              new TextDecoder().decode(value),
            ]);
          }
        };

        readStream();

        const sendMessage = async (message: string) => {
          if (writer === undefined) {
            return;
          }
          await writer.write(new TextEncoder().encode(message));
        };

        setSendMessage(sendMessage);
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
  }, [reader, writer]);

  const contextValue = useMemo(
    () => ({ messages, sendMessage }),
    [messages, sendMessage],
  );

  return (
    <WebTransportContext.Provider value={contextValue}>
      {children}
    </WebTransportContext.Provider>
  );
};

export default WebTransportProvider;
export { WebTransportContext };
