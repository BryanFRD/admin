import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { config } from "../configs/config";
import { Event, EventPayload } from "../events/event";

interface WebTransportContextProps {
  messages: string[];
  sendMessage: <T extends Event>(
    type: T,
    data?: EventPayload<T>,
  ) => Promise<void>;
}

const WebTransportContext = createContext<WebTransportContextProps | undefined>(
  undefined,
);

const WebTransportProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [webtransport, setWebtransport] = useState<WebTransport | null>(null);
  const [webtransportMethod] = useState<"datagrams" | "bidirectional">(
    "datagrams",
  );
  const [reader, setReader] = useState<
    ReadableStreamDefaultReader | undefined
  >();
  const [writer, setWriter] = useState<
    WritableStreamDefaultWriter | undefined
  >();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    let webtransport: WebTransport | null = null;

    const connect = async () => {
      try {
        webtransport = new WebTransport(config.WEBTRANSPORT_URL);
        await webtransport.ready;

        setWebtransport(webtransport);
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

  useEffect(() => {
    if (webtransport === null) {
      return;
    }

    const init = async () => {
      const stream =
        webtransportMethod === "datagrams"
          ? webtransport.datagrams
          : await webtransport.createBidirectionalStream();

      const readableStream = stream.readable;
      const writableStream = stream.writable;

      setReader(readableStream.getReader());
      setWriter(writableStream.getWriter());
    };

    init();
  }, [webtransport, webtransportMethod]);

  const readMessages = useCallback(async () => {
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
  }, [reader]);

  const sendMessage = useCallback(
    async <T extends Event>(type: T, data?: EventPayload<T>) => {
      if (writer === undefined) {
        return;
      }
      await writer.write(
        new TextEncoder().encode(JSON.stringify({ type, data })),
      );
    },
    [writer],
  );

  useEffect(() => {
    readMessages();
  }, [reader, readMessages]);

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
