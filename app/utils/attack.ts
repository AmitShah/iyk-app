import { ethers } from "ethers";
import dotenv from 'dotenv'; 
import abi from "./ABI.json";
dotenv.config(); 


export default async function generateAttack(tokenId:number, userAddress:string, quantity:number){
    const wallet = new ethers.Wallet(process.env.SIGNING_PK as string,new ethers.JsonRpcProvider("https://goerli.base.org"))
    let Boss = new ethers.Contract(process.env.BOSS_ADDRESS as string,abi);
    
    const boss = Boss.connect(wallet)
    const domain = {
        name: "BossERC1155",
        version: "1",
        chainId: (await wallet.provider?.getNetwork())?.chainId,
        verifyingContract: await boss.getAddress(),
      };
 
      const types = {
        AttackRequest: [
          { name: "tokenId", type: "uint256" },
          { name: "quantity", type: "uint256" },
          { name: "user", type: "address" },
          { name: "uid", type: "bytes32" },
        ],
      };
      const attackRequest = {
        tokenId: tokenId,
        quantity:quantity,
        user:userAddress,
        uid: ethers.hexlify(ethers.randomBytes(32))
      };
      
      const signature = await wallet.signTypedData(domain,types,attackRequest);
      console.log("typescript signer address:",wallet.address);
      return {attackRequest:attackRequest,signature:signature};      
    }