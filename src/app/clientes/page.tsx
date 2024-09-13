"use client";

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Link from "next/link";
import { Person } from "@/domain/entities/Person";

const Clientes = () => {
  // Corrija o tipo de estado de useState para um array de Person
  const [people, setPeople] = useState<Person[]>([]);

  // Defina os headers da tabela
  const headers = ["ID", "Nome", "Tipo Fiscal", "CPF/CNPJ"];

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await fetch("/api/pessoas");
        const data = await response.json();
        setPeople(data); // Definir os dados no estado
      } catch (error) {
        console.error("Failed to fetch people:", error);
      }
    }

    fetchPeople();
  }, []);

  // Mapeia a lista de pessoas para o formato de rows esperado pela tabela
  const rows = people.map((person) => ({
    id: person.id,
    name: person.name,
    taxType: person.taxType,
    cpfCnpj: person.cpfCnpj,
  }));

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <Link href="/clientes/create">
          <Button onClick={() => {}}>Adicionar Cliente</Button>
        </Link>
      </div>
      {/* Passe os headers e as linhas para o componente Table */}
      <Table headers={headers} rows={rows} />
    </Layout>
  );
};

export default Clientes;
