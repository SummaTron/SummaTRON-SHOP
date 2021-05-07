var aCuentas=[];
var nBalance=0.0, nFrozen=0, nBandwidth=0, k=0;
var oTokenN=[],oTokenB=[];
var oTokens, oTransfers, sTransfers="[";

function Precio_Euro()
{
	getPrice().done(function(response) {
		response.forEach(function(item) {
			$('#Euro').val(item.price_eur.substring(0,7));
		});
	});
}
function Precio_Dolar()
{
	getPrice().done(function(response) {
		response.forEach(function(item) {
			$('#Dolar').val(item.price_usd.substring(0,7));
		});
	});
}
function getPrice() {
	return $.ajax({
		url: 'https://api.coinmarketcap.com/v1/ticker/tron/?convert=EUR',
		method: 'GET',
		type: 'JSON' 
	});
}
function Decimal (sNumero,nDecimales)
{
	nNumero = parseFloat(sNumero/1000000).toFixed(2);
	if ($("#Idioma").val()=="EN")
	{ 
		sNumero = nNumero.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
	}
	else
	{
		sNumero = nNumero.toString();
		sNumero =sNumero.split(".").join(",");
		sNumero = sNumero.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
		if (nDecimales==0)
		{sNumero=sNumero.substr(0,sNumero.length-3);}
	}
	return " "+sNumero;
}
function nDecimal (nNumero,nDecimales)
{
	if ($("#Idioma").val()=="EN")
	{ 	
		sNumero = nNumero.toFixed(2).toString();
		sNumero = sNumero.replace(/\d(?=(\d{3})+\.)/g, '$&,');
		if (nDecimales==0)
		{sNumero=sNumero.substr(0,sNumero.length-3);}
	}
	else
	{
		sNumero = nNumero.toFixed(2).toString();
		sNumero =sNumero.split(".").join(",");
		sNumero = sNumero.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
		if (nDecimales==0)
		{sNumero=sNumero.substr(0,sNumero.length-3);}
			
	}
	return sNumero;
}
function Idioma (sIdioma)
{
	var sURL="";
	$("#Idioma").val(sIdioma);
	sURL=document.location.href;
	if ((sURL=="http://www.summatron.com/")||(sURL=="http://summatron.com/"))
	{sURL="http://www.summatron.com/index.html";}
	nIni = sURL.indexOf("_")+1;
	if (sURL.indexOf("_")<0)
	{ sURL="http://www.summatron.com/index_";}
	else
	{sURL= sURL.substr(0,nIni);}
	if ($("#Idioma").val()=="EN")
		{ 
			document.location.href=sURL+"EN.html";}
	else
		{ 
			document.location.href=sURL+"ES.html";}
}
function Abrir_SummaTron()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/index_EN.html";}
	else
	{document.location.href="/index.html";}
}

