const input = document.getElementById("flightInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");

function searchFlight() {
  const keyword = input.value.trim().toUpperCase();

  if (!keyword) {
    result.innerHTML = '<div class="error">편명을 입력해줘.</div>';
    return;
  }

  const found = flights.find(item => item.flight.toUpperCase() === keyword);

  if (!found) {
    result.innerHTML = '<div class="error">검색 결과가 없다.</div>';
    return;
  }

  result.innerHTML = `
    <div class="label">항공사</div>
    <div class="value">${found.airline}</div>

    <div class="route">${found.from} → ${found.to}</div>

    <div class="label">편명</div>
    <div class="value">${found.flight}</div>
  `;
}

button.addEventListener("click", searchFlight);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchFlight();
  }
});
