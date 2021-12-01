
const subjects = [];
var curTopic = null;
var currSubject = null;
var user = null;
var isLive = false;

$( document ).ready(function()
{
    
    user = JSON.parse(sessionStorage.getItem("logged_user"));

    drawPage("middle_section", page_dashboard);
    console.log(user)

    $('.toggle').click(function(){
        $('.toggle').toggleClass('active')
        $('body').toggleClass('night')

        var theme_id = 0;

        if($(".cronometro").html() != "")
        {
            if($("body").hasClass("night"))
            {
                console.log("AAAAAAAAAAAAAA");
                $(".cronometro").html('<iframe width="475" height="250" src="https://relogioonline.com.br/embed/cronometro/#enabled=0&msec=8315&laps=3613&theme=1&color=0" frameborder="0" allowfullscreen></iframe>');
                $(".panel-default").css("background-color", "red");
            }
            else
            {
                $(".cronometro").html('<iframe width="475" height="250" src="https://relogioonline.com.br/embed/cronometro/#enabled=0&msec=8315&laps=3613&theme=0&color=0" frameborder="0" allowfullscreen></iframe>');
            }
        }
    })

});

function drawPage(parent, pageFunction)
{
    $(".cronometro").html("");
    $("."+parent).html("");
    $(".footer_section").html("");
    $(".side_section").html("");
    drawSideBar();
    pageFunction();
}


// PEDRO

function page_login()
{
    new uielement_h1("middle_section", "Login");
    var email = new uielement_inputfield("middle_section", "email", "", "text");
    var pass = new uielement_inputfield("middle_section", "senha", "", "password");

    pass.addAttribute("type", "password");

    new uielement_rounded_button("middle_section", "Login", null, ()=>
    {
        console.log(baseFecthUrl("login?username="+email.data+"&pass="+pass.data));
        fetch(baseFecthUrl("login?username="+email.data+"&pass="+pass.data))
        .then(response => response.json())
        .then(userData =>
        {

            if(!userData.status)
            {
                alert(userData.message);
                return;
            }

            console.log(userData);

            user = { credentials: userData.data };
            
            fetch(baseFecthUrl("materiais?id="+userData.data.id))
            .then(materiaisResponse => materiaisResponse.json())
            .then(subjectData => 
            {
                user.materias = subjectData.data;
                
                user.materias.forEach(materia => {
                });  
                
                var assuntosPromises = [];

                user.materias.forEach(materia => 
                    {
                        assuntosPromises.push
                        (
                            fetch(baseFecthUrl("assuntos?materialid="+materia.id))
                            .then(topicsRespose => topicsRespose.json())
                            .then(topicsData => materia.assuntos = topicsData.data)
                        );
                    });

                Promise.all(assuntosPromises).then(()=> 
                { 
                    drawPage("middle_section", page_dashboard);
                    updateSessionStorage();
                });

            });
        })
    });

    new uielement_h2("middle_section", "Não tem uma conta ?", null, { "margin_top": "45px", "margin_bottom": "-20px" });
    var criar = new uielement_h3("middle_section", "cirar", null);
 
    criar.addEvent("mouseenter", ()=>
    {
        criar.style = 
        {
            "text_decoration" : "underline",
            "cursor" : "pointer"
        }

        criar.setStyle();
    });

    criar.addEvent("mouseleave", ()=>
    {
        criar.style =
        {
            "text_decoration" : "none",
            "cursor" : "normal"
        }

        criar.setStyle();
    });

    criar.addEvent("click", ()=>
    {
        drawPage("middle_section", page_register);
    });
}

function page_register()
{
    new uielement_h1("middle_section", "Login");

    var nome = new uielement_inputfield("middle_section", "nome", "", "text");
    var sobrenome = new uielement_inputfield("middle_section", "sobrenome", "", "text");
    var email = new uielement_inputfield("middle_section", "email", "", "text");
    var pass = new uielement_inputfield("middle_section", "senha", "", "password");
    var confirmpass = new uielement_inputfield("middle_section", "confirmar senha", "", "password");

    pass.addAttribute("type", "password");
    confirmpass.addAttribute("type", "password");

    new uielement_rounded_button("middle_section", "Criar !", null ,()=>
    {

        if(isEmpty(nome.data) || isEmpty(sobrenome) || isEmpty(email) || isEmpty(pass) || isEmpty(confirmpass))
        {
            alert("Preencha todos os campos !");
            return;
        }

        if(!email.data.includes("@") || !email.data.includes(".com"))
        {
            alert("Preencha um email válido");
            return;
        }

        if(pass.data != confirmpass.data)
        {
            alert("Certifique-se de que preencheu a senha certa");
            return;
        }

        var url = baseFecthUrl("register?name="+nome.data+"&sobrenome="+sobrenome.data+"&email="+email.data+"&pass="+pass.data);
        console.log(url);
        fetch(url)
        .then(json => json.json())
        .then(final => 
        {
            console.log(final);
            if(!final.status)
            {
                alert(final.message);
                return;
            }

            drawPage("middle_section", page_login);
        });
        // drawDashboard("middle_section", page_login);
    });
}

