var nitter = 'nitter.net';

browser.runtime.onInstalled.addListener(_details => {
    const instanceUrl = 'nitter.net';
    browser.storage.local.set({ instanceUrl });
});

browser.storage.local.get(data => {
    nitter = data.instanceUrl;
});

browser.storage.onChanged.addListener(changeData => {
    nitter = changeData.instanceUrl.newValue;
});

browser.webRequest.onBeforeRequest.addListener(
    details => {
        const url = new URL(details.url);
        return {
            redirectUrl: `https://${nitter}${url.pathname}${url.search}${url.hash}`
        };
    },
    {
        urls: [
            "*://mobile.twitter.com/*",
            "*://twitter.com/*"
        ]
    },
    ['blocking']
);
