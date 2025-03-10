import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { config } from "../configs/config";
import { Event, EventData, EventPayload } from "../types/events/event.type";

interface WebTransportContextProps {
  sendMessage: <T extends Event>(
    type: T,
    data?: EventPayload<T>,
  ) => Promise<void>;
  addEventListener: <T extends Event>(
    type: T,
    listener: (data: EventData<T>) => void,
  ) => () => void;
}

type EventListeners = {
  [T in Event]?: Array<(data: EventData<T>) => void>;
};

const WebTransportContext = createContext<WebTransportContextProps | undefined>(
  undefined,
);

const WebTransportProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [webtransport, setWebtransport] = useState<WebTransport | null>(null);
  const [webtransportMethod] = useState<"datagrams" | "bidirectional">(
    "bidirectional",
  );
  const [reader, setReader] = useState<
    ReadableStreamDefaultReader | undefined
  >();
  const [writer, setWriter] = useState<
    WritableStreamDefaultWriter | undefined
  >();
  const [messages, setMessages] = useState<string[]>([]);
  const [eventListeners, setEventListeners] = useState<EventListeners>({});

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

  const addListener = <T extends Event>(
    type: T,
    listener: (data: EventData<T>) => void,
  ) => {
    setEventListeners((prevValue) => ({
      ...prevValue,
      [type]: [...(prevValue[type] ?? []), listener],
    }));
  };

  const removeListener = <T extends Event>(
    type: T,
    listener: (data: EventData<T>) => void,
  ) => {
    setEventListeners((prevValue) => ({
      ...prevValue,
      [type]: (prevValue[type] ?? []).filter((l) => l !== listener),
    }));
  };

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
      console.log("sendMessage:", { type, data });
      await writer.write(
        new TextEncoder().encode(JSON.stringify({ type, data: data ?? {} })),
      );
    },
    [writer],
  );

  const addEventListener = useCallback(
    <T extends Event>(type: T, listener: (data: EventData<T>) => void) => {
      addListener(type, listener);

      return () => removeListener(type, listener);
    },
    [],
  );

  useEffect(() => {
    readMessages();
  }, [reader, readMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      const message = messages[messages.length - 1];
      const { type, data } = JSON.parse(message);
      const listeners = eventListeners[type as Event];
      if (listeners) {
        listeners.forEach((listener) => listener(data));
      }
    }
  }, [messages, eventListeners]);

  const contextValue = useMemo(
    () => ({ sendMessage, addEventListener }),
    [sendMessage, addEventListener],
  );

  return (
    <WebTransportContext.Provider value={contextValue}>
      {children}
    </WebTransportContext.Provider>
  );
};

export default WebTransportProvider;
export { WebTransportContext };