// JULIA

function page_dashboard()
{
    
    //Antes de desenhar a dashboard o site precisa sertificar de que o usuário está carregado.
    if(!user)
    {
        drawPage("middle_section", page_login);
        return;
    }

    //abrindo json
    var materiasParaMostrar = [];
    //titulo da pagina
    if(currSubject == null)
    {
    materiasParaMostrar = user.materias;
    new uielement_h1("middle_section", "Olá, "+ user.credentials.nome, null, { 'margin_bottom': '-2%' });
    new uielement_h2("middle_section", "Vai revisar alguma coisa hoje ?");
    }else{
        materiasParaMostrar.push(currSubject);
        new uielement_h1("middle_section", currSubject.nome);
        new uielement_h2("middle_section", currSubject.descricao, null, { "margin_top" : "-30px" } );
    }
    
    
    console.log(materiasParaMostrar);
    drawDashboard(materiasParaMostrar);

    if(currSubject != null)
    {
        new uielement_rounded_button("footer_section", "+ Assunto",null,()=>{
            drawPage("middle_section", page_addAssunto);
        },null,{'margin_left': '85%','margin_top': '-1%'});
    }
}
function drawSideBar()
{

    if(!user)
    {
        return;
    }

    new uielement_h1("side_section", "Matérias: ", null, { 'margin_bottom': '-12%' });
    user.materias.forEach(el => {
        var h3 = new uielement_h3("side_section", el.nome, null, { 'margin_bottom': '-17%' });
        h3.addEvent("mouseenter", ()=>{
            h3.style = {
                "text_decoration" : "underline", 
                "cursor" : "pointer"
            }
            h3.setStyle()
        })
        h3.addEvent("mouseleave", ()=>{
            h3.style = {
                "text_decoration" : "none", 
                "cursor" : "normal"
            }
            h3.setStyle()
        })
        h3.addEvent("click", ()=>{
            currSubject = el
            drawPage("middle_section", page_dashboard);
        })
    });
    new uielement_rounded_button("side_section", "+ Materia", null, ()=>{
        drawPage("middle_section", page_create);
    }, null, { 'margin_top': '10%' } );
     //listar materias cadastradas
    new uielement_h1("side_section", "Próximos eventos: ", null, { 'margin_bottom': '-12%', 'margin_top': '15%' });
    user.materias.forEach(el => {
        new uielement_h3("side_section", el.nome);

        if(el.eventos == null)
            el.eventos = [];

        el.eventos.forEach(evento=> {
            new uielement_h4("side_section", evento.nome);
        });

    });
    new uielement_rounded_button("side_section", "+ Evento", null, null, null, { 'margin_top': '20%' } );
}

// MILENA
function page_create()
{
    new uielement_h1("middle_section", "Criar matéria", null, { 'margin_bottom': '10px' });

        var nome_mat = new uielement_inputfield("middle_section", "Nome matéria", "", "text", null, {'margin_bottom': ' 10px'} )
        var descricao_mat = new uielement_inputfield("middle_section", "Descrição da matéria", "", "text", null, {'margin_bottom': '20px'} )
        new uielement_rounded_button("middle_section", "Confirmar", null,()=> { 
           
            var canAdd = user.materias.every((materia, index, array)=>{ return materia.nome != nome_mat.data; });
           
            if(canAdd)
            {
                var url = "user_id="+user.credentials.id+"&nome="+nome_mat.data+"&descricao="+descricao_mat.data;
                fetch(baseFecthUrl("addmateria?"+url))
                .then(response => response.json())
                .then(data => 
                    {
                        console.log(user);
                        currSubject = data.data;
                        console.log(data.data);
                        currSubject = data.data;
                        data.data.assuntos = [];
                        user.materias.push(data.data);
                        updateSessionStorage();
                        drawPage("middle_section", page_dashboard);
                    });
                }
                else
                {
                    alert("O nome " + nome_mat.data + " já esta sendo utilizado em outra matéria");
                }
        });


}

