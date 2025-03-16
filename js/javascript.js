document.addEventListener("DOMContentLoaded", () => {
  const posterInner = document.querySelector(".poster_inner");
  const prevBtn = document.querySelector(".prevBtn_box button");
  const nextBtn = document.querySelector(".nextBtn_box button");

  const slideAmount = 464;

  // 처음에 이전 버튼 숨김
  prevBtn.classList.add("hidden");

  // 버튼 상태 업데이트 함수
  function updateButtonVisibility() {
    const scrollLeft = posterInner.scrollLeft;
    const maxScrollLeft = posterInner.scrollWidth - posterInner.clientWidth;

    if (scrollLeft <= 0) {
      prevBtn.classList.add("hidden"); // 처음이면 이전 버튼 숨김
    } else {
      prevBtn.classList.remove("hidden");
    }

    if (scrollLeft >= maxScrollLeft) {
      nextBtn.classList.add("hidden"); // 끝이면 다음 버튼 숨김
    } else {
      nextBtn.classList.remove("hidden");
    }
  }

  // 오른쪽 이동
  nextBtn.addEventListener("click", () => {
    posterInner.scrollBy({ left: slideAmount, behavior: "smooth" });
    setTimeout(updateButtonVisibility, 300); // 스크롤 후 상태 업데이트
  });

  // 왼쪽 이동
  prevBtn.addEventListener("click", () => {
    posterInner.scrollBy({ left: -slideAmount, behavior: "smooth" });
    setTimeout(updateButtonVisibility, 300);
  });

  // 스크롤 수동 이동에도 버튼 상태 업데이트
  posterInner.addEventListener("scroll", updateButtonVisibility);
});