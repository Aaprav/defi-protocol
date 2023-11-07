
  const web3 = new Web3('http://192.168.29.14:7545');

  // let allTokens = [
  //   {symbol:"ETH",name:"Ether",decimals:18,img:"./assets/coins/eth.png",address:"-",hot:true},
  //   {symbol:"WETH",name:"Wrapped Ether",decimals:18,img:"./assets/coins/weth.png",address:"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",hot:true},
  //   {symbol:"1INCH",name:"1inch",decimals:18,img:"./assets/coins/1inch.png",address:"0x111111111117dC0aa78b770fA6A738034120C302"},
  //   {symbol:"AAVE",name:"Aave",decimals:18,img:"./assets/coins/aave.svg",address:"0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"},
  //   {symbol:"ABT",name:"Arcblock",decimals:18,img:"./assets/coins/abt.webp",address:"0xB98d4C97425d9908E66E53A6fDf673ACcA0BE986"},
  //   {symbol:"ACH",name:"Alchemy Pay",decimals:8,img:"./assets/coins/ach.webp",address:"0xEd04915c23f00A313a544955524EB7DBD823143d"},
  //   {symbol:"ADX",name:"Ambire AdEx",decimals:18,img:"./assets/coins/adx.png",address:"0xADE00C28244d5CE17D72E40330B1c318cD12B7c3"},
  //   {symbol:"AERGO",name:"Aergo",decimals:18,img:"./assets/coins/aergo.png",address:"0x91Af0fBB28ABA7E31403Cb457106Ce79397FD4E6"},
  //   {symbol:"DAI",name:"Dai Stablecoin",decimals:18,img:"./assets/coins/dai.png",address:"0x6B175474E89094C44Da98b954EedeAC495271d0F",hot:true},
  //   {symbol:"USDC",name:"USDC",decimals:18,img:"./assets/coins/usdc.png",address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",hot:true},
  //   {symbol:"USDT",name:"Tether USD",decimals:6,img:"./assets/coins/usdt.png",address:"0xdAC17F958D2ee523a2206206994597C13D831ec7",hot:true},
  //   {symbol:"WBTC",name:"Wrapped BTC",decimals:8,img:"./assets/coins/wbtc.png",address:"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",hot:true}
  // ]

  let allTokens = [
    {symbol:"ETH",name:"Ether",decimals:18,img:"./assets/coins/eth.png",address:"-",hot:true},
    {symbol:"WETH",name:"Wrapped Ether",decimals:18,img:"./assets/coins/weth.png",address:"0x23E024DB441c00b03e210F76CdEAA032b81769C9",hot:true},
    {symbol:"1INCH",name:"1inch",decimals:18,img:"./assets/coins/1inch.png",address:"0xB13b0c4CD7C2E0e911C96F73645bE809Fd498654"},
    {symbol:"AAVE",name:"Aave",decimals:18,img:"./assets/coins/aave.svg",address:"0x839FeCC37788Fe9680C01aA0EE13Ce0C464FA8B9"},
    {symbol:"ABT",name:"Arcblock",decimals:18,img:"./assets/coins/abt.webp",address:"0x0C85c2A5259fe25e2C86b17086e368B226685DfE"},
    {symbol:"ACH",name:"Alchemy Pay",decimals:8,img:"./assets/coins/ach.webp",address:"0xd4a06D85BC36AD5186b61DeFe4FaD968cEaF3446"},
    {symbol:"ADX",name:"Ambire AdEx",decimals:18,img:"./assets/coins/adx.png",address:"0x35662FDA63F1DAF877f645369467E2E895E2e83c"},
    {symbol:"AERGO",name:"Aergo",decimals:18,img:"./assets/coins/aergo.png",address:"0x8CaB881Af4297462003d71217F0c9F84F7355AB0"},
    {symbol:"DAI",name:"Dai Stablecoin",decimals:18,img:"./assets/coins/dai.png",address:"0xcC8c2D1767791497430902521e83a16E82141Cc3",hot:true},
    {symbol:"USDC",name:"USDC",decimals:18,img:"./assets/coins/usdc.png",address:"0x680d7c694C45bACDAFA388fD83997A4047Bf85B3",hot:true},
    {symbol:"USDT",name:"Tether USD",decimals:6,img:"./assets/coins/usdt.png",address:"0xf7447651E023548a5B832D43314e0D8368bFb7FE",hot:true},
    {symbol:"WBTC",name:"Wrapped BTC",decimals:8,img:"./assets/coins/wbtc.png",address:"0x57EBCC304C84Ffe7858735652C99E77E4a75B86f",hot:true}
  ]

  let switchId = "A";

  const Swap = {
    input : "-",
    input_value : 0,
    balance : 0,
    output : "",
    output_value : 0,
    slippage : 0,
    deadline : 0,
    mode : "sell",
  }

  const updatebalance = async() =>{
    try {
      Swap.balance = 0;
      DOM_BALANCE.innerHTML = 0;
      if (!Wallet.address || !Swap.input) return;

      let _bal = await new Promise(async(resolve,reject)=>{
        try {
          if(Swap.input == "-"){
            resolve(web3.eth.getBalance(Wallet.address))
          }else {
            const abi = [{constant: true,inputs: [{ name: "_owner", type: "address" }],name: "balanceOf",outputs: [{ name: "balance", type: "uint256"}],type: "function"}];
            const instance = new web3.eth.Contract(abi, Swap.input);
            resolve(instance.methods.balanceOf(Wallet.address).call())
          }
        } catch (e) {
          reject(e)
        }
      })
      Swap.balance = Helper.floor(_bal);
      let _decimals = allTokens.find(i=>i.address == Swap.input).decimals || 18;
      DOM_BALANCE.innerHTML = Helper.pretty.floor(Swap.balance / (10 ** _decimals),3,true);
    } catch (e) {
      Swap.balance = 0;
      DOM_BALANCE.innerHTML = 0;
    }
  }


  DOM_INPUT_VALUE.addEventListener("input", function(e) {
    e.preventDefault();
    let val = e.target.value;
    Swap.input_value = Helper.floor(val);
    this.value = Helper.sanitize(val);
    Swap.mode = "sell";

    if(Swap.output_value) {
      DOM_OUTPUT_VALUE.value = "";
      Swap.output_value = 0;
    }

    let {symbol} = allTokens.find(i=>i.address == Swap.input);
    DOM_SWAP_INFO.children[1].children[3].children[1].innerHTML = `${Helper.pretty.ceil(Swap.input_value * 0.0015,4,true)} ${symbol}`;

    // TODO: output calculate
  });
  DOM_OUTPUT_VALUE.addEventListener("input", function(e) {
    e.preventDefault();
    let val = e.target.value;
    Swap.output_value = Helper.floor(val);
    this.value = Helper.sanitize(val);
    Swap.mode = "buy";
    if (Swap.input_value) {
      DOM_INPUT_VALUE.value = "";
      Swap.input_value = 0;
    }
    // TODO: input calculate
  });

  DOM_SLIPPAGE_INPUT.addEventListener("input", function(e) {
    let value = e.target.value;

    let _parentElement = this.parentElement;
    if(value == "0"){
      _parentElement.style.borderColor  = "#E9BD0C";
    }else if (_parentElement.getAttribute("style")) {
      _parentElement.removeAttribute("style")
    }

    value = parseFloat(value);
    let _info = DOM_SWAP_INFO.children[1].children[1].children[1];
    if (_info.getAttribute("style")) {
      _info.removeAttribute("style")
    }

    if(value > 0 && value <= 200){
      _parentElement.style.borderColor  = "#0ABF30";
    }else if (value > 200) {
      _parentElement.style.borderColor  = "#E9BD0C";
      _info.style.color  = "#E9BD0C";
    }else if (value < 0) {
      _parentElement.style.borderColor  = "#E24D4C";
      _info.style.color  = "#E24D4C";
    }
    Swap.slippage = value;
    _info.innerHTML = `${value >=0?value:0.5} %`;
  });

  DOM_DEADLINE_INPUT.addEventListener("input", function(e) {
    let value = e.target.value;

    let _parentElement = this.parentElement;
    if(value == "0"){
      _parentElement.style.borderColor  = "#E9BD0C";
    }else if (_parentElement.getAttribute("style")) {
      _parentElement.removeAttribute("style")
    }

    value = parseFloat(value);

    let _info = DOM_SWAP_INFO.children[1].children[2].children[1];
    if (_info.getAttribute("style")) {
      _info.removeAttribute("style")
    }

    if(value > 0 && value <= 1440){
      _parentElement.style.borderColor  = "#0ABF30";
    }else if (value > 1440) {
      _parentElement.style.borderColor  = "#E9BD0C";
      _info.style.color  = "#E9BD0C";
    }else if (value < 0) {
      _parentElement.style.borderColor  = "#E24D4C";
      _info.style.color  = "#E24D4C";

    }
    Swap.deadline = value;
    _info.innerHTML = `${value >=0?value:10} minutes`;
  });




  const updateTokenAddress = (address) => {
    switchId == "A"?(Swap.input = address):(Swap.output = address);
    let _filterString = DOM_TOKEN_INPUT.value.toUpperCase();
    renderHotTokens();
    renderTokens(_filterString);
  }

  const renderHotTokens = async() =>{
    try {
      let _dummy = new Array(8).fill(`<button class="dummy"><span>&nbsp;</span><p>&nbsp;</p></button>`)
      DOM_POPUP.children[0].children[1].children[1].innerHTML = _dummy.join("");
      await Helper.wait(500);

      let _oppositeAddress = switchId == "B"?Swap.input:Swap.output;
      let _currentAddress = switchId == "A"?Swap.input:Swap.output;

      let _tokens = allTokens.filter(i=> !!i.hot && i.address != _oppositeAddress).map((token,i)=>{
        let{name,symbol,address,img } = token;
        return `<button onclick="updateTokenAddress('${address}');"><img src=${img}><p>${symbol}</p></button>`
      });
      DOM_POPUP.children[0].children[1].children[1].innerHTML = _tokens.join("");
    } catch (e) {
      console.log(e);
    }
  }

  const renderTokens = async(filterString = "") =>{
    try {

      let _dummy = new Array(8).fill(`<div class="coins-list dummy"><span>&nbsp;</span><div class="coin-details"><p>&nbsp;</p><span>&nbsp;</span></div></div>`)
      DOM_POPUP.children[0].children[2].children[0].innerHTML = _dummy.join("");
      await Helper.wait(500);

      let _oppositeAddress = switchId == "B"?Swap.input:Swap.output;
      let _currentAddress = switchId == "A"?Swap.input:Swap.output;

      let _tokens = allTokens.filter((data,i)=>{
        let{name,symbol,address } = data;
        if (address == _oppositeAddress) return null;

        if (filterString) {
          let _index = name.toUpperCase().search(filterString);
          _index = _index !== -1?_index:symbol.toUpperCase().search(filterString);
          _index = _index !== -1?_index:address.toUpperCase().search(filterString);
          return _index !== -1?data:null;
        }else {
          return data;
        }
      });

      _tokens = (_tokens.length?_tokens:allTokens).map((token,i)=>{
        let{name,symbol,address,img } = token;
        return `<div class="coins-list${_currentAddress == address?" active":""}" onclick="updateTokenAddress('${address}');"J>
          <img src=${img}>
          <div class="coin-details"><p>${name}</p><span>${symbol}</span></div>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"/></svg>
        </div>`
      });
      DOM_POPUP.children[0].children[2].children[0].innerHTML = _tokens.join("");
    } catch (e) {
      console.log(e);
    }
  }

  const renderSwapInfo = () =>{
    if (Swap.input && Swap.output) {
      DOM_SWAP_INFO.style.display = "block";
      let {symbol:symbolA} = allTokens.find(i=>i.address == Swap.input);
      let {symbol:symbolB} = allTokens.find(i=>i.address == Swap.output);

      DOM_SWAP_INFO.children[0].children[0].children[1].innerHTML = `${symbolA} per ${symbolB}`;

      DOM_SWAP_INFO.children[1].children[1].children[1].innerHTML = `${Swap.slippage || 0.5} %`;
      DOM_SWAP_INFO.children[1].children[2].children[1].innerHTML = `${Swap.deadline || 10} minutes`;
      DOM_SWAP_INFO.children[1].children[3].children[1].innerHTML = `${Helper.pretty.ceil(Swap.input_value * 0.0015,4,true)} ${symbolA}`;
    }else {
      DOM_SWAP_INFO.style.display = "none";
    }
  }


  const renderSwitch = () =>{
    if(!Swap.input ){
      DOM_INPUT_SWITCH.children[0].innerHTML = `<p>Select a token</p>`;
    }else {
      let _t = allTokens.find(i=>i.address == Swap.input);
      DOM_INPUT_SWITCH.children[0].innerHTML = `<img src=${_t.img}><p>${_t.symbol}</p>`;
    }

    if(!Swap.output ){
      DOM_OUTPUT_SWITCH.children[0].innerHTML = `<div class="coin_list_select_inner"><p>Select a token</p></div>`;
    }else {
      let _t = allTokens.find(i=>i.address == Swap.output);
      DOM_OUTPUT_SWITCH.children[0].innerHTML = `<div class="coin_list_select_inner"><img src=${_t.img}><p>${_t.symbol}</p></div>`;
    }

    renderSwapInfo()
  }

  DOM_BALANCE.addEventListener("click", function(e) {
    if (!Swap.balance) return;
    let _decimals = allTokens.find(i=>i.address == Swap.input).decimals || 18;
    let _val = Helper.floor(Swap.balance/(10 ** _decimals),3);
    if (_val <= 0.001) return;
    Swap.input_value = _val;
    DOM_INPUT_VALUE.value = _val;
  });


  DOM_INPUT_SWITCH.addEventListener("click", function(e) {
    DOM_POPUP.style.display = 'block';
    switchId = "A";
    renderHotTokens();
    renderTokens();
  });


  DOM_OUTPUT_SWITCH.addEventListener("click", function(e) {
    DOM_POPUP.style.display = 'block';
    switchId = "B";
    renderHotTokens();
    renderTokens();
  });

  DOM_POPUP_CLOSE.addEventListener("click", function(e) {
    DOM_POPUP.style.display = 'none';
    switchId = "";
    updatebalance();
    renderSwitch();

    if (Swap.mode = "sell") {
      Swap.output_value = 0;
      DOM_OUTPUT_VALUE.value = "";
    }else {
      Swap.input_value = 0;
      DOM_INPUT_VALUE.value = "";
    }
    // TODO: output calculate
  });

  DOM_TOKEN_INPUT.addEventListener("input", function(e) {
    let value = e.target.value;
    renderTokens(value.toUpperCase());
  });

  DOM_TOGGLE_INPUTS.addEventListener("click", function(e) {
    let _input = Swap.input;
    Swap.input = Swap.output;
    Swap.output = _input;

    Swap.input_value = Swap.output_value;
    Swap.output_value = 0;
    DOM_INPUT_VALUE.value = Swap.input_value || "";
    DOM_OUTPUT_VALUE.value = "";

    updatebalance();
    renderSwitch();

    // TODO: output calculate
  });


  DOM_SWAP_INFO_TOGGLE.addEventListener("click", function(e) {
    DOM_SWAP_INFO.classList.toggle("active");
  });



  document.addEventListener("DOMContentLoaded", function() {
    // Code to be executed when the DOM is ready
    Wallet.getAddress((err,account)=>{
      if(err) return console.log(err);
      // console.log(account);
      if(Swap.input) updatebalance();
    })
  });
