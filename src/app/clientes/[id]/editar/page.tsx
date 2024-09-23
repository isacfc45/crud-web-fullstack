"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import InputSelect from "@/components/Input/InputSelect";
import Layout from "@/components/Layout/Layout";
import { Person } from "@/domain/entities/Person";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const EditCliente = ({ params }: { params: { id: number } }) => {
  const [person, setPerson] = useState<Person>(new Person(0, "", "", "", ""));
  const [confirmDuplicate, setConfirmDuplicate] = useState(false);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    getData();
  }, []);

  const personSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    nickname: z.string().min(1, { message: "Apelido é obrigatório" }),
    taxType: z.string().min(1, { message: "Tipo Fiscal é obrigatório" }),
    cpfCnpj: z
      .string()
      .nonempty({ message: "CPF/CNPJ é obrigatório" })
      .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "CPF/CNPJ inválido"),
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] | undefined }>(
    {
      name: [],
      nickname: [],
      taxType: [],
      cpfCnpj: [],
    }
  );

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

    const result = personSchema.safeParse(person);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const checkCpfCnpj = await fetch("/api/pessoas/check-cpf-cnpj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person.cpfCnpj),
      });

      const checkCpfCnpjData = await checkCpfCnpj.json();

      if (checkCpfCnpjData.exists) {
        setConfirmDuplicate(
          window.confirm("CPF/CNPJ já cadastrado. Deseja continuar?")
        );

        if (!confirmDuplicate) {
          return;
        }

        setConfirmDuplicate(true);
      }

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
        {errors.name && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.name[0]}
          </span>
        )}
        <Input
          label="Apelido"
          value={person.nickname}
          onChange={(e) => setPerson({ ...person, nickname: e.target.value })}
        />
        {errors.nickname && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.nickname[0]}
          </span>
        )}
        <InputSelect
          label="Tipo Fiscal"
          value={person.taxType}
          onChange={(e) => setPerson({ ...person, taxType: e.target.value })}
          options={[
            { label: "Física", value: "F" },
            { label: "Jurídica", value: "J" },
          ]}
        />
        {errors.taxType && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.taxType[0]}
          </span>
        )}
        <Input
          label="CPF/CNPJ"
          value={person.cpfCnpj}
          onChange={(e) => setPerson({ ...person, cpfCnpj: e.target.value })}
        />
        {errors.cpfCnpj && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.cpfCnpj[0]}
          </span>
        )}
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
