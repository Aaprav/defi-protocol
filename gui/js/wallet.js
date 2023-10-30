console.clear()

let account = "";
let DOM_CONNECT_WALLET = document.getElementById("connectWallet");







  const shortAddress = (address)=>{
    if(!address) return "No Address";
    if(address === "0x0000000000000000000000000000000000000000") return "Null Address"
    return address.substring(0, 6)+"..."+address.substring(address.length - 4, address.length);
  }


  let connectWalletGui = () =>{
    if(account){
      DOM_CONNECT_WALLET.innerHTML  = shortAddress(account);
      DOM_CONNECT_WALLET.disabled = true;
    }else {
      DOM_CONNECT_WALLET.innerHTML  = "Connect Wallet";
      DOM_CONNECT_WALLET.disabled = false;
    }
  }

  
  let handleAccountsChanged = (accounts) => {

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
  }

  let handleChainChanged = (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    if(chainId !== '0x1'){
      account = "";
      setToastAlert('Chain Disconnected',"warning");
    }
  }


let handleConnectWallet = async(val) =>{
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

}


// componentDidMount(){
//   let self = this;
//
//   let timer = setInterval(function(){
//       if(typeof window.ethereum !== 'undefined'){
//         clearInterval(timer)
//
//         window.ethereum.request({ method: 'eth_accounts' }).then(self.handleAccountsChanged)
//         window.ethereum.on('accountsChanged', self.handleAccountsChanged);
//         window.ethereum.on('chainChanged', self.handleChainChanged);
//
//       }
//   },500)
// }

DOM_CONNECT_WALLET.addEventListener('click', ()=>handleConnectWallet("metamask"));

// document.addEventListener("DOMContentLoaded", function() {
//   // Code to be executed when the DOM is ready
//   // handleConnectWallet()
// });
