window.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("flightInput");
  const button = document.getElementById("searchBtn");
  const result = document.getElementById("result");

  function searchFlight() {
    const keyword = (input.value || "").trim().toUpperCase();

    if (!keyword) {
      result.innerHTML = '<div class="error">편명을 입력해줘.</div>';
      return;
    }

    if (!window.flights || !Array.isArray(window.flights)) {
      result.innerHTML = '<div class="error">flights.js 데이터를 읽지 못했다.</div>';
      return;
    }

    const found = window.flights.find(function (item) {
      return String(item.flight || "").toUpperCase() === keyword;
    });

    if (!found) {
      result.innerHTML = '<div class="error">검색 결과가 없다.</div>';
      return;
    }

    result.innerHTML =
      '<div class="label">항공사</div>' +
      '<div class="value">' + found.airline + '</div>' +
      '<div class="route">' + found.from + ' → ' + found.to + '</div>' +
      '<div class="label">편명</div>' +
      '<div class="value">' + found.flight + '</div>';
  }

  button.addEventListener("click", searchFlight);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      searchFlight();
    }
  });
});
