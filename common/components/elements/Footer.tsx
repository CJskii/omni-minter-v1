import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const iconsDivRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [divWidth, setDivWidth] = useState(0);

  useEffect(() => {
    if (iconsDivRef.current) {
      setDivWidth(iconsDivRef.current.offsetWidth);
    }
  }, []);

  const isWormhole = router.pathname.startsWith("/wormhole/");
  const isLayerZero = router.pathname.startsWith("/layerzero/");
  const isNotWormholeAndLayerZero =
    !isWormhole && !router.pathname.startsWith("/layerzero/");

  return (
    <footer className="bg-base-200 p-4 flex justify-between items-center min-w-full">
      <div
        className=" max-sm:hidden"
        style={{ minWidth: `${divWidth}px` }}
      ></div>

      {isWormhole && (
        <Image
          src="/wormhole.svg"
          width={200}
          height={200}
          alt="wormhole"
          className="mx-auto"
        />
      )}

      {isLayerZero && (
        <Image
          src="/layerzero.svg"
          width={200}
          height={200}
          alt="layerZero"
          className="py-2 mx-auto"
        />
      )}

      {isNotWormholeAndLayerZero && (
        <div className="flex justify-center items-center gap-8 max-sm:hidden">
          <Image
            src="/layerzero.svg"
            width={200}
            height={200}
            alt="layerZero"
            className="py-2 mx-auto"
          />

          <Image
            src="/wormhole.svg"
            width={200}
            height={200}
            alt="wormhole"
            className="mx-auto"
          />
        </div>
      )}

      <div
        className="flex space-x-4 justify-center items-center max-sm:mx-auto"
        ref={iconsDivRef}
      >
        <a
          href="https://twitter.com/Mintly_lol"
          target="_blank"
          aria-label="Twitter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-primary hover:fill-primary-focus"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
        <a
          href="https://discord.gg/Fqcz4QegXB"
          target="_blank"
          aria-label="Discord"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-discord fill-primary hover:fill-primary-focus"
            viewBox="0 0 16 16"
          >
            <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
          </svg>
        </a>
        <a
          href="https://t.me/+IFXADMbhrSAyNTE0"
          target="_blank"
          aria-label="Telegram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 50 50"
            fill="currentColor"
            className="bi bi-discord fill-primary hover:fill-primary-focus"
          >
            <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
