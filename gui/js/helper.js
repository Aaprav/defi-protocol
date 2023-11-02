

  const helper = {
    Zero_address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",

    shortAddress : (address)=>{
      if(!address) return "No Address";
      if(address === helper.Zero_address) return "Null Address"
      return address.substring(0, 6)+"..."+address.substring(address.length - 4, address.length);
    },
    wait : async(time = 3000) =>await new Promise((resolve)=>setTimeout(resolve, time)),

    sanitize : (val,decimal = 6)=>{
      val = parseFloat(val);
      if(isNaN(val) || val < 0) return "";
        decimal = Math.floor(decimal)
        if(isNaN(decimal)){
         decimal = 6;
        }
      return Math.floor(val * (10 ** decimal)) / (10 ** decimal);
    },
    floor : (val,decimal = 6)=>{
      val = parseFloat(val);
      if(isNaN(val) || val < 0) return 0;
        decimal = Math.floor(decimal)
        if(isNaN(decimal)){
         decimal = 6;
        }
      return Math.floor(val * (10 ** decimal)) / (10 ** decimal);
    },

    ceil : (val,decimal = 6)=>{
        val = parseFloat(val);
        if(isNaN(val) || val < 0) return 0;
          decimal = Math.floor(decimal)
          if(isNaN(decimal)){
            decimal = 6;
          }
        return Math.ceil(val * (10 ** decimal)) / (10 ** decimal);
    },


     pretty : (function(){
      function calculate(val, decimal = 6){
        val = parseFloat(val);
       if(isNaN(val) || val <= 0){
         val = 0;
       }
        decimal = Math.floor(decimal)
       if(isNaN(decimal)){
         decimal = 6;
       }
       return[val,decimal]
      }
      function main(a, b) {
        let [v,d] = calculate(a, b)
        d = v > 1e8?Math.min(1,d):v > 1e7?Math.min(2,d):d;
        v = Math.ceil(v * (10 ** d)) / (10 ** d);
       return v.toLocaleString(undefined, { minimumFractionDigits: d });
      }
      function floor(a, b) {
        let [v,d] = calculate(a, b)
        v = Math.floor(v * (10 ** d)) / (10 ** d);
       return v.toLocaleString(undefined, { minimumFractionDigits: d });
      }
      function ceil(a, b) {
        let [v,d] = calculate(a, b)
        v = Math.ceil(v * (10 ** d)) / (10 ** d);
       return v.toLocaleString(undefined, { minimumFractionDigits: d });
      }
      function real(v, d) {
       return v.toLocaleString(undefined, { maximumFractionDigits: d });
      }
      function round(v, d = 6) {
        v = Math.round(v * (10 ** d)) / (10 ** d);
       return v.toLocaleString(undefined, { maximumFractionDigits: d });
      }

      main.floor= floor;
      main.ceil= ceil;
      main.real= real;
      main.round= round;


      return main;
    })(),

  }
