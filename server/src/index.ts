import axios from "axios";
import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/cep");

const cepSchema = new mongoose.Schema({
  cep: { type: String, unique: true },
  logradouro: String,
  complemento: String,
  unidade: String,
  bairro: String,
  localidade: String,
  uf: String,
  estado: String,
  regiao: String,
  ibge: String,
  gia: String,
  ddd: String,
  siafi: String,
});

const Cep = mongoose.model("Cep", cepSchema);

const fetch = async (cep: string) => {
  console.log(`Fetching data from ${cep}`);
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const cepData = new Cep(response.data);
    await cepData.save();

    return response.data;
  } catch (error) {
    return error;
  }
};

app.use((req, res, next) => {
  console.log(new Date().toUTCString(), res.statusCode, req.method, req.url);
  next();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.route("/api/v1").get(async (req, res) => {
  res.set({
    "Content-Type": "application/json",
    Date: new Date().toUTCString(),
  });
  res.json(await Cep.find());
});

app.route("/api/v1/:cep").get(async (req, res) => {
  res.set({
    "Content-Type": "application/json",
    Date: new Date().toUTCString(),
  });
  let cep = req.params.cep.replace(/\D/g, "").substring(0, 8);

  if (cep.length > 5) {
    cep = `${cep.substring(0, 5)}-${cep.substring(5)}`;
  }

  const cepData = await Cep.findOne({ cep: cep });
  if (cepData) {
    res.json(cepData);
  } else {
    res.json(await fetch(req.params.cep));
  }
});
