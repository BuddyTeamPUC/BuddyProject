package Server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

import com.mysql.cj.xdevapi.Client;

import Server.Communication.*;
import Server.Communication.Result.*;

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
		clientOutput.write(("Content-Type: text/json\r\n").getBytes());
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
			CommunicationResult result = registerRequest.ProcessRequest();
			Write(client, result.GetJson());
		}
		else if(request.contains("/login")) 
		{
			LoginRequest loginRequest = new LoginRequest(request);
			CommunicationResult result = loginRequest.ProcessRequest();
			Write(client, result.GetJson());
		}
		else if(request.contains("/materiais")) 
		{
			MateriaisRequest materiaisRequest = new MateriaisRequest(request);
			CommunicationResult result = materiaisRequest.ProcessRequest();
			Write(client, result.GetJson());
		}
		else if(request.contains("/assuntos")) 
		{
			TopicsRequest topicsRequest = new TopicsRequest(request);
			CommunicationResult result = topicsRequest.ProcessRequest();
			Write(client, result.GetJson());
		}
		else if(request.contains("/addmateria")) 
		{
			CreateSubjectRequest createSubjectRequest = new CreateSubjectRequest(request);
			CommunicationResult result = createSubjectRequest.ProcessRequest();
			Write(client, result.GetJson());
		}
		else if(request.contains("/addassunto")) 
		{
			CreateTopicRequest createTopicRequest = new CreateTopicRequest(request);
			CommunicationResult result = createTopicRequest.ProcessRequest();
			Write(client, result.GetJson());
		}
		else if(request.contains("/assuntolink")) 
		{
			AssuntoLinksRequest assuntoLinksRequest = new AssuntoLinksRequest(request);
			CommunicationResult result = assuntoLinksRequest.ProcessRequest();
			Write(client, result.GetJson());
		}
		else if(request.contains("/addlink")) 
		{
			CreateLinkRequest createLinkRequest = new CreateLinkRequest(request);
			CommunicationResult result = createLinkRequest.ProcessRequest();
			Write(client, result.GetJson());
		}
		else 
		{
			System.out.println("Invalid request: " + request);
		}
	}
}
