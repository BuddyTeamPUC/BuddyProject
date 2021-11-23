package Server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

import Server.Communication.RegisterRequest;

public class ServerObject {
	int port;
	
	public ServerObject(int port) 
	{
		this.port = port;
	}
	
	public void Run() throws IOException 
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
					
					ProcessRequest(client, GetRequest(request.toString()));
					
					client.close();
				}
			}
		}
	}
	
	String GetRequest(String request) 
	{
		String line = request.split("\n")[0];
		return line.split(" ")[1];
	}
	
	void Write(Socket client, String data) throws IOException 
	{
		OutputStream clientOutput = client.getOutputStream();
		clientOutput.write(("HTTP/1.1 200 OK\r\n").getBytes());
		clientOutput.write(("Access-Control-Allow-Origin: *\r\n").getBytes());
		clientOutput.write(("\r\n").getBytes());
		clientOutput.write((data+"\r\n").getBytes());
		clientOutput.flush();
		clientOutput.close();
	}
	
	void ProcessRequest(Socket client, String request) throws IOException 
	{
		if(request.contains("/register")) 
		{
			RegisterRequest registerRequest = new RegisterRequest(request);
			if(registerRequest.ProcessRequest()) 
			{
				System.out.println("Request processed successfully");
				Write(client, Ok());
			}
		}
		else 
		{
			System.out.println("Invalid request: " + request);
		}
	}
	
	String Ok() 
	{
		return "{\"response\" : \"OK\"}";
	}
}
