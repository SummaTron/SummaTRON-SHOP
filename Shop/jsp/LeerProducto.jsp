<%@ page language="java" import="java.sql.*" %>
<%@ page import = "java.sql.Connection"%>
<%@ page import = "java.sql.DriverManager"%> 
<%@ page import = "java.sql.ResultSet"%> 
<%@ page import = "java.sql.Statement"%> 
<%@ page import = "java.io.*,java.util.*, javax.servlet.*" %>
<%@include file="variables.jsp" %>  
<%
String sCuenta= request.getParameter("Cuenta");
String sLista="{'data':[";

	try
	{	
	   // Conexion con bd
	  Class.forName(sClass);
	   Connection conexion = DriverManager.getConnection(sConexion, "root", "proyecto0");
	   if (!conexion.isClosed())
	   {
		  // La consulta
		  Statement st = conexion.createStatement();		  
		  ResultSet rs = st.executeQuery("select Id, Tipo, Cuenta, Precio, Titulo_ES, Descripcion_ES, URLImagen, URLProducto, Externo from productos where Cuenta="+sCuenta);

			try {
				while ( rs.next() )
				{	
				  sLista=sLista+"{'Id':'"+rs.getString("Id")+"','Tipo':'"+rs.getString("Tipo")+"','Cuenta':'"+rs.getString("Cuenta")+"','Precio':'"+rs.getString("Precio")+"','Titulo_ES':'"+rs.getString("Titulo_ES")+"','Descripcion_ES':'"+rs.getString("Descripcion_ES")+"','URLImagen':'"+rs.getString("URLImagen")+"','URLProducto':'"+rs.getString("URLProducto")+"','Externo':'"+rs.getString("Externo")+"'},";
				}
				if (sLista.length()>9)
				{sLista = sLista.substring(0,sLista.length()-1);}
				sLista = sLista + "]}";
			}
			catch (Exception e)
			{
			   // Error en algun momento.
			   System.out.println("Excepcion "+e);
			}		  
			conexion.close();
		}
	   
	   else
		  // Error en la conexion
		  System.out.println("fallo");
	}
	catch (Exception e)
	{
	   // Error en algun momento.
	   System.out.println("Excepcion "+e);
	   e.printStackTrace();
	}
out.println(sLista.replaceAll("'","\"").trim());
%>
