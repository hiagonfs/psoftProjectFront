let username;
const baseURL = 'http://localhost:8080/'
let $viewer = document.querySelector('#viewer');

(async function main() {
    // roteamento
    let hash = location.hash;
    if (["", "#viewLogin"].includes(hash)) {
      viewLogin();
    }
    else if (["#viewCadastroUsuario"].includes(hash)){
        viewCadastroUsuario();
    }
    else if (["#viewHome"].includes(hash)) {
      viewHome();
    }
    else if(["viewCadastraCampanha"].includes(hash)) {
        viewCadastraCampanha();
    }
  }());

function viewLogin() {
    let $template = document.querySelector('#viewLogin');
    $viewer.innerHTML = $template.innerHTML;

    let $botaoLogar = document.querySelector("#logar");
    let $botaoCadastrar = document.querySelector("#cadastrar");

    $botaoLogar.addEventListener('click', logar);
    $botaoCadastrar.addEventListener('click', viewCadastroUsuario);
}

function logar() {
     let email = document.querySelector("#email").value;
     let senha = document.querySelector("#senha").value;

     fetch(baseURL + 'auth/login', {
         'method': 'POST',
         'body': `{"email": "${email}",
                   "senha": "${senha}"}`,
         'headers': {'Content-Type': 'application/json'}
       })
       .then(r => r.json())
       .then(u => {
           console.log(u);
           console.log('Pronto! Logando no sistema!');
           viewCadastraCampanha();
       });
}

function viewHome() {
    let $template = document.querySelector('#viewHome');
    $viewer.innerHTML = $template.innerHTML;
}

function viewCadastroUsuario () {
    let $template = document.querySelector('#viewCadastroUsuario');
    $viewer.innerHTML = $template.innerHTML;

    let $botaoCadastrar = document.querySelector("#criar");
    $botaoCadastrar.addEventListener('click', cadastrar_usuario);
}

function cadastrar_usuario() {
  let nome = document.querySelector("#nome").value;
  let sobrenome = document.querySelector("#sobrenome").value;
  let email = document.querySelector("#email").value;
  let numCartaoCredito = document.querySelector("#numCartaoCredito").value;
  let senha = document.querySelector("#senha").value;

  fetch(baseURL + 'usuarios', {
    'method': 'POST',
    'body': `{"nome": "${nome}",
              "sobrenome": "${sobrenome}",
              "email": "${email}",
              "numCartaoCredito": "${numCartaoCredito}",
              "senha": "${senha}"}`,
    'headers': {'Content-Type': 'application/json'}
  })
  .then(r => r.json())
  .then(u => {
      console.log(u);
      console.log('Pronto! Usuario cadastrado no sistema!');
      viewHome();
  });
}

function viewCadastraCampanha() {
    let $template = document.querySelector('#viewCadastraCampanha');
    $viewer.innerHTML = $template.innerHTML;

    let $botaoCadastrarCampanha = document.querySelector("#cadastrarCampanha");
    $botaoCadastrarCampanha.addEventListener('click', cadastrar_campanha);
}

function cadastrar_campanha() {
  let nome = document.querySelector("#nome").value;
  let nomeCurto = document.querySelector("#nomeCurto").value;
  let descricao = document.querySelector("#descricao").value;
  let deadline = document.querySelector("#deadline").value;
  let meta = document.querySelector("#meta").value;

  let URLCampanha = defineURLUnicaCampanha(nomeCurto);
  console.log(URLCampanha);

  fetch(URL, {
    'method': 'POST',
    'body': `{"nome": "${nome}",
              "nomeCurto": "${nomeCurto}",
              "descricao": "${descricao}",
              "deadline": "${deadline}",
              "meta": "${meta}"}`,
    'headers': {'Content-Type': 'application/json'}
  })
  .then(r => r.json())
  .then(u => {
      console.log('Pronto! Campanha criada com sucesso!');
      roteiaPaginaHome();
  });
}

function defineURLUnicaCampanha (nomeCurto) {
  let URLCampanha = nomeCurto;
  console.log(URLCampanha);

  //1) todo caractere de pontuação será trocado por espaço
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
