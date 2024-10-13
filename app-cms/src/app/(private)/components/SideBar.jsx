"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MENU } from "../utils/menuData";
export default function SideBar() {
  const pathname = usePathname();
  return (
    <aside className="flex-shrink-0 transition-transform transform translate-x-0">
      <div className="w-[96px] sticky top-[74px] left-0 px-2 z-10">
        <ul className="mt-4">
          {MENU.map(({ title, icon, path }, index) => (
            <li key={index}>
              <Link
                className={`flex items-center flex-col w-[72px] h-[72px] justify-center mt-1 rounded-2xl cursor-pointer ${
                  pathname === path ? "bg-[#e8ebed]" : ""
                }`}
                href={path}
              >
                {icon}
                <span className="text-[11px] text-[#404040] mt-2 font-semibold">
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
