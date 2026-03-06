const ReusableHeader = ({
  heading,
  text,
  buttonText,
  onClick,
}: {
  heading: string;
  text: string;
  buttonText: string;
  onClick?: () => void;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className=" ">
        <h1 className="text-xl lg:text-3xl font-semibold"> {heading}</h1>
        <span className="text[12px] text-[#141414]">{text}</span>
      </div>
      <button
        type="button"
        className="bg-[#141414] p-2 text-white rounded-md text-[12px] lg:text-sm"
        onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default ReusableHeader;
