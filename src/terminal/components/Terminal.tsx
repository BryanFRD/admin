import { useEffect, useRef, useState } from "react";
import TerminalSelector from "./TerminalSelector";
import TerminalType from "../enum/TerminalType";
import TerminalStyle, { TerminalStyleObject } from "../styles/TerminalStyle";
import { useCaretPosition } from "react-use-caret-position";

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { ref, updateCaret, start, end } = useCaretPosition();
  const [input, setInput] = useState<string>("");
  const [isAutoComplete, setIsAutoComplete] = useState<boolean>(false);
  const [autoCompleteBuffer, setAutoCompleteBuffer] = useState<string | null>(
    null,
  );
  const [type, setType] = useState<TerminalType>(TerminalType.CMD);
  const [style, setStyle] = useState<TerminalStyleObject>(
    TerminalStyle.getTerminalStyle(type),
  );
  const [output, setOutput] = useState<string[]>(
    Array.from({ length: 100 }, (_, i) => `Line ${i + 1}`),
  );
  const [currentDir] = useState<string>("~");

  const handleKeyDownCapture = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsAutoComplete(false);
      setOutput((prevValue) => [...prevValue, input]);
      setInput("");
    } else if (e.key === "Tab") {
      console.log(start, end);
      setIsAutoComplete(true);
      e.preventDefault();
    } else {
      setIsAutoComplete(false);
    }
  };

  const focusInput = (
    element: React.MouseEvent<HTMLDivElement, MouseEvent> | null = null,
  ) => {
    if (element == null || element.target === terminalRef.current) {
      ref.current?.focus({
        preventScroll: true,
      });
    }
  };

  const scrollToBottom = () => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
    });
  };

  useEffect(() => {
    scrollToBottom();
    focusInput();
  }, [terminalRef, input, output]);

  useEffect(() => {
    setStyle(TerminalStyle.getTerminalStyle(type));
  }, [type]);

  return (
    <div className="relative h-full overflow-hidden">
      <div
        ref={terminalRef}
        onClickCapture={focusInput}
        className={style.terminalContainer}
      >
        <div className={style.terminalHistoryContainer}>
          {output.map((line, index) => (
            <span key={index + line}>{line}</span>
          ))}
        </div>
        <div className="bottom-0 mt-2 flex w-full items-center gap-2">
          <span className="whitespace-nowrap">$&nbsp;{currentDir}&gt;</span>
          <input
            ref={ref}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              updateCaret();
            }}
            onKeyDownCapture={handleKeyDownCapture}
            className="w-full outline-0"
          />
        </div>
        <div className={style.terminalSelectorContainer}>
          <TerminalSelector
            terminalType={type}
            setTerminalType={setType}
            style={style}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
