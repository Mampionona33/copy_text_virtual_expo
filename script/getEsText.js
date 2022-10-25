(() => {
  const selectedText = window.getSelection(0);
  const selectedTextToString = selectedText.toString();

  const anchorNode = selectedText.anchorNode.parentElement;

  const DOT = '•';

  let formatList = '';

  let outPutText = ' ';

  if (anchorNode.tagName.match(/li/gi)) {
    console.log(anchorNode.tagName);
    formatList = DOT + ' ' + selectedTextToString;
    formatList = formatList.replace(/\n/g, '\n' + DOT + ' ');
  } else {
    if (selectedTextToString.length > 0) {
      outPutText = outPutText.concat(selectedTextToString, '\n');
    }
  }

  chrome.storage.sync.get(['Es_text'], (result) => {
    if (Object.keys(result).length > 0) {
      let prevText = '';
      prevText = result.Es_text;
      console.log(prevText);
      if (formatList.length > 0) {
        outPutText = prevText.concat('\n', formatList);
      } else {
        outPutText = prevText.concat('\n', selectedTextToString);
      }
      chrome.storage.sync.set({ Es_text: outPutText }, () =>
        console.log(outPutText)
      );
    } else {
      chrome.storage.sync.set({ Es_text: outPutText }, () =>
        console.log(outPutText)
      );
    }
  });
})();
