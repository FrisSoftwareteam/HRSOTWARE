"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  searchable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  pageSize?: number;
  searchPlaceholder?: string;
  className?: string;
}

export function DataTableResultLogs<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 6,
  searchPlaceholder = "Search...",
  className,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<{
    column: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState<
    Record<string, boolean>
  >(columns?.reduce((acc, col) => ({ ...acc, [col.id]: true }), {}));
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const [currentPage, setCurrentPage] = React.useState(0);

  // Filter data based on global search
  const filteredData = React.useMemo(() => {
    if (!globalFilter) return data;

    return data.filter((row) =>
      columns.some((column: any) => {
        if (!column.searchable) return false;
        const value = column.id ? row[column.id] : "";
        return String(value).toLowerCase().includes(globalFilter.toLowerCase());
      })
    );
  }, [data, globalFilter, columns]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sorting) return filteredData;

    return [...filteredData].sort((a, b) => {
      const column = columns.find((col) => col.id === sorting.column);
      if (!column?.id) return 0;

      const aValue = a[column.id];
      const bValue = b[column.id];

      if (aValue < bValue) return sorting.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sorting.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sorting, columns]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    const startIndex = currentPage * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const visibleColumns = columns.filter((col) => columnVisibility[col.id]);

  const handleSort = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column?.sortable) return;

    setSorting((current) => {
      if (current?.column === columnId) {
        return current.direction === "asc"
          ? { column: columnId, direction: "desc" }
          : null;
      }
      return { column: columnId, direction: "asc" };
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelection: Record<string, boolean> = {};
      paginatedData.forEach((_, index) => {
        newSelection[index.toString()] = true;
      });
      setRowSelection(newSelection);
    } else {
      setRowSelection({});
    }
  };

  const handleRowSelect = (index: number, checked: boolean) => {
    setRowSelection((prev) => ({
      ...prev,
      [index.toString()]: checked,
    }));
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((_, index) => rowSelection[index.toString()]);
  const isSomeSelected = paginatedData.some(
    (_, index) => rowSelection[index.toString()]
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-1">
        <div className="flex items-center gap-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 w-[280px] h-10 border-2 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-10 border-2 hover:border-primary/50 transition-colors bg-transparent">
              <EyeIcon className="h-4 w-4 mr-2" />
              View Columns
              <ChevronDownIcon className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={columnVisibility[column.id]}
                onCheckedChange={(value) =>
                  setColumnVisibility((prev) => ({
                    ...prev,
                    [column.id]: !!value,
                  }))
                }>
                {column.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-xl border-2 border-border/50 overflow-hidden shadow-sm bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/50 border-b-2">
                <TableHead className="w-[50px] pl-6">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className="translate-y-[2px] border-2"
                  />
                </TableHead>
                {visibleColumns.map((column) => (
                  <TableHead
                    key={column.id}
                    className="font-semibold text-foreground/90">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{column.header}</span>
                      {column.sortable && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-primary/10 transition-colors"
                          onClick={() => handleSort(column.id)}>
                          {sorting?.column === column.id ? (
                            sorting.direction === "asc" ? (
                              <ChevronUpIcon className="h-4 w-4 text-primary" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4 text-primary" />
                            )
                          ) : (
                            <ChevronUpIcon className="h-4 w-4 opacity-40 hover:opacity-70 transition-opacity" />
                          )}
                        </Button>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length ? (
                paginatedData.map((row, index) => (
                  <TableRow
                    key={index}
                    data-state={rowSelection[index.toString()] && "selected"}
                    className="hover:bg-muted/20 transition-colors border-b border-border/30">
                    <TableCell className="pl-6">
                      <Checkbox
                        checked={!!rowSelection[index.toString()]}
                        onCheckedChange={(checked) =>
                          handleRowSelect(index, !!checked)
                        }
                        aria-label={`Select row ${index + 1}`}
                        className="translate-y-[2px] border-2"
                      />
                    </TableCell>
                    {visibleColumns.map((column) => (
                      <TableCell key={column.id} className="py-4">
                        {column.cell
                          ? column.cell(row)
                          : column.accessorKey
                          ? String(row[column.accessorKey] ?? "")
                          : ""}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length + 1}
                    className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <SearchIcon className="h-8 w-8 opacity-50" />
                      <p className="text-sm">No results found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex items-center space-x-3">
          <p className="text-sm font-medium text-muted-foreground">
            Rows per page
          </p>
          <select
            value={pageSize}
            onChange={(e) => {
              setCurrentPage(0);
              // Note: pageSize is a prop, so this would need to be handled by parent
            }}
            className="h-9 w-[70px] rounded-md border-2 border-input bg-background px-3 text-sm focus:border-primary/50 transition-colors">
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[120px] items-center justify-center text-sm font-medium text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-9 w-9 p-0 lg:flex border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors bg-transparent"
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}>
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-9 w-9 p-0 border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors bg-transparent"
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}>
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-9 w-9 p-0 border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors bg-transparent"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
              }
              disabled={currentPage >= totalPages - 1}>
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-9 w-9 p-0 lg:flex border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors bg-transparent"
              onClick={() => setCurrentPage(totalPages - 1)}
              disabled={currentPage >= totalPages - 1}>
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
