const ENV = "dev";
// const ENV = "prod";

const REQUEST_DELAY = 400; // value in milliseconds

const JIRA_CONFIG = {
	selectors: [
		'textarea',
		'input',
		'div[contenteditable=true]'
	],
	wordsToSkip: ['search']
}
const EMPTY_CONFIG = {
	selectors: [],
	wordsToSkip: []
};
const CONFIG = {
	'jira': JIRA_CONFIG,
	'atlassian': JIRA_CONFIG
};

/**
 * Passing data to the server and return a response.
 * @param textData Text to check.
 * @returns {Promise} An array of errors.
 */
async function checkString(textData) {
	const response = await fetch(`https://${ENV}.api.reqforge.com/analyze`, {
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain',
		},
		body: JSON.stringify({ textData })
	});
	return await response.json();
}

/**
 * Filters all tabs to find an active one and send message to it.
 * @param message Object with type and payload.
 */
const sendMessageToActiveTab = (message) => {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, message);
	});
};

/**
 * Event handler for received messages.
 * @param message Object with type and payload.
 * @param sender Message sender.
 * @param sendResponse Function to call when you have a response.
 */
const onMessageReceived = (message, sender, sendResponse) => {
	switch(message.type) {
		case "check_string":
			checkString(message.textData).then(sendResponse);
			break;
		case "get_config":
			const configKey = Object.keys(CONFIG).find(key => {
				return message.url.includes(key);
			});
			sendResponse(configKey ? CONFIG[configKey] : EMPTY_CONFIG);
			break;
		case "get_request_delay":
			sendResponse(REQUEST_DELAY);
			break;
		default:
			console.error("Unrecognised message: ", message);
	}

	// Need to return true to allow `sendResponse` works inside the Promise.
	return true;
}

/** Initialization function. */
function init() {
	chrome.runtime.onMessage.addListener(onMessageReceived);

	// Removes all context menu items created by this extension.
	chrome.contextMenus.removeAll();

	// Adds new context menu item.
	chrome.contextMenus.create({
		contexts: ['selection'],
		title: 'Validate with ReqForge "%s"',
		onclick: function(info) {
			sendMessageToActiveTab({
				type: 'from_context_menu',
				text: info.selectionText
			});
		}
	});
}

init();
