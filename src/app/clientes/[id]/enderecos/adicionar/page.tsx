"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import { Address } from "@/domain/entities/Address";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddEndereco = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const [address, setAddress] = useState<Address>(
    new Address(0, "", "", "", "", "", "", "", "", id)
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/pessoas/${id}/enderecos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      if (response.ok) {
        alert("Endereço criado com sucesso!");
        router.push(`/clientes/${id}`);
      } else {
        alert("Erro ao criar endereço.");
      }
    } catch (error) {
      console.error("Erro ao criar endereço:", error);
      alert("Erro ao criar endereço.");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Adicionar Endereço</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <Input
          label="Logradouro"
          value={address.road}
          onChange={(e) => setAddress({ ...address, road: e.target.value })}
          placeholder="Ex: Rua A, Avenida B"
        />
        <Input
          label="Número"
          value={address.number}
          onChange={(e) => setAddress({ ...address, number: e.target.value })}
          placeholder="Ex: 123"
        />
        <Input
          label="Complemento"
          value={address.complement}
          onChange={(e) =>
            setAddress({ ...address, complement: e.target.value })
          }
          placeholder="Ex: Apto 201"
        />
        <Input
          label="Bairro"
          value={address.neighborhood}
          onChange={(e) =>
            setAddress({ ...address, neighborhood: e.target.value })
          }
          placeholder="Ex: Centro"
        />
        <Input
          label="CEP"
          value={address.cep}
          onChange={(e) => setAddress({ ...address, cep: e.target.value })}
          placeholder="Ex: 12345-678"
        />
        <Input
          label="Cidade"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          placeholder="Ex: São Paulo"
        />
        <Input
          label="Estado"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          placeholder="Ex: SP"
        />
        <Input
          label="País"
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          placeholder="Ex: Brasil"
        />
        <div className="mt-4">
          <Button onClick={() => {}} type="submit">
            Adicionar Endereço
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default AddEndereco;
