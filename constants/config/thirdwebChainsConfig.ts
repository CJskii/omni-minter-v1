// core dao
import {
  Arbitrum,
  Optimism,
  Base,
  Polygon,
  Binance,
  Linea,
  ArbitrumNova,
  Opbnb,
  Scroll,
  Zksync,
  Zora,
  PolygonZkevm,
  Mantle,
  MantaPacific,
  MetisAndromeda,
  Avalanche,
  Fantom,
  Celo,
  Moonbeam,
  Moonriver,
  Canto,
  HarmonyShard0,
  Aurora,
  Astar,
  Fuse,
  Meter,
  Tenet,
  Kava,
  KlaytnCypress,
  PgnPublicGoodsNetwork,
  CoreBlockchain,
  Sepolia,
} from "@thirdweb-dev/chains";

import { getContractAddress } from "../../common/utils/getters/getConstants";
import {
  getLayerZeroChainId,
  getWormholeChainId,
  getLayerZeroEndpoint,
} from "../../common/utils/getters/getConstants";
import { getMaxGasValue } from "../../common/utils/getters/getMaxGasValue";
import {
  CONTRACT_ABI,
  REFUEL_CONTRACT_ABI,
  OFT_CONTRACT_ABI,
} from "../contracts/abi";
import { NFT_CONTRACT_ABI } from "../contracts/wormhole";

