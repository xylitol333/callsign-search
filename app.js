let flights = [];
let flightsLoaded = false;

const input = document.getElementById("flightInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");
const statusEl = document.getElementById("status");

function normalizeFlight(value) {
  return String(value || "").trim().toUpperCase();
}

async function loadFlights() {
  try {
    const response = await fetch("./flights.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("flights.json 불러오기 실패");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("flights.json 형식 오류");
    }

    flights = data;
    flightsLoaded = true;
    statusEl.textContent = `데이터 로드 완료 · ${flights.length}건`;
    statusEl.className = "status ok";
    button.disabled = false;
  } catch (error) {
    flightsLoaded = false;
    statusEl.textContent = "데이터를 불러오지 못했다.";
    statusEl.className = "status error";
    button.disabled = true;
    console.error(error);
  }
}

function searchFlight() {
  const keyword = normalizeFlight(input.value);

  if (!keyword) {
    result.innerHTML = '<div class="error">편명을 입력해줘.</div>';
    return;
  }

  if (!flightsLoaded) {
    result.innerHTML = '<div class="error">아직 데이터가 준비되지 않았다.</div>';
    return;
  }

  const found = flights.find((item) => normalizeFlight(item.flight) === keyword);

  if (!found) {
    result.innerHTML = '<div class="error">검색 결과가 없다.</div>';
    return;
  }

  result.innerHTML =
    '<div class="label">항공사</div>' +
    '<div class="value">' + (found.airline || "-") + '</div>' +
    '<div class="route">' + (found.from || "-") + ' → ' + (found.to || "-") + '</div>' +
    '<div class="label">편명</div>' +
    '<div class="value">' + (found.flight || "-") + '</div>';
}

button.addEventListener("click", searchFlight);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchFlight();
  }
});

button.disabled = true;
loadFlights();
