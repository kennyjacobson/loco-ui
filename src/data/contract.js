import { ethers } from "ethers";
import abi from "./abi";
var geohash = require('ngeohash');


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
            this.provider = new ethers.providers.JsonRpcProvider('https://goerli.base.org')
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

    // location will contain name, description, latitude, longitude, geohash as json
    // latitude and longitude will be multiplied by 10000000
    // geohash will be converted to bytes32string
    // values will be passed to contract through the addlocation function

    async writeLocation(location) {
        if (!this.contract){
            this.errorMessage = "Not connected."
            return
        }
        const tempGeohash = geohash.encode(location.latitude, location.longitude)
        const locationGeohash = ethers.utils.formatBytes32String(tempGeohash)
        const latitude = Math.ceil(location.latitude * 10000000)
        const longitude = Math.ceil(location.longitude * 10000000)
        const signer = this.provider.getSigner()
        const contractWithSigner = new ethers.Contract(this.address, this.abi, signer)
        console.log(location.name, location.description, latitude, longitude, locationGeohash)
        const tx = await contractWithSigner.addLocation(location.name, location.description, latitude, longitude, locationGeohash)
        console.log(tx)
        return tx
    }


}

export default LocoContract