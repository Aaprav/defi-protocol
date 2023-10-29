
$( document ).ready(function() {
  let value = localStorage.getItem("theme") == "light"?false:true;
  $("#theme-toggle-input").prop('checked', value);
  toggleTheme(value);
});

$("#theme-toggle-input").click(function(e){
  toggleTheme(this.checked);
})

function toggleTheme(value = false){
  if(!value){
    localStorage.setItem("theme", "light");

    document.documentElement.style.setProperty('--base-dark', "#ddd");
    document.documentElement.style.setProperty('--base-light', "#aaa");

    document.documentElement.style.setProperty('--border-color', "#2DAB9F");
    document.documentElement.style.setProperty('--shadow-color', "#236864");

    document.documentElement.style.setProperty('--bg-btn', "#3F6965");
    document.documentElement.style.setProperty('--bg-btn-hover', "#124A44");
    document.documentElement.style.setProperty('--col-btn', "#fff");
    document.documentElement.style.setProperty('--col-btn-hover', "#32CCBC");

    document.documentElement.style.setProperty('--text-col-1', "#32CCBC");
    document.documentElement.style.setProperty('--text-col-2', "#222");
    document.documentElement.style.setProperty('--text-col-3', "#444");
    document.documentElement.style.setProperty('--text-col-4', "#444");
    document.documentElement.style.setProperty('--text-col-5', "#ccc");

    document.documentElement.style.setProperty('--blur-bg', "rgba(0, 0, 0, .4)");
  }else {
    localStorage.setItem("theme", "dark");

    document.documentElement.style.setProperty('--base-dark', "#16151a");
    document.documentElement.style.setProperty('--base-light', "#222227");

    document.documentElement.style.setProperty('--border-color', "#236864");
    document.documentElement.style.setProperty('--shadow-color', "#233135");


    document.documentElement.style.setProperty('--bg-btn', "#192629");
    document.documentElement.style.setProperty('--bg-btn-hover', "#2E3A3C");
    document.documentElement.style.setProperty('--col-btn', "#32CCBC");
    document.documentElement.style.setProperty('--col-btn-hover', "#fff");

    document.documentElement.style.setProperty('--text-col-1', "#32CCBC");
    document.documentElement.style.setProperty('--text-col-2', "#fff");
    document.documentElement.style.setProperty('--text-col-3', "#ccc");
    document.documentElement.style.setProperty('--text-col-4', "#999");
    document.documentElement.style.setProperty('--text-col-5', "#444");

    document.documentElement.style.setProperty('--blur-bg', "rgba(0, 0, 0, .8)");
  }
}

  let allTokens = [
    {symbol:"ETH",name:"Ether",decimals:18,img:"./assets/coins/eth.png",address:"-",hot:true},
    {symbol:"WETH",name:"Wrapped Ether",decimals:18,img:"./assets/coins/weth.png",address:"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",hot:true},
    {symbol:"1INCH",name:"1inch",decimals:18,img:"./assets/coins/1inch.png",address:"0x111111111117dC0aa78b770fA6A738034120C302"},
    {symbol:"AAVE",name:"Aave",decimals:18,img:"./assets/coins/aave.svg",address:"0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"},
    {symbol:"ABT",name:"Arcblock",decimals:18,img:"./assets/coins/abt.webp",address:"0xB98d4C97425d9908E66E53A6fDf673ACcA0BE986"},
    {symbol:"ACH",name:"Alchemy Pay",decimals:8,img:"./assets/coins/ach.webp",address:"0xEd04915c23f00A313a544955524EB7DBD823143d"},
    {symbol:"ADX",name:"Ambire AdEx",decimals:18,img:"./assets/coins/adx.png",address:"0xADE00C28244d5CE17D72E40330B1c318cD12B7c3"},
    {symbol:"AERGO",name:"Aergo",decimals:18,img:"./assets/coins/aergo.png",address:"0x91Af0fBB28ABA7E31403Cb457106Ce79397FD4E6"},
    {symbol:"DAI",name:"Dai Stablecoin",decimals:18,img:"./assets/coins/dai.png",address:"0x6B175474E89094C44Da98b954EedeAC495271d0F",hot:true},
    {symbol:"USDC",name:"USDC",decimals:18,img:"./assets/coins/usdc.png",address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",hot:true},
    {symbol:"USDT",name:"Tether USD",decimals:6,img:"./assets/coins/usdt.png",address:"0xdAC17F958D2ee523a2206206994597C13D831ec7",hot:true},
    {symbol:"WBTC",name:"Wrapped BTC",decimals:8,img:"./assets/coins/wbtc.png",address:"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",hot:true}
  ]

  let tokenA = {address:"-",balance:0}
  let tokenB = {address:"",balance:0}
  const updateTokenAddress = (switchId,address) => {
    switchId == "A"?(tokenA.address = address):(tokenB.address = address);
    let _filterString = $(".token-input").val();
    renderHotTokens(switchId,_filterString);
    renderTokens(switchId,_filterString);
  }

  const renderHotTokens = async(switchId = "A",filterString = "") =>{
    try {
      let _oppositeAddress = (switchId == "B"?tokenA:tokenB).address || "";
      let _currentAddress = (switchId == "A"?tokenA:tokenB).address || "";

      let _tokens = allTokens.filter(i=> !!i.hot && i.address != _oppositeAddress).map((token,i)=>{
        let{name,symbol,address,img } = token;
        return `<button onclick="updateTokenAddress('${switchId}','${address}');" key=${address}><img src=${img}><p>${symbol}</p></button>`
      });
      $(".popup .popup-body .popup-middle .hot-tokens-list").html(_tokens)
    } catch (e) {
      console.log(e);
    }
  }

  const renderTokens = async(switchId = "A",filterString = "") =>{
    try {
      let _oppositeAddress = (switchId == "B"?tokenA:tokenB).address || "";
      let _currentAddress = (switchId == "A"?tokenA:tokenB).address || "";

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
      }).map((token,i)=>{
        let{name,symbol,address,img } = token;
        return `<div class="coins-list${_currentAddress == address?" active":""}" onclick="updateTokenAddress('${switchId}','${address}');" key=${address}>
          <img src=${img}>
          <div class="coin-details"><p>${name}</p><span>${symbol}</span></div>
          <svg width="800px" height="800px" fill="none" viewBox="0 -0.5 25 25" ><path d="M5.5 12.5L10.167 17L19.5 8" /></svg>
        </div>`
      });
      $(".popup .popup-body .popup-last .coins-lists").html(_tokens)
    } catch (e) {
      console.log(e);
    }
  }


