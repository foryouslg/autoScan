<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/Targets">
 <html>

  <head>
  	<link rel="stylesheet" type="text/css" href="infostyle.css"/>
		<link rel="stylesheet" type="text/css" href="webstyle.css"/>
  </head> 

  <body topmargin="2" leftmargin="5" rightmargin="5"> 
	<div class="categorytitle"><xsl:value-of select="@ScanString"/></div>	
	<div class="category">
	<div class="subtitlediv">Profile</div>
	<div style="margin-bottom:8px"><xsl:value-of select="@Profile"/></div>
	 
	<div class="subtitlediv">Targets</div>
 	<!-- Targets -->
	<xsl:if test="count(Target) > 0">
 		<ul>
	  <xsl:for-each select="Target">  
	  <!-- Target -->	
		<li style="margin-bottom: 4px;"><strong><xsl:value-of select="StartURL"/></strong><br/>
		OS: <xsl:value-of select="OS"/><br/>	
		Server: <xsl:value-of select="WebServer"/><br/>
		Technologies: <xsl:value-of select="Techs"/>
		</li>
	 <!-- END Target -->	
			  
	 </xsl:for-each> 
	 </ul>
  </xsl:if>

	<!-- No targets are vailable -->
	<xsl:if test="count(Target) = 0">
		No targets have been selected for scanning. <br/>
  </xsl:if>
	</div>   	 
  </body>
</html>
  
</xsl:template>
</xsl:stylesheet>  