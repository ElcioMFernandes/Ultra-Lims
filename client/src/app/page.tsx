import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Home() {
  return (
    <>
      <div className={`${inter.variable} bg-amber-50 h-screen w-full`}>
        <h1 className="font-sans text-black">Hello, World!</h1>
      </div>
    </>
  );
}
