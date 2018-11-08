<!-- DWXMLSource="ScanningProfile_group.xml" -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN" doctype-system="http://www.w3.org/TR/html4/loose.dtd"/>

<xsl:template match="/Group">
<html>
<head><link href="webstyle.css" rel="stylesheet" type="text/css"/></head>
<body>
<div style="height: 29px; margin-top:3px; margin-bottom:16px; margin-left:4px; margin-right:4px;border-bottom:#CCCCCC 1px solid">
	<img src="../Graphics/acuheader-left.png" width="113" height="24" style="float:left;"/>
	<img src="../Graphics/acuheader-right.png" width="186" height="24" style="float:right;"/>
</div>
	
<div class="categorytitle"><xsl:value-of select="Name"/></div>
<div class="category">
  <div class="subtitlediv">Severity</div>
  <div style="margin-bottom: 8px;">
	<xsl:if test="Severity = 'high'">
			 	<font color="red">High</font>
  </xsl:if>
	<xsl:if test="Severity = 'medium'">
		 		<font color="navy">Medium</font>
 	</xsl:if>
	<xsl:if test="Severity = 'low'">
			 	<font color="black">Low</font>
	</xsl:if>
	<xsl:if test="Severity = 'info'">
			 	<font color="black">Informational</font>
	</xsl:if>
	</div>
	
	<div class="subtitlediv">Type</div>
  <div style="margin-bottom: 8px;"><xsl:value-of disable-output-escaping="yes" select="Type"/></div>
	
	<div class="subtitlediv">Description</div>
  <div style="margin-bottom: 8px;"><xsl:value-of disable-output-escaping="yes" select="Description"/></div>
	
	<div class="subtitlediv">Impact</div>
  <div style="margin-bottom: 8px;"><xsl:value-of disable-output-escaping="yes" select="Impact"/></div>
	
	<div class="subtitlediv">Recommendation</div>
  <div style="margin-bottom: 8px;"><xsl:value-of disable-output-escaping="yes" select="Recommendation"/></div>
	
	<div class="subtitlediv">References</div>
  <div style="margin-bottom: 8px;">
	<ul>
	<xsl:for-each select="References/Reference">
		<li><a href="{URL}" title="{URL}"><xsl:value-of select="Database"/></a></li>
	</xsl:for-each>
	</ul>
	</div>
</div>

<div style=" height:20px; font-family:verdana, arial,  serif; font-size:7pt; color:#787878; margin: 0px;background-color:#e6e6e6;vertical-align:middle;border-top: 0px solid #CCCCCC;padding-top: 3px;">
<div style="float:left; height:17px"><img src="../Graphics/logo_bw.png" width="18" height="13" style="vertical-align:middle; margin-left:4px;"/> <div style="margin-left:4px; display:inline; vertical-align:middle;" id="replace_Copyright"></div></div><div style="float:right; margin-right: 4px; height:17px" id="replace_LongVersionInfo"></div>
</div>

</body>
</html>
</xsl:template>
</xsl:stylesheet>