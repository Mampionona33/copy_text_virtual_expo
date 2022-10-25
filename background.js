/* 
  USE THIS TO SETUP CUSTUM SHURTCUT
  chrome://extensions/shortcuts
*/

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
// http://www.directindustry.com/r/FicheSociete.php?s=7337&w=24467ERTiNo4Hs6tZmC5l2D56Z41Y1Z2l2V7pzgri52S4p3T3&droit=on
chrome.commands.onCommand.addListener((command) => {
  getCurrentTab().then((currentTab) => {
    const tabId = currentTab.id;

    if (command === 'Copy_selected_text_to_En') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['./script/getEnText.js'],
      });
    }
    if (command === 'Copy_selected_text_to_DE') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['./script/getDeText.js'],
      });
    }
    if (command === 'Copy_selected_text_to_FR') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['./script/getFrText.js'],
      });
    }

    if (command === 'inject_text') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['./script/injectText.js'],
      });
    }
  });
});
