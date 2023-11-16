import { NextRequest, NextResponse } from '@/node_modules/next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('iykRef')
    console.log("iykRef",id)
    try{
        const {data} = await axios.get(`https://api.iyk.app/refs/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-iyk-api-key': process.env.IYK_API_KEY
        },
        })

        console.log(data)
    }catch(err){
        console.error(err)
    }
     return NextResponse.json({ "hello":"world" })
  }
  