let profile = document.getElementById("profile");
let senderProfile = document.getElementById("sender-profile");
let chatList = document.getElementById("chat-list");
let message = document.getElementById("message");
let blurRange = document.getElementById("blur-range");
let blurMessage = document.getElementById("blur-message");
let blurMessageValue = document.getElementById("blur-value");
let messageReaction = document.getElementById("message-reaction");

let enablePrivacy = document.getElementById("enable");

function privacyEnable(privacyEnableChecked,blurPx,profileChecked,senderProfileChecked,chatListChecked,messageChecked,messageReactionChecked) {
    if(privacyEnableChecked) {
        blurRange.value = blurPx;
        blurMessage.style.filter = `blur(${blurPx}px)`;
        blurMessageValue.innerHTML = blurPx;
        profile.checked = profileChecked;
        senderProfile.checked = senderProfileChecked;
        chatList.checked = chatListChecked;
        message.checked = messageChecked;
        messageReaction.checked = messageReactionChecked;

        blurRange.disabled = false;
        blurRange.style.cursor = "pointer";

        profile.disabled = false;
        profile.nextElementSibling.style.cursor = "pointer";

        senderProfile.disabled = false;
        senderProfile.nextElementSibling.style.cursor = "pointer";

        chatList.disabled = false;
        chatList.nextElementSibling.style.cursor = "pointer";

        message.disabled = false;
        message.nextElementSibling.style.cursor = "pointer";

        messageReaction.disabled = false;
        messageReaction.nextElementSibling.style.cursor = "pointer";

    } else {
        blurRange.value = blurPx;
        blurMessage.style.filter = `blur(${blurPx}px)`;
        blurMessageValue.innerHTML = blurPx;
        profile.checked = profileChecked;
        senderProfile.checked = senderProfileChecked;
        chatList.checked = chatListChecked;
        message.checked = messageChecked;
        messageReaction.checked = messageReactionChecked;

        blurRange.disabled = true;
        blurRange.style.cursor = "not-allowed";

        profile.disabled = true;
        profile.nextElementSibling.style.cursor = "not-allowed";

        senderProfile.disabled = true;
        senderProfile.nextElementSibling.style.cursor = "not-allowed";

        chatList.disabled = true;
        chatList.nextElementSibling.style.cursor = "not-allowed";

        message.disabled = true;
        message.nextElementSibling.style.cursor = "not-allowed";

        messageReaction.disabled = true;
        messageReaction.nextElementSibling.style.cursor = "not-allowed";
    }
}

chrome.storage.sync.get(["blurPx","privacyEnableChecked","profileChecked","senderProfileChecked","chatListChecked","messageChecked","messageReactionChecked"],({blurPx,privacyEnableChecked,profileChecked,senderProfileChecked,chatListChecked,messageChecked,messageReactionChecked}) => {
    enablePrivacy.checked = privacyEnableChecked;
    privacyEnable(privacyEnableChecked,blurPx,profileChecked,senderProfileChecked,chatListChecked,messageChecked,messageReactionChecked);
});

enablePrivacy.addEventListener('click',async () => {
    chrome.storage.sync.get(["blurPx","privacyEnableChecked","profileChecked","senderProfileChecked","chatListChecked","messageChecked","messageReactionChecked"],({blurPx,privacyEnableChecked,profileChecked,senderProfileChecked,chatListChecked,messageChecked,messageReactionChecked}) => {
        privacyEnable(!privacyEnableChecked,blurPx,profileChecked,senderProfileChecked,chatListChecked,messageChecked,messageReactionChecked);
        chrome.storage.sync.set({privacyEnableChecked: !privacyEnableChecked});
    });
});


blurRange.addEventListener('change', () => {
    chrome.storage.sync.set({blurPx: blurRange.value});
    blurMessage.style.filter = `blur(${blurRange.value}px)`;
    blurMessageValue.innerHTML = blurRange.value;
})



profile.addEventListener('click', async () => {
    let data = await chrome.storage.sync.get("profileChecked");
    chrome.storage.sync.set({profileChecked: !data.profileChecked});
});

senderProfile.addEventListener('click', async () => {
    let data = await chrome.storage.sync.get("senderProfileChecked");
    chrome.storage.sync.set({senderProfileChecked: !data.senderProfileChecked});
});

chatList.addEventListener('click', async () => {
    let data = await chrome.storage.sync.get("chatListChecked");
    chrome.storage.sync.set({chatListChecked: !data.chatListChecked});
});

message.addEventListener('click', async () => {
    let data = await chrome.storage.sync.get("messageChecked");
    chrome.storage.sync.set({messageChecked: !data.messageChecked});
});

messageReaction.addEventListener('click', async () => {
    let data = await chrome.storage.sync.get("messageReactionChecked");
    chrome.storage.sync.set({messageReactionChecked: !data.messageReactionChecked});
});

// filterChatList.addEventListener('click', async () => {
//     let data = await chrome.storage.sync.get("filterChatSearchChecked");
//     chrome.storage.sync.set({filterChatSearchChecked: !data.filterChatSearchChecked});
// });