import React, { useState } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  Column,
} from 'react-table'
import { mockData, type MockDataType } from '../data/mockData'

// ✅ GlobalFilter component for filtering rows
const GlobalFilter = ({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string
  setGlobalFilter: (filterValue: string) => void
}) => {
  return (
    <input
      className="mb-4 p-2 border rounded w-full"
      placeholder="Search..."
      value={globalFilter || ''}
      onChange={(e) => setGlobalFilter(e.target.value)}
    />
  )
}

const Spreadsheet = () => {
  const [tableData, setTableData] = useState<MockDataType[]>(mockData)
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number
    columnId: string
  } | null>(null)

  const columns = React.useMemo<Column<MockDataType>[]>(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Score', accessor: 'score' },
  ], [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable<MockDataType>(
    { columns, data: tableData },
    useGlobalFilter,
    useSortBy
  )

  const handleCellEdit = (
    rowIndex: number,
    columnId: string,
    value: string
  ) => {
    const updated = [...tableData]
    updated[rowIndex] = {
      ...updated[rowIndex],
      [columnId]: value,
    }
    setTableData(updated)
    setEditingCell(null)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Spreadsheet</h2>

      {/* 🔍 Filter Input */}
      <GlobalFilter
        globalFilter={globalFilter as string}
        setGlobalFilter={setGlobalFilter}
      />

      <table
        {...getTableProps()}
        className="table-auto w-full border border-gray-300"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border px-4 py-2 text-left font-medium cursor-pointer"
                >
                  {column.render('Header')}
                  <span className="ml-1">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr key={row.id} {...row.getRowProps()} className="hover:bg-gray-50">
                {row.cells.map((cell) => {
                  const isEditing =
                    editingCell?.rowIndex === row.index &&
                    editingCell?.columnId === cell.column.id

                  return (
                    <td
                      key={cell.column.id}
                      {...cell.getCellProps()}
                      className="border px-4 py-2"
                      onClick={() =>
                        setEditingCell({
                          rowIndex: row.index,
                          columnId: cell.column.id,
                        })
                      }
                    >
                      {isEditing ? (
                        <input
                          className="w-full border rounded px-2 py-1"
                          defaultValue={cell.value as string}
                          autoFocus
                          onBlur={(e) =>
                            handleCellEdit(
                              row.index,
                              cell.column.id,
                              e.target.value
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleCellEdit(
                                row.index,
                                cell.column.id,
                                (e.target as HTMLInputElement).value
                              )
                            }
                          }}
                        />
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Spreadsheet
