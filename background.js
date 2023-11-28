chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ webhook: "notpresent" });
  });

chrome.action.onClicked.addListener(function(){
	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function(tab) {
        chrome.storage.sync.get("webhook",(result)=>{
            if(result.webhook==="notpresent"){
                //get webhook from user
                chrome.windows.create({
                    url: chrome.runtime.getURL("popup.html"),
                    type: "popup",
                    width: 600,
                    height: 400,    
                });

            }
            else{
                //send link
                const data = {
                    link: tab[0].url,
                    title: tab[0].title
                };
                var fault = false;
                console.log(tab[0].url, tab[0].title);
                fetch(result.webhook,{
                    mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(data => {
                    console.log(data);
                }).catch(err => {
                    fault = true;
                    chrome.windows.create({
                        url: chrome.runtime.getURL("popup.html"),
                        type: "popup",
                        width: 600,
                        height: 400,    
                    });
                });
                if(!fault){
                    // chrome.windows.create({
                    //     url: chrome.runtime.getURL("confirm.html"),
                    //     type: "popup",
                    //     width: 600,
                    //     height: 400,    
                    // });

                    // chrome.action.setPopup(
                    //     {popup: 'comfirm.html'}
                    //   );
                }
            }
        })
	});
});
