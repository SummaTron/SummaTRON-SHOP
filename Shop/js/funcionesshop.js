
function Idioma (sIdioma)
{
	var sURL="";
	$("#Idioma").val(sIdioma);
	sURL=document.location.href;
	if ((sURL=="https://www.summatron.com/")||(sURL=="https://summatron.com/"))
	{sURL="https://www.summatron.com/index.html";}
	if ($("#Idioma").val()=="ES")
		{ 
			sURL= sURL.substr(0,sURL.length-5); 
			document.location.href=sURL+"_ES.html";}
	else
		{ 
			sURL= sURL.substr(0,sURL.length-8); 
			document.location.href=sURL+".html";}
}
function Abrir_SummaTron ()
{
	if ($("#Idioma").val()=="ES")
	{document.location.href="/index_ES.html";}
	else
	{document.location.href="/index.html";}
}
function Abrir_Shop ()
{
	if ($("#Idioma").val()=="ES")
		{document.location.href="/shop/index_ES.html";}
	else
		{document.location.href="/shop/index.html";}
}
function Abrir_Alta ()
{
	if ($("#Idioma").val()=="ES")
		{document.location.href="/shop/alta_ES.html";}
	else
		{document.location.href="/shop/alta.html";}
}
function Abrir_Modificacion ()
{
	if ($("#Idioma").val()=="ES")
		{document.location.href="/shop/modificacion_ES.html";}
	else
		{document.location.href="/shop/modificacion.html";}
}
function Abrir_Borrado()
{
	if ($("#Idioma").val()=="ES")
	{document.location.href="/shop/borrado_ES.html";}
	else
	{document.location.href="/shop/borrado.html";}
}

function Idioma (sIdioma)
{
	var sURL="";
	$("#Idioma").val(sIdioma);
	sURL=document.location.href;
	if ((sURL=="https://www.summatron.com/")||(sURL=="https://summatron.com/"))
	{sURL="https://www.summatron.com/index.html";}
	if ($("#Idioma").val()=="ES")
		{ 
			sURL= sURL.substr(0,sURL.length-5); 
			document.location.href=sURL+"_ES.html";}
	else
		{ 
			sURL= sURL.substr(0,sURL.length-8); 
			document.location.href=sURL+".html";}
}

