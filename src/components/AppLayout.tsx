import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
  const [theme, setTheme] = useState<"dark" | "light">(
    () => {
      const saved = localStorage.getItem("theme");

      return saved === "light"
        ? "light"
        : "dark";
    }
  );
  
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <NavLink to="/" className="brand">
            D&D Generators
          </NavLink>

          <nav className="main-nav">
            <NavLink
              to="/artifacts"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Artefacts
            </NavLink>

            <NavLink
              to="/npcs"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              NPCs
            </NavLink>
            <button
              onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
              className="theme-button"
            >
              {theme === "dark"
                ? <img src="/sun.svg" alt="Light" className="theme-icon"></img>
                : <img src="/moon.svg" alt="Light" className="theme-icon"></img>
              }
            </button>
          </nav>
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}