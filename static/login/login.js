let username;
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
  
}

function logar() {

    let URL = 'http://localhost:8080/auth/login';

     let email = document.querySelector("#email").value;
     let senha = document.querySelector("#senha").value;

     fetch(URL, {
         'method': 'POST',
         'body': `{"email": "${email}",
                   "senha": "${senha}"}`,
         'headers': {'Content-Type': 'application/json'}
       })
       .then(r => r.json())
       .then(u => {
           console.log(email);
           console.log(senha);
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
