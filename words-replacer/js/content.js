(() => {
	/** Stores a number of how many words were replaced on current page. */
	let counter;

	/**
	 * Recursive function that searches for a string in a given DOM node and replaces each match with
	 * a specified text.
	 * @param element The element or text-node to search within.
	 * @param wordToReplace A string of text to be replaced.
	 * @param replacement A String of text to replace matches with.
	 */
	function replaceInText(element, wordToReplace, replacement) {
		for (let node of element.childNodes) {
			switch (node.nodeType) {
				case Node.ELEMENT_NODE:
				case Node.DOCUMENT_NODE:
					replaceInText(node, wordToReplace, replacement);
					break;
				case Node.TEXT_NODE:
					node.textContent = replaceWord(node.textContent, wordToReplace, replacement);
					break;
			}
		}
	}

	/**
	 * Finds and replaces specified word in a given string.
	 * @param string A string to search within.
	 * @param wordToReplace A word to be replaced.
	 * @param replacement A word to replace matches with.
	 * @returns {string} New string with replaced words.
	 */
	function replaceWord(string, wordToReplace, replacement) {
		const regExp = new RegExp(`\\b${wordToReplace}\\b`, 'gi');
		return string.replace(regExp, (matched) => {
			counter++;
			return matched.split('').reduce((result, char, index) => {
				result += isUpperCased(char)
					? replacement[index].toUpperCase()
					: replacement[index];
				return result;
			}, '');
		});
	}

	/**
	 * Checks is specified character is upper cased.
	 * @param char Character to check.
	 * @returns {boolean} `true` is specified character is upper cased, otherwise `false`.
	 */
	function isUpperCased(char) {
		return char === char.toUpperCase();
	}

	/**
	 * Event handler for received messages from background script.
	 * @param message Object with type an payload.
	 */
	function onMessageReceived(message) {
		if(message.type === "clicked_browser_action") {
			counter = 0;
			Object.keys(message.rules).forEach(originalWord => {
				const wordWithAccent = message.rules[originalWord];
				replaceInText(document.body, originalWord, wordWithAccent);
			});
			console.log(`[WORDS REPLACER]: ${counter} words were replaced`);
		}
	}

	/**
	 * Initialization function.
	 */
	function init() {
		chrome.runtime.onMessage.addListener(onMessageReceived);
	}

	init();
})();