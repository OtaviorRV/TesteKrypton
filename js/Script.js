var carros;
var motores;
var carrosM = [];
var dados = [];

window.onload = function () {
  fetch("http://apiintranet.kryptonbpo.com.br/test-dev/exercise-1")
    .then((response) => response.json())
    .then((data) => {
      carros = data["carros"];
      motores = data["motores"];
      dados = listaCarro();

      dados.forEach((dado) => {
        MontarCard(dado);
      });
    })
    .catch((err) => console.log(err));
};

function listaMotor(id) {
  var motor;
  motores.forEach((value) => {
    if (value.id === id) motor = value;
  });
  return motor;
}

function listaCarro() {
  carros.forEach((carro) => {
    var motor = listaMotor(carro.motor_id);
    let aux = Object.assign({}, motor, carro);
    dados.push(aux);

    //MontarCard(aux);
  });
  return dados;
}
function NovoCarroListado() {
  //var formData = JSON.stringify()
  var x = document.getElementById("formCarro");

  let teste = {
    cilindros: document.getElementById("cilindros").value,
    cor: document.getElementById("cor").value,
    id: dados[dados.length - 1]?.id + 1 || 1,
    motor_id: dados[dados.length - 1]?.id + 1 || 1,
    litragem: document.getElementById("litragem").value,
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    observacao: document.getElementById("observacao").value,
    posicionamento_cilindros: document.getElementById(
      "posicionamento_cilindros",
    ).value,
  };
  MontarCard(teste);
  console.log(teste);
}
function ExcluiCarroListado(id) {
  let carrolistado = document.getElementById(id);
  carrolistado.remove();
  dados = dados.filter((dado) => dado.id != id);
}

function MontarCard(carroCompleto) {
  console.log(carroCompleto);
  let templateCard = `
    <div class="col-sm card" style="width: 18rem;" id="${carroCompleto.id}">
      <div class="card-body">
        <h5 class="card-title">Modelo: ${carroCompleto.modelo}</h5>
          <p class="card-text">Marca: ${carroCompleto.marca}</p>
          <p class="card-text">Modelo Motor: ${carroCompleto.motor_id}</p>
          <a class="btn btn-outline-dark" data-toggle="collapse" href="#collapse">Saiba Mais</a>
          <a class="btn btn-outline btn-danger" name="botao-excluir" onclick="ExcluiCarroListado(${carroCompleto.id})">Excluir</a>
      </div>  
      <div class="collapse values" id="collapse">
        <p>Posição dos Cilindros : ${carroCompleto.posicionamento_cilindros}</p>        
      </div>
    </div>   
 `;

  let card = new DOMParser().parseFromString(templateCard, "text/html");
  card = card.body.childNodes[0];

  document.getElementById("cartao").appendChild(card);
}
