
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
    new uielement_h1("middle_section", "Olá, "+ user.username, null, { 'margin_bottom': '-2%' });
    new uielement_h2("middle_section", "Vai revisar alguma coisa hoje ?");
    
    //listar materias cadastradas
    new uielement_h1("side_section", "Matérias: ", null, { 'margin_bottom': '-12%' });
    user.materias.forEach(el => {
        new uielement_h3("side_section", el.nome, null, { 'margin_bottom': '-17%' });
    });
    new uielement_rounded_button("side_section", "+ Materia", null, null, null, { 'margin_top': '10%' } );
    

    //listar eventos cadastrados
    new uielement_h1("side_section", "Próximos eventos: ", null, { 'margin_bottom': '-12%', 'margin_top': '15%' });
    /* user.materias.forEach(el => {
        new uielement_h3("side_section", el.nome);

        el.eventos.forEach(evento=> {
            new uielement_h4("side_section", evento.nome);
        });

    }); */
    new uielement_rounded_button("side_section", "+ Evento", null, null, null, { 'margin_top': '20%' } );

    //encontrar a data de hoje
    var hj = new Date();
    var dd = String(hj.getDate()).padStart(2, '0');
    var mm = String(hj.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = hj.getFullYear();
    var americano = yyyy + "-" + mm + "-" + dd ;
    hj = {'ano':yyyy, 'mes':mm, 'dia':dd, 'americano':americano};

    

    //criar um array com todas as datas cadastradas sem repeticoes
    var dates = []; 
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

        if(hj.americano.localeCompare(elD)==0){
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
                if(compareDates(dates[j], dates[min]) < 0) {
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

    function compareDates(i, j){
        if(i.ano > j.ano){
            return 1;
        }else if(i.ano == j.ano){

            if(i.mes > j.mes){
                return 1;
            }else if(i.mes == j.mes){
                
                if(i.dia > j.dia){
                    return 1;
                }else if(i.dia == j.dia){
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
    var pastDates = [];
    while(dates.length > 0 && compareDates(dates[0], hj) < 0){
        var date = dates.shift(); 
        pastDates.push(date);
    }

    
    // display revisoes de hoje e futuras
    if(dates.length > 0){
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
    }else{
        new uielement_h3("middle_section", "Não temos revisões futuras!");
    }

    // checa se um ano e bissexto ou nao
    function isBissexto(ano){
        if((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0))){
            return true;
        }else{
            return false;
        }
    }
    
    //display revisoes passadas
    new uielement_h2("middle_section", "O que revisamos na última samana?", null, { 'margin_top': '60px', 'margin_bottom': '-10px'});
    if(pastDates.length > 0){
        
        var marcaSemana;
        if(dd > 7){

            americano = yyyy + '-' + mm + '-' + (dd - 7);
            ano = yyyy;
            mes = mm;
            dia = dd - 7;

            marcaSemana = {'ano':ano, 'mes':mes, 'dia':dia, 'americano':americano};
        }else{

            if(mm == 1){// 31 dias
                ano = yyyy - 1;
                mes = 12;
                dia = 31 + (dd - 7);

                
            }else if(mm == 2){// 28 ou 29 dias
                ano = yyyy;
                mes = mm -1;
                dia = 31 + (dd - 7);
                
            }else if(mm == 3){// 31 dias
                ano = yyyy;
                mes = mm -1;
                //levar em consideracao o ano bisexto
                if(isBissexto(ano)==true){
                    dia = 29 + (dd - 7); 
                }else{
                    dia = 28 + (dd - 7);
                }
                
            }else if(mm == 4){// 30 dias
                ano = yyyy;
                mes = mm -1;
                dia = 31 + (dd - 7);
                
            }else if(mm == 5){// 31 dias
                ano = yyyy;
                mes = mm -1;
                dia = 30 + (dd - 7);
                
            }else if(mm == 6){// 30 dias
                ano = yyyy;
                mes = mm -1;
                dia = 31 + (dd - 7);
                
            }else if(mm == 7){// 31 dias
                ano = yyyy;
                mes = mm -1;
                dia = 30 + (dd - 7);
                
            }else if(mm == 8){// 31 dias
                ano = yyyy;
                mes = mm -1;
                dia = 31 + (dd - 7);
                
            }else if(mm == 9){// 30 dias
                ano = yyyy;
                mes = mm -1;
                dia = 31 + (dd - 7);
                
            }else if(mm == 10){// 31 dias
                ano = yyyy;
                mes = mm -1;
                dia = 30 + (dd - 7);
                
            }else if(mm == 11){// 30 dias
                ano = yyyy;
                mes = mm -1;
                dia = 31 + (dd - 7);
                
            }else if(mm == 12){// 31 dias
                ano = yyyy;
                mes = mm -1;
                dia = 30 + (dd - 7);
                
            }

            americano = ano + '-' + mes + '-' + dia;

            marcaSemana = {'ano':ano, 'mes':mes, 'dia':dia, 'americano':americano};
        }

         
        while(pastDates.length > 0 && compareDates(pastDates[0], marcaSemana) < 0){
            pastDates.shift(); 
        }

        if(pastDates.length > 0){

            pastDates.forEach(date =>{
                new uielement_h2("middle_section", date.display); 
                
                user.materias.forEach(materia =>{
        
                    materia.assuntos.forEach(assunto =>{
        
                        if(assunto.data.localeCompare(date.americano)==0){        
                            new uielement_titled_subtitled_button("middle_section", materia.nome, assunto.nome, null, ()=> {  }); 
                        }
                    });
        
                });
            });
        }else{
            new uielement_h3("middle_section", "Não fizemos revisões na última semana!");
        }

    }else{
        new uielement_h3("middle_section", "Não temos revisões passadas!");
    }

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