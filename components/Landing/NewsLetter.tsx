import Headline from "./Headline";
import { newsLetterData } from "../../common/modules/data/newsLetter";
import { useState } from "react";
import { isValidEmail } from "../../common/utils/validators/isValidEmail";
import { useAccount } from "wagmi";
import useToast from "../../common/components/hooks/useToast";
import Toast from "../../common/components/elements/Toast";
import { callEmailSubscribeAPI } from "../../common/utils/api/subscribeEmail";

const NewsLetter = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const { address, isConnected } = useAccount();
  const { isToastVisible, toastMessage, hideToast, showToast } = useToast();

  const handleSubscribeButton = async () => {
    if (!isValidEmail(emailAddress)) {
      showToast("Invalid Email");
      return;
    }

    if (!isConnected || !address) {
      showToast("Connect your wallet first");
      return;
    }

    const response = await callEmailSubscribeAPI({
      emailAddress,
      ethereumAddress: address,
    });

    const data = await response.json();

    if (response.status === 201 || response.status === 200) {
      showToast(data.message);
    } else {
      showToast(data.error);
    }

    console.log(emailAddress);

    // display toast message
  };

  let inputClass =
    "input input-bordered flex-grow w-full rounded-full border py-3 px-4";

  if (emailAddress) {
    if (isValidEmail(emailAddress)) {
      inputClass += " input-success";
    } else {
      inputClass += " input-error";
    }
  }

  return (
    <section className="dark:bg-jacarta-800 relative py-24">
      <div className="container">
        <Headline
          text="Explore Omnichain Capabilities with Mintly"
          classes="font-display text-jacarta-700 mb-16 text-center text-3xl dark:text-white"
        />
        {isToastVisible && <Toast message={toastMessage} onClose={hideToast} />}
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
              className={inputClass}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <button
              onClick={handleSubscribeButton}
              className="btn-primary font-display absolute top-2 right-2 rounded-full px-6 py-2 text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
