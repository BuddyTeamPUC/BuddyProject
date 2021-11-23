package DB.entities;

public class Estudante extends BaseEntity {
	
	String nome;
	String sobrenome;
	String senha;
	String email;
	
	public Estudante(int id, String nome, String sobrenome, String senha, String email) 
	{
		super(id);
		this.nome = nome;
		this.senha = senha;
		this.email = email;
		this.sobrenome = sobrenome;
	}
	
	public int GetId() 
	{
		return id;
	}
	
	public String GetNome() 
	{
		return nome;
	}
	
	public String GetSobreNome() 
	{
		return sobrenome;
	}
	
	public String Email() 
	{
		return email;
	}
	
	public String GetSenha() 
	{
		return senha;
	}
	
	public String GetEmail() 
	{
		return email;
	}
	
	public void Imprimir()
	{
		System.out.println("Id: " + id + " Nome: "  + nome  + " Senha: " + senha + " Email:" + email);
	}
	
	public String GetTable() 
	{
		return "estudante";
	}
	
	public String Insert() 
	{
		return "INSERT INTO "+ GetTable() + " (id, nome, sobrenome, senha, email) VALUES (" + id +  ",'" + nome + "','" + sobrenome + "','" + senha + "', '" + email + "')";
	}
}













