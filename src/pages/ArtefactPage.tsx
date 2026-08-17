import { useState } from "react";
import type { ArtefactData, ArtefactOptions, ArtefactResponse } from '../api/client';
import { generateArtefact } from "../api/client";

const DEFAULT_OPTIONS: ArtefactOptions = {
  minorBeneficial: 2,
  majorBeneficial: 1,
  minorDetrimental: 1,
  majorDetrimental: 0,
};

export function ArtefactPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [options, setOptions] = useState<ArtefactOptions>(DEFAULT_OPTIONS);
  const [result, setResult] = useState<ArtefactResponse | null>(null);

  function updateOption(key: keyof ArtefactOptions, value: number) {
    setOptions((current) => ({
      ...current,
      [key]: Math.max(0, value),
    }));
  }

  async function handleRoll() {
    setLoading(true);
    setError(null);

    try {
      const data = await generateArtefact(options);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to generate an artefact. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="page-intro">
        <h1>Artefact Roller</h1>
      </div>

      <div className="generator-panel">
        <div className="Artefact-input-grid">
          <NumberInput
            label="Minor Beneficial"
            value={options.minorBeneficial}
            onChange={(value) =>
              updateOption("minorBeneficial", value)
            }
          />

          <NumberInput
            label="Major Beneficial"
            value={options.majorBeneficial}
            onChange={(value) =>
              updateOption("majorBeneficial", value)
            }
          />

          <NumberInput
            label="Minor Detrimental"
            value={options.minorDetrimental}
            onChange={(value) =>
              updateOption("minorDetrimental", value)
            }
          />

          <NumberInput
            label="Major Detrimental"
            value={options.majorDetrimental}
            onChange={(value) =>
              updateOption("majorDetrimental", value)
            }
          />
        </div>

        <button
          className="primary-button"
          onClick={handleRoll}
          disabled={loading}
        >
          {loading ? "Rolling..." : "Roll Artefact"}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {result && (
        <ArtefactResult result={result} />
      )}
    </section>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="number-input">
      <span>{label}</span>

      <input
        type="number"
        min="0"
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
      />
    </label>
  );
}

function ArtefactResult({ result }: { result: ArtefactResponse }) {
  return (
    <div className="result-panel">
      <ResultSection
        title="Minor Beneficial"
        items={result.minorBeneficial}
      />

      <ResultSection
        title="Major Beneficial"
        items={result.majorBeneficial}
      />

      <ResultSection
        title="Minor Detrimental"
        items={result.minorDetrimental}
      />

      <ResultSection
        title="Major Detrimental"
        items={result.majorDetrimental}
      />
    </div>
  );
}

function ResultSection({ title, items }: { title: string, items: ArtefactData[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="result-section">
      <h2>{title}</h2>

      <ul>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>
            ({item.roll}) {item.result}
          </li>
        ))}
      </ul>
    </section>
  );
}