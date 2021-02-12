(() => {
	/**
	 * Helper class allows to create complex HTML structures by calling method `buildHTML` with
	 * custom configuration object.
	 */
	class UIHelper {
		/** An array of allowed HTML attributes. */
		static attributes = [
			"draggable",
			"src",
			"id",
			"type",
			"disabled"
		];
		/** An array of allowed HTML element's properties. */
		static properties = [
			"innerHTML",
			"onclick",
			"ondrag"
		];

		/**
		 * Builds and HTML element with specified class, attributes, properties and children.
		 * @param config Configuration object.
		 * @return HTML element.
		 */
		static buildHTML(config) {
			const { tagName, className, attributes, properties, children } = config;
			const element = document.createElement(tagName);

			if (className) {
				element.classList.add(...className.split(" "));
			}

			if (attributes) {
				Object.keys(attributes).forEach(key => {
					if (UIHelper.attributes.includes(key)) {
						const value = attributes[key];
						element.setAttribute(key, value);
					}
				})
			}

			if (properties) {
				Object.keys(properties).forEach(key => {
					if (UIHelper.properties.includes(key)) {
						const value = properties[key];
						element[key] = value;
					}
				})
			}

			if (children) {
				children.forEach(item => {
					element.appendChild(UIHelper.buildHTML(item));
				});
			}

			return element;
		}
	}

	/**
	 * A service to show notifications.
	 */
	class NotificationService {
		/** HTML element that acts as a container for notifications.  */
		static container;

		/** Allowed types of notification. Default `success`. */
		static types = [
			"success",
			"warning",
			"error",
		];

		/** Determines how long each notification is visible. */
		static duration = 5000;

		/** Creates container and appends it to the body. */
		static init() {
			if (NotificationService.container) {
				return;
			}

			NotificationService.container = UIHelper.buildHTML({
				tagName: "div",
				className: `${CSS_PREFIX}-notifications-container`
			});
			document.body.appendChild(NotificationService.container);
		}

		/**
		 * Creates a notification HTML element and appends it to the container. Removes it from
		 * container after `NotificationService.duration` milliseconds.
		 * @param type Notification type.
		 * @param message Message to display.
		 */
		static showNotification(type, message) {
			// If container is not created yet call init function
			if (!NotificationService.container) {
				NotificationService.init();
			}

			// Use `success` type as a default
			if (!NotificationService.types.includes(type)) {
				type = "success";
			}

			const notification = UIHelper.buildHTML({
				tagName: "div",
				className: `${CSS_PREFIX}-notification ${CSS_PREFIX}-${type}`,
				properties: { innerHTML: message }
			});

			NotificationService.container.appendChild(notification);

			setTimeout(() => {
				NotificationService.container.removeChild(notification);
			}, NotificationService.duration);
		}
	}

	/**
	 * The prefix of all CSS classes used by extension. This approach helps to avoid collisions
	 * between custom class names and web-page class name.
	 * @type {string}
	 */
	const CSS_PREFIX = "bitcoin-extension";
	/**
	 * An ID for "Buy Bitcoin" button.
	 * @type {string}
	 */
	const BUY_BTN_ID = "bitcoin-extension-buy-btn";
	/**
	 * An ID for "Sell Bitcoin" button.
	 * @type {string}
	 */
	const SELL_BTN_ID = "bitcoin-extension-sell-btn";

	/**
	 * Configuration object to create HTML element with specified class, attributes and children.
	 */
	const elementConfig = {
		tagName: "div",
		className: `${CSS_PREFIX}-container`,
		children: [
			{
				tagName: "div",
				className: `${CSS_PREFIX}-toggle`,
				attributes: { draggable: true },
				properties: { onclick: togglePanel, ondrag: dragContainer },
				children: [
					{
						tagName: "img",
						className: `${CSS_PREFIX}-icon`,
						attributes: { src: chrome.runtime.getURL("assets/icon.png") }
					}
				]
			},
			{
				tagName: "div",
				className: `${CSS_PREFIX}-panel closed`,
				children: [
					{
						tagName: "div",
						className: `${CSS_PREFIX}-title`,
						properties: { innerHTML: "Your Bitcoin wallet" }
					},
					{
						tagName: "input",
						className: `${CSS_PREFIX}-input`,
						attributes: { disabled: true }
					},
					{
						tagName: "div",
						className: `${CSS_PREFIX}-hint`,
						properties: { innerHTML: "Bitcoins" }
					},
					{
						tagName: "div",
						className: `${CSS_PREFIX}-buttons-container`,
						children: [
							{
								tagName: "button",
								className: `${CSS_PREFIX}-btn`,
								attributes: { id: BUY_BTN_ID },
								properties: { innerHTML: "Buy Bitcoin", onclick: buyButtonHandler }
							},
							{
								tagName: "button",
								className: `${CSS_PREFIX}-btn`,
								attributes: { id: SELL_BTN_ID },
								properties: { innerHTML: "Sell Bitcoin", onclick: sellButtonHandler }
							}
						]
					}
				]
			}
		]
	};

	/**
	 * Toggles CSS class "closed" for panel.
	 */
	function togglePanel() {
		const panel = document.body.querySelector(`.${CSS_PREFIX}-panel`);
		panel.classList.toggle("closed");
	}

	/**
	 * Updates vertical position of main container.
	 * @param event An instance of DragEvent.
	 */
	function dragContainer(event) {
		const container = document.body.querySelector(`.${CSS_PREFIX}-container`);
		if (event.clientY === 0) {
			return;
		}

		// do not allow to drag panel outside of the screen top edge
		let top = Math.max(0, event.clientY - 50);
		// do not allow to drag panel outside of the screen bottom edge
		top = Math.min(top, window.innerHeight - 360);

		container.style.top = `${top}px`;
	}

	/**
	 * Sets the specified value to the input.
	 * @param value
	 */
	function setInputValue(value) {
		const input = document.body.querySelector(`.${CSS_PREFIX}-input`);
		input.value = value;
	}

	/**
	 * Sends message to the background script with type `BUY`.
	 */
	function buyButtonHandler() {
		chrome.runtime.sendMessage({ type: "BUY", amount: 1 }, response => {
			const { amount, error } = response;
			error === undefined ?
				setInputValue(amount) :
				NotificationService.showNotification("error", error);
		});
	}

	/**
	 * Sends message to the background script with type `SELL`.
	 */
	function sellButtonHandler() {
		chrome.runtime.sendMessage({ type: "SELL", amount: 1 }, response => {
			const { amount, error } = response;
			error === undefined ?
				setInputValue(amount) :
				NotificationService.showNotification("error", error);
		});
	}

	/**
	 * Event handler for received messages from background script.
	 * @param message Object with type an payload.
	 */
	function onMessageReceived(message) { }

	/**
	 * Initialization function.
	 */
	function init() {
		const container = UIHelper.buildHTML(elementConfig);
		document.body.appendChild(container);

		chrome.runtime.onMessage.addListener(onMessageReceived);
		chrome.runtime.sendMessage(
			{ type: "GET_AMOUNT" },
				response => setInputValue(response.amount)
		);
	}

	init();
})();