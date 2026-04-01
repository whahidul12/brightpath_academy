// 1. Update your Table component
interface TableProps<T> {
  columns: { header: string; accessor: string; className?: string }[];
  data: T[];
  renderRow: (item: T) => React.ReactNode; // Add this!
}

export default function Table<T extends { id: string | number }>({
  columns,
  data,
  renderRow, // Receive it here
}: TableProps<T>) {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-muted-foreground bg-[oklch(from_var(--primary)_l_c_h/0.2)] text-left text-sm">
          {columns.map((column) => (
            <th key={column.accessor} className={`${column.className} p-4`}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Call the function here instead of hardcoding TableRow */}
        {data.map((item) => renderRow(item))}
      </tbody>
    </table>
  );
}
