(function () {
  const data = window.BOBAE_USED_CAR || {};
  const cars = data.cars || [];
  const dealers = data.dealers || {};
  const categories = data.categories || [];
  const commercial = window.BOBAE_USED_CAR_COMMERCIAL_MASTER || data.commercial || {};
  const commercialTypes = commercial.types || [];
  const commercialCommonFilters = commercial.commonFilters || {};
  const commercialCommonFilterOrder = commercial.commonFilterOrder || [];
  const excludedCommercialFilterKeys = new Set(["Trust", "Service", "ServiceMark"]);
  const params = new URLSearchParams(window.location.search);
  const optionIconBase = "assets/used-car/options/";
  const optionIconFiles = {
    "선루프": "s03-30-option-sunroof.png",
    "파노라마 선루프": "s03-30-option-sunroof.png",
    "LED 헤드램프": "s03-31-option-led-headlamp.png",
    "어댑티브 크루즈": "s03-32-option-adaptive-cruise.png",
    "어댑티브 크루즈 컨트롤": "s03-32-option-adaptive-cruise.png",
    "후방카메라": "s03-33-option-rear-camera.png",
    "어라운드뷰": "s03-34-option-around-view.png",
    "스마트키": "s03-35-option-smart-key.png",
    "순정 내비게이션": "s03-36-option-navigation.png",
    "내비게이션": "s03-36-option-navigation.png",
    "열선시트": "s03-37-option-heated-seat.png",
    "통풍시트": "s03-38-option-ventilated-seat.png",
    "헤드업 디스플레이": "s03-39-option-head-up-display.webp",
    "HUD": "s03-39-option-head-up-display.webp",
    "전동트렁크": "s03-40-option-power-trunk.png",
    "전방충돌방지": "s03-41-option-collision-warning.png"
  };
  const optionIconNumbers = {
    "선루프": "30",
    "LED 헤드램프": "31",
    "어댑티브 크루즈 컨트롤": "32",
    "후방카메라": "33",
    "어라운드뷰": "34",
    "스마트키": "35",
    "순정 내비게이션": "36",
    "열선시트": "37",
    "통풍시트": "38",
    "헤드업 디스플레이": "39",
    "전동트렁크": "40",
    "전방충돌방지": "41"
  };

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
        ["전체차량", "all", data.totalCount],
        ...categories.map((category) => [category.label, category.key, category.key === "used" ? data.totalCount : "1,000+"])
      ]
    },
    body: {
      title: "차종",
      options: [["경차", "경차", "612"], ["소형차", "소형차", "438"], ["준중형차", "준중형차", "2,280"], ["중형차", "중형차", "3,116"], ["대형차", "대형차", "2,044"], ["스포츠카", "스포츠카", "183"], ["SUV", "SUV", "3,208"], ["RV", "RV", "1,044"], ["경승합차", "경승합차", "42"], ["승합차", "승합차", "305"], ["화물차", "화물차", "1,203"], ["기타", "기타", "6"]]
    },
    year: {
      title: "연식",
      options: [["전체", "", data.totalCount], ["2026년식 이상", "2026", "412"], ["2025년식 이상", "2025", "1,204"], ["2023년식 이상", "2023", "4,902"], ["2020년식 이상", "2020", "8,214"], ["2017년식 이상", "2017", "11,536"]]
    },
    mileage: {
      title: "주행거리",
      options: [["전체", "", data.totalCount], ["10,000 km 이하", "10000", "728"], ["30,000 km 이하", "30000", "2,905"], ["50,000 km 이하", "50000", "5,486"], ["100,000 km 이하", "100000", "10,122"], ["200,000 km 이하", "200000", "13,774"]]
    },
    price: {
      title: "가격",
      options: [["전체", "", data.totalCount], ["3천만원 이하", "0-3000", "4,218"], ["5천만원 이하", "0-5000", "8,120"], ["7천만원 이하", "0-7000", "10,966"], ["1억원 이하", "0-10000", "12,304"], ["1억원 이상", "10000-", "2,592"]]
    },
    region: {
      title: "지역",
      options: () => regionOptions.map(([label, count]) => [label, label, count])
    },
    seat: {
      title: "인승",
      options: [["2인승 이하", "2인승 이하", "102"], ["3인승", "3인승", "74"], ["4인승", "4인승", "280"], ["5인승", "5인승", "10,820"], ["6인승", "6인승", "238"], ["7인승", "7인승", "1,705"], ["8인승", "8인승", "141"], ["9인승", "9인승", "630"], ["10인승 이상", "10인승 이상", "253"]]
    },
    history: {
      title: "성능/보험공개",
      options: [["직영 성능점검", "직영 성능점검", "2,106"], ["성능기록부", "성능기록부", "10,004"], ["보험이력", "보험이력", "12,001"], ["차량 이력 공개", "차량 이력 공개", "11,738"]]
    },
    seller: {
      title: "판매자구분",
      options: [["전체", "all", data.totalCount], ["개인", "private", "882"], ["딜러", "dealer", "13,854"], ["리스렌트제휴", "lease-partner", "319"]]
    },
    sale: {
      title: "판매방식",
      options: [["일반", "일반", "13,870"], ["렌트", "렌트", "176"], ["리스", "리스", "732"]]
    },
    "ext-color": {
      title: "외부색상",
      options: [["흰색", "흰색", "5,318"], ["검정색", "검정색", "3,412"], ["쥐색", "쥐색", "2,345"], ["청색", "청색", "709"], ["은색", "은색", "665"], ["빨간색", "빨간색", "318"], ["노란색", "노란색", "84"], ["초록색", "초록색", "76"], ["갈색", "갈색", "62"], ["주황색", "주황색", "34"], ["보라색", "보라색", "18"], ["기타색상", "기타색상", "42"]]
    },
    "int-color": {
      title: "내부색상",
      options: [["검정색 계열", "검정색 계열", "9,241"], ["갈색 계열", "갈색 계열", "2,048"], ["베이지색 계열", "베이지색 계열", "1,254"], ["회색 계열", "회색 계열", "1,170"], ["청색 계열", "청색 계열", "119"], ["흰색 계열", "흰색 계열", "92"], ["빨간색 계열", "빨간색 계열", "35"], ["주황색 계열", "주황색 계열", "24"]]
    },
    fuel: {
      title: "연료",
      options: [["전체", "", data.totalCount], ["가솔린", "가솔린", "8,202"], ["디젤", "디젤", "3,118"], ["LPG(일반인 구입)", "LPG", "394"], ["가솔린+전기", "하이브리드", "1,020"], ["LPG+전기", "LPG+전기", "20"], ["가솔린+LPG", "가솔린+LPG", "199"], ["전기", "전기", "642"], ["수소", "수소", "36"], ["기타", "기타", "2"]]
    },
    transmission: {
      title: "변속기",
      options: [["오토", "오토", "13,944"], ["수동", "수동", "186"], ["세미오토", "세미오토", "28"], ["CVT", "CVT", "48"], ["기타", "기타", "1"]]
    },
    option: {
      title: "옵션",
      options: [["선루프", "선루프", "4,320"], ["내비게이션", "내비게이션", "12,139"], ["스마트키", "스마트키", "12,722"], ["헤드램프(HID)", "헤드램프(HID)", "1,669"], ["후방 카메라", "후방 카메라", "13,173"], ["가죽시트", "가죽시트", "13,743"], ["에어백(동승석)", "에어백(동승석)", "13,945"], ["에어백(사이드)", "에어백(사이드)", "13,209"], ["통풍시트", "통풍시트", "7,440"], ["헤드업 디스플레이", "헤드업 디스플레이", "2,190"], ["어라운드뷰", "어라운드뷰", "6,148"], ["전동트렁크", "전동트렁크", "5,328"]]
    },
    plate: {
      title: "차량번호/판매자 이름",
      options: []
    }
  };
  const currentYear = new Date().getFullYear();
  const pcYearOptions = [
    ["전체", "", null, null],
    ["~1년", "year-1", currentYear - 1, null],
    ["~2년", "year-2", currentYear - 2, null],
    ["~3년", "year-3", currentYear - 3, null],
    ["~4년", "year-4", currentYear - 4, null],
    ["~5년", "year-5", currentYear - 5, null],
    ["6년~", "year-old", null, currentYear - 6]
  ];
  const pcPriceOptions = [
    ["전체", "", null, null],
    ["1천만원", "0-1000", null, 1000],
    ["2천만원", "0-2000", null, 2000],
    ["3천만원", "0-3000", null, 3000],
    ["4천만원", "0-4000", null, 4000],
    ["5천만원", "0-5000", null, 5000],
    ["6천만원", "0-6000", null, 6000],
    ["7천만원", "0-7000", null, 7000],
    ["8천만원", "0-8000", null, 8000],
    ["9천만원~", "9000-", 9000, null]
  ];
  const pcPriceRangeOptions = [
    100, 200, 300, 400, 500, 600, 700, 800, 900,
    1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
    3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000
  ];
  const mobilePriceSliderMax = 10000;
  const mobilePriceSliderStep = 100;
  const pcYearRangeOptions = Array.from({ length: currentYear - 1979 }, (_, index) => currentYear - index);
  const pcMonthRangeOptions = Array.from({ length: 12 }, (_, index) => index + 1);
  const pcMileageRangeOptions = Array.from({ length: 20 }, (_, index) => (index + 1) * 10000);
  const pcFuelOptions = [
    ["가솔린", "가솔린", "8,202"],
    ["디젤", "디젤", "3,118"],
    ["LPG(일반인 구입)", "LPG", "394"],
    ["가솔린+전기", "하이브리드", "1,020"],
    ["LPG+전기", "LPG+전기", "20"],
    ["가솔린+LPG", "가솔린+LPG", "199"],
    ["LPG+가솔린", "LPG+가솔린", "1"],
    ["가솔린+CNG", "가솔린+CNG", "6"],
    ["전기", "전기", "642"],
    ["수소", "수소", "36"],
    ["기타", "기타", "2"]
  ];
  const pcSellerOptions = [
    ["개인", "private", "882"],
    ["딜러", "dealer", "13,854"],
    ["리스렌트제휴", "lease-partner", "319"]
  ];
  const pcBrandLogos = {
    "현대": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/49/e0f2b451-ba55-4a62-af9f-dec69e5f1c5c.png",
    "제네시스": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/76/30e88aab-a5b1-4a4b-9fca-fd44e59c6ad0.png",
    "기아": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/3/edb84b29-c499-4e69-a5f4-8b2cf9fe53dc.png",
    "쉐보레(GM대우)": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/8/d56d4eed-d156-4886-a73b-fa69bdf2a2b2.png",
    "GM대우": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/8/d56d4eed-d156-4886-a73b-fa69bdf2a2b2.png",
    "르노코리아(삼성)": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/26/d38e6e99-91ae-4055-8f2d-f5e650ce825b.png",
    "KG모빌리티(쌍용)": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/31/d8644b9d-f875-4cf3-a302-4bee2d41220c.png",
    "어울림모터스": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/71/82bfbecd-7cad-4c70-bf76-83bcb86aa005.png",
    "벤츠": "https://file5.bobaedream.co.kr/car_photo/2026/1556270218Logo.png",
    "BMW": "https://file5.bobaedream.co.kr/car_photo/2026/bmw.png",
    "아우디": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/32/1ec31772-a629-4924-8dfb-eae0e6b88d78.png",
    "폭스바겐": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/44/9396e810-aa96-45f4-a5b5-d2318e8a1684.png",
    "렉서스": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/13/e5607358-c83b-4c12-bf58-535c9a4122c7.png",
    "미니": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/67/a05c14ad-b7c4-419b-8fb5-b4e5f42807ae.png",
    "GMC": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/54/8f1368ea-4402-4909-bc0f-b275c830e758.png",
    "닛산": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/5/e32d5e81-7f0f-4d53-b332-34e9e687472b.png",
    "다이하쓰": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/6/adacf27f-05f9-4d08-a419-60ee24374289.png",
    "닷지": "https://file9.bobaedream.co.kr/strange/car/maker-emblems/7/f6357841-31d8-4353-93ba-77d22dc9cf34.png"
  };
  const filterBrandLogos = {
    "현대": "assets/used-car/brand-icons-hq/hyundai.svg",
    "제네시스": "assets/used-car/brand-icons-hq/genesis.svg",
    "기아": "assets/used-car/brand-icons-hq/kia.svg",
    "쉐보레(GM대우)": "assets/used-car/brand-icons-hq/chevrolet.svg",
    "쉐보레(국산)": "assets/used-car/brand-icons-hq/chevrolet.svg",
    "GM대우": "assets/used-car/brand-icons-hq/daewoo.svg",
    "르노코리아(삼성)": "assets/used-car/brand-icons-hq/renault-korea-symbol.svg",
    "KG모빌리티(쌍용)": "assets/used-car/brand-icons-svg/ssangyong.svg",
    "어울림모터스": "assets/used-car/brand-icons/oullim.png",
    "기타 제조사": "assets/used-car/categories/s03-23-category-used-car.svg",
    "기타 국산차": "assets/used-car/categories/s03-23-category-used-car.svg",
    "벤츠": "assets/used-car/brand-icons-hq/mercedes-benz.svg",
    "BMW": "assets/used-car/brand-icons-hq/bmw.svg",
    "아우디": "assets/used-car/brand-icons-hq/audi.svg",
    "폭스바겐": "assets/used-car/brand-icons-hq/volkswagen.svg",
    "렉서스": "assets/used-car/brand-icons-hq/lexus.svg",
    "미니": "assets/used-car/brand-icons-hq/mini.svg",
    "GMC": "assets/used-car/brand-icons-hq/gmc.svg",
    "닛산": "assets/used-car/brand-icons-hq/nissan.svg",
    "다이하쓰": "assets/used-car/brand-icons-hq/daihatsu.svg",
    "닷지": "assets/used-car/brand-icons-hq/dodge.svg"
  };
  const filterBrandLogoClasses = {
    "현대": "is-domestic-hyundai",
    "제네시스": "is-domestic-genesis",
    "기아": "is-domestic-kia",
    "쉐보레(GM대우)": "is-domestic-chevrolet",
    "쉐보레(국산)": "is-domestic-chevrolet",
    "GM대우": "is-domestic-daewoo",
    "르노코리아(삼성)": "is-domestic-renault",
    "KG모빌리티(쌍용)": "is-domestic-kgm",
    "어울림모터스": "is-domestic-oullim",
    "기타 제조사": "is-domestic-other",
    "기타 국산차": "is-domestic-other"
  };
  const brandAliases = {
    "쉐보레(GM대우)": ["쉐보레(GM대우)", "쉐보레(국산)", "GM대우"],
    "기타 제조사": ["기타 제조사", "기타 국산차", "어울림모터스"]
  };
  const passiveFilterTypes = new Set(["body", "seat", "history", "sale", "ext-color", "int-color", "transmission", "option"]);
  const allFilterChipTypes = [
    ["body", "차종", "body"],
    ["brand", "제조사", "maker"],
    ["year", "연식", "year"],
    ["mileage", "주행거리", "mileage"],
    ["price", "가격", "price"],
    ["region", "지역", "region"],
    ["seat", "인승", "seat"],
    ["history", "성능/보험", "history"],
    ["seller", "판매자", "seller"],
    ["sale", "판매방식", "sale"],
    ["ext-color", "외부색상", "ext-color"],
    ["int-color", "내부색상", "int-color"],
    ["fuel", "연료", "fuel"],
    ["transmission", "변속기", "transmission"],
    ["option", "옵션", "option"],
    ["plate", "차량번호", "plate"]
  ];
  const commercialFilterChipTypes = [
    ["vehicleType1Id", "형식", "vehicleType1"],
    ["vehicleType2Id", "상세형식", "vehicleType2"],
    ["payloadCapacityCode", "적재용량", "payload"],
    ["loadStandardCode", "축장/규격", "standard"],
    ["commercial:Manufacturer", "제조사", "commercial:Manufacturer"],
    ["commercial:Varaxis", "가변축", "commercial:Varaxis"],
    ["commercial:Use", "용도", "commercial:Use"],
    ["commercial:Transmission", "변속기", "commercial:Transmission"],
    ["year", "연식", "year"],
    ["commercial:Price", "가격", "commercial:Price"],
    ["commercial:OfficeCityState", "지역", "commercial:OfficeCityState"],
    ["commercial:FuelType", "연료", "commercial:FuelType"],
    ["commercial:Condition", "성능 공개", "commercial:Condition"],
    ["commercial:Separation", "판매자", "commercial:Separation"],
    ["commercial:Mileage", "주행거리", "commercial:Mileage"],
    ["commercial:Color", "색상", "commercial:Color"],
    ["commercial:Options", "옵션", "commercial:Options"],
    ["commercial:AdType", "광고유형", "commercial:AdType"],
    ["plate", "차량번호", "plate"]
  ];
  const commercialModalTypes = new Set(["vehicleType1", "vehicleType2", "payload", "standard"]);
  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

  function dealerLabel(dealer) {
    const nameRole = [dealer.name, dealer.type].filter(Boolean).join(" ");
    return [nameRole, dealer.sold].filter(Boolean).join(" · ");
  }

  function dealerSupportLabel(dealer) {
    return [dealer.selling].filter(Boolean).join(" · ");
  }

  function locationMarketLabel(car) {
    return [car.location, car.complex].filter(Boolean).join(" · ");
  }

  function makeMeta(car) {
    return [car.year, car.mileage, car.fuel, car.power].filter(Boolean).join(" · ");
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
    const navCategories = ["all", "domestic", "truck", "parts"];
    const categoryNav = new URLSearchParams(window.location.search).get("category");
    const brandNav = new URLSearchParams(window.location.search).get("brand");
    const sellerNav = new URLSearchParams(window.location.search).get("seller");
    let activeNav = "home";
    if (document.body?.matches("[data-used-car-list]")) {
      if (sellerNav === "dealer") {
        activeNav = "dealer";
      } else if (brandNav === "import" || categoryNav === "import") {
        activeNav = "import";
      } else if (!categoryNav || categoryNav === "all") {
        activeNav = "all";
      } else if (categoryNav === "used" || categoryNav === "domestic") {
        activeNav = "domestic";
      } else {
        activeNav = navCategories.includes(categoryNav) ? categoryNav : "domestic";
      }
    } else if (document.body?.matches("[data-used-car-detail]")) {
      activeNav = "domestic";
    }
    qsa(".bbNavLink").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === activeNav);
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
    const commercialBrand = qs("#commercialBrandFilter");
    if (domestic) {
      domestic.innerHTML = (data.filters?.domestic || []).map(([label, count]) => `
        <label class="filterOption">
          <input type="checkbox" value="${label}" data-brand-filter>
          ${filterBrandLabelMarkup(label)}
          <span class="count">${count}</span>
        </label>
      `).join("");
    }
    if (imported) {
      imported.innerHTML = (data.filters?.imported || []).map(([label, count]) => `
        <label class="filterOption${count === "0" ? " is-disabled" : ""}">
          <input type="checkbox" value="${label}" data-brand-filter ${count === "0" ? "disabled" : ""}>
          ${filterBrandLabelMarkup(label)}
          <span class="count">${count}</span>
        </label>
      `).join("");
    }
    if (commercialBrand) {
      const truckCars = cars.filter((car) => car.category === "truck");
      const brandCounts = truckCars.reduce((acc, car) => {
        acc.set(car.brand, (acc.get(car.brand) || 0) + 1);
        return acc;
      }, new Map());
      commercialBrand.innerHTML = Array.from(brandCounts.entries()).map(([label, count]) => `
        <label class="filterOption">
          <input type="checkbox" value="${label}" data-brand-filter>
          ${filterBrandLabelMarkup(label)}
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

  function isCommercialMode(state) {
    return state.category === "truck";
  }

  function commercialType1ByCode(code) {
    return commercialTypes.find((type) => type.code === code) || null;
  }

  function commercialType2ByCode(state) {
    const selectedType = commercialType1ByCode(state.vehicleType1Id);
    const scoped = selectedType?.children || [];
    return scoped.find((type) => type.code === state.vehicleType2Id)
      || commercialTypes.flatMap((type) => type.children || []).find((type) => type.code === state.vehicleType2Id)
      || null;
  }

  function commercialChildrenForState(state) {
    return commercialType1ByCode(state.vehicleType1Id)?.children || [];
  }

  function commercialOptionList(state, field) {
    const selectedType2 = commercialType2ByCode(state);
    if (!selectedType2) return [];
    return field === "payloadCapacityCode"
      ? selectedType2.payloadOptions || []
      : selectedType2.standardOptions || [];
  }

  function commercialLabel(state, type) {
    if (type === "vehicleType1Id") return commercialType1ByCode(state.vehicleType1Id)?.label || "";
    if (type === "vehicleType2Id") return commercialType2ByCode(state)?.label || "";
    if (type === "payloadCapacityCode") return state.payloadCapacityCode || "";
    if (type === "loadStandardCode") return state.loadStandardCode || "";
    return "";
  }

  function commercialCommonKey(type) {
    return String(type || "").startsWith("commercial:") ? String(type).slice(11) : "";
  }

  function commercialCommonConfig(key) {
    if (excludedCommercialFilterKeys.has(key)) return null;
    return commercialCommonFilters[key] || null;
  }

  function commercialCommonItems(key) {
    const items = commercialCommonConfig(key)?.items || [];
    if (key === "Condition") return items.filter((item) => !String(item.label || "").includes("엔카"));
    return items;
  }

  function commercialCommonSelectedValues(state, key) {
    const values = state.commercialFilters?.[key];
    if (!Array.isArray(values) || !commercialCommonConfig(key)) return [];
    const allowed = new Set(commercialCommonItems(key).map((item) => String(item.value || item.label || "")));
    return values.filter((value) => allowed.has(String(value)));
  }

  function commercialCommonItemByValue(key, value) {
    return commercialCommonItems(key).find((item) => String(item.value) === String(value)) || null;
  }

  function commercialCommonSelectedLabels(state, key) {
    return commercialCommonSelectedValues(state, key).map((value) => {
      const item = commercialCommonItemByValue(key, value);
      return item?.label || value;
    }).filter(Boolean);
  }

  function selectedCommercialCommonLabel(state, key) {
    const labels = commercialCommonSelectedLabels(state, key);
    return labels.length > 1 ? `${labels[0]} 외 ${labels.length - 1}` : labels[0] || "";
  }

  function commercialCommonActiveCount(state) {
    return Object.entries(state.commercialFilters || {}).reduce((sum, [key]) => {
      if (!commercialCommonConfig(key)) return sum;
      return sum + (commercialCommonSelectedValues(state, key).length ? 1 : 0);
    }, 0);
  }

  function applyCommercialCommonFilter(state, key, value) {
    if (!key || !commercialCommonConfig(key)) return;
    state.commercialFilters = state.commercialFilters || {};
    if (!value) {
      delete state.commercialFilters[key];
      return;
    }
    const selected = commercialCommonSelectedValues(state, key);
    const exists = selected.some((item) => String(item) === String(value));
    const mode = commercialCommonConfig(key)?.multiSelectMode || "None";
    if (exists) {
      const next = selected.filter((item) => String(item) !== String(value));
      if (next.length && mode !== "None") state.commercialFilters[key] = next;
      else delete state.commercialFilters[key];
      return;
    }
    state.commercialFilters[key] = mode === "None" ? [value] : [...selected, value];
  }

  function commercialFilterTypesForState(state) {
    if (!isCommercialMode(state)) return allFilterChipTypes;
    const selectedType2 = commercialType2ByCode(state);
    return commercialFilterChipTypes.filter(([type]) => {
      if (type === "payloadCapacityCode") return Boolean(selectedType2?.payloadOptions?.length);
      if (type === "loadStandardCode") return Boolean(selectedType2?.standardOptions?.length);
      const commonKey = commercialCommonKey(type);
      if (commonKey) return Boolean(commercialCommonConfig(commonKey)?.items?.length);
      return true;
    });
  }

  function commercialFilterRowsForState(state) {
    const selectedType2 = commercialType2ByCode(state);
    return [
      ["vehicleType1", "형식/적재용량"],
      ...(selectedType2?.standardOptions?.length ? [["standard", "축장/규격"]] : []),
      ["commercial:Manufacturer", "제조사/모델/등급"],
      ["commercial:Varaxis", "가변축"],
      ["commercial:Use", "용도"],
      ["commercial:Transmission", "변속기"],
      ["year", "연식"],
      ["commercial:Price", "가격"],
      ["commercial:OfficeCityState", "지역(시/도)"],
      ["commercial:FuelType", "연료"],
      ["commercial:Condition", "성능 공개"],
      ["commercial:Separation", "판매자구분"],
      ["commercial:Mileage", "주행거리"],
      ["commercial:Color", "색상"],
      ["commercial:Options", "옵션"],
      ["commercial:AdType", "광고유형"],
      ["plate", "차량번호/판매자 이름"]
    ].filter(([type]) => {
      const commonKey = commercialCommonKey(type);
      if (commonKey) return Boolean(commercialCommonItems(commonKey).length);
      return true;
    });
  }

  function applyCommercialFilter(state, field, value) {
    if (field === "vehicleType1Id") {
      state.vehicleType1Id = state.vehicleType1Id === value ? "" : value;
      state.vehicleType2Id = "";
      state.payloadCapacityCode = "";
      state.loadStandardCode = "";
      return;
    }
    if (field === "vehicleType2Id") {
      state.vehicleType2Id = state.vehicleType2Id === value ? "" : value;
      state.payloadCapacityCode = "";
      state.loadStandardCode = "";
      return;
    }
    state[field] = state[field] === value ? "" : value;
  }

  function syncCommercialUrlParams(state) {
    if (!isCommercialMode(state) || !window.history?.replaceState) return;
    const next = new URLSearchParams(window.location.search);
    next.set("category", "truck");
    [
      ["vehicleType1Id", state.vehicleType1Id],
      ["vehicleType2Id", state.vehicleType2Id],
      ["payloadCapacityCode", state.payloadCapacityCode],
      ["loadStandardCode", state.loadStandardCode]
    ].forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    commercialCommonFilterOrder.forEach((key) => {
      const values = commercialCommonSelectedValues(state, key);
      if (values.length) next.set(`cf_${key}`, values.join("|"));
      else next.delete(`cf_${key}`);
    });
    window.history.replaceState(null, "", `${window.location.pathname}?${next.toString()}`);
  }

  function commercialOptionMarkup(state, field, items, emptyText = "", visibleLimit = Number.POSITIVE_INFINITY) {
    if (!items.length) {
      return emptyText ? `<div class="commercialEmpty">${emptyText}</div>` : "";
    }
    const list = items.map((item, index) => {
      const selected = String(state[field] || "") === String(item.value || item.code || "");
      const value = item.value || item.code || "";
      const count = item.count || "";
      const extraAttr = Number.isFinite(visibleLimit) && index >= visibleLimit ? " data-filter-extra" : "";
      return `
        <label class="filterOption commercialOption${selected ? " is-selected" : ""}"${extraAttr}>
          <input type="checkbox" value="${escapeHtml(value)}" data-commercial-filter="${field}" ${selected ? "checked" : ""}>
          <span>${escapeHtml(item.label)}</span>
          <span class="count">${count}</span>
        </label>
      `;
    }).join("");
    const more = Number.isFinite(visibleLimit) && items.length > visibleLimit
      ? `<button class="filterMoreBtn" type="button" data-filter-more data-collapsed-label="더보기" data-expanded-label="접기" aria-expanded="false">더보기</button>`
      : "";
    return list + more;
  }

  function commercialCommonLabelMarkup(key, label) {
    if (key === "Color") return `<span><i class="filterColorSwatch ${colorSwatchClass(label)}"></i>${escapeHtml(label)}</span>`;
    if (key === "Manufacturer") return filterBrandLabelMarkup(label);
    return `<span>${escapeHtml(label)}</span>`;
  }

  function commercialCommonOptionMarkup(state, key, visibleLimit = Number.POSITIVE_INFINITY) {
    const items = commercialCommonItems(key);
    if (!items.length) return "";
    const selectedValues = new Set(commercialCommonSelectedValues(state, key).map(String));
    const list = items.map((item, index) => {
      const selected = selectedValues.has(String(item.value || item.label || ""));
      const value = item.value || item.label || "";
      const extraAttr = Number.isFinite(visibleLimit) && index >= visibleLimit ? " data-filter-extra" : "";
      return `
        <label class="filterOption commercialOption${selected ? " is-selected" : ""}"${extraAttr}>
          <input type="checkbox" value="${escapeHtml(value)}" data-commercial-common-filter="${escapeHtml(key)}" ${selected ? "checked" : ""}>
          ${commercialCommonLabelMarkup(key, item.label || value)}
          <span class="count">${item.count || ""}</span>
        </label>
      `;
    }).join("");
    const title = commercialCommonConfig(key)?.label || "조건";
    const more = Number.isFinite(visibleLimit) && items.length > visibleLimit
      ? `<button class="filterMoreBtn" type="button" data-filter-more data-collapsed-label="${escapeHtml(title)} 더보기" data-expanded-label="${escapeHtml(title)} 접기" aria-expanded="false">${escapeHtml(title)} 더보기</button>`
      : "";
    return list + more;
  }

  function commercialChoiceSection(title, body, open = true) {
    return `
      <section class="filterItem${open ? " is-open" : ""}">
        <button class="filterToggle" type="button">${title}</button>
        <div class="filterPanelBody">${body}</div>
      </section>
    `;
  }

  function commercialCommonSection(state, key, title, open = false, visibleLimit = Number.POSITIVE_INFINITY) {
    if (!commercialCommonItems(key).length) return "";
    return commercialChoiceSection(title || commercialCommonConfig(key)?.label || key, commercialCommonOptionMarkup(state, key, visibleLimit), open);
  }

  function commercialTreeControlMarkup(state, field, item, level, pc = false, hidden = false) {
    const value = item.value || item.code || "";
    const selected = String(state[field] || "") === String(value);
    const count = item.count || "";
    const classes = `commercialTreeNode is-level-${level}${selected ? " is-selected" : ""}`;
    if (pc) {
      return `
        <button class="pcFilterChoiceButton ${classes}" type="button" data-pc-commercial-field="${field}" data-pc-commercial-value="${escapeHtml(value)}"${hidden ? " data-pc-filter-extra" : ""}>
          <span class="pcFilterCheckbox" aria-hidden="true"></span>
          <span>${escapeHtml(item.label)}</span>
          <span class="pcFilterCount">${count}</span>
        </button>
      `;
    }
    return `
      <label class="filterOption commercialOption ${classes}"${hidden ? " data-filter-extra" : ""}>
        <input type="checkbox" value="${escapeHtml(value)}" data-commercial-filter="${field}" ${selected ? "checked" : ""}>
        <span>${escapeHtml(item.label)}</span>
        <span class="count">${count}</span>
      </label>
    `;
  }

  function commercialSelectedNodeMarkup(state) {
    const nodes = [
      ["vehicleType1Id", "형식", commercialLabel(state, "vehicleType1Id")],
      ["vehicleType2Id", "상세형식", commercialLabel(state, "vehicleType2Id")],
      ["payloadCapacityCode", "적재용량", commercialLabel(state, "payloadCapacityCode")]
    ].filter(([, , label]) => label);
    if (!nodes.length) return "";
    return `
      <div class="commercialSelectedNodes" aria-label="선택한 형식 조건">
        ${nodes.map(([field, name, label]) => `
          <button class="commercialSelectedNode" type="button" data-commercial-clear-field="${field}" aria-label="${escapeHtml(name)} ${escapeHtml(label)} 해제">
            <span>${escapeHtml(name)}</span>
            <strong>${escapeHtml(label)}</strong>
            <i aria-hidden="true"></i>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderCommercialTree(state, pc = false) {
    const type2Limit = pc ? 18 : 14;
    const payloadLimit = pc ? 24 : 18;
    let hasHidden = false;
    const tree = commercialTypes.map((type) => {
      const typeSelected = state.vehicleType1Id === type.code;
      const children = typeSelected ? type.children || [] : [];
      return `
        <div class="commercialTreeGroup${typeSelected ? " is-open" : ""}">
          ${commercialTreeControlMarkup(state, "vehicleType1Id", { ...type, value: type.code }, 1, pc)}
          ${children.length ? `
            <div class="commercialTreeChildren">
              ${children.map((child, index) => {
                const childSelected = state.vehicleType2Id === child.code;
                const hideChild = index >= type2Limit && !childSelected;
                if (hideChild) hasHidden = true;
                const payloadOptions = childSelected ? child.payloadOptions || [] : [];
                return `
                  ${commercialTreeControlMarkup(state, "vehicleType2Id", { ...child, value: child.code }, 2, pc, hideChild)}
                  ${childSelected ? `
                    <div class="commercialTreeChildren is-capacity">
                      <div class="filterGroupTitle">적재용량</div>
                      ${payloadOptions.length
                        ? payloadOptions.map((payload, payloadIndex) => {
                          const payloadSelected = state.payloadCapacityCode === payload.value;
                          const hidePayload = payloadIndex >= payloadLimit && !payloadSelected;
                          if (hidePayload) hasHidden = true;
                          return commercialTreeControlMarkup(state, "payloadCapacityCode", payload, 3, pc, hidePayload);
                        }).join("")
                        : `<div class="commercialEmpty">이 형식은 적재용량 조건이 없습니다.</div>`}
                    </div>
                  ` : ""}
                `;
              }).join("")}
            </div>
          ` : ""}
        </div>
      `;
    }).join("");
    const moreButton = !hasHidden ? "" : pc
      ? `<button class="pcFilterMoreButton" type="button" data-pc-filter-more data-collapsed-label="하위 노드 더보기" data-expanded-label="하위 노드 접기" aria-expanded="false">하위 노드 더보기</button>`
      : `<button class="filterMoreBtn" type="button" data-filter-more data-collapsed-label="하위 노드 더보기" data-expanded-label="하위 노드 접기" aria-expanded="false">하위 노드 더보기</button>`;
    return `
      <div class="commercialFilterTree${pc ? " is-pc" : ""}"${pc ? " data-pc-generic-list" : ""}>
        ${commercialSelectedNodeMarkup(state)}
        ${tree}
        ${moreButton}
      </div>
    `;
  }

  function renderCommercialFilterPanel(state) {
    const title = qs(".filterTitle");
    const menu = qs(".filterMenu");
    if (!title || !menu || !isCommercialMode(state)) return;
    title.innerHTML = `화물·특장 필터 <span class="filterCountBadge" id="filterCountBadge" hidden>0</span>`;
    const standardOptions = commercialOptionList(state, "loadStandardCode");
    menu.innerHTML = `
      ${commercialChoiceSection("형식/적재용량", renderCommercialTree(state), true)}
      ${state.vehicleType2Id && standardOptions.length ? commercialChoiceSection("축장/규격", commercialOptionMarkup(state, "loadStandardCode", standardOptions, "", 12), true) : ""}
      ${commercialCommonSection(state, "Manufacturer", "제조사/모델/등급", true, 12)}
      ${commercialCommonSection(state, "Varaxis", "가변축", false)}
      ${commercialCommonSection(state, "Use", "용도", false)}
      ${commercialCommonSection(state, "Transmission", "변속기", false)}
      ${commercialChoiceSection("연식", `
        <div class="filterRangeRows">
          <div class="filterRangeRow">
            <label class="filterSelectBox"><select data-left-year-select data-left-year-min aria-label="시작 연식 연도"></select></label>
            <label class="filterSelectBox"><select data-left-month-select aria-label="시작 연식 월"></select></label>
            <span class="filterRangeText">부터</span>
          </div>
          <div class="filterRangeRow">
            <label class="filterSelectBox"><select data-left-year-select data-left-year-max aria-label="종료 연식 연도"></select></label>
            <label class="filterSelectBox"><select data-left-month-select aria-label="종료 연식 월"></select></label>
            <span class="filterRangeText">까지</span>
          </div>
        </div>
      `)}
      ${commercialCommonSection(state, "Price", "가격", false, 11)}
      ${commercialCommonSection(state, "OfficeCityState", "지역(시/도)", false, 18)}
      ${commercialCommonSection(state, "FuelType", "연료", false, 7)}
      ${commercialCommonSection(state, "Condition", "성능 공개", false)}
      ${commercialCommonSection(state, "Separation", "판매자구분", false)}
      ${commercialCommonSection(state, "Mileage", "주행거리", false, 6)}
      ${commercialCommonSection(state, "Color", "색상", false, 8)}
      ${commercialCommonSection(state, "Options", "옵션", false, 10)}
      ${commercialCommonSection(state, "AdType", "광고유형", false)}
      ${commercialChoiceSection("차량번호/판매자 이름", `
        <label class="filterSearchBox">
          <input type="search" id="leftKeywordSearch" placeholder="예) 83도1024, 이은호" value="${escapeHtml(state.leftKeyword)}">
          <button type="button" data-left-keyword-apply>검색</button>
        </label>
      `, false)}
    `;
  }

  function renderCommercialFilterSheetBody(state) {
    const standardOptions = commercialOptionList(state, "loadStandardCode");
    return `
      <div class="pcCommercialFilterMenu">
        ${commercialChoiceSection("형식/적재용량", renderCommercialTree(state), true)}
        ${state.vehicleType2Id && standardOptions.length ? commercialChoiceSection("축장/규격", commercialOptionMarkup(state, "loadStandardCode", standardOptions, "", 12), true) : ""}
        ${commercialCommonSection(state, "Manufacturer", "제조사/모델/등급", true, 12)}
        ${commercialCommonSection(state, "Varaxis", "가변축", false)}
        ${commercialCommonSection(state, "Use", "용도", false)}
        ${commercialCommonSection(state, "Transmission", "변속기", false)}
        ${commercialChoiceSection("연식", renderPcYearModal(state), false)}
        ${commercialCommonSection(state, "Price", "가격", false, 11)}
        ${commercialCommonSection(state, "OfficeCityState", "지역(시/도)", false, 18)}
        ${commercialCommonSection(state, "FuelType", "연료", false, 7)}
        ${commercialCommonSection(state, "Condition", "성능 공개", false)}
        ${commercialCommonSection(state, "Separation", "판매자구분", false)}
        ${commercialCommonSection(state, "Mileage", "주행거리", false, 6)}
        ${commercialCommonSection(state, "Color", "색상", false, 8)}
        ${commercialCommonSection(state, "Options", "옵션", false, 10)}
        ${commercialCommonSection(state, "AdType", "광고유형", false)}
        ${commercialChoiceSection("차량번호/판매자 이름", `
          <div class="pcKeywordPanel">
            <label>
              <span>차량번호 또는 판매자 이름</span>
              <input type="search" data-pc-keyword-input value="${escapeHtml(state.leftKeyword)}" placeholder="예) 83도1024, 이은호">
            </label>
            <button type="button" data-pc-keyword-apply>검색</button>
          </div>
        `, false)}
      </div>
    `;
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

  function normalizedFuelFilter(value) {
    if (!value) return "";
    if (String(value).includes("하이브리드")) return "하이브리드";
    if (String(value).includes("LPG")) return "LPG";
    return value;
  }

  function selectedLeftFilterValues(type) {
    return leftFilterInputs(type).filter((input) => input.checked).map((input) => input.value).filter(Boolean);
  }

  function leftFilterInputs(type) {
    return qsa("[data-left-filter]").filter((input) => input.dataset.leftFilter === type);
  }

  function syncLeftFilterValue(type, value, exclusive = false) {
    const inputs = leftFilterInputs(type);
    if (!value) {
      inputs.forEach((input) => { input.checked = false; });
      return;
    }
    inputs.forEach((input) => {
      if (input.value !== value) {
        if (exclusive) input.checked = false;
        return;
      }
      input.checked = exclusive ? true : !input.checked;
    });
  }

  function passiveLeftFilterCount() {
    return qsa("[data-left-filter]:checked").length;
  }

  function normalizeBodyType(value) {
    const text = String(value || "");
    if (/SUV|RV/.test(text)) return text;
    return text.replace(/차$/, "");
  }

  function matchesBrandValue(carBrand, selectedBrand) {
    if (!selectedBrand) return true;
    return (brandAliases[selectedBrand] || [selectedBrand]).includes(carBrand);
  }

  function matchesColorValue(source, selected) {
    const text = String(source || "");
    const value = String(selected || "").replace(" 계열", "");
    if (value === "흰색") return /흰|화이트|white/i.test(text);
    if (value === "검정색") return /검|블랙|black/i.test(text);
    if (value === "쥐색") return /쥐|회|그레이|gray|grey/i.test(text);
    if (value === "은색") return /은|실버|silver/i.test(text);
    if (value === "청색") return /청|파랑|블루|blue/i.test(text);
    if (value === "빨간색") return /빨|레드|red/i.test(text);
    if (value === "노란색") return /노랑|옐로|yellow/i.test(text);
    if (value === "초록색") return /초록|그린|green/i.test(text);
    if (value === "갈색") return /갈|브라운|brown/i.test(text);
    if (value === "주황색") return /주황|오렌지|orange/i.test(text);
    if (value === "보라색") return /보라|퍼플|purple/i.test(text);
    if (value === "베이지색") return /베이지|beige/i.test(text);
    if (value === "기타색상") return !/(흰|화이트|white|검|블랙|black|쥐|회|그레이|gray|grey|은|실버|silver|청|파랑|블루|blue|빨|레드|red|노랑|옐로|yellow|초록|그린|green|갈|브라운|brown|주황|오렌지|orange|보라|퍼플|purple|베이지|beige)/i.test(text);
    return text.includes(value);
  }

  function matchesOptionValue(car, selected) {
    const options = car.options || [];
    const aliases = {
      "내비게이션": ["내비게이션", "순정 내비게이션"],
      "헤드램프(HID)": ["헤드램프(HID)", "LED 헤드램프"],
      "후방 카메라": ["후방 카메라", "후방카메라"],
      "가죽시트": ["가죽시트", "열선시트", "통풍시트"],
      "에어백(동승석)": ["에어백(동승석)"],
      "에어백(사이드)": ["에어백(사이드)"]
    };
    return (aliases[selected] || [selected]).some((value) => options.includes(value) || (car.badges || []).includes(value));
  }

  function matchesLeftFilterGroup(car, type, values) {
    if (!values.length) return true;
    return values.some((value) => {
      if (type === "body") {
        const body = car.detailSpecs?.["차종"] || "";
        return normalizeBodyType(body) === normalizeBodyType(value) || String(car.title || "").includes(value);
      }
      if (type === "seat") {
        const seats = car.detailSpecs?.["인승"] || "";
        if (value === "2인승 이하") return Number(String(seats).replace(/[^\d]/g, "")) <= 2;
        if (value === "10인승 이상") return Number(String(seats).replace(/[^\d]/g, "")) >= 10;
        return seats === value;
      }
      if (type === "history") {
        if (value === "직영 성능점검") return (car.badges || []).includes("인증중고차");
        return Boolean(car.history);
      }
      if (type === "sale") {
        if (value === "일반") return (car.history?.useType || "일반") === "일반";
        return (car.history?.useType || "").includes(value) || (car.badges || []).some((badge) => badge.includes(value));
      }
      if (type === "ext-color") return matchesColorValue(car.color, value);
      if (type === "int-color") return matchesColorValue(car.seatColor, value);
      if (type === "transmission") {
        const transmission = String(car.transmission || "");
        if (value === "오토") return /자동|오토/i.test(transmission);
        return transmission.includes(value);
      }
      if (type === "option") return matchesOptionValue(car, value);
      return true;
    });
  }

  function matchesPassiveLeftFilters(car) {
    const groups = ["body", "seat", "history", "sale", "ext-color", "int-color", "transmission", "option"];
    return groups.every((type) => matchesLeftFilterGroup(car, type, selectedLeftFilterValues(type)));
  }

  function commercialPriceRange(value) {
    const match = String(value || "").match(/^p(\d{2})(\d{2})$/);
    if (!match) return null;
    const min = Number(match[1]) * 100;
    const maxCode = Number(match[2]);
    return {
      min,
      max: maxCode >= 99 ? null : maxCode * 100
    };
  }

  function commercialMileageRange(value) {
    const match = String(value || "").match(/^r(\d{2})(\d{2})$/);
    if (!match) return null;
    const min = Number(match[1]) * 10000;
    const maxCode = Number(match[2]);
    return {
      min,
      max: maxCode >= 99 ? null : maxCode * 10000
    };
  }

  function textMatchesAny(source, labels) {
    const text = String(source || "");
    return labels.some((label) => label && text.includes(label));
  }

  function matchesCommercialCommonFilters(car, state) {
    const selections = state.commercialFilters || {};
    return Object.keys(selections).every((key) => {
      const values = commercialCommonSelectedValues(state, key);
      if (!values.length) return true;
      const labels = values.map((value) => commercialCommonItemByValue(key, value)?.label || value);
      if (key === "Manufacturer") {
        return labels.some((label) => matchesBrandValue(car.brand, label) || String(label).includes(car.brand) || String(car.brand).includes(label));
      }
      if (key === "Varaxis") {
        const target = [car.commercial?.standard, car.title, ...(car.options || [])].join(" ");
        return textMatchesAny(target, labels);
      }
      if (key === "Use") {
        const target = [car.commercial?.use, car.history?.useType, car.title].join(" ");
        return !target.trim() || textMatchesAny(target, labels);
      }
      if (key === "Transmission") {
        return labels.some((label) => {
          const transmission = String(car.transmission || "");
          if (label === "오토") return /자동|오토/i.test(transmission);
          return transmission.includes(label);
        });
      }
      if (key === "Price") {
        const price = moneyToNumber(car.price);
        return values.some((value) => {
          const range = commercialPriceRange(value);
          if (!range) return true;
          return price >= range.min && (!range.max || price < range.max);
        });
      }
      if (key === "OfficeCityState") {
        return labels.some((label) => String(car.location || "").startsWith(label));
      }
      if (key === "FuelType") {
        return labels.some((label) => car.fuel === normalizedFuelFilter(label));
      }
      if (key === "Separation") {
        return values.some((value) => {
          if (value === "A") return car.sellerType === "private";
          if (value === "B") return car.sellerType === "dealer";
          return textMatchesAny(car.sellerType, labels);
        });
      }
      if (key === "Mileage") {
        const mileage = normalizeKoreanNumber(car.mileageFull || car.mileage);
        return values.some((value) => {
          const range = commercialMileageRange(value);
          if (!range) return true;
          return mileage >= range.min && (!range.max || mileage < range.max);
        });
      }
      if (key === "Color") return labels.some((label) => matchesColorValue(car.color, label));
      if (key === "Options") return labels.some((label) => matchesOptionValue(car, label) || String(car.title || "").includes(label));
      if (["Trust", "Service", "ServiceMark", "Condition", "AdType"].includes(key)) {
        const target = [car.badges?.join(" "), car.history?.source, car.detailSpecs?.["특징"]].join(" ");
        return !target.trim() || textMatchesAny(target, labels);
      }
      return true;
    });
  }

  function matchesSellerType(car, seller) {
    if (!seller || seller === "all") return true;
    if (seller === "certified" || seller === "lease-partner") return car.sellerType === "dealer";
    if (seller === "real-owner") return true;
    return car.sellerType === seller;
  }

  function filterCars(state) {
    const importedBrands = new Set((data.filters?.imported || []).map(([brand]) => brand));
    let visible = cars.filter((car) => {
      const categoryMatch = state.category === "all" || state.category === car.category;
      const sellerMatch = matchesSellerType(car, state.seller);
      const brandMatch = !state.brand || (state.brand === "import" ? importedBrands.has(car.brand) : matchesBrandValue(car.brand, state.brand));
      const videoMatch = !state.video || car.video;
      const regionMatch = !state.region || state.region === "전국" || String(car.location || "").startsWith(state.region);
      const fuelMatch = !state.fuel || car.fuel === normalizedFuelFilter(state.fuel);
      const yearValue = carYear(car);
      const yearMatch = (!state.yearMin || yearValue >= state.yearMin) && (!state.yearMax || yearValue <= state.yearMax);
      const price = moneyToNumber(car.price);
      const priceMatch = (!state.priceMin || price >= state.priceMin) && (!state.priceMax || price <= state.priceMax);
      const mileage = normalizeKoreanNumber(car.mileageFull || car.mileage);
      const mileageMatch = (!state.mileageMin || mileage >= state.mileageMin) && (!state.mileageMax || mileage <= state.mileageMax);
      const complexMatch = !state.complex || car.complex === state.complex;
      const optionMatch = !state.option || (car.options || []).includes(state.option) || (car.badges || []).includes(state.option);
      const featureMatch = !state.feature || (car.badges || []).includes(state.feature);
      const plateMatch = !state.plate || (state.plate === "video" ? car.video : true);
      const commercialSpec = car.commercial || {};
      const commercialMatch = !isCommercialMode(state)
        || ((!state.vehicleType1Id || commercialSpec.type1 === state.vehicleType1Id)
          && (!state.vehicleType2Id || commercialSpec.type2 === state.vehicleType2Id)
          && (!state.payloadCapacityCode || commercialSpec.payload === state.payloadCapacityCode)
          && (!state.loadStandardCode || commercialSpec.standard === state.loadStandardCode)
          && matchesCommercialCommonFilters(car, state));
      const leftKeyword = String(state.leftKeyword || "").trim();
      const dealer = getDealer(car);
      const keywordMatch = !leftKeyword || [car.number, car.title, dealer.name, dealer.company].some((value) => String(value || "").includes(leftKeyword));
      return categoryMatch && sellerMatch && brandMatch && videoMatch && regionMatch && fuelMatch && yearMatch && priceMatch && mileageMatch && complexMatch && optionMatch && featureMatch && plateMatch && commercialMatch && matchesPassiveLeftFilters(car) && keywordMatch;
    });

    if (state.sort === "price-high") visible = [...visible].sort((a, b) => moneyToNumber(b.price) - moneyToNumber(a.price));
    if (state.sort === "price-low") visible = [...visible].sort((a, b) => moneyToNumber(a.price) - moneyToNumber(b.price));
    if (state.sort === "year-new") visible = [...visible].sort((a, b) => carYear(b) - carYear(a));
    if (state.sort === "mileage-low") visible = [...visible].sort((a, b) => normalizeKoreanNumber(a.mileageFull || a.mileage) - normalizeKoreanNumber(b.mileageFull || b.mileage));
    if (state.sort === "power-high") visible = [...visible].sort((a, b) => carPower(b) - carPower(a));
    return visible;
  }

  function getCountText(state, visible) {
    const isBaseView = state.category === "all" && state.seller === "all" && !state.brand && !state.video && (!state.region || state.region === "전국") && !state.fuel && !state.yearMin && !state.yearMax && !state.priceMin && !state.priceMax && !state.mileageMin && !state.mileageMax && !state.complex && !state.option && !state.feature && !state.plate && !state.leftKeyword && !state.vehicleType1Id && !state.vehicleType2Id && !state.payloadCapacityCode && !state.loadStandardCode && !commercialCommonActiveCount(state) && !passiveLeftFilterCount();
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

    renderPcFilterChips(state);
    updatePcFilterApplyCount(countText);
    renderMobileFilterShell(state);
    updateMobileChipLabels(state);
    syncPcLeftRegionUi(state);
    syncPcLeftFuelSellerUi(state);
    syncPcLeftRangeSelects(state);
    syncPcLeftPriceRangeUi(state);
    syncFilterCountBadge(state);
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

  function renderMobileFilterShell(state) {
    if (!isCommercialMode(state)) return;
    const categoryLabel = categories.find((category) => category.key === "truck")?.label || "트럭 · 특장";
    const chipRoot = qs(".mobileChipScroller");
    if (chipRoot) {
      const chips = [
        `<button class="mobileChip" type="button" data-open-sheet="filter"><span class="mobileTuneIcon"></span>필터</button>`,
        `<button class="mobileChip is-dark" type="button" data-mobile-reset>${categoryLabel} <span>x</span></button>`,
        ...commercialFilterTypesForState(state).map(([type, fallback, sheetType]) => {
          const label = selectedTopFilterLabel(state, type) || fallback;
          const selected = Boolean(selectedTopFilterLabel(state, type));
          return `<button class="mobileChip${selected ? " is-dark" : ""}" type="button" data-open-sheet="${sheetType}">${escapeHtml(label)}</button>`;
        })
      ];
      chipRoot.innerHTML = chips.join("");
    }

    const filterTitle = qs('[data-sheet="filter"] .mobileSheetHeader strong');
    if (filterTitle) filterTitle.textContent = "화물·특장 필터";
    const filterRows = qs('[data-sheet="filter"] .mobileSheetScroll');
    if (filterRows) {
      filterRows.innerHTML = commercialFilterRowsForState(state).map(([type, label]) => {
        const selected = selectedTopFilterLabel(state, type);
        return `
          <button class="mobileFilterRow${selected ? " is-applied" : ""}" type="button" data-open-sheet="${type}">
            <span>${escapeHtml(label)}</span>
            ${selected ? `<em>${escapeHtml(selected)}</em>` : ""}
          </button>
        `;
      }).join("");
    }
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
            <div class="mobileDealer"><img src="${dealer.avatar}" alt=""><span>${dealerLabel(dealer)}</span></div>
            <div class="mobileLocation">${locationMarketLabel(car)}</div>
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
            <div class="viewLine"><span class="viewTriangle"></span><span>${car.views}</span></div>
            <div class="dealerLine">
              <span class="dealerMini"><img src="${dealer.avatar}" alt=""></span>
              <span class="dealerLabel">${dealerLabel(dealer)}</span>
            </div>
            <div class="locationLine"><span class="pinIcon"></span><span>${locationMarketLabel(car)}</span></div>
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
    state.yearMax = null;
    state.yearLabel = "";
    state.priceMin = null;
    state.priceMax = null;
    state.priceLabel = "";
    state.mileageMin = null;
    state.mileageMax = null;
    state.complex = "";
    state.option = "";
    state.feature = "";
    state.plate = "";
    state.leftKeyword = "";
    state.vehicleType1Id = "";
    state.vehicleType2Id = "";
    state.payloadCapacityCode = "";
    state.loadStandardCode = "";
    state.commercialFilters = {};
    state.generic = {};
  }

  function resetFilterState(state) {
    const category = state.category;
    const sort = state.sort;
    resetState(state);
    state.category = category;
    state.sort = sort;
    state.generic.category = category;
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

  function selectedSellerLabel(value) {
    if (!value || value === "all") return "";
    const option = pcSellerOptions.find(([, optionValue]) => optionValue === value);
    return option ? option[0] : "";
  }

  function selectedFuelLabel(value) {
    if (!value) return "";
    const option = pcFuelOptions.find(([, optionValue]) => optionValue === value);
    return option ? option[0] : value;
  }

  function summarizeFilterValues(values) {
    if (!values.length) return "";
    return values.length > 1 ? `${values[0]} 외 ${values.length - 1}` : values[0];
  }

  function mileageRangeLabel(min, max) {
    if (min && max) return `${min.toLocaleString("ko-KR")}km~${max.toLocaleString("ko-KR")}km`;
    if (min) return `${min.toLocaleString("ko-KR")}km 이상`;
    if (max) return `${max.toLocaleString("ko-KR")}km 이하`;
    return "";
  }

  function selectedTopFilterLabel(state, type) {
    const commonKey = commercialCommonKey(type);
    if (commonKey) return selectedCommercialCommonLabel(state, commonKey);
    if (commercialModalTypes.has(type) || ["vehicleType1Id", "vehicleType2Id", "payloadCapacityCode", "loadStandardCode"].includes(type)) {
      const stateField = type === "vehicleType1" ? "vehicleType1Id"
        : type === "vehicleType2" ? "vehicleType2Id"
          : type === "payload" ? "payloadCapacityCode"
            : type === "standard" ? "loadStandardCode"
              : type;
      return commercialLabel(state, stateField);
    }
    if (passiveFilterTypes.has(type)) return summarizeFilterValues(selectedLeftFilterValues(type));
    if (type === "brand") return state.brand || "";
    if (type === "region") return state.region && state.region !== "전국" ? state.region : "";
    if (type === "year") return state.yearLabel || selectedGenericLabel(state, "year");
    if (type === "mileage") return mileageRangeLabel(state.mileageMin, state.mileageMax) || selectedGenericLabel(state, "mileage");
    if (type === "price") return state.priceLabel || selectedGenericLabel(state, "price");
    if (type === "fuel") return selectedFuelLabel(state.fuel);
    if (type === "seller") return selectedSellerLabel(state.seller);
    if (type === "plate") return state.leftKeyword || selectedGenericLabel(state, "plate");
    return "";
  }

  function activeTopFilterCount(state) {
    return activeLeftFilterCount(state);
  }

  function activeLeftFilterCount(state) {
    const selectedCount = [
      state.category && state.category !== "all",
      state.brand,
      state.region && state.region !== "전국",
      state.video,
      state.fuel,
      state.yearMin || state.yearMax,
      state.priceMin || state.priceMax,
      state.mileageMin,
      state.mileageMax,
      state.complex,
      state.option,
      state.feature,
      state.seller && state.seller !== "all",
      state.leftKeyword
      , state.vehicleType1Id
      , state.vehicleType2Id
      , state.payloadCapacityCode
      , state.loadStandardCode
    ].filter(Boolean).length;
    return selectedCount + commercialCommonActiveCount(state) + passiveLeftFilterCount();
  }

  function syncFilterCountBadge(state) {
    const badge = qs("#filterCountBadge");
    if (!badge) return;
    const count = activeLeftFilterCount(state);
    badge.hidden = !count;
    if (count) badge.textContent = String(count);
  }

  function renderSelectedChip(label, type, modalType = type) {
    return `
      <button class="chipBtn is-dark is-selected" type="button" data-pc-filter="${modalType}" data-clear-filter="${type}" aria-label="${label} 조건 수정">
        <span>${label}</span>
      </button>
    `;
  }

  function renderOpenChip(label, modalType) {
    return `<button class="chipBtn has-caret" type="button" data-pc-filter="${modalType}">${label}</button>`;
  }

  function renderPcFilterChips(state) {
    const root = qs("#pcFilterChips");
    if (!root) return;
    const count = activeTopFilterCount(state);
    const categoryLabel = isCommercialMode(state)
      ? categories.find((category) => category.key === "truck")?.label || "트럭-특장"
      : "전체차량";
    const chips = [
      `<button class="chipBtn is-filter${count ? " is-applied" : ""}" type="button" data-pc-filter-menu>${count || "필터"}</button>`,
      renderSelectedChip(categoryLabel, "category", "category")
    ];

    commercialFilterTypesForState(state).forEach(([type, label, modalType]) => {
      const selected = selectedTopFilterLabel(state, type);
      chips.push(selected ? renderSelectedChip(selected, type, modalType) : renderOpenChip(label, modalType));
    });
    root.innerHTML = chips.join("");
  }

  function updateMobileChipLabels(state) {
    commercialFilterTypesForState(state).forEach(([type, fallback, sheetType]) => {
      const chip = qs(`.mobileChip[data-open-sheet="${sheetType}"]`);
      if (!chip) return;
      const label = selectedTopFilterLabel(state, type) || fallback;
      if (type === "brand") {
        const makerLabel = qs("#mobileMakerLabel");
        if (makerLabel) makerLabel.textContent = label;
        return;
      }
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
    if (passiveFilterTypes.has(type)) {
      syncLeftFilterValue(type, value);
      if (type === "option") state.option = "";
      if (type === "history") state.feature = "";
      delete state.generic[type];
      return;
    }
    state.generic[type] = value;
    if (type === "category") state.category = value || "all";
    if (type === "region") state.region = value || "전국";
    if (type === "seller") state.seller = value || "all";
    if (type === "fuel") state.fuel = value || "";
    if (type === "year") {
      state.yearMin = value ? Number(value) : null;
      state.yearMax = null;
      state.yearLabel = "";
    }
    if (type === "mileage") {
      state.mileageMin = null;
      state.mileageMax = value ? Number(value) : null;
    }
    if (type === "price") {
      const [min, max] = String(value || "").split("-");
      state.priceMin = min ? Number(min) : null;
      state.priceMax = max ? Number(max) : null;
      state.priceLabel = "";
    }
  }

  function getGenericOptions(config) {
    return typeof config.options === "function" ? config.options() : config.options;
  }

  function genericOptionSelected(state, type, value) {
    if (!value && passiveFilterTypes.has(type)) return !selectedLeftFilterValues(type).length;
    if (passiveFilterTypes.has(type)) return selectedLeftFilterValues(type).includes(value);
    if (type === "year" && !value) return !state.yearMin && !state.yearMax;
    if (type === "mileage" && !value) return !state.mileageMin && !state.mileageMax;
    if (type === "price" && !value) return !state.priceMin && !state.priceMax;
    if (type === "region") return (state.region || "전국") === value;
    if (type === "seller") return (state.seller || "all") === value;
    if (type === "fuel") return state.fuel === value;
    return String(state.generic?.[type] || "") === String(value);
  }

  function colorSwatchClass(label) {
    if (label.includes("흰")) return "is-white";
    if (label.includes("검")) return "is-black";
    if (label.includes("쥐") || label.includes("회")) return "is-gray";
    if (label.includes("청")) return "is-blue";
    if (label.includes("은")) return "is-silver";
    if (label.includes("빨")) return "is-red";
    if (label.includes("노")) return "is-yellow";
    if (label.includes("초")) return "is-green";
    if (label.includes("갈")) return "is-brown";
    if (label.includes("베이지")) return "is-beige";
    if (label.includes("주황")) return "is-orange";
    if (label.includes("보라")) return "is-purple";
    return "is-etc";
  }

  function mobileGenericLabelMarkup(type, label) {
    if (type === "ext-color" || type === "int-color") {
      return `<span class="mobileOptionLabel"><i class="filterColorSwatch ${colorSwatchClass(label)}"></i>${label}</span>`;
    }
    return `<span>${label}</span>`;
  }

  function renderMobileSelectOptions(values, placeholder, selectedValue, formatter = (value) => value) {
    const selected = String(selectedValue || "");
    return `<option value="">${placeholder}</option>${values.map((value) => `<option value="${value}"${selected === String(value) ? " selected" : ""}>${formatter(value)}</option>`).join("")}`;
  }

  function renderMobileRangePanel(type, state) {
    if (type === "year") {
      return `
        <div class="mobileRangePanel">
          <div class="mobileRangeTitle">${rangeLabel(state.yearMin, state.yearMax, "년") || "연식 범위"}</div>
          <div class="mobileRangeRow">
            <label class="mobileRangeSelect"><select data-mobile-year-min>${renderMobileSelectOptions(pcYearRangeOptions, "시작 연도", state.yearMin, (value) => `${value}년`)}</select></label>
            <span>부터</span>
          </div>
          <div class="mobileRangeRow">
            <label class="mobileRangeSelect"><select data-mobile-year-max>${renderMobileSelectOptions(pcYearRangeOptions, "종료 연도", state.yearMax, (value) => `${value}년`)}</select></label>
            <span>까지</span>
          </div>
        </div>
      `;
    }
    if (type === "mileage") {
      return `
        <div class="mobileRangePanel">
          <div class="mobileRangeTitle">${mileageRangeLabel(state.mileageMin, state.mileageMax) || "주행거리 범위"}</div>
          <div class="mobileRangeRow">
            <label class="mobileRangeSelect"><select data-mobile-mileage-min>${renderMobileSelectOptions(pcMileageRangeOptions, "최소", state.mileageMin, (value) => `${value.toLocaleString("ko-KR")} km`)}</select></label>
            <span>부터</span>
          </div>
          <div class="mobileRangeRow">
            <label class="mobileRangeSelect"><select data-mobile-mileage-max>${renderMobileSelectOptions(pcMileageRangeOptions, "최대", state.mileageMax, (value) => `${value.toLocaleString("ko-KR")} km`)}</select></label>
            <span>까지</span>
          </div>
        </div>
      `;
    }
    if (type === "plate") {
      return `
        <div class="mobileKeywordPanel">
          <label>
            <span>차량번호 또는 판매자 이름</span>
            <input type="search" data-mobile-keyword-input value="${escapeHtml(state.leftKeyword)}" placeholder="예) 12가1234, 이은호">
          </label>
          <button type="button" data-mobile-keyword-apply>검색</button>
        </div>
      `;
    }
    return "";
  }

  function renderMobilePriceRange(state) {
    const { min, max } = currentMobilePriceRange(state);
    const minPercent = priceRangePercent(min, 0);
    const maxPercent = priceRangePercent(max, 100);
    const selectedLabel = state.priceLabel || priceRangeLabel(state.priceMin, state.priceMax) || "전체 가격";
    return `
      <div class="mobilePriceRangePanel" data-mobile-price-range>
        <div class="mobilePriceRangeLabel">
          <strong>${selectedLabel}</strong>
          <span>최대 1억원+</span>
        </div>
        <div class="mobilePriceRangeTrack" data-mobile-price-track>
          <span class="mobilePriceRangeFill" style="left:${minPercent}%;right:${100 - maxPercent}%;"></span>
          <button class="mobilePriceRangeHandle" type="button" role="slider" data-mobile-price-handle="min" aria-label="최저 가격" aria-valuemin="0" aria-valuemax="${mobilePriceSliderMax}" aria-valuenow="${min}" aria-valuetext="${mobilePriceValueText(min)}" style="left:${minPercent}%;"></button>
          <button class="mobilePriceRangeHandle" type="button" role="slider" data-mobile-price-handle="max" aria-label="최대 가격" aria-valuemin="0" aria-valuemax="${mobilePriceSliderMax}" aria-valuenow="${max}" aria-valuetext="${mobilePriceValueText(max)}" style="left:${maxPercent}%;"></button>
        </div>
        <div class="mobilePriceRangeTicks">
          <span>0</span>
          <span>1억원+</span>
        </div>
      </div>
    `;
  }

  function renderGenericSheet(type, state) {
    const commonKey = isCommercialMode(state) ? commercialCommonKey(type) : "";
    const config = genericSheetConfigs[type] || genericSheetConfigs.category;
    const title = qs("#genericSheetTitle");
    const root = qs("#genericSheetOptions");
    if (!root) return;
    if (isCommercialMode(state) && (commonKey || commercialModalTypes.has(type))) {
      const sheetTitle = commonKey
        ? commercialCommonConfig(commonKey)?.label || "조건 선택"
        : type === "standard"
          ? "축장/규격"
          : "형식/적재용량";
      if (title) title.textContent = sheetTitle;
      root.dataset.genericType = type;
      root.classList.remove("has-price-range");
      root.classList.toggle("is-single-column", true);
      root.classList.toggle("is-commercial-filter-list", true);
      if (commonKey) {
        const items = commercialCommonItems(commonKey);
        const selectedValues = new Set(commercialCommonSelectedValues(state, commonKey).map(String));
        const visibleLimit = commonKey === "Options" ? 12 : (commonKey === "Color" || commonKey === "Manufacturer" ? 10 : Number.POSITIVE_INFINITY);
        root.innerHTML = items.map((item, index) => {
          const value = item.value || item.label || "";
          const extraAttr = Number.isFinite(visibleLimit) && index >= visibleLimit ? " data-mobile-filter-extra" : "";
          return `
            <button class="mobileOptionButton${selectedValues.has(String(value)) ? " is-selected" : ""}" type="button" data-mobile-commercial-common-key="${escapeHtml(commonKey)}" data-mobile-commercial-common-value="${escapeHtml(value)}"${extraAttr}>
              ${mobileGenericLabelMarkup(commonKey === "Color" ? "ext-color" : commonKey, item.label || value)}
              <span class="mobileOptionCount">${item.count || ""}</span>
            </button>
          `;
        }).join("") + (Number.isFinite(visibleLimit) && items.length > visibleLimit
          ? `<button class="mobileFilterMoreButton" type="button" data-mobile-filter-more data-collapsed-label="${escapeHtml(sheetTitle)} 더보기" data-expanded-label="${escapeHtml(sheetTitle)} 접기" aria-expanded="false">${escapeHtml(sheetTitle)} 더보기</button>`
          : "");
        return;
      }
      if (type === "standard") {
        const options = commercialOptionList(state, "loadStandardCode");
        root.innerHTML = options.length
          ? commercialOptionMarkup(state, "loadStandardCode", options, "", 12)
          : `<div class="commercialModalEmpty">상세 형식 선택 후 사용할 수 있습니다.</div>`;
        return;
      }
      root.innerHTML = renderCommercialTree(state);
      return;
    }
    root.classList.remove("is-commercial-filter-list");
    if (title) title.textContent = config.title;
    root.dataset.genericType = type;
    root.classList.toggle("has-price-range", type === "price");
    root.classList.toggle("is-single-column", type === "plate");
    const rangePanel = type === "price" ? renderMobilePriceRange(state) : renderMobileRangePanel(type, state);
    if (type === "plate") {
      root.innerHTML = rangePanel;
      return;
    }
    const options = getGenericOptions(config);
    const visibleLimit = type === "option" ? 8 : (type === "ext-color" || type === "int-color" ? 5 : Number.POSITIVE_INFINITY);
    const normalizedOptions = passiveFilterTypes.has(type) ? [["전체", "", data.totalCount], ...options] : options;
    const optionMarkup = normalizedOptions.map(([label, value, count], index) => {
      const extraAttr = index > visibleLimit ? " data-mobile-filter-extra" : "";
      return `
        <button class="mobileOptionButton${genericOptionSelected(state, type, value) ? " is-selected" : ""}" type="button" data-generic-value="${value}"${extraAttr}>
          ${mobileGenericLabelMarkup(type, label)}
          <span class="mobileOptionCount">${count || ""}</span>
        </button>
      `;
    }).join("");
    const moreButton = Number.isFinite(visibleLimit) && normalizedOptions.length > visibleLimit + 1
      ? `<button class="mobileFilterMoreButton" type="button" data-mobile-filter-more data-collapsed-label="${config.title} 더보기" data-expanded-label="${config.title} 접기" aria-expanded="false">${config.title} 더보기</button>`
      : "";
    root.innerHTML = rangePanel + optionMarkup + moreButton;
  }

  function rangeLabel(min, max, unit) {
    if (min && max) return `${min.toLocaleString("ko-KR")}${unit}~${max.toLocaleString("ko-KR")}${unit}`;
    if (min) return `${min.toLocaleString("ko-KR")}${unit}~`;
    if (max) return `${max.toLocaleString("ko-KR")}${unit}`;
    return "";
  }

  function priceRangeLabel(min, max) {
    if (min && max) return `${min.toLocaleString("ko-KR")}만원~${max.toLocaleString("ko-KR")}만원`;
    if (min) return `${min.toLocaleString("ko-KR")}만원 이상`;
    if (max) return `${max.toLocaleString("ko-KR")}만원 이하`;
    return "";
  }

  function currentMobilePriceRange(state) {
    return {
      min: state.priceMin || 0,
      max: state.priceMax || mobilePriceSliderMax
    };
  }

  function mobilePriceValueText(value) {
    if (value >= mobilePriceSliderMax) return "1억원 이상";
    if (!value) return "0만원";
    return `${value.toLocaleString("ko-KR")}만원`;
  }

  function normalizeMobilePriceValue(value) {
    const number = Number(value) || 0;
    const snapped = Math.round(number / mobilePriceSliderStep) * mobilePriceSliderStep;
    return Math.max(0, Math.min(mobilePriceSliderMax, snapped));
  }

  function mobilePriceValueFromPoint(track, clientX) {
    const rect = track.getBoundingClientRect();
    const ratio = rect.width ? (clientX - rect.left) / rect.width : 0;
    return normalizeMobilePriceValue(ratio * mobilePriceSliderMax);
  }

  function chooseMobilePriceHandle(state, value) {
    const { min, max } = currentMobilePriceRange(state);
    return Math.abs(value - min) <= Math.abs(value - max) ? "min" : "max";
  }

  function mobilePriceGenericKey(min, max) {
    if (!min && !max) return "";
    const options = getGenericOptions(genericSheetConfigs.price);
    const match = options.find(([, optionValue]) => {
      const [rawMin, rawMax] = String(optionValue || "").split("-");
      const optionMin = rawMin ? Number(rawMin) : null;
      const optionMax = rawMax ? Number(rawMax) : null;
      return (optionMin || null) === (min || null) && (optionMax || null) === (max || null);
    });
    if (match) return String(match[1]);
    return `${min || ""}-${max || ""}`;
  }

  function setMobilePriceRangeState(state, min, max) {
    const nextMin = normalizeMobilePriceValue(Math.min(min, max));
    const nextMax = normalizeMobilePriceValue(Math.max(min, max));
    state.priceMin = nextMin > 0 ? nextMin : null;
    state.priceMax = nextMax < mobilePriceSliderMax ? nextMax : null;
    state.priceLabel = priceRangeLabel(state.priceMin, state.priceMax);
    const key = mobilePriceGenericKey(state.priceMin, state.priceMax);
    if (key) state.generic.price = key;
    else delete state.generic.price;
  }

  function updateMobilePriceRangeValue(state, root, handle, value) {
    const current = currentMobilePriceRange(state);
    if (handle === "min") setMobilePriceRangeState(state, Math.min(value, current.max), current.max);
    else setMobilePriceRangeState(state, current.min, Math.max(value, current.min));
    syncMobilePriceRangeUi(root, state);
    renderRows(state);
  }

  function syncMobilePriceRangeUi(root, state) {
    if (!root || root.dataset.genericType !== "price") return;
    const { min, max } = currentMobilePriceRange(state);
    const minPercent = priceRangePercent(min, 0);
    const maxPercent = priceRangePercent(max, 100);
    const label = qs(".mobilePriceRangeLabel strong", root);
    const fill = qs(".mobilePriceRangeFill", root);
    const minHandle = qs('[data-mobile-price-handle="min"]', root);
    const maxHandle = qs('[data-mobile-price-handle="max"]', root);
    if (label) label.textContent = state.priceLabel || priceRangeLabel(state.priceMin, state.priceMax) || "전체 가격";
    if (fill) {
      fill.style.left = `${minPercent}%`;
      fill.style.right = `${100 - maxPercent}%`;
    }
    [
      [minHandle, min, minPercent],
      [maxHandle, max, maxPercent]
    ].forEach(([handle, value, percent]) => {
      if (!handle) return;
      handle.style.left = `${percent}%`;
      handle.setAttribute("aria-valuenow", String(value));
      handle.setAttribute("aria-valuetext", mobilePriceValueText(value));
    });
    qsa(".mobileOptionButton", root).forEach((button) => {
      button.classList.toggle("is-selected", genericOptionSelected(state, "price", button.dataset.genericValue || ""));
    });
  }

  function syncPcLeftRegionUi(state) {
    const selected = state.region || "전국";
    qsa("[data-pc-left-region]").forEach((input) => {
      input.checked = input.value === selected || (!state.region && input.value === "전국");
    });
  }

  function syncPcLeftFuelSellerUi(state) {
    qsa("[data-left-fuel]").forEach((input) => {
      input.checked = Boolean(state.fuel) && input.value === state.fuel;
    });
    qsa("[data-left-seller]").forEach((input) => {
      input.checked = state.seller !== "all" && input.value === state.seller;
    });
  }

  function populateSelectOptions(select, values, placeholder, formatter = (value) => value) {
    if (!select || select.dataset.populated === "true") return;
    select.innerHTML = `<option value="">${placeholder}</option>${values.map((value) => `<option value="${value}">${formatter(value)}</option>`).join("")}`;
    select.dataset.populated = "true";
  }

  function populateLeftRangeSelects() {
    qsa("[data-left-year-select]").forEach((select) => {
      populateSelectOptions(select, pcYearRangeOptions, "년", (value) => `${value}년`);
    });
    qsa("[data-left-month-select]").forEach((select) => {
      populateSelectOptions(select, pcMonthRangeOptions, "월", (value) => `${value}월`);
    });
    qsa("[data-left-mileage-select]").forEach((select) => {
      populateSelectOptions(select, pcMileageRangeOptions, "선택", (value) => `${value.toLocaleString("ko-KR")} km`);
    });
  }

  function clearLeftPanelControls() {
    qsa("[data-left-filter], [data-left-fuel], [data-left-seller], [data-commercial-common-filter]").forEach((input) => {
      input.checked = false;
    });
    qsa("[data-left-year-select], [data-left-month-select], [data-left-mileage-select]").forEach((select) => {
      select.value = "";
    });
    const keyword = qs("#leftKeywordSearch");
    if (keyword) keyword.value = "";
    qsa("[data-filter-more]").forEach((button) => setFilterMoreState(button, false));
  }

  function setFilterMoreState(button, expanded) {
    const body = button.closest(".filterPanelBody");
    if (body) body.classList.toggle("is-expanded", expanded);
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    button.textContent = expanded
      ? button.dataset.expandedLabel || "접기"
      : button.dataset.collapsedLabel || "더보기";
  }

  function syncPcLeftRangeSelects(state) {
    const yearMin = qs("[data-left-year-min]");
    const yearMax = qs("[data-left-year-max]");
    const mileageMin = qs("[data-left-mileage-min]");
    const mileageMax = qs("[data-left-mileage-max]");
    if (yearMin) yearMin.value = state.yearMin ? String(state.yearMin) : "";
    if (yearMax) yearMax.value = state.yearMax ? String(state.yearMax) : "";
    if (mileageMin) mileageMin.value = state.mileageMin ? String(state.mileageMin) : "";
    if (mileageMax) mileageMax.value = state.mileageMax ? String(state.mileageMax) : "";
  }

  function syncPcLeftPriceRangeUi(state) {
    const root = qs("[data-pc-left-price-range]");
    if (!root) return;
    const { min, max } = currentMobilePriceRange(state);
    const minPercent = priceRangePercent(min, 0);
    const maxPercent = priceRangePercent(max, 100);
    const fill = qs("[data-pc-left-price-fill]", root);
    const minHandle = qs('[data-pc-left-price-handle="min"]', root);
    const maxHandle = qs('[data-pc-left-price-handle="max"]', root);
    const minInput = qs("[data-pc-left-price-min-input]", root);
    const maxInput = qs("[data-pc-left-price-max-input]", root);
    if (fill) {
      fill.style.left = `${minPercent}%`;
      fill.style.right = `${100 - maxPercent}%`;
    }
    if (minInput) minInput.value = String(min);
    if (maxInput) maxInput.value = String(max);
    [
      [minHandle, min, minPercent],
      [maxHandle, max, maxPercent]
    ].forEach(([handle, value, percent]) => {
      if (!handle) return;
      handle.style.left = `${percent}%`;
      handle.setAttribute("aria-valuenow", String(value));
      handle.setAttribute("aria-valuetext", mobilePriceValueText(value));
    });
  }

  function applyPcLeftPriceInputs(state, root) {
    const minInput = qs("[data-pc-left-price-min-input]", root);
    const maxInput = qs("[data-pc-left-price-max-input]", root);
    const min = normalizeMobilePriceValue(minInput?.value || 0);
    const max = normalizeMobilePriceValue(maxInput?.value || mobilePriceSliderMax);
    setMobilePriceRangeState(state, min, max);
    renderRows(state);
  }

  function updatePcLeftPriceRangeValue(state, handle, value) {
    const current = currentMobilePriceRange(state);
    if (handle === "min") setMobilePriceRangeState(state, Math.min(value, current.max), current.max);
    else setMobilePriceRangeState(state, current.min, Math.max(value, current.min));
    renderRows(state);
  }

  function setupPcLeftPriceRange(state) {
    const root = qs("[data-pc-left-price-range]");
    if (!root) return;
    let priceDrag = null;

    const finishPcPriceDrag = () => {
      if (!priceDrag) return;
      priceDrag.track.classList.remove("is-dragging");
      priceDrag = null;
    };

    root.addEventListener("change", (event) => {
      if (event.target.closest("[data-pc-left-price-min-input], [data-pc-left-price-max-input]")) {
        applyPcLeftPriceInputs(state, root);
      }
    });

    root.addEventListener("pointerdown", (event) => {
      const track = event.target.closest("[data-pc-left-price-track]");
      if (!track) return;
      const value = mobilePriceValueFromPoint(track, event.clientX);
      const directHandle = event.target.closest("[data-pc-left-price-handle]")?.dataset.pcLeftPriceHandle;
      const handle = directHandle || chooseMobilePriceHandle(state, value);
      finishPcPriceDrag();
      priceDrag = { track, handle };
      track.classList.add("is-dragging");
      try {
        track.setPointerCapture?.(event.pointerId);
      } catch (error) {
        // Pointer capture can fail on synthetic events; document listeners keep the drag usable.
      }
      updatePcLeftPriceRangeValue(state, handle, value);
      event.preventDefault();
    });

    root.addEventListener("keydown", (event) => {
      const handle = event.target.closest("[data-pc-left-price-handle]");
      if (!handle) return;
      const handleType = handle.dataset.pcLeftPriceHandle || "max";
      const { min, max } = currentMobilePriceRange(state);
      const current = handleType === "min" ? min : max;
      let next = current;
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = current - (event.shiftKey ? 500 : mobilePriceSliderStep);
      else if (event.key === "ArrowRight" || event.key === "ArrowUp") next = current + (event.shiftKey ? 500 : mobilePriceSliderStep);
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = mobilePriceSliderMax;
      else return;
      updatePcLeftPriceRangeValue(state, handleType, next);
      event.preventDefault();
    });

    document.addEventListener("pointermove", (event) => {
      if (!priceDrag) return;
      updatePcLeftPriceRangeValue(state, priceDrag.handle, mobilePriceValueFromPoint(priceDrag.track, event.clientX));
      event.preventDefault();
    });

    document.addEventListener("pointerup", finishPcPriceDrag);
    document.addEventListener("pointercancel", finishPcPriceDrag);
    syncPcLeftPriceRangeUi(state);
  }

  function pcFilterApplyLabel(type, countText) {
    if (type === "fuel" || type === "seller" || type === "category") return `확인 ${countText}`;
    return `${countText} 보기`;
  }

  function updatePcFilterApplyCount(countText) {
    const count = qs("#pcFilterApplyCount");
    if (!count) return;
    const type = qs("#pcFilterModalLayer")?.dataset.pcFilterType || "";
    count.textContent = pcFilterApplyLabel(type, countText);
  }

  function selectOptions(options, placeholder, selectedValue) {
    const selected = String(selectedValue || "");
    return `
      <option value="">${placeholder}</option>
      ${options.map((value) => `
        <option value="${value}"${selected === String(value) ? " selected" : ""}>${String(value).toLocaleString("ko-KR")}</option>
      `).join("")}
    `;
  }

  function brandLogoMarkup(label) {
    const src = pcBrandLogos[label];
    if (src) return `<img class="pcFilterBrandLogoImage" src="${src}" alt="${label} 로고" loading="lazy" decoding="async">`;
    return `<span class="pcFilterLogoMark">${label.slice(0, 1)}</span>`;
  }

  function filterBrandLabelMarkup(label) {
    const src = filterBrandLogos[label];
    const brandLogoClass = filterBrandLogoClasses[label] || "";
    const logo = src ? `<span class="filterBrandLogoBox"><img class="filterBrandLogoImage ${brandLogoClass}" src="${src}" alt="" loading="lazy" decoding="async"></span>` : "";
    return `<span class="filterBrandLabel">${logo}<span class="filterBrandText">${label}</span></span>`;
  }

  function priceSelectOptions(placeholder, selectedValue) {
    const selected = String(selectedValue || "");
    return `
      <option value="">${placeholder}</option>
      ${pcPriceRangeOptions.map((value) => `
        <option value="${value}"${selected === String(value) ? " selected" : ""}>${value.toLocaleString("ko-KR")}</option>
      `).join("")}
    `;
  }

  function priceRangePercent(value, fallback) {
    if (!value) return fallback;
    return Math.max(0, Math.min(100, (Number(value) / 10000) * 100));
  }

  function resetSingleFilter(state, type) {
    const commonKey = commercialCommonKey(type);
    if (commonKey) {
      state.commercialFilters = state.commercialFilters || {};
      delete state.commercialFilters[commonKey];
      return;
    }
    if (type === "category") state.category = "all";
    if (type === "brand" || type === "maker") state.brand = "";
    if (type === "vehicleType1" || type === "vehicleType1Id") {
      state.vehicleType1Id = "";
      state.vehicleType2Id = "";
      state.payloadCapacityCode = "";
      state.loadStandardCode = "";
    }
    if (type === "vehicleType2" || type === "vehicleType2Id") {
      state.vehicleType2Id = "";
      state.payloadCapacityCode = "";
      state.loadStandardCode = "";
    }
    if (type === "payload" || type === "payloadCapacityCode") state.payloadCapacityCode = "";
    if (type === "standard" || type === "loadStandardCode") state.loadStandardCode = "";
    if (type === "region") {
      state.region = "전국";
      delete state.generic.region;
    }
    if (type === "year") {
      state.yearMin = null;
      state.yearMax = null;
      state.yearLabel = "";
      delete state.generic.year;
    }
    if (type === "mileage") {
      state.mileageMin = null;
      state.mileageMax = null;
      delete state.generic.mileage;
    }
    if (type === "price") {
      state.priceMin = null;
      state.priceMax = null;
      state.priceLabel = "";
      delete state.generic.price;
    }
    if (type === "fuel") {
      state.fuel = "";
      delete state.generic.fuel;
    }
    if (type === "seller") {
      state.seller = "all";
      delete state.generic.seller;
    }
    if (type === "plate") {
      state.plate = "";
      state.leftKeyword = "";
      delete state.generic.plate;
      const keyword = qs("#leftKeywordSearch");
      if (keyword) keyword.value = "";
    }
    if (passiveFilterTypes.has(type)) {
      syncLeftFilterValue(type, "");
      if (type === "option") state.option = "";
      if (type === "history") state.feature = "";
      delete state.generic[type];
    }
  }

  function renderPcMakerModal(state) {
    const groups = [
      ["국산", data.filters?.domestic || []],
      ["수입", data.filters?.imported || []]
    ];
    return `
      <div class="pcFilterMakerList">
        ${groups.map(([title, items]) => `
          <div class="pcFilterGroupTitle">${title}</div>
          <div class="pcFilterMakerItems">
          ${items.map(([label, count]) => `
            <button class="pcFilterOptionButton${state.brand === label ? " is-selected" : ""}" type="button" data-pc-brand="${label}" ${count === "0" ? "disabled" : ""}>
              ${brandLogoMarkup(label)}
              <span>${label}</span>
            </button>
          `).join("")}
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderPcYearModal(state) {
    return `
      <div class="pcQuickFilterPanel pcYearFilterPanel">
        <div class="pcYearRangeRows">
          <div class="pcYearRangeRow">
            <label class="pcYearSelectBox">
              <select class="pcYearSelect" data-pc-year-min aria-label="시작 연식 연도">
                ${selectOptions(pcYearRangeOptions, "년", state.yearMin)}
              </select>
              <span class="pcPriceChevron" aria-hidden="true"></span>
            </label>
            <label class="pcYearSelectBox">
              <select class="pcYearSelect" data-pc-year-month-min aria-label="시작 연식 월">
                ${selectOptions(pcMonthRangeOptions, "월", "")}
              </select>
              <span class="pcPriceChevron" aria-hidden="true"></span>
            </label>
            <span class="pcYearRangeText">부터</span>
          </div>
          <div class="pcYearRangeRow">
            <label class="pcYearSelectBox">
              <select class="pcYearSelect" data-pc-year-max aria-label="종료 연식 연도">
                ${selectOptions(pcYearRangeOptions, "년", state.yearMax)}
              </select>
              <span class="pcPriceChevron" aria-hidden="true"></span>
            </label>
            <label class="pcYearSelectBox">
              <select class="pcYearSelect" data-pc-year-month-max aria-label="종료 연식 월">
                ${selectOptions(pcMonthRangeOptions, "월", "")}
              </select>
              <span class="pcPriceChevron" aria-hidden="true"></span>
            </label>
            <span class="pcYearRangeText">까지</span>
          </div>
        </div>
        ${isCommercialMode(state) ? "" : `<div class="pcYearPresetGrid">
          ${pcYearOptions.map(([label, key, min, max]) => {
            if (!key) return "";
            const selected = key
              ? state.yearLabel === label
              : !state.yearMin && !state.yearMax;
            return `<button class="pcYearPreset${selected ? " is-selected" : ""}" type="button" data-pc-year-key="${key}" data-pc-year-min-value="${min || ""}" data-pc-year-max-value="${max || ""}" data-pc-label="${label}">${label}</button>`;
          }).join("")}
        </div>`}
      </div>
    `;
  }

  function renderPcPriceModal(state) {
    const minPercent = priceRangePercent(state.priceMin, 0);
    const maxPercent = priceRangePercent(state.priceMax, 100);
    return `
      <div class="pcQuickFilterPanel pcPriceFilterPanel">
        <div class="pcPriceTabs" aria-label="가격 판매방식">
          <button class="is-active" type="button">일반</button>
          <button type="button" data-toast="리스 / 렌트 가격 조건은 시안에서 준비 중입니다.">리스 / 렌트</button>
        </div>
        <div class="pcPriceRangeRow">
          <label class="pcPriceSelectBox">
            <select class="pcPriceSelect" data-pc-price-min aria-label="최저 가격">
              ${priceSelectOptions("최저", state.priceMin)}
            </select>
            <span class="pcPriceUnit">만원</span>
            <span class="pcPriceChevron" aria-hidden="true"></span>
          </label>
          <span class="pcPriceRangeText">부터</span>
          <label class="pcPriceSelectBox">
            <select class="pcPriceSelect" data-pc-price-max aria-label="최대 가격">
              ${priceSelectOptions("최대", state.priceMax)}
            </select>
            <span class="pcPriceUnit">만원</span>
            <span class="pcPriceChevron" aria-hidden="true"></span>
          </label>
          <span class="pcPriceRangeText">까지</span>
        </div>
        <div class="pcPriceRangeSlider" aria-hidden="true">
          <span class="pcPriceRangeFill" style="left:${minPercent}%;right:${100 - maxPercent}%;"></span>
          <span class="pcPriceHandle" style="left:${minPercent}%;"></span>
          <span class="pcPriceHandle" style="left:${maxPercent}%;"></span>
        </div>
        <div class="pcPricePresetGrid">
          ${pcPriceOptions.map(([label, key, min, max]) => {
            const selected = key
              ? state.priceLabel === label
              : !state.priceMin && !state.priceMax;
            return `<button class="pcPricePreset${selected ? " is-selected" : ""}" type="button" data-pc-price-key="${key}" data-pc-price-min-value="${min || ""}" data-pc-price-max-value="${max || ""}" data-pc-label="${label}">${label}</button>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderPcMileageModal(state) {
    return `
      <div class="pcQuickFilterPanel pcYearFilterPanel">
        <div class="pcYearRangeRows">
          <div class="pcMileageRangeRow">
            <label class="pcYearSelectBox">
              <select class="pcYearSelect" data-pc-mileage-min aria-label="최소 주행거리">
                ${renderMobileSelectOptions(pcMileageRangeOptions, "최소", state.mileageMin, (value) => `${value.toLocaleString("ko-KR")} km`)}
              </select>
              <span class="pcPriceChevron" aria-hidden="true"></span>
            </label>
            <span class="pcYearRangeText">부터</span>
          </div>
          <div class="pcMileageRangeRow">
            <label class="pcYearSelectBox">
              <select class="pcYearSelect" data-pc-mileage-max aria-label="최대 주행거리">
                ${renderMobileSelectOptions(pcMileageRangeOptions, "최대", state.mileageMax, (value) => `${value.toLocaleString("ko-KR")} km`)}
              </select>
              <span class="pcPriceChevron" aria-hidden="true"></span>
            </label>
            <span class="pcYearRangeText">까지</span>
          </div>
        </div>
        <div class="pcYearPresetGrid">
          ${getGenericOptions(genericSheetConfigs.mileage).map(([label, value, count]) => `
            <button class="pcYearPreset${String(state.generic?.mileage || "") === String(value) ? " is-selected" : ""}" type="button" data-pc-generic-value="${value}">
              <span>${label}</span>
              <span class="pcFilterCount">${count || ""}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  function pcGenericLabelMarkup(type, label) {
    if (type === "ext-color" || type === "int-color") {
      return `<span class="pcFilterChoiceLabel"><i class="filterColorSwatch ${colorSwatchClass(label)}"></i>${label}</span>`;
    }
    return `<span>${label}</span>`;
  }

  function renderPcGenericModal(state, type) {
    const config = genericSheetConfigs[type] || genericSheetConfigs.category;
    const options = getGenericOptions(config);
    const visibleLimit = type === "option" ? 8 : (type === "ext-color" || type === "int-color" ? 5 : Number.POSITIVE_INFINITY);
    const normalizedOptions = passiveFilterTypes.has(type) ? [["전체", "", data.totalCount], ...options] : options;
    return `
      <div class="pcFilterChoiceList${type === "ext-color" || type === "int-color" ? " is-color-list" : ""}" data-pc-generic-list>
        ${normalizedOptions.map(([label, value, count], index) => {
          const extraAttr = index > visibleLimit ? " data-pc-filter-extra" : "";
          return `
            <button class="pcFilterChoiceButton${genericOptionSelected(state, type, value) ? " is-selected" : ""}${count === "0" ? " is-disabled" : ""}" type="button" data-pc-generic-value="${value}"${count === "0" ? " disabled" : ""}${extraAttr}>
              <span class="pcFilterCheckbox" aria-hidden="true"></span>
              ${pcGenericLabelMarkup(type, label)}
              <span class="pcFilterCount">${count || ""}</span>
            </button>
          `;
        }).join("")}
        ${Number.isFinite(visibleLimit) && normalizedOptions.length > visibleLimit + 1
          ? `<button class="pcFilterMoreButton" type="button" data-pc-filter-more data-collapsed-label="${config.title} 더보기" data-expanded-label="${config.title} 접기" aria-expanded="false">${config.title} 더보기</button>`
          : ""}
      </div>
    `;
  }

  function renderPcKeywordModal(state) {
    return `
      <div class="pcKeywordPanel">
        <label>
          <span>차량번호 또는 판매자 이름</span>
          <input type="search" data-pc-keyword-input value="${escapeHtml(state.leftKeyword)}" placeholder="예) 12가1234, 이은호">
        </label>
        <button type="button" data-pc-keyword-apply>검색</button>
      </div>
    `;
  }

  function renderPcCheckModal(state, type) {
    const options = type === "seller" ? pcSellerOptions : pcFuelOptions;
    const selectedValue = type === "seller" ? state.seller : state.fuel;
    return `
      <div class="pcFilterChoiceList">
        ${options.map(([label, value, count]) => {
          const selected = type === "seller"
            ? selectedValue === value
            : selectedValue === value;
          const disabled = count === "0";
          return `
            <button class="pcFilterChoiceButton${selected ? " is-selected" : ""}${disabled ? " is-disabled" : ""}" type="button" data-pc-${type}="${value}" ${disabled ? "disabled" : ""}>
              <span class="pcFilterCheckbox" aria-hidden="true"></span>
              <span>${label}</span>
              <span class="pcFilterCount">${count || ""}</span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderPcCommercialModal(state, type) {
    if (type === "vehicleType1" || type === "vehicleType2" || type === "payload") {
      return renderCommercialTree(state, true);
    }
    const field = type === "vehicleType1" ? "vehicleType1Id"
      : type === "vehicleType2" ? "vehicleType2Id"
        : type === "payload" ? "payloadCapacityCode"
          : "loadStandardCode";
    const options = field === "vehicleType1Id"
      ? commercialTypes.map((item) => ({ ...item, value: item.code }))
      : field === "vehicleType2Id"
        ? commercialChildrenForState(state).map((item) => ({ ...item, value: item.code }))
        : commercialOptionList(state, field);
    const emptyText = field === "vehicleType2Id" ? "1차 형식을 먼저 선택하세요." : "상세 형식 선택 후 사용할 수 있습니다.";
    if (!options.length) return `<div class="commercialModalEmpty">${emptyText}</div>`;
    return `
      <div class="pcFilterChoiceList commercialPcChoiceList">
        ${options.map((item) => {
          const selected = String(state[field] || "") === String(item.value || "");
          return `
            <button class="pcFilterChoiceButton${selected ? " is-selected" : ""}" type="button" data-pc-commercial-field="${field}" data-pc-commercial-value="${escapeHtml(item.value || "")}">
              <span class="pcFilterCheckbox" aria-hidden="true"></span>
              <span>${escapeHtml(item.label)}</span>
              <span class="pcFilterCount">${item.count || ""}</span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderPcCommercialCommonModal(state, key) {
    const config = commercialCommonConfig(key);
    const items = config?.items || [];
    if (!items.length) return `<div class="commercialModalEmpty">선택 가능한 조건이 없습니다.</div>`;
    const selectedValues = new Set(commercialCommonSelectedValues(state, key).map(String));
    const visibleLimit = key === "Options" ? 12 : (key === "Color" || key === "Manufacturer" ? 10 : Number.POSITIVE_INFINITY);
    return `
      <div class="pcFilterChoiceList commercialPcChoiceList${key === "Color" ? " is-color-list" : ""}" data-pc-generic-list>
        ${items.map((item, index) => {
          const value = item.value || item.label || "";
          const extraAttr = Number.isFinite(visibleLimit) && index >= visibleLimit ? " data-pc-filter-extra" : "";
          return `
            <button class="pcFilterChoiceButton${selectedValues.has(String(value)) ? " is-selected" : ""}" type="button" data-pc-commercial-common-key="${escapeHtml(key)}" data-pc-commercial-common-value="${escapeHtml(value)}"${extraAttr}>
              <span class="pcFilterCheckbox" aria-hidden="true"></span>
              ${pcGenericLabelMarkup(key === "Color" ? "ext-color" : key, item.label || value)}
              <span class="pcFilterCount">${item.count || ""}</span>
            </button>
          `;
        }).join("")}
        ${Number.isFinite(visibleLimit) && items.length > visibleLimit
          ? `<button class="pcFilterMoreButton" type="button" data-pc-filter-more data-collapsed-label="${escapeHtml(config.label)} 더보기" data-expanded-label="${escapeHtml(config.label)} 접기" aria-expanded="false">${escapeHtml(config.label)} 더보기</button>`
          : ""}
      </div>
    `;
  }

  function renderPcFilterModal(type, state) {
    const title = qs("#pcFilterModalTitle");
    const body = qs("#pcFilterModalBody");
    const layer = qs("#pcFilterModalLayer");
    if (!title || !body || !layer) return;
    const titles = {
      category: "카테고리",
      maker: "제조사 선택",
      year: "연식",
      mileage: "주행거리",
      price: "가격",
      region: "지역",
      fuel: "연료",
      seller: "판매자구분",
      filter: isCommercialMode(state) ? "화물·특장 필터" : "필터",
      plate: "차량번호/판매자 이름",
      vehicleType1: "형식/적재용량",
      vehicleType2: "형식/적재용량",
      payload: "형식/적재용량",
      standard: "축장/규격"
    };
    const commonKey = commercialCommonKey(type);
    layer.dataset.pcFilterType = type;
    title.textContent = commonKey ? commercialCommonConfig(commonKey)?.label || "조건 선택" : titles[type] || genericSheetConfigs[type]?.title || "조건 선택";
    if (type === "filter" && isCommercialMode(state)) body.innerHTML = renderCommercialFilterSheetBody(state);
    else if (type === "maker") body.innerHTML = renderPcMakerModal(state);
    else if (type === "year") body.innerHTML = renderPcYearModal(state);
    else if (type === "mileage") body.innerHTML = renderPcMileageModal(state);
    else if (type === "price") body.innerHTML = renderPcPriceModal(state);
    else if (type === "fuel" || type === "seller") body.innerHTML = renderPcCheckModal(state, type);
    else if (type === "plate") body.innerHTML = renderPcKeywordModal(state);
    else if (commonKey) body.innerHTML = renderPcCommercialCommonModal(state, commonKey);
    else if (commercialModalTypes.has(type)) body.innerHTML = renderPcCommercialModal(state, type);
    else if (genericSheetConfigs[type]) body.innerHTML = renderPcGenericModal(state, type);
    else {
      const config = genericSheetConfigs.category;
      body.innerHTML = `
        <div class="pcFilterCheckGrid">
          ${getGenericOptions(config).map(([label, value, count]) => `
            <button class="pcFilterCheckButton${(state.category || "all") === value ? " is-selected" : ""}" type="button" data-pc-category="${value}">
              <span>${label}</span>
              <span class="pcFilterCount">${count || ""}</span>
            </button>
          `).join("")}
        </div>
      `;
    }
    updatePcFilterApplyCount(qs("#visibleCount")?.textContent?.trim() || `${data.totalCount}대`);
    setupGenericActions();
  }

  function setupPcFilterChips(state) {
    const chips = qs("#pcFilterChips");
    const layer = qs("#pcFilterModalLayer");
    if (!chips || !layer) return;

    const openPcFilter = (type) => {
      renderPcFilterModal(type, state);
      layer.classList.add("is-open");
      layer.setAttribute("aria-hidden", "false");
      document.body.classList.add("pc-filter-open");
    };

    const closePcFilter = () => {
      layer.classList.remove("is-open");
      layer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("pc-filter-open");
      delete layer.dataset.pcFilterType;
    };

    chips.addEventListener("click", (event) => {
      const clearButton = event.target.closest("[data-clear-filter]");
      if (clearButton) {
        const rect = clearButton.getBoundingClientRect();
        if (event.clientX <= rect.right - 30) {
          const filterButton = event.target.closest("[data-pc-filter]");
          if (filterButton) openPcFilter(filterButton.dataset.pcFilter || "maker");
          return;
        }
        event.stopPropagation();
        resetSingleFilter(state, clearButton.dataset.clearFilter || "");
        if (isCommercialMode(state)) {
          refreshCommercialLeftPanel(state);
          syncCommercialUrlParams(state);
        }
        renderRows(state);
        renderMobileMakerList(state);
        renderMobileRegionGrid(state);
        renderMobileSortList(state);
        showToast("선택한 조건을 해제했습니다.");
        return;
      }
      const filterButton = event.target.closest("[data-pc-filter]");
      if (filterButton) {
        openPcFilter(filterButton.dataset.pcFilter || "maker");
        return;
      }
      if (event.target.closest("[data-pc-filter-menu]")) {
        if (isCommercialMode(state)) {
          openPcFilter("filter");
          return;
        }
        qs(".filterPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
        showToast("좌측 필터에서 상세 조건을 선택하세요.");
      }
    });

    layer.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-pc-filter]")) {
        closePcFilter();
        return;
      }
      if (event.target.closest("[data-reset-pc-filter]")) {
        const type = layer.dataset.pcFilterType || "";
        if (type === "filter" && isCommercialMode(state)) resetFilterState(state);
        else resetSingleFilter(state, type);
        if (isCommercialMode(state)) {
          refreshCommercialLeftPanel(state);
          syncCommercialUrlParams(state);
        }
        syncPcLeftRangeSelects(state);
        renderRows(state);
        renderMobileMakerList(state);
        renderMobileRegionGrid(state);
        renderMobileSortList(state);
        renderPcFilterModal(type, state);
        showToast("선택한 조건을 초기화했습니다.");
        return;
      }

      const filterToggle = event.target.closest("#pcFilterModalBody .filterToggle");
      if (filterToggle) {
        filterToggle.closest(".filterItem")?.classList.toggle("is-open");
        return;
      }

      const commercialClearButton = event.target.closest("#pcFilterModalBody [data-commercial-clear-field]");
      if (commercialClearButton) {
        const type = layer.dataset.pcFilterType || "filter";
        resetSingleFilter(state, commercialClearButton.dataset.commercialClearField || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        renderPcFilterModal(type, state);
        return;
      }

      const brandButton = event.target.closest("[data-pc-brand]");
      if (brandButton && !brandButton.disabled) {
        state.brand = state.brand === brandButton.dataset.pcBrand ? "" : brandButton.dataset.pcBrand;
        renderRows(state);
        renderPcFilterModal("maker", state);
        renderMobileMakerList(state);
        return;
      }

      const commercialButton = event.target.closest("[data-pc-commercial-field]");
      if (commercialButton && !commercialButton.disabled) {
        const type = layer.dataset.pcFilterType || "";
        applyCommercialFilter(state, commercialButton.dataset.pcCommercialField || "", commercialButton.dataset.pcCommercialValue || "");
        syncCommercialUrlParams(state);
        renderRows(state);
        renderPcFilterModal(type, state);
        return;
      }

      const commercialCommonButton = event.target.closest("[data-pc-commercial-common-key]");
      if (commercialCommonButton && !commercialCommonButton.disabled) {
        const type = layer.dataset.pcFilterType || "";
        applyCommercialCommonFilter(state, commercialCommonButton.dataset.pcCommercialCommonKey || "", commercialCommonButton.dataset.pcCommercialCommonValue || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        renderPcFilterModal(type, state);
        return;
      }

      const categoryButton = event.target.closest("[data-pc-category]");
      if (categoryButton) {
        const nextCategory = categoryButton.dataset.pcCategory || "all";
        if ((state.category === "truck") !== (nextCategory === "truck")) {
          window.location.href = `bobaedream-used-car-list.html?category=${encodeURIComponent(nextCategory)}`;
          return;
        }
        state.category = nextCategory;
        state.generic.category = state.category;
        renderRows(state);
        renderPcFilterModal("category", state);
        renderMobileCategoryButtons(state.category === "all" ? "used" : state.category);
        return;
      }

      const moreButton = event.target.closest("[data-pc-filter-more]");
      if (moreButton) {
        const list = moreButton.closest("[data-pc-generic-list]");
        const expanded = moreButton.getAttribute("aria-expanded") !== "true";
        list?.classList.toggle("is-expanded", expanded);
        moreButton.setAttribute("aria-expanded", expanded ? "true" : "false");
        moreButton.textContent = expanded
          ? moreButton.dataset.expandedLabel || "접기"
          : moreButton.dataset.collapsedLabel || "더보기";
        return;
      }

      const genericButton = event.target.closest("[data-pc-generic-value]");
      if (genericButton && !genericButton.disabled) {
        const type = layer.dataset.pcFilterType || "";
        applyGenericSelection(state, type, genericButton.dataset.pcGenericValue || "");
        renderRows(state);
        renderPcFilterModal(type, state);
        if (type === "region") renderMobileRegionGrid(state);
        return;
      }

      const pcKeywordButton = event.target.closest("[data-pc-keyword-apply]");
      if (pcKeywordButton) {
        const activeType = layer.dataset.pcFilterType || "";
        state.leftKeyword = qs("[data-pc-keyword-input]", layer)?.value.trim() || "";
        state.plate = state.leftKeyword ? "keyword" : "";
        const leftKeyword = qs("#leftKeywordSearch");
        if (leftKeyword) leftKeyword.value = state.leftKeyword;
        renderRows(state);
        renderPcFilterModal(activeType === "filter" ? "filter" : "plate", state);
        return;
      }

      const yearButton = event.target.closest("[data-pc-year-key]");
      if (yearButton) {
        state.yearMin = yearButton.dataset.pcYearMinValue ? Number(yearButton.dataset.pcYearMinValue) : null;
        state.yearMax = yearButton.dataset.pcYearMaxValue ? Number(yearButton.dataset.pcYearMaxValue) : null;
        state.yearLabel = yearButton.dataset.pcLabel === "전체" ? "" : yearButton.dataset.pcLabel;
        delete state.generic.year;
        renderRows(state);
        renderPcFilterModal("year", state);
        return;
      }

      const priceButton = event.target.closest("[data-pc-price-key]");
      if (priceButton) {
        state.priceMin = priceButton.dataset.pcPriceMinValue ? Number(priceButton.dataset.pcPriceMinValue) : null;
        state.priceMax = priceButton.dataset.pcPriceMaxValue ? Number(priceButton.dataset.pcPriceMaxValue) : null;
        state.priceLabel = priceButton.dataset.pcLabel === "전체" ? "" : priceButton.dataset.pcLabel;
        delete state.generic.price;
        renderRows(state);
        renderPcFilterModal("price", state);
        return;
      }

      const fuelButton = event.target.closest("[data-pc-fuel]");
      if (fuelButton) {
        state.fuel = fuelButton.dataset.pcFuel || "";
        if (state.fuel === "all") state.fuel = "";
        state.generic.fuel = state.fuel;
        renderRows(state);
        renderPcFilterModal("fuel", state);
        return;
      }

      const sellerButton = event.target.closest("[data-pc-seller]");
      if (sellerButton) {
        state.seller = sellerButton.dataset.pcSeller || "all";
        state.generic.seller = state.seller;
        renderRows(state);
        renderPcFilterModal("seller", state);
      }
    });

    layer.addEventListener("change", (event) => {
      if (event.target.matches("[data-pc-year-min], [data-pc-year-max]")) {
        const activeType = layer.dataset.pcFilterType || "";
        const min = Number(qs("[data-pc-year-min]", layer)?.value || "");
        const max = Number(qs("[data-pc-year-max]", layer)?.value || "");
        state.yearMin = min || null;
        state.yearMax = max || null;
        state.yearLabel = rangeLabel(state.yearMin, state.yearMax, "년");
        delete state.generic.year;
        renderRows(state);
        renderPcFilterModal(activeType === "filter" ? "filter" : "year", state);
      }
      if (event.target.matches("[data-pc-price-min], [data-pc-price-max]")) {
        const min = Number(qs("[data-pc-price-min]", layer)?.value || "");
        const max = Number(qs("[data-pc-price-max]", layer)?.value || "");
        state.priceMin = min || null;
        state.priceMax = max || null;
        state.priceLabel = rangeLabel(state.priceMin, state.priceMax, "만원");
        delete state.generic.price;
        renderRows(state);
        renderPcFilterModal("price", state);
      }
      if (event.target.matches("[data-pc-mileage-min], [data-pc-mileage-max]")) {
        const min = Number(qs("[data-pc-mileage-min]", layer)?.value || "");
        const max = Number(qs("[data-pc-mileage-max]", layer)?.value || "");
        state.mileageMin = min || null;
        state.mileageMax = max || null;
        delete state.generic.mileage;
        renderRows(state);
        renderPcFilterModal("mileage", state);
      }
      if (event.target.matches("#pcFilterModalBody [data-commercial-filter]")) {
        const activeType = layer.dataset.pcFilterType || "filter";
        applyCommercialFilter(state, event.target.dataset.commercialFilter || "", event.target.value || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        renderPcFilterModal(activeType, state);
      }
      if (event.target.matches("#pcFilterModalBody [data-commercial-common-filter]")) {
        const activeType = layer.dataset.pcFilterType || "filter";
        applyCommercialCommonFilter(state, event.target.dataset.commercialCommonFilter || "", event.target.value || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        renderPcFilterModal(activeType, state);
      }
    });

    layer.addEventListener("keydown", (event) => {
      if (!event.target.matches("[data-pc-keyword-input]") || event.key !== "Enter") return;
      const activeType = layer.dataset.pcFilterType || "";
      state.leftKeyword = event.target.value.trim();
      state.plate = state.leftKeyword ? "keyword" : "";
      const leftKeyword = qs("#leftKeywordSearch");
      if (leftKeyword) leftKeyword.value = state.leftKeyword;
      renderRows(state);
      renderPcFilterModal(activeType === "filter" ? "filter" : "plate", state);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && layer.classList.contains("is-open")) closePcFilter();
    });
  }

  function setupMobileList(state) {
    const layer = qs("#mobileSheetLayer");
    if (!qs("[data-mobile-list]") || !layer) return;
    const filterSheetTypes = new Set(["filter", "maker", "region", "generic"]);
    let sheetScrollY = 0;
    let mobilePriceDrag = null;

    renderMobileCategoryButtons(state.category === "all" ? "used" : state.category);
    renderMobileMakerList(state);
    renderMobileRegionGrid(state);
    renderMobileSortList(state);

    const lockSheetScroll = () => {
      if (!document.body.classList.contains("sheet-open")) {
        sheetScrollY = window.scrollY || document.documentElement.scrollTop || 0;
        document.body.style.top = `-${sheetScrollY}px`;
      }
      document.body.classList.add("sheet-open");
    };

    const unlockSheetScroll = () => {
      const savedScrollY = Math.abs(parseInt(document.body.style.top || "0", 10)) || sheetScrollY;
      document.body.classList.remove("sheet-open");
      document.body.style.top = "";
      window.scrollTo(0, savedScrollY);
    };

    const finishMobilePriceDrag = () => {
      if (!mobilePriceDrag) return;
      mobilePriceDrag.track.classList.remove("is-dragging");
      mobilePriceDrag = null;
    };

    const openSheet = (type, triggerType = type) => {
      qsa(".mobileSheet", layer).forEach((sheet) => sheet.classList.toggle("is-active", sheet.dataset.sheet === type));
      layer.dataset.sheetVariant = filterSheetTypes.has(type) ? "filter" : "toolbar";
      layer.dataset.activeSheet = triggerType;
      layer.classList.add("is-open");
      layer.setAttribute("aria-hidden", "false");
      lockSheetScroll();
    };

    const closeSheet = () => {
      finishMobilePriceDrag();
      layer.classList.remove("is-open");
      layer.setAttribute("aria-hidden", "true");
      delete layer.dataset.sheetVariant;
      delete layer.dataset.activeSheet;
      unlockSheetScroll();
      qsa(".mobileSheet", layer).forEach((sheet) => sheet.classList.remove("is-active"));
    };

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-open-sheet]");
      if (!button || !qs("[data-used-car-list]")?.contains(button)) return;
      const type = button.dataset.openSheet;
      if (["filter", "maker", "region", "sort", "view"].includes(type)) {
        if (type === "maker") renderMobileMakerList(state);
        if (type === "region") renderMobileRegionGrid(state);
        if (type === "sort") renderMobileSortList(state);
        if (type === "filter") renderMobileFilterShell(state);
        openSheet(type);
        return;
      }
      renderGenericSheet(type, state);
      openSheet("generic", type);
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

    const genericOptionsRoot = qs("#genericSheetOptions");

    genericOptionsRoot?.addEventListener("click", (event) => {
      const moreButton = event.target.closest("[data-mobile-filter-more]");
      if (moreButton) {
        const expanded = moreButton.getAttribute("aria-expanded") !== "true";
        event.currentTarget.classList.toggle("is-expanded", expanded);
        moreButton.setAttribute("aria-expanded", expanded ? "true" : "false");
        moreButton.textContent = expanded
          ? moreButton.dataset.expandedLabel || "접기"
          : moreButton.dataset.collapsedLabel || "더보기";
        return;
      }

      const treeMoreButton = event.target.closest("[data-filter-more]");
      if (treeMoreButton) {
        const list = treeMoreButton.closest(".filterPanelBody, .commercialFilterTree, #genericSheetOptions") || event.currentTarget;
        const expanded = treeMoreButton.getAttribute("aria-expanded") !== "true";
        list.classList.toggle("is-expanded", expanded);
        treeMoreButton.setAttribute("aria-expanded", expanded ? "true" : "false");
        treeMoreButton.textContent = expanded
          ? treeMoreButton.dataset.expandedLabel || "접기"
          : treeMoreButton.dataset.collapsedLabel || "더보기";
        return;
      }

      const commercialClearButton = event.target.closest("[data-commercial-clear-field]");
      if (commercialClearButton) {
        const type = event.currentTarget.dataset.genericType || "vehicleType1";
        resetSingleFilter(state, commercialClearButton.dataset.commercialClearField || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        renderGenericSheet(type, state);
        return;
      }

      const keywordButton = event.target.closest("[data-mobile-keyword-apply]");
      if (keywordButton) {
        state.leftKeyword = qs("[data-mobile-keyword-input]", event.currentTarget)?.value.trim() || "";
        state.plate = state.leftKeyword ? "keyword" : "";
        const leftKeyword = qs("#leftKeywordSearch");
        if (leftKeyword) leftKeyword.value = state.leftKeyword;
        renderRows(state);
        renderGenericSheet("plate", state);
        return;
      }

      const commercialCommonButton = event.target.closest("[data-mobile-commercial-common-key]");
      if (commercialCommonButton && !commercialCommonButton.disabled) {
        const type = event.currentTarget.dataset.genericType;
        applyCommercialCommonFilter(state, commercialCommonButton.dataset.mobileCommercialCommonKey || "", commercialCommonButton.dataset.mobileCommercialCommonValue || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        renderGenericSheet(type, state);
        return;
      }

      const button = event.target.closest("[data-generic-value]");
      if (!button) return;
      const type = event.currentTarget.dataset.genericType;
      applyGenericSelection(state, type, button.dataset.genericValue || "");
      renderRows(state);
      renderGenericSheet(type, state);
    });

    genericOptionsRoot?.addEventListener("change", (event) => {
      const type = event.currentTarget.dataset.genericType;
      if (type === "year" && event.target.matches("[data-mobile-year-min], [data-mobile-year-max]")) {
        state.yearMin = Number(qs("[data-mobile-year-min]", event.currentTarget)?.value || "") || null;
        state.yearMax = Number(qs("[data-mobile-year-max]", event.currentTarget)?.value || "") || null;
        state.yearLabel = rangeLabel(state.yearMin, state.yearMax, "년");
        delete state.generic.year;
        renderRows(state);
        renderGenericSheet("year", state);
      }
      if (type === "mileage" && event.target.matches("[data-mobile-mileage-min], [data-mobile-mileage-max]")) {
        state.mileageMin = Number(qs("[data-mobile-mileage-min]", event.currentTarget)?.value || "") || null;
        state.mileageMax = Number(qs("[data-mobile-mileage-max]", event.currentTarget)?.value || "") || null;
        delete state.generic.mileage;
        renderRows(state);
        renderGenericSheet("mileage", state);
      }
      if (event.target.matches("[data-commercial-filter]")) {
        applyCommercialFilter(state, event.target.dataset.commercialFilter || "", event.target.value || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        renderGenericSheet(type, state);
      }
      if (event.target.matches("[data-commercial-common-filter]")) {
        applyCommercialCommonFilter(state, event.target.dataset.commercialCommonFilter || "", event.target.value || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        renderGenericSheet(type, state);
      }
    });

    genericOptionsRoot?.addEventListener("keydown", (event) => {
      if (!event.target.matches("[data-mobile-keyword-input]") || event.key !== "Enter") return;
      state.leftKeyword = event.target.value.trim();
      state.plate = state.leftKeyword ? "keyword" : "";
      const leftKeyword = qs("#leftKeywordSearch");
      if (leftKeyword) leftKeyword.value = state.leftKeyword;
      renderRows(state);
      renderGenericSheet("plate", state);
    });

    genericOptionsRoot?.addEventListener("pointerdown", (event) => {
      if (event.currentTarget.dataset.genericType !== "price") return;
      const track = event.target.closest("[data-mobile-price-track]");
      if (!track) return;
      const value = mobilePriceValueFromPoint(track, event.clientX);
      const directHandle = event.target.closest("[data-mobile-price-handle]")?.dataset.mobilePriceHandle;
      const handle = directHandle || chooseMobilePriceHandle(state, value);
      finishMobilePriceDrag();
      mobilePriceDrag = { root: event.currentTarget, track, handle };
      track.classList.add("is-dragging");
      try {
        track.setPointerCapture?.(event.pointerId);
      } catch (error) {
        // Some synthetic pointer events cannot be captured; dragging still works through document listeners.
      }
      updateMobilePriceRangeValue(state, event.currentTarget, handle, value);
      event.preventDefault();
    });

    genericOptionsRoot?.addEventListener("keydown", (event) => {
      const handle = event.target.closest("[data-mobile-price-handle]");
      if (!handle || event.currentTarget.dataset.genericType !== "price") return;
      const handleType = handle.dataset.mobilePriceHandle || "max";
      const { min, max } = currentMobilePriceRange(state);
      const current = handleType === "min" ? min : max;
      let next = current;
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = current - (event.shiftKey ? 500 : mobilePriceSliderStep);
      else if (event.key === "ArrowRight" || event.key === "ArrowUp") next = current + (event.shiftKey ? 500 : mobilePriceSliderStep);
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = mobilePriceSliderMax;
      else return;
      updateMobilePriceRangeValue(state, event.currentTarget, handleType, next);
      event.preventDefault();
    });

    document.addEventListener("pointermove", (event) => {
      if (!mobilePriceDrag) return;
      updateMobilePriceRangeValue(state, mobilePriceDrag.root, mobilePriceDrag.handle, mobilePriceValueFromPoint(mobilePriceDrag.track, event.clientX));
      event.preventDefault();
    });

    document.addEventListener("pointerup", finishMobilePriceDrag);
    document.addEventListener("pointercancel", finishMobilePriceDrag);

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
      const nextCategory = button.dataset.category || "all";
      if ((state.category === "truck") !== (nextCategory === "truck")) {
        window.location.href = `bobaedream-used-car-list.html?category=${encodeURIComponent(nextCategory)}`;
        return;
      }
      state.category = nextCategory;
      state.generic.category = state.category;
      renderRows(state);
      showToast(`${button.textContent.trim()} 매물로 이동했습니다.`);
    });

    document.addEventListener("click", (event) => {
      const resetButton = event.target.closest("[data-mobile-reset]");
      if (!resetButton || !qs("[data-used-car-list]")?.contains(resetButton)) return;
      if (isCommercialMode(state)) resetFilterState(state);
      else resetState(state);
      clearLeftPanelControls();
      if (isCommercialMode(state)) {
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
      }
      renderRows(state);
      renderMobileMakerList(state);
      renderMobileRegionGrid(state);
      renderMobileSortList(state);
      showToast("검색 조건을 초기화했습니다.");
    });
  }

  function refreshCommercialLeftPanel(state) {
    renderCommercialFilterPanel(state);
    renderFilterLists();
    populateLeftRangeSelects();
    setupPcLeftPriceRange(state);
    syncPcLeftRegionUi(state);
    syncPcLeftFuelSellerUi(state);
    syncPcLeftRangeSelects(state);
    syncPcLeftPriceRangeUi(state);
  }

  function setupCommercialLeftFilters(state) {
    const menu = qs(".filterMenu");
    if (!menu) return;

    menu.addEventListener("click", (event) => {
      const commercialClearButton = event.target.closest("[data-commercial-clear-field]");
      if (commercialClearButton) {
        resetSingleFilter(state, commercialClearButton.dataset.commercialClearField || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        return;
      }
      const toggle = event.target.closest(".filterToggle");
      if (toggle) {
        toggle.closest(".filterItem")?.classList.toggle("is-open");
        return;
      }
      const moreButton = event.target.closest("[data-filter-more]");
      if (moreButton) {
        setFilterMoreState(moreButton, moreButton.getAttribute("aria-expanded") !== "true");
        return;
      }
      if (event.target.closest("[data-left-keyword-apply]")) {
        state.leftKeyword = qs("#leftKeywordSearch")?.value.trim() || "";
        renderRows(state);
      }
    });

    menu.addEventListener("keydown", (event) => {
      if (!event.target.matches("#leftKeywordSearch") || event.key !== "Enter") return;
      state.leftKeyword = event.target.value.trim();
      renderRows(state);
    });

    menu.addEventListener("change", (event) => {
      const target = event.target;
      if (!target) return;

      if (target.matches("[data-commercial-filter]")) {
        applyCommercialFilter(state, target.dataset.commercialFilter || "", target.value || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        return;
      }

      if (target.matches("[data-commercial-common-filter]")) {
        applyCommercialCommonFilter(state, target.dataset.commercialCommonFilter || "", target.value || "");
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
        renderRows(state);
        return;
      }

      if (target.matches("[data-brand-filter]")) {
        qsa("[data-brand-filter]", menu).forEach((other) => {
          if (other !== target) other.checked = false;
        });
        state.brand = target.checked ? target.value : "";
        renderRows(state);
        return;
      }

      if (target.matches("[data-pc-left-region]")) {
        qsa("[data-pc-left-region]", menu).forEach((other) => {
          if (other !== target) other.checked = false;
        });
        state.region = target.checked ? target.value : "전국";
        if (!state.region) state.region = "전국";
        renderRows(state);
        renderMobileRegionGrid(state);
        return;
      }

      if (target.matches("[data-left-fuel]")) {
        qsa("[data-left-fuel]", menu).forEach((other) => {
          if (other !== target) other.checked = false;
        });
        state.fuel = target.checked ? target.value : "";
        state.generic.fuel = state.fuel;
        renderRows(state);
        return;
      }

      if (target.matches("[data-left-seller]")) {
        qsa("[data-left-seller]", menu).forEach((other) => {
          if (other !== target) other.checked = false;
        });
        state.seller = target.checked ? target.value : "all";
        state.generic.seller = state.seller;
        renderRows(state);
        return;
      }

      if (target.matches("[data-left-filter]")) {
        renderRows(state);
        return;
      }

      if (target.matches("[data-left-year-min], [data-left-year-max]")) {
        state.yearMin = Number(qs("[data-left-year-min]")?.value || "") || null;
        state.yearMax = Number(qs("[data-left-year-max]")?.value || "") || null;
        state.yearLabel = rangeLabel(state.yearMin, state.yearMax, "년");
        delete state.generic.year;
        renderRows(state);
        return;
      }

      if (target.matches("[data-left-mileage-min], [data-left-mileage-max]")) {
        state.mileageMin = Number(qs("[data-left-mileage-min]")?.value || "") || null;
        state.mileageMax = Number(qs("[data-left-mileage-max]")?.value || "") || null;
        delete state.generic.mileage;
        renderRows(state);
      }
    });
  }

  function initialCommercialFiltersFromParams() {
    const filters = {};
    commercialCommonFilterOrder.forEach((key) => {
      if (!commercialCommonConfig(key)) return;
      const value = params.get(`cf_${key}`);
      if (!value) return;
      filters[key] = value.split("|").map((item) => item.trim()).filter(Boolean);
    });
    return filters;
  }

  function setupListPage() {
    const root = qs("[data-used-car-list]");
    if (!root) return;

    const state = {
      category: params.get("category") || "all",
      seller: params.get("seller") || "all",
      brand: params.get("brand") || "",
      region: "전국",
      video: false,
      sort: "updated",
      fuel: "",
      yearMin: null,
      yearMax: null,
      yearLabel: "",
      priceMin: null,
      priceMax: null,
      priceLabel: "",
      mileageMin: null,
      mileageMax: null,
      complex: "",
      option: "",
      feature: "",
      plate: "",
      leftKeyword: "",
      vehicleType1Id: params.get("vehicleType1Id") || "",
      vehicleType2Id: params.get("vehicleType2Id") || "",
      payloadCapacityCode: params.get("payloadCapacityCode") || "",
      loadStandardCode: params.get("loadStandardCode") || "",
      commercialFilters: initialCommercialFiltersFromParams(),
      generic: {}
    };

    if (isCommercialMode(state)) renderCommercialFilterPanel(state);
    renderFilterLists();
    populateLeftRangeSelects();
    renderCategoryButtons(state.category === "all" ? "used" : state.category);
    setupPcFilterChips(state);
    setupMobileList(state);
    renderRows(state);
    setupPcLeftPriceRange(state);

    if (isCommercialMode(state)) {
      setupCommercialLeftFilters(state);
    } else {
      qsa(".filterToggle").forEach((button) => {
        button.addEventListener("click", () => {
          button.closest(".filterItem")?.classList.toggle("is-open");
        });
      });

      qsa("[data-filter-more]").forEach((button) => {
        button.addEventListener("click", () => {
          setFilterMoreState(button, button.getAttribute("aria-expanded") !== "true");
        });
      });
    }

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
      const nextCategory = button.dataset.category || "all";
      if ((state.category === "truck") !== (nextCategory === "truck")) {
        window.location.href = `bobaedream-used-car-list.html?category=${encodeURIComponent(nextCategory)}`;
        return;
      }
      qsa(".categoryBtn").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      state.category = nextCategory;
      renderRows(state);
      showToast(`${button.textContent.trim()} 매물로 이동했습니다.`);
    });

    if (!isCommercialMode(state)) {
      qsa("[data-brand-filter]").forEach((box) => {
        box.addEventListener("change", () => {
          qsa("[data-brand-filter]").forEach((other) => {
            if (other !== box) other.checked = false;
          });
          state.brand = box.checked ? box.value : "";
          renderRows(state);
        });
      });

      qsa("[data-pc-left-region]").forEach((box) => {
        box.addEventListener("change", () => {
          qsa("[data-pc-left-region]").forEach((other) => {
            if (other !== box) other.checked = false;
          });
          state.region = box.checked ? box.value : "전국";
          if (!state.region) state.region = "전국";
          renderRows(state);
          renderMobileRegionGrid(state);
        });
      });

      qsa("[data-left-fuel]").forEach((box) => {
        box.addEventListener("change", () => {
          qsa("[data-left-fuel]").forEach((other) => {
            if (other !== box) other.checked = false;
          });
          state.fuel = box.checked ? box.value : "";
          state.generic.fuel = state.fuel;
          renderRows(state);
        });
      });

      qsa("[data-left-seller]").forEach((box) => {
        box.addEventListener("change", () => {
          qsa("[data-left-seller]").forEach((other) => {
            if (other !== box) other.checked = false;
          });
          state.seller = box.checked ? box.value : "all";
          state.generic.seller = state.seller;
          renderRows(state);
        });
      });

      qsa("[data-left-filter]").forEach((box) => {
        box.addEventListener("change", () => {
          renderRows(state);
        });
      });

      qsa("[data-left-year-min], [data-left-year-max]").forEach((select) => {
        select.addEventListener("change", () => {
          state.yearMin = Number(qs("[data-left-year-min]")?.value || "") || null;
          state.yearMax = Number(qs("[data-left-year-max]")?.value || "") || null;
          state.yearLabel = rangeLabel(state.yearMin, state.yearMax, "년");
          delete state.generic.year;
          renderRows(state);
        });
      });

      qsa("[data-left-mileage-min], [data-left-mileage-max]").forEach((select) => {
        select.addEventListener("change", () => {
          state.mileageMin = Number(qs("[data-left-mileage-min]")?.value || "") || null;
          state.mileageMax = Number(qs("[data-left-mileage-max]")?.value || "") || null;
          delete state.generic.mileage;
          renderRows(state);
        });
      });

      const applyLeftKeyword = () => {
        state.leftKeyword = qs("#leftKeywordSearch")?.value.trim() || "";
        renderRows(state);
      };
      qs("[data-left-keyword-apply]")?.addEventListener("click", applyLeftKeyword);
      qs("#leftKeywordSearch")?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") applyLeftKeyword();
      });
    }

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
      const keepCommercialMode = isCommercialMode(state);
      resetState(state);
      if (keepCommercialMode) state.category = "truck";
      clearLeftPanelControls();
      if (keepCommercialMode) {
        refreshCommercialLeftPanel(state);
        syncCommercialUrlParams(state);
      }
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
      ["최고출력", car.power],
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

  function optionIconMarkup(option, index) {
    const fileName = optionIconFiles[option];
    if (!fileName) {
      return `<span class="optionGlyph optionGlyphFallback">${optionIconNumbers[option] || String(index + 1).padStart(2, "0")}</span>`;
    }
    const iconClass = fileName.replace(/\.[^.]+$/, "").replace(/^s03-\d+-option-/, "");
    return `<span class="optionGlyph optionGlyph--${iconClass}"><img src="${optionIconBase}${fileName}" alt="" loading="lazy" decoding="async"></span>`;
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
    qs("#detailMeta").textContent = `${car.yearFull} · ${car.mileageFull} · ${car.fuel} · ${car.power} · ${car.accident === "없음" ? "무사고" : "사고이력"}`;
    qs("#detailBadges").innerHTML = car.badges.map((badge) => `<span class="badge">${badge}</span>`).join("");
    qs("#detailStats").innerHTML = `<span>추천 ${car.likes}</span><span>조회 ${car.views}</span>`;
    qs("#basicSpecs").innerHTML = specGridMarkup(valueList(car));
    qs("#detailSpecs").innerHTML = specGridMarkup(Object.entries(car.detailSpecs));

    const allOptions = ["선루프", "LED 헤드램프", "어댑티브 크루즈 컨트롤", "후방카메라", "어라운드뷰", "스마트키", "순정 내비게이션", "열선시트", "통풍시트", "헤드업 디스플레이", "전동트렁크", "전방충돌방지"];
    qs("#optionGrid").innerHTML = allOptions.map((option, index) => `
      <div class="optionItem${car.options.includes(option) ? " is-on" : ""}">
        ${optionIconMarkup(option, index)}
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
    qs("#dealerName").textContent = dealerLabel(dealer);
    qs("#dealerStats").textContent = dealerSupportLabel(dealer);
    qs("#dealerLocation").textContent = `상담 가능 · 응답률 82%`;
    qs("#detailLocationLine").textContent = car.location;
    qs("#detailComplexLine").textContent = car.complex || "";
    qs("#detailPostedLine").textContent = `등록 ${car.posted.replace("전", " 전")}`;
    qs("#dealerNo").textContent = dealer.employeeNo;
    qs("#dealerGroup").textContent = dealer.group;
    qs("#dealerPhone").textContent = dealer.phone;
    qs("#stickyThumb").innerHTML = thumbMarkup(car);
    qs("#stickyTitle").textContent = car.title;
    qs("#stickyPrice").textContent = car.price;
    qs("#stickyMeta").textContent = `${car.yearFull} ${car.mileageFull} ${car.fuel} ${car.power}`;
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

    const anchorLinks = qsa(".detailAnchorNav a");
    const stickySummary = qs(".detailStickySummary");
    const stickyOffset = 136;
    const stickyThreshold = 320;
    const setActiveAnchor = (activeLink) => {
      anchorLinks.forEach((item) => item.classList.toggle("is-active", item === activeLink));
    };

    anchorLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const target = qs(link.getAttribute("href"));
        if (!target) return;
        setActiveAnchor(link);
        const top = target.getBoundingClientRect().top + window.scrollY - stickyOffset;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });

    if (stickySummary) {
      const sectionTargets = anchorLinks
        .map((link) => ({ link, target: qs(link.getAttribute("href")) }))
        .filter((item) => item.target);
      const updateAnchorNav = () => {
        const isVisible = window.scrollY > stickyThreshold;
        stickySummary.classList.toggle("is-visible", isVisible);
        stickySummary.setAttribute("aria-hidden", String(!isVisible));
        if (!sectionTargets.length) return;
        const active = sectionTargets.reduce((current, item) => {
          return item.target.getBoundingClientRect().top <= stickyOffset + 8 ? item : current;
        }, sectionTargets[0]);
        setActiveAnchor(active.link);
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
