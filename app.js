let username;
//const baseURL = 'https://psoft-ajude.herokuapp.com/'
const baseURL = 'http://localhost:8080/'
let $viewer = document.querySelector('#viewer');
let URL_BASE = '';
let campanhaSelecionada;

(async function main() {
  // roteamento
  let hash = location.hash;
  if (["", "#principalPagina"].includes(hash)) {
    viewPrincipal();
  }

}());

window.onhashchange = function () {

  let hash = window.location.hash;

  if (["#login"].includes(hash)){
    viewLogin();
  }
  else if (["#cadastraUsuario"].includes(hash)){
      viewCadastroUsuario();
  }
  else if (["#home"].includes(hash)) {
    viewHome();
  }
  else if (["#campanha"].includes(hash)) {
    viewPaginaCampanha();
  }
  else if(["cadastraCampanha"].includes(hash)) {
      viewCadastraCampanha();
  }

  URL_BASE + location.hash

}

function viewPrincipal() {

  window.location.hash = '';

  let $template = document.querySelector('#principalPagina');
  $viewer.innerHTML = $template.innerHTML;

  let $botaoLogar = document.querySelector("#logar");
  $botaoLogar.addEventListener('click', viewLogin);

  let $botaoIrCadastrarUsuario = document.querySelector("#irCadastrarUsuario");
  $botaoIrCadastrarUsuario.addEventListener('click', viewCadastroUsuario);

  let $botaoBuscarCampanhasSelecionadas = document.querySelector("#buscarCampanhasSelecionadas");
  $botaoBuscarCampanhasSelecionadas.addEventListener('click', buscarCampanhas);

}

function viewLogin() {

  window.location.hash = 'login';

    let $template = document.querySelector('#viewLogin');
    $viewer.innerHTML = $template.innerHTML;

    let $botaoLogar = document.querySelector("#logar");
    $botaoLogar.addEventListener('click', logar);

    let $botaoVoltarDoLogin = document.querySelector("#voltarDoLogin");
    $botaoVoltarDoLogin.addEventListener('click', viewPrincipal);

}

async function logar() {

     let email = document.querySelector("#email").value;
     let senha = document.querySelector("#senha").value;
     let resposta = await fetch(baseURL + 'auth/login', {
         'method': 'POST',
         'body': `{"email": "${email}",
                   "senha": "${senha}"}`,
         'headers': {'Content-Type': 'application/json'}
       })
      let json = await resposta.json();

      if (resposta.status == 200) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('emailUsuario', email);
        viewHome();
      }
      else {
        localStorage.removeItem('token');
        localStorage.removeItem('emailUsuario');
        alert(json.message);
      }
}

async function viewHome() {

  window.location.hash = 'home';

    let $template = document.querySelector('#viewHome');
    $viewer.innerHTML = $template.innerHTML;

    let resposta = await fetch(baseURL + 'usuario', {
      'method': 'GET',
      'headers': {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem("token")}
    })

    let json = await resposta.json();

    if (resposta.status == 200) {

      // captura de informacoes do usuario e preenchimento da tela
      let $informacoes = document.querySelector("#infoUsuario");
      $informacoes.innerHTML = '';

      let $h1 = document.createElement("h1");
      $informacoes.appendChild($h1);
      $h1.innerText = json.nome +" " + json.sobrenome + "!\n";

      let $botaoIrPerfilUsuario = document.querySelector('#irVerPerfil');
      $botaoIrPerfilUsuario.addEventListener('click', viewPerfilUsuario);

      let $botaoIrCadastrarCampanha = document.querySelector("#irCadastrarCampanha");
      $botaoIrCadastrarCampanha.addEventListener('click', viewCadastraCampanha);

      let $botaoBuscarCampanhasSelecionadas = document.querySelector("#buscarCampanhasSelecionadas");
      $botaoBuscarCampanhasSelecionadas.addEventListener('click', buscarCampanhas);

      let $botaoParaSairDoSistema = document.querySelector("#sairDoSistema");
      $botaoParaSairDoSistema.addEventListener('click', viewPrincipal);

      // preenchimento com informacoes da campanha
      let $informacoesCampanha = document.querySelector("#infosCampanhas");
      $informacoesCampanha.innerHTML = '';
    }
    else {
      alert(json.message);
    }
}

