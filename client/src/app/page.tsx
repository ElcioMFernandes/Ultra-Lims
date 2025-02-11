"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Nunito, DM_Serif_Display } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
});

export default function Home() {
  const [cep, setCep] = useState("");

  useEffect(() => {
    const fetchCep = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/");
        setCep(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCep();
  }, []);

  return (
    <>
      <div
        className={`${nunito.variable} ${dmSerifDisplay.variable} grid grid-cols-1 grid-rows-12 bg-amber-50 h-screen w-full py-6 px-8 select-none`}
      >
        <nav className="flex justify-between">
          <p className="font-nunito font-bold text-black col-span-2 row-span-1">
            Ultra LIMS
          </p>
          <ul className="flex gap-4">
            <li className="text-black">Contato</li>
            <li className="text-black">Sobre</li>
            <li className="text-black">Ajuda</li>
          </ul>
        </nav>
        <div className="grid grid-cols-2 row-span-11 ">
          <div className="flex flex-col items-left justify-around">
            <h2 className="font-dm-serif-display text-black col-span-1 row-span-1 text-6xl">
              Consulte endereços a partir de um CEP sem complicação.
            </h2>
            <div>
              <label htmlFor="cep" className="font-nunito text-black">
                CEP:
              </label>
              <input
                id="cep"
                type="text"
                className="font-nunito border border-transparent border-b-black bg-transparent focus:outline-none text-black px-2"
              />
            </div>
          </div>
          <div>
            <p className="font-nunito font-bold text-black col-span-1 row-span-1 border border-red-500">
              {cep}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
