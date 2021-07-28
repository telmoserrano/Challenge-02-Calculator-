let arrayNew = [];      //Array que contem os valores selecionados -> em string

let arrayPreCalc = [];  //Array para onde vão os valores de arrayNew já em numérico
                        //A função preCalc retira os valores da arrayNew -> A função preCalc está nos operadores e no =

let preCalc = function(){
    if(arrayNew[0] != null){
        let indexPlus = arrayNew.reduce((a, b) => a + b);           //itera pela array somando todos os index. 
        let indexToNumber = Number.parseFloat(indexPlus);           //traduz string para Float numbers
        arrayPreCalc.push(indexToNumber);                           //insere na arrayPreCalc  
        arrayNew.length = 0;                                        //limpa a arrayNew                 
    }else{
        return false;                                                //Evitar erros quando tenta iterar pela arrayNew sem indexes preenchidos
    };                                                             
};

let tipoDeCalc = null;

//EVENT HANDLERS

let um = document.getElementById("um").onclick = function(){            x = "1"; pop9th();};                                                                              
let dois = document.getElementById("dois").onclick = function(){        x = "2"; pop9th();};
let tres = document.getElementById("tres").onclick = function(){        x = "3"; pop9th();};
let quatro = document.getElementById("quatro").onclick = function(){    x = "4"; pop9th();};
let cinco = document.getElementById("cinco").onclick = function(){      x = "5"; pop9th();};
let seis = document.getElementById("seis").onclick = function(){        x = "6"; pop9th();};
let sete = document.getElementById("sete").onclick = function(){        x = "7"; pop9th();};
let oito = document.getElementById("oito").onclick = function(){        x = "8"; pop9th();};
let nove = document.getElementById("nove").onclick = function(){        x = "9"; pop9th();};
let zero = document.getElementById("zero").onclick = function(){        x = "0"; pop9th();};
let dot = document.getElementById("dot").onclick = function(){                                  
    if(arrayNew.includes(".") === false){                                                       //Evita . 2x
        arrayNew.push(".");
    }else{
        return false;
    }
    if(arrayNew[9] !== undefined){ 
        arrayNew.pop();
    }; 
    document.getElementById("topResultado").innerHTML=arrayNew.join(""); 
};    

let multi = document.getElementById("multi").onclick = function(){                          //Event Handler : Click no X
    insertValVisual();                                                                      //Prevenção de erro caso - depois =
    tipoDeCalc = "multi";
    document.getElementById("topOp").innerHTML="x";
    document.getElementById("topResultado").innerHTML="_";
    corte();
    initClickInOp();
};

let divi = document.getElementById("divi").onclick = function(){                            //Event Handler : Click no /
    insertValVisual();
    tipoDeCalc = "divi";
    document.getElementById("topOp").innerHTML="÷";
    document.getElementById("topResultado").innerHTML="_";
    corte();
    initClickInOp();
};

let soma  = document.getElementById("soma").onclick = function(){                           //Event Handler : Click no +
    insertValVisual();
    tipoDeCalc = "soma";
    inputOp = "+";
    document.getElementById("topOp").innerHTML="+";
    document.getElementById("topResultado").innerHTML="_";
    corte();
    initClickInOp();
};

let subt = document.getElementById("subt").onclick = function(){                            //Event Handler : Click no -
    if(arrayNew[0] === undefined && arrayPreCalc[0] === undefined){                         //Inserção de valor negativo
        arrayNew.push("-");
    }else if(arrayNew[0] === "-" && arrayNew[1] === undefined){                             //Prevenção de erro caso click duplo no - (no início)
        arrayNew.length = 0;
        arrayNew.push("-");
    }else{
        insertValVisual();
        tipoDeCalc = "subt";
        preCalc();
        document.getElementById("topOp").innerHTML="-";
        document.getElementById("topResultado").innerHTML="_";
    };
    corte();
};

let result = document.getElementById("resultado").onclick = function(){                     //Event Handler : Click no  =
    if(arrayNew[0] != null){   
        preCalc();
    } 
    if(arrayPreCalc[0] === undefined){                                                      //Prevenção erro caso não exista nada na array PreCalc
        return false;
    }else if(Number.isNaN(arrayPreCalc[0]) === true){                                       //Prevenção de erro caso - depois =
        return false;
    }else{
        resultado();
        if(arrayPreCalc[1] === 0 && tipoDeCalc === "divi"){
            return false;
        }else{
        document.getElementById("topResultado").innerHTML=arredondamos.format(arrayPreCalc[0]);
        document.getElementById("topOp").innerHTML=" ";
        }
    };      

    if(arrayPreCalc[0] > Number.MAX_SAFE_INTEGER || arrayPreCalc[0] < Number.MIN_SAFE_INTEGER){     //If statement de Corte
        document.getElementById("topPrev").innerHTML="ERROR! (Max number size)";
        document.getElementById("topResultado").innerHTML="ERROR!";
        document.getElementById("topOp").innerHTML="☹";
        setTimeout(ac, 4000);
    }else{
        prevs(arrayPreCalc[0]);
        if(arrayPreCalc[0].toString().length > 13){
            let bigNum = arredondamos.format(arrayPreCalc[0]);
            document.getElementById("topResultado").innerHTML=bigNum.substring(0,13);
        }
    }; 
    tipoDeCalc = null;
};                                                                                                              

