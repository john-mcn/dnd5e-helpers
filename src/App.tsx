import { useState, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/main.css"
import { AppLayout } from './components/AppLayout';
import { HomePage } from './pages/HomePage';
import { NpcPage } from './pages/NpcPage';
import { ArtefactPage } from './pages/ArtefactPage';
import { NotFoundPage } from './components/NotFoundPage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="loading-screen" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        {/* <img src="/icons/icon-192.png" alt="" /> */}
        <h1>D&D Helper</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/artifacts" element={<ArtefactPage />} />
          <Route path="/npcs" element={<NpcPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
