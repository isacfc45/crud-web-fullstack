"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import React, { useState } from "react";

const EditCliente = () => {
  const [nome, setNome] = useState("João Silva"); // Exemplo de preenchimento
  const [cpfCnpj, setCpfCnpj] = useState("123.456.789-00");
  const [email, setEmail] = useState("joao.silva@example.com");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para atualizar o cliente...
    console.log("Cliente atualizado:", { nome, cpfCnpj, email });
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          label="CPF/CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mt-4">
          <Button onClick={() => {}} type="submit" className="mr-2">
            Salvar
          </Button>
          <Button
            onClick={() => {}}
            type="button"
            className="bg-gray-500 hover:bg-gray-700"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default EditCliente;
