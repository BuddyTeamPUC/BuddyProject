package DB.entities;

public class Materia extends BaseEntity {
	
	String nome;
	String descricao;
	int estudante_id;
	
	public Materia(int id, String nome, String descricao, int estudante_id) 
	{
		super(id);
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.estudante_id = estudante_id;
	}
	
	public int GetId() 
	{
		return id;
	}
	
	public String GetNome() 
	{
		return nome;
	}
	
	public int GetEstudanteId() 
	{
		return estudante_id;
	}
	
	public String GetTable() 
	{
		return "materia";
	}
	
	public void Imprimir() 
	{
		System.out.println("[MATERIA]: " + id + " "  + nome + " " + estudante_id);
	}
	
	public String Insert() 
	{
		return "INSERT INTO " + GetTable() + "(id, nome, estudante_id, descricao) VALUES ("+id+",'"+nome+"',"+estudante_id+", '"+descricao+"')";
	}
	
	public String GetJson() 
	{
		return "{ \"id\": "+id+", \"nome\": \""+nome+"\", \"descricao\": \""+descricao+"\", \"estudante_id\": "+estudante_id+" }";
	}
}
