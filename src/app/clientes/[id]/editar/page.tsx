"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import { Person } from "@/domain/entities/Person";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditCliente = ({ params }: { params: { id: number } }) => {
  const [person, setPerson] = useState<Person>(new Person(0, "", "", "", ""));
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(`/api/pessoas/${id}`);
    const data = await response.json();

    if (!data) {
      router.push("/404");
      return;
    }

    setPerson(data);
    console.log(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/pessoas/${id}`, {
        method: "PUT",
        body: JSON.stringify(person),
      });
      if (response.ok) {
        alert("Usuário atualizado com sucesso!");
        router.push("/clientes");
      } else {
        alert("Erro ao atualizar usuário.");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar usuário.");
    }
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
          <Link href="/clientes">
            <Button
              onClick={() => {}}
              type="button"
              className="bg-gray-500 hover:bg-gray-700"
            >
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default EditCliente;
