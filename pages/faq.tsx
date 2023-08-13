const FAQ = () => {
  return (
    <section className="py-10 bg-base-200 sm:py-16 lg:py-24">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            FAQ
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300">
            Explore the common questions and answers about Mintly
          </p>
        </div>

        <div className="grid grid-cols-1 mt-12 md:mt-20 md:grid-cols-2 gap-y-16 gap-x-20">
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                Why are&rsquo;t my transactions appearing?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Processing transactions might take some time. If your
                transaction is on one of our supported chains, it should appear
                soon. In the meantime, you can use your TX hash to track the
                status on the LayerZero explorer.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                Which chains are currently supported?
              </p>
              <p className="mt-4 text-base text-gray-400">
                We support various networks such as Base, Linea, Optimism, and
                more. Note that not every network can bridge to another. All
                available networks are listed in the app, and we&apos;re always
                working to integrate more.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How does activity calculation work?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Volume is determined by the number of transactions on specific
                chains and the number of messages relayed through the LayerZero
                message relayers.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                What&rsquo;s a &rsquo;sybil&rsquo; ? Am I one for using multiple
                addresses?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Being a sybil means using lots of fake wallets to unfairly gain
                power. Just signing up doesn&rsquo;t make you one.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-12 md:mt-20">
          <div className="px-8 py-4 text-center bg-gray-800 rounded-full">
            <p className="text-gray-50">
              Didn’t find the answer you are looking for?{" "}
              <a
                href="https://discord.gg/VWbgEbF2Nf"
                title=""
                target="_blank"
                className="text-yellow-300 transition-all duration-200 hover:text-yellow-400 focus:text-yellow-400 hover:underline"
              >
                Ask on Discord
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
