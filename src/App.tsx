function App() {
  console.log(import.meta.env);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-800 text-center text-white">
      <h1 className="text-3xl">ADMIN PANEL</h1>
      <p className="mt-4">{import.meta.env.VITE_API_URL}</p>
    </div>
  );
}

export default App;
