import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="home-page">
      <div className="page-intro">
        <h1>D&D Generators</h1>
        <p>
          Quickly generate useful random content for your D&D game.
        </p>
      </div>

      <div className="generator-grid">
        <Link to="/artifacts" className="generator-card">
          {/* <div className="generator-card-icon"></div> */}
          <h2>Artefact Roller</h2>
          <p>Generate random artefact properties (beneficial and detrimental).</p>

          <span className="card-action">
            Open roller
          </span>
        </Link>

        <Link to="/npcs" className="generator-card">
          {/* <div className="generator-card-icon"></div> */}
          <h2>NPC Generator</h2>
          <p>Generate random NPCs with races, jobs, likes, dislikes and quirks.</p>

          <span className="card-action">
            Open generator
          </span>
        </Link>
      </div>
    </section>
  );
}