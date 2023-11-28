document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('addwebhook').addEventListener('click',(event)=>{

        chrome.storage.sync.set({ webhook: document.getElementById('webhook').value });
        window.close();
    });
})