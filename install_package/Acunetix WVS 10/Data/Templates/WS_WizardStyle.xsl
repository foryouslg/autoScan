<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/Targets">
 <html>

  <head>
  	<link rel="stylesheet" type="text/css" href="infostyle.css"/>
		<link rel="stylesheet" type="text/css" href="webstyle.css"/>
  </head>

  <body topmargin="2" leftmargin="5" rightmargin="5"> 
	<div class="categorytitle">Web service scan</div>	
	<div class="category">
	<div class="subtitlediv">WSDL</div>
	<div style="margin-bottom:8px"><xsl:value-of select="@WSDL"/></div>
	<div class="subtitlediv">Profile</div>
	<div style="margin-bottom:8px"><xsl:value-of select="@Profile"/></div>
	 	
 	<!-- Services -->
	<xsl:if test="count(Service) > 0">
		<div class="subtitlediv">Services</div>
	  <xsl:for-each select="Service">  
	  <!-- Service -->	
	  Service <b><xsl:value-of select="Name"/></b><br/><br/>
		  
	  
	  <xsl:for-each select="Port">  
	  <!-- Port -->	
	  Port <b><xsl:value-of select="Name"/></b><br/><br/>	  

	  List of operations<br/>	  
	  <table bgcolor="#ededed" border="0" cellSpacing="1" cellPadding="2">

	  <xsl:for-each select="Oper">  
	  <tr>
	  	<td width="20%" align="left" bgcolor="f5f5f5">Operation</td>
	  	<td bgcolor="f5f5f5"><b><xsl:value-of select="Name"/></b></td>
	  </tr>
	 <!-- END Oper -->				  
	 </xsl:for-each> 
	  
	 </table>  
	  	  
     <br/>
     
	 <!-- END Port -->				  
	 </xsl:for-each> 


	 <!-- END Service -->				  
	 </xsl:for-each> 

		 
    </xsl:if>

	<!-- No targets are vailable  -->
	<xsl:if test="count(Service) = 0">
		No targets have been selected for scanning. <br/>
    </xsl:if>
  </div>
  </body>
  
 </html>
  
</xsl:template>
</xsl:stylesheet>  