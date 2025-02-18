"use client";

import axios from "axios";
import { Cep } from "@/types/Cep";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";

const Home = () => {
  const [cep, setCep] = useState("");
  const [ceps, setCeps] = useState<Cep[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://192.168.1.15:3000/api/v1");
      if (response.status === 200) {
        setCeps(response.data);
      } else {
        console.error("Error");
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://192.168.1.15:3000/api/v1/${cep}`
      );
      if (response.status === 200) {
        setCeps(response.data);
      } else {
        console.error("Error");
      }
    };
    fetch();
  }, [cep]);

  return (
    <>
      <div className="h-screen grid grid-cols-2 grid-rows-12 p-4 select-none bg-amber-50">
        <div className="col-span-2 row-span-1 flex justify-between items-center px-4">
          <p>Ultra LIMS</p>
          <ul className="flex gap-4">
            <button>GitHub</button>
            <button>Linkedin</button>
          </ul>
        </div>
        <div className="col-span-1 row-span-11 flex flex-col gap-10 p-4">
          <p className="text-7xl text-left">
            Consulte endereços a partir de um CEP sem complicação.
          </p>
          <div>
            <label htmlFor="cep" className="text-2xl">
              CEP:
            </label>
            <input
              id="cep"
              className="w-1/4 bg-transparent border border-transparent border-b-black focus:outline-none"
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-1 row-span-11 grid grid-rows-12 grid-cols-1 p-4">
          <ul className="flex justify-around drop-shadow-lg items-center">
            <p className="''">Ordenar por:</p>
            <button>Cidade</button>
            <button>Bairro</button>
            <button>Estado</button>
          </ul>
          <ul className="col-span-3 row-span-11 overflow-y-auto flex flex-col gap-3">
            {Array.isArray(ceps) && ceps.length > 0 ? (
              ceps.map((cep) => (
                <li key={cep._id}>
                  <Card
                    title={`${cep.cep} - ${cep.logradouro}, ${cep.bairro} - ${cep.localidade} (${cep.uf})`}
                    details={`IBGE: ${cep.ibge} | DDD: ${cep.ddd} | Região: ${cep.regiao}`}
                  ></Card>
                </li>
              ))
            ) : (
              <p className="h-full flex items-center justify-center text-2xl">
                Nenhum CEP encontrado
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
