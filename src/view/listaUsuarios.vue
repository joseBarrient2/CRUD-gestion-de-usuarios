<script setup>

import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import loader from '../components/loader.vue';
import ModalAgregarUser from '../components/modalAgregarUser.vue';
import modalEditar from '../components/modalEditar.vue'; 

const usuarios = ref([]);
const editarUser = ref([]);
const loading = ref(false);
const openmodal = ref(false);
const openEditar = ref(false);


const cargarUsuarios = async () => {
     loading.value = true;
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    usuarios.value = response.data.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone
    }));
    
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  cargarUsuarios()
});

const usuariosOrdenados = computed(() => {
  return [...usuarios.value].sort((a, b) => b.id - a.id)
})

//Cerrar modales
const modalCerrar = () => {
    openmodal.value = false;
   
}

const closeModalEditar = () => {
    openEditar.value = false;
}


// Funciones de acciones
const editarUsuario = (usuario) => {
  //console.log('Editar usuario:', usuario);
  editarUser.value = {...usuario};
   openEditar.value = true;
}

const borrarUsuario = (usuario) => {
  const confirmDelete = confirm(`¿Eliminar usuario ${usuario.name}?`)
  if (confirmDelete) {
    usuarios.value = usuarios.value.filter(user => user.id !== usuario.id)
  }
}

const agregarUsuarios = (nuevosUsuario) =>{
     const newId = usuarios.value.length > 0
      ? Math.max(...usuarios.value.map(u => u.id)) + 1
      : 1;

      const agregarId = {id: newId, ...nuevosUsuario}
      usuarios.value.push(agregarId);

      console.log('newUser:', agregarId);
}

const actualizarUsuario = (usuarioActualizado) => {
  const index = usuarios.value.findIndex(user => user.id === editarUser.value.id);
  if (index !== -1) {
    usuarios.value[index] = { id: editarUser.value.id, ...usuarioActualizado };
  }
};

</script>

<template>
  
  <div class="table-container">
    
    <section class="tituloArea">
           <h1>Lista de Usuarios</h1>
           <button type="button" class="btn_adduser" @click="openmodal = !openmodal">+</button> 
          
    </section>
    <el-table :data="usuariosOrdenados" border>
      <el-table-column prop="name" label="Nombre" />
      <el-table-column prop="username" label="Username" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="phone" label="Teléfono" />

      <!-- Columna de acciones -->
      <el-table-column label="Acciones" width="150">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="editarUsuario(scope.row)"
          >
            Editar
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="borrarUsuario(scope.row)"
          >
            Borrar
          </el-button>
        </template>
      </el-table-column>
    </el-table>
     <loader v-if="loading" />
  </div>
 
  <modal-agregar-user v-if="openmodal" :activo="openmodal"  @close="modalCerrar" @save="agregarUsuarios" />
  <modalEditar v-if="openEditar" @close="closeModalEditar" :user="editarUser" @save="actualizarUsuario" />
</template>

<style scoped>

.table-container {
  width: 70%;      
  margin: 0 auto; 
  margin-top: 20px;
}

.el-table th, .el-table td {
  padding: 10px 12px;
}
.el-table{
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn_adduser{
    position: absolute;
    width: 60px;
    height: 60px;
    border: none;
    display: flex;
    background: #2adaf6;
    font-size: 25px;
    justify-content: center;
    font-size:40px;
    align-items: center;
    border-radius: 50%;
    bottom: -30px;
    left: 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}
.btn_adduser:hover{
    background: #f6862a;
    color: #fff;
}


.tituloArea{
    position: relative;
    padding: 10px 20px;
    height: 150px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: rgb(114 5 199);
    color: #fff;
    margin-bottom: 40px;
}


/* Quitar hover en los encabezados */
::v-deep(.el-table__header th) {
  background-color: #1976d2 !important;
  color: white;               /* texto blanco */
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  padding: 15px 10px;
}

@media (max-width: 1200px) {
  .table-container {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
}

</style>

