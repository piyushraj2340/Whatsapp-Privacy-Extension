let profile; 
let senderProfile; 
let chatList; 
let message; 
let messageConversion;


// let updateEvent = setInterval(() => {
//     // console.log(senderProfile);
//     // console.log(profile);
//     // console.log(chatList);
//     console.log(message);

//     if(profile.length && senderProfile.length && chatList.length && message.length) {
//         clearInterval(updateEvent);
//     }
// },1000);


// let profileEvent = setInterval(() => {
//     profile = document.querySelectorAll('[data-testid="chatlist-header"] img'); // working

//     if(profile.length) {
//         profile[0].style.filter = "blur(5px)";
//         clearInterval(profileEvent);
//     }
// },1000);
// let senderProfileEvent = setInterval(() => {
//     senderProfile = document.querySelectorAll('[data-testid="conversation-header"]'); // working when select chat list

//     if(senderProfile.length) {
//         senderProfile[0].style.filter = "blur(5px)";
//         clearInterval(senderProfileEvent);
//     }
// },1000);
// let chatListEvent = setInterval(() => {
//     chatList = document.querySelectorAll('[aria-label="Chat list"] > div'); // working

//     if(chatList.length) {
//         chatList.forEach((elem, index) => {
//             elem.style.filter = "blur(5px)";
//         });
//         clearInterval(chatListEvent);
//     }
// },1000);
// let messageEvent = setInterval(() => {
//     message = document.querySelectorAll('[role="application"] > div');
    

//     if(message.length) {
        
//         message.forEach((elem, index) => {
//             console.log(elem);
//             elem.style.filter = "blur(5px)";
//         })
//         clearInterval(messageEvent);
//     }
// });

// let messageConversionEvent = setInterval(() => {
//     messageConversion = document.querySelectorAll('[data-testid="conversation-panel-messages"]');
//     console.log(messageConversion);

//     if(messageConversion.length) {
//         messageConversion[0].addEventListener('scroll', () => {
//             setTimeout(() => {
//                 console.log("scrolling");
//                 message = document.querySelectorAll('[role="application"] > div');
//                 message.forEach((elem, index) => {
//                     elem.style.filter = "blur(5px)";
//                 })
//             },2000)
//         });
//         clearInterval(messageConversionEvent);
//     }
// },1000) ;

// testid="conversation-panel-messages"


// let blurSize = "5px";

const blurStyleCSS = (selector,value,blurSize) => {
    if(!value) {
        blurSize = 0;
    }
    let head = document.head || document.getElementsByTagName('head')[0];
    // given higher priority css so that override the given effect 
    let css = `${selector} {filter: blur(${blurSize}px) !important; transition: filter 0.5s !important; } ${selector}:hover {filter: blur(0px) !important;}`;
    let style = document.createElement('style');
    // style.innerText = css;
    head.appendChild(style);
    
    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}  


function updateCSS() {
    chrome.storage.sync.get(["blurPx","privacyEnableChecked","profileChecked","senderProfileChecked","chatListChecked","messageChecked","messageReactionChecked"],({blurPx,privacyEnableChecked,profileChecked,senderProfileChecked,chatListChecked,messageChecked,messageReactionChecked}) => {
        if(!privacyEnableChecked) {
            blurPx = 0;
        }

        // target whatsapp selectors 
        blurStyleCSS('[aria-label="profile photo"] img',profileChecked,blurPx); // personal profile picture blur 
        blurStyleCSS('#main header',senderProfileChecked,blurPx); // sender profile info appear on the top of the conversation
        blurStyleCSS('[aria-label="Group Info"] .copyable-area',senderProfileChecked,blurPx); // sender profile info appear on the right of the conversation after clicking the profile header
        blurStyleCSS('[aria-label="Chat list"] [role="listitem"]',chatListChecked,blurPx); // chat list appear on the left side 
        blurStyleCSS('[aria-label="Search results."] [role="listitem"]',chatListChecked,blurPx); // chat list after search on the left side
        blurStyleCSS('.focusable-list-item',messageChecked,blurPx); // message content appear on the middle of the screen
        blurStyleCSS('#main footer',messageChecked,blurPx); // message content appear on the bottom of the screen
        blurStyleCSS('.focusable-list-item .emoji',messageReactionChecked,blurPx*5);
        // blurStyleCSS('[data-testid="reaction-bubble"]',messageReactionChecked,blurPx);
    });
}

updateCSS();



chrome.storage.onChanged.addListener(() => {
    updateCSS();
})

