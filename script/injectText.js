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

  const idTextAreaEs = `ElementProduct[Modification][Es][${pid}][IDPTexteEs]`;
  const textAreaEs = document.getElementById(idTextAreaEs);

  const idTextAreaIt = `ElementProduct[Modification][It][${pid}][IDPTexteIt]`;
  const textAreaIt = document.getElementById(idTextAreaIt);

  const idTextAreaZh = `ElementProduct[Modification][Zh][${pid}][IDPTexteZh]`;
  const textAreaZh = document.getElementById(idTextAreaZh);

  const idTextAreaJp = `ElementProduct[Modification][Jp][${pid}][IDPTexteJp]`;
  const textAreaJp = document.getElementById(idTextAreaJp);

  const idTextAreaPt = `ElementProduct[Modification][Pt][${pid}][IDPTextePt]`;
  const textAreaPt = document.getElementById(idTextAreaPt);

  const idTextAreaRu = `ElementProduct[Modification][Ru][${pid}][IDPTexteRu]`;
  const textAreaRu = document.getElementById(idTextAreaRu);

  // inject idp text En
  chrome.storage.sync.get(
    [
      'En_text',
      'De_text',
      'Fr_text',
      'Es_text',
      'It_text',
      'Zh_text',
      'Jp_text',
      'Pt_text',
      'Ru_text',
    ],
    (result) => {
      const enTxt = result.En_text;
      const deText = result.De_text;
      const frText = result.Fr_text;
      const esText = result.Es_text;
      const itText = result.It_text;
      const zhText = result.Zh_text;
      const jpText = result.Jp_text;
      const ptText = result.Pt_text;
      const ruText = result.Ru_text;

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
      if (esText) {
        textAreaEs.value = esText.length > 0 ? esText : '';
        textAreaEs.dispatchEvent(event);
      }
      if (itText) {
        textAreaIt.value = itText.length > 0 ? itText : '';
        textAreaIt.dispatchEvent(event);
      }
      if (zhText) {
        textAreaZh.value = zhText.length > 0 ? zhText : '';
        textAreaZh.dispatchEvent(event);
      }
      if (jpText) {
        textAreaJp.value = jpText.length > 0 ? jpText : '';
        textAreaJp.dispatchEvent(event);
      }
      if (ptText) {
        textAreaPt.value = ptText.length > 0 ? ptText : '';
        textAreaPt.dispatchEvent(event);
      }
      if (ruText) {
        textAreaRu.value = ruText.length > 0 ? ruText : '';
        textAreaRu.dispatchEvent(event);
      }

      chrome.storage.sync.remove(
        [
          'En_text',
          'De_text',
          'Fr_text',
          'Es_text',
          'It_text',
          'Zh_text',
          'Jp_text',
          'Pt_text',
          'Ru_text',
        ],
        () => {
          console.log('Variables was clear successully from storage');
        }
      );

      const images = document.getElementsByTagName('img');

      const saveBtn = Array.from(images).filter(
        (elem) =>
          elem.currentSrc ===
          'http://img.directindustry.com/images_di/2ai/save-En.gif'
      );

      if (saveBtn.length > 0) {
        saveBtn.map((item) => item.click());
      }
    }
  );
})();