// GUILHERME

function page_topic(){
    if(currSubject==null || curTopic == null){
        drawPage("middle_section",page_dashboard);
        return;
    }
    //título da página.

    new uielement_h1("middle_section",curTopic.nome, null, { 'margin_bottom': '-30px'});
    new uielement_h2("middle_section", currSubject.nome);

    if(!$("body").hasClass("night"))
    {
        $(".cronometro").html('<iframe width="475" height="250" src="https://relogioonline.com.br/embed/cronometro/#enabled=0&msec=8315&laps=3613&theme=0&color=0" frameborder="0" allowfullscreen></iframe>');
    }
    else
    {
        $(".cronometro").html('<iframe width="475" height="250" src="https://relogioonline.com.br/embed/cronometro/#enabled=0&msec=8315&laps=3613&theme=1&color=0" frameborder="0" allowfullscreen></iframe>');
    }
    //Links úteis:
    if(curTopic.link != null && curTopic.link.length>0){
        new uielement_h2("middle_section","Links úteis:",null,);
        new uielement_rounded_button("footer_section", "+ Link",null,()=>{
            drawPage("middle_section",page_addlink);
        },null,{'margin_left': '85%','margin_top': '-1%'});
        console.log(curTopic.link);
        curTopic.link.forEach(l =>{
            new uielement_h3_hyperlink("middle_section",l.nome,null,l.link, { "margin_bottom" : "-40px" });
        });
    }
    else{
        new uielement_h3("middle_section", "Nenhum link cadastrado");
        var adicionar = new uielement_h3("middle_section", "Adicionar ", null, { "margin_top": "-15px" });

    adicionar.addEvent("mouseenter",()=>
    {
        adicionar.style = 
        {
            "margin_top": "-15px",
            "text_decoration": "underline",
            "cursor": "pointer"
        }

        adicionar.setStyle();
    });

    adicionar.addEvent("mouseleave", ()=>
    {
        adicionar.style = 
        {
            "margin_top": "-15px",
            "text_decoration": "none",
            "cursor": "normal"
        }

        adicionar.setStyle();
    });

    adicionar.addEvent("click", ()=>
    {
       drawPage("middle_section",page_addlink); 
    });
    }

}
function page_addlink(){
    new uielement_h1("middle_section",currSubject.nome+ " : " + curTopic.nome );
    var titulo = new uielement_inputfield("middle_section","Título","", "text");
    var link = new uielement_inputfield("middle_section","Link","", "text");
    new uielement_rounded_button("middle_section","Adicionar",null,()=>{

        if(curTopic.link == null)
        {
            curTopic.link = [];
        }

        var canAdd = curTopic.link.every((value, index, array)=> { return value.nome != titulo.data; });
        
        if(canAdd)
        {
            var url = baseFecthUrl("/addlink?assunto_id="+curTopic.id+"&titulo="+titulo.data+"&link="+link.data);
            fetch(url)
            .then(response => response.json())
            .then(data =>
            {
                curTopic.link.push(data.data); 
                updateSessionStorage();
                drawPage("middle_section", page_topic);
            });
        }
        else
        {
            alert("O nome " + titulo.data + " ja esta sendo utilizado.");
        }
    });
}

function page_addAssunto()
{
    new uielement_h1("middle_section", "Agendar um assunto");
    new uielement_h2("middle_section",currSubject.nome);
    var titulo = new uielement_inputfield("middle_section","Título","", "text");
    var descricao = new uielement_inputfield("middle_section","Descrição","", "text");
    var calendario = new uielement_calendar("middle_section", "", ()=>
    {
        console.log("teste");
    });
    
    new uielement_rounded_button("middle_section","Adicionar",null,()=>{
        
        var canAdd = currSubject.assuntos.every((assunto, index, array)=> { return assunto.nome != titulo.data });
        
        if(canAdd)
        {
            var url = "materia_id="+currSubject.id+"&nome="+titulo.data+"&descricao="+descricao.data+"&data="+calendario.data;
            fetch(baseFecthUrl("addassunto?"+url))
            .then(response => response.json())
            .then(data => 
            {
                data.data.link = [];
                curTopic = data.data;
                currSubject.assuntos.push(data.data);
                updateSessionStorage();
                drawPage("middle_section", page_topic);
            })
        }
        else
        {
            alert("O nome " + titulo.data + " já está sendo utilizado");
        }
    });
}

