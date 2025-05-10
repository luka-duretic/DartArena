export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[10%] bg-background pt-6 text-textColorDark text-xs xs:text-sm md:text-base pb-5">
      <div className="flex justify-center items-center">
        <span className=" cursor-default w-[62%] xs:w-full break-before">
          If you have anything to ask, fill free to contact us:
          <a
            href="mailto:dartarena2025@gmail.com"
            className="text-linkColor font-semibold ml-1"
          >
            dartarena2025@gmail.com.
          </a>
        </span>
      </div>
      <span className="cursor-default">
        We will reply in shortest time possible!💜
      </span>
    </div>
  );
}
