// JSON 데이터 가져오기
function loadItem() {
  return fetch("/resources/data/data3.json")
    .then((response) => response.json()) // fetch()로 받아온 response객체를 json()를 이용하여 js객체 생성
    .then((json) => json.items);
}

// 주어진 항목으로 목록 업데이트
function displayItems(items) {
  const item = document.querySelector(".items"); // ul태그
  item.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// item 리스트 출력
function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item-img" />
    <span class="item-text">${item.gender}, ${item.size}</span>
  </li>
  `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  console.log(`key: ${key} / value: ${value}`);

  if (key === null || value === null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items)); // logo가 클릭되면 모든 아이템 출력
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

// main
loadItem()
  // 데이터를 받아올 때
  .then((items) => {
    displayItems(items); // 받아온 데이터를 화면에 출력해주는 함수호출
    setEventListeners(items); // 버튼 클릭 시 필터링 이벤트
  })
  // 데이터를 받아오지 못할 때
  .catch(console.log);
