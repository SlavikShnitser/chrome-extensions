(() => {
	/** Delay for event listeners in ms. */
	const DELAY = 400;
	/** Identifier of new context menu item. */
	const buttonID = 'DYNAMICALLY_CREATED_LI';
	/** Text to display in new context menu item. */
	const buttonText = 'Search database';
	/** CSS selector for context menu container. */
	const contextMenuSelector = '.action-menu-widget > ul';
	/** CSS selector for button with coordinates. */
	const latLonContainerSelector = '.widget-reveal-card-lat-lng';

	/**
	 * Triggers after context menu is opened.
	 */
	function onContextMenuOpen() {
		setTimeout(() => {
			const ul = document.querySelector(contextMenuSelector);
			const existingLi = ul.querySelector('li[data-index="2"]');
			const newLi = existingLi.cloneNode(false);
			newLi.innerText = buttonText;
			newLi.id = buttonID;

			ul.appendChild(newLi);
			ul.addEventListener('click', (event) => onContextMenuClicked(event));
		}, DELAY);
	}

	/**
	 * Triggers when context menu item was clicked.
	 * @param event Click event.
	 */
	function onContextMenuClicked(event) {
		if (event.target.id === buttonID) {
			setTimeout(() => {
				const value = document.querySelector(latLonContainerSelector)
					.innerText.replace(' ', '');
				openNewTab(value);
			}, DELAY);
		}
	}

	/**
	 * Opens new tab.
	 * @param coords Coma separated coordinates.
	 */
	function openNewTab(coords) {
		window.open(`https://www.domain.com/?coords=${coords}`, '_blank');
	}

	/**
	 * Initialization function.
	 */
	function init() {
		const interval = setInterval(() => {
			const canvas = document.querySelector('canvas');
			if (canvas) {
				canvas.addEventListener('contextmenu', () => onContextMenuOpen());
				console.info('[Google Maps Context Menu] Event was successfully added.');
				clearInterval(interval);
			} else {
				console.warn('[Google Maps Context Menu] Canvas didn\'t found.');
			}
		}, DELAY);
	}

	init();
})();