async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

const getCurrentUrl = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

chrome.commands.onCommand.addListener((command) => {
  getCurrentTab().then((currentTab) => {
    const tabId = currentTab.id;

    if (command === 'Copy_selected_text_to_En') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['./script/getEnText.js'],
      });
    }
    if (command === 'inject_text') {
      console.log(currentTab.url);
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['./script/injectText.js'],
      });
    }
  });
});
