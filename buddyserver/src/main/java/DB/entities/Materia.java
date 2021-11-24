package DB.entities;

public class Materia extends BaseEntity {
	
	String nome;
	int estudante_id;
	
	public Materia(int id, String nome, int estudante_id) 
	{
		super(id);
		this.id = id;
		this.nome = nome;
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
		return "INSERT INTO " + GetTable() + "(id, nome, estudante_id) VALUES ('"+id+"','"+nome+"','"+estudante_id+"')";
	}
	
	public String GetJson() 
	{
		return "{ \"id\": "+id+", \"nome\": \""+nome+"\", \"estudante_id\": "+estudante_id+" }";
	}
}
