const CustomCard = ({ icon1, icon2, text1, text2 }) => {
  return (
    <div className="flex flex-col gap-3 w-full sm:w-[30%] bg-zinc-100 p-4 sm:p-5 rounded-lg">
      <div className="text-primary">
        {icon1}
      </div>
      <div className="flex gap-3">
        <div className="text-primary shrink-0">
          {icon2}
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-sm">{text1}</div>
          <div className="text-xs sm:text-sm text-gray-500">{text2}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;