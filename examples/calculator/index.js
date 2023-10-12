console.clear()

let symbols = ["/","x","-","+","%","√"];
let inputs = [];
let currentInput = "";

  let calculate = (_input) =>{
    let _total = _input.reduce((i,j)=>{
      j = j.toString();

      if(symbols.includes(j) || i.length <= 1){
      return `${i}${j}`;
      }else {
      let symbol = i.charAt(i.length-1);
      let val = i.slice(0, -1);
      if (j.charAt(0) == "√") {
        j = Math.sqrt(j);
      }

      if(symbol == "/"){
        if(!j) return Infinity;
        return val/j;
      }else if (symbol == "x") {
        return val*j;
      }else if (symbol == "-") {
        return val-j;
      }else if (symbol == "+") {
        return val+j;
      }else if (symbol == "%") {
        return val%j;
      }
      }
    },"");
    _total = (_total || "").toString();
    _total = _total.split("").filter(i=>!symbols.includes(i)).join("");
    _total = Math.floor((_total || 0) * 1e6)/1e6;
    return _total;
  }





const renderInput = () => {
  let _text = inputs.join("") + currentInput;
  let _inputs = inputs.concat([currentInput]);
  $(".display-input").val(_text || 0);
  $(".display-sum").val(calculate(_inputs));
}





$(".input-btn").click(function(e){
  let input = e.target.value;
  let last = inputs.length?inputs[inputs.length - 1]:"";
  //
  if(input == "AC"){
    inputs = [];currentInput = "";
  }else if(input == "C"){
    if(currentInput){
      currentInput = currentInput.length == 1?inputs.pop():currentInput.slice(0, -1);
    }else if(inputs.length){
      currentInput = inputs.pop();
      currentInput = currentInput.slice(0, -1);
    }
  }else if(input == "=") {
    if(currentInput){
      if(!isNaN(currentInput)){
        inputs.push(currentInput)
      }
      currentInput = 0;
    }
    inputs = [calculate(inputs)]
  }else if(currentInput && input != "√") {
    if(currentInput.charAt(0) == "√"){
      if(!isNaN(input)){
        currentInput = `${currentInput}${input}`;
      }else if (currentInput.length > 1) {
        inputs.push(currentInput)
        currentInput = input;
      }
    }else if(isNaN(currentInput) == isNaN(input)) {
      currentInput = isNaN(input)?input:`${currentInput}${input}`;
    }else{
      inputs.push(currentInput)
      currentInput = input;
    }
  }else if (!isNaN(input) || (!currentInput && input == "√")) {
    currentInput = input;
  }
  renderInput()

})
