import { Disclosure, DisclosureButton } from "@headlessui/react";
import LogoutButton from "../logoutBtn";
import { X } from "lucide-react";
import Logo from "../../assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ session }) {
  return (
    <Disclosure as="nav" className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <X size={24} className="text-gray-500 hover:text-black" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center gap-1">
              <Image alt="Your Company" src={Logo} className="h-8 w-auto" />
              <h1 className="text-xl text-white">Vendora Cart</h1>
            </div>
          </div>
          {!session ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
              <Link href="/signin">
                <span className="inline-block bg-black text-amber-600 px-6 py-2 rounded-full text-sm font-semibold transition hover:scale-105 hover:opacity-90">
                  Sign In
                </span>
              </Link>
              <Link href="/signup">
                <span className="inline-block bg-black text-amber-600 px-6 py-2 rounded-full text-sm font-semibold transition hover:scale-105 hover:opacity-90">
                  Sign Up
                </span>
              </Link>
            </div>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
    </Disclosure>
  );
}
