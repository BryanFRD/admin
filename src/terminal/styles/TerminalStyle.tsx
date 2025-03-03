import TerminalType from "../enum/TerminalType";
import TerminalCMDStyle from "./terminal/TerminalCMDStyle";
import TerminalZSHStyle from "./terminal/TerminalZSHStyle";

type TerminalStyleObject = {
  terminalContainer: string;
  terminalHistoryContainer: string;
  terminalSelectorContainer: string;
  terminalSelectorSelect: string;
};

interface TerminalStyleInterface {
  style: Partial<TerminalStyleObject>;
}

class TerminalStyle {
  private static readonly terminalStyles = {
    [TerminalType.CMD]: new TerminalCMDStyle(),
    [TerminalType.ZSH]: new TerminalZSHStyle(),
  };

  private static readonly defaultStyle: TerminalStyleObject = {
    terminalContainer:
      "flex h-full max-h-full min-h-full flex-col overflow-x-hidden overflow-y-auto rounded-2xl bg-gray-900 px-2 py-2 text-gray-200 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-none",
    terminalHistoryContainer:
      "flex flex-col pointer-events-none px-4 cursor-text",
    terminalSelectorContainer:
      "absolute top-4 right-4 opacity-50 hover:opacity-100 selected:opacity-100",
    terminalSelectorSelect:
      "rounded-md bg-gray-800 px-2 py-1 text-gray-200 outline-0",
  };

  public static getTerminalStyle(
    terminalType: TerminalType,
  ): TerminalStyleObject {
    const terminalStyle = this.terminalStyles[terminalType];

    return {
      ...this.defaultStyle,
      ...terminalStyle.style,
    };
  }
}

export default TerminalStyle;
export type { TerminalStyleObject, TerminalStyleInterface };
