import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  function startQuiz() {
    navigate("/quiz/S0");
  }

  return (
    <div>
      <nav
        className="flex items-center px-5 pt-8 text-cyan-900 bg-top"
        style={{ backgroundImage: "url(header-bg.png)" }}
      >
        <h2 className="text-2xl font-bold flex-1">Sistem Pakar</h2>
        <ul className="flex gap-8 items-center">
          <li>
            <button type="button">
              <a href="#home">Home</a>
            </button>
          </li>
          <li>
            <button type="button">
              <a href="#alur-diagnosa">Alur Diagnosa</a>
            </button>
          </li>
          <li>
            <button type="button" onClick={startQuiz}>
              Tanya Pakar
            </button>
          </li>
        </ul>
      </nav>
      {/* <img
          src="/public/header-bg.png"
          className="absolute top-0 -z-10 lg:-mt-12"
          alt=""
        /> */}
      <div
        id="home"
        className="flex items-center sm:h-dvh bg-cover bg-left sm:bg-center bg-no-repeat min-h-80"
        style={{ backgroundImage: "url(header-bg.png)" }}
      >
        <div className="flex flex-col w-[400px] sm:w-[600px] pl-3 sm:pl-10 sm:-mt-28 ">
          <h1 className="text-4xl font-extrabold text-blue-900 leading-snug">
            <span className="text-orange-500">Prediksi </span>Pasang Surut Air
            Laut dan Keamanan Pantai
          </h1>
          <p className="w-4/5">
            Website ini membantu anda memprediksi pasang surut air laut dengan
            akurat, mempermudah perencanaan wisata pantai dan antisipasi banjir
            pesisir.
          </p>
          <button
            onClick={startQuiz}
            type="button"
            className="p-3 mt-4 w-40 bg-orange-500 text-white font-semibold rounded-full"
          >
            Tanya Pakar
          </button>
        </div>
      </div>
      {/* Alur Diagnosa */}
      <div id="alur-diagnosa" className="flex flex-col items-center mt-14">
        <div className="flex flex-col items-center text-center  max-w-[400px] w-5/6 sm:max-w-[700px] gap-3 *:leading-relaxed">
          <h2 className="text-xl font-extrabold text-blue-900 ">
            Ketahui Kondisi Pasang Surut Air Laut dan Temukan Solusi yang Tepat
            untuk Menghadapinya!
          </h2>
          <p className="w-5/6">
            Ikuti panduan di bawah ini untuk memudahkan Anda dalam mendiagnosis
            dan memprediksi kondisi pasang surut air laut dengan tepat.
          </p>
        </div>
        {/* layout */}
        <div className="flex items-center justify-center flex-wrap gap-9 mt-16">
          {/* card container */}
          <div className="relative flex flex-col h-64 w-72 gap-5 justify-center items-center shadow-xl text-center rounded-lg px-4">
            {/* circle */}
            <div className="absolute -top-[2rem] flex items-center justify-center text-white aspect-square w-14 bg-blue-700 rounded-full text-xl font-extrabold shadow-md">
              1
            </div>
            <h3 className="text-2xl font-bold text-blue-900">
              Klik Tanya Pakar
            </h3>
            <p className="w-5/6 text-gray-500 text-sm h-20">
              Silahkan klik tombol tanya pakar sebagai langkah awal dalam proses
            </p>
          </div>
          {/* card container */}
          <div className="relative flex flex-col h-64 w-72 gap-5 justify-center items-center shadow-xl text-center rounded-lg px-4">
            {/* circle */}
            <div className="absolute -top-[2rem] flex items-center justify-center text-white aspect-square w-14 bg-orange-500 rounded-full text-xl font-extrabold shadow-md">
              2
            </div>
            <h3 className="text-2xl font-bold text-blue-900">
              Klik Tanya Pakar
            </h3>
            <p className="w-5/6 text-gray-500 text-sm h-20">
              Dalam tahap ini pengguna akan diberikan beberapa pertanyaan
              terkait dengan kondisi yang ada di sekitar pantai
            </p>
          </div>
          {/* card container */}
          <div className="relative flex flex-col h-64 w-72 gap-5 justify-center items-center shadow-xl text-center rounded-lg px-4">
            {/* circle */}
            <div className="absolute -top-[2rem] flex items-center justify-center text-white aspect-square w-14 bg-blue-400 rounded-full text-xl font-extrabold shadow-md">
              3
            </div>
            <h3 className="text-2xl font-bold text-blue-900">
              Hasil Prediksi & Solusi
            </h3>
            <p className="w-5/6 text-gray-500 text-sm h-20">
              Hasil dari prediksi pasang surut air laut akan muncul dan
              memberikan solusi terbaik
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
