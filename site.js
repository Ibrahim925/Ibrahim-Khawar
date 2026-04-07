const sidebar = document.querySelector(".sidebar");

if (sidebar) {
	const mobileQuery = window.matchMedia("(max-width: 980px)");
	const toggleButton = document.createElement("button");
	const mobileMenu = document.createElement("div");
	const mobileMenuPanel = document.createElement("div");
	const mobileMenuLinks = document.createElement("div");

	const syncToggleState = (isOpen) => {
		document.body.classList.toggle("menu-open", isOpen);
		toggleButton.setAttribute("aria-expanded", String(isOpen));
		toggleButton.setAttribute(
			"aria-label",
			isOpen ? "Close navigation menu" : "Open navigation menu"
		);
		mobileMenu.classList.toggle("is-open", isOpen);
		mobileMenu.setAttribute("aria-hidden", String(!isOpen));
	};

	toggleButton.className = "mobile-nav-toggle";
	toggleButton.type = "button";
	toggleButton.setAttribute("aria-controls", "mobile-menu");
	toggleButton.innerHTML = `
		<span class="mobile-nav-toggle-bar"></span>
		<span class="mobile-nav-toggle-bar"></span>
		<span class="mobile-nav-toggle-bar"></span>
	`;

	mobileMenu.className = "mobile-menu";
	mobileMenu.id = "mobile-menu";

	mobileMenuPanel.className = "mobile-menu-panel";
	mobileMenuPanel.setAttribute("role", "dialog");
	mobileMenuPanel.setAttribute("aria-modal", "true");
	mobileMenuPanel.setAttribute("aria-label", "Site navigation");

	mobileMenuLinks.className = "mobile-menu-links";
	mobileMenuLinks.innerHTML = sidebar.innerHTML;

	mobileMenuPanel.appendChild(mobileMenuLinks);
	mobileMenu.appendChild(mobileMenuPanel);
	document.body.append(toggleButton, mobileMenu);

	const firstLink = mobileMenuLinks.querySelector("a");

	const closeMenu = () => {
		syncToggleState(false);
		toggleButton.focus({ preventScroll: true });
	};

	const openMenu = () => {
		syncToggleState(true);
		firstLink?.focus({ preventScroll: true });
	};

	syncToggleState(false);

	toggleButton.addEventListener("click", () => {
		if (mobileMenu.classList.contains("is-open")) {
			closeMenu();
			return;
		}

		openMenu();
	});

	mobileMenuLinks.addEventListener("click", (event) => {
		if (event.target.closest("a")) {
			closeMenu();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
			closeMenu();
		}
	});

	const handleViewportChange = (event) => {
		if (!event.matches) {
			syncToggleState(false);
		}
	};

	if (typeof mobileQuery.addEventListener === "function") {
		mobileQuery.addEventListener("change", handleViewportChange);
	} else {
		mobileQuery.addListener(handleViewportChange);
	}
}
