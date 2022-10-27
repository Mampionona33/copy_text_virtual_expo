const saveDomain = () => {
  const domaineName = document.getElementById('nomDeDomaine');

  if (domaineName.value.length > 0) {
    chrome.storage.sync.set({ DomaineName: domaineName.value }, () => {
      alert(`${domaineName.value} has been saved`);
      domaineName.value = '';
    });
  } else {
    alert('Domaine name required');
  }
};

const clearDomaineName = () => {
  chrome.storage.sync.get(['DomaineName'], (result) => {
    const nomDomaine = result.DomaineName;

    if (nomDomaine) {
      const confirmation = confirm(
        `Do you realy whant to clear ${nomDomaine} ?`
      );
      if (confirmation) {
        chrome.storage.sync.remove('DomaineName', () => {
          alert(`${nomDomaine} name has been removed successully`);
        });
      }
    } else {
      alert('There is no domaine saved');
    }
  });
};

document
  .getElementById('saveDomaineName')
  .addEventListener('click', saveDomain);

document
  .getElementById('clearDomaineName')
  .addEventListener('click', clearDomaineName);
