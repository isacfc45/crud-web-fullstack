"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import { Address } from "@/domain/entities/Address";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const EditEndereco = ({
  params,
}: {
  params: { id: number; endereco_id: number };
}) => {
  const { id, endereco_id } = params;
  const [address, setAddress] = useState<Address>(
    new Address(0, "", "", "", "", "", "", "", "", id)
  );
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(`/api/pessoas/${id}/enderecos/${endereco_id}`);
    const data = await response.json();

    if (!data) {
      router.push("/404");
      return;
    }

    setAddress(data);
    console.log(data);
  };

  const addressSchema = z.object({
    road: z.string().min(1, "O logradouro é obrigatório."),
    number: z.string().min(1, "O número é obrigatório."),
    complement: z.string(),
    neighborhood: z.string().min(1, "O bairro é obrigatório."),
    cep: z.string().min(1, "O CEP é obrigatório."),
    city: z.string().min(1, "A cidade é obrigatória."),
    state: z.string().min(1, "O estado é obrigatório."),
    country: z.string().min(1, "O país é obrigatório."),
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] | undefined }>(
    {
      road: [],
      number: [],
      complement: [],
      neighborhood: [],
      cep: [],
      city: [],
      state: [],
      country: [],
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = addressSchema.safeParse(address);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(
        `/api/pessoas/${id}/enderecos/${endereco_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(address),
        }
      );

      if (response.ok) {
        alert("Endereço editado com sucesso!");
        router.push(`/clientes/${id}`);
      } else {
        alert("Erro ao editar endereço.");
      }
    } catch (error) {
      console.error("Erro ao editar endereço:", error);
      alert("Erro ao editar endereço.");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Editar Endereço</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <Input
          label="Logradouro"
          value={address.road}
          onChange={(e) => setAddress({ ...address, road: e.target.value })}
          placeholder="Ex: Rua A, Avenida B"
        />
        {errors.road && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.road[0]}
          </span>
        )}
        <Input
          label="Número"
          value={address.number}
          onChange={(e) => setAddress({ ...address, number: e.target.value })}
          placeholder="Ex: 123"
        />
        {errors.number && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.number[0]}
          </span>
        )}
        <Input
          label="Complemento"
          value={address.complement}
          onChange={(e) =>
            setAddress({ ...address, complement: e.target.value })
          }
          placeholder="Ex: Apto 201"
        />
        {errors.complement && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.complement[0]}
          </span>
        )}
        <Input
          label="Bairro"
          value={address.neighborhood}
          onChange={(e) =>
            setAddress({ ...address, neighborhood: e.target.value })
          }
          placeholder="Ex: Centro"
        />
        {errors.neighborhood && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.neighborhood[0]}
          </span>
        )}
        <Input
          label="CEP"
          value={address.cep}
          onChange={(e) => setAddress({ ...address, cep: e.target.value })}
          placeholder="Ex: 12345-678"
        />
        {errors.cep && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.cep[0]}
          </span>
        )}
        <Input
          label="Cidade"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          placeholder="Ex: São Paulo"
        />
        {errors.city && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.city[0]}
          </span>
        )}
        <Input
          label="Estado"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          placeholder="Ex: SP"
        />
        {errors.state && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.state[0]}
          </span>
        )}
        <Input
          label="País"
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          placeholder="Ex: Brasil"
        />
        {errors.country && (
          <span className="text-red-500 text-xs italic mb-5">
            {errors.country[0]}
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

export default EditEndereco;
