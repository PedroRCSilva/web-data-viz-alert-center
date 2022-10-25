// // sessão

function limparSessao() {
  sessionStorage.clear();
  window.location = "../login.html";
}

function inserirInformacoes() {
  var nome = sessionStorage.NOME_USUARIO;

  var in_nome = document.querySelectorAll(".in_nome");

  for (key of in_nome) {
    key.innerHTML = nome;
  }
}

function validarSessao(){
    var nome = sessionStorage.NOME_USUARIO;
    var email = sessionStorage.EMAIL_USUARIO;
    if(nome !=null && email!=null){
        sessionStorage.clear();
    }
}

inserirInformacoes();