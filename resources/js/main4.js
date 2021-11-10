function loadMain() {
  return fetch("/resources/data/data3.json") // json데이터를 동적으로 가져오기
    .then((response) => response.json()) // 데이터를 성공적으로 받아오면 response객체를 받음 (json으로 변환)
    .then((json) => json.items); // 아이템들을 리턴
}

// 주어진 항목 업데이트
function displayList(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLTag(item)).join("");
}

// 주어진 항목 출력
function createHTMLTag(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item-img" />
      <span class="item-text">${item.gender}, ${item.size}</span>
    </li>
  `;
}

// 버튼 클릭시 이벤트 처리함수
function setChooseItems(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");

  logo.addEventListener("click", () => displayList(items)); // logo 클릭 시 모든 아이템 출력
  buttons.addEventListener("click", (event) => onButtonClick(event, items)); // 버튼 클릭 시 필터링 해주는 함수
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key === null || value === null) {
    return;
  }
  displayList(items.filter((item) => item[key] === value)); // 아이템의 인덱스(type 또는 color)가 타겟의 밸류와 같은것만 출력
}

// main
loadMain()
  .then((items) => {
    displayList(items); // 받아온 데이터 출력하는 함수
    setChooseItems(items); // 버튼 클릭 시 필터링 해주는 함수
  })
  .catch(console.log);
