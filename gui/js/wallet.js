console.clear()


  const Wallet = {
    address:"",
    balance:0,
    wallet:"metamask",


    connectWalletGui : () =>{
      if(Wallet.address){
        DOM_CONNECT_WALLET.innerHTML  = helper.shortAddress(account);
        DOM_SWAP_BTN.children[0].innerHTML  = "Swap Now";
        DOM_CONNECT_WALLET.disabled = true;
        DOM_SWAP_BTN.disabled = false;
      }else {
        DOM_CONNECT_WALLET.innerHTML  = "Connect Wallet";
        DOM_SWAP_BTN.children[0].innerHTML  = "Connect Wallet";
        DOM_CONNECT_WALLET.disabled = false;
        DOM_SWAP_BTN.disabled = true;
      }
    },


    handleAccountsChanged : (accounts) => {

      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      let _address = accounts.length?accounts[0]:"";

      if(!!_address && !account){
        setToastAlert('Wallet Connected',"success");
      }else if (!_address && !!account) {
        setToastAlert('Wallet Disconnected',"warning");
      }else if(!!_address && _address != account) {
        setToastAlert('Wallet Changed',"info");
      }
      account = _address;
      connectWalletGui();
    },

    handleChainChanged : (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      if(chainId !== '0x1'){
        account = "";
        setToastAlert('Chain Disconnected',"warning");
      }
    },



   handleConnectWallet : async(val) =>{
    try {
      if (typeof window.ethereum === 'undefined') {
        return setToastAlert('Wallet is not installed!',"error");
      }

      if(val === "metamask" && !window.ethereum.isMetaMask){
        return setToastAlert('MetaMask is not installed!',"error");
      }else if (val === "mathwallet" && !window.ethereum.isMathWallet) {
        return setToastAlert('MathWallet is not installed!',"error");
      }

      await new Promise(async(resolve,reject) =>{

        if(window.ethereum.chainId === "0x1"){
        resolve()
        }else {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params : [{ chainId: '0x1' }] // chainId must be in hexadecimal numbers,
            })
            resolve()
          } catch (e) {
            reject({message:"Please change chain in your wallet"})
          }
        }
      })


      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // console.log(accounts);
      handleAccountsChanged(accounts);

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

    } catch (e) {
      // console.log(e);
      let msg = e?.message??'Please authorize to access your account'
      setToastAlert(msg,"error")
    }

  },

  isInjected:false,
  init : () => {
    let _iteration = 0;
      if(!Wallet.isInjected){
        Wallet.isInjected = true;
        let timer = setInterval(async function(){
          _iteration += 1;
          if(typeof window.ethereum !== 'undefined'){
            clearInterval(timer);
            if(window.ethereum.chainId !== "0x1") {
              Wallet.isInjected = false;
            }else {
              try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                Wallet.address = accounts.length?accounts[0]:"";
                Wallet.connectWalletGui();
                window.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.on('chainChanged', handleChainChanged);
              } catch (e) {
                Wallet.isInjected = false;
              }
            }
          }else if (_iteration >= 5) {
            clearInterval(timer);
            Wallet.isInjected = false;
          }
        },500);
      }
    }
  }




















// DOM_CONNECT_WALLET.addEventListener('click', ()=> handleConnectWallet("metamask"));

document.addEventListener("DOMContentLoaded", function() {
  // Code to be executed when the DOM is ready
    Wallet.init()
});
