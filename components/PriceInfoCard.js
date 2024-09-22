import Image from "next/image";

const PriceInfoCard = ({ title, iconSrc, value }) => {
  return (
    <div className={`flex flex-col w-[160px] gap-2 border-l-[3px] rounded-xl bg-[#F4F4F4] px-4 py-2 justify-center items-center`}>
      <p className="text-base text-[#3D4258]">{title}</p>

      <div className="flex gap-3 items-center justify-center flex-wrap">
        <Image src={iconSrc} alt={title} width={25} height={25} />

        <p className="text-xl font-bold text-[#282828]">{value}</p>
      </div>
    </div>
  )
}

export default PriceInfoCard