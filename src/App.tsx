import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NotFoundView from "./views/NotFound";
import DashboardView from "./views/DashboardView";
import DockerDashboardView from "./views/dockers/DockerDashboardView";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardView />} />
          <Route path="/docker" element={<DockerDashboardView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
