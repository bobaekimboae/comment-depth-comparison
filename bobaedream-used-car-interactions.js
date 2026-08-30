(function () {
  const data = window.BOBAE_USED_CAR || {};
  const cars = data.cars || [];
  const dealers = data.dealers || {};
  const categories = data.categories || [];
  const params = new URLSearchParams(window.location.search);

  const moneyToNumber = (value) => Number(String(value || "0").replace(/[^\d]/g, ""));

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
    return [car.year, car.mileage, car.fuel, car.power, car.seatColor].filter(Boolean).join(" · ");
  }

  function thumbMarkup(car, large = false) {
    if (car.thumbnail && !large) {
      return `<img src="${car.thumbnail}" alt="${car.title} 썸네일">`;
    }
    if (large && car.images && car.images.length) {
      return `<img src="${car.images[0]}" alt="${car.title} 대표 이미지">`;
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

  function renderHeaderActive() {
    qsa(".bbNavLink").forEach((link) => {
      if (link.dataset.nav === "shorts") link.classList.add("is-active");
    });
  }

  function setupGenericActions() {
    qsa("[data-toast]").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        showToast(el.dataset.toast);
      });
    });

    qsa("[data-toggle-heart]").forEach((el) => {
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

  function renderRows(state) {
    const root = qs("#carRows");
    const count = qs("#visibleCount");
    if (!root) return;

    let visible = cars.filter((car) => {
      const categoryMatch = state.category === "all" || state.category === car.category;
      const sellerMatch = state.seller === "all" || state.seller === car.sellerType;
      const brandMatch = !state.brand || car.brand === state.brand;
      const videoMatch = !state.video || car.video;
      return categoryMatch && sellerMatch && brandMatch && videoMatch;
    });

    if (state.sort === "price-high") visible = [...visible].sort((a, b) => moneyToNumber(b.price) - moneyToNumber(a.price));
    if (state.sort === "price-low") visible = [...visible].sort((a, b) => moneyToNumber(a.price) - moneyToNumber(b.price));

    if (count) {
      const isBaseView = state.category === "all" && state.seller === "all" && !state.brand && !state.video;
      count.textContent = isBaseView ? `${data.totalCount}대` : `${visible.length ? visible.length.toLocaleString("ko-KR") : "0"}대`;
    }
    if (!visible.length) {
      root.innerHTML = `<div class="carRow"><div></div><div class="rowBody"><strong class="rowTitle">조건에 맞는 매물이 없습니다.</strong><div class="rowMeta">필터를 초기화하거나 다른 조건을 선택하세요.</div></div></div>`;
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
            ${car.video ? `<span class="videoMark" aria-label="영상 매물"></span>` : ""}
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

  function setupListPage() {
    const root = qs("[data-used-car-list]");
    if (!root) return;

    const state = {
      category: params.get("category") || "all",
      seller: params.get("seller") || "all",
      brand: "",
      video: false,
      sort: "updated"
    };

    renderFilterLists();
    renderCategoryButtons(state.category === "all" ? "used" : state.category);
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
        const chip = qs("#brandChip");
        if (chip) chip.textContent = state.brand || "제조사";
        renderRows(state);
      });
    });

    qs("#videoSwitch")?.addEventListener("click", (event) => {
      event.preventDefault();
      state.video = !state.video;
      event.currentTarget.classList.toggle("is-on", state.video);
      renderRows(state);
      showToast(state.video ? "영상 매물만 보여드립니다." : "전체 매물로 돌아왔습니다.");
    });

    qs("#sortButton")?.addEventListener("click", () => {
      const next = state.sort === "updated" ? "price-high" : state.sort === "price-high" ? "price-low" : "updated";
      state.sort = next;
      qs("#sortLabel").textContent = next === "updated" ? "업데이트순" : next === "price-high" ? "가격 높은순" : "가격 낮은순";
      renderRows(state);
    });

    qs("#resetFilters")?.addEventListener("click", () => {
      state.category = "all";
      state.seller = "all";
      state.brand = "";
      state.video = false;
      state.sort = "updated";
      qsa("[data-brand-filter]").forEach((box) => box.checked = false);
      qsa(".sellerTab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.seller === "all"));
      qsa(".categoryBtn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.category === "used"));
      qs("#videoSwitch")?.classList.remove("is-on");
      qs("#brandChip").textContent = "제조사";
      qs("#sortLabel").textContent = "업데이트순";
      renderRows(state);
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

    qs("#detailGallery").innerHTML = `
      <div class="galleryStage">${thumbMarkup(car, true)}</div>
      <div class="galleryControl">
        <button class="circleTool" type="button" data-toast="공유 링크가 복사되었습니다." aria-label="공유"><span class="shareIcon"></span></button>
        <button class="circleTool" type="button" data-toast="더보기 메뉴는 시안에서 준비 중입니다." aria-label="더보기"><span class="moreIcon"></span></button>
      </div>
      ${imageList.length ? `<div class="thumbStrip">${imageList.map((src, index) => `<button class="detailThumb${index === 0 ? " is-active" : ""}" type="button" data-gallery-src="${src}"><img src="${src}" alt=""></button>`).join("")}</div>` : ""}
    `;

    qs("#detailTitle").textContent = car.title;
    qs("#detailSubcopy").textContent = car.intro;
    qs("#detailMeta").textContent = `${car.number} · ${car.yearFull} · ${car.mileageFull} · ${car.fuel}`;
    qs("#detailBadges").innerHTML = car.badges.map((badge) => `<span class="badge">${badge}</span>`).join("");
    qs("#detailStats").innerHTML = `<span>♥ ${car.likes}</span><span>⊙ ${car.views}</span><span>${car.posted.replace("전", " 전")}</span>`;
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
    qs("#dealerStats").textContent = `${dealer.selling} · ${dealer.sold}`;
    qs("#dealerLocation").textContent = `• ${dealer.location}`;
    qs("#dealerNo").textContent = dealer.employeeNo;
    qs("#dealerGroup").textContent = dealer.group;
    qs("#dealerPhone").textContent = dealer.phone;

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

    qsa("[data-gallery-src]").forEach((button) => {
      button.addEventListener("click", () => {
        qsa("[data-gallery-src]").forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
        qs(".galleryStage").innerHTML = `<img src="${button.dataset.gallerySrc}" alt="${car.title} 대표 이미지">`;
      });
    });

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
    if (anchorNav) {
      const updateAnchorNav = () => anchorNav.classList.toggle("is-visible", window.scrollY > 430);
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
