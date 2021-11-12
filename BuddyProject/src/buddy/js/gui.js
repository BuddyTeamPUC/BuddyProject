
const subjects = [];
var curTopic = null;
var currSubject = null;
var user = null;

$( document ).ready(function()
{
    localStorage.setItem("user_test", '{"username":"Pedro","email":"pedro@email.com","password":"123","materias":[{"id": 0,"nome":"aeds","assuntos":[{"id": 0,"nome": "somatorio","horas_estudadas": 48,"data": "2021-11-05"},{"id": 1,"nome": "ordenação","horas_estudadas": 12,"data": "2021-11-07"}]},{"id": 1,"nome":"AC I","assuntos":[{"id": 0,"nome": "Portas logicas","horas_estudadas": 28,"data": "2021-11-08"},{"id": 1,"nome": "Flip flop","horas_estudadas": 12,"data": "2021-11-07"}]},{"id": 2,"nome":"BD","assuntos":[{"id": 0,"nome": "Modelos de dados","horas_estudadas": 100,"data": "2021-11-06"},{"id": 1,"nome": "Introd. a banco de dados","horas_estudadas": 100,"data": "2021-11-08"}]}]}');
    user = localStorage.getItem("");
    drawPage("middle_section", page_dashboard);
    readtex
    console.log();

});

function drawPage(parent, pageFunction)
{
    $("."+parent).html("");
    $(".footer_section").html("");
    pageFunction();
}


// PEDRO

// JULIA

function page_dashboard()
{
    //abrindo json
    var data = localStorage.getItem("user_test");
    var user = JSON.parse(data);

    //titulo da pagina
    new uielement_h1("middle_section", "Olá, "+ user.username, null, { 'margin_bottom': '-30px' });
    new uielement_h2("middle_section", "Vai revisar alguma coisa hoje ?");
    
    //listar materias cadastradas
    new uielement_rounded_button("side_section", "+ Criar");
    new uielement_h1("side_section", "Matérias: ");
    user.materias.forEach(el => {
        new uielement_h3("side_section", el.nome);
    });

    //listar eventos cadastrados
    new uielement_h1("side_section", "Eventos: ");
    /* user.materias.forEach(el => {
        new uielement_h3("side_section", el.nome);

        el.eventos.forEach(evento=> {
            new uielement_h4("side_section", evento.nome);
        });

    }); */


    //encontrar a data de hoje
    var hj = new Date();
    var dd = String(hj.getDate()).padStart(2, '0');
    var mm = String(hj.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = hj.getFullYear();
    hj = yyyy + "-" + mm + "-" + dd ;
    

    //criar um array com todas as datas cadastradas sem repeticoes
    var dates = [hj]; 
    user.materias.forEach(elM => {
        elM.assuntos.forEach(elA =>{
            var aux = false;
            dates.forEach(elD =>{
                if(elD.localeCompare(elA.data)==0){
                    aux = true;
                }        
            });
            if(aux == false){
                dates.push(elA.data);
            }
        });
    });

    
    //formata as datas
    var cont = 0;
    dates.forEach(elD =>{
        var ano='', mes='', dia='';

        for(let i=0; i<4; i++){
            ano += elD[i];
        }

        for(i = 5; i<7; i++){
            mes += elD[i];
        }

        for(i = 8; i<10; i++){
            dia += elD[i];
        }

        var americano, display;
        americano = elD;

        if(hj.localeCompare(elD)==0){
            display = "Hoje";
        }else if(mes == 1){
            display = "Jan. " + dia;
        }else if(mes == 2){
            display = "Fev. " + dia;
        }else if(mes == 3){
            display = "Mar. " + dia;
        }else if(mes == 4){
            display = "Abr. " + dia;
        }else if(mes == 5){
            display = "Mai. " + dia;
        }else if(mes == 6){
            display = "Jun. " + dia;
        }else if(mes == 7){
            display = "Jul. " + dia;
        }else if(mes == 8){
            display = "Ago. " + dia;
        }else if(mes == 9){
            display = "Set. " + dia;
        }else if(mes == 10){
            display = "Out. " + dia;
        }else if(mes == 11){
            display = "Nov. " + dia;
        }else if(mes == 12){
            display = "Dez. " + dia;
        }

        dates[cont] = {'ano':ano, 'mes':mes, 'dia':dia, 'americano':americano, 'display':display};
        cont++;
    });

    
    
    //ordenacao das datas por selection sort
    selectionSort(dates);

    function selectionSort(inputArr) { 
        let n = inputArr.length;
            
        for(let i = 0; i < n; i++) {
            // Finding the smallest number in the subarray
            let min = i;
            for(let j = i+1; j < n; j++){
                if(compareDates(dates, j, min) < 0) {
                    min=j; 
                }
             }
             if (min != i) {
                 // Swapping the elements
                 let tmp = inputArr[i]; 
                 inputArr[i] = inputArr[min];
                 inputArr[min] = tmp;      
            }
        }
        return inputArr;
    }

    function compareDates(array, i, j){
        if(array[i].ano > array[j].ano){
            return 1;
        }else if(array[i].ano == array[j].ano){

            if(array[i].mes > array[j].mes){
                return 1;
            }else if(array[i].mes == array[j].mes){
                
                if(array[i].dia > array[j].dia){
                    return 1;
                }else if(array[i].dia == array[j].dia){
                    return 0;
                }else{
                    return -1;
                }

            }else{
                return -1;
            }

        }else{
            return -1;
        }

    }
    
    //separa as datas passadas em um array diferente
    separaDatas(dates, hj);
    var pastDates = [];
    
    function separaDatas(array, hj){
        
        while(array[0].americano.localeCompare(hj) < 0){
            array.shift();
        }
    }
    
    
    
    
    dates.forEach(date =>{
        new uielement_h2("middle_section", date.display); 
        
        user.materias.forEach(materia =>{

            materia.assuntos.forEach(assunto =>{

                if(assunto.data.localeCompare(date.americano)==0){
                    
                    new uielement_titled_subtitled_button("middle_section", materia.nome, assunto.nome, null, ()=> {  }); 
                    
                }

            });

        });

    });
    
    
    /* new uielement_h2("middle_section", "Hoje");
    
    display_horizontal("middle_section", 
    [
        new uielement_titled_subtitled_button("middle_section", "Aeds", "Somatório", null, ()=> {  }),
        new uielement_titled_subtitled_button("middle_section", "Inglês", "To be", null, ()=> {  }),
    ]);
    
    new uielement_h2("middle_section", "Out. 19");

    display_horizontal("middle_section", 
    [
        new uielement_titled_subtitled_button("middle_section", "Aeds", "Lista e Pilha", null, ()=> { }),
    ]); */
}

// MILENA

// GUILHERME

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}