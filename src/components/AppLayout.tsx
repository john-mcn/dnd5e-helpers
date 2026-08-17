import { NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
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
          </nav>
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}