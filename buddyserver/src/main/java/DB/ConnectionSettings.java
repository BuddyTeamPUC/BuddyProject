package DB;

public class ConnectionSettings {
	
	private String driverName;
	private String serverName;
	private String databaseName;
	private int port;
	private String username;
	private String pass;
	
	public ConnectionSettings(String serverName, String dataBaseName, int port, String username, String pass) 
	{
		this.serverName = serverName;
		this.databaseName = dataBaseName;
		this.port = port;
		this.username = username;
		this.pass = pass;
	}
	
	public void SetDriverName(String name) throws ClassNotFoundException 
	{
		driverName = name;
		Class.forName(driverName);
	}
	
	public String GetUrl() throws ClassNotFoundException 
	{
		SetDriverName("com.mysql.cj.jdbc.Driver");
		return "jdbc:mysql://" + serverName + ":" + port + "/" + databaseName;
	}
	
	public String GetServerName() 
	{
		return serverName;
	}
	
	public String GetDataBaseName() 
	{
		return databaseName;
	}
	
	public int GetPort() 
	{
		return port;
	}
	
	public String GetUsername() 
	{
		return username;
	}
	
	public String GetPass() 
	{
		return pass;
	}
}
