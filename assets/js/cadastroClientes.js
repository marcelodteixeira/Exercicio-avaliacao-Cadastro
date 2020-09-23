function criaCliente() {
    return {
        nome: document.querySelector('#input-nome'),
        cpf: document.querySelector('#input-cpf'),
        rua: document.querySelector('#input-rua'),
        bairro: document.querySelector('#input-bairro'),
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
        get getRua() {
            return this.rua.value;
        },
        get getBairro() {
            return this.bairro.value;
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
            return this.sexo.value === '1' ? 'M' : 'F';
        },
        get getCidade() {
            return this.cidade.value
        },
        get getEstado() {
            return this.estado.value
        },
        get getPais() {
            return this.pais.value
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
                if(el.id === this.cpf.id){
                el.value = this.mascaraCpf(this.cpf.value)
                }
                if(el.id === this.cep.id){
                    el.value = this.mascaraNumero(this.cep.value);
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

       mascaraNumero (valor){
        let regexp = valor.replace(/[^0-9]/g, "");
        return regexp;
       },

        fixaCampo(element) {
            return element.disabled = true

        },
        criaObj(Nome, Cpf, Rua,Bairro, Numero, Cep, Email, Sexo,Cidade, Estado, Pais) {
            return {
                Nome,
                Cpf,
                Rua,
                Bairro,
                Numero,
                Cep,
                Email,
                Sexo,
                Cidade,
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
            let obj = this.criaObj(this.getNome,this.getCpf,this.getRua,this.getBairro,this.getNumero,this.getCep,
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
                    if (!this.getNome) return;
                    if (!this.getCpf) return;
                    if (!this.getRua) return;
                    if (!this.getBairro) return;
                    if (!this.getNumero) return;
                    if (!this.getCep) return;
                    if (!this.getEmail) return;
                    if (!this.getSexo) return;
                    if (!this.getCidade) return;
                    if (!this.getEstado) return;
                    if (!this.getPais) return;
                    this.verificaCpf();
                    this.limpaInput();
                }
            })
        },

        limpaInput() {
            this.nome.value = "";
            this.cpf.value = "";
            this.rua.value = "";
            this.bairro.value = "";
            this.numero.value = "";
            this.cep.value = "";
            this.email.value = "";
            this.sexo.value = "";
            this.cidade.value = "";
            this.estado.value = "";
            this.pais.value = "";
            //this.cpf.focus(); 
        },

        criaDiv() {
            let div = document.createElement('div');
            return div;
        },


        criaarrayCpf(arrObj) {
            let array = new Array(arrObj);
            let arrayFlat = array.flat();
            let arrayMap = arrayFlat.map((obj) => {

                return obj.Cidade;
            })
            return arrayMap;
        },
        criaArrayPais(arrObj) {
            let array = new Array(arrObj);
            let arrayFlat = array.flat();
            let arrayMap = arrayFlat.map((obj) => {

                return obj.NomePais;
            })
            return arrayMap;
        },
        criaArrayEstado(arrObj) {
            let array = new Array(arrObj);
            let arrayFlat = array.flat();
            let arrayMap = arrayFlat.map((obj) => {

                return obj.NomeEstado;
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

        arrayTiraCaract(array){
            return array.map((i)=>{
                return i.replace(/\D+/g, '')
            })
           },

        tiraCaracteres(a) {
            return a.replace(/\D+/g, '')
        },
        verificaCpf() {
            const listaCliente = JSON.parse(this.pegaListaLocalStorage('listaCliente'));
            arrayCpf = this.arrayTiraCaract(this.criaArrayCpf(listaCliente));
            console.log(arrayCpf);
            let cpf = this.tiraCaracteres(this.getCpf);
            let flag = false;
            let exit = false;
            for (let i = 0; i <= arrayCpf.length; i++) {
                let cpfA = arrayCpf[i];

                if (cpfA !== cpf && !exit) {
                    flag = true
                } else {
                    this.criaAlertDanger();
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
            let obj = this.criaObj('A','1','B');
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
            console.log(typeof arr[0]);
            return arr[0] === '1' ? true : false;

        },

       
        carregarEstado(){
            let listaLocaisStr = JSON.parse(this.pegaListaLocalStorage('listaLocal'));
            let array = this.criaArrayEstado(listaLocaisStr);
            let arrayUnico = this.tiraValorDuplicadoArray(array);
            let combo = this.estado;
            let option;
            for(let index = 0; index < arrayUnico.length; index++){
                option = document.createElement("option");
                option.text = arrayUnico[index];
                option.value = arrayUnico[index];
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
            let listaLocaisStr = JSON.parse(this.pegaListaLocalStorage('listaLocal'));
            let array = this.criaArrayPais(listaLocaisStr);
            let arrayUnico = this.tiraValorDuplicadoArray(array);
            let combo = this.pais;
            let option;
            for(let index = 0; index < arrayUnico.length; index++){
                option = document.createElement("option");
                option.text = arrayUnico[index];
                option.value = arrayUnico[index];
                combo.add(option);
            }
           
        },

        
        tiraValorDuplicadoArray(array){
         
           return array.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })
            
        }
        

    }


}



const local = criaCliente();
local.inicia();