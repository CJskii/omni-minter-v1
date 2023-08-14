import Image from "next/image";
import { useEffect, useState } from "react";

const CardImage = () => {
  const imageNumbers = [1, 3, 4, 10];
  const [currentImage, setCurrentImage] = useState(imageNumbers[0]);
  const [isLoading, setIsLoading] = useState(true);

  const getRandomImage = (exclude: any) => {
    let newImage;
    do {
      newImage = imageNumbers[Math.floor(Math.random() * imageNumbers.length)];
    } while (newImage === exclude);
    return newImage;
  };

  useEffect(() => {
    setIsLoading(true);
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => getRandomImage(prevImage));
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-base sm:px-6 lg:px-8 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
      style={{ transition: "opacity 1s ease" }}
    >
      <div className="absolute inset-0">
        <Image
          src={`/img/${currentImage}.png`}
          alt={currentImage.toString()}
          width={400}
          height={400}
          className="object-cover w-full h-full"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

      <div className="relative ">
        <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
          <h3 className="text-4xl font-bold text-white">
            <br className="hidden xl:block" />
            <br className="hidden xl:block" />
            <br className="hidden xl:block" />
            <span className="text-primary">Mintly</span>
          </h3>
          <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
            <li className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-primary-content rounded-full">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="text-lg font-medium text-white">
                {" "}
                Multi-Network Support{" "}
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-primary-content rounded-full">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="text-lg font-medium text-white">
                {" "}
                Instant Transfers{" "}
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-primary-content rounded-full">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="text-lg font-medium text-white">
                {" "}
                Distinct Visuals{" "}
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-primary-content rounded-full">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="text-lg font-medium text-white">
                {" "}
                LayerZero Driven{" "}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardImage;
