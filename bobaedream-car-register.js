(function () {
  const categoryStep = document.getElementById("categoryStep");
  const formStep = document.getElementById("formStep");
  const categoryRows = Array.from(document.querySelectorAll(".categoryRow"));
  const categoryLabel = document.getElementById("selectedCategoryLabel");
  const categoryChips = Array.from(document.querySelectorAll(".registerChip"));
  const backButton = document.getElementById("backToCategory");
  const agree = document.getElementById("policyAgree");
  const nextButton = document.getElementById("nextButton");
  const vehicleNumber = document.getElementById("vehicleNumber");
  const toast = document.querySelector(".toast");
  let toastTimer = 0;

  function showToast(message) {
    if (!toast || !message) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  function setActiveCategory(name) {
    categoryChips.forEach((chip) => {
      const isActive = chip.textContent.trim().replace(/\s/g, "") === name.replace(/\s/g, "");
      chip.classList.toggle("is-active", isActive);
    });
  }

  function openForm(categoryName) {
    setActiveCategory(categoryName);
    categoryStep.classList.add("is-hidden");
    formStep.classList.remove("is-hidden");
  }

  function openCategory() {
    formStep.classList.add("is-hidden");
    categoryStep.classList.remove("is-hidden");
  }

  function syncNextButton() {
    const ready = agree.checked && vehicleNumber.value.trim().length > 0;
    nextButton.disabled = !ready;
    nextButton.classList.toggle("is-ready", ready);
  }

  categoryRows.forEach((row) => {
    row.addEventListener("click", () => {
      openForm(row.dataset.category || "자동차");
    });
  });

  categoryChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      setActiveCategory(chip.textContent.trim());
    });
  });

  if (backButton) {
    backButton.addEventListener("click", openCategory);
  }
  agree.addEventListener("change", syncNextButton);
  vehicleNumber.addEventListener("input", syncNextButton);

  nextButton.addEventListener("click", () => {
    if (nextButton.disabled) {
      showToast("필수 동의 후 다음 단계로 이동할 수 있습니다.");
      return;
    }
    showToast("다음 단계는 시안에서 준비 중입니다.");
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-toast]");
    if (!target) return;
    event.preventDefault();
    showToast(target.getAttribute("data-toast"));
  });

  syncNextButton();
}());
