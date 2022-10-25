(() => {
  const currentUrl = window.location.href;
  const indexOfFirstEqual = currentUrl.indexOf('=');
  const indexOffirstAnd = currentUrl.indexOf('&');
  const event = new Event('change');

  const pid = currentUrl.slice(indexOfFirstEqual + 1, indexOffirstAnd);
  const idEn = `ElementProduct[Modification][En][${pid}][IDPTexteEn]`;
  const idpEn = document.getElementById(idEn);

  chrome.storage.sync.get(['En_text'], (result) => {
    if (result) {
      const enTxt = result.En_text;
      idpEn.value = enTxt;
      idpEn.focus();
      idpEn.dispatchEvent(event);

      chrome.storage.sync.remove('En_text', () => {
        console.log('En_text was clear successully from storage');
      });
    }
  });
})();
