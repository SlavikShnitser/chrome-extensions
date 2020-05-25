/** Stores selected keywords. */
let KEYWORDS = {};

/**
 * Merge new keywords with existing.
 * @param keywords An array of keywords.
 */
function addKeyWords(keywords) {
  keywords.forEach(word => {
    if (KEYWORDS[word] !== undefined) {
      KEYWORDS[word]++;
    } else {
      KEYWORDS[word] = 1;
    }
  });
}

/**
 * Clears all selected keywords.
 */
function clearKeyWords() {
  KEYWORDS = {};
}

/**
 * Initialization function.
 */
function init() {
  chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      switch(message.type) {
        case "getKeywords":
          sendResponse(KEYWORDS);
          break;
        case "addKeywords":
          addKeyWords(message.keywords);
          break;
        case "clearKeywords":
          clearKeyWords();
          sendResponse(KEYWORDS);
          break;
        default:
          console.error("Unrecognised message: ", message);
      }
    }
  );
}

init();

