<template>
  <div class="container-fluid">
    <h2 class="mb-3 mt-3 text-center">Gestión de tareas</h2>
    <div class="row g-4">
      <!-- FORMULARIO -->
      <div class="col-lg-4 col-md-5">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white text-center">
            <i class="bi bi-list-task"></i> Datos de la tarea
          </div>

          <div class="card-body">
            <form @submit.prevent="addTarea">
              <!-- FECHA -->
              <div class="mb-3">
                <div class="d-flex align-items-center w-75">
                  <label class="form-label me-3 mb-0">Fecha:</label>
                  <input
                    type="date"
                    class="form-control text-center"
                    v-model="tarea.fecha"
                  />
                </div>
              </div>

              <!-- tarea -->
              <div class="mb-3">
                <label class="form-label">Título</label>
                <input type="text" class="form-control" v-model="tarea.tarea" />
              </div>

              <!-- DESCRIPCION -->
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea
                  class="form-control"
                  rows="3"
                  v-model="tarea.descripcion"
                ></textarea>
              </div>

              <!-- ESTADO -->
              <div class="mb-3">
                <label class="form-label">Estado</label>
                <select class="form-select" v-model="tarea.estado">
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="finalizada">Finalizada</option>
                </select>
              </div>

              <!-- PRIORIDAD -->
              <div class="mb-3">
                <label class="form-label">Prioridad</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="baja"
                    v-model="tarea.prioridad"
                  />
                  <label class="form-check-label">Baja</label>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="media"
                    v-model="tarea.prioridad"
                  />
                  <label class="form-check-label">Media</label>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="alta"
                    v-model="tarea.prioridad"
                  />
                  <label class="form-check-label">Alta</label>
                </div>
              </div>

              <!-- EMPLEADO -->
              <div class="mb-3">
                <div class="input-group w-75 align-items-center">
                  <label class="form-label me-3 mb-0">Empleado ID: </label>
                  <input
                    type="number"
                    class="form-control text-center"
                    v-model="tarea.empleadoId"
                    :class="colorEmpleado"
                  />

                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="buscarEmpleado"
                  >
                    🔎
                  </button>
                </div>
              </div>

              <div class="text-center">
                <button class="btn btn-primary btn-sm">
                  {{ tarea.id ? "Actualizar" : "Grabar" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- LISTADO -->

      <div class="col-lg-8 col-md-7">
        <div class="card shadow-sm">
          <div
            class="card-header bg-secondary text-white d-flex justify-content-center"
          >
            <span><i class="bi bi-card-checklist"></i> Listado de tareas</span>
          </div>

          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Tarea</th>
                  <th>Empleado</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                  <th>Gestión</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="t in tareas" :key="t.id">
                  <td>{{ t.id }}</td>

                  <td>{{ t.fecha }}</td>

                  <td>{{ t.tarea }}</td>

                  <td>{{ nombreEmpleado(t.empleadoId) }}</td>

                  <td class="text-start">
                    <span class="badge" :class="colorEstado(t.estado)">
                      {{ t.estado }}
                    </span>
                  </td>

                  <td class="text-left">{{ t.prioridad }}</td>
                  <td>
                    <button class="btn btn-sm btn-warning me-2" @click="selTarea(t)">
                      <i class="bi bi-pen"></i>
                    </button>

                    <button class="btn btn-sm btn-danger" @click="delTarea(t.id)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref } from "vue";

const tareas = ref([]);

const empleados = ref([
  { id: 1, nombre: "Juan" },
  { id: 2, nombre: "Ana" },
  { id: 3, nombre: "Pedro" },
]);

const tarea = ref({
  id: null,
  fecha: "",
  tarea: "",
  descripcion: "",
  estado: "pendiente",
  prioridad: "media",
  empleadoId: "",
});

let contadorId = 1;

const colorEmpleado = ref("");

function buscarEmpleado() {
  const existe = empleados.value.find((e) => e.id == tarea.value.empleadoId);

  if (existe) {
    colorEmpleado.value = "bg-warning";
  } else {
    colorEmpleado.value = "bg-danger text-white";

    Swal.fire({
      icon: "error",
      title: "Empleado no encontrado",
    });

    tarea.value.empleadoId = "";
  }
}

function addTarea() {
  if (tarea.value.id) {
    // EDITAR
    const index = tareas.value.findIndex(t => t.id === tarea.value.id);

    if (index !== -1) {
      tareas.value[index] = { ...tarea.value };
    }
  } else {
    // CREAR
    const nueva = {
      ...tarea.value,
      id: contadorId++,
    };

    tareas.value.push(nueva);
  }

  // Limpiar formulario
  tarea.value = {
    id: null,
    fecha: "",
    tarea: "",
    descripcion: "",
    estado: "pendiente",
    prioridad: "media",
    empleadoId: "",
  };
}

function selTarea(t) {
  tarea.value = { ...t };
} 

function delTarea(id) {
  alertar("warning", "¿Desea eliminar esta tarea?", "").then((result) =>{
    if (result.isConfirmed) {
      tareas.value = tareas.value.filter((t) => t.id !== id);

    }
  });
}

function nombreEmpleado(id) {
  const emp = empleados.value.find((e) => e.id == id);

  return emp ? emp.nombre : "—";
}

function colorEstado(estado) {
  switch (estado) {
    case "pendiente":
      return "bg-danger";

    case "en_proceso":
      return "bg-warning text-dark";

    case "finalizada":
      return "bg-success";
  }
}

function alertar(tipo, titulo, texto) {
  return Swal.fire({
    icon: tipo,
    title: titulo,
    text: texto,
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  });
}
</script>
