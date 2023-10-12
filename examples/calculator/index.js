console.clear()

$(".input-btn").click(function(e){
  let input = e.target.value;
  let value = $(".display-input").val();
  value = value != "0"?value:"";
  let last = !!value?value.charAt(value.length-1):"";

  if(input == "AC"){
    value = 0;
  }else if(input == "C"){
    value = !!value?value.slice(0, -1):"0";;
  }else if(input == "=") {

  }else if(!isNaN(input)) {
    value = value +""+ input;
  }else if(!value && input == ".") {
    value = "0."
  }else if(value && input != last) {
    if(!isNaN(last)){
      value = value +""+ input;
    }else {
      value = value.slice(0, -1) + input;
    }
  }

  value = !!value?value:"0";
  $(".display-input").val(value);
})
