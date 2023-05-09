import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  COMENZAR_DESCARGA_EXITO,
  COMENZAR_DESCARGA_ERROR,
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      // Insertar en la API
      await clienteAxios.post('/productos', producto);
      // Si todo sale bien, actualizar el state
      dispatch(agregarProductoExito(producto));

      //Alerta
      Swal.fire('Correcto', 'EL producto se agregó correctamente', 'success');
    } catch (error) {
      console.log(error);
      // Si hay un error, cambiar el state
      dispatch(agregarProductoError(true));
      // Alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo',
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

// Si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

// Si hubo un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

// Descargar los productos de la base de datos

export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());
    try {
        const respuesta = await clienteAxios.get('/productos');
        dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
        dispatch(descargaProductosError())
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitosa = (productos) => ({
    type:   COMENZAR_DESCARGA_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: COMENZAR_DESCARGA_ERROR,
    payload: true
});
