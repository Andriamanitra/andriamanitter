const instanceInput = document.getElementById("instance");

function storeSettings() {
    const instanceUrl = instanceInput.value;
    browser.storage.local.set({ instanceUrl });
}

function updateUI(restoredSettings) {
    instanceInput.value = restoredSettings.instanceUrl;
}

browser.storage.local.get().then(updateUI, console.error);
instanceInput.addEventListener("change", storeSettings);
