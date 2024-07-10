import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const PersonaForm = ({ visible, isEdit, persona, onHide, onSave, onEdit }) => {
  const [formData, setFormData] = React.useState(persona);

  React.useEffect(() => {
    setFormData(persona);
  }, [persona]);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const footer = (
    <div>
      <Button label={isEdit ? "Editar" : "Guardar"} icon="pi pi-check" onClick={() => (isEdit ? onEdit(formData) : onSave(formData))} />
    </div>
  );

  return (
    <Dialog header={isEdit ? "Editar persona" : "Crear persona"} visible={visible} style={{ width: '400px' }} footer={footer} modal={true} onHide={onHide}>
      <form id="persona-form">
        <span className="p-float-label">
          <InputText value={formData.nombre} style={{ width: '100%' }} id="nombre" onChange={(e) => handleChange(e, 'nombre')} />
          <label htmlFor="nombre">Nombre</label>
        </span>
        <br />
        <span className="p-float-label">
          <InputText value={formData.apellido} style={{ width: '100%' }} id="apellido" onChange={(e) => handleChange(e, 'apellido')} />
          <label htmlFor="apellido">Apellido</label>
        </span>
        <br />
        <span className="p-float-label">
          <InputText value={formData.direccion} style={{ width: '100%' }} id="direccion" onChange={(e) => handleChange(e, 'direccion')} />
          <label htmlFor="direccion">Dirección</label>
        </span>
        <br />
        <span className="p-float-label">
          <InputText value={formData.telefono} style={{ width: '100%' }} id="telefono" onChange={(e) => handleChange(e, 'telefono')} />
          <label htmlFor="telefono">Teléfono</label>
        </span>
      </form>
    </Dialog>
  );
};

export default PersonaForm;
