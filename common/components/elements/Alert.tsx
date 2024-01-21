const Alert = (props: { title: string; link: string }) => {
  const { title, link } = props;
  return (
    <div
      role="alert"
      className="alert alert-info rounded-none flex justify-center items-center bg-base-200 border-x-0 border-t-0 border-b-2 border-b-primary  flex-col"
    >
      <a
        href={link}
        target="_blank"
        className="animated-gradient-text text-md font-bold"
      >
        {title}
      </a>
    </div>
  );
};

export default Alert;
