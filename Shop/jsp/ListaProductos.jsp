<%@ page language="java" import="java.sql.*" %>
<%@ page import = "java.sql.Connection"%>
<%@ page import = "java.sql.DriverManager"%> 
<%@ page import = "java.sql.ResultSet"%> 
<%@ page import = "java.sql.Statement"%> 
<%@ page import = "java.io.*,java.util.*, javax.servlet.*" %>
<%@include file="variables.jsp" %>  
<%
String sBusqueda = request.getParameter("Busqueda").replaceAll("'","");
String sFiltro="";
if (sBusqueda=="''")
{sFiltro="";}
else
{sFiltro = " where (Descripcion_ES like '%"+sBusqueda+"%') ";}
System.out.println(sBusqueda);
String sLista="@";

	try
	{	
	   // Conexion con bd
	  Class.forName(sClass);
	   Connection conexion = DriverManager.getConnection(sConexion, "root", "proyecto0");
	   if (!conexion.isClosed())
	   {
		  // La consulta
		  Statement st = conexion.createStatement();		  
		  ResultSet rs = st.executeQuery("select Cuenta, Precio, Titulo_ES, Descripcion_ES, URLImagen, URLProducto from productos "+sFiltro);

		  try {
			  while ( rs.next() )
			   {	
				  sLista=sLista+"#"+rs.getString("Cuenta")+";"+rs.getString("Precio")+";"+rs.getString("Titulo_ES").trim()+";"+rs.getString("Descripcion_ES").trim()+";"+rs.getString("URLImagen")+";"+rs.getString("URLProducto");
				}
				sLista=sLista+"#";
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
out.println(sLista);
%>
