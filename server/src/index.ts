import cors from "cors";
import axios from "axios";
import express from "express";
import mongoose from "mongoose";
import { cepSchema } from "./schema/cep";

const app = express();
const port = 3000;

app.use(cors());

mongoose.connect("mongodb://localhost:27017/cep", {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

const Cep = mongoose.model("Cep", cepSchema);

const fetch = async (cep: string) => {
  console.log(`Fetching data from ${cep}`);
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.erro) {
      return { message: "CEP não encontrado" };
    }

    const cepData = new Cep(response.data);

    return await cepData.save();
  } catch (error) {
    return error;
  }
};

// Middleware para de log de requisições
app.use((req, res, next) => {
  // Toda requisição terá o Content-Type definido como application/json
  res.set({
    "Content-Type": "application/json",
    Date: new Date().toUTCString(),
  });

  // Toda requisição terá o log de requisição no console
  console.log(new Date().toUTCString(), res.statusCode, req.method, req.url);
  next();
});

// Mensagem de inicialização do servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Endpoint para verificar se o servidor está online
app.route("/").get((req, res) => {
  res.json({ status: "OK" });
});

// Endpoint ordenado por bairro de forma crescente (Ascending)
app.route("/api/v1/district/asc").get(async (req, res) => {
  res.json(await Cep.find().sort({ bairro: 1 }));
});

// Endpoint ordenado por bairro de forma decrescente (Descending)
app.route("/api/v1/district/desc").get(async (req, res) => {
  res.json(await Cep.find().sort({ bairro: -1 }));
});

// Endpoint ordenado por cidade de forma crescente (Ascending)
app.route("/api/v1/city/asc").get(async (req, res) => {
  res.json(await Cep.find().sort({ localidade: 1 }));
});

// Endpoint ordenado por cidade de forma decrescente (Descending)
app.route("/api/v1/city/desc").get(async (req, res) => {
  res.json(await Cep.find().sort({ localidade: -1 }));
});

// Endpoint ordenado por estado de forma crescente (Ascending)
app.route("/api/v1/state/asc").get(async (req, res) => {
  res.json(await Cep.find().sort({ uf: 1 }));
});

// Endpoint ordenado por estado de forma decrescente (Descending)
app.route("/api/v1/state/desc").get(async (req, res) => {
  res.json(await Cep.find().sort({ uf: -1 }));
});

// Endpoint não ordenado, retornando os dados conforme são inseridos
app.route("/api/v1").get(async (req, res) => {
  res.json(await Cep.find());
});

// Endpoint para buscar um CEP específico
app.route("/api/v1/:cep").get(async (req, res) => {
  // Remove caracteres especiais e limita o CEP a 8 caracteres
  let cep = req.params.cep.replace(/\D/g, "").substring(0, 8);

  // Adiciona o hífen ao CEP
  if (cep.length > 5) {
    cep = `${cep.substring(0, 5)}-${cep.substring(5)}`;
  }

  // Busca o CEP no banco de dados usando regex
  const cepData = await Cep.find({ cep: { $regex: cep, $options: "i" } });

  // Se o CEP existir no banco de dados, retorna os dados
  if (cepData.length > 0) {
    res.json(cepData);

    // Se o CEP não existir no banco de dados, busca os dados na API externa
  } else if (req.params.cep.replace(/\D/g, "").length == 8) {
    await fetch(req.params.cep);

    res.json(await Cep.find({ cep: { $regex: cep, $options: "i" } }));
  } else {
    res.json({ message: "CEP inválido" });
  }
});
