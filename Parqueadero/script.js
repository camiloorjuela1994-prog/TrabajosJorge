function calcular() {

    let tipo = document.getElementById("tipo").value;
    let placa = document.getElementById("placa").value.toUpperCase();
    let ingreso = document.getElementById("ingreso").value;
    let salida = document.getElementById("salida").value;
    let dinero = Number(document.getElementById("pago").value);

    if(tipo === "" || placa === "" || ingreso === "" || salida === ""){
        alert("Complete todos los campos");
        return;
    }

    let fechaIngreso = new Date(ingreso);
    let fechaSalida = new Date(salida);

    if(fechaSalida <= fechaIngreso){
        alert("La fecha de salida debe ser mayor");
        return;
    }

    // Horario permitido 5 AM - 12 PM
    let horaIngreso = fechaIngreso.getHours();
    let horaSalida = fechaSalida.getHours();

    if(horaIngreso < 5 || horaIngreso > 12 ||
       horaSalida < 5 || horaSalida > 12){
        alert("Horario permitido: 5:00 AM a 12:00 PM");
        return;
    }

    let minutos =
    Math.ceil((fechaSalida - fechaIngreso) / (1000 * 60));

    let tarifa = 0;

    if(tipo === "Automovil"){
        tarifa = 125;
    }else{
        tarifa = 95;
    }

    let valor = minutos * tarifa;

    // Ajuste al múltiplo de 50 superior
    valor = Math.ceil(valor / 50) * 50;

    let descuento = 0;

    if(tipo === "Automovil"){

        let ultimoNumero =
        parseInt(placa.charAt(placa.length - 1));

        let dia = fechaIngreso.getDay();

        if(
            (dia === 1 && [1,2].includes(ultimoNumero)) ||
            (dia === 2 && [3,4].includes(ultimoNumero)) ||
            (dia === 3 && [5,6].includes(ultimoNumero)) ||
            (dia === 4 && [7,8].includes(ultimoNumero)) ||
            (dia === 5 && [9,0].includes(ultimoNumero))
        ){
            descuento = valor * 0.25;
        }
    }

    valor -= descuento;

    valor = Math.ceil(valor / 50) * 50;

    if(dinero < valor){
        alert("Dinero insuficiente");
        return;
    }

    let cambio = dinero - valor;

    let denominaciones = [
        100000,
        50000,
        20000,
        10000,
        5000,
        2000,
        1000,
        500,
        200,
        100,
        50
    ];

    let detalleCambio = "";

    for(let billete of denominaciones){

        let cantidad =
        Math.floor(cambio / billete);

        if(cantidad > 0){

            detalleCambio +=
            `${cantidad} de $${billete}<br>`;

            cambio %= billete;
        }
    }

    let horas = (minutos / 60).toFixed(2);

    document.getElementById("resultado").innerHTML = `
        <h2>Resultado</h2>

        Tipo: ${tipo}<br>
        Placa: ${placa}<br>
        Tiempo: ${minutos} minutos<br>
        Horas: ${horas}<br>
        Descuento: $${descuento.toLocaleString()}<br>
        Valor a pagar: $${valor.toLocaleString()}<br>

        <hr><br>

        <b>Cambio:</b><br>
        ${detalleCambio}
    `;

    // Registro JSON
    let registro = {
        fecha: new Date().toLocaleDateString(),
        tipoVehiculo: tipo,
        placa: placa,
        tiempoHoras: horas,
        valorPagar: valor
    };

    console.log(JSON.stringify(registro, null, 2));
}