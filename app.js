let username;
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
  let $botaoIrCadastrarUsuario = document.querySelector("#irCadastrarUsuario");
  let $botaoIrCadastrarCampanha = document.querySelector("#irCadastrarCampanha");

  let $botaoBuscarCampanhasSelecionadas = document.querySelector("#buscarCampanhasSelecionadas");

  $botaoLogar.addEventListener('click', viewLogin);
  $botaoIrCadastrarUsuario.addEventListener('click', viewCadastroUsuario);
  $botaoIrCadastrarCampanha.addEventListener('click', viewCadastraCampanha);

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
      $h1.innerText = "Nome: " + json.nome + "\n" +
       "Sobrenome: " + json.sobrenome + "\n" +
       "E-mail: "+ json.email;

      let $botaoPaginaDeCampanha = document.querySelector("#paginaDeCampanha");

      $botaoPaginaDeCampanha.addEventListener('click', viewPaginaCampanha);

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
  $botaoVoltarDaCampanha.addEventListener('click', viewPrincipal);

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
    viewPaginaCampanha();
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
//Ajustar esse método por completo para pegar as campanhas.

  let textoDaBusca = document.querySelector("#buscaCampanha").value;

  let resposta = await fetch(baseURL + 'campanha?nome=' + textoDaBusca, {
    'method': 'GET',
    'headers': {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")}
  });

  let json = await resposta.json();
  console.log(json);
  let $resultado = document.getElementById("resultado");

  //if (resultado) {
    //console.log(resultado)
    //resultado.innerHTML = json;
 // }

  $resultado.innerHTML = '';

  let campanhas = [];

  json.forEach((e, i) => {

   campanhas.push(json[i]);

    let $pCampanha = document.createElement("p");
    $resultado.appendChild($pCampanha);

    $pCampanha.innerText = "=====================================================================" + "\n" +
    "Nome: " + json[i].nome + "\n" +
    "Descricao: " + json[i].descricao + "\n" +
    "Dono: " + json[i].dono.email + "\n" +
    "Nome Curto: " + json[i].nomeCurto + "\n" +
    "Meta:" + json[i].meta + "\n" +
    "=====================================================================";

    let $botaoCamp = document.createElement("button");
    $botaoCamp.innerHTML = 'Selecionar esta campanha';
    $resultado.appendChild($botaoCamp);
    $botaoCamp.id = i;

  });

  var quemFoiClicado = document.getElementById("resultado");

  quemFoiClicado.addEventListener("click", function(event) {
    let $botaoDaCampanhaQueFoiClicada = event.target; // este é o elemento clicado
    let numeroCampanha = $botaoDaCampanhaQueFoiClicada.id;
    campanhaSelecionada = campanhas[numeroCampanha];
    $botaoDaCampanhaQueFoiClicada.addEventListener('click', paginaCampanhaIndividual);  
  })

}

function paginaCampanhaIndividual() { 

  window.location.hash = 'campanha/' + campanhaSelecionada.nomeCurto;

  let $template = document.querySelector('#viewCampanhaIndividual');
  $viewer.innerHTML = $template.innerHTML;

  let $informacoesDaCampanha = document.querySelector("#infosCampanha");
  $informacoesDaCampanha.innerHTML = '';

  let $h1 = document.createElement("h1");
  $informacoesDaCampanha.appendChild($h1);
  $h1.innerText = "Nome da Campanha: " + campanhaSelecionada.nome + "\n" +
  "Descrição: " + campanhaSelecionada.descricao + "\n" +
  "O id da Campanha para fins de teste: " + campanhaSelecionada.id + "\n" +
  "A meta da Campanha é: "+ campanhaSelecionada.meta + "\n" +
  "O dono da campanha: " + campanhaSelecionada.dono.email; 

  let $h2 = document.createElement("h2");
  $informacoesDaCampanha.appendChild($h2);

  $h2.innerText = "O que já disseram sobre essa campanha?" + "\n" +
  "========"  + "\n" +
  campanhaSelecionada.comentarios  + "\n" +
  "========"; 

  let $botaoDeRetorno = document.querySelector("#voltarParaBuscaDeCampanha");
  $botaoDeRetorno.addEventListener('click', viewPaginaCampanha);

  let $botaoDeComentario = document.querySelector("#comentarioCampanha");
  $botaoDeComentario.addEventListener('click', comentar);

  let $botaoDeCurtida = document.querySelector("#curtidaCampanha");
  $botaoDeCurtida.addEventListener('click', curtir);

  let $botaoDeAtualizar = document.querySelector("#atualizaCampanha");
  $botaoDeAtualizar.addEventListener('click', curtir);

}

function paginaCampanhaAtualiza(campanha) {

  window.location.hash = 'campanha/' + campanha.nomeCurto + '/atualiza';

  let $template = document.querySelector('#viewAcessoCampanha');
  $viewer.innerHTML = $template.innerHTML;

  let nome = document.querySelector("#nome");
  nome.value = campanha.nome;
  let descricao = document.querySelector("#descricao");
  descricao.value = campanha.descricao;
  let deadline = document.querySelector("#deadline");
  deadline.value = campanha.deadline;
  let meta = document.querySelector("#meta");
  meta.value = campanha.meta;

  let $botaoDeRetorno = document.querySelector("#voltarDoAcessoCampanha");
  $botaoDeRetorno.addEventListener('click', viewHome);
}

function curtir() {
  return null; 
}

function comentar() {

  window.location.hash = '/campanha/' + campanhaSelecionada.nomeCurto + '/addComentario';

  let $template = document.querySelector('#viewDeComentario');
  $viewer.innerHTML = $template.innerHTML;

  let $botaoVoltarParaPaginaCampanha = document.querySelector('#voltarParaPaginaDaCampanha');
  $botaoVoltarParaPaginaCampanha.addEventListener('click', viewPaginaCampanha);

  let comentarioCapturado = document.querySelector("#textoComentario");

  let $botaoEnviarComentario = document.querySelector('#comentarCampanha');
  $botaoEnviarComentario.addEventListener('click', enviaComentario(comentarioCapturado.value));

}

async function enviaComentario(texto) {

  let resposta = await fetch(baseURL + 'comentario', {
    'method': 'POST',
    'body': `{"texto": "${texto}",
    "campanha": "${campanhaSelecionada}"`,
    'headers': {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")}
  });

 let json = await resposta.json();

 if (resposta.status == 200) {
  alert('Comentário enviado com sucesso!'); 
  viewPaginaCampanha();
  }

}

function atualizar() {
  return null;
}
