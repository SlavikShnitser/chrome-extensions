(() => {
  /** An ID of keywords wrapper. */
  const KEYWORDS_WRAPPER_ID = 'keywords-wrapper';
  /** An ID of keywords count wrapper. */
  const KEYWORDS_COUNT_WRAPPER_ID = 'keywords-count';
  /** An ID of clear button. */
  const CLEAR_BTN_ID = 'clear-btn';
  /** An ID of copy ALL button. */
  const COPY_ALL_BTN_ID = 'copy-all-btn';
  /** An ID of copy first 50 button. */
  const COPY_FIRST_50_BTN_ID = 'copy-50-btn';

  /**
   * Gets stored keywords from background script and sort them by count.
   * @param callback Callback function.
   */
  function getKeywords(callback) {
    chrome.runtime.sendMessage({type: "getKeywords"}, (keywords) => {
      const sortedKeywords = Object.keys(keywords)
        .map(word => ({ word, count: keywords[word] }))
        .sort((a, b) => b.count - a.count);
      callback(sortedKeywords);
    });
  }

  /**
   * Sends a message to background script to clear all selected keywords.
   */
  function clear() {
    chrome.runtime.sendMessage({type: "clearKeywords"}, () => showKeyWords([]));
  }

  /**
   * Displays selected keywords.
   * @param keywords Selected keywords.
   */
  function showKeyWords(keywords) {
    const keyWordsWrapper = document.getElementById(KEYWORDS_WRAPPER_ID);
    const keyWordsCountWrapper = document.getElementById(KEYWORDS_COUNT_WRAPPER_ID);

    keyWordsCountWrapper.innerText = `Total count: ${keywords.length}`;
    keyWordsWrapper.innerHTML = '';
    keywords.forEach(({word, count}) => {
      const div = document.createElement('div');
      div.innerText = word;
      div.classList.add('keyword');
      div.style.backgroundColor = getKeywordColor(count);
      keyWordsWrapper.appendChild(div)
    });
  }

  /**
   * Calculates background color for keyword based on its count.
   * @param count Defines how many times keyword was used.
   * @returns {string} RGB color string.
   */
  function getKeywordColor(count) {
    const color = 255 - (count - 1) * 30;
    return `rgb(${color}, ${color}, ${color})`;
  }

  /**
   * Copies selected keywords to clipboard.
   * @param count Count of keywords to copy. Not specify to copy all keywords.
   */
  function copy(count) {
    getKeywords(keywords => {
      const textToCopy = keywords
        .filter((item, index) => {
          return count === undefined
            ? true
            : index < count;
        })
        .map(({ word }) => word)
        .join(', ');
      copyToClipboard(textToCopy);
    });
  }

  /**
   * Copies specified text to clipboard.
   * @param text Text to be copied.
   */
  function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.textContent = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.blur();
    document.body.removeChild(textArea);
  }

  /**
   * Initialization function.
   */
  function init() {
    const clearBtn = document.getElementById(CLEAR_BTN_ID);
    const copyAllBtn = document.getElementById(COPY_ALL_BTN_ID);
    const copyFirst50Btn = document.getElementById(COPY_FIRST_50_BTN_ID);

    clearBtn.onclick = clear;
    copyAllBtn.onclick = () => copy();
    copyFirst50Btn.onclick = () => copy(50);

    getKeywords(showKeyWords);
  }

  document.addEventListener('DOMContentLoaded', init);
})();