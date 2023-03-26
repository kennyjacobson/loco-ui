import { ethers } from "ethers";
import abi from "./abi";
var geohash = require('ngeohash');

const CONTRACT_ADDRESS = "0xF13f389488dAcFb85446EB4725442FbB8FDBcA03" //SCROLL
// const CONTRACT_ADDRESS = "0x36F2ED8be6803942B044918420dDE57B6F253E97" //BASE
// const RPC = 'https://goerli.base.org'
const RPC = 'https://alpha-rpc.scroll.io/l2'

class LocoContract {
    constructor() {
        this.address = CONTRACT_ADDRESS
        this.abi = abi
        this.contract = null
        this.provider = null
        this.connected = false
        this.userAddress = "0x"
        this.errorMessage = ""
    }

    connect(setLoginButtonText) {
        if (window.ethereum) {
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            window.ethereum.request({method : 'eth_requestAccounts'})
                .then(result => {
                    console.log(result)
                    this.userAddress = result[0]
                    setLoginButtonText(result[0])
                })
            this.contract = new ethers.Contract(this.address, this.abi, this.provider)
        } else {
            this.provider = new ethers.providers.JsonRpcProvider(RPC)
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
        const latitude = location["latitude"]/10000000
        const longitude = location["longitude"]/10000000
        const locationJson = {
            ...location,
            geohash,
            latitude,
            longitude

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

    // create get location by geohash5 function
    // first get the geohash5 count by calling getLocationsByGeohash5Count
    // use that to loop getting getLocationsByGeohash5byIndex until all locations are retrieved
    // use the accumulation pattern to get all locations
    // return the array of locations
    async getLocationsByGeohash(geohash) {
        if (!this.contract){
            this.errorMessage = "Not connected."
            return
        }
        const geohashBytes = ethers.utils.formatBytes32String(geohash)
        let count = 0
        if (geohash.length === 5){
            count = await this.contract.getLocationsByGeohash5Count(geohashBytes)
        } else if (geohash.length === 3) {
            count = await this.contract.getLocationsByGeohash3Count(geohashBytes)
        } else {
            this.errorMessage = "Invalid Geohash"
            return
        }

        console.log("getHashCount", count.toString())
        let locations = []
        for (let i = 0; i < count; i++){
            let location = null
            if (geohash.length === 5){
                location = await this.contract.getLocationByGeohash5ByIndex(geohashBytes, i)
            } else if (geohash.length === 3) {
                location = await this.contract.getLocationByGeohash3ByIndex(geohashBytes, i)
            }
            const locationJson = this.convertLocation(location)
            locations.push(locationJson)
        }
        console.log(locations)
        return locations
    }



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
        const tx = await contractWithSigner.addLocation(location.name, location.description, latitude, longitude, locationGeohash, location.streetAddress, location.city, location.state, location.zipCode, location.country)
        console.log(tx)
        return tx
    }


}

export default LocoContract