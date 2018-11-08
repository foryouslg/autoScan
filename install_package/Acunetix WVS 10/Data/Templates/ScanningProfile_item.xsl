<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN" doctype-system="http://www.w3.org/TR/html4/loose.dtd"/>
<xsl:template match="/Item">
<html>
<head><link href="webstyle.css" rel="stylesheet" type="text/css"/></head>
<body>
<div style="height: 29px; margin-top:3px; margin-bottom:16px; margin-left:4px; margin-right:4px;border-bottom:#CCCCCC 1px solid">
	<img src="../Graphics/acuheader-left.png" width="113" height="24" style="float:left;"/>
	<img src="../Graphics/acuheader-right.png" width="186" height="24" style="float:right;"/>
</div>
	
<div class="categorytitle"><xsl:value-of select="Name"/></div>
<div class="category">
	<div class="subtitlediv">Description</div>
  <div style="margin-bottom: 8px;"><xsl:value-of select="Descr"/></div>
</div>

<div style=" height:20px; font-family:verdana, arial,  serif; font-size:7pt; color:#787878; margin: 0px;background-color:#e6e6e6;vertical-align:middle;border-top: 0px solid #CCCCCC;padding-top: 3px;">
<div style="float:left; height:17px"><img src="../Graphics/logo_bw.png" width="18" height="13" style="vertical-align:middle; margin-left:4px;"/> <div style="margin-left:4px; display:inline; vertical-align:middle;" id="replace_Copyright"></div></div><div style="float:right; margin-right: 4px; height:17px" id="replace_LongVersionInfo"></div>
</div>

</body>
</html>
  
</xsl:template>
</xsl:stylesheet>  