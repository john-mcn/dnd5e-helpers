export function dndWikidotUrlFromRace(raceStr: string) {
  return `https://dnd5e.wikidot.com/lineage:${raceStr.replace("(","").replace(")","").replace(" ","-")}`;
}