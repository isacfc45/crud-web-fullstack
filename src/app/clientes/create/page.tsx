"use client";

import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Person } from "@/domain/entities/Person";

const CreateCliente = () => {
  const [pessoa, setPessoa] = useState<Person>(new Person(1, "", "", "", ""));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ nome, cpfCnpj, email });
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Adicionar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          value={pessoa.nome}
          onChange={(e) => setPessoa({ ...pessoa, nome: e.target.value })}
        />
        <Input
          label="CPF/CNPJ"
          value={pessoa?.idade}
          onChange={(e) => setCpfCnpj(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={pessoa?.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={() => {}} type="submit">
          Salvar
        </Button>
      </form>
    </Layout>
  );
};

export default CreateCliente;
