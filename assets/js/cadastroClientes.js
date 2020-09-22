function criaCliente() {
    return {
        nome: document.querySelector('#input-nome'),
        cpf: document.querySelector('#input-cpf'),
        endereco: document.querySelector('#input-endereco'),
        numero: document.querySelector('#input-numero'),
        cep: document.querySelector('#input-cep'),
        email: document.querySelector('#input-email'),  
        sexo: document.querySelector('#inputGroupSelect04'),
        cidade: document.querySelector('#inputGroupSelect01'),
        estado: document.querySelector('#inputGroupSelect02'),
        pais: document.querySelector('#inputGroupSelect03'),

        get getNome() {
            return this.nome.value;
        },
        get getCpf() {
            return this.cpf.value;
        },
        get getEndereco() {
            return this.endereco.value;
        },
        get getNumero() {
            return this.numero.value;
        },
        get getCep() {
            return this.cep.value;
        },

        get getEmail() {
            return this.email.value
        },
        get getSexo() {
            return this.sexo.value
        },
        get getCidade() {
            return this.cpf.value
        },
        get getEstado() {
            return this.estado.value
        },
        get getPais() {
            return this.pais.value
        },
        set setCpf (valor){
           this.cpf.value = valor.replace(/[^0-9]/g, "").replace(/^([\d]{3})([\d]{3})?([\d]{3})?([\d]{2})?/, "$1.$2.$3-$4");
        },

        inicia() {
            this.botao();
            this.mascara();
            this.carregarCidade()
            this.carregarEstado();
            this.carregarPais()
            if (!this.pegaListaLocalStorage('listaCliente')) this.criaListaInicial();

        },

        mascara() {
            document.addEventListener('keyup', (e)=>{
                const el = e.target;
                console.log(el.id);
                if(el.id === this.cpf.id){
                el.value = this.mascaraCpf(this.cpf.value)
                 console.log(this.mascaraCpf(this.cpf.value));
                }
                if(el.id === this.numero.id){
                    el.value = this.mascaraNumero(this.numero.value);
                }
            });

           
        },

        
        mascaraCpf(valor) {
            let regexp = valor.replace(/[^0-9]/g, "").replace(/^([\d]{3})([\d]{3})?([\d]{3})?([\d]{2})?/, "$1.$2.$3-$4");
            return regexp;
           
        },

       

        fixaCampo(element) {
            return element.disabled = true

        },
        criaObj(Nome, Cpf, Endereco, Numero, Cep, Email, Sexo, Estado, Pais) {
            return {
                Nome,
                Cpf,
                Endereco,
                Numero,
                Cep,
                Email,
                Sexo,
                Estado,
                Pais,
            };
        },
        pegaListaLocalStorage(nomeLista) {
            return localStorage.getItem(nomeLista);
        },

        insereNovosElementos() {
            let listaLocalStr = this.pegaListaLocalStorage('listaCliente');
            let array = [];
            if (listaLocalStr !== null) array = JSON.parse(listaLocalStr);
            let obj = this.criaObj(this.getNome,this.getCpf,this.getEndereco,this.getNumero,this.getCep,
                this.getEmail,this.getSexo,this.getCidade, this.getEstado, this.getPais);
            array.push(obj);
            listaLocalStr = JSON.stringify(array);
            this.enviaLocalStorage('listaCliente', listaLocalStr);
        },

        enviaLocalStorage(nomeLista, array) {
            JSON.stringify(array);
            return localStorage.setItem(nomeLista, array);
        },

        botao() {
            document.addEventListener('click', (e) => {
                const el = e.target;
                if (el.classList.contains('btn')) {
                    if (!this.getCidade) return;
                    if (!this.getEstado) return;
                    this.verificaCidade();
                    this.limpaInput();
                }
            })
        },

        limpaInput() {
            this.cpf.value = "";
            this.estado.value = ""
            //this.cpf.focus(); 
        },

        criaDiv() {
            let div = document.createElement('div');
            return div;
        },


        criaArrayCidade(arrObj) {
            let array = new Array(arrObj);
            let arrayFlat = array.flat();
            let arrayMap = arrayFlat.map((obj) => {

                return obj.Cidade;
            })
            return arrayMap;
        },
        criaArrayCpf(arrObj) {
            let array = new Array(arrObj);
            let arrayFlat = array.flat();
            let arrayMap = arrayFlat.map((obj) => {

                return obj.Cpf;
            })
            return arrayMap;
        },

        tiraAcentoMaiuscula(a) {
            return a.replace(/[^a-zA-Z ]/g, "").toUpperCase();
        },
        verificaCidade() {
            const listaCliente = JSON.parse(this.pegaListaLocalStorage('listaCliente'));
            arrayCidade = this.this.criaArrayCidade(listaCliente);
            console.log(arrayCidade);
            let cpf = this.tiraAcentoMaiuscula(this.getCidade);
            let flag = false;
            let exit = false;
            for (let i = 0; i <= arrayCidade.length; i++) {
                let cpfA = arrayCidade[i];

                if (cpfA !== cpf && !exit) {
                    flag = true
                } else {
                    alert("Cidade Já Cadastrada")
                    this.limpaInput();
                    flag = false;
                    exit = true;
                    break;
                }

            }
            if (flag === true) {
                this.insereNovosElementos()
                let inicioA = this.verificaValorInicial();
                if (inicioA) this.retiraElementoInicial();

            };

        },

        criaListaInicial() {
            let array = [];
            let obj = this.criaObj('A', 'B', 'C');
            array.push(obj);
            let arrStr = JSON.stringify(array);
            this.enviaLocalStorage('listaCliente', arrStr);
        },

        retiraElementoInicial() {
            let localStorage = JSON.parse(this.pegaListaLocalStorage('listaCliente'));
            let array = new Array(localStorage);
            let arrayFlat = array.flat().reverse().shift();
            let arr = JSON.stringify([arrayFlat]);
            this.enviaLocalStorage('listaCliente', arr);

        },

        verificaValorInicial() {
            let localStor = JSON.parse(this.pegaListaLocalStorage('listaCliente'));
            let arr = this.criaArrayCpf(localStor);
            console.log(arr[0]);
            return arr[0] === 'B' ? true : false;

        },

       

        carregarEstado(){
            let listaLocaisStr = localStorage.getItem("listaLocal");
            let array = [];
                if (listaLocaisStr != null){
                    array = JSON.parse(listaLocaisStr);
            }
            let combo = this.estado;
            let option;
            for(let index = 0; index < array.length; index++){
                option = document.createElement("option");
                option.text = array[index].NomeEstado;
                option.value = array[index].NomeEstado;
                combo.add(option);
            }
           
        },
        carregarCidade(){
            let listaLocaisStr = localStorage.getItem("listaLocal");
            let array = [];
                if (listaLocaisStr != null){
                    array = JSON.parse(listaLocaisStr);
            }
            let combo = this.cidade;
            let option;
            for(let index = 0; index < array.length; index++){
                option = document.createElement("option");
                option.text = array[index].NomeCidade;
                option.value = array[index].NomeCidade;
                combo.add(option);
            }
           
        },
        carregarPais(){
            let listaLocaisStr = localStorage.getItem("listaLocal");
            let array = [];
                if (listaLocaisStr != null){
                    array = JSON.parse(listaLocaisStr);
            }
            let combo = this.pais;
            let option;
            for(let index = 0; index < array.length; index++){
                option = document.createElement("option");
                option.text = array[index].NomePais;
                option.value = array[index].NomePais;
                combo.add(option);
            }
           
        },

        
        

    }


}



const local = criaCliente();
local.inicia();