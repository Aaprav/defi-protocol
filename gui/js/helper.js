

  const helper = {

     shortAddress : (address)=>{
      if(!address) return "No Address";
      if(address === "0x0000000000000000000000000000000000000000") return "Null Address"
      return address.substring(0, 6)+"..."+address.substring(address.length - 4, address.length);
    },



    
  }
