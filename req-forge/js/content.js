(() => {

	const TEST_STRING = "As a user, I do not want appropriate message, so that I have the information";

	function checkString(textData) {
		chrome.runtime.sendMessage({ type: "checkString", textData }, (errors) => {
			console.log(errors);
		});
	}

	function decorateTextarea(textarea) {
		const parent = textarea.parentElement;
		const highlightsWrapper = document.createElement("div");
		parent.insertBefore(highlightsWrapper, textarea);
	}

	const textarea = document.querySelector("textarea");

	decorateTextarea(textarea);
})();