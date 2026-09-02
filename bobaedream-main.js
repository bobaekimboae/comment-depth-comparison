(function () {
  const data = window.BOBAE_USED_CAR || {};
  const cars = Array.isArray(data.cars) ? data.cars : [];
  const listUrl = "bobaedream-used-car-list.html";
  const detailUrl = "bobaedream-used-car-detail.html";
  const categoryAssetVersion = "?v=vehicle-type-images-20260831";

  const state = {
    tab: "all",
    maker: { label: "제조사", value: "" },
    model: { label: "모델", value: "" },
    region: { label: "전국", value: "" }
  };

  const tabMeta = {
    all: { label: "전체 차량", count: "14,896" },
    domestic: { label: "국산차", count: "8,121" },
    import: { label: "수입차", count: "4,092" },
    electric: { label: "전기차", count: "1,126" },
    truck: { label: "화물·특장", count: "742" },
    bike: { label: "바이크", count: "982" },
    camping: { label: "캠핑카", count: "318" },
    machine: { label: "중장비", count: "181" }
  };

  const bodyTypes = [
    { key: "domestic", label: "국산차", count: "8,121", image: `assets/main/categories/vehicle-type-all.png${categoryAssetVersion}`, href: `${listUrl}?category=domestic` },
    { key: "import", label: "수입차", count: "4,092", image: `assets/main/categories/vehicle-type-import.png${categoryAssetVersion}`, href: `${listUrl}?category=import` },
    { key: "truck", label: "화물·특장", count: "742", image: `assets/main/categories/vehicle-type-truck.png${categoryAssetVersion}`, href: `${listUrl}?category=truck` },
    { key: "bike", label: "바이크", count: "982", image: `assets/main/categories/vehicle-type-bike.png${categoryAssetVersion}`, href: `${listUrl}?category=bike` },
    { key: "scooter", label: "스쿠터", count: "436", image: `assets/main/categories/vehicle-type-scooter.png${categoryAssetVersion}`, href: `${listUrl}?category=scooter` },
    { key: "electric-scooter", label: "전기스쿠터", count: "214", image: `assets/main/categories/vehicle-type-electric-scooter.png${categoryAssetVersion}`, href: `${listUrl}?category=electric-scooter` },
    { key: "ebike", label: "자전거", count: "167", image: `assets/main/categories/vehicle-type-ebike.png${categoryAssetVersion}`, href: `${listUrl}?category=ebike` },
    { key: "parts", label: "부품·용품", count: "1,430", image: `assets/main/categories/vehicle-type-parts.png${categoryAssetVersion}`, href: `${listUrl}?category=parts` },
    { key: "machine", label: "중장비", count: "181", image: `assets/main/categories/vehicle-type-machine.png${categoryAssetVersion}`, href: `${listUrl}?category=machine` }
  ];

  const brands = [
    { label: "현대", value: "hyundai" },
    { label: "기아", value: "kia" },
    { label: "제네시스", value: "genesis" },
    { label: "벤츠", value: "mercedes" },
    { label: "BMW", value: "bmw" },
    { label: "아우디", value: "audi" },
    { label: "포르쉐", value: "porsche" },
    { label: "테슬라", value: "tesla" }
  ];

  const selectOptions = {
    maker: [
      { label: "제조사", value: "" },
      { label: "현대", value: "hyundai" },
      { label: "기아", value: "kia" },
      { label: "제네시스", value: "genesis" },
      { label: "벤츠", value: "mercedes" },
      { label: "BMW", value: "bmw" },
      { label: "아우디", value: "audi" },
      { label: "포르쉐", value: "porsche" }
    ],
    model: [
      { label: "모델", value: "" },
      { label: "G80", value: "g80" },
      { label: "GV70", value: "gv70" },
      { label: "그랜저", value: "grandeur" },
      { label: "쏘나타", value: "sonata" },
      { label: "에스컬레이드", value: "escalade" },
      { label: "레인지로버", value: "range-rover" },
      { label: "GLE클래스", value: "gle-class" },
      { label: "X5", value: "x5" },
      { label: "르반떼", value: "levante" }
    ],
    region: [
      { label: "전국", value: "" },
      { label: "서울", value: "seoul" },
      { label: "경기", value: "gyeonggi" },
      { label: "인천", value: "incheon" },
      { label: "부산", value: "busan" },
      { label: "대구", value: "daegu" },
      { label: "대전", value: "daejeon" }
    ]
  };

  const valueIds = {
    maker: "mainMakerValue",
    model: "mainModelValue",
    region: "mainRegionValue"
  };

  const popularCards = cars.slice(0, 4);
  const dealCards = cars.slice(1, 5).map((car, index) => ({
    ...car,
    originalPrice: ["20,400만원", "8,250만원", "7,390만원", "16,500만원"][index] || car.price
  }));

  const toast = document.querySelector(".toast");
  let toastTimer = null;
  const menu = document.getElementById("mainSelectMenu");
  const searchPanel = document.querySelector(".mainSearchPanel");

  function showToast(message) {
    if (!toast || !message) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  function createLink(url, className, text) {
    const link = document.createElement("a");
    link.href = url;
    link.className = className;
    link.textContent = text;
    return link;
  }

  function renderBodyTypes() {
    const grid = document.getElementById("mainBodyTypeGrid");
    if (!grid) return;
    bodyTypes.forEach((item) => {
      const card = document.createElement("a");
      card.className = "mainBodyCard";
      card.href = item.href || `${listUrl}?category=${encodeURIComponent(item.key)}`;
      card.dataset.category = item.key;
      card.setAttribute("aria-label", `${item.label} 매물 보기`);

      const imageWrap = document.createElement("span");
      imageWrap.className = "mainBodyImage";
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.label;
      imageWrap.appendChild(image);

      const label = document.createElement("strong");
      label.textContent = item.label;
      const count = document.createElement("span");
      count.textContent = `${item.count}대`;

      card.append(imageWrap, label, count);
      grid.appendChild(card);
    });
  }

  function renderBrands() {
    const wrap = document.getElementById("mainBrandLinks");
    if (!wrap) return;
    brands.forEach((brand) => {
      wrap.appendChild(createLink(`${listUrl}?brand=${encodeURIComponent(brand.value)}`, "mainBrandLink", brand.label));
    });
  }

  function renderVehicleGrid(id, items, isDeal) {
    const grid = document.getElementById(id);
    if (!grid) return;
    items.forEach((car) => {
      const card = document.createElement("a");
      card.className = "mainVehicleCard";
      card.href = `${detailUrl}?id=${encodeURIComponent(car.id)}`;

      const media = document.createElement("span");
      media.className = "mainVehicleMedia";
      const img = document.createElement("img");
      img.src = car.thumbnail || "assets/used-car/thumb-placeholder.png";
      img.alt = car.title;
      media.appendChild(img);
      if (car.video) {
        const badge = document.createElement("span");
        badge.className = "mainVehicleBadge";
        badge.textContent = "영상";
        media.appendChild(badge);
      }

      const body = document.createElement("span");
      body.className = "mainVehicleBody";

      const brand = document.createElement("span");
      brand.className = "mainVehicleBrand";
      brand.textContent = car.brand || "보배드림";

      const title = document.createElement("strong");
      title.className = "mainVehicleTitle";
      title.textContent = car.titleShort || car.title;

      const price = document.createElement("span");
      price.className = "mainVehiclePrice";
      price.textContent = car.price;
      if (isDeal && car.originalPrice) {
        const oldPrice = document.createElement("del");
        oldPrice.textContent = car.originalPrice;
        price.appendChild(oldPrice);
      }

      const specs = document.createElement("span");
      specs.className = "mainVehicleSpecs";
      specs.textContent = [car.yearFull || car.year, car.mileageFull || car.mileage, car.fuel, car.location].filter(Boolean).join(" · ");

      const seller = document.createElement("span");
      seller.className = "mainVehicleSeller";
      seller.textContent = car.sellerType === "private" ? "개인 판매자" : "인증 딜러";

      body.append(brand, title, price, specs, seller);
      card.append(media, body);
      grid.appendChild(card);
    });
  }

  function updateCount() {
    const count = document.getElementById("mainResultCount");
    const searchButton = document.getElementById("mainSearchButton");
    const meta = tabMeta[state.tab] || tabMeta.car;
    if (count) count.textContent = `${meta.count}대 매물`;
    if (searchButton) searchButton.textContent = `${meta.count}대 검색`;
  }

  function buildSearchUrl() {
    const params = new URLSearchParams();
    params.set("type", state.tab);
    ["maker", "model", "region"].forEach((key) => {
      if (state[key].value) params.set(key, state[key].value);
    });
    return `${listUrl}?${params.toString()}`;
  }

  function closeMenu() {
    if (!menu) return;
    menu.hidden = true;
    menu.replaceChildren();
    menu.removeAttribute("data-open-select");
  }

  function openSelect(type, anchor) {
    if (!menu || !searchPanel || !selectOptions[type]) return;
    if (!menu.hidden && menu.getAttribute("data-open-select") === type) {
      closeMenu();
      return;
    }

    menu.replaceChildren();
    menu.setAttribute("data-open-select", type);
    selectOptions[type].forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("role", "option");
      button.className = state[type].value === option.value ? "is-active" : "";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        state[type] = option;
        const value = document.getElementById(valueIds[type]);
        if (value) value.textContent = option.label;
        closeMenu();
        showToast(`${option.label} 조건을 적용했습니다.`);
      });
      menu.appendChild(button);
    });

    const panelRect = searchPanel.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    menu.style.left = `${anchorRect.left - panelRect.left}px`;
    menu.style.top = `${anchorRect.bottom - panelRect.top + 6}px`;
    menu.style.width = `${anchorRect.width}px`;
    menu.hidden = false;
  }

  function bindEvents() {
    document.querySelectorAll("[data-main-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-main-tab]").forEach((tab) => {
          tab.classList.toggle("is-active", tab === button);
          tab.setAttribute("aria-selected", tab === button ? "true" : "false");
        });
        state.tab = button.getAttribute("data-main-tab") || "all";
        updateCount();
      });
    });

    document.querySelectorAll("[data-select]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openSelect(button.getAttribute("data-select"), button);
      });
    });

    document.getElementById("mainSearchButton")?.addEventListener("click", () => {
      window.location.href = buildSearchUrl();
    });

    document.getElementById("mainAdvancedSearch")?.addEventListener("click", () => {
      window.location.href = `${listUrl}?advanced=1`;
    });

    document.getElementById("mainSaveSearch")?.addEventListener("click", () => {
      showToast("검색 조건을 저장했습니다.");
    });

    document.getElementById("mainNewsletterForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast("구독 신청이 접수되었습니다.");
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".mainSelectMenu")) closeMenu();
      const target = event.target.closest("[data-toast]");
      if (!target) return;
      if (target.tagName === "BUTTON" || target.getAttribute("href") === "#") event.preventDefault();
      showToast(target.getAttribute("data-toast"));
    });

    window.addEventListener("resize", closeMenu);
  }

  renderBodyTypes();
  renderBrands();
  renderVehicleGrid("mainPopularGrid", popularCards, false);
  renderVehicleGrid("mainDealGrid", dealCards, true);
  updateCount();
  bindEvents();
})();
