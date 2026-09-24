import { useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown, MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/shared/empty-state";
import { cn, vnDate } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  /** Value used for sorting and search. */
  value?: (row: T) => string | number;
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
};

export type RowAction<T> = {
  label: string;
  onSelect: (row: T) => void;
  destructive?: boolean;
};

export type TableFilter = {
  key: string;
  label: string;
  options: { label: string; value: string }[];
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  searchPlaceholder?: string;
  filters?: TableFilter[];
  /** Returns the filterable value of a row for a given filter key. */
  filterValue?: (row: T, key: string) => string | undefined;
  rowActions?: RowAction<T>[];
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  toolbar?: ReactNode;
};

function defaultValue<T>(row: T, column: Column<T>) {
  if (column.value) return column.value(row);
  const raw = (row as Record<string, unknown>)[column.key];
  return typeof raw === "number" ? raw : String(raw ?? "");
}

export function DataTable<T>({
  data,
  columns,
  rowKey,
  searchPlaceholder = "Tìm kiếm...",
  filters = [],
  filterValue,
  rowActions = [],
  pageSize = 8,
  emptyTitle = "Không có kết quả",
  emptyDescription = "Hãy thử thay đổi từ khóa hoặc bộ lọc.",
  toolbar,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    let result = [...data];

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter((row) =>
        columns.some((column) => String(defaultValue(row, column)).toLowerCase().includes(q)),
      );
    }

    for (const [key, value] of Object.entries(active)) {
      if (!value || value === "all") continue;
      result = result.filter((row) => filterValue?.(row, key) === value);
    }

    if (sort) {
      const column = columns.find((c) => c.key === sort.key);
      if (column) {
        result.sort((a, b) => {
          const av = defaultValue(a, column);
          const bv = defaultValue(b, column);
          const cmp =
            typeof av === "number" && typeof bv === "number"
              ? av - bv
              : String(av).localeCompare(String(bv));
          return sort.dir === "asc" ? cmp : -cmp;
        });
      }
    }

    return result;
  }, [data, columns, query, active, sort, filterValue]);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={searchPlaceholder}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={active[filter.key] ?? "all"}
              onValueChange={(value) => {
                setActive((prev) => ({ ...prev, [filter.key]: value }));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả {filter.label.toLowerCase()}</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          {toolbar}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr className="border-b border-border">
                {columns.map((column) => {
                  const isSorted = sort?.key === column.key;
                  return (
                    <th
                      key={column.key}
                      className={cn(
                        "px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase",
                        column.className,
                      )}
                    >
                      {column.sortable === false ? (
                        column.header
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                          onClick={() =>
                            setSort((prev) =>
                              prev?.key === column.key
                                ? { key: column.key, dir: prev.dir === "asc" ? "desc" : "asc" }
                                : { key: column.key, dir: "asc" },
                            )
                          }
                        >
                          {column.header}
                          {isSorted ? (
                            sort?.dir === "asc" ? (
                              <ArrowUp className="size-3" />
                            ) : (
                              <ArrowDown className="size-3" />
                            )
                          ) : (
                            <ChevronsUpDown className="size-3 opacity-50" />
                          )}
                        </button>
                      )}
                    </th>
                  );
                })}
                {rowActions.length > 0 ? <th className="w-12 px-4 py-3" /> : null}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr
                  key={rowKey(row)}
                  className="border-b border-border last:border-0 hover:bg-muted/40"
                >
                  {columns.map((column) => (
                    <td key={column.key} className={cn("px-4 py-3 align-middle", column.className)}>
                      {column.cell ? column.cell(row) : vnDate(String(defaultValue(row, column)))}
                    </td>
                  ))}
                  {rowActions.length > 0 ? (
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Thao tác</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {rowActions.map((action) => (
                            <DropdownMenuItem
                              key={action.label}
                              onSelect={() => action.onSelect(row)}
                              className={action.destructive ? "text-destructive" : undefined}
                            >
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pageRows.length === 0 ? (
          <div className="border-t border-border p-4">
            <EmptyState title={emptyTitle} description={emptyDescription} />
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {rows.length === 0
            ? "0 bản ghi"
            : `Hiển thị ${(currentPage - 1) * pageSize + 1}–${Math.min(
                currentPage * pageSize,
                rows.length,
              )} trên ${rows.length}`}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Trước
          </Button>
          <span className="text-xs text-muted-foreground">
            Trang {currentPage}/{totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
