// 스와이프 스크립트 
document.addEventListener("DOMContentLoaded", () => {
  const posterInner = document.querySelector(".poster_inner");
  const prevBtn = document.querySelector(".prevBtn_box button");
  const nextBtn = document.querySelector(".nextBtn_box button");
  const firstItem = posterInner.querySelector("li");

  let slideAmount = getSlideAmount();

  // 처음엔 이전 버튼 숨김
  prevBtn.classList.add("hidden");

  // ⭐ 슬라이드 거리 계산 함수 (항상 최신 값 유지)
  function getSlideAmount() {
    const itemWidth = firstItem.offsetWidth;
    return itemWidth + 14;
  }

  // 버튼 상태 업데이트 함수
  function updateButtonVisibility() {
    const scrollLeft = posterInner.scrollLeft;
    const maxScrollLeft = posterInner.scrollWidth - posterInner.clientWidth;

    if (scrollLeft <= 0) {
      prevBtn.classList.add("hidden");
    } else {
      prevBtn.classList.remove("hidden");
    }

    if (scrollLeft >= maxScrollLeft - 1) { // 소수점 보정
      nextBtn.classList.add("hidden");
    } else {
      nextBtn.classList.remove("hidden");
    }
  }

  // 오른쪽 이동
  nextBtn.addEventListener("click", () => {
    slideAmount = getSlideAmount(); // 매번 최신 거리 계산
    posterInner.scrollBy({ left: slideAmount, behavior: "smooth" });
    setTimeout(updateButtonVisibility, 300);
  });

  // 왼쪽 이동
  prevBtn.addEventListener("click", () => {
    slideAmount = getSlideAmount();
    posterInner.scrollBy({ left: -slideAmount, behavior: "smooth" });
    setTimeout(updateButtonVisibility, 300);
  });

  // 수동 스크롤에도 버튼 상태 체크
  posterInner.addEventListener("scroll", updateButtonVisibility);

  // 반응형 대응: 화면 크기 변경 시 슬라이드 거리 업데이트
  window.addEventListener("resize", () => {
    slideAmount = getSlideAmount();
  });
});

// 로그인관련 스크립트
const id_box = document.querySelector(".box_id");
const id_label = document.querySelector(".box_id label");

const pw_box = document.querySelector(".box_pw");
const pw_label = document.querySelector(".box_pw label");

id_box.addEventListener("click", () => {
  document.querySelector(".user_id").focus();
});

id_label.addEventListener("click", () => {
  document.querySelector(".user_id").focus();
});