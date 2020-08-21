import  '../css/componentes.css';

export const saludar = ( nombre) => {
    console.log('Creando etiqueta H1');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola ${nombre} como estas`;
    document.body.append(h1);
}

export const saluda =( nombre )=>{
    const h2 = document.createElement('h2');
    h2.innerText = `Que tal ${nombre}, que haces`;
    document.body.append(h2);
}