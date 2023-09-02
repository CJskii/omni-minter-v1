import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import ShareButton from "../Buttons/ShareButton";
import CopyButton from "../Buttons/CopyButton";
const ReferralLink = (props: { inviteLink: string }) => {
  const { inviteLink } = props;
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(
      `https://www.mintly.lol/?invite=${inviteLink}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      "Join me on Mintly and earn rewards!\n\nHere's my invite link:"
    );
    const url = encodeURIComponent(
      `https://www.mintly.lol/?invite=${inviteLink}`
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  return (
    <div>
      {inviteLink ? (
        <div className="flex flex-col gap-4 items-center space-y-2 md:space-y-0 md:space-x-2">
          <span className="text-base-content text-xl font-bold">
            Your invite link:{" "}
          </span>
          <a
            className="underline cursor-pointer text-gray-600"
            onClick={handleCopyClick}
          >
            https://www.mintly.lol/?invite={inviteLink}
          </a>
          <div className="flex justify-center items-center gap-4">
            <CopyButton handleCopyClick={handleCopyClick} copied={copied} />
            <ShareButton handleTwitterShare={handleTwitterShare} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ReferralLink;
