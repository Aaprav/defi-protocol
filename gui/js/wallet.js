//
// const shortAddress = (address)=>{
//   if(!address) return "No Address";
//   if(address === "0x0000000000000000000000000000000000000000") return "Null Address"
//   return "0x..."+address.substring(address.length - 5, address.length);
// }
//
//
//
//
// constructor(props){
//   super(props)
//   this.state = {
//     address:'',
//     isPopUp:false,
//     isProfile:false,
//   }
// }
// componentDidMount(){
//   let self = this;
//
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
// componentWillUnmount(){
//   window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
//   window.ethereum.removeListener('chainChanged', this.handleChainChanged);
// }
//
//
// handleAccountsChanged = (accounts) => {
//   let {address} = this.state;
//
//   // Handle the new accounts, or lack thereof.
//   // "accounts" will always be an array, but it can be empty.
//   let _address = accounts.length?accounts[0]:"";
//
//   if(!!_address && !address){
//     Toast.setHotToast('Wallet Connected',"success");
//   }else if (!_address && !!address) {
//     Toast.setHotToast('Wallet Disconnected',"success");
//   }
//   this.setState({address:_address,isPopUp:false,})
//   Utils.setAccount(address)
// }
//
// handleChainChanged = (chainId) => {
//   // Handle the new chain.
//   // Correctly handling chain changes can be complicated.
//   // We recommend reloading the page unless you have good reason not to.
//   if(chainId !== '0x38'){
//     this.setState({address:""})
//   }
// }
//
// handleDisconnect = () =>{
// this.setState({address:""});
// Toast.setHotToast('Wallet Disconnected',"success");
//
// }
//
// handleConnectPopUp = () =>{
//   let {address,isPopUp} = this.state;
//
//   if(!address){
//     this.setState({isPopUp:!isPopUp})
//   }
// }
//
// handleConnectWallet = async(val) =>{
//   try {
//     if (typeof window.ethereum === 'undefined') {
//       return Toast.setHotToast('Wallet is not installed!',"error");
//     }
//
//      // chainId must be in hexadecimal numbers
//     let params = [{ chainId: '0x38', chainName: 'Binance Smart Chain Mainnet', rpcUrls: ['https://bsc-dataseed1.ninicoin.io'] }];
//
//     if(val === "metamask" && !window.ethereum.isMetaMask){
//       return Toast.setHotToast('MetaMask is not installed!',"error");
//
//     }else if (val === "mathwallet" && !window.ethereum.isMathWallet) {
//       return Toast.setHotToast('MathWallet is not installed!',"error");
//     }
//
//
//
//
//     await new Promise(async(resolve,reject) =>{
//       if(window.ethereum.chainId === "0x38"){
//         resolve()
//       }else {
//
//         try {
//           await window.ethereum.request({
//             method: 'wallet_switchEthereumChain',
//             params : [{ chainId: '0x38' }] // chainId must be in hexadecimal numbers,
//           })
//           resolve()
//         } catch (switchError) {
//
//           if (switchError.code !== 4902) return reject(switchError);
//           let provider = window.ethereum.request({
//              method: 'wallet_addEthereumChain',
//              params: [{
//                chainId: '0x38',
//                chainName: 'Binance Smart Chain Mainnet',
//                nativeCurrency: {
//                 name: "BNB",
//                 symbol: "bnb", // 2-6 characters long
//                 decimals: 18
//               },
//                rpcUrls: ['https://bsc-dataseed1.ninicoin.io'],
//                blockExplorerUrls:["https://bscscan.com/"]
//              }]
//            })
//           resolve(provider)
//            }
//         }
//       })
//
//
//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     // console.log(accounts);
//     this.handleAccountsChanged(accounts)
//
//   } catch (e) {
//     // console.log(e);
//     let msg = e?.message??'Please authorize to access your account'
//     Toast.setHotToast(msg,"error")
//   }
//
// }
