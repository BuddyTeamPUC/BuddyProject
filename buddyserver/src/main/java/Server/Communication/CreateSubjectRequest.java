package Server.Communication;

import DB.ConnectionSettings;
import DB.DAO;
import DB.entities.Assunto;
import DB.entities.Materia;
import Server.Communication.Result.CommunicationResult;

public class CreateSubjectRequest extends BaseRequest {

	int user_id;
	String nome;
	String descricao;
	
	///addmateria?user_id=xnome=Ac%20I&descricao=uma%20materia%20bem%20bleeh
	
	public CreateSubjectRequest(String requestString) 
	{
		super(requestString);
		String[] infoLines = requestString.split("\\?")[1].split("&");
		this.user_id = Integer.parseInt(infoLines[0].split("=")[1].replace("%20", " "));
		this.nome = infoLines[1].split("=")[1].replace("%20", " ");
		this.descricao = infoLines[2].split("=")[1].replace("%20", " ");
	}
	
	public CommunicationResult ProcessRequest() 
	{
		DAO dao = new DAO();
		try 
		{
			dao.Start(new ConnectionSettings("localhost", "buddy", 3306, "root", "Fh$tudi0123"));
			
			Materia[] materias = dao.GetMaterias();
			int id = (materias != null && materias.length > 0) ? materias.length : 0;
			
			Materia newSubject = new Materia(id, nome, descricao, user_id);
			
			dao.Insert(newSubject);
			
			return new CommunicationResult(true, "Topic successfully added", newSubject.GetJson());
		}
		catch(Exception e) 
		{
			System.out.println("RegisterRequest: " + e.getMessage());
			return new CommunicationResult(false, e.getMessage(), "");
		}
	}
}
