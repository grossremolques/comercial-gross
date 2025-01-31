import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      fontSize: "0.95rem",
    },
  },
};
const options = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
} 
export default function TableComponent({columns, data, handleOnRowClick, conditionalRowStyles}) {
  return (
    <DataTable
      className="custom-element"
      columns={columns}
      data={data}
      customStyles={customStyles}
      pagination
      paginationPerPage={10}
      paginationComponentOptions={options}
      pointerOnHover
      highlightOnHover
      onRowClicked={handleOnRowClick}
      conditionalRowStyles={conditionalRowStyles}
    />
  );
}
