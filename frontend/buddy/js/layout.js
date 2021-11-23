function display_horizontal(parent, content)
{
        var guid = generateUUID();
        var classNaame = "display_horizontal " + guid;

        $("."+parent).append("<div class='"+classNaame+"'>");
        
        content.forEach(element => {
            
            element.style = 
            {
                'margin_right': '10px'
            };
             
            element.setStyle();
            $("."+element.id).detach().appendTo("."+guid);
            $("."+element.id).css("width", "fit-content");
            $("."+element.id).css("display", "inline-block");
        });
}