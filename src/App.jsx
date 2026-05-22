import { Route, Routes } from "react-router-dom";
import Layout from "./utils/Layout";
import AuditForm from "./components/AuditForm";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Home/>} />
         <Route path="/audit" element={<AuditForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
