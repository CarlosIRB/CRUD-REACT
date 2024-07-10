import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const PersonaTable = ({ personas, selectedPersona, onSelectionChange }) => {
  return (
    <DataTable value={personas} paginator={true} rows="4" selectionMode="single" selection={selectedPersona} onSelectionChange={onSelectionChange}>
      <Column field="id" header="ID"></Column>
      <Column field="nombre" header="Nombre"></Column>
      <Column field="apellido" header="Apellido"></Column>
      <Column field="direccion" header="Direccion"></Column>
      <Column field="telefono" header="Teléfono"></Column>
    </DataTable>
  );
};

export default PersonaTable;