const renderSwitch = () =>{
  let _TA = $("#select-token-A .coin_list_select_inner");
  let _TB = $("#select-token-B .coin_list_select_inner");

  if(!tokenA.address ){
    _TA.html(`<div class="coin_list_select_inner"><p>Select a token</p></div>`)
  }else {
    let _t = allTokens.find(i=>i.address == tokenA.address);
    _TA.html(`<div class="coin_list_select_inner"><img src=${_t.img}><p>${_t.symbol}</p></div>`)
  }

  if(!tokenB.address ){
    _TB.html(`<div class="coin_list_select_inner"><p>Select a token</p></div>`)
  }else {
    let _t = allTokens.find(i=>i.address == tokenB.address);
    _TB.html(`<div class="coin_list_select_inner"><img src=${_t.img}><p>${_t.symbol}</p></div>`)
  }
}


$("#select-token-A").click(function(){
  $(".popup").show();
  renderHotTokens("A");
  renderTokens("A");
})
$("#select-token-B").click(function(){
  $(".popup").show();
  renderHotTokens("B");
  renderTokens("B");
})


$("#close-btn").click(function(){
  $(".popup").hide();
  renderSwitch()
})


$(".swap_input_toggle").click(function(){
  let _tokenA = tokenA;
  tokenA = tokenB;
  tokenB = _tokenA;
  renderSwitch()
})
