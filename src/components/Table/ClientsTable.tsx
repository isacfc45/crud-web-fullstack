import React from "react";

interface TableProps {
  headers: string[];
  rows: {
    id: number;
    name: string;
    nickname: string;
    taxType: string;
    cpfCnpj: string;
    acoes: React.JSX.Element;
  }[];
}

const ClientsTable = ({ headers, rows }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b bg-black text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{row.id}</td>
              <td className="border px-4 py-2">{row.name}</td>
              <td className="border px-4 py-2">{row.nickname}</td>
              <td className="border px-4 py-2">{row.taxType}</td>
              <td className="border px-4 py-2">{row.cpfCnpj}</td>
              <td className="border px-4 py-2">{row.acoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;
