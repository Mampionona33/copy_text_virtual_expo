chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }
});

function checkCommandShortcuts() {
  chrome.commands.getAll((commands) => {
    let missingShortcuts = [];

    for (let { name, shortcut } of commands) {
      if (shortcut === '') {
        missingShortcuts.push(name);
      }
    }

    if (missingShortcuts.length > 0) {
      // Update the extension UI to inform the user that one or more
      // commands are currently unassigned.
      console.log('command unassigned');
    }
  });
}

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
