
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"content { height: ",[0,400],"; margin-top: ",[0,10],"; }\n.",[1],"top{ display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }\n.",[1],"left{ margin-top: ",[0,20],"; margin-left: ",[0,10],"; }\n.",[1],"title{ padding-left: ",[0,20],"; padding-top: 40px; }\n.",[1],"image1{ width: ",[0,50],"; height: ",[0,50],"; padding-left: ",[0,400],"; padding-top: ",[0,40],"; }\n.",[1],"image2{ width: ",[0,50],"; height: ",[0,50],"; padding-left: ",[0,500],"; padding-top: ",[0,40],"; }\n",],undefined,{path:"./pages/index/index.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/index/index.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      