package Server.Communication;

import Server.Communication.Result.CommunicationResult;

public abstract class BaseRequest {
	
	String requestString;
	
	public BaseRequest(String requestString) 
	{
		this.requestString = requestString;
	}
	
	public abstract CommunicationResult ProcessRequest();
}
