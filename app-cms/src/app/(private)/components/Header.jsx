import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import Search from "./Search";
import Action from "./Action";
export default function Header() {
  return (
    <div className="h-[66px] flex justify-between bg-[#fff] items-center px-7 border-b-[1px] border-solid border-[#e8ebed] sticky top-0 right-0 z-20">
      <div>
        <Link className="flex items-center gap-2" href="/">
          <Image
            className="rounded-lg"
            src="https://res.cloudinary.com/dtnl8o21p/image/upload/v1728753121/7e821551447807fbfcc9cdad8e535ae7_njsjw0.png"
            width={40}
            height={40}
            alt="logo"
          />
          <h2 className={clsx("text-[#242424] font-black text-l", "logo")}>
            Skin care
          </h2>
        </Link>
      </div>
      <Search />
      <Action />
    </div>
  );
}
