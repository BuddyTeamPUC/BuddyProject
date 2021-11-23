package Server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerObject {
	int port;
	
	public ServerObject(int port) 
	{
		this.port = port;
	}
	
	public void Start() throws IOException 
	{
		try(ServerSocket server = new ServerSocket(port))
		{
			
			System.out.println("Server started at port: " + port);
			
			while(true) 
			{
				try(Socket client = server.accept())
				{
					InputStreamReader isr = new InputStreamReader(client.getInputStream());
					
					BufferedReader br = new BufferedReader(isr);
					
					StringBuilder request = new StringBuilder();
					String line = br.readLine();
					
					while(!line.isBlank()) 
					{
						request.append(line + "\r\n");
						line = br.readLine();
					}
					
					System.out.println(request);
				}
			}
		}
	}
}
