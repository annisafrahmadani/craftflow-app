import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Jobs from "./pages/Jobs";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/tasks" element={<Tasks/>} />
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/settings" element={<Settings/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App 