package Server.Communication;

import DB.*;
import DB.entities.Estudante;

public class RegisterRequest extends BaseRequest{

	private String name;
	private String lastName;
	private String email;
	private String pass;
	
	//EXPTECTED REQUEST LAYOUT: /register?name=a&sobrenome=a&email=a&pass=a
	
	public RegisterRequest(String requestString) {
		super(requestString);
		
		String[] infos = requestString.split("\\?")[1].split("&");
		name = infos[0].split("=")[1];
		lastName = infos[1].split("=")[1];
		email = infos[2].split("=")[1];
		pass = infos[3].split("=")[1];
	}
	
	public boolean ProcessRequest() 
	{
		DAO dao = new DAO();
		try 
		{
			dao.Start(new ConnectionSettings("localhost", "buddy", 3306, "root", "Fh$tudi0123"));
			int id = dao.GetEstudantes().length;
			dao.Insert(new Estudante(id, name, lastName, pass, email));
			dao.Close();
			return true;
		}
		catch(Exception e) 
		{
			System.out.println("RegisterRequest: " + e.getMessage());
			return false;
		}
	}
}
