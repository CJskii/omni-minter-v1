const DiscordLink = ({ label }: { label?: string }) => {
  return (
    <a
      href="https://discord.gg/VWbgEbF2Nf"
      title=""
      target="_blank"
      className="text-yellow-300 transition-all duration-200 hover:text-yellow-400 focus:text-yellow-400 hover:underline"
    >
      {label ? label : "Discord"}
    </a>
  );
};

export default DiscordLink;
