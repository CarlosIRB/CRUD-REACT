import React, { Component } from "react";
import "./App.css";
import { PersonaService } from "../service/PersonaService";
import { Menubar } from "primereact/menubar";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import PersonaTable from "./PersonaTable";
import PersonaForm from "./PersonaForm";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      persona: {
        id: null,
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
      },
      selectedPersona: null,
      personas: [],
      isEdit: false,
    };

    this.personaService = new PersonaService();
    this.save = this.save.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.updateMenuItems = this.updateMenuItems.bind(this);

    this.toast = React.createRef();
  }

  componentDidMount() {
    this.personaService
      .getAll()
      .then((data) => this.setState({ personas: data }));
  }

  save(persona) {
    this.personaService.save(persona).then(() => {
      this.setState({
        visible: false,
        persona: {
          id: null,
          nombre: "",
          apellido: "",
          direccion: "",
          telefono: "",
        },
      });
      this.toast.current.show({
        severity: "success",
        summary: "Guardar",
        detail: "Se guardó el registro correctamente.",
      });
      this.personaService
        .getAll()
        .then((data) => this.setState({ personas: data }));
    });
  }

  edit(persona) {
    this.personaService.edit(persona.id, persona).then(() => {
      this.setState({
        visible: false,
        persona: {
          id: null,
          nombre: "",
          apellido: "",
          direccion: "",
          telefono: "",
        },
      });
      this.toast.current.show({
        severity: "infro",
        summary: "Actualizar",
        detail: "Se actualizó el registro correctamente.",
      });

      this.personaService
        .getAll()
        .then((data) => this.setState({ personas: data }));

      this.setState({ selectedPersona: null });
    });
  }

  delete() {
    confirmDialog({
      message: "¿Realmente desea eliminar el registro?",
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.personaService.delete(this.state.selectedPersona.id).then(() => {
          this.toast.current.show({
            severity: "info",
            summary: "Eliminar",
            detail: "Se eliminó el registro correctamente.",
          });
          this.personaService
            .getAll()
            .then((data) => this.setState({ personas: data }));
          this.setState({ selectedPersona: null });
        });
      },
      reject: () => {
        this.toast.current.show({
          severity: "warning",
          summary: "Cancelar",
          detail: "Se canceló la eliminación",
        });
        this.setState({ selectedPersona: null });
      },
    });
  }

  updateMenuItems() {
    return [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.setState({
            visible: true,
            persona: {
              id: null,
              nombre: "",
              apellido: "",
              direccion: "",
              telefono: "",
            },
            isEdit: false,
          });
        },
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          this.setState({
            visible: true,
            isEdit: true,
            persona: this.state.selectedPersona,
          });
        },
        disabled: !this.state.selectedPersona,
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: this.delete,
        disabled: !this.state.selectedPersona,
      },
    ];
  }

  render() {
    return (
      <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <Menubar model={this.updateMenuItems()} />
        <br />
        <Panel header="React CRUD App">
          <PersonaTable
            personas={this.state.personas}
            selectedPersona={this.state.selectedPersona}
            onSelectionChange={(e) =>
              this.setState({ selectedPersona: e.value })
            }
          />
        </Panel>
        <PersonaForm
          visible={this.state.visible}
          persona={this.state.persona}
          isEdit={this.state.isEdit}
          onHide={() => this.setState({ visible: false })}
          onSave={this.save}
          onEdit={this.edit}
        />
        <Toast ref={this.toast} />
        <ConfirmDialog />
      </div>
    );
  }
}

export default App;
