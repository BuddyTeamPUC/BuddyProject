class uielement
{
    constructor(_parent, _data, _onDataChanged, style)
    {
        this.parent = _parent;
        this.data = _data;
        this.onDataChanged = _onDataChanged;
        this.id = generateUUID();
        this.tag = "";
        this.itemClass = "item "+this.id;
        this.style = style;
        this.tagStyle = null;
        this.html = null;
        this.attributes = [];
    }

    setData(_data)
    {
        this.data = _data;

        if(this.onDataChanged != null)
            this.onDataChanged();

        this.draw(this.data)
    }

    onMouseEnter(handler)
    {
        $("."+this.id).mouseenter(handler);
    }
    
    draw(content)
    {
        this.html = '<'+this.tag+' class="'+this.tag+'_'+this.id+'">'+content+'</'+this.tag+'>';
        $("."+this.id).html(this.html);
        this.setStyle(this.style);

        this.updateAttr();
    }
    
    addClass(target)
    {
        $("."+this.tag+"_"+this.id).addClass(target);
    }
    
    addAttribute(attr, value)
    {
        var attrObj = new Object();
        attrObj['name'] = attr;
        attrObj['value'] = value;
        this.attributes.push(attrObj);
        this.updateAttr();
    }

    updateAttr()
    {
        this.attributes.forEach(el => 
        {
            $("."+this.tag+"_"+this.id).attr(el.name, el.value);
        });
    }

    setStyle()
    {
        if(this.style == null)
            return;

        $("."+this.id).css("margin", this.style.margin);
        $("."+this.id).css("margin-top", this.style.margin_top);
        $("."+this.id).css("margin-bottom", this.style.margin_bottom);
        $("."+this.id).css("margin-left", this.style.margin_left);
        $("."+this.id).css("margin-right", this.style.margin_right);
        
        $("."+this.id).css("width", this.style.width);
        $("."+this.id).css("max-width", this.style.max_width);
        $("."+this.id).css("min-width", this.style.min_width);

        $("."+this.id).css("height", this.style.height);
        $("."+this.id).css("max-height", this.style.max_height);
        $("."+this.id).css("min-height", this.style.min_height);

        $("."+this.id).css("padding", this.style.padding);
        $("."+this.id).css("padding-top", this.style.padding_top);
        $("."+this.id).css("padding-bottom", this.style.padding_bottom);
        $("."+this.id).css("padding-left", this.style.padding_left);
        $("."+this.id).css("padding-right", this.style.padding_right);

        $("."+this.id).css("background-color", this.style.background_color);
        $("."+this.id).css("color", this.style.font_color);

        $("."+this.id).css("font-weight", this.style.font_weight);

        $("."+this.id).css("text-decoration", this.style.text_decoration);

        $("."+this.id).css("transition", this.style.transition);
    

        $("."+this.id).css("transform", this.style.transform);
        
        $("."+this.id).css("cursor", this.style.cursor);
        
        $("."+this.id).css("border", this.style.border);
        $("."+this.id).css("border-radius", this.style.border_radius);
        $("."+this.id).css("border-style", this.style.border_style);
        
        $("."+this.id).css("right", this.style.right);
        $("."+this.id).css("left", this.style.left);
        $("."+this.id).css("float", this.style.float);
    }

    setTagStyle()
    {
        if(this.tagStyle == null)
            return;

        $("."+this.tag + "_" +this.id).css("margin", this.tagStyle.margin);
        $("."+this.tag + "_" +this.id).css("margin-top", this.tagStyle.margin_top);
        $("."+this.tag + "_" +this.id).css("margin-bottom", this.tagStyle.margin_bottom);
        $("."+this.tag + "_" +this.id).css("margin-left", this.tagStyle.margin_left);
        $("."+this.tag + "_" +this.id).css("margin-right", this.tagStyle.margin_right);
        
        $("."+this.tag + "_" +this.id).css("width", this.tagStyle.width);
        $("."+this.tag + "_" +this.id).css("max-width", this.tagStyle.max_width);
        $("."+this.tag + "_" +this.id).css("min-width", this.tagStyle.min_width);

        $("."+this.tag + "_" +this.id).css("height", this.tagStyle.height);
        $("."+this.tag + "_" +this.id).css("max-height", this.tagStyle.max_height);
        $("."+this.tag + "_" +this.id).css("min-height", this.tagStyle.min_height);

        $("."+this.tag + "_" +this.id).css("padding", this.tagStyle.padding);
        $("."+this.tag + "_" +this.id).css("padding-top", this.tagStyle.padding_top);
        $("."+this.tag + "_" +this.id).css("padding-bottom", this.tagStyle.padding_bottom);
        $("."+this.tag + "_" +this.id).css("padding-left", this.tagStyle.padding_left);
        $("."+this.tag + "_" +this.id).css("padding-right", this.tagStyle.padding_right);

        $("."+this.tag + "_" +this.id).css("background-color", this.tagStyle.background_color);
        $("."+this.tag + "_" +this.id).css("color", this.tagStyle.font_color);

        $("."+this.tag + "_" +this.id).css("font-weight", this.tagStyle.font_weight);
        
        $("."+this.tag + "_" +this.id).css("transition", this.tagStyle.transition);

        $("."+this.tag + "_" +this.id).css("transform", this.tagStyle.transform);
        
        $("."+this.tag + "_" +this.id).css("cursor", this.tagStyle.cursor);
        
        $("."+this.tag + "_" +this.id).css("border", this.tagStyle.border);
        $("."+this.tag + "_" +this.id).css("border-radius", this.tagStyle.border_radius);
        $("."+this.tag + "_" +this.id).css("border-style", this.tagStyle.border_style);
        
        $("."+this.tag + "_" +this.id).css("right", this.tagStyle.right);
        $("."+this.tag + "_" +this.id).css("left", this.tagStyle.left);
        $("."+this.tag + "_" +this.id).css("float", this.tagStyle.float);
    }

    addEvent(eventName, action)
    {
        $("."+this.id).children().on(eventName, action);
    }
}

