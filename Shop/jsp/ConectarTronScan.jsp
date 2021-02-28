<%@ page pageEncoding="UTF-8"%>
<%@ page language="java" import="java.sql.*" %>

<%@ page import="java.io.*,java.util.*, javax.servlet.*, java.util.regex.*" %>
<%@ page import="java.io.IOException" %>
<%@ page import= "java.net.*" %>
<%@ page import= "java.text.DateFormat" %>
<%@ page import= "java.text.SimpleDateFormat" %>
<%@ page import= "java.util.Date" %>

<%@ page import="org.jsoup.Jsoup" %>
<%@ page import="org.jsoup.Connection" %>
<%@ page import="org.json.*" %>
<%@ page import="java.util.Random" %>


<%
String sCuenta= request.getParameter("Cuenta").replaceAll("'","");
String sDescripcion = request.getParameter("Descripcion").replaceAll("'","");
String sUrlTransacciones= "http://apilist.tronscan.org/api/transfer?sort=-timestamp&count=true&limit=3&start=0&token=_&address="+sCuenta;
String sUrlHash= "https://apilist.tronscan.org/api/transaction-info?hash=";
System.out.println("ENTRO EN IDENTIFICAR:"+sDescripcion);
	Integer i=0, k=0, nTope=0, nIni=0, nFin=0, nVeces=0;
	String sRespuesta="", sLista="", sTransacciones = "", sStatus="", sT="", sAccount="", sSaldo="", sName="", sTokenName="", sToken="";
	String sBalance="", sHash="", sData="", sTo="", sFrom="", sAmount="", sTimestamp;
	Long nTimestamp, nCantidad;
	int intValueOfChar;
	String [] aZonas, aTransacciones;
	sLista = "{'From':'Error','Amount':'Error','Token':'Error','Data':'Error'}";
	InputStream input;
	Reader reader;
	JSONObject obj,obj1,objh;
	JSONArray arr;
	// Localiza la última transaccion
	while (k<60)	
	{
		try
		{
			sTransacciones="";
			input = new URL(sUrlTransacciones).openStream();
			reader = new InputStreamReader(input, "UTF-8");
			while ((intValueOfChar = reader.read()) != -1) {
				sTransacciones += (char) intValueOfChar;
			}
			reader.close();
			obj = new JSONObject(sTransacciones);
			arr = obj.getJSONArray("data");
			i=0;
			nTope=arr.length();
			if (nTope>3){nTope=3;}
			while (i < nTope)
			{	
		
				try
				{
					sHash = arr.getJSONObject(i).getString("transactionHash");
					sTo = arr.getJSONObject(i).getString("transferToAddress");
					sFrom = arr.getJSONObject(i).getString("transferFromAddress");
					nCantidad = arr.getJSONObject(i).getLong("amount")/1000000;
					nTimestamp = arr.getJSONObject(i).getLong("timestamp");
					sTransacciones="";
					input = new URL(sUrlHash+sHash).openStream();
					reader = new InputStreamReader(input, "UTF-8");
					while ((intValueOfChar = reader.read()) != -1) {
					sTransacciones += (char) intValueOfChar;
					}
					reader.close();
					obj1= new JSONObject(sTransacciones);
					sData = obj1.getString("data");					
					sData = sData.replaceAll(" Sent from TronWallet","");
					

					Long nDif=System.currentTimeMillis()-nTimestamp;
					
					if (nDif<6000000) 
					{
						if (sData.equals(sDescripcion))
						{
							sLista = "{'From':'"+sFrom + "','Amount':'"+nCantidad+"','Token':'TRX','Data':'"+ sData +"'}";
							k=100;
							i=100;
						}
						else
						{i++;}
					}
					else
						{i++;}
				}
				catch (Exception e) {System.out.println("error"+e) ; i++;}
			}
			if (k<60)
			{Thread.sleep(2000); k++;}
		}
		catch (Exception e)
		{
		   // Error en algun momento.
		   System.out.println("Excepcion "+e);
		   e.printStackTrace();
		}
	}
out.println(sLista.replaceAll("'","\""));
%>
<%! 
private static String hexToAscii(String hexStr) {
    StringBuilder output = new StringBuilder("");
     
    for (int i = 0; i < hexStr.length(); i += 2) {
        String str = hexStr.substring(i, i + 2);
        output.append((char) Integer.parseInt(str, 16));
    }
     
    return output.toString();
}
%>