export const mainnetChainsThirdWeb = [
  {
    ...PgnPublicGoodsNetwork,
    name: "PGN",
    icon: {
      format: "svg",
      url: "/chain-icons/pgn.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Arbitrum,
    name: "Arbitrum One",
    icon: {
      format: "svg",
      url: "/chain-icons/arbitrum.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Optimism,
    name: "OP Mainnet",
    icon: {
      format: "svg",
      url: "/chain-icons/optimism.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Base,
    name: "Base",
    icon: {
      format: "svg",
      url: "/chain-icons/base.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Binance,
    name: "BNB Smart Chain",
    icon: {
      format: "svg",
      url: "/chain-icons/bsc.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Polygon,
    name: "Polygon",
    icon: {
      format: "svg",
      url: "/chain-icons/polygon.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Linea,
    name: "Linea",
    icon: {
      format: "svg",
      url: "/chain-icons/linea.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Opbnb,
    name: "opBNB",
    icon: {
      format: "svg",
      url: "/chain-icons/opbnb.svg",
      height: 512,
      width: 512,
    },
  },

  {
    ...PolygonZkevm,
    name: "Polygon zkEVM",
    icon: {
      format: "svg",
      url: "/chain-icons/polygon-zkevm.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...MantaPacific,
    name: "Manta Pacific",
    icon: {
      format: "svg",
      url: "/chain-icons/manta.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Scroll,
    name: "Scroll",
    icon: {
      format: "svg",
      url: "/chain-icons/scroll.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Zksync,
    name: "zkSync Era",
    icon: {
      format: "svg",
      url: "/chain-icons/zksync.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Zora,
    name: "Zora",
    icon: {
      format: "svg",
      url: "/chain-icons/zora.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...ArbitrumNova,
    name: "Arbitrum Nova",
    icon: {
      format: "svg",
      url: "/chain-icons/arb-nova.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Mantle,
    name: "Mantle",
    icon: {
      format: "svg",
      url: "/chain-icons/mantle.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...MetisAndromeda,
    name: "Metis",
    icon: {
      format: "svg",
      url: "/chain-icons/metis.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Avalanche,
    name: "Avalanche",
    icon: {
      format: "svg",
      url: "/chain-icons/avalanche.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Fantom,
    name: "Fantom",
    icon: {
      format: "svg",
      url: "/chain-icons/fantom.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Celo,
    name: "Celo",
    icon: {
      format: "svg",
      url: "/chain-icons/celo.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Moonbeam,
    name: "Moonbeam",
    icon: {
      format: "svg",
      url: "/chain-icons/moonbeam.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Moonriver,
    name: "Moonriver",
    icon: {
      format: "svg",
      url: "/chain-icons/moonriver.svg",
      height: 512,
      width: 512,
    },
  },

  {
    ...Canto,
    name: "Canto",
    icon: {
      format: "svg",
      url: "/chain-icons/canto.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...HarmonyShard0,
    name: "Harmony One",
    icon: {
      format: "svg",
      url: "/chain-icons/harmony.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Aurora,
    name: "Aurora",
    icon: {
      format: "svg",
      url: "/chain-icons/aurora.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Astar,
    name: "Astar",
    icon: {
      format: "svg",
      url: "/chain-icons/astar.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Fuse,
    name: "Fuse",
    icon: {
      format: "svg",
      url: "/chain-icons/fuse.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Meter,
    name: "Meter",
    icon: {
      format: "svg",
      url: "/chain-icons/meter.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Tenet,
    name: "Tenet",
    icon: {
      format: "svg",
      url: "/chain-icons/tenet.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...Kava,
    name: "Kava EVM",
    icon: {
      format: "svg",
      url: "/chain-icons/kava.svg",
      height: 512,
      width: 512,
    },
  },
  {
    ...KlaytnCypress,
    name: "Klaytn",
    icon: {
      format: "svg",
      url: "/chain-icons/klaytn.svg",
      height: 512,
      width: 512,
    },
  },

  {
    ...CoreBlockchain,
    name: "Core Dao",
    icon: {
      format: "svg",
      url: "/chain-icons/coredao.svg",
      height: 512,
      width: 512,
    },
  },
];

export const testnetChains = [Sepolia];

export const getSupportedChains = () => {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
  switch (env) {
    case "mainnet":
      return mainnetChainsThirdWeb.map((chain) => ({
        ...chain,
        deployedContracts: getDeployedContracts(chain.name),
        contractProviders: getContractProviders(chain.name),
        lzParams: {
          lzEndpointAddress: getLayerZeroEndpoint(chain.name),
          remoteChainId: getLayerZeroChainId(chain.name),
          maxGas: getMaxGasValue(chain.name),
        },
        whParams: {
          whEndpointAddress: "",
          remoteChainId: getWormholeChainId(chain.name),
        },
      }));
    case "testnet":
      return testnetChains.map((chain) => ({
        ...chain,
        deployedContracts: {
          // TODO: Change this to testnet contract as all of this will return null
          layerzero: {
            ONFT: {
              address: getContractAddress(chain.name, "ONFT") as string,
              ABI: CONTRACT_ABI,
            },
            REFUEL: {
              address: getContractAddress(chain.name, "REFUEL") as string,
              ABI: REFUEL_CONTRACT_ABI,
            },
            OFT: {
              address: "" as string,
              // getContractAddress(chain.name, "OFT"),
              ABI: CONTRACT_ABI, // change to OFT abi
            },
          },
          wormhole: {
            NFT: {
              address: getContractAddress(chain.name, "NFT") as string,
              ABI: NFT_CONTRACT_ABI,
            },
            ERC20: {
              address: "" as string,
              // getContractAddress(chain.name, "ERC20"),
              ABI: CONTRACT_ABI, // change to ERC20 abi
            },
            REFUEL: {
              address: " " as string,
              // getContractAddress(chain.name, "RefuelWormhole"),
              ABI: CONTRACT_ABI, // change to Refuel abi
            },
          },
        },
        contractProviders: {
          layerzero: ["ONFT", "REFUEL"],
          wormhole: [],
        },
        lzParams: {
          lzEndpointAddress: "",
          remoteChainId: getLayerZeroChainId(chain.name),
          maxGas: getMaxGasValue(chain.name),
        },
        // TODO: Add wormhole params
      }));
    default:
      console.error(`Unsupported ENVIRONMENT value: ${env}`);
      return [];
  }
};

const getContractProviders = (chainName: string) => {
  const deployedContracts = getDeployedContracts(chainName);

  const contractProviders = {
    layerzero: [] as string[],
    wormhole: [] as string[],
  };

  const layerzeroContracts = deployedContracts.layerzero;
  const wormholeContracts = deployedContracts.wormhole;

  if (layerzeroContracts.OFT.address) {
    contractProviders.layerzero.push("OFT");
  }
  if (layerzeroContracts.ONFT.address) {
    contractProviders.layerzero.push("ONFT");
  }
  if (layerzeroContracts.REFUEL.address) {
    contractProviders.layerzero.push("REFUEL");
  }
  if (wormholeContracts.NFT.address) {
    contractProviders.wormhole.push("NFT");
  }
  if (wormholeContracts.ERC20.address) {
    contractProviders.wormhole.push("ERC20");
  }
  if (wormholeContracts.REFUEL.address) {
    contractProviders.wormhole.push("Refuel");
  }

  return contractProviders;
};

const getDeployedContracts = (chainName: string) => {
  const deployedContracts = {
    layerzero: {
      ONFT: {
        address: getContractAddress(chainName, "ONFT") as string,
        ABI: CONTRACT_ABI,
      },
      REFUEL: {
        address: getContractAddress(chainName, "REFUEL") as string,
        ABI: REFUEL_CONTRACT_ABI,
      },
      OFT: {
        address: getContractAddress(chainName, "OFT") as string,
        ABI: OFT_CONTRACT_ABI,
      },
    },
    wormhole: {
      NFT: {
        address: getContractAddress(chainName, "NFT") as string,
        ABI: NFT_CONTRACT_ABI, // change to NFT abi
      },
      ERC20: {
        address: "" as string,
        // getContractAddress(chainName, "ERC20"),
        ABI: CONTRACT_ABI, // change to ERC20 abi
      },
      REFUEL: {
        address: " " as string,
        // getContractAddress(chainName, "RefuelWormhole"),
        ABI: CONTRACT_ABI, // change to Refuel abi
      },
    },
  };

  return deployedContracts;
};

export const activeChains = getSupportedChains();
