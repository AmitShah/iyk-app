if (Object.hasOwn(BigInt.prototype,"toJSON")===false){
    Object.defineProperty(BigInt.prototype,"toJSON",{
        get(){
            'use string';
            return ()=> String(this);
        }
    })
}