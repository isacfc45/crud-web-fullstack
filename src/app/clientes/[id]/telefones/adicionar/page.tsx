"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import { Phone } from "@/domain/entities/Phone";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateTelefone = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const [phone, setPhone] = useState<Phone>(new Phone(0, "", "", "", id));
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/pessoas/${id}/telefones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(phone),
      });

      if (response.ok) {
        alert("Telefone criado com sucesso!");
        router.push(`/clientes/${id}`);
      } else {
        alert("Erro ao criar telefone.");
      }
    } catch (error) {
      console.error("Erro ao criar telefone:", error);
      alert("Erro ao criar telefone.");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Adicionar Telefone</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <Input
          label="Área"
          value={phone.area}
          onChange={(e) => setPhone({ ...phone, area: e.target.value })}
          placeholder="Ex: 11"
        />
        <Input
          label="Número"
          value={phone.number}
          onChange={(e) => setPhone({ ...phone, number: e.target.value })}
          placeholder="Ex: 98765-4321"
        />
        <Input
          label="Descrição"
          value={phone.description}
          onChange={(e) => setPhone({ ...phone, description: e.target.value })}
          placeholder="Ex: Telefone pessoal"
        />
        <div className="mt-4">
          <Button onClick={() => {}} type="submit">
            Adicionar Telefone
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default CreateTelefone;
