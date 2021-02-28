<%@ page import="java.util.*" %>
<%@ page import="java.io.*" %>
<%@ page pageEncoding="UTF-8"%>
<%@ page language="java" import="java.sql.*" %>
<%@ page language="java" %>
<%@ page import = "java.sql.Connection"%>
<%@ page import = "java.sql.DriverManager"%> 
<%@ page import = "java.sql.ResultSet"%> 
<%@ page import = "java.sql.Statement"%> 

<%@include file="variables.jsp" %>
<% request.setCharacterEncoding("UTF-8"); %> 

<%
String sId = "";
String sTipo = "";
String sPrecio = "";
String sCuenta = "";
String sTitulo = "";
String sDescripcion = "";
String sURLImagen = "";
String sURLProducto = "";
String sExterno="0";
String sSQL="";
String sImagen="", sProducto="";

	sTipo = request.getParameter("Tipo");
	sPrecio = request.getParameter("Precio");
	sCuenta = request.getParameter("Cuenta");
	sTitulo = request.getParameter("Titulo");
	sDescripcion = request.getParameter("Descripcion");
	sURLImagen = request.getParameter("URLImagen");
	sURLProducto = request.getParameter("URLProducto");
	sExterno = "SI";
	try
	{
		Connection conexion = DriverManager.getConnection(sConexion, "root", "proyecto0");
		if (!conexion.isClosed())
	   {
		    Statement st = conexion.createStatement();
		    if (sId.equals(""))
			{
				sSQL = "INSERT INTO productos (Tipo, Precio, Cuenta, Titulo_ES, Descripcion_ES, URLImagen, URLProducto, Externo) " 
				  +" VALUES ('"+sTipo+"','"+sPrecio+"','"+sCuenta+"','"+sTitulo+"','"+sDescripcion+"','"+sURLImagen+"','"+sURLProducto+"','"+sExterno+"')";
				  System.out.println("Nuevo Producto:"+sSQL);
				  st.executeUpdate(sSQL);	
			}
			else
			{
				 sSQL = "UPDATE  productos SET Tipo='"+sTipo+"', Precio='"+sPrecio+"', Cuenta='"+sCuenta+"', Titulo_ES='"+sTitulo+"', Descripcion_ES='"+sDescripcion+"', URLImagen='"+sURLImagen+"', URLProducto='"+sURLProducto+"', Externo='"+sExterno+"' where id='"+sId+"'"; 

				  System.out.println("Nuevo Producto:"+sSQL);
				  st.executeUpdate(sSQL);	
			}
			conexion.close();   
	   }
	   else
	   {
		  // Error en la conexion
		  System.out.println("fallo");
	   }
	}
	catch (Exception e)
	{
	   // Error en algun momento.
	   System.out.println("Excepcion "+e);
	   e.printStackTrace();
	}
	
	String site = new String("http://www.summatron.com/shop/alta.html?Resultado='Correcto'");
	response.setStatus(response.SC_MOVED_TEMPORARILY);
	response.setHeader("Location", site); 

%>