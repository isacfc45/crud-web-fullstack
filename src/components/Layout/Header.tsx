import React from "react";
import Link from "next/link";
import Button from "../Button/Button";

const Header = () => (
  <header className="bg-blue-500 text-white py-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">Sistema de Gestão de Clientes</h1>
      <nav>
        <div>
          <Link href="/">
            <Button
              onClick={() => {}}
              className="bg-white text-black hover:text-white font-bold py-2 px-4 rounded me-4"
            >
              Home
            </Button>
          </Link>
          <Link href="/clientes">
            <Button
              onClick={() => {}}
              className="bg-white text-black hover:text-white font-bold py-2 px-4 rounded me-4"
            >
              Clientes
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
