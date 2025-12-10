import  { enviarPlanilha} from '../services/api'

export const enviarCsv = async () => {
    return await enviarPlanilha.post('/enviarCsv');
};