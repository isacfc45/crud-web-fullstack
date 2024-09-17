import React from "react";

interface TableProps {
  headers: string[];
  rows: {
    id: number;
    road: string;
    number: string;
    complement: string;
    neighborhood: string;
    cep: string;
    city: string;
    state: string;
    country: string;
    acoes: React.JSX.Element;
  }[];
}

const AddressTable = ({ headers, rows }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 border-b">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{row.road}</td>
              <td className="border px-4 py-2">{row.number}</td>
              <td className="border px-4 py-2">{row.complement}</td>
              <td className="border px-4 py-2">{row.neighborhood}</td>
              <td className="border px-4 py-2">{row.cep}</td>
              <td className="border px-4 py-2">{row.city}</td>
              <td className="border px-4 py-2">{row.state}</td>
              <td className="border px-4 py-2">{row.country}</td>
              <td className="border px-4 py-2">{row.acoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressTable;
