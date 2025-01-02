type Evidence = { [key: string]: number };
type Evidences = { [key: string]: Evidence };
type BeliefResult = { hypothesis: string; belief: number }[];

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
