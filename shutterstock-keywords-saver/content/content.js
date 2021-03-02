(() => {
  /** CSS selector for keywords container. */
  const containerSelector = '[data-automation=ExpandableKeywordsList_container_div]';
  /**
   * The prefix of all CSS classes used by extension. This approach helps to avoid collisions
   * between custom class names and web-page class name.
   * @type {string}
   */
  const CSS_PREFIX = "shutterstock-extension";

  /**
   * Creates button to copy all keywords.
   * @param container Keywords container HTML element.
   * @param keywords An array of keywords.
   */
  function addCopyBtn(container, keywords) {
    const containerParent = container.parentElement;
    const copyButton = document.createElement('button');

    copyButton.innerText = 'Copy all';
    copyButton.classList.add(`${CSS_PREFIX}__copy-btn`);
    copyButton.onclick = () => {
      chrome.runtime.sendMessage({type: "addKeywords", keywords});
    };

    containerParent.insertBefore(copyButton, container);
  }

  /**
   * Initialization function.
   */
  function init() {
    const container = document.querySelector(containerSelector);
    if (container) {
      const keywords = [...container.querySelectorAll('a')]
        .map(element => element.innerText);

      addCopyBtn(container, keywords);
    }
  }

  init();
})();
