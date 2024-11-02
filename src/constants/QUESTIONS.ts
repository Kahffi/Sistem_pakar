type TQuestion = [string, string];
export const QUESTIONS: TQuestion[] = [
  ["S0", "Fase bulan saat ini"],
  // ["G1", "Bulan Baru"],
  // ["G2", "Bulan Purnama"],
  // ["G3", "Bulan Perbani"],
  // ["G4", "Bulan Cembung"],
  // ["G5", "Bulan Sabit"],
  ["G6", "Arah angin ditunjukkan oleh arah hanyut asap"],
  ["G7", "Angin terasa pada muka, daun-daun menggerisik"],
  [
    "G8",
    "Daun dan ranting kecil tetap bergerak, angin membentangkan bendera ringan",
  ],
  ["G9", "Debu dan kertas naik ke atas, cabang kecil bergerak"],
  [
    "G10",
    "Pohon kecil mulai bergoyang, timbul bentuk gelombang kecil pada perairan pendalaman",
  ],
  [
    "G11",
    "Cabang besar bergerak, kawat telpon kendengaran berdesing, sulit memakai payung",
  ],

  ["S1", "Kepiting berada di pesisir pantai"],
  // ["G13", "Kepiting tidak berada di pesisir pantai"],
  ["S2", "Kepiting menggores pasir"],
  // ["G15", "Kepiting tidak menggores pasir"],
  ["S3", "Burung bertengger"],
  // ["G17", "Burung Tidak bertengger"],
  // ["G18", "Curah Hujan Tinggi"],
  // ["G19", "Curah Hujan Rendah"],
  // ["G20", "Cuaca Cerah"],
  // ["G21", "Cuaca Berangin"],
];

type TSpecialQuestionMapValue = {
  code: string;
  statement: string;
};

export const SPECIALQUESTION = new Map<string, TSpecialQuestionMapValue[]>();
SPECIALQUESTION.set("S0", [
  { code: "G1", statement: "Bulan baru" },
  { code: "G2", statement: "Bulan purnama" },
  { code: "G3", statement: "Bulan perbani" },
  { code: "G4", statement: "Bulan cembung" },
  { code: "G5", statement: "Bulan sabit" },
]);
SPECIALQUESTION.set("S1", [
  { code: "G12", statement: "Iya" },
  { code: "G13", statement: "Tidak" },
]);
SPECIALQUESTION.set("S2", [
  { code: "G14", statement: "Iya" },
  { code: "G15", statement: "Tidak" },
]);
SPECIALQUESTION.set("S3", [
  { code: "G16", statement: "Iya" },
  { code: "G17", statement: "Tidak" },
]);
