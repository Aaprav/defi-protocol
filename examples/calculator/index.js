console.clear()

let symbols = ["/","x","-","+","%","√"];
let inputs = [];
let currentInput = "";

  let calculate = (_input) =>{

    let _total = _input.reduce((i,j)=>{
      if(!j) return i;

      j = j.toString();

      if (j.length > 1 && j.charAt(0) == "√") {
        j = Math.sqrt(j.substring(1));
      }
      if(symbols.includes(j) || i.length <= 1){
        return `${i}${j}`;
      }else {

        let symbol = i.charAt(i.length-1);
        let val = parseFloat(i.slice(0, -1)) || 0;
        j = parseFloat(j);

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
          return val*j/100;
        }
      }
    },"");

    if(!_total) return 0;
    _total = _total.toString();

    if(isNaN(_total.charAt(_total.length - 1))){
      _total = _total.slice(0,-1);
    }

    _total = Math.floor((parseFloat(_total) || 0) * 1e6)/1e6;
    return _total;
  }





const renderInput = () => {
  let _text = inputs.join("") +""+ currentInput;
  let _inputs = inputs.concat([currentInput]);
  $(".display-input").val(_text || 0);
  $(".display-sum").val(calculate(_inputs));
}




$(".input-btn").click(function(e){
  let input = e.target.value;
  let last = inputs.length?inputs[inputs.length - 1]:"";

  if(input == "AC"){
    inputs = [];currentInput = "";
  }else if(input == "C"){
    if(currentInput){
      currentInput = currentInput.length == 1 && !!inputs.length?inputs.pop():currentInput.slice(0, -1);
    }else if(inputs.length){
      currentInput = inputs.pop().toString();
      currentInput = currentInput.slice(0, -1);
    }
  }else if(input == "=") {
    if(currentInput && !isNaN(currentInput)){
      inputs.push(currentInput)
    }
    currentInput = calculate(inputs).toString();
    inputs = [];
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
