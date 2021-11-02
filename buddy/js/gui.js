
const subjects = [];
var curTopic = null;
var currSubject = null;

$( document ).ready(function()
{
    drawPage("middle_section", teste);
    readtex
    console.log();
});

function drawPage(parent, pageFunction)
{
    $("."+parent).html("");
    $(".footer_section").html("");
    pageFunction();
    page_drawSideSection();
}

function page_drawSideSection()
{
    new uielement_rounded_button("side_section", "+ Criar");
}

// PEDRO

// JULIA

function page_dashboard()
{
    new uielement_h1("middle_section", "Olá, Pedro", null, { 'margin_bottom': '-30px' });
    new uielement_h2("middle_section", "Vai revisar alguma coisa hoje ?");
    
    new uielement_h2("middle_section", "Hoje");

    display_horizontal("middle_section", 
    [
        new uielement_titled_subtitled_button("middle_section", "Aeds", "Somatório", null, ()=> {  }),
        new uielement_titled_subtitled_button("middle_section", "Inglês", "To be", null, ()=> {  }),
    ]);
    
    new uielement_h2("middle_section", "Out. 19");

    display_horizontal("middle_section", 
    [
        new uielement_titled_subtitled_button("middle_section", "Aeds", "Lista e Pilha", null, ()=> { }),
    ]);
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