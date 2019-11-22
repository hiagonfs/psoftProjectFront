let username;
const baseURL = 'http://localhost:8080/'
let $viewer = document.querySelector('#viewer');

(async function main() {
    // roteamento
    let hash = location.hash;
    if (["", "#principalPagina"].includes(hash)) {
      viewPrincipal();
    }
    else if (["#viewLogin"].includes(hash)){
      viewLogin();
    }
    else if (["#viewCadastroUsuario"].includes(hash)){
        viewCadastroUsuario();
    }
    else if (["#viewHome"].includes(hash)) {
      viewHome();
    }
    else if (["#viewPaginaCampanha"].includes(hash)) {
      viewPaginaCampanha();
    }
    else if (["#viewAlteracaoCadastro"].includes(hash)) {
      viewAlteracaoCadastro();
    }
    else if(["viewCadastraCampanha"].includes(hash)) {
        viewCadastraCampanha();
    }
  }());

function viewPrincipal() {

  let $template = document.querySelector('#principalPagina');
  $viewer.innerHTML = $template.innerHTML;

  let $botaoLogar = document.querySelector("#logar");
  let $botaoCadastrar = document.querySelector("#cadastrar");

  let $botaoBuscarCampanhasSelecionadas = document.querySelector("#buscarCampanhasSelecionadas");
  
  $botaoLogar.addEventListener('click', viewLogin);
  $botaoCadastrar.addEventListener('click', viewCadastroUsuario);

  $botaoBuscarCampanhasSelecionadas.addEventListener('click', buscarCampanhas);

}

function viewLogin() {

    let $template = document.querySelector('#viewLogin');
    $viewer.innerHTML = $template.innerHTML;

    let $botaoLogar = document.querySelector("#logar");

    let $botaoVoltarLogar = document.querySelector("#voltarLogar");
    
    $botaoLogar.addEventListener('click', logar);

    $botaoVoltarLogar.addEventListener('click', viewPrincipal);
  
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

    let $template = document.querySelector('#viewHome');
    $viewer.innerHTML = $template.innerHTML;

    let resposta = await fetch(baseURL + 'usuario', {
      'method': 'GET',
      'headers': {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem("token")}
    })

    let json = await resposta.json();

    if (resposta.status == 200) {
      let $informacoes = document.querySelector("#infoUsuario");
      $informacoes.innerHTML = '';

      let $h1 = document.createElement("h1");
      $informacoes.appendChild($h1);
      $h1.innerText = json.nome + " " + json.sobrenome + "!";

      let $botaoAlterarInformacoes = document.querySelector("#alterarInfos");
      let $botaoPaginaDeCampanha = document.querySelector("#paginaDeCampanha");

      $botaoAlterarInformacoes.addEventListener('click', viewAlteracaoCadastro);
      $botaoPaginaDeCampanha.addEventListener('click', viewPaginaCampanha);
    }
    else {
      alert(json.message);
    }
}

function viewCadastroUsuario () {
  let $template = document.querySelector('#viewCadastroUsuario');
  $viewer.innerHTML = $template.innerHTML;

  let $botaoCadastrar = document.querySelector("#criar");
  let $botaoVoltarLogin = document.querySelector("#voltarLogin");
  $botaoCadastrar.addEventListener('click', cadastrar_usuario);
  $botaoVoltarLogin.addEventListener('click', viewLogin);
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
    viewHome();
  }
  else {
    alert(json.message);
  }
}

function viewCadastraCampanha() {
  let $template = document.querySelector('#viewCadastraCampanha');
  $viewer.innerHTML = $template.innerHTML;

  let $botaoCadastrarCampanha = document.querySelector("#cadastrarCampanha");
  $botaoCadastrarCampanha.addEventListener('click', cadastrar_campanha);
}

async function cadastrar_campanha() {
  let nome = document.querySelector("#nome").value;
  let descricao = document.querySelector("#descricao").value;
  let deadline = document.querySelector("#deadline").value;
  let meta = document.querySelector("#meta").value;

  let URLCampanha = defineURLUnicaCampanha(nome);
  console.log(URLCampanha);

  let resposta = await fetch(baseURL + 'campanha', {
    'method': 'POST',
    'body': `{"nome": "${nome}",
              "nomeCurto": "${URLCampanha}",
              "descricao": "${descricao}",
              "deadline": "${deadline}",
              "meta": "${meta}"}`,
    'headers': {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")}
  });

  let json = await resposta.json();

  if (resposta.status == 201) {
    console.log('Pronto! Campanha criada com sucesso!');
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

  return URLCampanha;
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

  let $template = document.querySelector('#viewPaginaCampanha');
  $viewer.innerHTML = $template.innerHTML;

  let $buscarPorCampanhas = document.querySelector("#procurarCampanhas");
  $buscarPorCampanhas.addEventListener('click', buscarCampanhas);

  let $botaoPaginaCadastrarCampanha = document.querySelector("#paginaCadastrarCampanha");
  $botaoPaginaCadastrarCampanha.addEventListener('click', viewCadastraCampanha);

}

async function buscarCampanhas() {
//Ajustar esse método por completo para pegar as campanhas.

  let textoDaBusca = document.querySelector("#textoParaBusca").value;

  let resposta = await fetch(baseURL + 'campanha?nome=' + textoDaBusca, {
    'method': 'GET',
    'headers': {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")}
  });

  let json = await resposta.json();
  console.log(json);
  let resultado = document.getElementById("resultado");
  if (resultado) {
    console.log(resultado)
      resultado.innerHTML = json;
  }
}
