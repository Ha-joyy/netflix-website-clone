// -----------------------
// ---  스와이프 스크립트 ----
// -----------------------

document.addEventListener("DOMContentLoaded", () => {
  const posterInner = document.querySelector(".poster_inner");
  const prevBtn = document.querySelector(".prevBtn_box button");
  const nextBtn = document.querySelector(".nextBtn_box button");
  const firstItem = posterInner.querySelector("li");

  const slideAmount = getSlideAmount();

  // 처음엔 이전 버튼 숨김
  prevBtn.classList.add("hidden");

  // 슬라이드 거리 계산 함수 (항상 최신 값 유지)
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


// -----------------------
// ---  로그인관련 스크립트 ---
// -----------------------

const box_id = document.querySelector(".box_id");
const userIdInput = document.querySelector(".user_id");
const id_label = box_id.querySelector("label");
const idErrorText = document.querySelector(".box_id + .error_txt")

const box_pw = document.querySelector(".box_pw");
const userPwInput = document.querySelector(".user_pw");
const pw_label = box_pw.querySelector("label");
const pwErrorText = document.querySelector(".box_pw + .error_txt")

// 아이디입력 영역 스크립트
document.querySelectorAll(".id_label, .box_id").forEach((el) => {
  el.addEventListener("click", () => {
    userIdInput.focus();
  });
});

function handleFocusBlur1(e) {
  if (e.type === "focus") {
    // 포커스 받으면 항상 active 추가
    id_label.classList.add("active");
  } else if (e.type === "blur") {
    // 에러 조건 처리
    if (userIdInput.value.trim() === "" || userIdInput.value.length <= 4) {
      idErrorText.style.display = "block";  // 에러 문구 보이기
      userIdInput.classList.add("error_input");
    } else {
      idErrorText.style.display = "none";   // 에러 문구 숨기기
      userIdInput.classList.remove("error_input");
    }
    // input에 1글자라도 있으면 active 유지, 없으면 제거
    if (userIdInput.value.trim().length >= 1) {
      id_label.classList.add("active");
    } else {
      id_label.classList.remove("active");
    }
  }
}

userIdInput.addEventListener("focus", handleFocusBlur1);
userIdInput.addEventListener("blur", handleFocusBlur1);



// 패스워드입력 영역 스크립트
document.querySelectorAll(".pw_label, .box_pw").forEach((el) => {
  el.addEventListener("click", () => {
    userPwInput.focus();
  });
});

function handleFocusBlur2(e) {
  if (e.type === "focus") {
    pw_label.classList.add("active");
  } else if (e.type === "blur") {
    if (userPwInput.value.trim() === "" || userPwInput.value.length <= 4) {
      pwErrorText.style.display = "block";  // 에러 문구 보이기
      userPwInput.classList.add("error_input");
    } else {
      pwErrorText.style.display = "none";   // 에러 문구 숨기기
      userPwInput.classList.remove("error_input");
    }
    // input에 1글자라도 있으면 active 유지, 없으면 제거
    if (userPwInput.value.trim().length >= 1) {
      pw_label.classList.add("active");
    } else {
      pw_label.classList.remove("active");
    }
  }
}

userPwInput.addEventListener("focus", handleFocusBlur2);
userPwInput.addEventListener("blur", handleFocusBlur2);


const pwShowHideEl = document.querySelector(".psw_show_hide");

const pwShowHideBtn = () => {
  if (userPwInput.value.trim().length >= 1) {
    pwShowHideEl.style.display = "block";
  } else {
    pwShowHideEl.style.display = "none";
  }
}
userPwInput.addEventListener("input", pwShowHideBtn);

// 비밀번호 show, hide
pwShowHideEl.addEventListener("click", () => {
  if (userPwInput.type !== "text") {
    userPwInput.type = "text";
    pwShowHideEl.querySelector("span").textContent = "비밀번호 숨기기";
    pwShowHideEl.style.backgroundImage = "url('./images/eye-off-outline.svg')";
  } else {
    userPwInput.type = "password";
    pwShowHideEl.querySelector("span").textContent = "비밀번호 보기";
    pwShowHideEl.style.backgroundImage = "url('./images/eye-outline.svg')";

  }
});

// 코드 사용하기, 비밀번호 사용하기 버튼 클릭 이벤트
const codeChangeBtn = document.querySelector(".code_change_btn");
const pwChangeBtn = document.querySelector(".pw_change_btn");

function blockChange() {
  codeChangeBtn.addEventListener("click", () => {
    document.querySelector(".code_login_wrap").style.display = "block";
    document.querySelector(".id_login_wrap").style.display = "none";
    console.log(1);
  });
  pwChangeBtn.addEventListener("click", () => {
    document.querySelector(".id_login_wrap").style.display = "block";
    document.querySelector(".code_login_wrap").style.display = "none";
    console.log(2);
  });
}
blockChange();

// 한글입력 방지
// function blockKorean(userIdInput) {
//   userIdInput.value = userIdInput.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
// }