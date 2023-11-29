import Link from "next/link";
import React from "react";
import Image from "next/image";

export const coverflow_data = [
  {
    img: "/images/products/item_13_lg.jpg",
    title: "Etherium NFT Launching Lab",
    authorImage: "/images/avatars/avatar_18_rounded.gif",
    authorName: "051_Hart",
    id: "0Etherium NFT Launching Lab",
  },
  {
    img: "/images/products/item_16_lg.jpg",
    title: "Oceania \\\\ OVERSEER 017",
    authorImage: "/images/avatars/avatar_22_rounded.jpg",
    authorName: "MadeByM1KE",
    id: "1Oceania \\\\ OVERSEER 017",
  },
  {
    img: "/images/products/item_12_lg.jpg",
    title: "Light Bars",
    authorImage: "/images/avatars/avatar_17_rounded.jpg",
    authorName: "Wow Frens",
    id: "2Light Bars",
  },
  {
    img: "/images/products/item_14_lg.jpg",
    title: "Amazing NFT art",
    authorImage: "/images/avatars/avatar_19_rounded.jpg",
    authorName: "Lila Spacex",
    id: "3Amazing NFT art",
  },
  {
    img: "/images/products/item_15_lg.jpg",
    title: "SwagFox#133",
    authorImage: "/images/avatars/avatar_20_rounded.jpg",
    authorName: "Bored Bunny",
    id: "4SwagFox#133",
  },
  {
    img: "/images/products/item_13_lg.jpg",
    title: "Etherium NFT Launching Lab",
    authorImage: "/images/avatars/avatar_18_rounded.gif",
    authorName: "051_Hart",
    id: "5Etherium NFT Launching Lab",
  },
  {
    img: "/images/products/item_16_lg.jpg",
    title: "Oceania \\\\ OVERSEER 017",
    authorImage: "/images/avatars/avatar_22_rounded.jpg",
    authorName: "MadeByM1KE",
    id: "6Oceania \\\\ OVERSEER 017",
  },
  {
    img: "/images/products/item_12_lg.jpg",
    title: "Light Bars",
    authorImage: "/images/avatars/avatar_17_rounded.jpg",
    authorName: "Wow Frens",
    id: "7Light Bars",
  },
  {
    img: "/images/products/item_14_lg.jpg",
    title: "Amazing NFT art",
    authorImage: "/images/avatars/avatar_19_rounded.jpg",
    authorName: "Lila Spacex",
    id: "8Amazing NFT art",
  },
  {
    img: "/images/products/item_15_lg.jpg",
    title: "SwagFox#133",
    authorImage: "/images/avatars/avatar_20_rounded.jpg",
    authorName: "Bored Bunny",
    id: "9SwagFox#133",
  },
  {
    img: "/images/products/item_13_lg.jpg",
    title: "Etherium NFT Launching Lab",
    authorImage: "/images/avatars/avatar_18_rounded.gif",
    authorName: "051_Hart",
    id: "10Etherium NFT Launching Lab",
  },
  {
    img: "/images/products/item_16_lg.jpg",
    title: "Oceania \\\\ OVERSEER 017",
    authorImage: "/images/avatars/avatar_22_rounded.jpg",
    authorName: "MadeByM1KE",
    id: "11Oceania \\\\ OVERSEER 017",
  },
  {
    img: "/images/products/item_12_lg.jpg",
    title: "Light Bars",
    authorImage: "/images/avatars/avatar_17_rounded.jpg",
    authorName: "Wow Frens",
    id: "12Light Bars",
  },
  {
    img: "/images/products/item_14_lg.jpg",
    title: "Amazing NFT art",
    authorImage: "/images/avatars/avatar_19_rounded.jpg",
    authorName: "Lila Spacex",
    id: "13Amazing NFT art",
  },
  {
    img: "/images/products/item_15_lg.jpg",
    title: "SwagFox#133",
    authorImage: "/images/avatars/avatar_20_rounded.jpg",
    authorName: "Bored Bunny",
    id: "14SwagFox#133",
  },
];

export const hero_5_data = [
  {
    img: "/img/1.webp",
    title: "Galactic Empire",
    authorImage: "/avatars/avatar2.gif",
    authorName: "051_Hart",
    id: "0Etherium NFT Launching Lab",
  },
  {
    img: "/img/4.webp",
    title: "Oceania \\\\ Mesozoic",
    authorImage: "/avatars/avatar1.jpg",
    authorName: "MadeByM1KE",
    id: "1Oceania \\\\ OVERSEER 017",

    subItem: [
      {
        img: "/img/3.webp",
        title: "Light Bars",
        authorImage: "/avatars/avatar3.jpg",
        authorName: "Wow Frens",
        id: "2Light Bars",
      },
    ],
  },
];