let ac = document.getElementById("ac").onclick = function(){                                //Event Handler : Click no AC
    arrayNew.length = 0;
    arrayPreCalc.length = 0;
    document.getElementById("topResultado").innerHTML="0";
    document.getElementById("topPrev").innerHTML="0";
    document.getElementById("topOp").innerHTML=" ";
};

let underscoreFunc = function(){                                                            //Se arrayNew for = 0, dá underscore
    if(arrayNew[0] === undefined){
        document.getElementById("topResultado").innerHTML="_";
    };
};

let del = document.getElementById("del").onclick = function(){                              //Event Handler : Click no DEL
    arrayNew.pop();
    document.getElementById("topResultado").innerHTML=arrayNew.join("");
    underscoreFunc();
};

let initClickInOp = function(){                                                             //Prevenção de erro caso click em Op sem números
    if(arrayPreCalc[0] === undefined && arrayNew[0] === undefined){
        document.getElementById("topResultado").innerHTML="0";
        document.getElementById("topOp").innerHTML=" ";
        document.getElementById("topPrev").innerHTML="0";
        tipoDeCalc = null;
    };
};

let insertVal = function(){                                                                 //Inserção de valores e obtenção do resultado após calculos
    if(arrayNew[0] != null){   
        preCalc();
    }
    if(arrayPreCalc[1] != null){
        resultado();
    };
};

let insertValVisual = function(){                                                           //Se o arrayPreCalc[0] for undefined, a máquina começa com zero
    if(arrayPreCalc[0] === undefined){
        insertVal();
        prevs(arrayPreCalc[0])                                                              //De outra forma-> insere os valores e devolve o resultado após calculos
    }else{
        insertVal();
    }     
};

let corte = function(){                                                                             //Função de Corte caso o número seja demasiado alto/baixo
    if(arrayPreCalc[0] > Number.MAX_SAFE_INTEGER || arrayPreCalc[0] < Number.MIN_SAFE_INTEGER){
        document.getElementById("topPrev").innerHTML="ERROR! (Max number size)";
        document.getElementById("topResultado").innerHTML="ERROR!";
        document.getElementById("topOp").innerHTML="☹";
        setTimeout(ac, 4000);
    }else if(arrayPreCalc.toString().length > 9){
        prevs(arrayPreCalc[0]);
    }
}  

let resultado = function(){                                                                 //Resultado
    if(tipoDeCalc === "divi" && arrayPreCalc[1] != null){
        funcDivi();
    }else if(tipoDeCalc === "multi" && arrayPreCalc[1] != null){
        funcMulti();
    }else if(tipoDeCalc === "soma" && arrayPreCalc[1] != null){
        funcSoma();
    }else if(tipoDeCalc === "subt" && arrayPreCalc[1] != null){
        funcSubt();
    }    
};                                                                                                                        

let funcMulti = function(){                                                                 //Multiplicação
    let mt = arrayPreCalc[0] * arrayPreCalc[1];
    arrayPreCalc.splice(0, 2);
    arrayPreCalc.push(mt);
    prevs(mt);
};

let funcDivi = function(){                                                                  //Divisão
    if(arrayPreCalc[1] === 0){
        arrayPreCalc[0] = 0;
        document.getElementById("topPrev").innerHTML= "Cannot divide by zero!";
        document.getElementById("topOp").innerHTML="☹";
        setTimeout(ac, 4000);
    }else{                               
    let dv = arrayPreCalc[0] / arrayPreCalc[1];
    arrayPreCalc.splice(0, 2);
    arrayPreCalc[0] = dv;
    prevs(dv);
    }
};

let funcSoma = function(){                                                                  //Soma    
    let sm = arrayPreCalc[0] + arrayPreCalc[1];
    arrayPreCalc.splice(0, 2);
    arrayPreCalc[0] = sm;
    prevs(sm);
};

let funcSubt = function(){                                                                  //Subtração
    let sb = arrayPreCalc[0] - arrayPreCalc[1];
    arrayPreCalc.splice(0, 2);
    arrayPreCalc[0] = sb;
    prevs(sb);
};

let pop9th = function(){                                                                //Corte no nono dígito inserido
    if(arrayNew[9] !== undefined){ 
        return false;
    };
    arrayNew.push(x);
    document.getElementById("topResultado").innerHTML=arrayNew.join("");                //join() retira as vírgulas entre os indexes da array
}                                                                                       //tem que se meter aquilo pelo qual se quer substituir as ,

let arredondamos = new Intl.NumberFormat('en-US', {                                     //arredondamentos com precisão
    minimumFractionDigits: 0,      
    maximumFractionDigits: 4,
 });

let arredondamos6Dec = new Intl.NumberFormat('en-US', {                                     //arredondamentos com precisão a 8 decimas
    minimumFractionDigits: 0,      
    maximumFractionDigits: 6,
 });

let prevs = function(prevVal){
    if(prevVal.toString().length > 15){
        let bigNum = arredondamos6Dec.format(prevVal);
        document.getElementById("topPrev").innerHTML=bigNum.substring(0,20)+"...";
    }else{
        let bigNum = arredondamos6Dec.format(prevVal);
        document.getElementById("topPrev").innerHTML=bigNum.substring(0,20);
    }
};
