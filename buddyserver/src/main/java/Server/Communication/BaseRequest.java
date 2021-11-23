package Server.Communication;

public abstract class BaseRequest {
	
	String requestString;
	
	public BaseRequest(String requestString) 
	{
		this.requestString = requestString;
	}
	
	public abstract boolean ProcessRequest();
}
