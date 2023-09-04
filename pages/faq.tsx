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
          {/* Transactions */}
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                Why aren&rsquo;t my transactions appearing?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Processing transactions might take some time. If your
                transaction is on one of our supported chains, it should appear
                soon. In the meantime, you can use your TX hash to track the
                status on the LayerZero explorer.
              </p>
            </div>
          </div>

          {/* Supported Chains */}
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

          {/* Leaderboard Feature */}
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How does the leaderboard work?
              </p>
              <p className="mt-4 text-base text-gray-400">
                The leaderboard ranks the top 100 wallets based on XP. Your XP
                is automatically converted to levels and you can view activity
                of other users.
              </p>
            </div>
          </div>

          {/* Personal Dashboard */}
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                What can I see on my personal dashboard?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Your dashboard displays stats like mints, bridges, streaks, and
                referrals with XP it earns depending on current progression.
              </p>
            </div>
          </div>

          {/* Streaks */}
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How do streaks work?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Interact daily to maintain your streaks and earn an additional
                XP for your first interaction each day. When hitting milestones
                of day 7, 15 and 31 your daily experience will increase.
              </p>
            </div>
          </div>

          {/* Referral Program */}
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How does the referral program work?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Share your referral link to earn extra XP. The more friends you
                invite, the more XP you earn. Your friend will also earn an
                additional 100 XP.
              </p>
            </div>
          </div>
          {/* Airdrop */}
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                Do you plan to have token?
              </p>
              <p className="mt-4 text-base text-gray-400">
                While we can&rsquo;t confirm any specific plans at this moment,
                we&rsquo;re always exploring exciting ways to reward our
                community. Stay tuned for updates; you won&rsquo;t want to miss
                what&rsquo;s coming!
              </p>
            </div>
          </div>
          {/* Leaderboard Rewards */}
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                What do I get for being at the top of the leaderboard?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Climbing to the top of the leaderboard won&rsquo;t just earn you
                bragging rights. We&rsquo;re working on some intriguing
                incentives that will make the competition even more thrilling.
                Keep an eye out for announcements!
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-12 md:mt-20">
          <div className="px-8 py-4 text-center bg-gray-800 rounded-full">
            <p className="text-gray-50">
              Didn&rsquo;t find the answer you are looking for?{" "}
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
