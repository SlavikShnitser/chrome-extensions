/** Removes all context menu items create d by this extension. */
chrome.contextMenus.removeAll();

/** Adds new context menu item. */
chrome.contextMenus.create({
  contexts: ['selection'],
  title: 'Search Google Maps for "%s"',
  onclick: function(info) {
    const searchQuery = info.selectionText.replace(" ", "+");
    window.open(`https://www.google.com/maps/search/${searchQuery}`, '_blank');
  }
});