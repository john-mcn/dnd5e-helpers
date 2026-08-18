import { useState, useEffect } from "react";
import { generateNpcs, type Npc, type NpcOptions } from "../api/client";
import { NumberInput } from "../components/NumberInput";
import { CheckboxInput } from "../components/CheckboxInput";

const DEFAULT_OPTIONS: NpcOptions = {
  count: 1,
  raceSrc: "common+exotic+monstrous",
  likeCount: 1,
  dislikeCount: 1,
  quirkCount: 1
}

export function NpcPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [options, setOptions] = useState<NpcOptions>(DEFAULT_OPTIONS);
  const [result, setResult] = useState<Npc[] | null>(null);

  function updateOption(key: keyof NpcOptions, value: number) {
    setOptions((current) => ({
      ...current,
      [key]: Math.max(0, value),
    }));
  }

  function updateRaceSrc(value: string[]) {
    setOptions((current) => ({
      ...current,
      raceSrc: [...new Set(value)].join("+"),
    }));
  }

  async function handleResult() {
    setLoading(true);
    setError(null);

    try {
      const data = await generateNpcs(options);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to generate NPC. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <section>
      <div className="page-intro">
        <h1>NPC Generator</h1>
        <p>
          Generate random NPCs for your game.
        </p>
      </div>

      <div className="generator-panel">
        <div className="input-grid">
          <CheckboxInput
            label="Race Source"
            options={[
              { value: "common", label: "Common" },
              { value: "exotic", label: "Exotic" },
              { value: "monstrous", label: "Monstrous" },
            ]}
            value={options.raceSrc ? options.raceSrc.split("+") : []}
            onChange={updateRaceSrc}
          />

          <NumberInput
            label="Count"
            value={options.count}
            onChange={(value) => updateOption("count", value) }
          />

          <NumberInput
            label="Like Count"
            value={options.likeCount}
            onChange={(value) =>
              updateOption("likeCount", value)
            }
          />

          <NumberInput
            label="Dislike Count"
            value={options.dislikeCount}
            onChange={(value) => updateOption("dislikeCount", value) }
          />

          <NumberInput
            label="Quirk Count"
            value={options.quirkCount}
            onChange={(value) => updateOption("quirkCount", value) }
          />
        </div>

        <br/>
        <button
          className="primary-button"
          onClick={handleResult}
          disabled={loading}
        >
          {loading ? "Rolling..." : "Generate NPC"}
        </button>
      </div>

    {error && (
      <div className="error-message">
        {error}
      </div>
    )}

    {result && (
      <NpcResult result={result} />
    )}
    </section>
  );
}

function NpcResult({ result }: { result: Npc[] }) {
  return (
    <div className="result-panel">
      <div className="npc-grid">
        {result.map((npc, index) => (
          <article className="npc-card" key={index}>
            <h2>NPC {index + 1}</h2>

            <p><strong>Race:</strong> {npc.race}</p>
            <p><strong>Maturity:</strong> {npc.maturity}</p>
            <p><strong>Job:</strong> {npc.job}</p>
            <p><strong>Likes:</strong> {npc.likes.join(", ")}</p>
            <p><strong>Dislikes:</strong> {npc.dislikes.join(", ")}</p>
            <p><strong>Quirks:</strong> {npc.quirks.join(", ")}</p>
          </article>
        ))}
      </div>
    </div>
  );
}