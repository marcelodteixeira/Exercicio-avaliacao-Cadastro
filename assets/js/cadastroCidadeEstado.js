

function criaLocal (){
    return{
        cidade : document.querySelector('#input-cidade'),
        estado : document.querySelector('#input-estado'),
        pais: document.querySelector('#input-pais'),

        get getCidade(){
            return this.cidade.value;
        },

        get getEstado (){
            return this.estado.value;
        },

        get getPais (){
            return this.pais.value = 'Brasil'
        },
        
        inicia(){
            this.getPais
            this.fixaCampo(this.pais);
            this.botao();
            if(!this.pegaListaLocalStorage('listaLocal'))this.criaListaInicial();
            
        },
        
        fixaCampo (element){
            return element.disabled = true
            
           },
           criaObj (NomeCidade,NomeEstado,NomePais){
            return {
                NomeCidade,
                NomeEstado,
                NomePais
           };
        },
           pegaListaLocalStorage (nomeLista){
            return localStorage.getItem(nomeLista);
           },
           
           insereNovosElementos (){
            let listaLocalStr = this.pegaListaLocalStorage('listaLocal');
            let array = [];
            if(listaLocalStr !== null) array = JSON.parse(listaLocalStr);
            let obj = this.criaObj(this.getCidade,this.getEstado,this.getPais);
            array.push(obj);
            listaLocalStr = JSON.stringify(array);
            this.enviaLocalStorage('listaLocal',listaLocalStr);
           },

           enviaLocalStorage(nomeLista,array){
            JSON.stringify(array);
            return localStorage.setItem(nomeLista,array);
           },

           botao (){
                document.addEventListener('click',(e) =>{
                  const el = e.target;
                  if(el.classList.contains('btn')){
                    if(!this.getCidade) return;
                    if(!this.getEstado) return;
                    this.verificaCidade();
                    this.limpaInput();
                  }})
           },

           limpaInput (){  
               this.cidade.value = "";
               this.estado.value = ""
               //this.cidade.focus(); 
           },

           criaDiv (){
               let div = document.createElement('div');
               return div;
           },
           

           criaArrayCidade (arrObj){
            let array = new Array(arrObj);
            let arrayFlat = array.flat();
            let arrayMap = arrayFlat.map((obj)=>{
                
                return obj.NomeCidade;
            })
            return arrayMap;
           },
           
           arrayUpperCase(array){
            return array.map((i)=>{
                return i.replace(/[^a-zA-Z ]/g, "").toUpperCase();
            })
           },
           tiraAcentoMaiuscula (a){
            return a.replace(/[^a-zA-Z ]/g, "").toUpperCase();
           },
           verificaCidade (){
               const listaCidade = JSON.parse(this.pegaListaLocalStorage('listaLocal'));
               arrayCidade = this.arrayUpperCase(this.criaArrayCidade(listaCidade));
               console.log(arrayCidade);
               let cidade = this.tiraAcentoMaiuscula(this.getCidade);
               let flag = false;
               let exit = false;
               for(let i = 0;i<=arrayCidade.length;i++){
                let cidadeA = arrayCidade[i]; 

                if(cidadeA !== cidade && !exit){
                       flag = true
                    }else{
                        alert("Cidade Já Cadastrada")
                        this.limpaInput();
                        flag = false;
                        exit = true;
                        break;
                    }                   
                    
               }
               if(flag === true){
                   this.insereNovosElementos()
                   let inicioA = this.verificaValorInicial();
                   if(inicioA) this.retiraElementoInicial();
                    
                };
               
           },

           criaListaInicial (){
            let array = [];
            let obj = this.criaObj('A','B','C');
            array.push(obj);
            let arrStr = JSON.stringify(array);
            this.enviaLocalStorage('listaLocal',arrStr);
           },

           retiraElementoInicial (){
                let localStorage = JSON.parse(this.pegaListaLocalStorage('listaLocal'));
                let array = new Array(localStorage);
                let arrayFlat = array.flat().reverse().shift();
                let arr = JSON.stringify([arrayFlat]);
                this.enviaLocalStorage('listaLocal',arr);

           },

           verificaValorInicial (){
           let localStor = JSON.parse(this.pegaListaLocalStorage('listaLocal'));
           let arr = this.criaArrayCidade(localStor);
           console.log(arr[0]);
           return arr[0] === 'A' ? true : false;

           }
           
    }

    
}



const local = criaLocal ();
local.inicia();