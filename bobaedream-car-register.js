(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const lookupStep = $("#lookupStep");
  const detailStep = $("#detailStep");
  const detailFooter = $("#detailFooter");
  const vehicleNumber = $("#vehicleNumber");
  const nextButton = $("#nextButton");
  const detailPlate = $("#detailPlate");
  const modal = $("#registerModal");
  const modalTitle = $("#registerModalTitle");
  const modalBody = $("#registerModalBody");
  const modalFooter = $("#registerModalFooter");
  const toast = $(".toast");
  const mediaGrid = $("#mediaGrid");
  const photoFileInput = $("#photoFileInput");
  const optionSummary = $("#optionSummary");
  const mileageInput = $("#mileageInput");
  const priceInput = $("#priceInput");
  const titleInput = $("#titleInput");
  const descriptionInput = $("#descriptionInput");
  const descriptionCount = $("#descriptionCount");
  const regionValue = $("#regionValue");

  let toastTimer = 0;
  let modalContext = {};

  const state = {
    colors: {
      body: "",
      seat: ""
    },
    counts: {
      seizure: "0",
      mortgage: "0"
    },
    selectedOptions: new Set([
      "선루프",
      "LED헤드램프",
      "LED리어램프",
      "알루미늄휠",
      "전동사이드미러",
      "데이라이트",
      "하이빔어시스트",
      "루프랙",
      "가죽시트",
      "전동시트(운전석)",
      "전동시트(동승석)",
      "열선시트(앞좌석)",
      "열선시트(뒷좌석)",
      "통풍시트",
      "메모리시트",
      "하이패스룸미러",
      "ECM룸미러",
      "동승석에어백",
      "측면에어백",
      "커튼에어백",
      "무릎에어백",
      "브레이크잠김방지(ABS)",
      "차체자세제어장치(ESC)",
      "후방센서",
      "전방센서",
      "후방카메라",
      "어라운드뷰",
      "타이어공기압감지(TPMS)",
      "차선이탈경보(LDWS)",
      "자동긴급제동",
      "스마트키",
      "열선핸들",
      "자동에어컨",
      "크루즈컨트롤",
      "스마트크루즈컨트롤"
    ]),
    mediaCount: 0
  };

  const colors = {
    body: [
      ["흰색", "#ffffff"],
      ["검정색", "#151515"],
      ["쥐색", "#616161"],
      ["청색", "#124280"],
      ["은색", "#e5e5e5"],
      ["은회색", "#bcbcbc"],
      ["빨간색", "#cc001e"],
      ["진주색", "#f8f8e2"],
      ["노란색", "#fff846"],
      ["갈색", "#685a35"],
      ["하늘색", "#75919c"],
      ["녹색", "#42c748"],
      ["담녹색", "#335764"],
      ["연금색", "#827b62"],
      ["명은색", "#dce4ef"],
      ["주황색", "#e37d2f"],
      ["연두색", "#9ba95d"],
      ["자주색", "#7b2a72"],
      ["은하색", "#c1cbc8"],
      ["갈대색", "#7f8175"],
      ["청옥색", "#367d78"],
      ["분홍색", "#f2a0be"],
      ["검정투톤", "linear-gradient(90deg, #111 0 50%, #efefef 50% 100%)"],
      ["보라색", "#6a1794"],
      ["흰색투톤", "linear-gradient(90deg, #fff 0 50%, #dcdcdc 50% 100%)"],
      ["은색투톤", "linear-gradient(90deg, #d8d8d8 0 50%, #9f9f9f 50% 100%)"],
      ["금색", "#857931"],
      ["진주투톤", "linear-gradient(90deg, #f8f8e2 0 50%, #d9d9c6 50% 100%)"],
      ["갈색투톤", "linear-gradient(90deg, #685a35 0 50%, #d9c7a5 50% 100%)"],
      ["금색투톤", "linear-gradient(90deg, #857931 0 50%, #efe4a4 50% 100%)"],
      ["기타", "#ffffff"]
    ],
    seat: [
      ["검정 계열", "#151515"],
      ["갈색 계열", "#dfa462"],
      ["베이지 계열", "#efcc97"],
      ["회색 계열", "#8a8a8a"],
      ["빨강 계열", "#bb2332"],
      ["파랑 계열", "#2455a6"],
      ["녹색 계열", "#1a9d4e"],
      ["흰색 계열", "#ffffff"]
    ]
  };

  const optionGroups = [
    {
      title: "외관",
      items: ["선루프", "파노라마선루프", "알루미늄휠", "전동사이드미러", "HID램프", "LED헤드램프", "어댑티드헤드램프", "LED리어램프", "데이라이트", "하이빔어시스트", "압축도어", "자동슬라이딩도어", "전동사이드스탭", "루프랙"]
    },
    {
      title: "내장",
      items: ["가죽시트", "전동시트(운전석)", "전동시트(동승석)", "열선시트(앞좌석)", "열선시트(뒷좌석)", "통풍시트", "메모리시트", "폴딩시트", "마사지시트", "워크인시트", "요추받침", "하이패스룸미러", "ECM룸미러", "뒷좌석에어벤트", "패들쉬프트", "전동햇빛가리개", "엠비언트라이트"]
    },
    {
      title: "안전",
      items: ["동승석에어백", "측면에어백", "커튼에어백", "무릎에어백", "승객감지에어백", "브레이크잠김방지(ABS)", "차체자세제어장치(ESC)", "후방센서", "전방센서", "후방카메라", "전방카메라", "어라운드뷰", "타이어공기압감지(TPMS)", "차선이탈경보(LDWS)", "자동긴급제동", "전자제어서스펜션(ECS)", "후측방경보", "미끄럼방지(TCS)"]
    },
    {
      title: "편의",
      items: ["스마트키", "열선핸들", "리모컨핸들", "자동에어컨", "좌우독립에어컨", "오토라이트", "크루즈컨트롤", "스마트크루즈컨트롤", "스탑앤고", "전동트렁크", "스마트트렁크", "전자주차브레이크(EPB)", "경사로밀림방지", "헤드업디스플레이(HUD)", "무선충전", "자동주차", "냉장고"]
    },
    {
      title: "멀티미디어",
      items: ["네비게이션(순정)", "네비게이션(비순정)", "USB", "AUX", "블루투스", "MP3", "DMB", "CD플레이어", "AV시스템", "뒷좌석TV", "텔레매틱스", "스마트폰미러링"]
    },
    {
      title: "튜닝",
      items: ["흡기", "배기", "ECU맵핑", "터보차저", "슈퍼차저", "NA튜닝", "스트럿바", "엔진스왑", "브레이크", "스포일러", "에어로파츠", "휠/타이어", "서스펜션", "오디오"]
    }
  ];

  const descriptionTemplates = [
    {
      title: "관리 내역 중심",
      body: "BMW 3시리즈 320d xDrive 차량입니다. 실내외 상태가 깔끔하고 기본 정비 내역을 확인한 차량입니다.\n\n시운전 가능하며, 구매 전 확인이 필요한 부분은 현장에서 상세히 안내드리겠습니다."
    },
    {
      title: "옵션 강조",
      body: "선루프, 후방카메라, HUD, 스마트크루즈컨트롤 등 선호 옵션을 갖춘 3시리즈 매물입니다.\n\n실사용 기준으로 관리했으며, 사진과 영상으로 차량 상태를 충분히 확인하실 수 있습니다."
    },
    {
      title: "간단 양식",
      body: "차량명:\n연식:\n주행거리:\n사고유무:\n관리내역:\n거래지역:\n기타 안내:"
    }
  ];

  function showToast(message) {
    if (!toast || !message) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  function syncNextButton() {
    const ready = vehicleNumber.value.trim().length > 0;
    nextButton.disabled = !ready;
    nextButton.classList.toggle("is-ready", ready);
    setFieldError("vehicle", ready);
  }

  function setFieldError(field, valid) {
    const target = $(`[data-validation-field="${field}"]`);
    const message = $(`[data-error-for="${field}"]`);
    if (target) target.classList.toggle("is-error", !valid);
    if (message) message.classList.toggle("is-hidden", valid);
  }

  function setModal(title, body, footer, context) {
    modalContext = context || {};
    modalTitle.textContent = title;
    modalBody.innerHTML = body || "";
    modalFooter.innerHTML = footer || "";
    modal.dataset.sheet = modalContext.type || "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalBody.innerHTML = "";
    modalFooter.innerHTML = "";
    delete modal.dataset.sheet;
    document.body.style.overflow = "";
  }

  function modalButton(label, variant, attrs) {
    const extra = attrs ? ` ${attrs}` : "";
    return `<button class="modalButton ${variant}" type="button"${extra}>${label}</button>`;
  }

  function openPolicyConfirm() {
    setModal(
      "허위매물 운영정책에 동의하시겠습니까?",
      '<p class="modalText">허위매물 운영정책에 위반될 경우 별도의 환불 없이 광고가 삭제되며 이용이 제한될 수 있습니다.</p>',
      modalButton("아니요", "is-ghost", "data-close-modal") + modalButton("동의", "is-primary", "data-policy-agree"),
      { type: "policy" }
    );
  }

  function openPolicyInfo() {
    setModal(
      "허위매물 운영정책",
      '<p class="modalText">실제 보유하지 않은 차량, 사고 이력 은폐, 가격 오표기, 연락 불가 매물은 광고 삭제 및 이용 제한 대상입니다.</p>',
      modalButton("확인", "is-primary", "data-close-modal"),
      { type: "policyInfo" }
    );
  }

  function openColorModal(kind) {
    const list = colors[kind] || colors.body;
    const title = kind === "seat" ? "시트 색상 선택" : "차량 외장 색상 선택";
    const body = `<section class="colorSheet"><h3 class="modalSectionTitle">대표 색상</h3><div class="colorGrid">${list.map(([label, hex]) => {
      const selected = state.colors[kind] === label ? " is-selected" : "";
      return `<button class="colorChip${selected}" type="button" data-color-choice="${label}" data-color-kind="${kind}">
        <span class="colorSwatch" style="background:${hex}"></span><strong>${label}</strong>
      </button>`;
    }).join("")}</div></section>`;
    setModal(title, body, "", { type: "color", kind });
  }

  function openCountModal(target) {
    const label = target === "mortgage" ? "저당" : "압류";
    const current = state.counts[target] || "0";
    const body = `<div class="countList">${Array.from({ length: 11 }, (_, index) => {
      const value = String(index);
      const selected = value === current ? " is-selected" : "";
      return `<button class="countButton${selected}" type="button" data-count-choice="${value}" data-count-target="${target}">${value}</button>`;
    }).join("")}</div>`;
    setModal(label, body, "", { type: "count", target });
  }

  function renderOptionsSheet(activeIndex, tempOptions) {
    const safeIndex = Math.max(0, Math.min(activeIndex, optionGroups.length - 1));
    const activeGroup = optionGroups[safeIndex];
    const tabs = optionGroups.map((group, index) => {
      const active = index === safeIndex ? " is-active" : "";
      return `<button class="optionTab${active}" type="button" data-option-tab="${index}">${group.title}</button>`;
    }).join("");
    const checks = activeGroup.items.map((item) => {
      const checked = tempOptions.has(item) ? " checked" : "";
      return `<label class="optionCheck"><input type="checkbox" value="${item}"${checked}><i aria-hidden="true"></i><span>${item}</span></label>`;
    }).join("");
    return `<div class="optionSheet">
      <nav class="optionTabs" aria-label="옵션 분류">${tabs}</nav>
      <section class="optionPane">
        <div class="optionPaneHeading"><h3>${activeGroup.title}</h3></div>
        <div class="optionList">${checks}</div>
      </section>
    </div>`;
  }

  function renderOptionsFooter(tempOptions) {
    return modalButton("취소", "is-ghost", "data-close-modal") + modalButton(`선택완료${tempOptions.size}`, "is-primary", "data-apply-options");
  }

  function refreshOptionsModal(activeIndex) {
    if (modalContext.type !== "options") return;
    modalContext.activeIndex = activeIndex;
    modalBody.innerHTML = renderOptionsSheet(activeIndex, modalContext.tempOptions);
    modalFooter.innerHTML = renderOptionsFooter(modalContext.tempOptions);
  }

  function openOptionsModal(activeIndex = 0) {
    const tempOptions = new Set(state.selectedOptions);
    setModal(
      "차량 옵션",
      renderOptionsSheet(activeIndex, tempOptions),
      renderOptionsFooter(tempOptions),
      { type: "options", activeIndex, tempOptions }
    );
  }

  function openRegionModal() {
    const current = regionValue.textContent.trim();
    const body = `
      <p class="modalFieldLabel">거래지역</p>
      <input class="modalInput" id="modalRegionInput" type="text" value="${current}">
      <div class="regionQuickList">
        <button type="button" data-region-pick="서울 서초구 양재대로11길 36 100호">서울 서초구 양재대로11길 36 100호</button>
        <button type="button" data-region-pick="경기 수원시 권선구 평동로79번길 45">경기 수원시 권선구 평동로79번길 45</button>
        <button type="button" data-region-pick="인천 서구 봉수대로 158">인천 서구 봉수대로 158</button>
      </div>`;
    setModal("거래지역", body, modalButton("취소", "is-ghost", "data-close-modal") + modalButton("적용", "is-primary", "data-apply-region"), { type: "region" });
  }

  function openExternalVideoModal() {
    setModal(
      "외부영상 추가",
      '<p class="modalFieldLabel">영상 URL</p><input class="modalInput" id="externalVideoInput" type="url" placeholder="YouTube 또는 Shorts URL을 입력해주세요">',
      modalButton("취소", "is-ghost", "data-close-modal") + modalButton("추가", "is-primary", "data-add-external-video"),
      { type: "externalVideo" }
    );
  }

  function openProhibitionModal() {
    setModal(
      "사진 및 영상 금지사항",
      '<p class="modalText">연락처가 직접 노출된 이미지, 다른 차량 사진, 가격 또는 프로모션 문구가 합성된 이미지는 등록할 수 없습니다.</p>',
      modalButton("확인", "is-primary", "data-close-modal"),
      { type: "prohibition" }
    );
  }

  function openDescriptionListModal() {
    const body = `<div class="templateList">${descriptionTemplates.map((template, index) => (
      `<button type="button" data-template-pick="${index}"><span>${template.title}</span><small>적용</small></button>`
    )).join("")}</div>`;
    setModal("내 설명글 불러오기", body, modalButton("닫기", "is-ghost", "data-close-modal"), { type: "descriptionList" });
  }

  function openInspectionModal() {
    const body = `
      <div class="inspectionGrid">
        <label><p class="modalFieldLabel">제시신고번호</p><input class="modalInput" type="text" placeholder="예: 2026-000000"></label>
        <label><p class="modalFieldLabel">점검일</p><input class="modalInput" type="date"></label>
        <label><p class="modalFieldLabel">주행거리</p><input class="modalInput" type="text" placeholder="km"></label>
        <label><p class="modalFieldLabel">사고유무</p><input class="modalInput" type="text" placeholder="무사고"></label>
      </div>
      <p class="inspectionNotice">성능·상태 점검기록부는 실제 등록 전 원본 문서 기준으로 확인해야 합니다.</p>`;
    setModal("성능 · 상태 점검기록부", body, modalButton("취소", "is-ghost", "data-close-modal") + modalButton("저장", "is-primary", "data-save-inspection"), { type: "inspection" });
  }

  function openServicesModal() {
    const body = `
      <div class="serviceList">
        <label class="optionCheck"><input type="checkbox"><i aria-hidden="true"></i><span>상단 노출 광고</span></label>
        <label class="optionCheck"><input type="checkbox"><i aria-hidden="true"></i><span>프리미엄 사진 편집</span></label>
        <label class="optionCheck"><input type="checkbox"><i aria-hidden="true"></i><span>영상 강조 배지</span></label>
      </div>`;
    setModal("부가서비스", body, modalButton("취소", "is-ghost", "data-close-modal") + modalButton("적용", "is-primary", "data-save-services"), { type: "services" });
  }

  function openFinalConfirmModal() {
    setModal(
      "등록 전 확인",
      '<p class="modalText">입력한 정보로 승용차 매물을 등록하는 시안입니다. 실제 등록 요청은 전송하지 않습니다.</p>',
      modalButton("취소", "is-ghost", "data-close-modal") + modalButton("시안 등록 완료", "is-primary", "data-confirm-submit"),
      { type: "finalConfirm" }
    );
  }

  function openDetailForm() {
    const plate = vehicleNumber.value.trim() || "14러0927";
    detailPlate.value = plate;
    lookupStep.classList.add("is-hidden");
    detailStep.classList.remove("is-hidden");
    detailFooter.classList.remove("is-hidden");
    document.title = "내 차 등록 - 보배드림";
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "bobaedream-car-register.html#form");
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    if (plate.replace(/\s/g, "") !== "14러0927") {
      showToast("시안 데이터로 BMW 3시리즈 기본 정보를 불러왔습니다.");
    }
  }

  function updateOptionSummary() {
    const count = state.selectedOptions.size;
    if (!count) {
      optionSummary.textContent = "선택 없음";
      return;
    }
    const first = Array.from(state.selectedOptions)[0];
    optionSummary.textContent = count === 1 ? first : `${first} 외 ${count - 1}개`;
  }

  function setColor(kind, label) {
    state.colors[kind] = label;
    const value = $(`[data-color-value="${kind}"]`);
    const field = $(`[data-color-kind="${kind}"]`);
    if (value) value.textContent = label;
    if (field) field.classList.add("is-filled");
    setFieldError(kind === "seat" ? "seatColor" : "bodyColor", Boolean(label));
  }

  function formatNumberInput(input) {
    const digits = input.value.replace(/[^\d]/g, "");
    input.value = digits ? Number(digits).toLocaleString("ko-KR") : "";
  }

  function addMedia(kind, label) {
    state.mediaCount += 1;
    const item = document.createElement("div");
    item.className = "mediaPreview";
    item.innerHTML = `<button type="button" aria-label="삭제" data-remove-media></button><span>${label || `${kind} ${state.mediaCount}`}</span>`;
    mediaGrid.insertBefore(item, mediaGrid.firstElementChild);
  }

  function validateBeforeSubmit() {
    const validations = [
      ["bodyColor", Boolean(state.colors.body)],
      ["seatColor", Boolean(state.colors.seat)],
      ["mileage", Boolean(mileageInput.value.trim())],
      ["price", Boolean(priceInput.value.trim())]
    ];
    validations.forEach(([field, valid]) => setFieldError(field, valid));
    const failed = validations.find(([, valid]) => !valid);
    if (failed) {
      const target = $(`[data-validation-field="${failed[0]}"]`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
      showToast("필수 입력값을 확인해주세요.");
      return false;
    }
    return true;
  }

  $$("[data-register-type]").forEach((chip) => {
    chip.addEventListener("click", () => {
      $$("[data-register-type]").forEach((item) => item.classList.toggle("is-active", item === chip));
      if (chip.dataset.registerType !== "자동차") {
        showToast(`${chip.dataset.registerType} 등록폼은 다음 단계에서 이어서 작업합니다.`);
      }
    });
  });

  vehicleNumber.addEventListener("input", syncNextButton);

  nextButton.addEventListener("click", () => {
    if (!vehicleNumber.value.trim()) {
      setFieldError("vehicle", false);
      showToast("차량번호를 입력해주세요.");
      return;
    }
    openPolicyConfirm();
  });

  $$("[data-choice-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest(".choicePill");
      if (!button || button.disabled) return;
      $$(".choicePill", group).forEach((item) => item.classList.toggle("is-active", item === button));
      if (button.id === "defaultTemplateButton") {
        const template = descriptionTemplates[2];
        titleInput.value = "BMW 3시리즈 320d xDrive 판매합니다";
        descriptionInput.value = template.body;
        descriptionInput.dispatchEvent(new Event("input"));
        showToast("기본양식을 불러왔습니다.");
      }
    });
  });

  mileageInput.addEventListener("input", () => {
    formatNumberInput(mileageInput);
    setFieldError("mileage", Boolean(mileageInput.value.trim()));
  });

  priceInput.addEventListener("input", () => {
    formatNumberInput(priceInput);
    setFieldError("price", Boolean(priceInput.value.trim()));
  });

  descriptionInput.addEventListener("input", () => {
    descriptionCount.textContent = String(descriptionInput.value.length);
  });

  photoFileInput.addEventListener("change", () => {
    const files = Array.from(photoFileInput.files || []);
    if (!files.length) return;
    files.slice(0, 8).forEach((file) => addMedia("사진", file.name));
    photoFileInput.value = "";
    showToast("사진을 추가했습니다.");
  });

  $("#submitButton").addEventListener("click", () => {
    if (!validateBeforeSubmit()) return;
    openFinalConfirmModal();
  });

  document.addEventListener("click", (event) => {
    const closeTarget = event.target.closest("[data-close-modal]");
    if (closeTarget) {
      event.preventDefault();
      closeModal();
      return;
    }

    const modalTarget = event.target.closest("[data-modal]");
    if (modalTarget) {
      event.preventDefault();
      const type = modalTarget.dataset.modal;
      if (type === "policyInfo") openPolicyInfo();
      if (type === "color") openColorModal(modalTarget.dataset.colorKind || "body");
      if (type === "count") openCountModal(modalTarget.dataset.countTarget || "seizure");
      if (type === "options") openOptionsModal();
      if (type === "region") openRegionModal();
      if (type === "externalVideo") openExternalVideoModal();
      if (type === "prohibition") openProhibitionModal();
      if (type === "descriptionList") openDescriptionListModal();
      if (type === "inspection") openInspectionModal();
      if (type === "services") openServicesModal();
      return;
    }

    const policyAgree = event.target.closest("[data-policy-agree]");
    if (policyAgree) {
      closeModal();
      openDetailForm();
      return;
    }

    const colorChoice = event.target.closest("[data-color-choice]");
    if (colorChoice) {
      setColor(colorChoice.dataset.colorKind || modalContext.kind || "body", colorChoice.dataset.colorChoice);
      closeModal();
      return;
    }

    const optionTab = event.target.closest("[data-option-tab]");
    if (optionTab && modalContext.type === "options") {
      refreshOptionsModal(Number(optionTab.dataset.optionTab));
      return;
    }

    const countChoice = event.target.closest("[data-count-choice]");
    if (countChoice) {
      const target = countChoice.dataset.countTarget || modalContext.target || "seizure";
      state.counts[target] = countChoice.dataset.countChoice;
      const output = $(`[data-count-value="${target}"]`);
      if (output) output.textContent = state.counts[target];
      closeModal();
      return;
    }

    const regionPick = event.target.closest("[data-region-pick]");
    if (regionPick) {
      const input = $("#modalRegionInput");
      if (input) input.value = regionPick.dataset.regionPick;
      return;
    }

    if (event.target.closest("[data-apply-region]")) {
      const input = $("#modalRegionInput");
      if (input && input.value.trim()) regionValue.textContent = input.value.trim();
      closeModal();
      showToast("거래지역을 적용했습니다.");
      return;
    }

    if (event.target.closest("[data-apply-options]")) {
      state.selectedOptions.clear();
      modalContext.tempOptions.forEach((item) => state.selectedOptions.add(item));
      updateOptionSummary();
      closeModal();
      showToast("옵션을 적용했습니다.");
      return;
    }

    const templatePick = event.target.closest("[data-template-pick]");
    if (templatePick) {
      const template = descriptionTemplates[Number(templatePick.dataset.templatePick)] || descriptionTemplates[0];
      titleInput.value = `BMW 3시리즈 320d xDrive ${template.title}`;
      descriptionInput.value = template.body;
      descriptionInput.dispatchEvent(new Event("input"));
      closeModal();
      showToast("설명글을 불러왔습니다.");
      return;
    }

    const mediaAction = event.target.closest("[data-media-action]");
    if (mediaAction) {
      if (mediaAction.dataset.mediaAction === "photo") {
        photoFileInput.click();
      } else {
        addMedia("영상", "영상 1");
        showToast("영상 슬롯을 추가했습니다.");
      }
      return;
    }

    if (event.target.closest("[data-add-external-video]")) {
      const input = $("#externalVideoInput");
      addMedia("외부영상", input && input.value.trim() ? "외부영상" : "외부영상 1");
      closeModal();
      showToast("외부영상을 추가했습니다.");
      return;
    }

    const removeMedia = event.target.closest("[data-remove-media]");
    if (removeMedia) {
      removeMedia.closest(".mediaPreview").remove();
      showToast("미디어를 삭제했습니다.");
      return;
    }

    if (event.target.closest("[data-save-inspection]")) {
      closeModal();
      showToast("성능·상태 점검기록부 내용을 저장했습니다.");
      return;
    }

    if (event.target.closest("[data-save-services]")) {
      closeModal();
      showToast("부가서비스를 적용했습니다.");
      return;
    }

    if (event.target.closest("[data-confirm-submit]")) {
      closeModal();
      showToast("승용차 매물 등록 시안이 완료되었습니다.");
      return;
    }

    const toastTarget = event.target.closest("[data-toast]");
    if (toastTarget) {
      event.preventDefault();
      showToast(toastTarget.getAttribute("data-toast"));
    }
  });

  modalBody.addEventListener("change", (event) => {
    const optionInput = event.target.closest(".optionCheck input");
    if (!optionInput || modalContext.type !== "options") return;
    if (optionInput.checked) {
      modalContext.tempOptions.add(optionInput.value);
    } else {
      modalContext.tempOptions.delete(optionInput.value);
    }
    modalFooter.innerHTML = renderOptionsFooter(modalContext.tempOptions);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (!vehicleNumber.value) {
    vehicleNumber.value = "14러0927";
  }
  syncNextButton();
  updateOptionSummary();

  if (window.location.hash === "#form") {
    openDetailForm();
  }
}());
