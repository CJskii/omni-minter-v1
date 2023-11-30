import { activeChains } from "../constants/chainsConfig";
import Image from "next/image";
import { useAccount } from "wagmi";

const Chains = () => {
  const { address } = useAccount();

  return (
    <section className="supported-chains">
      <div className="container flex flex-col justify-center items-center gap-8">
        <h2 className="section-title text-3xl font-bold leading-tight sm:text-4xl text-content-focus">
          Supported Chains
        </h2>
        <p className="section-description">
          Explore the wide range of blockchain networks supported by Mintly,
          designed for seamless cross-chain interoperability.
        </p>
        <p className="count-description">Total count: {activeChains.length}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeChains.map((chain) => (
            <div key={chain.name} className="card w-96 bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={chain.iconUrl ? chain.iconUrl : "/placeholder.png"}
                    alt={`${chain.name} logo`}
                    width={100}
                    height={100}
                  />
                  <h2 className="card-title pt-4">{chain.name}</h2>
                  <p>Native currency: {chain.nativeCurrency.symbol}</p>
                  <a
                    href={
                      address
                        ? `${chain.blockExplorers.default.url}/address/${address}`
                        : chain.blockExplorers.default.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link hover:text-primary"
                  >
                    View on Explorer
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chains;
