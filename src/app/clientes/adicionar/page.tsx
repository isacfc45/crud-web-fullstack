"use client";

import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Person } from "@/domain/entities/Person";
import { useRouter } from "next/navigation";
import { z } from "zod";
import InputSelect from "@/components/Input/InputSelect";

const CreateCliente = () => {
  const [person, setPerson] = useState<Person>(
    new Person(0, "", "", "Física", "")
  );
  const [confirmDuplicate, setConfirmDuplicate] = useState(false);
  const router = useRouter();

  const personSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    nickname: z.string().min(1, { message: "Apelido é obrigatório" }),
    taxType: z.string().min(1, { message: "Tipo Fiscal é obrigatório" }),
    cpfCnpj: z
      .string()
      .min(1, { message: "CPF/CNPJ é obrigatório" })
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
      setConfirmDuplicate(window.confirm(
        "CPF/CNPJ já cadastrado. Deseja continuar?"
      ));
        
        if (!confirmDuplicate) {
          return;
        }

        setConfirmDuplicate(true);
      }

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
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <Input
          label="Nome"
          value={person.name}
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
          placeholder="Ex: João da Silva"
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
          placeholder="Ex: João"
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
            { value: "Física", label: "Física" },
            { value: "Jurídica", label: "Jurídica" },
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
          placeholder="Ex: 123.456.789-00"
        />
        {errors.cpfCnpj && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.cpfCnpj[0]}
          </span>
        )}
        <Button onClick={() => {}} type="submit">
          Salvar
        </Button>
      </form>
    </Layout>
  );
};

export default CreateCliente;
