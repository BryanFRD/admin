import TerminalType from "../enum/TerminalType";
import { TerminalStyleObject } from "../styles/TerminalStyle";

interface TerminalSelectorProps {
  terminalType: TerminalType;
  setTerminalType: React.Dispatch<React.SetStateAction<TerminalType>>;
  style: TerminalStyleObject;
}

const TerminalSelector = ({
  terminalType,
  setTerminalType,
  style,
}: TerminalSelectorProps) => {
  return (
    <select
      className={style.terminalSelectorSelect}
      value={terminalType}
      onChange={(e) => setTerminalType(e.target.value as TerminalType)}
    >
      {Object.values(TerminalType).map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default TerminalSelector;
