(() => {
  const selectedText = window.getSelection(0);
  const selectedTextToString = selectedText.toString();

  const anchorNode = selectedText.anchorNode.parentElement;

  const DOT = '•';

  let formatList = '';

  let outPutText = '';
  let nbTotalText = 0;

  if (anchorNode.tagName.match(/li/gi)) {
    console.log(anchorNode.tagName);
    formatList = DOT + ' ' + selectedTextToString;
    formatList = formatList.replace(/\n/g, '\n' + DOT + ' ');
  } else {
    if (selectedTextToString.length > 0) {
      outPutText = outPutText.concat(selectedTextToString, '\n');
    }
  }

  chrome.storage.sync.get(['De_text'], (result) => {
    if (Object.keys(result).length > 0) {
      let prevText = '';
      prevText = result.De_text;
      if (prevText.length < 1700) {
        if (formatList.length > 0) {
          outPutText = prevText.concat('\n', formatList);
        } else {
          outPutText = prevText.concat('\n', selectedTextToString);
        }
        nbTotalText = prevText.length + outPutText.length;
        if (nbTotalText < 1700) {
          chrome.storage.sync.set({ De_text: outPutText }, () =>
            console.log(outPutText)
          );
        } else {
          alert(`Nombre de caractère pour idp text DE  atteint ${nbTotalText}`);
        }
      }
    } else {
      if (formatList.length > 0) {
        chrome.storage.sync.set({ De_text: formatList }, () =>
          console.log(formatList)
        );
      }
      chrome.storage.sync.set({ De_text: outPutText }, () =>
        console.log(outPutText)
      );
    }
  });
})();
