"use client";

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import Link from "next/link";
import { Person } from "@/domain/entities/Person";
import ClientsTable from "../../components/Table/ClientsTable";
import { GrUpdate, GrView } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

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

  const handleDelete = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Deseja realmente excluir este cliente?"
    );

    if (!confirmDelete) {
      return;
    }

    const id = e.currentTarget.href.split("/").pop();
    const response = await fetch(`/api/pessoas/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data) {
      setPeople(people.filter((person) => person.id !== parseInt(id!)));
    }

    alert("Cliente excluído com sucesso!");
  };

  const rows = people.map((person) => ({
    id: person.id,
    name: person.name,
    taxType: person.taxType,
    cpfCnpj: person.cpfCnpj,
    acoes: (
      <div className="flex justify-around">
        <Link href={`/clientes/${person.id}`}>
          <div>
            <GrView />
          </div>
        </Link>
        <Link href={`/clientes/${person.id}/editar`}>
          <div>
            <GrUpdate />
          </div>
        </Link>
        <Link href={`${person.id}`} onClick={handleDelete}>
          <div>
            <RiDeleteBin6Line />
          </div>
        </Link>
      </div>
    ),
  }));

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <Link href="/clientes/adicionar">
          <Button onClick={() => {}}>Adicionar Cliente</Button>
        </Link>
      </div>
      <ClientsTable headers={headers} rows={rows} />
    </Layout>
  );
};

export default Clientes;
