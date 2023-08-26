import { useState } from "react";
const ReferralLink = (props: { inviteLink: string }) => {
  const { inviteLink } = props;
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(
      `https://www.mintly.lol/invite=${inviteLink}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      "Join me on Mintly and earn rewards! Here's my invite link:"
    );
    const url = encodeURIComponent(
      `https://www.mintly.lol/invite=${inviteLink}`
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  return (
    <div>
      {inviteLink ? (
        <div className="flex flex-col lg:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <div></div>
          <span className="text-base-content">Your invite link: </span>
          <a className="underline cursor-pointer text-gray-600">
            https://www.mintly.lol/invite={inviteLink}
          </a>
          <button
            onClick={handleCopyClick}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleTwitterShare}
            className="px-2 py-1 bg-blue-400 text-white rounded hover:bg-blue-500"
          >
            Share on Twitter
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default ReferralLink;
