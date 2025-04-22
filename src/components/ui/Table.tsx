import { Card } from "./Card";
import { Button, ButtonProps } from "./Button";
import { cn } from "../../lib/utils";
import { useMemo } from "react";

type ColumnDefinition<T> = {
  id: string;
  header: string | React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "left" | "center" | "right";
};

type Action<T> = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick: (row: T) => void;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  ariaLabel?: string;
};

interface TableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  actions?: Action<T>[];
  emptyState?: React.ReactNode;
  className?: string;
  cardProps?: React.ComponentProps<typeof Card>;
  rowClassName?: string | ((row: T) => string);
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  loadingText?: string;
}

export function Table<T>({
  data,
  columns,
  actions,
  emptyState,
  className,
  cardProps,
  rowClassName,
  onRowClick,
  isLoading = false,
  loadingText = "Carregando...",
}: TableProps<T>) {
  const defaultEmptyState = (
    <div className="py-12 text-center text-gray-400">
      Nenhum dado disponível
    </div>
  );

  const loadingState = (
    <div className="py-12 text-center text-gray-400">{loadingText}</div>
  );

  const headers = useMemo(
    () =>
      columns.map((column) => (
        <th
          key={`header-${column.id}`}
          className={cn(
            "p-3 font-medium text-yellow-400",
            column.align === "center" && "text-center",
            column.align === "right" && "text-right",
            column.headerClassName
          )}
        >
          {column.header}
        </th>
      )),
    [columns]
  );

  return (
    <Card
      {...cardProps}
      className={cn("overflow-hidden", cardProps?.className)}
    >
      <div className="overflow-x-auto">
        <table
          className={cn("w-full table-auto border-collapse", className)}
          aria-describedby="table-description"
        >
          <thead>
            <tr className="border-b border-gray-200">
              {headers}
              {actions && actions.length > 0 && (
                <th className="p-3 pr-7 text-end font-medium text-yellow-400">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)}>
                  {loadingState}
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className={cn(
                    "border-b border-gray-200 hover:bg-muted/30",
                    typeof rowClassName === "function"
                      ? rowClassName(row)
                      : rowClassName,
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={`cell-${rowIndex}-${column.id}`}
                      className={cn(
                        "p-3",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.className
                      )}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(row);
                            }}
                            aria-label={action.ariaLabel}
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
