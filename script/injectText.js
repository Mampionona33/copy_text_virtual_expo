(() => {
  const currentUrl = window.location.href;
  const indexOfFirstEqual = currentUrl.indexOf('=');
  const indexOffirstAnd = currentUrl.indexOf('&');
  const event = new Event('change');

  const pid = currentUrl.slice(indexOfFirstEqual + 1, indexOffirstAnd);

  const idTextAreaEn = `ElementProduct[Modification][En][${pid}][IDPTexteEn]`;

  const textAreaEn = document.getElementById(idTextAreaEn);

  const idTextAreaDe = `ElementProduct[Modification][De][${pid}][IDPTexteDe]`;

  const textAreaDe = document.getElementById(idTextAreaDe);

  const idTextAreaFr = `ElementProduct[Modification][Fr][${pid}][IDPTexteFr]`;
  const textAreaFr = document.getElementById(idTextAreaFr);

  // inject idp text En
  chrome.storage.sync.get(['En_text', 'De_text', 'Fr_text'], (result) => {
    const enTxt = result.En_text;
    const deText = result.De_text;
    const frText = result.Fr_text;

    if (enTxt) {
      textAreaEn.value = enTxt.length > 0 ? enTxt : '';
      textAreaEn.dispatchEvent(event);
    }

    if (deText) {
      textAreaDe.value = deText.length > 0 ? deText : '';
      textAreaDe.dispatchEvent(event);
    }
    if (frText) {
      textAreaFr.value = frText.length > 0 ? frText : '';
      textAreaFr.dispatchEvent(event);
    }

    chrome.storage.sync.remove(['En_text', 'De_text', 'Fr_text'], () => {
      console.log('En_text was clear successully from storage');
    });

    const images = document.getElementsByTagName('img');

    const saveBtn = Array.from(images).filter(
      (elem) =>
        elem.currentSrc ===
        'http://img.directindustry.com/images_di/2ai/save-En.gif'
    );

    if (saveBtn.length > 0) {
      saveBtn.map((item) => item.click());
    }
  });
})();
