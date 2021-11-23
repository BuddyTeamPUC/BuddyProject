package DB.entities;

public class Materiais_link extends BaseEntity{
	
	String link;
	int assunto_id;
		
	public Materiais_link(int id, String link, int assunto_id) 
	{
		super(id);
		this.id = id;
		this.link = link;
		this.assunto_id = assunto_id;
	}
	
	public int GetId() 
	{
		return id;
	}
	
	public String GetLink() 
	{
		return link;
	}
	
	public int AssuntoId() 
	{
		return assunto_id;
	}
	
	public String GetTable() 
	{
		return "material";
	}
	
	public void Imprimir() 
	{
		System.out.println("[MATERIAIS_LINK]: " + id + " " + link + " " + assunto_id);
	}
	
	public String Insert() 
	{
		return "INSERT (" + id +  "," + link + "," + assunto_id + ") INTO " + GetTable();
	}
	
}
