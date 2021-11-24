package Server.Communication;

import DB.*;
import DB.entities.Estudante;
import Server.Communication.Result.CommunicationResult;

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
	
	public CommunicationResult ProcessRequest() 
	{
		DAO dao = new DAO();
		try 
		{
			dao.Start(new ConnectionSettings("localhost", "buddy", 3306, "root", "Fh$tudi0123"));
			 
			Estudante estudante = dao.GetEstudante(email);
			
			if(estudante != null) 
			{
				return new CommunicationResult(false, "Email already taken", "");
			}
			
			Estudante[] estudantes = dao.GetEstudantes();
			
			int id = estudantes != null && estudantes.length > 0 ? estudantes.length : 0;
			
			dao.Insert(new Estudante(id, name, lastName, pass, email));
			dao.Close();
			return new CommunicationResult(true, "Register process complete", "");
		}
		catch(Exception e) 
		{
			System.out.println("RegisterRequest: " + e.getMessage());
			return new CommunicationResult(false, e.getMessage(), "");
		}
	}
}
