const cidade = 'Lavras';
const estado ='MG';
const pais = 'Brasil';

function criaObj (cidade,estado,pais){
    return {
        cidade,
        estado,
        pais,
   };
}

const c1 = criaObj(cidade,estado,pais);
const c2 = criaObj('Florianopolis','SC','Brasil');
const a1 = [c1,c2];
console.log(a1);

let m = a1.map((e)=>{
    return e.cidade
})

console.log(m);

    