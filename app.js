const airlines = [
  { airline: "Korean Air", iata: "KE", icao: "KAL", callsign: "KOREAN AIR" },
  { airline: "Asiana Airlines", iata: "OZ", icao: "AAR", callsign: "ASIANA" },
  { airline: "Jeju Air", iata: "7C", icao: "JJA", callsign: "JEJU AIR" },
  { airline: "Jin Air", iata: "LJ", icao: "JNA", callsign: "JIN AIR" },
  { airline: "T'way Air", iata: "TW", icao: "TWB", callsign: "TWAY AIR" },
  { airline: "Air Busan", iata: "BX", icao: "ABL", callsign: "AIR BUSAN" },
  { airline: "Air Seoul", iata: "RS", icao: "ASV", callsign: "AIR SEOUL" },
  { airline: "Delta Air Lines", iata: "DL", icao: "DAL", callsign: "DELTA" },
  { airline: "American Airlines", iata: "AA", icao: "AAL", callsign: "AMERICAN" },
  { airline: "United Airlines", iata: "UA", icao: "UAL", callsign: "UNITED" },
  { airline: "Singapore Airlines", iata: "SQ", icao: "SIA", callsign: "SINGAPORE" },
  { airline: "Qatar Airways", iata: "QR", icao: "QTR", callsign: "QATARI" },
  { airline: "Emirates", iata: "EK", icao: "UAE", callsign: "EMIRATES" },
  { airline: "Cathay Pacific", iata: "CX", icao: "CPA", callsign: "CATHAY" }
];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultList = document.getElementById("resultList");
const resultCount = document.getElementById("resultCount");

function renderResults(items) {
  if (!items.length) {
    resultCount.textContent = "검색 결과 0건";
    resultList.innerHTML = `<div class="empty">검색 결과가 없습니다.</div>`;
    return;
  }

  resultCount.textContent = `검색 결과 ${items.length}건`;

  resultList.innerHTML = items.map(item => `
    <div class="card">
      <h2>${item.airline}</h2>
      <p><span class="label">IATA</span>${item.iata}</p>
      <p><span class="label">ICAO</span>${item.icao}</p>
      <p><span class="label">Callsign</span>${item.callsign}</p>
    </div>
  `).join("");
}

function doSearch() {
  const keyword = searchInput.value.trim().toLowerCase();

  if (!keyword) {
    renderResults(airlines);
    return;
  }

  const filtered = airlines.filter(item =>
    item.airline.toLowerCase().includes(keyword) ||
    item.iata.toLowerCase().includes(keyword) ||
    item.icao.toLowerCase().includes(keyword) ||
    item.callsign.toLowerCase().includes(keyword)
  );

  renderResults(filtered);
}

searchBtn.addEventListener("click", doSearch);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    doSearch();
  }
});

renderResults(airlines);
