import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener(() => {
  browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // console.log(changeInfo)
    if (changeInfo.status === 'complete') {
      browser.tabs.executeScript(tabId, { file: './js/contentScript.bundle.js' })
        .then((res) => {
            browser.tabs.insertCSS({ file: './css/contentScript.css' }).catch((error) => { console.log(error) });
         })
        .catch((error) => {console.log(error)});
    }
  });
});