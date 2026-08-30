(function () {
  const totalExportUnits = 286;

  const categories = [
    { key: "all", label: "All", asset: "assets/used-car/cat-used.png" },
    { key: "suv", label: "SUV", asset: "assets/used-car/cat-used.png" },
    { key: "sedan", label: "Sedan", asset: "assets/used-car/cat-old.png" },
    { key: "van", label: "Van", asset: "assets/used-car/cat-camping.png" },
    { key: "commercial", label: "Truck", asset: "assets/used-car/cat-truck.png" },
    { key: "ev", label: "EV", asset: "assets/used-car/cat-machine.png" }
  ];

  const cars = [
    {
      id: "exp-palisade-221",
      category: "suv",
      maker: "Hyundai",
      seller: "dealer",
      title: "2021 Hyundai Palisade 2.2 Diesel AWD Calligraphy",
      meta: "2021 | 42,000 km | Diesel | AT | LHD",
      year: 2021,
      mileage: 42000,
      fuel: "Diesel",
      transmission: "AT",
      steering: "LHD",
      price: 24800,
      priceLabel: "USD 24,800 FOB",
      badges: ["Export Ready", "Inspection"],
      badgeTone: ["green", "blue"],
      port: "Busan Port",
      location: "Busan Port | RoRo ready",
      dealer: "Bobaedream Export Desk",
      views: 132,
      thumbnail: "assets/used-car/hero-silver-car.jpg",
      video: true,
      documents: ["ready", "inspection", "title", "accident"],
      thumbLabel: "Ready",
      freshness: 8
    },
    {
      id: "exp-carnival-904",
      category: "van",
      maker: "Kia",
      seller: "dealer",
      title: "2023 Kia Carnival 2.2 Diesel 9-Seater Prestige",
      meta: "2023 | 18,700 km | Diesel | AT | LHD",
      year: 2023,
      mileage: 18700,
      fuel: "Diesel",
      transmission: "AT",
      steering: "LHD",
      price: 27900,
      priceLabel: "USD 27,900 FOB",
      badges: ["Family Van", "Low Mileage"],
      badgeTone: ["blue", ""],
      port: "Incheon Yard",
      location: "Incheon Yard | Container option",
      dealer: "Seoul Auto Export",
      views: 98,
      thumbnail: "assets/used-car/hero-red-car.jpg",
      video: false,
      documents: ["ready", "inspection"],
      thumbLabel: "FOB",
      freshness: 7
    },
    {
      id: "exp-g80-552",
      category: "sedan",
      maker: "Genesis",
      seller: "dealer",
      title: "2022 Genesis G80 2.5T AWD Sport Package",
      meta: "2022 | 31,200 km | Gasoline | AT | LHD",
      year: 2022,
      mileage: 31200,
      fuel: "Gasoline",
      transmission: "AT",
      steering: "LHD",
      price: 29400,
      priceLabel: "USD 29,400 FOB",
      badges: ["Clean Title", "Premium"],
      badgeTone: ["green", ""],
      port: "Pyeongtaek Port",
      location: "Pyeongtaek Port | Vessel weekly",
      dealer: "Gangnam Motors Export",
      views: 165,
      thumbnail: "assets/used-car/hero-black-car.jpg",
      video: true,
      documents: ["ready", "inspection", "title", "accident"],
      thumbLabel: "Video",
      freshness: 9
    },
    {
      id: "exp-porter-118",
      category: "commercial",
      maker: "Hyundai",
      seller: "dealer",
      title: "2020 Hyundai Porter II Refrigerated Truck",
      meta: "2020 | 76,500 km | Diesel | Manual | LHD",
      year: 2020,
      mileage: 76500,
      fuel: "Diesel",
      transmission: "Manual",
      steering: "LHD",
      price: 11600,
      priceLabel: "USD 11,600 FOB",
      badges: ["Commercial", "Cold Box"],
      badgeTone: ["blue", ""],
      port: "Busan Port",
      location: "Busan Port | Inspection booked",
      dealer: "K-Commercial Export",
      views: 61,
      thumbnail: "assets/used-car/thumb-escalade.png",
      video: false,
      documents: ["ready", "inspection"],
      thumbLabel: "Docs",
      freshness: 4
    },
    {
      id: "exp-ev6-406",
      category: "ev",
      maker: "Kia",
      seller: "dealer",
      title: "2024 Kia EV6 Long Range 2WD",
      meta: "2024 | 9,800 km | Electric | AT | LHD",
      year: 2024,
      mileage: 9800,
      fuel: "Electric",
      transmission: "AT",
      steering: "LHD",
      price: 33200,
      priceLabel: "USD 33,200 FOB",
      badges: ["EV", "Battery Checked"],
      badgeTone: ["green", "blue"],
      port: "Incheon Yard",
      location: "Incheon Yard | Export docs ready",
      dealer: "Bobaedream EV Desk",
      views: 203,
      thumbnail: "assets/used-car/hero-silver-car.jpg",
      video: true,
      documents: ["ready", "inspection", "title"],
      thumbLabel: "Video",
      freshness: 10
    },
    {
      id: "exp-gle-450",
      category: "suv",
      maker: "Mercedes-Benz",
      seller: "dealer",
      title: "2019 Mercedes-Benz GLE 450 4MATIC",
      meta: "2019 | 58,400 km | Gasoline | AT | LHD",
      year: 2019,
      mileage: 58400,
      fuel: "Gasoline",
      transmission: "AT",
      steering: "LHD",
      price: 36700,
      priceLabel: "USD 36,700 FOB",
      badges: ["Luxury", "Video"],
      badgeTone: ["", "blue"],
      port: "Busan Port",
      location: "Busan Port | RoRo ready",
      dealer: "Euro Auto Export",
      views: 87,
      thumbnail: "assets/used-car/thumb-gle-partial.png",
      video: true,
      documents: ["ready", "title"],
      thumbLabel: "Ready",
      freshness: 6
    },
    {
      id: "exp-avante-712",
      category: "sedan",
      maker: "Hyundai",
      seller: "private",
      title: "2021 Hyundai Avante 1.6 Gasoline Smart",
      meta: "2021 | 35,900 km | Gasoline | AT | LHD",
      year: 2021,
      mileage: 35900,
      fuel: "Gasoline",
      transmission: "AT",
      steering: "LHD",
      price: 14200,
      priceLabel: "USD 14,200 FOB",
      badges: ["Private", "No Accident"],
      badgeTone: ["", "green"],
      port: "Incheon Yard",
      location: "Incheon Yard | Buyer pickup ready",
      dealer: "Private Seller | Seoul",
      views: 44,
      thumbnail: "assets/used-car/hero-black-car.jpg",
      video: false,
      documents: ["ready", "title", "accident"],
      thumbLabel: "FOB",
      freshness: 5
    },
    {
      id: "exp-musso-633",
      category: "commercial",
      maker: "KG Mobility",
      seller: "dealer",
      title: "2022 KG Mobility Musso Sports Khan 4WD",
      meta: "2022 | 29,300 km | Diesel | AT | LHD",
      year: 2022,
      mileage: 29300,
      fuel: "Diesel",
      transmission: "AT",
      steering: "LHD",
      price: 18900,
      priceLabel: "USD 18,900 FOB",
      badges: ["Pickup", "Inspection"],
      badgeTone: ["blue", ""],
      port: "Pyeongtaek Port",
      location: "Pyeongtaek Port | Export docs ready",
      dealer: "Korea Pickup Export",
      views: 73,
      thumbnail: "assets/used-car/thumb-escalade.png",
      video: false,
      documents: ["ready", "inspection", "title"],
      thumbLabel: "Docs",
      freshness: 3
    }
  ];

  const state = {
    category: "all",
    maker: "",
    year: "",
    mileage: "",
    price: "",
    fuel: "",
    transmission: "",
    steering: "lhd",
    port: "",
    seller: "all",
    documents: "ready",
    video: false,
    sort: "latest"
  };
  const filterSheetTypes = new Set(["filter", "maker", "port", "generic"]);
  let sheetScrollY = 0;

  const sortOptions = [
    ["latest", "Latest"],
    ["fob-low", "FOB Price Low"],
    ["fob-high", "FOB Price High"],
    ["year-new", "Model Year Newest"],
    ["mileage-low", "Mileage Low"],
    ["ship-ready", "Ready To Ship"]
  ];

  const makerGroups = [
    ["Korean Makers", [["Hyundai", "84"], ["Kia", "76"], ["Genesis", "38"], ["KG Mobility", "17"]]],
    ["Imported Makers", [["Mercedes-Benz", "21"], ["BMW", "18"], ["Toyota", "11"], ["Lexus", "8"]]]
  ];

  const optionConfigs = {
    category: {
      title: "Vehicle Type",
      field: "category",
      label: "filterCategoryLabel",
      options: [["All", "all", totalExportUnits], ["SUV", "suv", 94], ["Sedan", "sedan", 71], ["Van", "van", 32], ["Truck", "commercial", 45], ["EV", "ev", 18]]
    },
    year: {
      title: "Model Year",
      field: "year",
      label: "filterYearLabel",
      options: [["All", "", totalExportUnits], ["2024 or newer", "2024", 34], ["2022 or newer", "2022", 108], ["2020 or newer", "2020", 196]]
    },
    mileage: {
      title: "Mileage",
      field: "mileage",
      label: "filterMileageLabel",
      options: [["All", "", totalExportUnits], ["Under 10,000 km", "10000", 21], ["Under 30,000 km", "30000", 76], ["Under 50,000 km", "50000", 152], ["Under 80,000 km", "80000", 231]]
    },
    price: {
      title: "FOB Price",
      field: "price",
      label: "filterPriceLabel",
      options: [["All", "", totalExportUnits], ["Under USD 15,000", "0-15000", 42], ["USD 15,000 - 30,000", "15000-30000", 128], ["USD 30,000 - 50,000", "30000-50000", 84], ["Over USD 50,000", "50000-", 32]]
    },
    fuel: {
      title: "Fuel Type",
      field: "fuel",
      label: "filterFuelLabel",
      options: [["All", "", totalExportUnits], ["Gasoline", "Gasoline", 118], ["Diesel", "Diesel", 97], ["Hybrid", "Hybrid", 36], ["Electric", "Electric", 24]]
    },
    transmission: {
      title: "Transmission",
      field: "transmission",
      label: "filterTransmissionLabel",
      options: [["All", "", totalExportUnits], ["Automatic", "AT", 254], ["Manual", "Manual", 32]]
    },
    steering: {
      title: "Steering",
      field: "steering",
      label: "filterSteeringLabel",
      options: [["Left-hand drive", "lhd", 286], ["Right-hand drive", "rhd", 0]]
    },
    seller: {
      title: "Seller Type",
      field: "seller",
      label: "filterSellerLabel",
      options: [["All", "all", totalExportUnits], ["Dealer", "dealer", 248], ["Private", "private", 38]]
    },
    documents: {
      title: "Export Documents",
      field: "documents",
      label: "filterDocsLabel",
      options: [["Ready", "ready", 286], ["Inspection complete", "inspection", 192], ["Original title", "title", 164], ["No accident", "accident", 119]]
    }
  };

  const portOptions = [["Korea", "", totalExportUnits], ["Busan Port", "Busan Port", 128], ["Incheon Yard", "Incheon Yard", 86], ["Pyeongtaek Port", "Pyeongtaek Port", 52], ["Gwangju Yard", "Gwangju Yard", 20]];

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
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1600);
  }

  function displayLabel(config, value) {
    const match = (config.options || []).find((option) => option[1] === value);
    return match ? match[0] : "All";
  }

  function priceMatch(car) {
    if (!state.price) return true;
    const [minRaw, maxRaw] = state.price.split("-");
    const min = minRaw ? Number(minRaw) : 0;
    const max = maxRaw ? Number(maxRaw) : Infinity;
    return car.price >= min && car.price <= max;
  }

  function getFilteredCars() {
    let visible = cars.filter((car) => {
      const categoryMatch = state.category === "all" || car.category === state.category;
      const makerMatch = !state.maker || car.maker === state.maker;
      const sellerMatch = state.seller === "all" || car.seller === state.seller;
      const yearMatch = !state.year || car.year >= Number(state.year);
      const mileageMatch = !state.mileage || car.mileage <= Number(state.mileage);
      const fuelMatch = !state.fuel || car.fuel === state.fuel;
      const transmissionMatch = !state.transmission || car.transmission === state.transmission;
      const steeringMatch = state.steering === "lhd" ? car.steering === "LHD" : false;
      const portMatch = !state.port || car.port === state.port;
      const videoMatch = !state.video || car.video;
      const documentMatch = state.documents === "ready" || (car.documents || []).includes(state.documents);
      return categoryMatch && makerMatch && sellerMatch && yearMatch && mileageMatch && priceMatch(car) && fuelMatch && transmissionMatch && steeringMatch && portMatch && videoMatch && documentMatch;
    });

    if (state.sort === "fob-low") visible = [...visible].sort((a, b) => a.price - b.price);
    if (state.sort === "fob-high") visible = [...visible].sort((a, b) => b.price - a.price);
    if (state.sort === "year-new") visible = [...visible].sort((a, b) => b.year - a.year);
    if (state.sort === "mileage-low") visible = [...visible].sort((a, b) => a.mileage - b.mileage);
    if (state.sort === "ship-ready" || state.sort === "latest") visible = [...visible].sort((a, b) => b.freshness - a.freshness);
    return visible;
  }

  function renderCategories() {
    const root = qs("#mobileCategoryRail");
    if (!root) return;
    root.innerHTML = categories.map((category) => `
      <button class="mobileCategoryBtn${state.category === category.key ? " is-active" : ""}" type="button" data-category="${category.key}">
        <span><img src="${category.asset}" alt=""></span>
        <strong>${category.label}</strong>
      </button>
    `).join("");
  }

  function renderRows(visible) {
    const root = qs("#mobileCarRows");
    if (!root) return;
    if (!visible.length) {
      root.innerHTML = `
        <div class="mobileEmptyState">
          <strong>No export units found</strong>
          <span>Try widening the FOB price, year, or maker filter.</span>
        </div>
      `;
      return;
    }
    root.innerHTML = visible.map((car) => `
      <article class="mobileCarRow exportCarRow" data-car-id="${car.id}">
        <a class="mobileThumb" href="#" data-car-detail>
          <img src="${car.thumbnail}" alt="${car.title}">
          <span class="thumbTime">${car.thumbLabel}</span>
          ${car.video ? `<span class="videoMark"></span>` : ""}
        </a>
        <div class="mobileRowBody">
          <a class="mobileRowTitle" href="#" data-car-detail>${car.title}</a>
          <div class="mobileRowMeta">${car.meta}</div>
          <div class="mobileRowPrice">${car.priceLabel}</div>
          <div class="mobileRowBadges">
            ${car.badges.map((badge, index) => `<span class="badge${car.badgeTone[index] ? ` is-${car.badgeTone[index]}` : ""}">${badge}</span>`).join("")}
          </div>
          <div class="mobileLocation">${car.location}</div>
          <div class="mobileDealer"><img src="assets/used-car/dealer-avatar.png" alt=""><span>${car.dealer}</span></div>
        </div>
        <span class="mobileViews">Views ${car.views}</span>
        <button class="mobileRowHeart" type="button" data-favorite aria-label="Save ${car.title}"><span class="heartIcon"></span></button>
      </article>
    `).join("");
  }

  function renderMakerList() {
    const root = qs("#mobileMakerList");
    if (!root) return;
    root.innerHTML = `
      <button class="makerOption${!state.maker ? " is-selected" : ""}" type="button" data-maker="">
        <span class="makerLogoMark">ALL</span><span>All Makers</span><span class="mobileOptionCount">${totalExportUnits}</span>
      </button>
      ${makerGroups.map(([title, makers]) => `
        <div class="makerGroupTitle">${title}</div>
        ${makers.map(([maker, count]) => `
          <button class="makerOption${state.maker === maker ? " is-selected" : ""}" type="button" data-maker="${maker}">
            <span class="makerLogoMark">${maker.slice(0, 2).toUpperCase()}</span>
            <span>${maker}</span>
            <span class="mobileOptionCount">${count}</span>
          </button>
        `).join("")}
      `).join("")}
    `;
  }

  function renderPortList() {
    const root = qs("#mobilePortGrid");
    if (!root) return;
    root.innerHTML = portOptions.map(([label, value, count]) => `
      <button class="mobileOptionButton${state.port === value ? " is-selected" : ""}" type="button" data-port="${value}">
        <span>${label}</span>
        <span class="mobileOptionCount">${count}</span>
      </button>
    `).join("");
  }

  function renderGenericOptions(key) {
    const config = optionConfigs[key];
    if (!config) return;
    qs("#genericSheetTitle").textContent = config.title;
    const root = qs("#genericSheetOptions");
    root.innerHTML = config.options.map(([label, value, count]) => `
      <button class="mobileOptionButton${state[config.field] === value ? " is-selected" : ""}" type="button" data-generic-field="${config.field}" data-generic-value="${value}">
        <span>${label}</span>
        <span class="mobileOptionCount">${count}</span>
      </button>
    `).join("");
  }

  function renderSortList() {
    const root = qs("#mobileSortList");
    if (!root) return;
    root.innerHTML = sortOptions.map(([value, label]) => `
      <button class="${state.sort === value ? "is-active" : ""}" type="button" data-sort="${value}">${label}</button>
    `).join("");
  }

  function updateLabels(visible) {
    const sort = sortOptions.find(([value]) => value === state.sort) || sortOptions[0];
    const labels = {
      mobileMakerLabel: state.maker || "Maker",
      mobileYearLabel: state.year ? `${state.year}+` : "Year",
      mobilePriceLabel: state.price ? displayLabel(optionConfigs.price, state.price).replace("USD ", "$") : "FOB Price",
      mobileFuelLabel: state.fuel || "Fuel",
      mobileSellerLabel: state.seller === "all" ? "Seller" : displayLabel(optionConfigs.seller, state.seller),
      mobilePortLabel: state.port || "Korea",
      mobileSortLabel: sort[1],
      filterCategoryLabel: displayLabel(optionConfigs.category, state.category),
      filterMakerLabel: state.maker || "All",
      filterYearLabel: displayLabel(optionConfigs.year, state.year),
      filterMileageLabel: displayLabel(optionConfigs.mileage, state.mileage),
      filterPriceLabel: displayLabel(optionConfigs.price, state.price),
      filterFuelLabel: displayLabel(optionConfigs.fuel, state.fuel),
      filterTransmissionLabel: displayLabel(optionConfigs.transmission, state.transmission),
      filterSteeringLabel: displayLabel(optionConfigs.steering, state.steering),
      filterPortLabel: state.port || "Korea",
      filterSellerLabel: displayLabel(optionConfigs.seller, state.seller),
      filterDocsLabel: displayLabel(optionConfigs.documents, state.documents)
    };
    Object.entries(labels).forEach(([id, label]) => {
      const el = qs(`#${id}`);
      if (el) el.textContent = label;
    });

    const baseView = state.category === "all" && !state.maker && !state.year && !state.mileage && !state.price && !state.fuel && !state.transmission && !state.port && state.seller === "all" && state.documents === "ready" && !state.video;
    const resultText = baseView ? `Featured ${cars.length} of ${totalExportUnits} export-ready units` : `Showing ${visible.length} curated units`;
    qs("#exportResultCount").textContent = resultText;
    qs("#mobileApplyCount").textContent = visible.length ? `View ${visible.length} units` : "No units";
    qs("#mobileVideoSwitch").classList.toggle("is-on", state.video);
    qsa(".mobileSellerTab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.mobileSeller === state.seller));
  }

  function renderAll() {
    const visible = getFilteredCars();
    renderCategories();
    renderRows(visible);
    renderMakerList();
    renderPortList();
    renderSortList();
    updateLabels(visible);
  }

  function lockSheetScroll() {
    if (!document.body.classList.contains("sheet-open")) {
      sheetScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      document.body.style.top = `-${sheetScrollY}px`;
    }
    document.body.classList.add("sheet-open");
  }

  function unlockSheetScroll() {
    const savedScrollY = Math.abs(parseInt(document.body.style.top || "0", 10)) || sheetScrollY;
    document.body.classList.remove("sheet-open");
    document.body.style.top = "";
    window.scrollTo(0, savedScrollY);
  }

  function openSheet(name) {
    const triggerName = name;
    if (optionConfigs[name] && name !== "maker") {
      renderGenericOptions(name);
      name = "generic";
    }
    const layer = qs("#mobileSheetLayer");
    qsa(".mobileSheet").forEach((sheet) => sheet.classList.toggle("is-active", sheet.dataset.sheet === name));
    layer.dataset.sheetVariant = filterSheetTypes.has(name) ? "filter" : "toolbar";
    layer.dataset.activeSheet = triggerName;
    layer.classList.add("is-open");
    layer.setAttribute("aria-hidden", "false");
    lockSheetScroll();
  }

  function closeSheet() {
    const layer = qs("#mobileSheetLayer");
    layer.classList.remove("is-open");
    layer.setAttribute("aria-hidden", "true");
    delete layer.dataset.sheetVariant;
    delete layer.dataset.activeSheet;
    qsa(".mobileSheet").forEach((sheet) => sheet.classList.remove("is-active"));
    unlockSheetScroll();
  }

  function resetFilters() {
    Object.assign(state, {
      category: "all",
      maker: "",
      year: "",
      mileage: "",
      price: "",
      fuel: "",
      transmission: "",
      steering: "lhd",
      port: "",
      seller: "all",
      documents: "ready",
      video: false,
      sort: "latest"
    });
    closeSheet();
    renderAll();
    showToast("Export filters reset.");
  }

  document.addEventListener("click", (event) => {
    const toastTarget = event.target.closest("[data-toast]");
    if (toastTarget) {
      event.preventDefault();
      showToast(toastTarget.dataset.toast);
      return;
    }

    const openTarget = event.target.closest("[data-open-sheet]");
    if (openTarget) {
      event.preventDefault();
      openSheet(openTarget.dataset.openSheet);
      return;
    }

    if (event.target.closest("[data-close-sheet]")) {
      event.preventDefault();
      closeSheet();
      return;
    }

    if (event.target.closest("[data-apply-sheet]")) {
      event.preventDefault();
      closeSheet();
      showToast("Export list updated.");
      return;
    }

    if (event.target.closest("[data-mobile-reset]")) {
      event.preventDefault();
      resetFilters();
      return;
    }

    const category = event.target.closest("[data-category]");
    if (category) {
      event.preventDefault();
      state.category = category.dataset.category;
      renderAll();
      return;
    }

    const sellerTab = event.target.closest("[data-mobile-seller]");
    if (sellerTab) {
      event.preventDefault();
      state.seller = sellerTab.dataset.mobileSeller;
      renderAll();
      return;
    }

    const maker = event.target.closest("[data-maker]");
    if (maker) {
      event.preventDefault();
      state.maker = maker.dataset.maker;
      renderAll();
      return;
    }

    const port = event.target.closest("[data-port]");
    if (port) {
      event.preventDefault();
      state.port = port.dataset.port;
      renderAll();
      return;
    }

    const generic = event.target.closest("[data-generic-field]");
    if (generic) {
      event.preventDefault();
      state[generic.dataset.genericField] = generic.dataset.genericValue;
      renderAll();
      return;
    }

    const sort = event.target.closest("[data-sort]");
    if (sort) {
      event.preventDefault();
      state.sort = sort.dataset.sort;
      renderAll();
      closeSheet();
      return;
    }

    const favorite = event.target.closest("[data-favorite]");
    if (favorite) {
      event.preventDefault();
      favorite.classList.toggle("is-active");
      showToast(favorite.classList.contains("is-active") ? "Saved to export watchlist." : "Removed from export watchlist.");
      return;
    }

    if (event.target.closest("[data-car-detail]")) {
      event.preventDefault();
      showToast("Detail page is out of scope for this list mockup.");
    }
  });

  qs("#mobileVideoSwitch")?.addEventListener("click", (event) => {
    event.preventDefault();
    state.video = !state.video;
    renderAll();
  });

  renderAll();
})();
