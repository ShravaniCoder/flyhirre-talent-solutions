import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import {
  Home,
  About,
  Solutions,
  Industries,
  Functions,
  Employers,
  Candidates,
  Process,
  India,
  Contact,
} from "./pages";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recruitment-solutions" element={<Solutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/corporate-functions" element={<Functions />} />
        <Route path="/employers" element={<Employers />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/recruitment-process" element={<Process />} />
        <Route path="/india-coverage" element={<India />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
