AOS.init();

//정렬 플러그인 기능 스타트
//정렬해줄 태그들을 감싸는 부모명
let elem = document.querySelector("#cont4 .portfolio .boxes");
let iso = new Isotope(elem, {
  // options
  itemSelector: ".all",
  layoutMode: "masonry", //세로정렬(빈공간 알아서 정렬 배치)
  //fitRows <-- 가로정렬
  transitionDuration: "0.5s",
});

//클릭시 정렬
const btns = document.querySelectorAll(".btns li");
btns.forEach((item, index) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    //버튼활성 비활성화
    //li태그에 data-portolio 속성값을 가지고 와서 해당 클래스이름에 div태그들만 정렬
    let data = item.getAttribute("data-portfolio");
    iso.arrange({
      filter: data,
      transitionDuration: "0.5s",
    });
  });
});

//카운트에 필요한 데이터값 객체로 정리
let countValue = [
  {
    plus: 1,
    tag: ".count1",
    complete: 1200,
    speed: 5,
  },
  {
    plus: 1,
    tag: ".count2",
    complete: 120,
    speed: 50,
  },
  {
    plus: 1,
    tag: ".count3",
    complete: 5,
    speed: 1000,
  },
  {
    plus: 1,
    tag: ".count4",
    complete: 20,
    speed: 250,
  },
];

//countUp 기능 구간

//전역변수 세팅
let cont5 = document.querySelector("#cont5");
let moveCheck = true; //카운트 업 함수 자동실행이 끝난다음에 false값으로 변경해줄 변수

window.addEventListener("scroll", () => {
  let cont5Start = cont5.offsetTop; //스크롤할때마다 cont5의 offsetTop 받아오기 (창크기 변경시에도 적용)
  let scTop = window.scrollY;

  if (scTop >= cont5Start) {
    if (moveCheck == true) {
      //moveCheck를 패스할 경우에만
      moveCheck = false; //moveCheck를 false로 설정해 한번만 동작하게끔
      countValue.forEach((item, index) => {
        //countValue 객체의 값들을 countUp함수로 전달
        countUp(item.plus, item.tag, item.complete, item.speed);
      });
    }
  }
});

function countUp(inc, sel, des, speed) {
  //한번에 늘어나는 값, 변경해줄태그, 목표치, 속도값
  let num = 0;
  let numChange = "";
  let desChange = "";
  let autoCount = setInterval(() => {
    num += inc;

    if (num >= des) {
      clearInterval(autoCount); // 값이 목표치에 도달시 중지시키기
      desChange = des.toLocaleString("ko-kr");
      document.querySelector(sel).innerHTML = desChange; //증가가 끝나면 강제로 목표수치로
    } else {
      numChange = num.toLocaleString("ko-kr");
      document.querySelector(sel).innerHTML = numChange; //그렇지 않은경우에는 계속 숫자를 올려줌
    }
  }, speed);
}

// 슬라이더 기능 구간

const sliderWrap = document.querySelector("#cont6 .slider");
const circleBtn = document.querySelectorAll(".circleBtn > li");
const slideView = document.querySelectorAll(".slider > div");

let sNumber = 0;
for (let j = 0; j < circleBtn.length; j++) {
  circleBtn[j].addEventListener("click", function (event) {
    event.preventDefault();
    sNumber = j; //클릭한 동그라미 버튼 순번값을 슬라이드 순번값으로 넣어줌
    slideStart(); //슬라이드 화면 동작함수 호출
  });
}
function slideStart() {
  for (let i = 0; i < circleBtn.length; i++) {
    circleBtn[i].classList.remove("on");
    slideView[i].style.opacity = 0;
    slideView[i].style.zIndex = 2;
  }
  circleBtn[sNumber].classList.add("on");
  slideView[sNumber].style.opacity = 1;
  slideView[sNumber].style.zIndex = 3;
}

//슬라이드 자동실행 구간
let autoSlide = setInterval(function () {
  nextCheck(); //다음화면 조건문체크
  slideStart(); //슬라이드 화면 전환되고 동그라미버튼 활성비활성
}, 3000);

//슬라이더에 마우스를 올렸을 때 자동실행을 멈춘다.
sliderWrap.addEventListener("mouseenter", function () {
  //autoSlide변수에 있는 자동실행함수를 제거시킴
  clearInterval(autoSlide);
});

//슬라이더에 마우스를 내렸을 때 자동실행을 다시 동작하게 처리
sliderWrap.addEventListener("mouseleave", function () {
  //autoSlide변수에 자동실행함수를 다시 새롭게 대입해서 채워줌
  autoSlide = setInterval(function () {
    nextCheck();
    slideStart();
  }, 3000);
});

//이전버튼 슬라이드 조건문 함수구간
function prevCheck() {
  if (sNumber == 0) {
    sNumber = slideView.length - 1;
  } else {
    sNumber--;
  }
}

//이후버튼 슬라이드 조건문 함수구간
function nextCheck() {
  if (sNumber == slideView.length - 1) {
    sNumber = 0;
  } else {
    sNumber++;
  }
}

//햄버거메뉴 및 메뉴 스위치 기능 구간
let hamburgerMenu = document.querySelector("#header .hamburger");
let activeMenu = document.querySelector("#cont1 .activemenu");

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("is-active");
  switchMenu();
});

function switchMenu() {
  if (hamburgerMenu.classList.contains("is-active")) {
    activeMenu.style.top = "0%";
  } else {
    activeMenu.style.top = "-100%";
  }
}
