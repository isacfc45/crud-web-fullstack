"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import AddressTable from "@/components/Table/AddressTable";
import PhonesTable from "@/components/Table/PhonesTable";
import { Address } from "@/domain/entities/Address";
import { Person } from "@/domain/entities/Person";
import { Phone } from "@/domain/entities/Phone";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cliente = ({ params }: { params: { id: number } }) => {
  const [person, setPerson] = useState<Person>(new Person(0, "", "", "", ""));
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    getData();
    getPhones();
    getAddresses();
  }, []);

  const getData = async () => {
    const response = await fetch(`/api/pessoas/${id}`);
    const data = await response.json();

    if (!data) {
      router.push("/404");
      return;
    }

    setPerson(data);
  };

  const getPhones = async () => {
    const response = await fetch(`/api/pessoas/${id}/telefones`);
    const data = await response.json();
    console.log(data);

    if (!data) {
      router.push("/404");
      return;
    }

    setPhones(data);
  };

  const getAddresses = async () => {
    const response = await fetch(`/api/pessoas/${id}/enderecos`);
    const data = await response.json();
    console.log(data);

    if (!data) {
      router.push("/404");
      return;
    }

    setAddresses(data);
  };

  const rowsAddresses = addresses.map((address) => ({
    road: address.road,
    number: address.number,
    complement: address.complement,
    neighborhood: address.neighborhood,
    cep: address.cep,
    city: address.city,
    state: address.state,
    country: address.country,
    acoes: (
      <div className="flex justify-around">
        <Link href={`/clientes/${person.id}/editar`}>
          <div>
            <GrUpdate />
          </div>
        </Link>
        <Link href={`/clientes/delete/${person.id}`}>
          <div>
            <RiDeleteBin6Line />
          </div>
        </Link>
      </div>
    ),
  }));

  const rowsPhones = phones.map((phone) => ({
    area: phone.area,
    number: phone.number,
    description: phone.description,
    acoes: (
      <div className="flex justify-around">
        <Link href={`/clientes/${person.id}/editar`}>
          <div>
            <GrUpdate />
          </div>
        </Link>
        <Link href={`/clientes/delete/${person.id}`}>
          <div>
            <RiDeleteBin6Line />
          </div>
        </Link>
      </div>
    ),
  }));

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Informações do Cliente</h2>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Nome" value={person.name} onChange={() => {}} />
        <Input label="Apelido" value={person.nickname} onChange={() => {}} />
        <Input label="Tipo Fiscal" value={person.taxType} onChange={() => {}} />
        <Input label="CPF/CNPJ" value={person.cpfCnpj} onChange={() => {}} />
      </div>

      <h3 className="text-xl font-bold mt-6 mb-4">Endereços</h3>
      <AddressTable
        headers={[
          "Rua",
          "Número",
          "Complemento",
          "Bairro",
          "CEP",
          "Cidade",
          "Estado",
          "Pais",
          "Ações",
        ]}
        rows={rowsAddresses}
      />
      <Link href={`${person.id}/enderecos/adicionar`}>
        <Button onClick={() => {}} className="mt-2">
          Adicionar Endereço
        </Button>
      </Link>

      <h3 className="text-xl font-bold mt-6 mb-4">Telefones</h3>
      <PhonesTable
        headers={["Area", "Número", "Descrição", "Ações"]}
        rows={rowsPhones}
      />
      <Link href={`${person.id}/telefones/adicionar`}>
        <Button onClick={() => {}} className="mt-2">
          Adicionar Telefone
        </Button>
      </Link>
    </Layout>
  );
};

export default Cliente;
