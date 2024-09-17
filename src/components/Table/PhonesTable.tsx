import React from "react";

interface TableProps {
  headers: string[];
  rows: {
    id: number;
    number: string;
    area: string;
    description: string;
    acoes: React.JSX.Element;
  }[];
}

const PhonesTable = ({ headers, rows }: TableProps) => {
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
              <td className="border px-4 py-2">{row.area}</td>
              <td className="border px-4 py-2">{row.number}</td>
              <td className="border px-4 py-2">{row.description}</td>
              <td className="border px-4 py-2">{row.acoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhonesTable;
