export type TKnowledge = {
  code: string;
  diagnose: string;
  symptomps: string[];
};

const KNOWLEDGE: TKnowledge[] = [
  {
    code: "A1",
    diagnose: "Pasang Surut",
    symptomps: ["G3", "G6", "G20", "G5"],
  },
  {
    code: "A2",
    diagnose: "Pasang Tinggi",
    symptomps: ["G4", "G10", "G21", "G1", "G11", "G2"],
  },
  {
    code: "A3",
    diagnose: "Aman beraktifitas di pantai",
    symptomps: ["G20"],
  },
  {
    code: "A4",
    diagnose: "Waspada beraktifitas di Pantai",
    symptomps: ["G10", "G19", "G4", "G20"],
  },
  {
    code: "A5",
    diagnose: "Bahaya beraktifitas di Pantai",
    symptomps: ["G18"],
  },
];
