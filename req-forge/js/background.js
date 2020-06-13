
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

/** Initialization function. */
function init() {
	chrome.runtime.onMessage.addListener(
		function(message, sender, sendResponse) {
			switch(message.type) {
				case "checkString":
					checkString(message.textData).then(sendResponse);
					break;
				default:
					console.error("Unrecognised message: ", message);
			}

			// Need to return true to allow `sendResponse` works inside the Promise.
			return true;
		}
	);
}

init();
