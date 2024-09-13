"use client";

import React from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button/Button";

const Home = () => (
  <Layout>
    <h2 className="text-2xl font-bold mb-4">
      Bem-vindo ao Sistema de Gestão de Clientes
    </h2>
    <Button onClick={() => {}}>
      <Link href="/clientes">Clientes</Link>
    </Button>
  </Layout>
);

export default Home;
