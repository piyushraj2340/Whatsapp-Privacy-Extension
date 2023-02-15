chrome.runtime.onInstalled.addListener(() => {
    let blurPx = 5;
    let privacyEnableChecked = false;
    let profileChecked = false;
    let senderProfileChecked = false;
    let chatListChecked = false;
    let messageChecked = false;
    let messageReactionChecked = false;
    

    chrome.storage.sync.set({blurPx,privacyEnableChecked,profileChecked,senderProfileChecked,chatListChecked,messageChecked,messageReactionChecked});


    console.log("Whatsapp Privacy Extension in running...");
});