function page_addEvent()
{
    new uielement_h1("middle_section", "Agendar um evento");
    new uielement_h2("middle_section",currSubject.nome);
    var titulo = new uielement_inputfield("middle_section","Título","", "text");
    var descricao = new uielement_inputfield("middle_section","Descrição","", "text");
    var calendario = new uielement_calendar("middle_section", "", ()=>
    {
        console.log("teste");
    });
    
    new uielement_rounded_button("middle_section","Adicionar",null,()=>{
        
        var canAdd = currSubject.assuntos.every((assunto, index, array)=> { return assunto.nome != titulo.data });
        
        if(canAdd)
        {
            var url = "materia_id="+currSubject.id+"&nome="+titulo.data+"&descricao="+descricao.data+"&data="+calendario.data;
            fetch(baseFecthUrl("addassunto?"+url))
            .then(response => response.json())
            .then(data => 
            {
                data.data.link = [];
                curTopic = data.data;
                currSubject.assuntos.push(data.data);
                updateSessionStorage();
                drawPage("middle_section", page_topic);
            })
        }
        else
        {
            alert("O nome " + titulo.data + " já está sendo utilizado");
        }
    });
}

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

function drawDashboard(materias){
    //encontrar a data de hoje
    var hj = new Date();
    var dd = String(hj.getDate()).padStart(2, '0');
    var mm = String(hj.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = hj.getFullYear();
    var americano = yyyy + "-" + mm + "-" + dd ;
    hj = {'ano':yyyy, 'mes':mm, 'dia':dd, 'americano':americano};


    //criar um array com todas as datas cadastradas sem repeticoes
    var dates = [];
    
    for(const elM of materias)
    {
        console.log("elM");
        console.log(elM);
    }
    
    materias.forEach(elM => {
        
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
            
            var opcoes = [];
            materias.forEach(materia =>{
    
                materia.assuntos.forEach(assunto =>{

                    if(assunto.data.localeCompare(date.americano)==0){
                        
                        
                        opcoes.push(new uielement_titled_subtitled_button("middle_section", materia.nome, assunto.nome, null, ()=> { 
                            curTopic = assunto;
                            currSubject = materia;
                            if(assunto.link == null || assunto.link.length == 0)
                            {
                                var url = "assuntolinks?assuntoid="+assunto.id;
                                fetch(baseFecthUrl(url))
                                .then(response => response.json())
                                .then(data =>
                                {
                                    assunto.link = [];
                                    assunto.link = data.data;
                                    drawPage("middle_section", page_topic);
                                });
                            }
                            else
                            {
                                drawPage("middle_section", page_topic);
                            }
                        })); 
                    }
                });
                
                display_horizontal("middle_section", opcoes);

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
                
                var _materias = [];

                materias.forEach(materia =>{
                    

                    materia.assuntos.forEach(assunto =>{
        
                        if(assunto.data.localeCompare(date.americano)==0){        
                            _materias.push(new uielement_titled_subtitled_button("middle_section", materia.nome, assunto.nome, null, ()=> {
                                curTopic = assunto;
                                currSubject = materia;
                                if(assunto.link == null || assunto.link.length == 0)
                                {
                                    var url = "assuntolinks?assuntoid="+assunto.id;
                                    fetch(baseFecthUrl(url))
                                    .then(response => response.json())
                                    .then(data =>
                                    {
                                        assunto.link = [];
                                        assunto.link = data.data;
                                    });
                                }
                                drawPage("middle_section", page_topic);
                            })); 
                        }
                    });

                    
                });
                display_horizontal("middle_section", _materias);
            });
        }else{
            new uielement_h3("middle_section", "Não fizemos revisões na última semana!");
        }

    }else{
        new uielement_h3("middle_section", "Não temos revisões passadas!");
    }

}

function baseFecthUrl(path)
{
    return (!isLive) ? "http://localhost:3000/" + path : "https://pedrolourenco-test-buddy.herokuapp.com/"+path; 
}

function updateSessionStorage()
{
    sessionStorage.setItem("logged_user", JSON.stringify(user));
}

function isEmpty(str) {
    return (!str || str.length === 0 );
}
