<%@ page import="java.util.*" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.apache.commons.fileupload.util.Streams" %>
<%@ page import="org.apache.commons.io.*" %>
<%@ page import="java.io.*" %>
<%@ page pageEncoding="UTF-8"%>
<%@ page language="java" import="java.sql.*" %>
<%@ page language="java" %>
<%@ page import = "java.sql.Connection"%>
<%@ page import = "java.sql.DriverManager"%> 
<%@ page import = "java.sql.ResultSet"%> 
<%@ page import = "java.sql.Statement"%> 
<%@ page import = "java.io.*,java.util.*, javax.servlet.*" %>
<%@ page import = "java.net.URLDecoder.*" %>
<%@ page import = "java.util.Base64" %>
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
        /*FileItemFactory es una interfaz para crear FileItem*/
        FileItemFactory file_factory = new DiskFileItemFactory();
 
        /*ServletFileUpload esta clase convierte los input file a FileItem*/
        ServletFileUpload servlet_up = new ServletFileUpload(file_factory);
        /*sacando los FileItem del ServletFileUpload en una lista */
        List items = servlet_up.parseRequest(request);
		File fichero=null;
		FileItem item =null;
		InputStream stream=null;
 
		for(int i=0;i<items.size();i++){
            /*FileItem representa un archivo en memoria que puede ser pasado al disco duro*/
            item = (FileItem) items.get(i);
			stream = item.getInputStream();
            /*item.isFormField() false=input file; true=text field*/
            if (item.isFormField())
			{
				if (item.getFieldName().equals("Id")) {sId=Streams.asString(stream, "UTF-8");}
				if (item.getFieldName().equals("Tipo")) {sTipo=Streams.asString(stream, "UTF-8");}
				if (item.getFieldName().equals("Precio")) {sPrecio=Streams.asString(stream, "UTF-8");}
				if (item.getFieldName().equals("Cuenta")) {sCuenta=Streams.asString(stream, "UTF-8");}
				if (item.getFieldName().equals("Titulo")) {sTitulo=Streams.asString(stream, "UTF-8");}
				if (item.getFieldName().equals("Descripcion")) {sDescripcion=Streams.asString(stream, "UTF-8");}
				if (item.getFieldName().equals("URLImagen")) {sURLImagen=Streams.asString(stream, "UTF-8");}
				if (item.getFieldName().equals("URLProducto")) {sURLProducto=Streams.asString(stream, "UTF-8");}
			}
        }
		for(int i=0;i<items.size();i++){
            /*FileItem representa un archivo en memoria que puede ser pasado al disco duro*/
            item = (FileItem) items.get(i);
			stream = item.getInputStream();
            /*item.isFormField() false=input file; true=text field*/
            if (! item.isFormField()){
                /*cual sera la ruta al archivo en el servidor*/
				if (item.getFieldName().equals("Imagen"))
				{
					sImagen = sCuenta + item.getName();
					fichero = new File(application.getRealPath("/")+"shop\\img\\"+sImagen);
				}
				if (item.getFieldName().equals("Producto"))
				{
					sProducto = sCuenta + item.getName();
					fichero = new File(application.getRealPath("/")+"shop\\"+sTipo+"\\"+sProducto);
				}
                /*y lo escribimos en el servidor*/
				System.out.println(fichero);
				if (item.getName() != "" )
				{
                item.write(fichero);
				sExterno="0";
				}
				else
				{
				sExterno="1";
				}
			}
        }
		if (sURLImagen.trim().length()==0) {sURLImagen=sImagen;}
		if (sURLProducto.trim().length()==0) {sURLProducto=sProducto;}

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