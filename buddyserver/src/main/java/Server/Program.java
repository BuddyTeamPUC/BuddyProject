package Server;

public class Program {

	public static void main(String[] args) {
		
		ServerObject server = new ServerObject(8080);
		try {
			server.Run();
		}
		catch(Exception e) 
		{
			System.out.println(e);
		}
		
	}
}
