"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import { Phone } from "@/domain/entities/Phone";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const EditTelefone = ({
  params,
}: {
  params: { id: number; telefone_id: number };
}) => {
  const { id, telefone_id } = params;
  const [phone, setPhone] = useState<Phone>(new Phone(0, "", "", "", id));
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(`/api/pessoas/${id}/telefones/${telefone_id}`);
    const data = await response.json();

    if (!data) {
      router.push("/404");
      return;
    }

    setPhone(data);
    console.log(data);
  };

  const phoneSchema = z.object({
    area: z.string().min(1, "O DDD é obrigatório."),
    number: z.string().min(1, "O número é obrigatório."),
    description: z.string().min(1, "A descrição é obrigatória."),
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] | undefined }>(
    {
      area: [],
      number: [],
      description: [],
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(
        `/api/pessoas/${id}/telefones/${telefone_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(phone),
        }
      );

      if (response.ok) {
        alert("Telefone editado com sucesso!");
        router.push(`/clientes/${id}`);
      } else {
        alert("Erro ao editar telefone.");
      }
    } catch (error) {
      console.error("Erro ao editar telefone:", error);
      alert("Erro ao editar telefone.");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Editar Endereço</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <Input
          label="Área"
          value={phone.area}
          onChange={(e) => setPhone({ ...phone, area: e.target.value })}
          placeholder="Ex: 11"
        />
        {errors.area && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.area[0]}
          </span>
        )}
        <Input
          label="Número"
          value={phone.number}
          onChange={(e) => setPhone({ ...phone, number: e.target.value })}
          placeholder="Ex: 98765-4321"
        />
        {errors.number && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.number[0]}
          </span>
        )}
        <Input
          label="Descrição"
          value={phone.description}
          onChange={(e) => setPhone({ ...phone, description: e.target.value })}
          placeholder="Ex: Telefone pessoal"
        />
        {errors.description && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.description[0]}
          </span>
        )}
        <div className="mt-4">
          <Button onClick={() => {}} type="submit" className="mr-2">
            Salvar
          </Button>
          <Link href={`/clientes/${id}`}>
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

export default EditTelefone;
