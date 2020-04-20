/** Stores words replacement rules. */
let RULES = {};

/**
 * Reads text from specified file.
 * @param filePath Path to the file.
 * @param callback A function to be called after file content was read.
 */
const readFileFromDisk = (filePath, callback) => {
	const url = chrome.extension.getURL(filePath) + '?v=' + (new Date()).getTime();
	const httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				callback(null, httpRequest.responseText);
			} else {
				callback(httpRequest.status);
			}
		}
	};
	httpRequest.open('GET', url);
	httpRequest.send();
};

/**
 * Reads and parse words replacement rules.
 * @param filePath Path to the file.
 * @returns {Promise<object>} Promise with words replacement rules object.
 */
const readRulesFromFile = (filePath) => {
	return new Promise(function(resolve, reject){
		readFileFromDisk(filePath, (error, content) => {
			if (error) {
				reject(error);
			} else {
				const rules = {};
				const words = content.split('\n');
				words.forEach(item => {
					const [originalWord, wordWithAccent] = item.split(', ');
					rules[originalWord] = wordWithAccent;
				});
				resolve(rules);
			}
		});
	});
};

/**
 * Filters all tabs to find an active one and send message to it.
 */
const sendMessageToActiveTab = () => {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {
			type: "clicked_browser_action",
			rules: RULES
		});
	});
};

/**
 * Initialization function.
 */
async function init() {
	RULES = await readRulesFromFile("assets/ita_words.csv");
	chrome.browserAction.onClicked.addListener(sendMessageToActiveTab);
}

init();