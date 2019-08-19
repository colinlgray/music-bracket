export * from "./Bracket";
export * from "./Artist";
export * from "./Competitor";
export * from "./Track";

export type ModelName = "bracket" | "competitor";

export const ModelNames = {
  Bracket: "bracket" as ModelName,
  Competitor: "competitor" as ModelName
};
