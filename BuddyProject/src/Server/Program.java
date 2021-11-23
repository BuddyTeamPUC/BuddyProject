package Server;

import DB.*;
import DB.entities.*;

public class Program {

	public static void main(String[] args) {
		
		ConnectionSettings settings = new ConnectionSettings("localhost", "buddy", 3306, "root", "Fh$tudi0123");
		
		try 
		{
			DAO dao = new DAO();
			dao.Start(settings);
			
			dao.Insert(new Estudante(1, "Pedro", "Lourenço", "123", "123@email.com"));
			dao.Insert(new Estudante(2, "Milena", "Soares", "123", "1234@email.com"));
			dao.Insert(new Estudante(3, "Julia", "Marçal", "123", "12345@email.com"));
			dao.Insert(new Estudante(4, "Guilherme", "Mansur", "123", "123456@email.com"));
		}
		catch(Exception e)
		{
			System.out.println(e.getMessage());
		}
	}
}
