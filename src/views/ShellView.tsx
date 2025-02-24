import Terminal from "../terminal/components/Terminal";

const ShellView = () => {
  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden p-2">
      <h1 className="m-2 text-2xl font-semibold text-gray-100">Terminal:</h1>
      <div className="flex-1 overflow-auto">
        <Terminal />
      </div>
    </div>
  );
};

export default ShellView;
