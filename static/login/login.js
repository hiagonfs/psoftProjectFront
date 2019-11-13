let URL = 'http://localhost:8080/login';
let $botaoLogar = document.querySelector("#criar");
$botaoLogar.addEventListener('click', logar);

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
          
      });

}