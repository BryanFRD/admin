import { TerminalStyleInterface, TerminalStyleObject } from "../TerminalStyle";

class TerminalZSHStyle implements TerminalStyleInterface {
  readonly style: Partial<TerminalStyleObject> = {
    terminalHistoryContainer:
      "flex flex-col pointer-events-none px-4 cursor-text text-green-400",
  };
}

export default TerminalZSHStyle;
