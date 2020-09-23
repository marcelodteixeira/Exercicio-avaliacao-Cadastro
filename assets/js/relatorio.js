
const pegaTabela = document.querySelector('#idCorpoTabela');

function carregarTabela() {
    let cliente = JSON.parse(localStorage.getItem("listaCliente"));
    if (cliente != null) {
      let corpoTabela = document.getElementById("idCorpoTabela");
  
      for (let i = 0; i < cliente.length; i++) {
        let tr = document.createElement("tr");
        let td0 = document.createElement("td");
        td0.innerHTML = i;
        tr.appendChild(td0);
        let td1 = document.createElement("td");
        td1.innerHTML = cliente[i].Nome;
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.innerHTML = cliente[i].Cpf;
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        td3.innerHTML = cliente[i].Rua;
        tr.appendChild(td3);
        let td4 = document.createElement("td");
        td4.innerHTML = cliente[i].Bairro;
        tr.appendChild(td4);
        let td5 = document.createElement("td");
        td5.innerHTML = cliente[i].Numero;
        tr.appendChild(td5);
        let td6 = document.createElement("td");
        td6.innerHTML = cliente[i].Cep;
        tr.appendChild(td6);
        let td7 = document.createElement("td");
        td7.innerHTML = cliente[i].Email;
        tr.appendChild(td7);
        let td8 = document.createElement("td");
        td8.innerHTML = cliente[i].Sexo;
        tr.appendChild(td8);
        let td9 = document.createElement("td");
        td9.innerHTML = cliente[i].Cidade;
        tr.appendChild(td9);
        let td10 = document.createElement("td");
        td10.innerHTML = cliente[i].Estado;
        tr.appendChild(td10);
        let td11 = document.createElement("td");
        criaBotaoApagar(td11);
        tr.appendChild(td11);
        
        corpoTabela.appendChild(tr);
       
      }
    }
  }



  function criaBotaoApagar(td) {
    td.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar registro');
    td.appendChild(botaoApagar);
  }

  document.addEventListener('click', function(e) {
    const el = e.target;
  
    if (el.classList.contains('apagar')) {
      let td = el.parentNode.parentNode;
      tdId = pegaId(td);
      retiraArray(tdId);
      el.parentNode.parentNode.remove();

    }
  });


function pegaId (parentNode){
const array = parentNode.querySelectorAll('td');
let id = 0
for(index in array){
    id = array[0].innerText;
}
return id;
}

function retiraArray (id){
    let listaCliente = JSON.parse(localStorage.getItem("listaCliente"));
    let idParent = parseInt(id);
    console.log(typeof idParent)
    for(let i =0;i<=listaCliente.length;i++){
        if(i === idParent){
            listaCliente.splice(i,1);
        }
    }

    let listaCleinteStr = JSON.stringify(listaCliente);
    localStorage.setItem('listaCliente',listaCleinteStr);

}


  carregarTabela();
