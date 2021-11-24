package Server.Communication;

import DB.ConnectionSettings;
import DB.DAO;
import DB.entities.Assunto;
import Server.Communication.Result.CommunicationResult;

public class CreateTopicRequest extends BaseRequest {

	String nome;
	String descricao;
	
	///addmateria?nome=Ac%20I&descricao=uma%20materia%20bem%20bleeh
	
	public CreateTopicRequest(String requestString) 
	{
		super(requestString);
		String[] infoLines = requestString.split("\\?")[1].split("&");
		this.nome = infoLines[0].split("=")[1].replace("%20", " ");
		this.descricao = infoLines[1].split("=")[1].replace("%20", " ");
	}
	
	public CommunicationResult ProcessRequest() 
	{
		DAO dao = new DAO();
		try 
		{
			dao.Start(new ConnectionSettings("localhost", "buddy", 3306, "root", "Fh$tudi0123"));
			dao.Insert(new Assunto(100, nome, 0, 0, "2021-11-30"));
			return new CommunicationResult(true, "Topic successfully added", "");
		}
		catch(Exception e) 
		{
			System.out.println("RegisterRequest: " + e.getMessage());
			return new CommunicationResult(false, e.getMessage(), "");
		}
	}
}
