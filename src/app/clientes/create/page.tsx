"use client";

import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Person } from "@/domain/entities/Person";
import { useRouter } from "next/navigation";

const CreateCliente = () => {
  const [person, setPerson] = useState<Person>(new Person(0, "", "", "", ""));
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(person);

    try {
      const response = await fetch("/api/pessoas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      if (response.ok) {
        alert("Usuário criado com sucesso!");
        router.push("/clientes");
      } else {
        alert("Erro ao criar usuário.");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário.");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Adicionar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          value={person.name}
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
        />
        <Input
          label="Apelido"
          value={person.nickname}
          onChange={(e) => setPerson({ ...person, nickname: e.target.value })}
        />
        <Input
          label="Tipo Fiscal"
          value={person.cpfCnpj}
          onChange={(e) => setPerson({ ...person, cpfCnpj: e.target.value })}
        />
        <Input
          label="CPF/CNPJ"
          value={person.taxType}
          onChange={(e) => setPerson({ ...person, taxType: e.target.value })}
        />
        <Button onClick={() => {}} type="submit">
          Salvar
        </Button>
      </form>
    </Layout>
  );
};

export default CreateCliente;
