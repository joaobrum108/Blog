import { enviarPDFs } from '../services/api'

export const enviarPDFs = async () => {
    return await enviarPDFs.post('/enviarPDFs');
}