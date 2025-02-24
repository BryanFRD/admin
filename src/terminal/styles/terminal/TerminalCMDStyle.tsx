import { TerminalStyleInterface, TerminalStyleObject } from "../TerminalStyle";

class TerminalCMDStyle implements TerminalStyleInterface {
  readonly style: Partial<TerminalStyleObject> = {};
}

export default TerminalCMDStyle;
