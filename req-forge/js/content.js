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

	const EXTENSION_ICON_PATH = 'http://res2.weblium.site/res/5e223207439d4b0022158010/5e22399d439d4b0022159121_optimized';
	const STYLES = `
.req-forge-icon {
	position: fixed;
	width: 35px;
  height: 35px;
  background-image: url("${EXTENSION_ICON_PATH}");
  background-repeat: no-repeat;
  background-size: 100% 100%;
	cursor: pointer;
	z-index: 9999999;
}
.req-forge-highlights {
	position: fixed;
	background-color: transparent;
	color: transparent;
	pointer-events: none;
}
.req-forge-highlights mark {
	color: transparent;
	border-bottom: 2px solid red;
	background: transparent;
	pointer-events: auto;
}
.req-forge-highlights mark.crit {
    border-bottom: 2px solid red;
}
.req-forge-highlights mark.sugg {
    border-bottom: 2px solid #3090C7;
}

.req-forge-tooltip {
	display: none;
	position: fixed;
  transform: translateX(-50%);
	width: max-content;
  max-width: 500px;
  min-width: 200px;
	border: 1px solid #ebebeb;
	padding: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  background-color: #f5f5f5;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  z-index: 9999999;
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
	font-size: 16px;
}
.req-forge-tooltip .details {
	margin-top: 10px;
	color: rgb(0, 0, 0);
	font-size: 14px;
}
`;

	const STYLE_PROPERTIES_TO_COPY = [
		['border', 'border'],
		['margin', 'margin'],
		['padding', 'padding'],
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

	/**
	 * Sends data to background script.
	 * @param textData data to send.
	 * @param callback Callback function.
	 */
	function checkString(textData, callback) {
		chrome.runtime.sendMessage({ type: "check_string", textData }, callback);
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

		const highlightsWrapper = document.createElement("div");
		inputHighlightMap.set(inputElement, highlightsWrapper);
		highlightsWrapper.classList.add('req-forge-highlights');

		const extensionButton = document.createElement('div');
		extensionButton.classList.add('req-forge-icon');
		extensionButton.onclick = () => extensionButtonClickHandler(inputElement, highlightsWrapper);

		copyDimensions(inputElement, highlightsWrapper, extensionButton);
		copyStyles(inputElement, highlightsWrapper);

		inputElement.onkeydown = () => highlightsWrapper.innerHTML = '';

		new ResizeObserver(() => {
			copyDimensions(inputElement, highlightsWrapper, extensionButton);
		}).observe(inputElement);
		window.addEventListener('resize', () => copyDimensions(inputElement, highlightsWrapper, extensionButton));
		window.addEventListener('scroll', () => copyDimensions(inputElement, highlightsWrapper, extensionButton));

		inputElement.parentElement.insertBefore(extensionButton, inputElement);
		inputElement.parentElement.insertBefore(highlightsWrapper, inputElement);
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
		const extensionButtonSize = 35;
		highlightsWrapper.style.width = `${width}px`;
		highlightsWrapper.style.height = `${height}px`;
		highlightsWrapper.style.top = `${top}px`;
		highlightsWrapper.style.left = `${left}px`;

		extensionButton.style.top = `${top + height - extensionButtonSize}px`;
		extensionButton.style.left = `${left + width - extensionButtonSize - 70}px`;
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

	function extensionButtonClickHandler(inputElement, highlightsWrapper) {
		const value = inputElement.value.replace(TWO_OR_MORE_SPACES_REGEXP, ' ').replace(FIRST_CHARACTER_SPACE_REGEXP, '');
		checkString(value, (errors) => {
			const [html, combinedErrors] = highlightWords(errors, value);
			highlightsWrapper.innerHTML = html;

			const markElements = highlightsWrapper.querySelectorAll('mark');
			[...markElements].forEach((mark, i) => {
				mark.onmouseenter = (e) => showTooltip(e, combinedErrors[i]);
				mark.onmouseleave = (e) => {
					if (e.toElement !== tooltipElement) {
						hideTooltip();
					}
				};
			});
		});
	}

	function showTooltip(e, error) {
		tooltipElement.innerHTML = '';
		tooltipElement.classList.add('active');
		tooltipElement.style.left = `${e.clientX}px`
		tooltipElement.style.top = `${e.clientY + 5}px`

		const circle = document.createElement('div');
		circle.classList.add('circle', getClassNameForError(error));

		const title = document.createElement('div');
		title.classList.add('title');
		title.innerText = error.rule;

		const details = document.createElement('div');
		details.classList.add('details');
		details.innerText = error.details;

		tooltipElement.appendChild(circle);
		tooltipElement.appendChild(title);
		tooltipElement.appendChild(details);
	}

	function hideTooltip() {
		tooltipElement.innerHTML = '';
		tooltipElement.classList.remove('active');
	}

	const highlightWords = (data, newTextData) => {
		let result = newTextData;
		if (!data || data.length === 0) {
			return result;
		}

		const errors = data.filter(error => error.existingTokens && error.status === 'active');

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
		// In case you will need to add communication with background script.
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
		tooltipElement.onmouseleave = () => hideTooltip();
		document.body.appendChild(tooltipElement);
	}

	/**
	 * Finds all text ares and text inputs on the page and adds event listeners to them.
	 */
	function parsePageInputs() {
		const textAreas = document.querySelectorAll('textarea');
		const inputs = document.querySelectorAll('input[type="text"]');
		[...textAreas, ...inputs].forEach(element => {
			element.addEventListener('focus', () => {
				setTimeout(() => decorateElement(element), 300);
			});
		});
	}

	/** Initialization function. */
	function init() {
		chrome.runtime.onMessage.addListener(onMessageReceived);
		addStyle(STYLES);
		createTooltip();
		parsePageInputs();
	}

	init();
})();