import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener(() => {
  browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log(changeInfo)
   if (changeInfo.status === 'complete') {
      browser.tabs.insertCSS({ file: './css/contentScript.css' })
        .catch((error) => { console.log(error) });
      browser.tabs.executeScript(tabId, { file: './js/contentScript.bundle.js' })
        .catch((error) => {console.log(error)});
    }
  })
});