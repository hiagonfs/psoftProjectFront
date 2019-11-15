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

function viewCadastroUsuario () {

    let $template = document.querySelector('#viewCadastroUsuario');
    $viewer.innerHTML = $template.innerHTML;

    let $botaoCadastrar = document.querySelector("#criar");
    $botaoCadastrar.addEventListener('click', cadastrar_usuario);

}


function viewHome() {

    let $template = document.querySelector('#viewHome');
    $viewer.innerHTML = $template.innerHTML;

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

function viewCadastraCampanha() {

    let $template = document.querySelector('#viewCadastraCampanha');
    $viewer.innerHTML = $template.innerHTML;

    let $botaoCadastrarCampanha = document.querySelector("#cadastrarCampanha");

    $botaoCadastrarCampanha.addEventListener('click', cadastroDeCampanha);

}
