export type TQuestion = [string, string, TCategory];
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
  ["S4", "Kemana arah arus air?", "angin"],
  // ["G17", "Burung Tidak bertengger"],
  // ["G18", "Curah Hujan Tinggi"],
  // ["G19", "Curah Hujan Rendah"],
  // ["G20", "Cuaca Cerah"],
  // ["G21", "Cuaca Berangin"],
];

export type TSpecialQuestionMapValue = {
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
SPECIALQUESTION.set("S4", [
  { code: "G22", statement: "Mendekati pesisir" },
  { code: "G23", statement: "Menjauhi pesisir" },
]);

// export const PREDICTION_RESULT = new Map([
//   ["A1", "Air Laut Surut"],
//   ["A2", "Air Laut Pasang"],
//   ["A3", "Aman Beraktivitas di Pantai"],
//   ["A4", "Waspada Beraktivitas di Pantai"],
//   ["A5", "Berbahaya Beraktivitas di Pantai"],
// ]);

export type TPredictionResult = {
  name: string;
  description: string;
  advice: string[];
};

export const PREDICTION_RESULT = new Map<string, TPredictionResult>([
  [
    "A1",
    {
      name: "Air Surut",
      description:
        "Air laut sedang dalam kondisi surut, memberikan kesempatan bagi pengunjung untuk beraktivitas di tepi pantai dengan risiko gelombang yang lebih rendah.",
      advice: [
        "Air mungkin tidak surut terlalu jauh, jadi tetap nikmati aktivitas di tepi pantai, tetapi hindari bermain terlalu dekat dengan air. Perubahan ombak bisa saja tiba-tiba terjadi.",
        "Air kemungkinan akan sedikit surut. Anda bisa bermain di area yang aman, tetapi tetap waspadai ombak yang mungkin mendadak naik.",
        "Kondisi cukup ideal untuk menikmati pantai dengan nyaman. Jelajahi pasir pantai yang terbuka lebih luas, tetapi pastikan tetap berhati-hati, terutama bila ada anak-anak.",
        "Kondisi air pasti surut. Ini adalah saat yang tepat untuk menikmati pantai dengan tenang dan bermain di pasir atau berjalan kaki menyusuri bibir pantai sangat aman. Meski begitu, tetap pantau keadaan sekitar.",
      ],
    },
  ],
  [
    "A2",
    {
      name: "Air Pasang",
      description:
        "Air laut dalam kondisi pasang, menyebabkan area pantai lebih terendam air dan bisa meningkatkan risiko terseret arus jika terlalu dekat.",
      advice: [
        "Kecil kemungkinan air pasang. Aktivitas di pantai aman, namun tetap perhatikan garis air jika angin atau ombak mendadak meningkat.",
        "Air pasang mungkin terjadi. Hindari berenang jauh dari tepi pantai dan amankan barang-barang Anda dari kemungkinan ombak yang mencapai lebih tinggi.",
        "Air pasang berpotensi terjadi, sehingga disarankan untuk menjauh dari garis air. Batasi aktivitas yang terlalu dekat dengan laut untuk mencegah risiko terseret ombak.",
        "Air pasang akan terjadi, dan aktivitas di area pantai yang dekat dengan laut sangat tidak disarankan. Nikmati pantai dari kejauhan atau tunggu kondisi lebih tenang sebelum kembali beraktivitas.",
      ],
    },
  ],
  [
    "A3",
    {
      name: "Aman Beraktivitas di Pantai",
      description:
        "Kondisi pantai umumnya aman untuk berbagai aktivitas, termasuk berenang, bermain pasir, dan piknik.",
      advice: [
        "Kecil kemungkinan kondisi sepenuhnya aman, jadi perhatikan perubahan cuaca dan arus air yang bisa mendadak berubah.",
        "Kondisi cukup aman, namun tetap waspadai angin dan arus. Aktivitas ringan dapat dilakukan, tetapi jangan terlalu jauh dari pantai.",
        "Pantai cukup aman, cocok untuk aktivitas seperti berjalan di tepi air dan bermain di pasir. Pastikan tetap memperhatikan kondisi sekitar.",
        "Pantai sepenuhnya aman. Anda dapat menikmati berbagai aktivitas di tepi pantai dengan aman, namun tetap perhatikan kondisi air.",
      ],
    },
  ],
  [
    "A4",
    {
      name: "Waspada Beraktivitas di Pantai",
      description:
        "Kondisi pantai memerlukan kewaspadaan ekstra, seperti potensi angin kencang atau gelombang yang lebih tinggi dari biasanya.",
      advice: [
        "Kemungkinan kecil terjadi risiko, tetapi jangan lengah. Perhatikan tanda-tanda seperti angin yang berubah tiba-tiba atau ombak yang mendadak lebih tinggi.",
        "Aktivitas ringan tetap bisa dilakukan, tetapi batasi jarak dengan garis air. Pastikan barang-barang tidak terlalu dekat dengan ombak, dan tetap awasi kondisi sekitar.",
        "Kewaspadaan lebih tinggi diperlukan. Hindari berenang atau berada terlalu dekat dengan air, dan pastikan Anda dan keluarga aman dari risiko arus besar atau angin kencang.",
        "Risiko pasti terjadi. Sebaiknya tunda aktivitas di pantai dan berlindung di area yang aman hingga kondisi pantai lebih stabil.",
      ],
    },
  ],
  [
    "A5",
    {
      name: "Bahaya Beraktivitas di Pantai",
      description:
        "Kondisi pantai sangat berbahaya, dengan risiko besar yang dapat mengancam keselamatan, seperti angin kencang, arus kuat, atau gelombang besar.",
      advice: [
        "Risiko kecil, tetapi tetap waspadai perubahan cuaca. Jika ada tanda-tanda gelombang besar atau angin kencang, segera jaga jarak dari pantai.",
        "Potensi bahaya mulai terlihat. Aktivitas di area pantai harus dibatasi, dan pastikan Anda berada di tempat yang aman. Jangan biarkan barang-barang atau anak-anak terlalu dekat dengan laut.",
        "Risiko sangat nyata. Segera hindari area pantai dan amankan barang-barang ke tempat yang lebih aman. Batalkan aktivitas di pantai hingga cuaca membaik.",
        "Bahaya besar akan terjadi. Evakuasi dari pantai adalah langkah terbaik. Jangan ambil risiko dengan berada di dekat laut. Utamakan keselamatan diri dan orang di sekitar Anda.",
      ],
    },
  ],
]);

new Map<string, object>();

export const evidences = {
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
  G11: { A4: 0.2 },
  G12: { A2: 0.2 },
  G13: { A3: 0.2 },
  G14: { A1: 0.2 },
  G15: { A2: 0.6 },
  G16: { A5: 0.8 },
  G17: { A1: 0.6 },
  G18: { A4: 0.8 },
  G19: { A1: 0.6 },
  G20: { A3: 0.8 },
  G21: { A2: 0.6 },
  G22: { A4: 0.8 },
  G23: { A2: 0.4 },
  G24: { A1: 0.4 },
};

export const codesAndLabels = {
  A: [
    { code: "A1", label: "Air Surut" },
    { code: "A2", label: "Air Pasang" },
    { code: "A3", label: "Aman Beraktivitas" },
    { code: "A4", label: "Waspada Beraktivitas" },
    { code: "A5", label: "Hindari Aktivitas" },
  ],

  G: [
    { code: "G1", label: "Bulan Baru" },
    { code: "G2", label: "Bulan Purnama" },
    { code: "G3", label: "Bulan Perbani" },
    { code: "G4", label: "Bulan Cembung" },
    { code: "G5", label: "Bulan Sabit" },
    { code: "G6", label: "Arah angin ditunjukkan oleh arah hanyut asap" },
    { code: "G7", label: "Angin terasa pada muka, daun-daun menggerisik" },
    {
      code: "G8",
      label:
        "Daun dan ranting kecil tetap bergerak, angin membentangkan bendera ringan",
    },
    {
      code: "G9",
      label: "Debu dan kertas naik ke atas, cabang kecil bergerak",
    },
    {
      code: "G10",
      label:
        "Pohon kecil mulai bergoyang, timbul bentuk gelombang kecil pada perairan pendalaman",
    },
    {
      code: "G11",
      label:
        "Cabang besar bergerak, kawat telpon kendengaran berdesing, sulit memakai payung",
    },
    { code: "G12", label: "Kepiting berada di pesisir pantai" },
    { code: "G13", label: "Kepiting tidak berada di pesisir pantai" },
    { code: "G14", label: "Kepiting menggores pasir" },
    { code: "G15", label: "Kepiting tidak menggores pasir" },
    { code: "G16", label: "Burung bertengger" },
    { code: "G17", label: "Burung tidak bertengger" },
    { code: "G18", label: "Curah hujan tinggi" },
    { code: "G19", label: "Curah hujan rendah" },
    { code: "G20", label: "Cuaca Cerah" },
    { code: "G21", label: "Cuaca Berangin" },
    { code: "G22", label: "Arah Arus Air Mendekati Pesisir" },
    { code: "G23", label: "Arah Arus Air Menjauhi pesisir" },
  ],
};
