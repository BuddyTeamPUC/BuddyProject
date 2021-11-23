package Server;

import java.io.IOException;

import DB.*;
import DB.entities.*;

public class Program {

	public static void main(String[] args) throws IOException {
		
		ServerObject server = new ServerObject(8000);
		server.Start();
	}
}
