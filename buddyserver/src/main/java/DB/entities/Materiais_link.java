package DB.entities;

public class Materiais_link extends BaseEntity{
	
	String link;
	String nome;
	int assunto_id;
		
	public Materiais_link(int id, String nome, String link, int assunto_id) 
	{
		super(id);
		this.id = id;
		this.nome = nome;
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
		return "materiais_link";
	}
	
	public void Imprimir() 
	{
		System.out.println("[MATERIAIS_LINK]: " + id + " " + link + " " + assunto_id);
	}
	
	public String Insert() 
	{
		return "INSERT INTO "+GetTable()+" (id, nome, links, assunto_id) VALUES ("+ id +  ",'"+nome+"','" + link + "'," + assunto_id + ")";
	}
	
	public String GetJson() 
	{
		return "{ \"id\": "+id+", \"nome\": \""+nome+"\", \"link\": \""+link+"\", \"assunto_id\": "+assunto_id+" }";
	}
	
}
