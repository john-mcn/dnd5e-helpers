import { API_BASE } from "../api/client";
import type { ArtefactData, ArtefactResponse } from "../api/client";

const out = document.getElementById("out");

document.getElementById("rollBtn")?.addEventListener("click", roll);

//TODO Extract api call to api/client
async function roll() {
  if (!out) return;
  out.innerHTML = "Rolling...";

  const url = new URL(API_BASE + "artifact");

  url.searchParams.set("minorBeneficial", getVal("minorBen"));
  url.searchParams.set("majorBeneficial", getVal("majorBen"));
  url.searchParams.set("minorDetrimental", getVal("minorDet"));
  url.searchParams.set("majorDetrimental", getVal("majorDet"));

  const res = await fetch(url);
  const data = await res.json();

  out.innerHTML = format(data);
}

function getVal(id: string) {
  return document.getElementById(id)?.value || 0;
}

function format(data: ArtefactResponse) {
  const wrap = (title: string, items: ArtefactData[]) => {
    if (!items?.length) return "";

    return `
      <h2>${title}</h2>
      <ul>
        ${items
          .map(r => `<li><strong>[${r.roll}]</strong> ${r.result}</li>`)
          .join("")}
      </ul>
    `;
  };

  return `
    ${wrap("Minor Beneficial", data.minorBeneficial)}
    ${wrap("Major Beneficial", data.majorBeneficial)}
    ${wrap("Minor Detrimental", data.minorDetrimental)}
    ${wrap("Major Detrimental", data.majorDetrimental)}
  `;
}