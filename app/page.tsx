'use client'

import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
//https://react-unity-webgl.dev/
export default function Home() {
  const { unityProvider,sendMessage,isLoaded} = useUnityContext({
    loaderUrl: "Unity/Build/Unity.loader.js",
    dataUrl: "Unity/Build/Unity.data",
    frameworkUrl: "Unity/Build/Unity.framework.js",
    codeUrl: "Unity/Build/Unity.wasm",
  });

  useEffect(()=>{


    // const urlParams = new URLSearchParams(window.location.search);
    // const iykRef = urlParams.get("iykRef")
    if(isLoaded){
      if (typeof window !== "undefined") {
        if((window as any).ethereum){
          try {
              (window as any).ethereum.request({
                  method: "eth_requestAccounts",
              }).then((accounts:any[])=>{
                  setTimeout(()=>{
                    const acct = accounts[0];
                    sendMessage("Main","UpdateState",JSON.stringify(
                      {
                        "userName":`${acct.substring(0,6)}...${acct.substring(acct.length -4)}`,
                        "targetIdx":1,
                        "bossHealth":666666,
                        "attackPower":580
                      }))
                  },5000);
              });
            
              
          } catch (error) {
              console.log(error)
          }
        }else{
          console.error("window.ethereum context unavailable")
        }
      }
    }
    // if (iykRef){
    //   axios.post("/api/state", {

    //   })
    // }
    //TODO get user address
    //Get IYKRef
    //Get user attack 

    //set empty array so useEffect should only be called once and not trigger rerender
  },[isLoaded])
  
  return (
    <main>
      <Unity unityProvider={unityProvider} 
         style={{          
          height: "100vh",
          width:"100%"
        }}
        devicePixelRatio={typeof window !== "undefined" ? window.devicePixelRatio:undefined}
        disabledCanvasEvents={["dragstart"]}
        />;
    </main>
  )
}
