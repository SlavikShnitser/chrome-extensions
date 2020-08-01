(() => {
	const TWO_OR_MORE_SPACES_REGEXP = /[ \t]{2,}/g;
	const FIRST_CHARACTER_SPACE_REGEXP = /^ /;

	const shouldConsolidate = (tokenA, tokenAType, tokenB, tokenBType) => {
		if (tokenAType === tokenBType) {
			return isTokenInsideAnotherToken(tokenA, tokenB);
		}

		if (tokenAType === 'suggestion' && tokenBType === 'critical') {
			// if intersects then consolidate suggestion into critical
			return isTokenInsideAnotherToken(tokenA, tokenB) || isTokenInsideAnotherToken(tokenB, tokenA);
		}

		// critical can never be consolidated into suggestion
		return false;
	};

	const isTokenInsideAnotherToken = (tokenA, tokenB) => {
		return tokenB.beginOffset <= tokenA.beginOffset
			&& tokenB.beginOffset + tokenB.text.length >= tokenA.beginOffset + tokenA.text.length;
	};

	const underlineToken = (textData, analysisToken, errorType, startOffset) => {
		const begin = analysisToken.beginOffset + startOffset;
		const end = begin + analysisToken.text.length;
		const word = textData.slice(begin, end);
		const replacedValue = `<mark class="${errorType}">${word}</mark>`;

		textData = replaceWord(textData, replacedValue, begin, end);

		return textData;
	};

	const replaceWord = (string, replace, start, end) =>
		`${string.slice(0, start)}${replace}${string.slice(end)}`;

	const EXTENSION_ICON_PATH = chrome.extension.getURL('assets/icon-48px.png');
	const MODAL_Z_INDEX = 999999;
	const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
	
.req-forge-hidden {
	display: none !important;	
}
.req-forge-icon {
	position: fixed;
  background-image: url("${EXTENSION_ICON_PATH}");
  background-repeat: no-repeat;
  background-size: 100% 100%;
	cursor: pointer;
	z-index: ${MODAL_Z_INDEX - 1};
}
.req-forge-highlights {
	position: fixed;
	background-color: transparent;
	color: transparent;
	pointer-events: none;
}
.req-forge-highlights mark {
	color: transparent;
}
.req-forge-highlights mark,
.req-forge-modal mark {
	border-bottom: 2px solid red;
	background: transparent;
	pointer-events: auto;
}
.req-forge-highlights mark.crit,
.req-forge-modal mark.crit {
    border-bottom: 2px solid red;
}
.req-forge-highlights mark.sugg,
.req-forge-modal mark.sugg {
    border-bottom: 2px solid #3090C7;
}

.req-forge-tooltip {
	display: none;
	position: fixed;
	margin-top: -5px;
  border-top: 5px solid transparent;
  transform: translateX(-50%);
	width: max-content;
  max-width: 500px;
  min-width: 200px;
	border: 1px solid #ebebeb;
	padding: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  background-color: #f5f5f5;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  z-index: ${MODAL_Z_INDEX + 1};
}
.req-forge-tooltip.req-forge-tooltip-top {
	margin-top: 5px;
  border-bottom: 5px solid transparent;
	transform: translate(-50%, calc(-100% - 10px));
}
.req-forge-tooltip.active {
	display: block;
}
.req-forge-tooltip .circle {
	display: inline-block;
	width: 8px;
	height: 8px;
	border-radius: 100%;
	margin-right: 8px;
}
.req-forge-tooltip .circle.crit {
	background-color: red;
}
.req-forge-tooltip .circle.sugg {
	background-color: #3090C7;
}
.req-forge-tooltip .title {
	display: inline-block;
	color: rgba(0, 0, 0, 0.2);
	font-size: 14px;
}
.req-forge-tooltip .details {
	margin-top: 10px;
	color: rgb(0, 0, 0);
	font-size: 14px;
}
.req-forge-tooltip .suggestions > div {
	display: inline-flex;
	align-items: center;
  justify-content: center;
  height: 24px;
  margin-top: 10px;
  margin-right: 8px;
  padding: 0 8px;
	border-radius: 16px;
  background-color: #b3e5fc;
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
}
.req-forge-tooltip .suggestions.disabled > div {
	background-color: #ebebeb;
	cursor: default;
}
.req-forge-modal-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: ${MODAL_Z_INDEX};
}
.req-forge-modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90vw;
	height: 90vh;
	max-width: 1200px;
  max-height: 742px;
  overflow: hidden;
  border: 1px solid #ebebeb;
  border-radius: 12px;
  background-color: #FBFBFB;
  box-shadow: 0 2px 18px 0 rgba(173,174,188,0.5);
  font-size: 16px;
  z-index: ${MODAL_Z_INDEX};
}
.req-forge-modal > .header {
	display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px 0;
}
.req-forge-modal > .header .req-forge-link {
	font-family: 'Lato', sans-serif;
	color: #0039FF;
	margin-right: 16px;
	text-decoration: none;
}
.req-forge-modal > .header svg {
	cursor: pointer;
}
.req-forge-modal > iframe {
	width: 100%;
	height: calc(100% - 61px);
	border: none;
}
`;

	const STYLE_PROPERTIES_TO_COPY = [
		['border', 'border'],
		['margin', 'margin'],
		['padding', 'padding'],
		['boxSizing', 'box-sizing'],
		['font', 'font'],
		['direction', 'direction'],
		['textAlign', 'text-align'],
		['textShadow', 'text-shadow'],
		['textIndent', 'text-indent'],
		['letterSpacing', 'letter-spacing'],
		['overflowWrap', 'overflow-wrap'],
		['verticalAlign', 'vertical-align'],
		['whiteSpace', 'white-space'],
		['wordBreak', 'word-break'],
		['wordSpacing', 'word-spacing'],
		['writingMode', 'writing-mode']
	];

	const inputHighlightMap = new Map();
	let tooltipElement;
	let modalWrapper;
	let modalIframe;
	let activeInput;
	let REQUEST_DELAY = 400;

	/**
	 * Sends data to background script.
	 * @param textData data to send.
	 * @param callback Callback function.
	 */
	function checkString(textData, callback) {
		chrome.runtime.sendMessage({ type: "check_string", textData }, callback);
	}

	/**
	 * Request configuration for current page from background script.
	 * @param callback Callback function.
	 */
	function getConfigurationForPage(callback) {
		chrome.runtime.sendMessage({ type: "get_config", url: document.URL }, callback);
	}

	/**
	 * Request request delay value from background script.
	 * @param callback Callback function.
	 */
	function getRequestDelay(callback) {
		chrome.runtime.sendMessage({ type: "get_request_delay" }, callback);
	}

	/**
	 * For a given input/textarea creates [[highlightsWrapper]] and [[extensionButton]].
	 * Adds resize and scroll event listeners.
	 * @param inputElement Input or text area.
	 */
	function decorateElement(inputElement) {
		if (inputHighlightMap.has(inputElement)) {
			return;
		}
		const shouldBeHidden = inputElement !== document.activeElement;

		const highlightsWrapper = document.createElement("div");
		highlightsWrapper.classList.add('req-forge-highlights');
		const extensionButton = document.createElement('div');
		extensionButton.classList.add('req-forge-icon');
		if (shouldBeHidden) {
			highlightsWrapper.classList.add('req-forge-hidden');
			extensionButton.classList.add('req-forge-hidden');
		}
		extensionButton.addEventListener('click', () => showModal(inputElement.value));

		inputHighlightMap.set(inputElement, {
			highlightsWrapper, extensionButton
		});

		copyDimensions(inputElement, highlightsWrapper, extensionButton);
		copyStyles(inputElement, highlightsWrapper);

		inputElement.addEventListener('focus', () => {
			activeInput = inputElement;
			for (let [key, value] of inputHighlightMap) {
				const methodName = key !== inputElement ? 'add' : 'remove';
				value.highlightsWrapper.classList[methodName]('req-forge-hidden');
				value.extensionButton.classList[methodName]('req-forge-hidden');
			}
		});

		let timeout;
		inputElement.onkeydown = () => {
			highlightsWrapper.innerHTML = '';
			if (timeout) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(() => validateInput(inputElement), REQUEST_DELAY);
		};

		new ResizeObserver(() => {
			copyDimensions(inputElement, highlightsWrapper, extensionButton);
		}).observe(inputElement);

		let parent = inputElement.parentElement;
		while (parent) {
			parent.addEventListener('resize', () => copyDimensions(inputElement, highlightsWrapper, extensionButton));
			parent.addEventListener('scroll', () => copyDimensions(inputElement, highlightsWrapper, extensionButton));
			parent = parent.parentElement;
		}
		window.addEventListener('resize', () => copyDimensions(inputElement, highlightsWrapper, extensionButton));
		window.addEventListener('scroll', () => copyDimensions(inputElement, highlightsWrapper, extensionButton));

		inputElement.parentElement.insertBefore(extensionButton, inputElement);
		inputElement.parentElement.insertBefore(highlightsWrapper, inputElement);

		validateInput(inputElement);
	}

	/**
	 * Calculates position and size of [[inputElement]] and updates position and size of
	 * [[highlightsWrapper]] and [[extensionButton]] elements.
	 * @param inputElement Input or text area.
	 * @param highlightsWrapper Container for highlighted elements.
	 * @param extensionButton Extension button related to the [[inputElement]].
	 */
	function copyDimensions(inputElement, highlightsWrapper, extensionButton) {
		const { width, height, top, left } = inputElement.getBoundingClientRect();
		const extensionButtonSize = 20;
		highlightsWrapper.style.width = `${width}px`;
		highlightsWrapper.style.height = `${height}px`;
		highlightsWrapper.style.top = `${top}px`;
		highlightsWrapper.style.left = `${left}px`;

		extensionButton.style.width = `${extensionButtonSize}px`;
		extensionButton.style.height = `${extensionButtonSize}px`;

		extensionButton.style.left = `${left + width - extensionButtonSize - 12}px`;
		if (inputElement.tagName === "INPUT") {
			// for the inputs align icon vertically
			extensionButton.style.top = `${top + (height - extensionButtonSize) / 2}px`;
		} else {
			// for text areas show icon on the bottom
			extensionButton.style.top = `${top + height - extensionButtonSize}px`;
		}
	}

	/**
	 * Copies all specified style properties from [[inputElement]] to [[highlightsWrapper]].
	 * @param inputElement Input or text area.
	 * @param highlightsWrapper Container for highlighted elements.
	 */
	function copyStyles(inputElement, highlightsWrapper) {
		const computedStylesMap = inputElement.computedStyleMap();
		STYLE_PROPERTIES_TO_COPY.forEach(([camelCasedProperty, dashSeparatedProperty]) => {
			const computedStyleProp = computedStylesMap.get(dashSeparatedProperty);
			if (computedStyleProp) {
				highlightsWrapper.style[camelCasedProperty] = computedStyleProp.toString();
			}
		});
	}

	function validateInput(inputElement) {
		const highlightsWrapper = inputHighlightMap.get(inputElement).highlightsWrapper;
		const value = inputElement.value.replace(TWO_OR_MORE_SPACES_REGEXP, ' ').replace(FIRST_CHARACTER_SPACE_REGEXP, '');
		checkString(value, (errors) => {
			const [html, combinedErrors] = highlightWords(errors, value);
			highlightsWrapper.innerHTML = html;

			const markElements = highlightsWrapper.querySelectorAll('mark');
			[...markElements].forEach((mark, i) => {
				mark.onmouseenter = (e) => showTooltip(e, combinedErrors[i], inputElement);
				mark.onmouseleave = (e) => {
					if (e.toElement !== tooltipElement) {
						hideTooltip();
					}
				};
			});
		});
	}

	function showTooltip(e, error, inputElement) {
		tooltipElement.innerHTML = '';
		tooltipElement.classList.add('active');
		tooltipElement.style.left = `${e.clientX}px`;
		tooltipElement.style.top = `${e.clientY + 5}px`;

		if (e.clientY > window.innerHeight / 2) {
			tooltipElement.classList.add('req-forge-tooltip-top');
		} else {
			tooltipElement.classList.remove('req-forge-tooltip-top');
		}

		const circle = document.createElement('div');
		circle.classList.add('circle', getClassNameForError(error));
		tooltipElement.appendChild(circle);

		const title = document.createElement('div');
		title.classList.add('title');
		title.innerText = error.rule;
		tooltipElement.appendChild(title);

		if (error.newTokens) {
			const suggestSection = document.createElement('div');
			suggestSection.classList.add('suggestions');
			error.newTokens.forEach(({text, beginOffset}) => {
				const element = document.createElement('div');
				element.innerText = text;

				if (inputElement) {
					element.onmousedown = (e) => e.preventDefault();
					element.onclick = (e) => {
						e.preventDefault();
						e.stopPropagation();
						const endOffset = beginOffset + error.existingTokens[0].text.length;
						suggestionClickHandler(inputElement, text, beginOffset, endOffset);
					};
				} else {
					suggestSection.classList.add('disabled');
				}

				suggestSection.appendChild(element);
			});
			tooltipElement.appendChild(suggestSection);
		}

		const details = document.createElement('div');
		details.classList.add('details');
		details.innerText = error.details;
		tooltipElement.appendChild(details);

		inputElement.parentElement.appendChild(tooltipElement);
	}

	function hideTooltip() {
		tooltipElement.innerHTML = '';
		tooltipElement.classList.remove('active');
	}

	function suggestionClickHandler(inputElement, text, beginOffset, endOffset) {
		inputElement.value = replaceWord(inputElement.value, text, beginOffset, endOffset);
		inputElement.dispatchEvent(new Event('change', { 'bubbles': true }));
		inputHighlightMap.get(inputElement).highlightsWrapper.innerHTML = '';
		validateInput(inputElement);
		hideTooltip();
	}

	const highlightWords = (data, newTextData) => {
		let result = newTextData;
		if (!data || data.length === 0) {
			return result;
		}

		const errors = data.errors.filter(error => error.existingTokens && error.status === 'active');

		for (let error of errors) {
			for (let anotherError of errors) {
				if (error === anotherError) {
					continue;
				}

				for (let token of error.existingTokens) {
					for (let anotherToken of anotherError.existingTokens) {
						if (shouldConsolidate(token, error.errorType, anotherToken, anotherError.errorType)) {
							error.existingTokens.splice(error.existingTokens.indexOf(token), 1);
							// if no existing tokens left - don't show the error
							if (error.existingTokens.length === 0) {
								error.status = 'disabled';
							}
						}
					}
				}
			}
		}

		let startOffset = 0;
		for (let error of errors) {
			for (let token of error.existingTokens) {
				result = underlineToken(result, token, getClassNameForError(error), startOffset);

				// 19 + 7 = 26 mark offset length
				startOffset += 26;
			}
		}

		return [result, errors.filter(e => e.existingTokens.length)];
	};

	const getClassNameForError = (error) => error.errorType === 'critical' ? 'crit' : 'sugg';

	/**
	 * Event handler for received messages from background script.
	 * @param message Object with type and payload.
	 */
	function onMessageReceived(message) {
		switch (message.type) {
			case "from_context_menu":
				showModal(message.text);
				break;
			default:
				console.error("Unrecognised message: ", message);
		}
	}

	/**
	 * Utility function to add CSS.
	 * @param {string} styleString
	 */
	function addStyle(styleString) {
		const style = document.createElement('style');
		style.textContent = styleString;
		document.head.append(style);
	}

	/**
	 * Creates tooltip element.
	 */
	function createTooltip() {
		tooltipElement = document.createElement('div');
		tooltipElement.classList.add('req-forge-tooltip');
		tooltipElement.addEventListener('click', (e) => e.stopPropagation());
		tooltipElement.onmouseleave = () => hideTooltip();
		document.body.appendChild(tooltipElement);
	}

	/**
	 * Creates modal element.
	 */
	function createModal() {
		modalWrapper = document.createElement('div');
		modalWrapper.classList.add('req-forge-modal-wrapper', 'req-forge-hidden');

		const modalElement = document.createElement('div');
		modalElement.classList.add('req-forge-modal');
		modalElement.addEventListener('click', (e) => e.stopPropagation());

		const modalHeader = document.createElement('div');
		modalHeader.classList.add('header');

		const headerLeftPart = document.createElement('div');
		headerLeftPart.innerHTML = `
			<a class="req-forge-link" href="https://reqforge.com/feedback" target="_blank">Feedback</a>
			<a class="req-forge-link" href="https://reqforge.com/blog" target="_blank">See what’s new</a>
		`;
		const headerRightPart = document.createElement('div');
		headerRightPart.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
		<path fill="#7A7A7A" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
		</svg>
		`;
		headerRightPart.addEventListener('click', () => closeModal());

		modalHeader.appendChild(headerLeftPart);
		modalHeader.appendChild(headerRightPart);
		modalElement.appendChild(modalHeader);

		modalIframe = document.createElement('iframe');
		modalElement.appendChild(modalIframe);

		modalWrapper.addEventListener('click', () => closeModal());
		modalWrapper.appendChild(modalElement);
		document.body.appendChild(modalWrapper);
	}

	function showModal(text) {
		modalIframe.setAttribute("src", getIframeSrc());
		modalIframe.onload = () => modalIframe.contentWindow.postMessage(text, "*");
		modalWrapper.classList.remove('req-forge-hidden');
	}

	function closeModal() {
		modalWrapper.classList.add('req-forge-hidden');
	}

	function getIframeSrc() {
		return chrome.extension.getURL('dist/index.html') + '?hash=' + Date.now();
	}

	/**
	 * Finds specified text ares on the page and adds event listeners to them.
	 */
	function parsePageInputs(pageConfig) {
		pageConfig.forEach(configItem => {
			const textAreas = document.querySelectorAll(configItem.selector);
			[...textAreas].forEach(element => decorateElement(element));
		});
	}

	/** Initialization function. */
	function init() {
		chrome.runtime.onMessage.addListener(onMessageReceived);

		addStyle(STYLES);
		createTooltip();
		createModal();

		getRequestDelay(delay => REQUEST_DELAY = delay);

		getConfigurationForPage(pageConfig => {
			pageConfig.push({
				selector: '.req-forge-modal-textarea'
			});
			setInterval(() => {
				parsePageInputs(pageConfig);
			}, 1000);
		});
	}

	init();
})();