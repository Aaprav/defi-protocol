// console.clear()


  const Wallet = {
    address:"",
    balance:0,
    chainId:'0x539',// '0x539'

    connectWalletGui : () =>{
      if(Wallet.address){
        DOM_CONNECT_WALLET.innerHTML  = Helper.shortAddress(Wallet.address);
        DOM_SWAP_BTN.children[0].innerHTML  = "Swap Now";
        DOM_SWAP_BTN.disabled = false;
      }else {
        DOM_CONNECT_WALLET.innerHTML  = "Connect Wallet";
        DOM_SWAP_BTN.children[0].innerHTML  = "Connect Wallet";
        DOM_SWAP_BTN.disabled = true;
      }
    },

    setAddress : (address) => {
      if(Wallet.address == address) return;
      Wallet.address = address;
    },
    getAddress : (callback)=>{
      let _address = Wallet.address;
      callback(null,_address);
      setInterval(function () {
        if (_address !== Wallet.address) {
          _address = Wallet.address;
          callback(null,_address)
        }
      }, 2000);
    },

    handleAccountsChanged : (accounts) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      let _address = accounts.length?accounts[0]:"";

      if(!!_address && !Wallet.address){
        setToastAlert('Wallet Connected',"success");
      }else if (!_address && !!Wallet.address) {
        setToastAlert('Wallet Disconnected',"warning");
      }else if(!!_address && _address != Wallet.address) {
        setToastAlert('Wallet Changed',"info");
      }
      Wallet.setAddress(_address);
      Wallet.connectWalletGui();
    },

    handleChainChanged : (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      if(chainId !== Wallet.chainId){
        Wallet.setAddress("")
        setToastAlert('Chain Disconnected',"warning");
        Wallet.connectWalletGui();
      }
    },


   watcherInjected:false,
   isBtnClicked:false,
   handleConnectWallet : async(val) =>{
    try {
      if(Wallet.isBtnClicked) return setToastAlert('Please wait while we proccess',"info");
      Wallet.isBtnClicked = true;

      if (typeof window.ethereum === 'undefined') {
        return setToastAlert('Wallet is not installed!',"error");
      }

      await new Promise(async(resolve,reject) =>{
        if(!Wallet.address){
          resolve()
        }else {
          try {
            await window.ethereum.request({
              method: 'wallet_requestPermissions',
              params: [{ eth_accounts: {} }]
            });
            resolve()
          } catch (e) {
            reject(e)
          }
        }
      })

      await new Promise(async(resolve,reject) =>{
        if(window.ethereum.chainId === Wallet.chainId){
          resolve()
        }else {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params : [{ chainId: Wallet.chainId }] // chainId must be in hexadecimal numbers,
            })
            resolve()
          } catch (e) {
            reject(e)
          }
        }
      })

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // console.log(accounts);
      Wallet.handleAccountsChanged(accounts);

      if(!Wallet.watcherInjected){
        Wallet.watcherInjected = true;
        window.ethereum.on('accountsChanged', Wallet.handleAccountsChanged);
        window.ethereum.on('chainChanged', Wallet.handleChainChanged);
      }
      Wallet.isBtnClicked = false;
    } catch (e) {
      Wallet.isBtnClicked = false;
      let msg = e?.message??'Please authorize to access your account'
      setToastAlert(msg,"error")
    }
  },

  initInjected:false,
  init : () => {
    let _iteration = 0;
      if(!Wallet.initInjected){
        Wallet.initInjected = true;
        let timer = setInterval(async function(){
          _iteration += 1;
          if(typeof window.ethereum !== 'undefined'){
            clearInterval(timer);
            if(window.ethereum.chainId !== Wallet.chainId) {
              Wallet.initInjected = false;
            }else {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                Wallet.setAddress(accounts.length?accounts[0]:"");
                Wallet.connectWalletGui();
                if(!Wallet.watcherInjected){
                  Wallet.watcherInjected = true;
                  window.ethereum.on('accountsChanged', Wallet.handleAccountsChanged);
                  window.ethereum.on('chainChanged', Wallet.handleChainChanged);
                }
              } catch (e) {
                Wallet.initInjected = false;
              }
            }
          }else if (_iteration >= 5) {
            clearInterval(timer);
            Wallet.initInjected = false;
          }
        },500);
      }
    }
  }




DOM_CONNECT_WALLET.addEventListener('click', Wallet.handleConnectWallet);

document.addEventListener("DOMContentLoaded", function() {
  // Code to be executed when the DOM is ready
    Wallet.init()
});
