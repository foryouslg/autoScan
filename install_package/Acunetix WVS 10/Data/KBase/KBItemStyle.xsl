<!-- Acunetix WVS KBItem item style  -->
<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN" doctype-system="http://www.w3.org/TR/html4/loose.dtd"/>
<xsl:template match="/">
 <html>

  <head>
  	<link rel="stylesheet" type="text/css" href="..\Templates\ScanInfo\SIStyle.css"/>
  	<link rel="stylesheet" type="text/css" href="..\Templates\ScanInfo\SITextStyle.css"/>
  </head> 

  <body>

 	<!-- TopBar -->    
	<div style="height: 29px; margin-top:3px; margin-bottom:8px; margin-left:4px; margin-right:4px;border-bottom:#CCCCCC 1px solid">
		<img src="../Graphics/acuheader-left.png" width="113" height="24" style="float:left;"/>
		<img src="../Graphics/acuheader-right.png" width="186" height="24" style="float:right;"/>
	</div>
	
	<div style="padding: 10px; word-wrap: break-word;">

 	<!-- End TopBar -->
 
 	<!-- KBItems -->
	<xsl:if test="count(KBItems/KBItem) > 0">
 
	  <xsl:for-each select="KBItems/KBItem">  
	  <!-- KBItem -->	  
	  
	  <!-- Title -->		   	  
      <!-- Name -->
      <div style="height:36px; overflow: hidden">
        <div class="sectionhead{@color}" style="height:36px;">
          <img src="../Graphics/ScanInfo/{@color}-u-l.gif" width="12" height="36" style="float:left"/>		
        </div>
        <div class="sectionheadtext" style="height:36px; width:100%; position:relative; top:-33px; white-space:nowrap; overflow: hidden">
          <img src="../Graphics/transparent-dot.gif" width="16" height="1"/><xsl:value-of select="Name"/>
        </div>
        
        <div style="height:36px; position:relative; top:-72px;">
          <img src="../Graphics/ScanInfo/{@color}-u-r.gif" width="12" height="36" style="float:right"/>
          <!--<img src="../Graphics/sev-{@color}.png" style="float:right"/>	-->
        </div>
      </div>
 	   
	   <div class="infotext b{@color}">
	   
 	   <!-- Description -->		   	   
	   <div class="infotexttitle b{@color}">Description</div>	  
	   <div class="infosection textjustify">
	   <xsl:value-of disable-output-escaping="yes" select="Text"/>
	   </div>

	   	<img border="0" src="../Graphics/transparent-dot.gif"/>

	   <!-- References -->	
	   <xsl:if test="count(References/Reference) > 0">
		   <div class="infotexttitle b{@color}" style="margin-top:10px">Web references</div>

		   <xsl:for-each select="References/Reference">
		    <ul>
				<li><a href="#open_new_window_{URL}" title="{URL}"><xsl:value-of select="Database"/></a></li>
		    </ul>		
		   </xsl:for-each>			   
	   </xsl:if>	

	   </div>
	   <div class="sectionfoot{@color}" style="margin-bottom:10px;">
		   <img src="../Graphics/ScanInfo/{@color}-l-l.gif" width="12" height="18" style="float:left"/>
		   <img src="../Graphics/ScanInfo/{@color}-l-r.gif" width="12" height="18" style="float:right"/>
	   </div>       
	  <!-- End KBItemTable -->
  
	  </xsl:for-each>
	 
    </xsl:if>

	<!-- No report items are available -->
	<xsl:if test="count(KBItems/KBItem) = 0">
		<div>
		No report items are available. <br/>
		</div>
    </xsl:if>

    </div>    	 
        	 
 	<!-- Copyright 	-->

<div style=" height:20px; font-family:verdana, arial,  serif; font-size:7pt; color:#787878; margin: 0px;background-color:#e6e6e6;vertical-align:middle;border-top: 0px solid #CCCCCC;padding-top: 3px;">
<div style="float:left; height:17px"><img src="../Graphics/logo_bw.png" width="18" height="13" style="vertical-align:middle; margin-left:4px;"/> <div style="margin-left:4px; display:inline; vertical-align:middle;" id="replace_Copyright"></div></div><div style="float:right; margin-right: 4px; height:17px" id="replace_LongVersionInfo"></div>
</div> 
  
 	<!-- End Copyright -->
  
  </body>
  
 </html>
  
</xsl:template>
</xsl:stylesheet>  