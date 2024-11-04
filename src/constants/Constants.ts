type TQuestion = [string, string, TCategory];
export const QUESTIONS: TQuestion[] = [
  ["S0", "Fase bulan saat ini", "fase bulan"],
  // ["G1", "Bulan Baru"],
  // ["G2", "Bulan Purnama"],
  // ["G3", "Bulan Perbani"],
  // ["G4", "Bulan Cembung"],
  // ["G5", "Bulan Sabit"],
  ["G6", "Arah angin ditunjukkan oleh arah hanyut asap", "angin"],
  ["G7", "Angin terasa pada muka, daun-daun menggerisik", "angin"],
  [
    "G8",
    "Daun dan ranting kecil tetap bergerak, angin membentangkan bendera ringan",
    "angin",
  ],
  ["G9", "Debu dan kertas naik ke atas, cabang kecil bergerak", "angin"],
  [
    "G10",
    "Pohon kecil mulai bergoyang, timbul bentuk gelombang kecil pada perairan pendalaman",
    "angin",
  ],
  [
    "G11",
    "Cabang besar bergerak, kawat telpon kendengaran berdesing, sulit memakai payung",
    "angin",
  ],

  ["S1", "Kepiting berada di pesisir pantai", "perilaku hewan"],
  // ["G13", "Kepiting tidak berada di pesisir pantai"],
  ["S2", "Kepiting menggores pasir", "perilaku hewan"],
  // ["G15", "Kepiting tidak menggores pasir"],
  ["S3", "Burung bertengger", "perilaku hewan"],
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

type TCategory = "fase bulan" | "perilaku hewan" | "angin";

export const CATEGORY: Map<TCategory, string> = new Map([
  ["fase bulan", "Fase Bulan"],
  ["perilaku hewan", "Perilaku Hewan"],
  ["angin", "Kondisi Angin"],
]);

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
