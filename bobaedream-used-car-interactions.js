(function () {
  const data = window.BOBAE_USED_CAR || {};
  const cars = data.cars || [];
  const dealers = data.dealers || {};
  const categories = data.categories || [];
  const params = new URLSearchParams(window.location.search);

  const moneyToNumber = (value) => Number(String(value || "0").replace(/[^\d]/g, ""));
  const sortOptions = [
    ["updated", "업데이트순"],
    ["posted", "등록순"],
    ["price-low", "가격 낮은순"],
    ["price-high", "가격 높은순"],
    ["year-new", "연식 최신순"],
    ["mileage-low", "주행거리 짧은순"],
    ["power-high", "최고출력순"],
    ["fuel-economy", "연비순"],
    ["declared", "제시신고순"],
    ["near", "가까운순"]
  ];
  const regionOptions = [
    ["전국", data.totalCount],
    ["서울", "5,364"],
    ["부산", "113"],
    ["대구", "109"],
    ["인천", "341"],
    ["광주", "76"],
    ["대전", "128"],
    ["울산", "41"],
    ["경기", "3,298"],
    ["강원", "92"],
    ["충북", "163"],
    ["충남", "222"],
    ["전북", "148"],
    ["전남", "96"],
    ["경북", "205"],
    ["경남", "188"],
    ["제주", "24"]
  ];
  const genericSheetConfigs = {
    category: {
      title: "카테고리",
      options: () => [
        ["전체중고차", "all", data.totalCount],
        ...categories.map((category) => [category.label, category.key, category.key === "used" ? data.totalCount : "1,000+"])
      ]
    },
    body: {
      title: "바디타입",
      options: [["세단", "sedan", "8,124"], ["SUV", "suv", "3,208"], ["쿠페", "coupe", "721"], ["왜건", "wagon", "144"], ["밴", "van", "305"], ["컨버터블", "convertible", "76"]]
    },
    class: {
      title: "차급",
      options: [["경차", "mini", "612"], ["소형", "small", "1,104"], ["준중형", "compact", "2,280"], ["중형", "middle", "3,116"], ["대형", "large", "2,044"], ["스포츠카", "sports", "183"]]
    },
    year: {
      title: "연식",
      options: [["전체", "", data.totalCount], ["2026년식 이상", "2026", "412"], ["2025년식 이상", "2025", "1,204"], ["2023년식 이상", "2023", "4,902"], ["2020년식 이상", "2020", "8,214"], ["2017년식 이상", "2017", "11,536"]]
    },
    mileage: {
      title: "주행거리",
      options: [["전체", "", data.totalCount], ["1만km 이하", "10000", "728"], ["3만km 이하", "30000", "2,905"], ["5만km 이하", "50000", "5,486"], ["10만km 이하", "100000", "10,122"], ["20만km 이하", "200000", "13,774"]]
    },
    price: {
      title: "가격",
      options: [["전체", "", data.totalCount], ["3천만원 이하", "0-3000", "4,218"], ["5천만원 이하", "0-5000", "8,120"], ["7천만원 이하", "0-7000", "10,966"], ["1억원 이하", "0-10000", "12,304"], ["1억원 이상", "10000-", "2,592"]]
    },
    complex: {
      title: "매매단지",
      options: [["전체", "", data.totalCount], ["오토갤러리", "오토갤러리", "4,602"], ["국민차매매단지", "국민차매매단지", "1,018"], ["수원 도이치오토월드", "수원 도이치오토월드", "1,264"], ["개인직거래", "개인직거래", "322"]]
    },
    seller: {
      title: "판매자 구분",
      options: [["전체", "all", data.totalCount], ["개인", "private", "1,042"], ["딜러", "dealer", "13,854"]]
    },
    fuel: {
      title: "연료",
      options: [["전체", "", data.totalCount], ["가솔린", "가솔린", "8,202"], ["디젤", "디젤", "3,118"], ["하이브리드", "하이브리드", "1,020"], ["전기", "전기", "642"], ["LPG", "LPG", "394"]]
    },
    option: {
      title: "옵션",
      options: [["선루프", "선루프", "4,320"], ["어라운드뷰", "어라운드뷰", "6,148"], ["헤드업 디스플레이", "헤드업 디스플레이", "2,190"], ["통풍시트", "통풍시트", "7,440"], ["전동트렁크", "전동트렁크", "5,328"], ["후석 모니터", "후석 모니터", "836"]]
    },
    feature: {
      title: "차량 특징",
      options: [["인증중고차", "인증중고차", "2,804"], ["1년보증", "1년보증", "1,408"], ["무사고", "무사고", "9,201"], ["리스승계", "리스승계", "664"], ["튜닝", "튜닝", "190"], ["희소 컬러", "희소 컬러", "88"]]
    },
    plate: {
      title: "차량번호 / 판매자",
      options: [["전체", "", data.totalCount], ["차량번호 공개", "number", "12,438"], ["성능점검 공개", "history", "10,004"], ["전화 상담 가능", "phone", "13,012"], ["영상 상담 가능", "video", "1,826"]]
    }
  };

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function showToast(message) {
    let toast = qs(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  function getDealer(car) {
    return dealers[car.dealer] || dealers.main || {};
  }

  function makeMeta(car) {
    return [car.year, car.mileage, car.fuel, car.transmission].filter(Boolean).join(" · ");
  }

  function thumbMarkup(car, large = false) {
    const imageList = (car.images || []).filter(Boolean);
    const listImage = imageList[0] || car.thumbnail;
    if (listImage && !large) {
      return `<img src="${listImage}" alt="${car.title} 썸네일">`;
    }
    if (large && imageList.length) {
      return `<img src="${imageList[0]}" alt="${car.title} 대표 이미지">`;
    }
    return `
      <div class="${large ? "galleryPlaceholder" : "thumbPlaceholder"}">
        <div class="${large ? "galleryPlaceholderInner" : ""}">
          <div class="carShape"><span class="wheel left"></span><span class="wheel right"></span></div>
          <div class="${large ? "" : "thumbPlaceholderText"}">사진 준비 중</div>
        </div>
      </div>
    `;
  }

  function thumbOverlayMarkup(car) {
    const imageList = (car.images || []).filter(Boolean);
    const photoCount = Number.isFinite(car.photoCount) ? car.photoCount : imageList.length || (car.thumbnail ? 1 : 0);
    if (!photoCount && !car.video) return "";
    return `
      <span class="thumbMedia" aria-label="사진 ${photoCount}장${car.video ? ", 영상 포함" : ""}">
        ${photoCount ? `<span class="thumbPhotoCount">${photoCount}</span><span class="photoMark" aria-hidden="true"></span>` : ""}
        ${car.video ? `<span class="videoMark" aria-hidden="true"></span>` : ""}
      </span>
    `;
  }

  function renderHeaderActive() {
    qsa(".bbNavLink").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === "home");
    });
  }

  function setupGenericActions() {
    qsa("[data-toast]").forEach((el) => {
      if (el.dataset.actionBound === "true") return;
      el.dataset.actionBound = "true";
      el.addEventListener("click", (event) => {
        event.preventDefault();
        showToast(el.dataset.toast);
      });
    });

    qsa("[data-toggle-heart]").forEach((el) => {
      if (el.dataset.heartBound === "true") return;
      el.dataset.heartBound = "true";
      el.addEventListener("click", (event) => {
        event.preventDefault();
        el.classList.toggle("is-active");
        showToast(el.classList.contains("is-active") ? "찜한 매물에 추가했습니다." : "찜한 매물에서 해제했습니다.");
      });
    });
  }

  function renderFilterLists() {
    const domestic = qs("#domesticFilter");
    const imported = qs("#importedFilter");
    if (domestic) {
      domestic.innerHTML = (data.filters?.domestic || []).map(([label, count]) => `
        <label class="filterOption">
          <input type="checkbox" value="${label}" data-brand-filter>
          <span>${label}</span>
          <span class="count">${count}</span>
        </label>
      `).join("");
    }
    if (imported) {
      imported.innerHTML = (data.filters?.imported || []).map(([label, count]) => `
        <label class="filterOption${count === "0" ? " is-disabled" : ""}">
          <input type="checkbox" value="${label}" data-brand-filter ${count === "0" ? "disabled" : ""}>
          <span>${label}</span>
          <span class="count">${count}</span>
        </label>
      `).join("");
    }
  }

  function renderCategoryButtons(activeCategory) {
    const root = qs("#categoryGrid");
    if (!root) return;
    root.innerHTML = categories.map((category) => `
      <button class="categoryBtn${category.key === activeCategory ? " is-active" : ""}" type="button" data-category="${category.key}">
        <span class="categoryIcon">${category.asset ? `<img src="${category.asset}" alt="">` : ""}</span>
        <span>${category.label}</span>
      </button>
    `).join("");
  }

  function normalizeKoreanNumber(value) {
    const text = String(value || "");
    const number = Number(text.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(number)) return 0;
    if (text.includes("만")) return number * 10000;
    if (text.includes("천")) return number * 1000;
    return number;
  }

  function carYear(car) {
    const full = String(car.yearFull || "");
    const fullMatch = full.match(/\d{4}/);
    if (fullMatch) return Number(fullMatch[0]);
    const shortMatch = String(car.year || "").match(/(\d{2})년/);
    if (!shortMatch) return 0;
    return Number(shortMatch[1]) + 2000;
  }

  function carPower(car) {
    return Number(String(car.power || "").replace(/[^\d]/g, "")) || 0;
  }

  function filterCars(state) {
    let visible = cars.filter((car) => {
      const categoryMatch = state.category === "all" || state.category === car.category;
      const sellerMatch = state.seller === "all" || state.seller === car.sellerType;
      const brandMatch = !state.brand || car.brand === state.brand;
      const videoMatch = !state.video || car.video;
      const regionMatch = !state.region || state.region === "전국" || String(car.location || "").startsWith(state.region);
      const fuelMatch = !state.fuel || car.fuel === state.fuel;
      const yearMatch = !state.yearMin || carYear(car) >= state.yearMin;
      const price = moneyToNumber(car.price);
      const priceMatch = (!state.priceMin || price >= state.priceMin) && (!state.priceMax || price <= state.priceMax);
      const mileageMatch = !state.mileageMax || normalizeKoreanNumber(car.mileageFull || car.mileage) <= state.mileageMax;
      const complexMatch = !state.complex || car.complex === state.complex;
      const optionMatch = !state.option || (car.options || []).includes(state.option) || (car.badges || []).includes(state.option);
      const featureMatch = !state.feature || (car.badges || []).includes(state.feature);
      const plateMatch = !state.plate || (state.plate === "video" ? car.video : true);
      return categoryMatch && sellerMatch && brandMatch && videoMatch && regionMatch && fuelMatch && yearMatch && priceMatch && mileageMatch && complexMatch && optionMatch && featureMatch && plateMatch;
    });

    if (state.sort === "price-high") visible = [...visible].sort((a, b) => moneyToNumber(b.price) - moneyToNumber(a.price));
    if (state.sort === "price-low") visible = [...visible].sort((a, b) => moneyToNumber(a.price) - moneyToNumber(b.price));
    if (state.sort === "year-new") visible = [...visible].sort((a, b) => carYear(b) - carYear(a));
    if (state.sort === "mileage-low") visible = [...visible].sort((a, b) => normalizeKoreanNumber(a.mileageFull || a.mileage) - normalizeKoreanNumber(b.mileageFull || b.mileage));
    if (state.sort === "power-high") visible = [...visible].sort((a, b) => carPower(b) - carPower(a));
    return visible;
  }

  function getCountText(state, visible) {
    const isBaseView = state.category === "all" && state.seller === "all" && !state.brand && !state.video && (!state.region || state.region === "전국") && !state.fuel && !state.yearMin && !state.priceMin && !state.priceMax && !state.mileageMax && !state.complex && !state.option && !state.feature && !state.plate;
    return isBaseView ? `${data.totalCount}대` : `${visible.length ? visible.length.toLocaleString("ko-KR") : "0"}대`;
  }

  function sortLabel(state) {
    return (sortOptions.find(([key]) => key === state.sort) || sortOptions[0])[1];
  }

  function updateControlState(state, visible) {
    const countText = getCountText(state, visible);
    const count = qs("#visibleCount");
    if (count) count.textContent = countText;

    qsa(".mobilePrimaryButton span").forEach((el) => {
      el.textContent = `${countText} 보기`;
    });

    const brandLabel = state.brand || "제조사";
    const brandChip = qs("#brandChip");
    const mobileMakerLabel = qs("#mobileMakerLabel");
    if (brandChip) brandChip.textContent = brandLabel;
    if (mobileMakerLabel) mobileMakerLabel.textContent = brandLabel;

    const sortText = sortLabel(state);
    if (qs("#sortLabel")) qs("#sortLabel").textContent = sortText;
    if (qs("#mobileSortLabel")) qs("#mobileSortLabel").textContent = sortText;

    if (qs("#mobileRegionLabel")) qs("#mobileRegionLabel").textContent = state.region || "전국";

    qsa("[data-brand-filter]").forEach((box) => {
      box.checked = Boolean(state.brand) && box.value === state.brand;
    });
    qsa(".sellerTab").forEach((tab) => tab.classList.toggle("is-active", (tab.dataset.seller || "all") === state.seller));
    qsa(".mobileSellerTab").forEach((tab) => tab.classList.toggle("is-active", (tab.dataset.mobileSeller || "all") === state.seller));
    qsa(".categoryBtn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.category === (state.category === "all" ? "used" : state.category)));
    qsa(".mobileCategoryBtn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.category === (state.category === "all" ? "used" : state.category)));
    qs("#videoSwitch")?.classList.toggle("is-on", state.video);
    qs("#mobileVideoSwitch")?.classList.toggle("is-on", state.video);

    updateMobileChipLabels(state);
  }

  function renderMobileCategoryButtons(activeCategory) {
    const root = qs("#mobileCategoryRail");
    if (!root) return;
    root.innerHTML = categories.map((category) => `
      <button class="mobileCategoryBtn${category.key === activeCategory ? " is-active" : ""}" type="button" data-category="${category.key}">
        <span>${category.asset ? `<img src="${category.asset}" alt="">` : ""}</span>
        <strong>${category.label}</strong>
      </button>
    `).join("");
  }

  function renderMobileRows(visible) {
    const root = qs("#mobileCarRows");
    if (!root) return;

    if (!visible.length) {
      root.innerHTML = `
        <div class="mobileEmptyState">
          <strong>조건에 맞는 매물이 없습니다.</strong>
          <span>필터를 초기화하거나 다른 조건을 선택하세요.</span>
        </div>
      `;
      setupGenericActions();
      return;
    }

    root.innerHTML = visible.map((car) => {
      const dealer = getDealer(car);
      const detailUrl = `bobaedream-used-car-detail.html?id=${encodeURIComponent(car.id)}`;
      return `
        <article class="mobileCarRow" data-car-id="${car.id}">
          <a class="mobileThumb" href="${detailUrl}" aria-label="${car.title} 상세 보기">
            ${thumbMarkup(car)}
            <span class="thumbTime">${car.posted}</span>
            ${thumbOverlayMarkup(car)}
          </a>
          <div class="mobileRowBody">
            <a class="mobileRowTitle" href="${detailUrl}">${car.title}</a>
            <div class="mobileRowMeta">${makeMeta(car)}</div>
            <div class="mobileRowPrice">${car.price}</div>
            <div class="mobileRowBadges">${car.badges.map((badge) => `<span class="badge">${badge}</span>`).join("")}</div>
            <div class="mobileLocation">${car.location} · ${car.complex}</div>
            <div class="mobileDealer"><img src="${dealer.avatar}" alt="">${dealer.name} ${dealer.type}</div>
            <div class="mobileViews">조회 ${car.views}</div>
            <button class="mobileRowHeart" type="button" data-toggle-heart aria-label="찜"><span class="heartIcon"></span></button>
          </div>
        </article>
      `;
    }).join("");

    setupGenericActions();
  }

  function renderRows(state) {
    const root = qs("#carRows");
    const visible = filterCars(state);
    updateControlState(state, visible);
    renderMobileRows(visible);
    if (!root) return;

    if (!visible.length) {
      root.innerHTML = `<div class="carRow"><div></div><div class="rowBody"><strong class="rowTitle">조건에 맞는 매물이 없습니다.</strong><div class="rowMeta">필터를 초기화하거나 다른 조건을 선택하세요.</div></div></div>`;
      setupGenericActions();
      return;
    }

    root.innerHTML = visible.map((car) => {
      const dealer = getDealer(car);
      const detailUrl = `bobaedream-used-car-detail.html?id=${encodeURIComponent(car.id)}`;
      return `
        <article class="carRow" data-car-id="${car.id}">
          <a class="thumbLink" href="${detailUrl}" aria-label="${car.title} 상세 보기">
            ${thumbMarkup(car)}
            <span class="thumbTime">${car.posted}</span>
            ${thumbOverlayMarkup(car)}
          </a>
          <div class="rowBody">
            <a class="rowTitle" href="${detailUrl}">${car.title}</a>
            <div class="rowMeta">${makeMeta(car)}</div>
            <div class="rowPrice">${car.price}</div>
            <div class="badgeRow">${car.badges.map((badge) => `<span class="badge">${badge}</span>`).join("")}</div>
            <div class="locationLine"><span class="pinIcon"></span><span>${car.location} · ${car.complex}</span></div>
            <div class="viewLine"><span class="viewTriangle"></span><span>${car.views}</span></div>
            <div class="dealerLine">
              <span class="dealerMini"><img src="${dealer.avatar}" alt=""></span>
              <span>${dealer.name} ${dealer.type}</span>
              <span class="muted">· 판매중 ${dealer.selling.replace(/[^0-9]/g, "")}대</span>
            </div>
          </div>
          <div class="rowActions">
            <button class="roundIconBtn" type="button" data-toast="매물 문의 화면은 시안에서 준비 중입니다." aria-label="문의">
              <span class="commentIcon"></span>
            </button>
            <button class="roundIconBtn" type="button" data-toggle-heart aria-label="찜">
              <span class="heartIcon"></span>
            </button>
          </div>
        </article>
      `;
    }).join("");

    setupGenericActions();
  }

  function resetState(state) {
    state.category = "all";
    state.seller = "all";
    state.brand = "";
    state.region = "전국";
    state.video = false;
    state.sort = "updated";
    state.fuel = "";
    state.yearMin = null;
    state.priceMin = null;
    state.priceMax = null;
    state.mileageMax = null;
    state.complex = "";
    state.option = "";
    state.feature = "";
    state.plate = "";
    state.generic = {};
  }

  function selectedGenericLabel(state, type) {
    const config = genericSheetConfigs[type];
    if (!Object.prototype.hasOwnProperty.call(state.generic || {}, type)) return "";
    const value = state.generic[type];
    if (!value || value === "all") return "";
    if (!config) return "";
    const option = getGenericOptions(config).find(([, optionValue]) => String(optionValue) === String(value));
    return option ? option[0] : "";
  }

  function updateMobileChipLabels(state) {
    ["year", "price", "fuel", "seller"].forEach((type) => {
      const chip = qs(`.mobileChip[data-open-sheet="${type}"]`);
      if (!chip) return;
      const label = selectedGenericLabel(state, type) || ({ year: "연식", price: "가격", fuel: "연료", seller: "판매자" }[type]);
      chip.textContent = label;
    });
  }

  function renderMobileMakerList(state) {
    const root = qs("#mobileMakerList");
    if (!root) return;
    const groups = [
      ["국산", data.filters?.domestic || []],
      ["수입", data.filters?.imported || []]
    ];
    root.innerHTML = groups.map(([title, items]) => `
      <div class="makerGroupTitle">${title}</div>
      ${items.map(([label, count]) => `
        <button class="makerOption${state.brand === label ? " is-selected" : ""}" type="button" data-mobile-brand="${label}" ${count === "0" ? "disabled" : ""}>
          <span class="makerLogoMark">${label.slice(0, 1)}</span>
          <span>${label}</span>
          <span class="mobileOptionCount">${count}</span>
        </button>
      `).join("")}
    `).join("");
  }

  function renderMobileRegionGrid(state) {
    const root = qs("#mobileRegionGrid");
    if (!root) return;
    root.innerHTML = regionOptions.map(([label, count]) => `
      <button class="mobileOptionButton${(state.region || "전국") === label ? " is-selected" : ""}" type="button" data-mobile-region="${label}">
        <span>${label}</span>
        <span class="mobileOptionCount">${count}</span>
      </button>
    `).join("");
  }

  function renderMobileSortList(state) {
    const root = qs("#mobileSortList");
    if (!root) return;
    root.innerHTML = sortOptions.map(([key, label]) => `
      <button class="${state.sort === key ? "is-active" : ""}" type="button" data-mobile-sort="${key}">${label}</button>
    `).join("");
  }

  function applyGenericSelection(state, type, value) {
    state.generic[type] = value;
    if (type === "category") state.category = value || "all";
    if (type === "seller") state.seller = value || "all";
    if (type === "fuel") state.fuel = value || "";
    if (type === "year") state.yearMin = value ? Number(value) : null;
    if (type === "mileage") state.mileageMax = value ? Number(value) : null;
    if (type === "price") {
      const [min, max] = String(value || "").split("-");
      state.priceMin = min ? Number(min) : null;
      state.priceMax = max ? Number(max) : null;
    }
    if (type === "complex") state.complex = value || "";
    if (type === "option") state.option = value || "";
    if (type === "feature") state.feature = value || "";
    if (type === "plate") state.plate = value || "";
  }

  function getGenericOptions(config) {
    return typeof config.options === "function" ? config.options() : config.options;
  }

  function renderGenericSheet(type, state) {
    const config = genericSheetConfigs[type] || genericSheetConfigs.category;
    const title = qs("#genericSheetTitle");
    const root = qs("#genericSheetOptions");
    if (!root) return;
    if (title) title.textContent = config.title;
    root.dataset.genericType = type;
    const selected = String(state.generic?.[type] || "");
    root.innerHTML = getGenericOptions(config).map(([label, value, count]) => `
      <button class="mobileOptionButton${selected === String(value) ? " is-selected" : ""}" type="button" data-generic-value="${value}">
        <span>${label}</span>
        <span class="mobileOptionCount">${count || ""}</span>
      </button>
    `).join("");
  }

  function setupMobileList(state) {
    const layer = qs("#mobileSheetLayer");
    if (!qs("[data-mobile-list]") || !layer) return;

    renderMobileCategoryButtons(state.category === "all" ? "used" : state.category);
    renderMobileMakerList(state);
    renderMobileRegionGrid(state);
    renderMobileSortList(state);

    const openSheet = (type) => {
      qsa(".mobileSheet", layer).forEach((sheet) => sheet.classList.toggle("is-active", sheet.dataset.sheet === type));
      layer.classList.add("is-open");
      layer.setAttribute("aria-hidden", "false");
      document.body.classList.add("sheet-open");
    };

    const closeSheet = () => {
      layer.classList.remove("is-open");
      layer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("sheet-open");
      qsa(".mobileSheet", layer).forEach((sheet) => sheet.classList.remove("is-active"));
    };

    qsa("[data-open-sheet]").forEach((button) => {
      button.addEventListener("click", () => {
        const type = button.dataset.openSheet;
        if (["filter", "maker", "region", "sort", "view"].includes(type)) {
          if (type === "maker") renderMobileMakerList(state);
          if (type === "region") renderMobileRegionGrid(state);
          if (type === "sort") renderMobileSortList(state);
          openSheet(type);
          return;
        }
        renderGenericSheet(type, state);
        openSheet("generic");
      });
    });

    qsa("[data-close-sheet]", layer).forEach((button) => button.addEventListener("click", closeSheet));
    qsa("[data-apply-sheet]", layer).forEach((button) => button.addEventListener("click", closeSheet));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && layer.classList.contains("is-open")) closeSheet();
    });

    qs("#mobileMakerList")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-mobile-brand]");
      if (!button || button.disabled) return;
      state.brand = state.brand === button.dataset.mobileBrand ? "" : button.dataset.mobileBrand;
      renderRows(state);
      renderMobileMakerList(state);
      showToast(state.brand ? `${state.brand} 매물만 보여드립니다.` : "전체 제조사로 돌아왔습니다.");
    });

    qs("#mobileRegionGrid")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-mobile-region]");
      if (!button) return;
      state.region = button.dataset.mobileRegion || "전국";
      renderRows(state);
      renderMobileRegionGrid(state);
    });

    qs("#mobileSortList")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-mobile-sort]");
      if (!button) return;
      state.sort = button.dataset.mobileSort || "updated";
      renderRows(state);
      renderMobileSortList(state);
      closeSheet();
    });

    qs("#genericSheetOptions")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-generic-value]");
      if (!button) return;
      const type = event.currentTarget.dataset.genericType;
      applyGenericSelection(state, type, button.dataset.genericValue || "");
      renderRows(state);
      renderGenericSheet(type, state);
    });

    qsa("[data-mobile-seller]").forEach((tab) => {
      tab.addEventListener("click", () => {
        state.seller = tab.dataset.mobileSeller || "all";
        state.generic.seller = state.seller;
        renderRows(state);
      });
    });

    qs("#mobileVideoSwitch")?.addEventListener("click", () => {
      state.video = !state.video;
      renderRows(state);
      showToast(state.video ? "영상 매물만 보여드립니다." : "전체 매물로 돌아왔습니다.");
    });

    qs("#mobileCategoryRail")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      state.category = button.dataset.category || "all";
      state.generic.category = state.category;
      renderRows(state);
      showToast(`${button.textContent.trim()} 매물로 이동했습니다.`);
    });

    qsa("[data-mobile-reset]").forEach((button) => {
      button.addEventListener("click", () => {
        resetState(state);
        renderRows(state);
        renderMobileMakerList(state);
        renderMobileRegionGrid(state);
        renderMobileSortList(state);
        showToast("검색 조건을 초기화했습니다.");
      });
    });
  }

  function setupListPage() {
    const root = qs("[data-used-car-list]");
    if (!root) return;

    const state = {
      category: params.get("category") || "all",
      seller: params.get("seller") || "all",
      brand: "",
      region: "전국",
      video: false,
      sort: "updated",
      fuel: "",
      yearMin: null,
      priceMin: null,
      priceMax: null,
      mileageMax: null,
      complex: "",
      option: "",
      feature: "",
      plate: "",
      generic: {}
    };

    renderFilterLists();
    renderCategoryButtons(state.category === "all" ? "used" : state.category);
    setupMobileList(state);
    renderRows(state);

    qsa(".filterToggle").forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".filterItem")?.classList.toggle("is-open");
      });
    });

    qsa(".sellerTab").forEach((tab) => {
      tab.addEventListener("click", () => {
        qsa(".sellerTab").forEach((item) => item.classList.remove("is-active"));
        tab.classList.add("is-active");
        state.seller = tab.dataset.seller || "all";
        renderRows(state);
      });
    });

    qs("#categoryGrid")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      qsa(".categoryBtn").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      state.category = button.dataset.category || "all";
      renderRows(state);
      showToast(`${button.textContent.trim()} 매물로 이동했습니다.`);
    });

    qsa("[data-brand-filter]").forEach((box) => {
      box.addEventListener("change", () => {
        qsa("[data-brand-filter]").forEach((other) => {
          if (other !== box) other.checked = false;
        });
        state.brand = box.checked ? box.value : "";
        renderRows(state);
      });
    });

    qs("#videoSwitch")?.addEventListener("click", (event) => {
      event.preventDefault();
      state.video = !state.video;
      renderRows(state);
      showToast(state.video ? "영상 매물만 보여드립니다." : "전체 매물로 돌아왔습니다.");
    });

    qs("#sortButton")?.addEventListener("click", () => {
      const next = state.sort === "updated" ? "price-high" : state.sort === "price-high" ? "price-low" : "updated";
      state.sort = next;
      renderRows(state);
    });

    qs("#resetFilters")?.addEventListener("click", () => {
      resetState(state);
      renderRows(state);
      renderMobileMakerList(state);
      renderMobileRegionGrid(state);
      renderMobileSortList(state);
      showToast("검색 조건을 초기화했습니다.");
    });

    setupGenericActions();
  }

  function valueList(car) {
    return [
      ["연식", car.yearFull],
      ["주행거리", car.mileageFull],
      ["연료", car.fuel],
      ["차량번호", car.number],
      ["변속기", car.transmission],
      ["배기량", car.displacement],
      ["색상", car.color],
      ["지역", car.location],
      ["사고이력", car.accident]
    ];
  }

  function specGridMarkup(items) {
    return items.map(([label, value]) => `
      <div class="specItem">
        <div class="specLabel">${label}</div>
        <div class="specValue${label === "차종" || label === "인승" ? " is-link" : ""}">${value}</div>
      </div>
    `).join("");
  }

  function setupDetailPage() {
    const root = qs("[data-used-car-detail]");
    if (!root) return;
    const id = params.get("id");
    const car = cars.find((item) => item.id === id) || cars[0];
    const dealer = getDealer(car);
    const sideCost = Math.round(moneyToNumber(car.price) * 0.067);
    const totalCost = moneyToNumber(car.price) + sideCost + 44;
    document.title = `${car.title} | 보배드림 중고차 PC 상세`;

    const imageList = car.images && car.images.length ? car.images : [];
    const requestedGalleryCount = Number(car.photoCount) || imageList.length;
    const galleryCount = Math.max(imageList.length, Math.min(requestedGalleryCount, 18));
    const galleryImages = imageList.length
      ? Array.from({ length: galleryCount }, (_, index) => imageList[index % imageList.length])
      : [];
    const galleryImageMarkup = (src, index) => src
      ? `<img src="${src}" alt="${car.title} 대표 이미지"><span class="galleryCounter" data-gallery-counter>${index + 1} / ${galleryImages.length}</span>`
      : thumbMarkup(car, true);

    qs("#detailGallery").innerHTML = `
      <div class="galleryStage">${galleryImageMarkup(galleryImages[0], 0)}</div>
      <div class="galleryControl">
        <button class="circleTool" type="button" data-toast="공유 링크가 복사되었습니다." aria-label="공유"><span class="shareIcon"></span></button>
        <button class="circleTool" type="button" data-toast="더보기 메뉴는 시안에서 준비 중입니다." aria-label="더보기"><span class="moreIcon"></span></button>
      </div>
      ${galleryImages.length ? `
        <div class="thumbStrip" data-thumb-strip>
          <button class="thumbArrow prev is-disabled" type="button" data-thumb-prev aria-label="이전 사진 목록"></button>
          <div class="thumbViewport">
            <div class="thumbTrack">
              ${galleryImages.map((src, index) => `<button class="detailThumb${index === 0 ? " is-active" : ""}" type="button" data-gallery-src="${src}" data-gallery-index="${index}"><img src="${src}" alt="" draggable="false"></button>`).join("")}
            </div>
          </div>
          <button class="thumbArrow next" type="button" data-thumb-next aria-label="다음 사진 목록"></button>
        </div>
      ` : ""}
    `;

    qs("#detailTitle").textContent = car.title;
    const detailSubcopy = qs("#detailSubcopy");
    if (detailSubcopy) detailSubcopy.textContent = car.intro;
    qs("#detailMeta").textContent = `${car.yearFull} · ${car.mileageFull} · ${car.fuel} · ${car.transmission} · ${car.accident === "없음" ? "무사고" : "사고이력"}`;
    qs("#detailBadges").innerHTML = car.badges.map((badge) => `<span class="badge">${badge}</span>`).join("");
    qs("#detailStats").innerHTML = `<span>추천 ${car.likes}</span><span>조회 ${car.views}</span>`;
    qs("#basicSpecs").innerHTML = specGridMarkup(valueList(car));
    qs("#detailSpecs").innerHTML = specGridMarkup(Object.entries(car.detailSpecs));

    const allOptions = ["선루프", "LED 헤드램프", "어댑티브 크루즈 컨트롤", "후방카메라", "어라운드뷰", "스마트키", "순정 내비게이션", "열선시트", "통풍시트", "헤드업 디스플레이", "전동트렁크", "전방충돌방지"];
    qs("#optionGrid").innerHTML = allOptions.map((option, index) => `
      <div class="optionItem${car.options.includes(option) ? " is-on" : ""}">
        <span class="optionGlyph">${String(index + 1).padStart(2, "0")}</span>
        <span>${option}</span>
      </div>
    `).join("");
    qs("#selectedOptions").textContent = car.options.join(" · ");

    qs("#historySummary").innerHTML = `
      <div>내 차 피해<strong>${car.history.ownDamage}</strong></div>
      <div>상대 차 피해<strong>${car.history.otherDamage}</strong></div>
      <div>특수사항<strong>${car.history.note}</strong></div>
    `;
    qs("#historyDetails").innerHTML = `
      <div><dt>특수 용도 이력</dt><dd>${car.history.note}</dd></div>
      <div><dt>용도 및 차종</dt><dd>${car.history.useType}</dd></div>
    `;
    qs("#historyEvent").textContent = car.history.event;
    qs("#descriptionText").innerHTML = car.description.map((line) => `${line}<br>`).join("");

    qs("#detailPrice").textContent = car.price;
    qs("#insuranceCount").textContent = car.history.ownDamage === "0건" && car.history.otherDamage === "0건" ? "0건" : "1건";
    qs("#costRows").innerHTML = `
      <div class="costRow"><span>차량가</span><strong>${car.price}</strong></div>
      <div class="costRow"><span>이전 등록비(예상)</span><strong>${sideCost.toLocaleString("ko-KR")}만원</strong></div>
      <div class="costRow"><span>매도비</span><strong>44만원</strong></div>
    `;
    qs("#totalCost").textContent = `${totalCost.toLocaleString("ko-KR")}만원`;

    qs("#dealerAvatar").src = dealer.avatar;
    qs("#dealerName").innerHTML = `${dealer.name}<span class="dealerBadge">${dealer.type}</span>`;
    qs("#dealerStats").textContent = `★ 5.0 · ${dealer.sold} · ${dealer.selling}`;
    qs("#dealerLocation").textContent = `● 상담 가능 · 응답률 82%`;
    qs("#detailLocationLine").textContent = car.location;
    qs("#detailComplexLine").textContent = car.complex;
    qs("#detailPostedLine").textContent = `등록 ${car.posted.replace("전", " 전")}`;
    qs("#dealerNo").textContent = dealer.employeeNo;
    qs("#dealerGroup").textContent = dealer.group;
    qs("#dealerPhone").textContent = dealer.phone;
    qs("#stickyThumb").innerHTML = thumbMarkup(car);
    qs("#stickyTitle").textContent = car.title;
    qs("#stickyPrice").textContent = car.price;
    qs("#stickyMeta").textContent = `${car.yearFull} ${car.mileageFull} ${car.fuel} ${car.transmission}`;
    qs("#stickyPhone").textContent = dealer.phone;

    const similar = cars.filter((item) => item.id !== car.id).slice(0, 6);
    qs("#similarGrid").innerHTML = similar.map((item) => `
      <a class="similarCard" href="bobaedream-used-car-detail.html?id=${encodeURIComponent(item.id)}">
        <div class="similarThumb">${thumbMarkup(item)}</div>
        <div class="similarBody">
          <div class="similarTitle">${item.titleShort}</div>
          <div class="similarPrice">${item.price}</div>
        </div>
      </a>
    `).join("");

    const galleryStage = qs(".galleryStage");
    const thumbStrip = qs("[data-thumb-strip]");
    const thumbViewport = thumbStrip ? qs(".thumbViewport", thumbStrip) : null;
    const thumbTrack = thumbStrip ? qs(".thumbTrack", thumbStrip) : null;
    const thumbButtons = thumbStrip ? qsa("[data-gallery-src]", thumbStrip) : [];
    const thumbPrev = thumbStrip ? qs("[data-thumb-prev]", thumbStrip) : null;
    const thumbNext = thumbStrip ? qs("[data-thumb-next]", thumbStrip) : null;
    const thumbSlideWidth = 100;
    const thumbStep = 5;
    let thumbOffset = 0;
    let thumbDragStartX = 0;
    let thumbDragStartOffset = 0;
    let thumbDidDrag = false;
    let thumbWheelTimer = 0;
    let thumbDragPointerId = null;

    const getMaxThumbOffset = () => {
      if (!thumbTrack || !thumbViewport) return 0;
      return Math.max(0, thumbTrack.scrollWidth - thumbViewport.clientWidth);
    };
    const renderThumbTrack = () => {
      if (!thumbTrack) return;
      const maxOffset = getMaxThumbOffset();
      thumbOffset = Math.max(0, Math.min(thumbOffset, maxOffset));
      thumbTrack.style.transform = `translate3d(${-thumbOffset}px, 0, 0)`;
      thumbPrev?.classList.toggle("is-disabled", thumbOffset <= 0);
      thumbNext?.classList.toggle("is-disabled", thumbOffset >= maxOffset - 1);
    };
    const moveThumbTrack = (nextOffset) => {
      thumbOffset = nextOffset;
      renderThumbTrack();
    };
    const snapThumbTrack = () => {
      moveThumbTrack(Math.round(thumbOffset / thumbSlideWidth) * thumbSlideWidth);
    };
    const shiftThumbTrack = (direction) => {
      moveThumbTrack(thumbOffset + direction * thumbSlideWidth * thumbStep);
    };

    thumbPrev?.addEventListener("click", () => shiftThumbTrack(-1));
    thumbNext?.addEventListener("click", () => shiftThumbTrack(1));
    thumbViewport?.addEventListener("wheel", (event) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!delta) return;
      event.preventDefault();
      moveThumbTrack(thumbOffset + delta);
      clearTimeout(thumbWheelTimer);
      thumbWheelTimer = setTimeout(snapThumbTrack, 120);
    }, { passive: false });
    thumbViewport?.addEventListener("pointerdown", (event) => {
      if (!thumbTrack) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      thumbDragPointerId = event.pointerId;
      thumbTrack.classList.add("is-dragging");
      thumbDragStartX = event.clientX;
      thumbDragStartOffset = thumbOffset;
      thumbDidDrag = false;
    });
    const handleThumbPointerMove = (event) => {
      if (!thumbTrack?.classList.contains("is-dragging")) return;
      if (thumbDragPointerId !== null && event.pointerId !== thumbDragPointerId) return;
      const deltaX = event.clientX - thumbDragStartX;
      if (Math.abs(deltaX) > 4 && !thumbDidDrag) {
        thumbDidDrag = true;
        thumbViewport?.setPointerCapture?.(event.pointerId);
      }
      event.preventDefault();
      moveThumbTrack(thumbDragStartOffset - deltaX);
    };
    const endThumbPointerDrag = (event) => {
      if (thumbDragPointerId !== null && event?.pointerId !== undefined && event.pointerId !== thumbDragPointerId) return;
      if (!thumbTrack?.classList.contains("is-dragging")) return;
      thumbTrack.classList.remove("is-dragging");
      thumbDragPointerId = null;
      snapThumbTrack();
      setTimeout(() => {
        thumbDidDrag = false;
      }, 0);
    };
    thumbViewport?.addEventListener("pointermove", handleThumbPointerMove);
    window.addEventListener("pointermove", handleThumbPointerMove, { passive: false });
    ["pointerup", "pointercancel"].forEach((eventName) => {
      window.addEventListener(eventName, endThumbPointerDrag);
    });
    thumbViewport?.addEventListener("lostpointercapture", endThumbPointerDrag);

    thumbButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (thumbDidDrag) return;
        thumbButtons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
        if (galleryStage) galleryStage.innerHTML = galleryImageMarkup(button.dataset.gallerySrc, Number(button.dataset.galleryIndex) || 0);
      });
    });
    renderThumbTrack();

    qsa(".detailAnchorNav a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        qsa(".detailAnchorNav a").forEach((item) => item.classList.remove("is-active"));
        link.classList.add("is-active");
        const target = qs(link.getAttribute("href"));
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    const anchorNav = qs(".detailAnchorNav");
    const stickySummary = qs(".detailStickySummary");
    if (anchorNav) {
      const updateAnchorNav = () => {
        const isVisible = window.scrollY > 430;
        anchorNav.classList.toggle("is-visible", isVisible);
        stickySummary?.classList.toggle("is-visible", isVisible);
      };
      updateAnchorNav();
      window.addEventListener("scroll", updateAnchorNav, { passive: true });
    }

    setupGenericActions();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHeaderActive();
    setupListPage();
    setupDetailPage();
  });
})();