class uielement_h1 extends uielement
{
    constructor(parent, data, onDataChanged, style)
    {
        super(parent, data, onDataChanged, style);
        this.tag = "h1";
        $("."+parent).append("<div class='"+this.itemClass+"'></div>");
        this.draw(data);
    }
}

class uielement_h2 extends uielement
{
    constructor(parent, data, onDataChanged, style)
    {
        super(parent, data, onDataChanged, style);
        this.tag = "h2";
        $("."+parent).append("<div class='"+this.itemClass+"'></div>");
        this.draw(data);
    }
}

class uielement_h3 extends uielement
{
    constructor(parent, data, onDataChanged, style)
    {
        super(parent, data, onDataChanged, style);
        this.tag = "h3";
        $("."+parent).append("<div class='"+this.itemClass+"'></div>");
        this.redraw = this.draw(data);
    }
}


class uielement_button extends uielement
{
    constructor(parent, _buttonLabel, data, _onClick, _onDataChanged, style)
    {
        super(parent, data, _onDataChanged, style);
        this.buttonLabel = _buttonLabel;
        this.tag = "button";
        
        $("."+parent).append("<div class='"+this.itemClass+"'></div>");
        this.draw(this.buttonLabel);
        
        $("."+this.tag+'_'+this.id).click(_onClick);
    }
}

class uielement_titled_subtitled_button extends uielement
{
    constructor(parent, _buttonLabel, subtitle, data, _onClick, _onDataChanged, style)
    {
        super(parent, data, _onDataChanged, style);
        this.buttonLabel = _buttonLabel;
        this.buttonSubtitle = subtitle;
        this.tag = "button";
        
        $("."+parent).append("<div class='"+this.itemClass+"'></div>");
        this.draw
        (
            "<h3>"+this.buttonLabel+"</h3>" +
            "<h3>"+this.buttonSubtitle+"</h3>"
            );
        
            this.addClass("titled_subtitled_button");
            
            $("."+this.tag+'_'+this.id).click(_onClick);
        }
}

class uielement_rounded_button extends uielement
{
    constructor(parent, _buttonLabel, data, _onClick, _onDataChanged, style)
    {
        super(parent, data, _onDataChanged, style);
        this.buttonLabel = _buttonLabel;
        this.tag = "button";
        
        $("."+parent).append("<div class='"+this.itemClass+"'></div>");
        this.draw("<h3>"+this.buttonLabel+"</h3>");
        
        this.addClass("rounded_button");
        
        $("."+this.tag+'_'+this.id).click(_onClick);
    }
}

class uielement_inputfield extends uielement
{
    constructor(parent, _placeholder, data, _onDataChanged, style)
    {
        super(parent, data, _onDataChanged, style);
        this.placeholder = _placeholder;
        this.tag = "input";
        
        $("."+parent).append("<div class='"+this.itemClass+"'></div>");
        
        this.draw("");
        
        $("."+this.id).on('change', ()=>
        {
            this.setData( $("."+this.tag+'_'+this.id).val().trim() );
            this.draw(data);
        });
        
        this.addAttribute("type", "text");
    }

    draw()
    {
        this.html = '<'+this.tag+' class="'+this.tag+'_'+this.id+'" placeholder="'+this.placeholder+'" value="'+this.data+'""></'+this.tag+'>';
        $("."+this.id).html(this.html);
        this.setStyle(this.style);
        this.updateAttr();
    }
}

class uielement_hyperlink extends uielement_h1
{
    constructor(parent, data, onDataChanged, style)
    {
        super(parent, data, onDataChanged, style);
        console.log("Desenhar incone");
    }
}

class uielement_h3_hyperlink extends uielement_h3
{
    constructor(parent, data, onDataChanged,link, style)
    {
        
        super(parent,data,onDataChanged,style);
        this.style={"font_color" : "blue"};
        this.setStyle();   
        this.link = link;
        this.addEvent("click",()=>{
            window.open(this.link);
        });
        this.addEvent("mouseenter",()=>{
            this.style={
                "cursor" : "pointer",
                "font_color" : "blue",
                "text_decoration" : "underline",
            }
            this.setStyle();
        })
        this.addEvent("mouseleave",()=>{
            this.style={
                "cursor" : "normal",
                "font_color" : "blue",
                "text_decoration" : "none",
            }
            this.setStyle();
        })
        
    }
    draw(data){
        super.draw(data);
        this.addAttribute("style","display : inline-block");
        $("."+ this.id).append("<img src='../buddy/img/external_link_icon.svg' width= 18px style= 'padding-left : 4px; margin-top : 50px'>");
    }
}