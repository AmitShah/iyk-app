import {generateAttack,readHealth} from '@/app/utils/boss';
import "@/app/utils/helper";
import { NextRequest, NextResponse } from '@/node_modules/next/server';
import axios from 'axios';

const tagMap:Map<string,any> = new Map([
    ['1293660434600336',{'quantity':1,'targetIdx':0}],
    ['1302456527622544',{'quantity':2,'targetIdx':1}],
    ['1311252620644752',{'quantity':3,'targetIdx':2}],
])

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('iykRef')
    const userAddress = searchParams.get('userAddress') || '0xF97FcCD2A27F59f154D323dB5b40589146400e00'
    console.log("iykRef",id)
    console.log("userAddress",userAddress)
    try{
        const {data} = await axios.get(`https://api.iyk.app/refs/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-iyk-api-key': process.env.IYK_API_KEY
        },
        })
        /*
        {
            uid: '1311252620644752',
            isValidRef: true,
            poapEvents: [],
            linkedToken: {
                contractAddress: '0x1a910cc3614d30927e83c2f7d1116dc7072caa2b',
                chainId: 137,
                tokenId: '3',
                otp: 'TIDnpG3xbmt2wffv2Fy3f'
            }
        }
        */
        console.log(data)
        //TODO: we dont care if its a valid tapRef for testing because we cant open inside cb wallet yet
        if(data.isValidRef || true){
            let tag = tagMap.get(data.uid)
            if(tag){
                const attackRequest = await generateAttack(0,userAddress as string,tag.quantity)
                console.log("generate attackRequest:",attackRequest)
                const health = await readHealth(0)
                console.log("health:",health)
                return NextResponse.json({"attackRequest":attackRequest, "targetIdx":tag.targetIdx, "health":health})    
            }else{
                console.warn("tag not found:",data.uid)
            }
        }else{
            console.warn("invalid tapRef");
        }
    }catch(err){
        console.error(err)
    }
    return NextResponse.json({"attackRequest":null,"targetIdx":null});
}
  