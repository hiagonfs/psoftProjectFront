let URL = 'http://localhost:8080/login';

let $botaoLogar = document.querySelector("#logar");
let $botaoCadastrar = document.querySelector("#cadastrar");

$botaoLogar.addEventListener('click', logar);
$botaoCadastrar.addEventListener('click', roteiaPaginaCadastro);

function logar() {

    let email = document.querySelector("#email").value;
    let senha = document.querySelector("#senha").value;

    fetch(URL, {
        'method': 'POST',
        'body': `{"email": "${email}", 
                  "senha": "${senha}"`,
        'headers': {'Content-Type': 'application/json'}
      })
      .then(r => r.json()) 
      .then(u => {

          console.log('Pronto! Logando no sistema!');
          roteiaPaginaHome(); 
          
      });

}

function roteiaPaginaHome() {

   window.location.replace("http://localhost:8080/home");

}

function roteiaPaginaCadastro() {

   window.location.replace("http://localhost:8080/cadastro");

}