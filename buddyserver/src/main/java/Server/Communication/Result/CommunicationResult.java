package Server.Communication.Result;

public class CommunicationResult {
	
	boolean status;
	String message;
	String data;
	
	public CommunicationResult(boolean status, String message, String data) 
	{
		this.status = status;
		this.message = message;
		this.data = data;
	}
	
	public boolean GetStatus() 
	{
		return status;
	}
	
	public String GetMessage() 
	{
		return message;
	}
	
	public String GetJson() 
	{
		String fetchedData = !data.isEmpty() ? data : "\"\"";
		return "{ \"status\": "+status+", \"message\":\""+message+"\", \"data\": "+fetchedData+" }";
	}
}
