import { ethers } from "ethers";
import abi from "./abi";


class LocoContract {
    constructor() {
        this.address = "0x36F2ED8be6803942B044918420dDE57B6F253E97" //BASE
        this.abi = abi
        this.contract = null
        this.provider = null
        this.connected = false
        this.userAddress = "0x"
        this.errorMessage = ""
    }

    connect() {
        if (window.ethereum) {
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            window.ethereum.request({method : 'eth_requestAccounts'})
                .then(result => {
                    console.log(result)
                    this.userAddress = result[0]
                })
            this.contract = new ethers.Contract(this.address, this.abi, this.provider)
        } else {
            console.log("needs to install a wallet.")
            this.errorMessage = "No wallet Found."
        }
    }

    async getLocationCount() {
        if (!this.contract){
            this.errorMessage = "Not connected."
            return
        }
        const count = await this.contract.locationCount()
        console.log(count.toString())
        return(count.toString())
    }

    convertLocation(location){
        const geohash = ethers.utils.toUtf8String( location["geohash"].toString().substring(0,18))
        const locationJson = {
            "name" : location["name"],
            "description" : location["description"],
            "latitude" : location["latitude"]/10000000,
            "longitude" : location["longitude"]/10000000,
            "geohash" : geohash

        }
        return locationJson
    }

    async getLocation(index) {
        if (!this.contract){
            this.errorMessage = "Not connected."
            return
        }
        const location = await this.contract.locations(index)
        const locationJson = this.convertLocation(location)
        console.log(location)
        return(locationJson)
    }


}

export default LocoContract

// const LocationCount = async () => {
//     console.log("I'm here.")
//     if (window.ethereum) {
//         const provider = new ethers.providers.Web3Provider(window.ethereum)
//         console.log("I'm still here.")
//         window.ethereum.request({method : 'eth_requestAccounts'})
//             .then(result => {
//                 console.log(result)
//             })
//         const LOCO_ABI = [
//             "function locationCount() view returns (uint256)",
            
//         ]
//          const address = '0x36F2ED8be6803942B044918420dDE57B6F253E97' // Base Contract
//         // const signer = provider.getSigner()
//         const contract = new ethers.Contract(address, abi, provider)
        
//         const x = await contract.locationCount()
//         console.log(x.toString())
//     } else {
//         console.log("install metamask")
//     }

    
//     // console.log("locationCount", locationCount)
//     // return locationCount
// }

// export default LocationCount