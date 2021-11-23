package DB.entities;

public class Evento extends BaseEntity {
	
	String nome;
	String data;
	String descricao;
	
	public Evento(int id, String nome, String data, String descricao) 
	{
		super(id);
		this.id = id;
		this.nome = nome;
		this.data = data;
		this.descricao = descricao;
	}
	
	public int GetId() 
	{
		return id;
	}
	
	public String GetNome() 
	{
		return nome;
	}
	
	public String GetData() 
	{
		return data;
	}
	
	public String GetDescricao() 
	{
		return descricao;
	}
	
	public String GetTable() 
	{
		return "evento";
	}
	
	public void Imprimir() 
	{
		System.out.println("[EVENTO]: " + id + " " + nome + " " + data + " " + descricao);
	}
	
	public String Insert() 
	{
		return "INSERT (" + id +  "," + nome + "," + data + "," + descricao + ") INTO " + GetTable();
	}
}
