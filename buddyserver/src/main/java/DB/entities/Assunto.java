package DB.entities;

public class Assunto extends BaseEntity {
	
	String nome;
	int materia_id;
	int horasEstudadas;
	String lembrete;
	
	public Assunto(int id, String nome, int materia_id, int horasEstudadas, String lembrete) 
	{
		super(id);
		this.nome = nome;
		this.materia_id = materia_id;
		this.horasEstudadas = horasEstudadas;
		this.lembrete = lembrete;
	}
	
	public String GetTable()
	{
		return "assunto";
	}

	public int GetId() 
	{
		return id;
	}
	
	public String GetNome() 
	{
		return nome;
	}
	
	public int GetMateria_id() 
	{
		return materia_id;
	}
	
	public int GetHorasEstudadas() 
	{
		return horasEstudadas;
	}
	
	public String GetLembrete() 
	{
		return lembrete;
	}
	
	public void Imprimir() 
	{
		System.out.println("[EVENTO]: " + id + " " + nome + " " + materia_id + " " + horasEstudadas + " " + lembrete);
	}
	
	public String Insert() 
	{
		return "INSERT (" + id +  "," + nome + "," + materia_id + "," + horasEstudadas + ", " + lembrete + ") INTO " + GetTable();
	}
}
