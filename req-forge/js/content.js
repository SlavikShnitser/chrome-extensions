(() => {

	const TEST_STRING = "As a user, I do not want appropriate message, so that I have the information";

	const STYLES = `
.req-force-highlights {
	position: fixed;
	background-color: transparent;
	color: transparent;
	pointer-events: none;
}
.req-force-highlights mark {
	color: transparent;
	border-bottom: 2px solid red;
	background: transparent;
}
.req-force-highlights mark.crit {
    border-bottom: 2px solid red;
}
.req-force-highlights mark.sugg {
    border-bottom: 2px solid #3090C7;
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

	function decorateElement(textarea) {
		const { width, height, top, left } = textarea.getBoundingClientRect();
		const parent = textarea.parentElement;
		const highlightsWrapper = document.createElement("div");
		highlightsWrapper.classList.add('req-force-highlights');
		highlightsWrapper.style.width = `${width}px`;
		highlightsWrapper.style.height = `${height}px`;
		highlightsWrapper.style.top = `${top}px`;
		highlightsWrapper.style.left = `${left}px`;

		const computedStylesMap = textarea.computedStyleMap();
		STYLE_PROPERTIES_TO_COPY.forEach(([camelCasedProperty, dashSeparatedProperty]) => {
			highlightsWrapper.style[camelCasedProperty] = computedStylesMap.get(dashSeparatedProperty).toString();
		});

		textarea.onkeydown = () => highlightsWrapper.innerHTML = '';

		parent.insertBefore(highlightsWrapper, textarea);

		return highlightsWrapper;
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
				checkString(element.value, (errors) => {
					console.log(errors);
					highlightElement.innerHTML = highlightWords(errors, element.value);
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
		return result;
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