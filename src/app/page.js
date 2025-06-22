"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "./assets/cart.png";
import Navbar from "./components/ui/navbar";

export default function Home() {
  return (
    <>
      {" "}
      <Navbar />{" "}
      <div className="min-h-6/12  sm:p-10 bg-white dark:bg-[#0e0e0e] text-black dark:text-white">
        <section className="flex flex-col-reverse md:flex-row sm:px-7 items-center justify-between gap-3">
          {/* Left Text Content */}
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="text-primary text-amber-500">Vendora</span>
            </h1>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              Shop our curated collection of trending products, top brands, and
              exclusive discounts.
            </p>
            <Link href="/dashboard">
              <span className="inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full text-sm font-semibold transition hover:scale-105 hover:opacity-90">
                Shop Now
              </span>
            </Link>
          </div>

          {/* Right Logo/Image */}
          <div className="w-full max-w-md">
            <Image
              src={Logo}
              alt="Vendora Cart Logo"
              width={500}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </section>
      </div>
    </>
  );
}
