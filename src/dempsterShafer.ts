type Evidence = { [key: string]: number };
type Evidences = { [key: string]: Evidence };
type BeliefResult = { hypothesis: string; belief: number }[];

export const evidences: Evidences = {
  G1: { A2: 0.7 },
  G2: { A2: 0.8 },
  G3: { A1: 0.6 },
  G4: { A2: 0.6 },
  G5: { A1: 0.8 },
  G6: { A3: 0.8 },
  G7: { A4: 0.8 },
  G8: { A5: 0.8 },
  G9: { A1: 0.2 },
  G10: { A2: 0.2 },
  G11: { A2: 0.2, A4: 0.2 },
  G12: { A1: 0.2, A3: 0.2 },
  G13: { A2: 0.6, A5: 0.6 },
  G14: { A1: 0.6, A4: 0.6 },
  G15: { A1: 0.6, A3: 0.6 },
  G16: { A2: 0.6, A4: 0.6 },
  G17: { A2: 0.4 },
  G18: { A1: 0.4 },
};

export function calculateBelief(
  evidences: Evidences,
  userInput: string[]
): BeliefResult {
  const combineDS = (m1: number, m2: number): number => {
    const conflict = 1 - (m1 * (1 - m2) + m2 * (1 - m1));
    if (conflict === 0) return 0;
    return (m1 * m2) / conflict;
  };

  const combinedBeliefs: { [key: string]: number } = {};

  userInput.forEach((key) => {
    const evidence = evidences[key];
    if (evidence) {
      Object.entries(evidence).forEach(([hypothesis, mass]) => {
        if (combinedBeliefs[hypothesis] !== undefined) {
          combinedBeliefs[hypothesis] = combineDS(
            combinedBeliefs[hypothesis],
            mass
          );
        } else {
          combinedBeliefs[hypothesis] = mass;
        }
      });
    }
  });

  const beliefResult: BeliefResult = Object.entries(combinedBeliefs)
    .map(([hypothesis, belief]) => ({ hypothesis, belief }))
    .sort((a, b) => b.belief - a.belief);

  return beliefResult;
}
