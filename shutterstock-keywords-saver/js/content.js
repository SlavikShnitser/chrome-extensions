(() => {
  /** CSS selector for keywords container. */
  const containerSelector = '.C_a_c';

  /**
   * Creates button to copy all keywords.
   * @param container Keywords container HTML element.
   * @param keywords An array of keywords.
   */
  function addCopyBtn(container, keywords) {
    const containerParent = container.parentElement;
    const classes = containerParent.querySelector('button').classList;
    const copyButton = document.createElement('button');

    copyButton.innerText = 'Copy all';
    copyButton.classList = classes;
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
