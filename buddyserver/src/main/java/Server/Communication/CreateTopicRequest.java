package Server.Communication;

import utils.*;
import DB.ConnectionSettings;
import DB.DAO;
import DB.entities.Assunto;
import Server.Communication.Result.CommunicationResult;

public class CreateTopicRequest extends BaseRequest {

	//Layout: materia_id=x&nome=y&descricao=z
	
	int materia_id;
	String nome;
	String descricao;
	String data;
	
	public CreateTopicRequest(String requestString) 
	{
		super(requestString);
		
		String[] infoLines = requestString.split("\\?")[1].split("&");
		this.materia_id = Integer.parseInt(infoLines[0].split("=")[1].replace("%20", " "));
		this.nome = infoLines[1].split("=")[1].replace("%20", " ");
		this.descricao = infoLines[2].split("=")[1].replace("%20", " ");
		this.data = infoLines[3].split("=")[1];
	}
	
	public CommunicationResult ProcessRequest() 
	{
		DAO dao = new DAO();
		try 
		{
			dao.Start(new ConnectionSettings("localhost", "buddy", 3306, "root", "Fh$tudi0123"));
			
			Assunto[] assuntos = dao.GetAssuntos();
			int id = (assuntos != null && assuntos.length > 0) ? assuntos.length : 0;
			
			Assunto newTopic = new Assunto(id, nome, materia_id, 0, data, descricao);
			
			dao.Insert(newTopic);
			
			return new CommunicationResult(true, "Topic successfully added", newTopic.GetJson());
		}
		catch(Exception e) 
		{
			System.out.println("RegisterRequest: " + e.getMessage());
			return new CommunicationResult(false, e.getMessage(), "");
		}
	}
}
