"use client";

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Link from "next/link";
import { Person } from "@/domain/entities/Person";

const Clientes = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const headers = ["ID", "Nome", "Tipo Fiscal", "CPF/CNPJ", "Ações"];

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await fetch("/api/pessoas");
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error("Failed to fetch people:", error);
      }
    }

    fetchPeople();
  }, []);

  const rows = people.map((person) => ({
    id: person.id,
    name: person.name,
    taxType: person.taxType,
    cpfCnpj: person.cpfCnpj,
    acoes: (
      <div className="flex justify-around">
        <Link href={`/clientes/${person.id}`}>
          <div>Visualizar</div>
        </Link>
        <Link href={`/clientes/edit/${person.id}`}>
          <div>Editar</div>
        </Link>
        <Link href={`/clientes/delete/${person.id}`}>
          <div>Excluir</div>
        </Link>
      </div>
    ),
  }));

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <Link href="/clientes/create">
          <Button onClick={() => {}}>Adicionar Cliente</Button>
        </Link>
      </div>
      <Table headers={headers} rows={rows} />
    </Layout>
  );
};

export default Clientes;
