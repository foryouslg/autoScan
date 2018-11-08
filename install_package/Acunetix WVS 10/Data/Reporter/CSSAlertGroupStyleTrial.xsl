<!-- acunetix wvs report item style  -->
<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN" doctype-system="http://www.w3.org/TR/html4/loose.dtd"/>
<xsl:template match="/">
 <html>
 
<!-- Script to show/hide request and response information -->
<script language="JavaScript1.2">
	function toggle(obj, objImg){
		var oObj    = document.all.item(obj);
		var oObjImg = document.all.item(objImg);

		if (oObj.style.display == "none")
			{
				oObj.style.display = "";
				oObjImg.src = "../Graphics/collapse.gif";
			}
		else
			{
				oObj.style.display = "none";
				oObjImg.src = "../Graphics/expand.gif";
			}
	}

	function toggleX(obj, objImg, ObjIframe, srcPath){
		var oObj    	= document.all.item(obj);
		var oObjImg 	= document.all.item(objImg);
		var oObjIframe	= document.all.item(ObjIframe);

		if (oObj.style.display == "none")
			{

				oObj.style.display = "";
				oObjImg.src = "../Graphics/collapse.gif";
							
				if (oObjIframe.src == ""){
					oObjIframe.src = srcPath;
				}
			}			
		else
			{
				oObj.style.display = "none";
				oObjImg.src = "../Graphics/expand.gif";
			}			
       			
	}

</script>

<!-- end script -->

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
 
 	<!-- ReportItems -->
	<xsl:if test="count(ReportItems/ReportItem) > 0">
 
	  <xsl:for-each select="ReportItems/ReportItem">  
	  <!-- ReportItem -->	  
	  
	   <!-- Title -->		   	  
      <!-- Name -->
      <div style="height:36px; overflow: hidden">
        <div class="sectionhead{@color}" style="height:36px;">
          <img src="../Graphics/ScanInfo/{@color}-u-l.gif" width="12" height="36" style="float:left"/>		
        </div>
        <div class="sectionheadtext" style="height:36px; width:100%; position:relative; top:-33px; white-space:nowrap; overflow: hidden">
          <img src="../Graphics/transparent-dot.gif" width="16" height="1"/>
          <xsl:value-of select="Name"/>
        </div>
        <div style="height:36px; position:relative; top:-72px;">
          <img src="../Graphics/ScanInfo/{@color}-u-r.gif" width="12" height="36" style="float:right"/>
          <img src="../Graphics/sev-{@color}.png" style="float:right"/>	
        </div>
      </div>
      
	   <div class="infotext b{@color}">
	   
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 15 15 0">
        <tbody>
        <tr>
        <td id="bm" bgcolor="#FAE5B0" style="border: 1px solid #FAD163">        
            <div style="margin:3 15 3 15; padding: 5px;">
                Only generic information is available in the Trial Edition. You can access a complete report on this vulnerability using the Full Edition. 
                <a href='#open_new_window_http://www.acunetix.com/ordering/'>Click here to buy.</a>
            </div>        
        </td>
        </tr>
        </tbody>
      </table>
      
 	   <!-- Description -->		   	   
	   <div class="infotexttitle b{@color}">Vulnerability description</div>	  
	   <div class="infosection textjustify">
	   <xsl:value-of disable-output-escaping="yes" select="Description"/>
	   
	   <div class="infotexttitle b{@color}">Affected items</div>	   	   
      
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 15 15 0">
        <tbody>
        <tr>
        <td id="bm" bgcolor="#FAE5B0" style="border: 1px solid #FAD163">        
            <div style="margin:3 15 3 15; padding: 5px;">
                This information is not available in the Trial Edition.
            </div>        
        </td>
        </tr>
        </tbody>
      </table>
      
	   </div>	

	   <!-- Impact -->
	   <div class="infotexttitle b{@color}">The impact of this vulnerability</div>	    
	   <div class="infosection textjustify">
	   <xsl:value-of disable-output-escaping="yes" select="Impact"/><br/>
	   </div>
	   	   
	   <!-- Recommendation -->
	   <div class="infotexttitle b{@color}">How to fix this vulnerability</div>	   
	   <div class="infosection textjustify">
       
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 15 15 0">
        <tbody>
        <tr>
        <td id="bm" bgcolor="#FAE5B0" style="border: 1px solid #FAD163">        
            <div style="margin:3 15 3 15; padding: 5px;">
                This information is not available in the Trial Edition.
            </div>        
        </td>
        </tr>
        </tbody>
      </table>
             
       </div>       

	   <xsl:if test="DetailedInformation != ''">		
	   
	   	    <div class="infotexttitle b{@color}">Detailed information</div>	  
			<a href="javascript:toggle('idd{@id}', 'iddf{@id}Img');">
				<div class="expandiv textjustify">
				<img border="0" id="iddf{@id}Img" align="absmiddle" src="../Graphics/expand.gif" hspace="4" onclick="toggle('idd{@id}', 'iddf{@id}Img');"/> 
				 Click here for more detailed information about this vulnerability
		   		</div>	  
		   	</a>
		   	
		    <div class="viewhttp" id="idd{@id}" style="display: none">	 	   	
		 	   	<xsl:value-of disable-output-escaping="yes"  select="DetailedInformation"/>
		    </div>	   	
	  </xsl:if>
	  	   	
	   	<img border="0" src="../Graphics/transparent-dot.gif"/>

	   <!-- References -->	
	   <xsl:if test="count(References/Reference) > 0">
		   <div class="infotexttitle b{@color}">Web references</div>

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

	  <!-- End ReportItemTable -->
  
	  </xsl:for-each>
	 
    </xsl:if>

	<!-- No report items are available -->
	<xsl:if test="count(ReportItems/ReportItem) = 0">
		<div class="infotext b{@color}">
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