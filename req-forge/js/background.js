/**
 * Passing data to the server and return a response.
 * @param textData Text to check.
 * @returns {Promise} An array of errors.
 */
async function checkString(textData) {
	const response = await fetch('https://dev.api.reqforge.com/analyze', {
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
		default:
			console.error("Unrecognised message: ", message);
	}

	// Need to return true to allow `sendResponse` works inside the Promise.
	return true;
}

/** Initialization function. */
function init() {
	chrome.runtime.onMessage.addListener(onMessageReceived);
}

init();
