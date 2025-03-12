export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[10%] bg-gray-100 pt-6 text-gray-700 text-xs xs:text-sm md:text-base pb-5">
      <span className="xs:flex xs:justify-center cursor-default w-[62%] xs:w-full">
        If you have anything to ask, fill free to contact us:
        <a
          href="mailto:dartarena2025@gmail.com"
          className="text-purple-600 font-semibold ml-1"
        >
          dartarena2025@gmail.com.
        </a>
      </span>
      <span className="cursor-default">
        We will reply in shortest time possible!💜
      </span>
    </div>
  );
}
