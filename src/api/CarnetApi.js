import axios from "axios";
import { getEnvVariables } from '../helpers'

const { VITE_BASEURL } = getEnvVariables();

const CarnetApi = axios.create({
    baseURL: VITE_BASEURL
})

// Todo: Crear interceptor para enviar X-Api-Key

export default CarnetApi;
