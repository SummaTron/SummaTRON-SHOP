<%@ page language="java" import="java.sql.*" %>
<%@ page import = "java.sql.Connection"%>
<%@ page import = "java.sql.DriverManager"%> 
<%@ page import = "java.sql.ResultSet"%> 
<%@ page import = "java.sql.Statement"%> 
<%@ page import = "java.io.*,java.util.*, javax.servlet.*" %>
<%@include file="variables.jsp" %>  
<%
String sId= request.getParameter("Id").replaceAll("'","");
String sLista="{'result':'Error. Product not deleted'}";

	try
	{	
	   // Conexion con bd
		Class.forName(sClass);
		Connection conexion = DriverManager.getConnection(sConexion, "root", "proyecto0");
	   if (!conexion.isClosed())
	   {
		  // La consulta
		  Statement st = conexion.createStatement();		  
		  st.executeUpdate("DELETE FROM productos where Id='"+ sId +"'");
		  sLista="{'result':'Product deleted'}";
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
