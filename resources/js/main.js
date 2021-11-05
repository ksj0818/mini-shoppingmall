// 자바스크립트는 어플리케이션의 비즈니스 로직을 담당
// 비즈니스 로직을 담당 하는곳은 코드가 들어있는곳
// 코드와 데이터를 섞어서 보관하는것은 좋지 않음
// 데이터는 데이터를 보관할 수 있는 특별한 장소에다가 보관하는것이 좋음 (파일, DB, back-end 서비스가 될 수도 있음)

// functions
// JSON파일에 들어있는 ITEM들을 동적으로 받아옴
function loadItems() {
  return fetch("resources/data/data.json") // fetch()는 데이터를 성공적으로 받아오면 response라는 오브젝트를 전달해줌
    .then((response) => response.json()) // 받아온 데이터가 성공적이면 json으로 변환
    .then((json) => json.items); // json안에 있는 아이템들을 리턴
}

// 주어진 항목으로 목록 업데이트
function displayItems(items) {
  // 받아온 인자를 html 요소로 변환해서 화면에 출력
  const container = document.querySelector(".items");
  // 한 가지의 배열 형태에서 다른 형태의 배열로 변환(매핑)하는것을 map을 이용하면 간단하게 할 수 있다.
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// 주어진 데이터 항목에서 html 목록 항목 만들기
function createHTMLString(item) {
  return `
  <li class="item">
    <img
      src="${item.image}"
      alt="${item.type}"
      class="item__thumnail"
    />
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

// event를 처리하는 함수는 on을 앞에 붙여주기
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  // buttons의 빈공간을 클릭했을때 아무것도 안하고 리턴
  if (key === null || value === null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value)); // 해당 하는 키와 밸류의 아이템만 출력
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  // 버튼이 들어있는 컨테이너 자체에 이벤트리스너를 등록(이것을 이벤트 위임이라고함),
  // 하나하나에 이벤트리스너를 반복해서 등록하는것보다 버튼들이 들어있는 컨테이너에 이벤트리스너를 등록해서 한 곳에서만 핸들링할 수 있도록 만드는 방법
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items)); // logo가 클릭되면 모든 아이템들이 출력
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

// main
loadItems()
  // Promise를 성공적으로 받아올 때
  .then((items) => {
    displayItems(items); // 아이템들을 html에 보여주기
    setEventListeners(items); // 버튼을 누르면 필터링을 해야하기 때문에 이벤트리스너 추가
  })
  // Promise를 받아오지 못했을 때
  .catch(console.log);
