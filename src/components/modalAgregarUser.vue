<script setup>
    import { ref } from 'vue';
    import loader from '../components/loader.vue';

const formRef = ref(null)
const loading = ref(false);


const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    },
    activo:{
        type: Boolean,
    }  
})

const emit = defineEmits(['close','save']);

const ocultarModal = () =>{
   
    emit('close', false);
}

const form = ref({
  name: '',
  username: '',
  email: '',
  phone: ''
})

const rules = {
  name: [{ required: true, message: 'Nombre requerido', trigger: 'blur' }],
  username: [{ required: true, message: 'Username requerido', trigger: 'blur' }],
  email: [
    { required: true, message: 'Email requerido', trigger: 'blur' },
    { type: 'email', message: 'Email inválido', trigger: 'blur' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email no válido', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: 'Teléfono requerido', trigger: 'blur' },
    { pattern: /^(\d{6}$|^\d{9})$/, message: 'Teléfono debe tener 6 o 9 dígitos', trigger: 'blur' }
]
}

const submitForm = () => {
   
  formRef.value.validate((valid) => {
    if (!valid) return
    
    loading.value = true;

    setTimeout(() => {
      emit('save', {...form.value}); 
      loading.value = false; 
      emit('close', false);
    }, 1000);
    
    
  })
}

</script>
<template>
<Transition name="agregarModal">
  <section v-show="activo" class="conten-overlay" @click="ocultarModal">
    <section class="box-modal" @click.stop>
        <h2>Agregar Usuario</h2>    
        <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="top"
        >
        <el-form-item label="Nombre" prop="name">
            <el-input v-model="form.name" placeholder="Pedro Diaz campos" />
        </el-form-item>

        <el-form-item label="Username" prop="username">
            <el-input v-model="form.username" placeholder="Nickname" />
        </el-form-item>

        <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="email@dominio.com" />
        </el-form-item>

        <el-form-item label="Teléfono" prop="phone">
            <el-input v-model="form.phone" placeholder="999545855" />
        </el-form-item>

        <el-form-item class="btnform">
            <el-button type="primary" class="btnSubmit" @click="submitForm" :disabled="loading">
            Agregar
            </el-button>
            <el-button class="btncerrar" @click="ocultarModal">
            Cancelar
            </el-button>
        </el-form-item>
        </el-form>
        <article class="xclose" @click="ocultarModal">x</article>
        <loader v-if="loading" />
    </section>
 </section>
 </Transition>
</template>
<style scoped>
.box-modal h2{text-align: center; padding: 25px 0; font-family: Arial, Helvetica, sans-serif;}
.conten-overlay{width: 100%; 
    height: 100vh; 
    position: fixed; 
    top: 0; 
    left: 0; 
    background: rgba(0, 0, 0, 0.5); 
    display: flex; 
    justify-content: center; 
    align-items: center;
    z-index: 1000;
}

.box-modal{
    min-width: 390px;
    background: #fff;
    border-radius: 10px;
    padding: 0px 50px 50px;
    position: relative;
}
.el-form-item .label{
    font-size: 22px!important;
    color: red;
}

.xclose{
    position: absolute; 
    top: 10px; 
    right: 20px; 
    font-size: 20px; 
    cursor: pointer;
    width: 30px;
    height: 30px;   
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
    justify-content: center;
    align-items: center;    
}
.btnSubmit,.btncerrar{
    width: 120px;
    padding: 6px 0;
   text-align: center;
    font-size: 18px;
}
.btnform{
    padding-top:20px;
    display: flex;
    justify-content: center;
}

.agregarModal-enter-active, 
.agregarModal-leave-active {
  transition: all 0.2s ease-in-out;
}
.agregarModal-enter-from, 
.agregarModal-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .btnSubmit,.btncerrar{
    width: 100%;
    padding: 13px 0;
    height: auto;
}
   .btnSubmit{
    margin-bottom: 10px;
   }
   .btncerrar{margin: 0!important;}
}


</style>
