const Footer = () => {
  return (
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
  );
};

export default Footer;
