const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "geohash",
          "type": "bytes32"
        }
      ],
      "name": "AddLocation",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "int32",
          "name": "latitude",
          "type": "int32"
        },
        {
          "internalType": "int32",
          "name": "longitude",
          "type": "int32"
        },
        {
          "internalType": "bytes32",
          "name": "geohash",
          "type": "bytes32"
        }
      ],
      "name": "addLocation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "geohash",
          "type": "bytes32"
        }
      ],
      "name": "getLocationByGeohash",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "int32",
              "name": "latitude",
              "type": "int32"
            },
            {
              "internalType": "int32",
              "name": "longitude",
              "type": "int32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash5",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash3",
              "type": "bytes32"
            }
          ],
          "internalType": "struct Loco.Location",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "geohash3",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getLocationByGeohash3ByIndex",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "int32",
              "name": "latitude",
              "type": "int32"
            },
            {
              "internalType": "int32",
              "name": "longitude",
              "type": "int32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash5",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash3",
              "type": "bytes32"
            }
          ],
          "internalType": "struct Loco.Location",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "geohash5",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getLocationByGeohash5ByIndex",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "int32",
              "name": "latitude",
              "type": "int32"
            },
            {
              "internalType": "int32",
              "name": "longitude",
              "type": "int32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash5",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash3",
              "type": "bytes32"
            }
          ],
          "internalType": "struct Loco.Location",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "getLocationByName",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "int32",
              "name": "latitude",
              "type": "int32"
            },
            {
              "internalType": "int32",
              "name": "longitude",
              "type": "int32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash5",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "geohash3",
              "type": "bytes32"
            }
          ],
          "internalType": "struct Loco.Location",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "geohash3",
          "type": "bytes32"
        }
      ],
      "name": "getLocationsByGeohash3Count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "geohash5",
          "type": "bytes32"
        }
      ],
      "name": "getLocationsByGeohash5Count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "locationByGeohash",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "locationByName",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "locationCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "locations",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "int32",
          "name": "latitude",
          "type": "int32"
        },
        {
          "internalType": "int32",
          "name": "longitude",
          "type": "int32"
        },
        {
          "internalType": "bytes32",
          "name": "geohash",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "geohash5",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "geohash3",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

export default abi;