async function viewPerfilUsuario() {

  let $template = document.querySelector('#viewPerfilUsuario');
  $viewer.innerHTML = $template.innerHTML;

  let resposta = await fetch(baseURL + 'usuario', {
    'method': 'GET',
    'headers': {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")}
  })

  let json = await resposta.json();

  if (resposta.status == 200) {
    window.location.hash = 'perfil/' +  json.nome + "_" + json.sobrenome;
    let $nomeUsuario = document.querySelector('nomeUsuario');
    nomeUsuario.innerText = json.nome + " " + json.sobrenome;
    let $emailUsuario = document.querySelector('emailUsuario');
    emailUsuario.innerText = json.email;
  }
  else {
    alert(json);
  }

}

function viewCadastroUsuario () {

  window.location.hash = 'cadastraUsuario';

  let $template = document.querySelector('#viewCadastroUsuario');
  $viewer.innerHTML = $template.innerHTML;

  let $botaoCadastrar = document.querySelector("#criar");
  $botaoCadastrar.addEventListener('click', cadastrar_usuario);

  let $botaoVoltarDoCadastroUsuario = document.querySelector("#botaoVoltarDoCadastroUsuario");
  $botaoVoltarDoCadastroUsuario.addEventListener('click', viewPrincipal);
}

async function cadastrar_usuario() {
  let nome = document.querySelector("#nome").value;
  let sobrenome = document.querySelector("#sobrenome").value;
  let email = document.querySelector("#email").value;
  let numCartaoCredito = document.querySelector("#numCartaoCredito").value;
  let senha = document.querySelector("#senha").value;
  let resposta = await fetch(baseURL + 'usuario', {
    'method': 'POST',
    'body': `{"nome": "${nome}",
              "sobrenome": "${sobrenome}",
              "email": "${email}",
              "numCartaoCredito": "${numCartaoCredito}",
              "senha": "${senha}"}`,
    'headers': {'Content-Type': 'application/json'}
  })
  let json = await resposta.json();

  if (resposta.status == 201) {
    window.location.hash = 'viewLogin';
    viewLogin();
  }
  else {
    alert(json.message);
  }
}

function viewCadastraCampanha() {

  window.location.hash = 'cadastroCampanha';

  let $template = document.querySelector('#viewCadastraCampanha');
  $viewer.innerHTML = $template.innerHTML;

  let $botaoCadastrarCampanha = document.querySelector("#cadastrarCampanha");
  $botaoCadastrarCampanha.addEventListener('click', cadastrar_campanha);

  let $botaoVoltarDaCampanha = document.querySelector("#voltarDoCadastroCampanha");
  $botaoVoltarDaCampanha.addEventListener('click', viewHome);

}

async function cadastrar_campanha() {

  let nome = document.querySelector("#nome").value;
  let descricao = document.querySelector("#descricao").value;
  let deadline = document.querySelector("#deadline").value;
  let meta = document.querySelector("#meta").value;

  let transformaNomeCampanha = defineURLUnicaCampanha(nome);
  console.log("aqui esta o nome curto da campanha:" + transformaNomeCampanha);

  let resposta = await fetch(baseURL + 'campanha', {
    'method': 'POST',
    'body': `{"nome": "${nome}",
              "nomeCurto": "${transformaNomeCampanha}",
              "descricao": "${descricao}",
              "deadline": "${deadline}",
              "meta": "${meta}"}`,
    'headers': {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")}
  });

  let json = await resposta.json();

  if (resposta.status == 201) {
    console.log('Pronto! Campanha criada com sucesso!');
    window.location.hash = defineURLUnicaCampanha;
    viewHome();
  }
  else {
    alert(json.message);
  }
}

function defineURLUnicaCampanha (nomeCurto) {

  let URLCampanha = nomeCurto;
  console.log(URLCampanha);

  //1) todo caractere de pontuação será trocado por espaço
  URLCampanha = URLCampanha.replace(/['".:,;!?(){}<>_-]/g, ' ');
  console.log(URLCampanha);
  //2) todo caractere acentuado é trocado por equivalente sem acento
  URLCampanha = removeAcento(URLCampanha);
  console.log(URLCampanha);
  //3) todo caractere é colocado em minúscula
  URLCampanha = URLCampanha.toLowerCase();
  console.log(URLCampanha);
  //4) espaços repetidos são trocados por um único espaço
  URLCampanha = URLCampanha.replace(/\s{2,}/g, ' ');
  console.log(URLCampanha);
  //5) todo espaço será trocado por um hífen ("-")
  URLCampanha = URLCampanha.replace(/ /g, "-");

  return new String(URLCampanha);
}

function removeAcento (text) {
  text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
  text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
  text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
  text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
  text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
  text = text.replace(new RegExp('[Ç]','gi'), 'c');
  return text;
}

function viewPaginaCampanha() {

  window.location.hash = 'campanha';

  let $template = document.querySelector('#viewPaginaCampanha');
  $viewer.innerHTML = $template.innerHTML;

  let $buscarPorCampanhas = document.querySelector("#procurarCampanhas");
  $buscarPorCampanhas.addEventListener('click', buscarCampanhas);

  let $botaoPaginaCadastrarCampanha = document.querySelector("#paginaCadastrarCampanha");
  $botaoPaginaCadastrarCampanha.addEventListener('click', viewCadastraCampanha);

  let $botaoVoltarParaPrincipalTela = document.querySelector("#voltandoParaAPrincipal");
  $botaoVoltarParaPrincipalTela.addEventListener('click', viewHome);

}

async function buscarCampanhas() {

  let textoDaBusca = document.querySelector("#buscaCampanha").value;

  let resposta = await fetch(baseURL + 'campanha?nome=' + textoDaBusca, {
    'method': 'GET',
    'headers': {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")}
  });

  let json = await resposta.json();

  if (resposta.status == 200) {
    let campanhas = [];

    json.forEach((e, i) => {
      campanhas.push(json[i]);
      buscaQuantoFaltaMeta(json[i], i);
    });

    var quemFoiClicado = document.getElementById("resultado");

    quemFoiClicado.addEventListener("click", function(event) {
      let $botaoDaCampanhaQueFoiClicada = event.target; // este é o elemento clicado
      let numeroCampanha = $botaoDaCampanhaQueFoiClicada.id;
      campanhaSelecionada = campanhas[numeroCampanha];
      $botaoDaCampanhaQueFoiClicada.addEventListener('click', paginaCampanhaIndividual);
    })
  }
  else {
    alert(json.message);
  }
}

function buscaQuantoFaltaMeta(campanha, indice) {

  let faltaAinda;

  fetch(baseURL + 'campanha/' + campanha.id + '/quantoFalta', {
    'method': 'GET',
    'headers': {'Content-Type': 'application/json'}
  })
  .then(r => r.json())
  .then(d => {
      faltaAinda = d;
      console.log(d);
      console.log(faltaAinda);

      let $resultado = document.getElementById("resultado");
      $resultado.innerHTML = '';

      let $pCampanha = document.createElement("p");
      $resultado.appendChild($pCampanha);

      $pCampanha.innerText = "=====================================================================" + "\n" +
      "Nome: " + campanha.nome + "\n" +
      "Descricao: " + campanha.descricao + "\n" +
      "Dono: " + campanha.dono.email + "\n" +
      "Nome Curto: " + campanha.nomeCurto + "\n" +
      "Quanto falta: R$" + faltaAinda + "\n" +
      "=====================================================================";

      let $botaoCamp = document.createElement("button");
      $botaoCamp.innerHTML = 'Selecionar esta campanha';
      $resultado.appendChild($botaoCamp);
      $botaoCamp.id = indice;

  });

}

function paginaCampanhaIndividual() {

  window.location.hash = 'campanha/' + campanhaSelecionada.nomeCurto;

  let $template = document.querySelector('#viewAcessoCampanha');
  $viewer.innerHTML = $template.innerHTML;

  let nome = document.querySelector("#nome");
  nome.value = campanhaSelecionada.nome;
  let descricao = document.querySelector("#descricao");
  descricao.value = campanhaSelecionada.descricao;
  let deadline = document.querySelector("#deadline");
  deadline.value = campanhaSelecionada.deadline;
  let meta = document.querySelector("#meta");
  meta.value = campanhaSelecionada.meta;

  let $botaoDeRetorno = document.querySelector("#voltarDoAcessoCampanha");
  $botaoDeRetorno.addEventListener('click', viewPrincipal);

  let $botaoDeCurtida = document.querySelector("#curtidaCampanha");
  $botaoDeCurtida.addEventListener('click', curtir);

  let $botaoDeComentario = document.querySelector("#comentarioCampanha");
  $botaoDeComentario.addEventListener('click', comentar);

  let $comentariosCampanhaDiv = document.querySelector("#comentariosCampanha");
  $comentariosCampanhaDiv.innerHTML = '';

  listarComentarios($comentariosCampanhaDiv);

}

function curtir() {
  return null;
}

function comentar() {

  window.location.hash = '/campanha/' + campanhaSelecionada.nomeCurto + '/addComentario';

  let $template = document.querySelector('#viewDeComentario');
  $viewer.innerHTML = $template.innerHTML;

  let $tituloPagina = document.querySelector('#tituloPaginaComentario');
  $tituloPagina.innerText += " " + campanhaSelecionada.nome + " ?";

  let $botaoVoltarParaPaginaCampanha = document.querySelector('#voltarParaPaginaDaCampanha');
  $botaoVoltarParaPaginaCampanha.addEventListener('click', paginaCampanhaIndividual);

  let $botaoEnviarComentario = document.querySelector('#comentarCampanha');
  $botaoEnviarComentario.addEventListener('click', enviaComentario);

}

async function enviaComentario() {

  let comentarioCapturado = document.querySelector("#textoComentario").value;

  let resposta = await fetch(baseURL + 'campanha/' + campanhaSelecionada.id + '/comentar', {
    'method': 'POST',
    'body': `{"texto": "${comentarioCapturado}"}`,
    'headers': {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")}
  })

  let json = await resposta.json();

  if (resposta.status == 201) {
    console.log('Pronto! Comentario enviado com sucesso!');
    paginaCampanhaIndividual();
  }
  else {
    alert(json);
  }
}

async function listarComentarios(div) {
  let resposta = await fetch(baseURL + 'campanha/' + campanhaSelecionada.id + '/comentario/listar', {
    'method': 'GET',
    'headers': {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")}
  })

  let json = await resposta.json();

  if (resposta.status == 200) {
    let comentarios = [];

    json.forEach((e, i) => {
      comentarios.push(json[i]);

      let $pComentario = document.createElement("p");
      div.appendChild($pComentario);
      let quemComentou = json[i].quemComentou.nome + " " + json[i].quemComentou.sobrenome
      $pComentario.innerText = "=====================================================================" + "\n" +
      json[i].texto + "\n" + "(por " + quemComentou + ")" + "\n" +
      "=====================================================================";

    });
  }
  else {
    alert(json);
  }
}

async function listarCampanhasDoUsuario() {
  //let resposta = await fetch(baseURL + 'campanha/' + )
}

function atualizar() {
  return null;
}
