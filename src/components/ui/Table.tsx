import { Card } from "./Card";
import { Button, ButtonProps } from "./Button";
import { cn } from "../../lib/utils";

type ColumnDefinition<T> = {
  id: string;
  header: string | React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
};

type Action<T> = {
  icon: React.ComponentType<{ size?: number }>;
  onClick: (row: T) => void;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

interface TableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  actions?: Action<T>[];
  emptyState?: React.ReactNode;
  className?: string;
  cardProps?: React.ComponentProps<typeof Card>;
  rowClassName?: string | ((row: T) => string);
}

export function Table<T>({
  data,
  columns,
  actions,
  emptyState,
  className,
  cardProps,
  rowClassName,
}: TableProps<T>) {
  const defaultEmptyState = (
    <div className="py-12 text-center text-gray-400">
      Nenhum dado disponível
    </div>
  );

  return (
    <Card
      {...cardProps}
      className={cn("overflow-hidden", cardProps?.className)}
    >
      <div className="overflow-x-auto">
        <table className={cn("w-full table-auto border-collapse", className)}>
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={`header-${column.id}`}
                  className={cn(
                    "p-3 text-center font-medium text-yellow-400",
                    column.headerClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="p-3 pr-7 text-end font-medium text-yellow-400">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className={cn(
                    "border-b border-gray-200 hover:bg-muted/30",
                    typeof rowClassName === "function"
                      ? rowClassName(row)
                      : rowClassName
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={`cell-${rowIndex}-${column.id}`}
                      className={cn("p-3", column.className)}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        {actions.map((action, index) => (
                          <Button
                            key={`action-${rowIndex}-${index}`}
                            variant={action.variant || "outline"}
                            size={action.size || "icon"}
                            className={cn("size-8", action.className)}
                            onClick={() => action.onClick(row)}
                          >
                            <action.icon size={16} />
                          </Button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)}>
                  {emptyState || defaultEmptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
