import DiscordLink from "../DiscordLink";

const Footer = () => {
  return (
    <div className="flex items-center justify-center mt-12 md:mt-20">
      <div className="px-8 py-4 text-center bg-gray-800 rounded-full">
        <p className="text-gray-50">
          Didn&rsquo;t find the answer you are looking for? <DiscordLink />
        </p>
      </div>
    </div>
  );
};

export default Footer;
