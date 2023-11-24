'use client'

import axios from "axios";
import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { ethers } from "ethers";

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
          let provider = new ethers.BrowserProvider((window as any).ethereum)
          provider.getSigner().then((signer:any)=>{
            const boss = new ethers.Contract("0xfaD5EEC7989361571e1d4a7518Fb5a42b62d843d", [{
              "type": "function",
              "name": "attackWithSignature",
              "inputs": [
                {
                  "type": "tuple",
                  "name": "_req",
                  "components": [
                    {
                      "type": "uint256",
                      "name": "tokenId",
                      "internalType": "uint256"
                    },
                    {
                      "type": "uint256",
                      "name": "quantity",
                      "internalType": "uint256"
                    },
                    {
                      "type": "address",
                      "name": "user",
                      "internalType": "address"
                    },
                    {
                      "type": "bytes32",
                      "name": "uid",
                      "internalType": "bytes32"
                    }
                  ],
                  "internalType": "struct Boss.AttackRequest"
                },
                {
                  "type": "bytes",
                  "name": "_signature",
                  "internalType": "bytes"
                }
              ],
              "outputs": [
                {
                  "type": "address",
                  "name": "signer",
                  "internalType": "address"
                }
              ],
              "stateMutability": "payable"
            }], signer)
            
            try {
                (window as any).ethereum.request({
                    method: "eth_requestAccounts",
                }).then((accounts:any[])=>{
                  const { searchParams } = new URL(window.location.href)
                  const iykRef = searchParams.get('iykRef')
                    axios.get('/api/iyk',{
                      params:{
                        userAddress:accounts[0],
                        iykRef:iykRef
                      }
                    }).then((res:any)=>{
                      console.log(res);
                      const attackRequest = res.data;
                      debugger
                      boss.attackWithSignature(attackRequest.attackRequest.attackRequest,attackRequest.attackRequest.signature).then((tx:any)=>{
                        console.log(tx);
                      });
                    
                      setTimeout(()=>{
                        const acct = accounts[0];
                        
                        sendMessage("Main","UpdateState",JSON.stringify(
                          {
                            "userName":`${acct.substring(0,6)}...${acct.substring(acct.length -4)}`,
                            "targetIdx":attackRequest.targetIdx,
                            "bossHealth":attackRequest.health,
                            "attackPower":580
                          }))
                      },5000);
                    })              
                });                                
      
            } catch (error) {
                console.log(error)
            }
          })
        
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
