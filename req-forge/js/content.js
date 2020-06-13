(() => {

	const TWO_OR_MORE_SPACES_REGEXP = /[ \t]{2,}/g;
	const FIRST_CHARACTER_SPACE_REGEXP = /^ /;

	const TEST_STRING = "As a user, I do not want appropriate message, so that I have the information";

	const STYLES = `
.req-forge-highlights {
	position: fixed;
	background-color: transparent;
	color: transparent;
	pointer-events: none;
}
.req-forge-highlights mark {
	position: relative;
	color: transparent;
	border-bottom: 2px solid red;
	background: transparent;
	pointer-events: auto;
}
.req-forge-highlights mark.crit {
    border-bottom: 2px solid red;
}
.req-forge-highlights mark.crit .req-forge-tooltip .circle {
	background-color: red;
}
.req-forge-highlights mark.sugg {
    border-bottom: 2px solid #3090C7;
}
.req-forge-highlights mark.sugg .req-forge-tooltip .circle {
	background-color: #3090C7;
}
.req-forge-highlights mark .req-forge-tooltip {
	display: none;
	position: absolute;
	left: 0;
  top: 20px;
  transform: translateX(-50%);
	width: max-content;
  max-width: 500px;
  min-width: 200px;
	border: 1px solid #ebebeb;
	padding: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  background-color: #f5f5f5;
  z-index: 1;
}
.req-forge-highlights mark:hover .req-forge-tooltip {
	display: block;
}
.req-forge-highlights mark .req-forge-tooltip .circle {
	display: inline-block;
	width: 8px;
	height: 8px;
	border-radius: 100%;
	margin-right: 8px;
}
.req-forge-highlights mark .req-forge-tooltip .title {
	display: inline-block;
	color: rgba(0, 0, 0, 0.2);
	font-size: 16px;
}
.req-forge-highlights mark .req-forge-tooltip .details {
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

	/**
	 * Utility function to add CSS.
	 * @param {string} styleString
	 */
	function addStyle(styleString) {
		const style = document.createElement('style');
		style.textContent = styleString;
		document.head.append(style);
	}

	function checkString(textData, callback) {
		chrome.runtime.sendMessage({ type: "check_string", textData }, callback);
	}

	function decorateElement(inputElement) {
		if (inputHighlightMap.has(inputElement)) {
			return inputHighlightMap.get(inputElement);
		}

		const highlightsWrapper = document.createElement("div");
		inputHighlightMap.set(inputElement, highlightsWrapper);

		highlightsWrapper.classList.add('req-forge-highlights');

		copyDimensions(inputElement, highlightsWrapper);
		copyStyles(inputElement, highlightsWrapper);

		inputElement.onkeydown = () => highlightsWrapper.innerHTML = '';

		new ResizeObserver(() => {
			copyDimensions(inputElement, highlightsWrapper);
		}).observe(inputElement);
		window.onresize = () => copyDimensions(inputElement, highlightsWrapper);
		window.onscroll = () => copyDimensions(inputElement, highlightsWrapper);

		inputElement.parentElement.insertBefore(highlightsWrapper, inputElement);

		return highlightsWrapper;
	}

	function copyDimensions(inputElement, highlightsWrapper) {
		const { width, height, top, left } = inputElement.getBoundingClientRect();
		highlightsWrapper.style.width = `${width}px`;
		highlightsWrapper.style.height = `${height}px`;
		highlightsWrapper.style.top = `${top}px`;
		highlightsWrapper.style.left = `${left}px`;
	}

	function copyStyles(inputElement, highlightsWrapper) {
		const computedStylesMap = inputElement.computedStyleMap();
		STYLE_PROPERTIES_TO_COPY.forEach(([camelCasedProperty, dashSeparatedProperty]) => {
			const computedStyleProp = computedStylesMap.get(dashSeparatedProperty);
			if (computedStyleProp) {
				highlightsWrapper.style[camelCasedProperty] = computedStyleProp.toString();
			}
		});
	}

	function addTooltips(highlightElement, combinedErrors) {
		const markElements = highlightElement.querySelectorAll('mark');

		[...markElements].forEach((mark, i) => {
			const error = combinedErrors[i];
			const tooltip = document.createElement('div');
			tooltip.classList.add('req-forge-tooltip');
			const circle = document.createElement('div');
			circle.classList.add('circle');
			const title = document.createElement('div');
			title.classList.add('title');
			title.innerText = error.rule;
			const details = document.createElement('div');
			details.classList.add('details');
			details.innerText = error.details;

			tooltip.appendChild(circle);
			tooltip.appendChild(title);
			tooltip.appendChild(details);

			mark.appendChild(tooltip);
		});
	}

	/**
	 * Event handler for received messages from background script.
	 * @param message Object with type and payload.
	 */
	function onMessageReceived(message) {
		if(message.type === "validate_active_input") {
			const element = document.activeElement;
			if (!element) {
				return;
			}

			if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
				const highlightElement = decorateElement(element);
				const value = element.value.replace(TWO_OR_MORE_SPACES_REGEXP, ' ').replace(FIRST_CHARACTER_SPACE_REGEXP, '');
				checkString(value, (errors) => {
					const [html, combinedErrors] = highlightWords(errors, value);
					highlightElement.innerHTML = html;
					addTooltips(highlightElement, combinedErrors);
				});
			}
		}
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
				result = underlineToken(result, token, error.errorType === 'critical' ? 'crit' : 'sugg', startOffset);

				// 19 + 7 = 26 mark offset length
				startOffset += 26;
			}
		}

		return [result, errors.filter(e => e.existingTokens.length)];
	};

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

	function init() {
		chrome.runtime.onMessage.addListener(onMessageReceived);
		addStyle(STYLES);
	}

	init();
})();