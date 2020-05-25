(() => {
  /** An ID of keywords wrapper. */
  const KEYWORDS_WRAPPER_ID = 'keywords-wrapper';
  /** An ID of keywords count wrapper. */
  const KEYWORDS_COUNT_WRAPPER_ID = 'keywords-count';
  /** An ID of copy button. */
  const COPY_BTN_ID = 'copy-btn';
  /** An ID of clear button. */
  const CLEAR_BTN_ID = 'clear-btn';

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
      const color = 255 - (count - 1) * 30;
      const div = document.createElement('div');
      div.innerText = word;
      div.classList.add('keyword');
      div.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
      keyWordsWrapper.appendChild(div)
    });
  }

  /**
   * Copies all selected keywords to clipboard.
   */
  function copy() {
    getKeywords(keywords => {
      const textToCopy = keywords.map(({ word }) => word).join(', ');
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
    const copyBtn = document.getElementById(COPY_BTN_ID);
    const clearBtn = document.getElementById(CLEAR_BTN_ID);

    copyBtn.onclick = copy;
    clearBtn.onclick = clear;
    getKeywords(showKeyWords);
  }

  document.addEventListener('DOMContentLoaded', init);
})();