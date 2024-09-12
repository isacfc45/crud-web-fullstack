"use client";

import React from "react";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Link from "next/link";

const Clientes = () => {
  const headers = ["ID", "Nome", "CPF/CNPJ", "Ações"];
  const rows = [
    [
      "1",
      "Fulano de Tal",
      "123.456.789-00",
      <Link key={"1"} href="/clientes/edit/1">
        Detalhes
      </Link>,
    ],
    [
      "2",
      "Ciclano de Tal",
      "123.456.789-00",
      <Link key={"2"} href="/clientes/edit/2">
        Detalhes
      </Link>,
    ],
    [
      "3",
      "Beltrano de Tal",
      "123.456.789-00",
      <Link key={3} href="/clientes/edit/3">
        Detalhes
      </Link>,
    ],
  ];

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
