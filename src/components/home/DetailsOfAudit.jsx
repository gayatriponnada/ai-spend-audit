import CustomCard from "../../utils/CustomCard";

const DetailsOfAudit = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-8 sm:py-10">
      <div className="flex flex-col gap-2 text-center">
        <div className="font-semibold text-xl sm:text-2xl">How it works</div>
        <div className="font-medium text-sm text-gray-500">
          Get your AI spend audit in 3 simple steps.
        </div>
      </div>

      {/* Cards — stack on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-stretch">
        <CustomCard
          icon1={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
              viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-20-200h80v-400H380v80h80v320Z" />
            </svg>
          }
          icon2={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
              viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M441.5-491.5Q453-503 453-520t-11.5-28.5Q430-560 413-560t-28.5 11.5Q373-537 373-520t11.5 28.5Q396-480 413-480t28.5-11.5Zm-133 0Q320-503 320-520t-11.5-28.5Q297-560 280-560t-28.5 11.5Q240-537 240-520t11.5 28.5Q263-480 280-480t28.5-11.5ZM547-480q17 0 28.5-11.5T587-520q0-17-11.5-28.5T547-560q-17 0-28.5 11.5T507-520q0 17 11.5 28.5T547-480Zm161.5-11.5Q720-503 720-520t-11.5-28.5Q697-560 680-560t-28.5 11.5Q640-537 640-520t11.5 28.5Q663-480 680-480t28.5-11.5ZM160-320h640v-400H160v400Zm320 160q-99 0-169.5-13.5T240-206v-34h-80q-33 0-56.5-23.5T80-320v-400q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v400q0 33-23.5 56.5T800-240h-80v34q0 19-70.5 32.5T480-160Zm0-360Z" />
            </svg>
          }
          text1="Add your tools"
          text2="Enter the AI tools your team uses and your monthly spend."
        />

        <CustomCard
          icon1={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
              viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM360-280h240v-80H440v-80h80q33 0 56.5-23.5T600-520v-80q0-33-23.5-56.5T520-680H360v80h160v80h-80q-33 0-56.5 23.5T360-440v160Z" />
            </svg>
          }
          icon2={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
              viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M520-520h278q-15-110-91.5-186.5T520-798v278Zm-80 358v-636q-121 15-200.5 105.5T160-480q0 122 79.5 212.5T440-162Zm80 0q110-14 187-91t91-187H520v278Zm-40-318Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z" />
            </svg>
          }
          text1="We analyze"
          text2="Our engine checks pricing, overlap, and usage patterns."
        />

        <CustomCard
          icon1={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
              viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM360-280h160q33 0 56.5-23.5T600-360v-60q0-26-17-43t-43-17q26 0 43-17t17-43v-60q0-33-23.5-56.5T520-680H360v80h160v80h-80v80h80v80H360v80Z" />
            </svg>
          }
          icon2={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
              viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M468-240q-96-5-162-74t-66-166q0-100 70-170t170-70q97 0 166 66t74 162l-84-25q-13-54-56-88.5T480-640q-66 0-113 47t-47 113q0 57 34.5 100t88.5 56l25 84Zm48 158q-9 2-18 2h-18q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v18q0 9-2 18l-78-24v-12q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h12l24 78Zm305 22L650-231 600-80 480-480l400 120-151 50 171 171-79 79Z" />
            </svg>
          }
          text1="Get savings"
          text2="See where you're overspending and how much you can save."
        />
      </div>
    </div>
  );
};

export default DetailsOfAudit;