package DB;

import java.sql.*;
import DB.entities.*;

public class DAO {
	
	private Connection conn;
	
	public DAO() 
	{
		conn = null;
	}
	
	public boolean Start(ConnectionSettings settings) throws Exception
	{
		boolean status = false;
		
		try 
		{
			System.out.println("Connecting with: " + settings.GetUsername() + " " + settings.GetPass());
			conn = DriverManager.getConnection(settings.GetUrl(), settings.GetUsername(), settings.GetPass());
			status = !(conn == null);
			System.out.println("Connected...");
		}
		catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return false;
	}
	
	public boolean Close() throws Exception
	{
		boolean status = false;
		
		try 
		{
			conn.close();
			status = true;
		}
		catch(Exception e) 
		{
			System.err.print(e.getMessage());
		}
		
		return status;
	}
	
	public Estudante[] GetEstudantes() 
	{
		Estudante[] estudantes = null;
		
		try 
		{
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM estudante");
			if(rs.next()) 
			{
				rs.last();
				estudantes = new Estudante[rs.getRow()];
				rs.beforeFirst();
				
				for(int i = 0; rs.next(); i++) 
				{
					estudantes[i] = new Estudante(rs.getInt("id"), rs.getString("nome"), rs.getString("sobrenome"), rs.getString("senha"), rs.getString("email"));
				}
			}
			System.out.println("Returnin with " + estudantes.length + " datas...");
			st.close();
		}catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return estudantes;
	}
	
	public Materia[] GetMaterias(int estudanteId)
	{
		Materia[] materias = null;
		
		try 
		{
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM materia WHERE estudante_id = " + estudanteId);
			if(rs.next()) 
			{
				rs.last();
				materias = new Materia[rs.getRow()];
				rs.beforeFirst();
				
				for(int i = 0; rs.next(); i++) 
				{
					materias[i] = new Materia(rs.getInt("id"), rs.getString("nome"), rs.getString("descricao"), estudanteId);
				}
			}
			System.out.println("Returnin with " + materias.length + " datas...");
			st.close();
		}catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return materias;
	}
	
	public Materia[] GetMaterias()
	{
		Materia[] materias = null;
		
		try 
		{
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM materia");
			if(rs.next()) 
			{
				rs.last();
				materias = new Materia[rs.getRow()];
				rs.beforeFirst();
				
				for(int i = 0; rs.next(); i++) 
				{
					materias[i] = new Materia(rs.getInt("id"), rs.getString("nome"), rs.getString("descricao"), rs.getInt("estudante_id"));
				}
			}
			System.out.println("Returnin with " + materias.length + " datas...");
			st.close();
		}catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return materias;
	}
	
	public Assunto[] GetAssuntos()
	{
		Assunto[] assuntos = null;
		
		try 
		{
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM assunto");
			if(rs.next()) 
			{
				rs.last();
				assuntos = new Assunto[rs.getRow()];
				rs.beforeFirst();
				
				for(int i = 0; rs.next(); i++) 
				{
					assuntos[i] = new Assunto(rs.getInt("id"), rs.getString("nome"), rs.getInt("materia_guid"), rs.getInt("horas_estudadas"), rs.getDate("lembrete").toString(), rs.getString("descricao"));
				}
			}
			System.out.println("Returnin with " + assuntos.length + " datas...");
			st.close();
		}catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return assuntos;
	}
	
	public Assunto[] GetAssuntos(int materiaId)
	{
		Assunto[] assuntos = null;
		
		try 
		{
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM assunto WHERE materia_guid = " + materiaId);
			if(rs.next()) 
			{
				rs.last();
				assuntos = new Assunto[rs.getRow()];
				rs.beforeFirst();
				
				for(int i = 0; rs.next(); i++) 
				{
					assuntos[i] = new Assunto(rs.getInt("id"), rs.getString("nome"), materiaId, rs.getInt("horas_estudadas"), rs.getDate("lembrete").toString(), rs.getString("descricao"));
				}
			}
			System.out.println("Returnin with " + assuntos.length + " datas...");
			st.close();
		}catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return assuntos;
	}
	
	public Materiais_link[] GetAssuntosMaterial(int assuntoId)
	{
		Materiais_link[] links = null;
		
		try 
		{
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM materiais_link WHERE assunto_id = " + assuntoId);
			if(rs.next()) 
			{
				rs.last();
				links = new Materiais_link[rs.getRow()];
				rs.beforeFirst();
				
				for(int i = 0; rs.next(); i++) 
				{
					links[i] = new Materiais_link(rs.getInt("id"), rs.getString("nome"), rs.getString("links"), assuntoId);
				}
			}
			System.out.println("Returnin with " + links.length + " datas...");
			st.close();
		}catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return links;
	}
	
	public Estudante GetEstudante(int id) 
	{
		Estudante estudante = null;
		
		try 
		{
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM estudante WHERE id = " + id);
			if(rs.next()) 
			{
				estudante = new Estudante(id, rs.getString("nome"), rs.getString("sobrenome"), rs.getString("senha"), rs.getString("email"));
			}
			st.close();
		}catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return estudante;
	}
	
	public Estudante GetEstudante(String email) 
	{
		Estudante estudante = null;
		
		try 
		{
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM estudante WHERE email = '" + email + "'");
			if(rs.next()) 
			{
				estudante = new Estudante(rs.getInt("id"), rs.getString("nome"), rs.getString("sobrenome"), rs.getString("senha"), email);
			}
			st.close();
		}catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return estudante;
	}
	
	public Estudante GetEstudante(String email, String pass) 
	{
		Estudante estudante = null;
		
		try 
		{
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM estudante WHERE email = '" + email + "' AND senha = '"+pass+"'");
			if(rs.next()) 
			{
				estudante = new Estudante(rs.getInt("id"), rs.getString("nome"), rs.getString("sobrenome"), pass, email);
			}
			st.close();
		}catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return estudante;
	}
	
	public void Insert(BaseEntity entity) 
	{
		boolean status = false;
		try 
		{
			Statement st = conn.createStatement();
			st.executeUpdate(entity.Insert());
			st.close();
			status = true;
			System.out.print("INSERT COMPLETED: ");
			entity.Imprimir();
		}catch(Exception e) 
		{
			System.out.println(e.getMessage());
		}
	}
	
	public boolean RemoveEntity(BaseEntity entity) 
	{
		boolean status = false;
		try 
		{
			Statement st = conn.createStatement();
			st.executeUpdate("DELETE FROM " + entity.GetTable() + " WHERE id = " + entity.GetId());
			st.close();
			System.out.print("Removing: ");
			entity.Imprimir();
			status = true;
		}
		catch(Exception e) 
		{
			System.err.println(e.getMessage());
		}
		
		return status;
	}
}