function Abrir_WhitePaper ()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/whitepaper_EN.html";}
	else
	{document.location.href="/whitepaper.html";}
}
function Abrir_API ()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/api_EN.html";}
	else
	{document.location.href="/api.html";}
}
function Abrir_AVA ()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/AVA_EN.html";}
	else
	{document.location.href="/AVA.html";}
}
function Abrir_ComprarSTX ()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/comprarSTX_EN.html";}
	else
	{document.location.href="/comprarSTX.html";}
}
function Abrir_ComprarITX ()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/comprarITX_EN.html";}
	else
	{document.location.href="/comprarITX.html";}
}
function Abrir_Shop ()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/shop/index_EN.html";}
	else
	{document.location.href="/shop/index_ES.html";}
}
function Abrir_Visor()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/visor_EN.html";}
	else
	{document.location.href="/visor_ES.html";}
}
function Abrir_Otaku ()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/otaku_EN.html";}
	else
	{document.location.href="/otaku.html";}
}
function Abrir_Contacto ()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/contacto_EN.html";}
	else
	{document.location.href="/contacto.html";}
}
function Abrir_Alta ()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/shop/alta_EN.html";}
	else
	{document.location.href="/shop/alta.html";}
}
function Abrir_Modificacion ()
{
	if ($("#Idioma").val()=="EN")
	{document.location.href="/shop/modificacion_EN.html";}
	else
	{document.location.href="/shop/modificacion.html";}
}
function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}
function Cerrar()
{
	$("#PanelDetalle").css("display","none");
	$("#PanelLista").css("display","block");
}
function MostrarCuentas()
{
	Mostrar($("#Cuenta").val());
}
function Mostrar(sCuenta)
{
	$("#PanelPago").css("display","none");
	$("#PanelEspera").css("display","block");
	Precio_Euro();
	Precio_Dolar();
	$("#zona").html("");
	nTotal = 0.0;
	nEuros = 0.0;
	slDivisa="";
	$.get( "/shop/jspjs/CuentasJSON.jsp?Cuenta='"+sCuenta+"'", function(resp) {
		$("#PanelEspera").css("display","none");
		$("#PanelLista").css("display","block");
		var sZona="";
		var obj = JSON.parse(resp);
		nInversion = obj.Inversion;
		sDivisa = obj.Divisa;
		if (sDivisa=="€")
		{$("#Precio").val($("#Euro").val());slDivisa="Euros";}
		else
		{$("#Precio").val($("#Dolar").val());slDivisa="Dólares";}
		if ($("#Idioma").val()=="ES") 
			{sRefresh = "Actualizar";sAgregado = "Mostrar Total Agregado";}
		else
			{sRefresh = "Refresh";sAgregado = "Show All Accounts Aggregated";}
		sZona="<tr><td colspan='2'><button  type='button' class='btn btn-secondary btn-md btn-block' onClick='ResumenCuentas()'>"+sAgregado+"</button></td></tr>";
		for (i in obj.Cuentas)
		{
			aCuentas.push (obj.Cuentas[i].Cuenta);
			sNombre = obj.Cuentas[i].Nombre+"<br><span style='text-decoration:underline;cursor:pointer'>"+obj.Cuentas[i].Cuenta+"</span>";
			sCantidad = obj.Cuentas[i].Balance;
			sFrozen = obj.Cuentas[i].Frozen;
			sClick = "DetalleCuenta('"+obj.Cuentas[i].Cuenta + "')";
			sZona=sZona+"<tr onclick="+sClick + "><td>" + sNombre +"</td><td style='text-align:right'><i class='fa'><img src='/tron/img/tronalfa.png' height='16' width='16'>"+ Decimal(sCantidad,2)+"</i><br><i class='fa fa-snowflake-o'>"+ Decimal(sFrozen,2) +"</i></td></tr>";
			nTotal = nTotal + parseFloat(sFrozen)+parseFloat(sCantidad);	
		}
		nTotal = nTotal/1000000;
		nEuros = nTotal * $("#Precio").val();
		nBeneficio = nEuros - nInversion;
		nPorcentaje = (nBeneficio*100) / nInversion;

		sZona=sZona+"<tr style='color:darkblue'><td onclick='ResumenCuentas()'>Total TRX</td><td style='text-align:right'>"+ nDecimal(nTotal,2) +"</td></tr>";
		sZona=sZona+"<tr style='color:darkblue'><td>Total "+slDivisa+"</td><td style='text-align:right'>"+ nDecimal(nEuros,2) + sDivisa + " </td></tr>";
		if ( nInversion>0)
		{
			sZona=sZona+"<tr style='color:darkblue'><td>Total Beneficio</td><td style='text-align:right'>"+ nDecimal(nBeneficio,2) + sDivisa+" </td></tr>";
			sZona=sZona+"<tr style='color:darkblue'><td>Porcentaje Beneficio</td><td style='text-align:right'>"+ nDecimal(nPorcentaje,2) +"% </td></tr>";
		}
		sZona=sZona+"<tr><td colspan='2' ><button  type='button' class='btn btn-secondary btn-md btn-block' onClick='Mostrar("+'"'+sCuenta+'"'+")'>"+sRefresh+"</button></td></tr>";				
		$("#zona").append(sZona);
		sPrecio = "Precio : "+$("#Precio").val() + sDivisa;
		$("#labelprecio").html(sPrecio);
	});
}
function DetalleCuenta(sCuenta)
{	
	$("#PanelPago").css("display","none");
	$("#PanelLista").css("display","none");
	$("#zonaDetalleCuenta").html("");
	$("#zonaDetalleTokens").html("");
	$.get( "https://wlcyapi.tronscan.org/api/account/"+sCuenta, function(resp) {
		$("#PanelDetalle").css("display","block");
		var sZona="";
		var obj = resp;
		sBalance = obj.balance;
		sFrozen = obj.frozen.total;
		nBandwidth = (obj.bandwidth.freeNetRemaining + obj.bandwidth.netRemaining)*1000000;
		sBandwidth = nBandwidth.toString();
		sZona = "<tr><td>"+ obj.name +"<br>"+ obj.address+"<br><i class='fa' style='padding:3px'><img src='/tron/img/tronalfa.png' height='16' width='16'>"+ Decimal(sBalance,2) +"</i><br><i style='padding:3px' class='fa fa-snowflake-o'>"+ Decimal(sFrozen,2) +"</i><br><i style='padding:3px' class='fa fa-tachometer'>"+ Decimal(sBandwidth,2) +"</i></td></tr>";
		$("#zonaDetalleCuenta").append(sZona);
		sZona="";
		oTokens = sortJSON(obj.tokenBalances, 'balance', 'desc');
		for (i in oTokens)
		{
			sToken = oTokens[i].name;
			sBalance = oTokens[i].balance;
			if (sToken=="TRX"){sTokenBalance = nDecimal(sBalance,2);}
			else {sTokenBalance = nDecimal(sBalance,0);}
			sZona = sZona + "<tr><td>"+ sToken+" : "+ sTokenBalance +"</td></tr>";
		}
		$("#zonaDetalleTokens").append(sZona);
		DetalleTransfers(sCuenta);
	});
}
function ResumenCuentas()
{	
	$("#PanelPago").css("display","none");
	$("#PanelLista").css("display","none");
	$("#zonaDetalleCuenta").html("");
	$("#zonaDetalleTokens").html("");
	$("#PanelDetalle").css("display","block");
	for (i in aCuentas)
	{
		LeerCuenta(aCuentas[i]);
	}
	var sZona="";
	sBalance = nBalance.toString();
	sFrozen = nFrozen.toString();
	sBandwidth = nBandwidth.toString();
	sZona = "<tr><td>Resumen de Cuentas<br><i class='fa' style='padding:3px'><img src='/tron/img/tronalfa.png' height='16' width='16'>"+ Decimal(sBalance,2) +"</i><br><i style='padding:3px' class='fa fa-snowflake-o'>"+ Decimal(sFrozen,0) +"</i><br><i style='padding:3px' class='fa fa-tachometer'>"+ Decimal(sBandwidth,0) +"</i></td></tr>";
	//oTokens = sortJSON(oTokens, 'balance', 'desc');
	$("#zonaDetalleCuenta").append(sZona);
	sZona="";
	sTokens = "[";
	for (i in oTokenN)
	{
		sTokens+=('{"name":"'+oTokenN[i]+'","balance":'+oTokenB[i]+'},');
	}
	sTokens = sTokens.substr(0,sTokens.length-1);
	sTokens += "]";
	
	osTokens = JSON.parse(sTokens);
	oTokens = sortJSON(osTokens, 'balance', 'desc');
	for (i in oTokens)
	{
		sToken = oTokens[i].name;
		sBalance = oTokens[i].balance;
		sZona = sZona + "<tr><td>"+ sToken+" : "+nDecimal(sBalance,0)+"</td></tr>";
	}
	$("#zonaDetalleTokens").append(sZona);
	
	sTransfers = sTransfers.substr(0,sTransfers.length-1);
	sTransfers += "]";
	osTransfers = JSON.parse(sTransfers);
	oTransfers = sortJSON(osTransfers, 'Timestamp', 'desc');
	$("#zonaDetalleTransfer").html("");
	sZona="";
	nTope = 15;
	if (oTransfers.length<15){nTope=oTransfers.length;}
	for (i=0;i<nTope;i++)
	{
		sFrom = oTransfers[i].From;
		sTo = oTransfers[i].To;
		sToken = oTransfers[i].Token;
		sAmount = oTransfers[i].Amount;
		sTimestamp = oTransfers[i].Timestamp;
		sFecha = oTransfers[i].Fecha;

		sZona=sZona+"<tr><td><i class='fa fa-send-o'></i><br><i class='fa fa-qrcode' style='margin-top:8px'></i></td><td>"+sFecha+
		"</td><td><div style='white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>" + sFrom+"<br>"+sTo +"</div></td><td>"+sToken+"</td><td>"+sAmount+"</td><tr>";
	}

	$("#zonaDetalleTransfer").append(sZona);
	$("#lmenu2").click();
}
function LeerCuenta (sCuenta)
{
	$.ajaxSetup({async: false});
	$.get( "https://wlcyapi.tronscan.org/api/account/"+sCuenta,function(resp) {
		var obj = resp;
		nBalance += obj.balance;
		nFrozen += obj.frozen.total;
		nBandwidth += (obj.bandwidth.freeNetRemaining + obj.bandwidth.netRemaining)*1000000;
		for (i in obj.tokenBalances)
		{
			sToken = obj.tokenBalances[i].name;
			nTokenBalance = obj.tokenBalances[i].balance;
			if (oTokenN.indexOf(sToken)==-1)
			{
				oTokenN.push(sToken);
				oTokenB.push(0);
			}
			oTokenB[oTokenN.indexOf(sToken)] += nTokenBalance;
		}
	});

	$.get( "https://wlcyapi.tronscan.org/api/transfer?sort=-timestamp&count=true&limit=15&start=0&address="+sCuenta, function(resp) {
		var sZona="";
		var obj = resp;
		for (i in obj.data)
		{
			sFrom = obj.data[i].transferFromAddress;
			sTo = obj.data[i].transferToAddress;
			sToken = obj.data[i].tokenName;
			sTimestamp = obj.data[i].timestamp;
			if (sToken=="TRX")
			{sAmount = obj.data[i].amount/1000000;}
			else
			{sAmount = obj.data[i].amount;}
			var f = new Date(sTimestamp);
			//sFecha= f.getDate()+"/"+f.getMonth()+"/"+f.FullYear()+" "+f.getHours()+":"+f.getMinutes();
			sMonth=f.getMonth()+1
			sFecha= pad(f.getDate(),2)+"/"+pad(sMonth,2)+"/"+f.getFullYear()+" "+pad(f.getHours(),2)+":"+pad(f.getMinutes(),2)+":"+pad(f.getSeconds(),2);
			
			sTransfers += '{"From":"'+ sFrom + '","To":"' + sTo + '","Token":"' + sToken + '","Amount":"' + sAmount + '","Timestamp":' + sTimestamp + ',"Fecha":"' + sFecha + '"},';	
		}
	});

}
function DetalleTransfers(sCuenta)
{	
	$("#zonaDetalleTransfer").html("");
	$.get( "https://wlcyapi.tronscan.org/api/transfer?sort=-timestamp&count=true&limit=15&start=0&address="+sCuenta, function(resp) {
		var sZona="";
		var obj = resp;
		for (i in obj.data)
		{
			sFrom = obj.data[i].transferFromAddress;
			sTo = obj.data[i].transferToAddress;
			sToken = obj.data[i].tokenName;
			sTimestamp = obj.data[i].timestamp;
			if (sToken=="TRX")
			{sAmount = obj.data[i].amount/1000000;}
			else
			{sAmount = obj.data[i].amount;}
			var f = new Date(sTimestamp);
			//sFecha= f.getDate()+"/"+f.getMonth()+"/"+f.FullYear()+" "+f.getHours()+":"+f.getMinutes();
			sMonth=f.getMonth()+1
			sFecha= pad(f.getDate(),2)+"/"+pad(sMonth,2)+"/"+f.getFullYear()+" "+pad(f.getHours(),2)+":"+pad(f.getMinutes(),2)+":"+pad(f.getSeconds(),2);
			if (sFrom==sCuenta)
			{sIcono="fa fa-send-o";
			sCta=sTo;}
			else
			{sIcono="fa fa-qrcode";
			sCta=sFrom;}
			sZona=sZona+"<tr><td><i class='"+sIcono+"'></i></td><td>"+sFecha+
			"</td><td><div style='white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>" + sCta +"</div></td><td>"+sToken+"</td><td>"+sAmount+"</td><tr>";	
		}

		$("#zonaDetalleTransfer").append(sZona);
		$("#lmenu2").click();
	});
}


function AltaRegistro(obj)
{
	$("#PanelPago").css("display","none");
	$("#PanelEspera").css("display","none");
	$("#PanelPago").load("/api/PanelFirma.html", function() {
		$("#PanelFirma").css("display","block");;
		$("#zonapdf").attr("src","https://www.summatron.com/pdfs/"+obj.Fichero);
		Firmar(sCuenta,"ES",obj.Fichero,"FirmaDocumento");
		
	});
}

function FirmaDocumento(obj)
{
	$("#zonapdf").attr("src","https://www.summatron.com/pdfs/"+obj.Fichero);
}
function Enviar()
{
	sCuenta=$("#CuentaDonate").val();
	sCuenta64=do58Decode($("#CuentaDonate").val());
	$.get("/bot/jsp/enviar.jsp?Cuenta='"+sCuenta+"'&Cuenta64='"+sCuenta64+"'", function(resp) {
		obj = JSON.parse(resp);
		alert(obj.Resultado);
		if (obj.Resultado == "Envio realizado")
		{
			$("#Donate").css("display","none");
		}
	});
}
function pad(n, width, z) 
{
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


