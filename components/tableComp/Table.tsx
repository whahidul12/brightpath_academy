const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="mt-4 w-full">
      <thead>
        <tr className="text-card-foreground bg-[oklch(from_var(--primary)_l_c_h/0.05)] text-left text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={`${col.className} py-4`}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
