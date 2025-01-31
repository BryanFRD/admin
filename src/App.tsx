import axios from "axios";
import { config } from "./configs/config";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("NO DATA");

  useEffect(() => {
    axios.get(`${config.API_URL}/containers`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-800 text-center text-white">
      <h1 className="text-3xl">ADMIN PANEL</h1>
      <p className="mt-4">{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