const Hero = () => {
  return (
    <>
      {/* <!-- Hero --> */}
      <section className="relative">
        <div className="h-full px-6 xl:px-20">
          <div className="grid h-full items-center gap-4 lg:grid-cols-12">
            <div className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-5 xl:pl-[20%] xl:pr-[10%]">
              <div className="mb-10 w-full sm:flex sm:space-x-4">
                <div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
                  <span className="block font-display text-3xl text-primary">
                    100,000+
                  </span>
                  <span className="block font-display text-sm text-base-content">
                    Transactions
                  </span>
                </div>
                <div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
                  <span className="block font-display text-3xl text-secondary">
                    30+
                  </span>
                  <span className="block font-display text-sm text-base-content">
                    Chains
                  </span>
                </div>
                <div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
                  <span className="block font-display text-3xl text-accent">
                    50,000+
                  </span>
                  <span className="block font-display text-sm text-base-content">
                    Active Users
                  </span>
                </div>
              </div>
              <h1 className="mb-6 text-center font-display text-5xl text-jacarta-700 dark:text-white md:text-left lg:text-5xl xl:text-6xl">
                Uniting Blockchain Ecosystems on One Platform
              </h1>
              <p className="mb-8 text-center text-lg dark:text-jacarta-200 md:text-left">
                Mintly is your gateway to seamless cross-chain interactions,
                bridging the gap between diverse blockchain networks.
              </p>
              <div className="flex space-x-4">
                <Link href="/mint" className="btn btn-wide btn-primary">
                  Get Started
                </Link>
                <Link href="/create" className="btn glass">
                  Explore Chains
                </Link>
              </div>
            </div>

            {/* <!-- Hero images --> */}
            <div className="relative col-span-6 xl:col-span-6 xl:col-start-7">
              <Image
                width={180}
                height={180}
                src="/badge.png"
                className="absolute top-0 z-10 -ml-16 animate-pulse md:top-[12%]"
                alt="badge"
              />
              <div className="md:flex md:space-x-6 xl:space-x-12">
                {hero_5_data.map((item, index) => {
                  const { id, img, title, authorImage, authorName, subItem } =
                    item;
                  const itemLink = img
                    .split("/")
                    .slice(-1)
                    .toString()
                    .replace("_2lg.jpg", "")
                    .replace(".gif", "");
                  return (
                    <div
                      className={
                        index === 0
                          ? "mb-6 md:flex md:w-1/2 md:items-center"
                          : "space-y-6 md:w-1/2 xl:space-y-12"
                      }
                      key={id}
                    >
                      <article>
                        <div className="block overflow-hidden rounded-2.5xl bg-base-200 shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
                          <figure className="relative">
                            <Link href={`/item/${itemLink}`}>
                              <Image
                                width={406}
                                height={437}
                                src={img}
                                alt="item 1"
                                className="w-full h-full object-cover"
                              />
                            </Link>
                          </figure>
                          <div className="p-6">
                            <div className="flex">
                              <Link href="/user/avatar_6" className="shrink-0">
                                <Image
                                  width={40}
                                  height={40}
                                  src={authorImage}
                                  alt="avatar"
                                  className="mr-4 h-10 w-10 rounded-full"
                                />
                              </Link>
                              <div>
                                <Link
                                  href={`/item/${itemLink}`}
                                  className="block"
                                >
                                  <span className="font-display text-lg leading-none text-jacarta-700 hover:text-accent dark:text-white">
                                    {title}
                                  </span>
                                </Link>
                                <Link
                                  href="/user/avatar_6"
                                  className="text-2xs text-accent"
                                >
                                  {authorName}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>

                      {subItem &&
                        subItem.map(
                          ({ id, img, title, authorImage, authorName }) => {
                            const itemLink = img
                              .split("/")
                              .slice(-1)
                              .toString()
                              .replace(".jpg", "")
                              .replace(".gif", "")
                              .replace("_lg", "");
                            return (
                              <div className="md:w-3/4" key={id}>
                                <article>
                                  <div className="block overflow-hidden rounded-2.5xl bg-base-200 shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
                                    <figure className="relative">
                                      <Link href={`/item/${itemLink}`}>
                                        <Image
                                          width={234}
                                          height={234}
                                          src={img}
                                          alt="item 1"
                                          className="w-full h-full object-cover"
                                        />
                                      </Link>
                                    </figure>
                                    <div className="p-6">
                                      <div className="flex">
                                        <Link
                                          href="/user/avatar_6"
                                          className="shrink-0"
                                        >
                                          <Image
                                            width={40}
                                            height={40}
                                            src={authorImage}
                                            alt="avatar"
                                            className="mr-4 h-10 w-10 rounded-full"
                                          />
                                        </Link>
                                        <div>
                                          <Link
                                            href={`/item/${itemLink}`}
                                            className="block"
                                          >
                                            <span className="font-display text-lg leading-none text-accent hover:text-accent dark:text-white">
                                              {title}
                                            </span>
                                          </Link>
                                          <Link
                                            href="/user/avatar_6"
                                            className="text-2xs text-accent"
                                          >
                                            {authorName}
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              </div>
                            );
                          }
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end hero --> */}
    </>
  );
};

export default Hero;
