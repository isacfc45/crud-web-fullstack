"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import { Person } from "@/domain/entities/Person";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditCliente = () => {
  const [person, setPerson] = useState<Person>(new Person(0, "", "", "", ""));
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (router.isReady) {
      async function fetchPerson() {
        try {
          const response = await fetch(`/api/pessoas/${id}`);
          const data = await response.json();
          setPerson(data);
        } catch (error) {
          console.error("Failed to fetch person:", error);
        }
      }

      fetchPerson();
    }
  }, [router.isReady, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>
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
          value={person.taxType}
          onChange={(e) => setPerson({ ...person, taxType: e.target.value })}
        />
        <Input
          label="CPF/CNPJ"
          value={person.cpfCnpj}
          onChange={(e) => setPerson({ ...person, cpfCnpj: e.target.value })}
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
