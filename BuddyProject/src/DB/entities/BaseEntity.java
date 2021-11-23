package DB.entities;

public abstract class BaseEntity {
	
	int id;
	
	public BaseEntity(int id) 
	{
		this.id = id;
	}
	
	public int GetId() 
	{
		return id;
	}
	
	public abstract String GetTable();
	public abstract String Insert();
	
	public abstract void Imprimir();
	
}
