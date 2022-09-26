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
