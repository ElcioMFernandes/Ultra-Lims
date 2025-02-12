import mongoose from "mongoose";

export const cepSchema = new mongoose.Schema({
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
