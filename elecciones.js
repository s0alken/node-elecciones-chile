
import axios from "axios";
import chalk from "chalk";

const url = 'https://www.servelelecciones.cl/data/elecciones_presidente/computo/global/19001.json';

const primeraVuelta = new Date('2021-11-21');
const segundaVuelta = new Date('2021-12-19');
const hoy = new Date();

axios(url).then(({ data }) => {

    const datos = data;

    //ordenando candidatos por cantidad de votos
    //atributo c es la cantidad de votos
    datos.data.sort((a, b) => Number(b.c.replace(/\./g, '')) - Number(a.c.replace(/\./g, '')));

    console.log();

    datos.data.forEach((candidato, index) => {

        const indice = index + 1;
        const nombre = candidato.a.substring(3, candidato.a.lenght);
        const votos = candidato.c;
        const porcentaje = candidato.d;
        const etiqueta = hoy >= primeraVuelta && hoy < segundaVuelta ? '(SEGUNDA VUELTA)' : '(PRESIDENTE ELECTO)';
        const clasificacion = candidato.f === '*' ? etiqueta : '';

        console.log(
            chalk.white(indice),
            chalk.white(nombre),
            chalk.green(`Votos: ${votos}`),
            chalk.yellow(`Porcentaje: ${porcentaje}`),
            chalk.red(clasificacion)
        );

    });

    console.log();

    //imprimiendo datos de interés
    datos.resumen.forEach(dato => console.log(chalk.cyan(`${dato.a}: ${dato.c} (${dato.d})`)));

    console.log();

    //otros datos de interés
    const totalMesas = datos.totalMesas;
    const mesasEscrutadas = datos.mesasEscrutadas;
    const mesasFaltantes = Number(totalMesas.replace(/\./g, '')) - Number(mesasEscrutadas.replace(/\./g, ''));
    const porcentajeMesasEscrutadas = parseFloat(datos.totalMesasPorcent.replace(',', '.'));
    const porcentajeMesasFaltantes = (100 - porcentajeMesasEscrutadas).toFixed(2).replace('.', ',');

    console.log(chalk.cyan(`Total mesas: ${datos.totalMesas}`));
    console.log(chalk.cyan(`Mesas escrutadas ${datos.mesasEscrutadas} (${datos.totalMesasPorcent})`));
    console.log(
        chalk.cyan(`Mesas faltantes: ${mesasFaltantes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`),
        chalk.cyan(`(${porcentajeMesasFaltantes}%)`)
    )

    const horas = hoy.getHours();
    const minutos = hoy.getMinutes();
    const segundos = hoy.getSeconds();
    
    console.log();

    console.log(chalk.cyan(`Última actualización: ${horas}:${minutos}:${segundos} hrs`));

})







