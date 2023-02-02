import * as Yup from 'yup';
export const ValidateCI = () => {
    return Yup.number()
        .typeError('Deben ser solo numeros')
        .required('Es requerido')
        .test('lengthMax', 'Maximo 8 numeros', (val: number | undefined) => {
            if (val) {
                return val.toString().length <= 8
            }
            return true;
        })
        .test('lengthMin', 'Minimo 7 numeros', (val: number | undefined) => {
            if (val) {
                return val.toString().length >= 7
            }
            return true;
        })
        .test('NoEspace', 'Datos invalidos', (val: number | undefined) => {
            if (!val) {
                return !val?.toString().includes(' ');
            }
            return true;
        })
}