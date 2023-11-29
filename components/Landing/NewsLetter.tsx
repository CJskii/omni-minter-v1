import Headline from "./Headline";

const newsLetterData = [
  {
    id: "1",
    icon: {
      parentBg: "#beaaf7",
      childBg: "rgb(131 88 255)",
      svg: "icon-wallet",
    },
    title: ["Wallet ", "Integration"],
    text: "Effortlessly use a variety of wallets with Mintly for a unified omnichain experience. Our platform caters to a broad spectrum of wallets, ensuring smooth and secure blockchain interactions.",
  },
  {
    id: "2",
    icon: {
      parentBg: "#c4f2e3",
      childBg: "rgb(16 185 129)",
      svg: "icon-wallet",
    },
    title: ["Gas ", "Refueling"],
    text: "Optimize your blockchain transactions with Mintly’s gas-refuel feature. Manage your gas efficiently across different networks for uninterrupted and streamlined blockchain operations.",
  },
  {
    id: "3",
    icon: {
      parentBg: "#cddffb",
      childBg: "rgb(66 138 248)",
      svg: "icon-gallery",
    },
    title: ["ONFT ", "Minting"],
    text: "Dive into ONFT minting with Mintly’s easy-to-use tools. Our platform, powered by the LayerZero protocol, simplifies the creation and management of Omnichain Non-Fungible Tokens.",
  },
  {
    id: "4",
    icon: {
      parentBg: "#ffd0d0",
      childBg: "rgb(239 68 68)",
      svg: "icon-list",
    },
    title: ["Cross-Chain ", "Bridging"],
    text: "Bridge your ONFTs effortlessly across various blockchains using Mintly’s advanced bridging technology. Leverage the power of LayerZero for expansive and seamless digital asset transfers.",
  },
];

const NewsLetter = () => {
  return (
    <section className="dark:bg-jacarta-800 relative py-24">
      <div className="container">
        <Headline
          text="Explore Omnichain Capabilities with Mintly"
          classes="font-display text-jacarta-700 mb-16 text-center text-3xl dark:text-white"
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {newsLetterData.map((item) => {
            const { id, icon, title, text } = item;
            return (
              <div className="text-center newseLatter-item" key={id}>
                <div
                  className={`mb-6 inline-flex rounded-full p-3`}
                  style={{ backgroundColor: icon.parentBg }}
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full`}
                    style={{ backgroundColor: icon.childBg }}
                  >
                    <svg className="icon icon-wallet h-5 w-5 fill-white">
                      <use xlinkHref={`/icons.svg#${icon.svg}`}></use>
                    </svg>
                  </div>
                </div>
                <h3 className="font-display text-jacarta-700 mb-4 text-lg dark:text-white">
                  {id}. {title}
                </h3>
                <p className="dark:text-jacarta-300">{text}</p>
              </div>
            );
          })}
        </div>

        <p className="text-jacarta-700 mx-auto mt-20 max-w-2xl text-center text-lg dark:text-white">
          Stay Updated with Mintly: Subscribe for the Latest in Cross-Chain
          Innovations, Feature Updates, and Insights
        </p>

        <div className="mx-auto mt-7 max-w-md text-center">
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="input input-bordered flex-grow  w-full rounded-full border py-3 px-4"
            />
            <button className="btn-primary font-display absolute top-2 right-2 rounded-full px-6 py-2 text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
