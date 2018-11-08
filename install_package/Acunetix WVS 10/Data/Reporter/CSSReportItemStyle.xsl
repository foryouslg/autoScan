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
 
	<xsl:if test="ReportItems/@display &lt; ReportItems/@count">
		<div style="height:36px;">
		Listing the first <b><xsl:value-of select="ReportItems/@display"/></b> alerts from a total of <b><xsl:value-of select="ReportItems/@count"/></b>.
		</div>
	</xsl:if>
  
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
          <img src="../Graphics/transparent-dot.gif" width="16" height="1"/><xsl:value-of select="Name"/>
          
			          
        </div>
        <div style="height:36px; position:relative; top:-72px;">
          <img src="../Graphics/ScanInfo/{@color}-u-r.gif" width="12" height="36" style="float:right"/>
          <img src="../Graphics/sev-{@color}.png" style="float:right"/>	
        </div>
      </div> 	   
	   
	   <div class="infotext b{@color}">

		<xsl:if test="IsFalsePositive = 'true' or IsFalsePositive = 'True'">
		<table cellpadding="0" cellspacing="0" border="0" style="margin:0 15 15 0">
			<tbody><tr><td id="bm" bgcolor="#FAE5B0" style="border: 1px solid #FAD163">
			<div style="margin:3 15 3 15">
			This alert was marked as a false positive.
			</div>
			</td></tr>
			</tbody></table>
		</xsl:if> 	   	   

 	   <!-- Description -->		   	   
	   <div class="infotexttitle b{@color}">Vulnerability description</div>	  
	   <div class="infosection textjustify">
	   <xsl:value-of disable-output-escaping="yes" select="Description"/>
	   </div>
       
       <div style="padding-top: 5px;">This vulnerability affects 
        <xsl:choose>
            <xsl:when test="starts-with(Affects, '/')">
                    <a title="Go to the affected site file" href="#go_to_site_file_{Affects}"><font color="dark"><xsl:value-of disable-output-escaping="yes" select="Affects"/></font></a>.
            </xsl:when>
            <xsl:otherwise>
                    <b><font color="dark"><xsl:value-of disable-output-escaping="yes" select="Affects"/></font></b>.                    
            </xsl:otherwise>
        </xsl:choose>       
       </div>
       
	   <div style="padding-top: 5px;">Discovered by: <xsl:value-of disable-output-escaping="yes" select="ModuleName"/>.
	   </div>	   

 	   <!-- AOP -->	
	   <xsl:if test="AOP_SourceFile != ''"> 	   	   	   
           <img src='../Graphics/acusensor.png'/>
		   <div class="infotexttitle b{@color}">Vulnerability details</div>	  
		   <div class="infosection textjustify">
		   Source file: <b><font color="dark"><xsl:value-of disable-output-escaping="yes" select="AOP_SourceFile"/></font></b>
		   <xsl:if test="AOP_SourceLine != '0' and AOP_SourceLine != '-1'">
		   	 line: <b><font color="dark"><xsl:value-of disable-output-escaping="yes" select="AOP_SourceLine"/></font></b>
		   </xsl:if>
		   </div>
		   <div style="padding-top: 5px;" class="infosection textjustify">
		   Additional details:
		   <pre><xsl:value-of disable-output-escaping="yes" select="AOP_Additional"/></pre>
		   </div>
	   </xsl:if>

 	   <!-- Details -->	
	   <div class="infotexttitle b{@color}">Attack details</div>	    
	   <div class="infosection">	   	
	   <xsl:value-of disable-output-escaping="yes" select="Details"/>
			<xsl:if test="count(DetailsItems/DetailItem) > 0">
			   <ul>
				   <xsl:for-each select="DetailsItems/DetailItem">
					   	<li><xsl:value-of select="Value"/></li>
		   		   </xsl:for-each>
			   </ul>
			</xsl:if> 	   	
	   <br/><br/>

	   <!-- View HTTP Headers -->
	   	 	
	   	<xsl:if test="TechnicalDetails/Request != ''">
			<a class="nounder" href="javascript:toggle('id{@id}', 'id{@id}Img');">
				<div class="expandiv">
				<img border="0" id="id{@id}Img" align="absmiddle" src="../Graphics/expand.gif" hspace="4" onclick="toggle('id{@id}', 'id{@id}Img');"/> 
				 View HTTP headers
				</div>	  
		   	</a>	   
		   
		    <div class="viewhttp" id="id{@id}" style="display: none">	  		  
		   
		 	   	<div class="infotexttitle" style="border-color: #eeeeee">Request</div>
		 	   	<pre><xsl:value-of disable-output-escaping="yes" select="TechnicalDetails/Request"/></pre>
		 	   	<div class="infotexttitle" style="border-color: #eeeeee">Response</div>
		 	   	<pre><xsl:value-of disable-output-escaping="yes" select="TechnicalDetails/Response"/></pre>
		   	    	   
		   </div>
	   </xsl:if>

	   <!-- View HTML Response -->
	   	  
	   	<xsl:if test="TechnicalDetails/Response != ''">		
		   	<a href="javascript:toggleX('idf{@id}', 'idf{@id}Img', 'iframe{@id}', 'iframes/idf{@id}.html');">
				<div class="expandiv">
				<img border="0" id="idf{@id}Img" align="absmiddle" src="../Graphics/expand.gif" hspace="4" onclick="toggleX('idf{@id}', 'idf{@id}Img', 'iframe{@id}', 'iframes/idf{@id}.html');"/> 
				 View HTML response
		   		</div>	  
		   	</a>
		   
		   <div class="viewhttp" id="idf{@id}" style="display: none">			
				<!-- iframes/idf{@id}.html -->
				<IFRAME id="iframe{@id}" src="" scrolling="auto" width="90%" height="200" frameborder="0">
				  [Your user agent does not support frames or is currently configured
				  not to display frames. However, you may visit
				  <A href="iframes/idf{@id}.html">the related document.</A>]
				</IFRAME>				
		   </div>
	   </xsl:if>

  	   <!-- Operations -->		   
	   	<xsl:if test="TechnicalDetails/Request != ''">  	   
		    <a title="Click here to Launch the attack with HTTP Editor" href="#edit_with_http_editor_{@id}">
		   	<div class="expandiv">
		   	<img border="0" align="absmiddle" src="../Graphics/target.gif" hspace="4"/>
		   	Launch the attack with HTTP Editor
		   	</div>
		   	</a>
	   	</xsl:if>

	    <a title="Retest alert(s)" href="#retest_{@id}">
	   	<div class="expandiv">
	   	<img border="0" align="absmiddle" src="../Graphics/target.gif" hspace="4"/>
	   	Retest alert(s)
	   	</div>
	   	</a>	   
	   	
	    <a title="Mark this alert as a false positive (not to be included in future reports)" href="#report_false_positive_{@id}">
	   	<div class="expandiv">
	   	<img border="0" align="absmiddle" src="../Graphics/target.gif" hspace="4"/>
	   	Mark this alert as a false positive
	   	</div>
	   	</a>	   
	   
	   </div>
	   	   
	   <!-- Impact -->
	   <div class="infotexttitle b{@color}">The impact of this vulnerability</div>	    
	   <div class="infosection textjustify">
	   <xsl:value-of disable-output-escaping="yes" select="Impact"/><br/>
	   </div>
	   	   
	   <!-- Recommendation -->
	   <div class="infotexttitle b{@color}">How to fix this vulnerability</div>	   
	   <div class="infosection textjustify">
       <xsl:value-of disable-output-escaping="yes" select="Recommendation"/>
       </div>       

	   <!-- Classification -->
	   <xsl:if test="CWE != ''">		
            <div class="infotexttitle b{@color}">Classification</div>
            <table>
                <tr><td><a href="#open_new_window_https://cwe.mitre.org/" title="Common Weakness Enumeration">CWE</a></td><td><a href="#open_new_window_https://cwe.mitre.org/data/definitions/{CWE/@id}.html"><xsl:value-of disable-output-escaping="yes" select="CWE"/></a></td></tr>
            	<xsl:if test="count(CVEList/CVE) > 0">                       
                    <tr><td><a href="#open_new_window_http://cve.mitre.org/" title="Common Vulnerabilities and Exposures">CVE</a></td><td>                    
                		   <xsl:for-each select="CVEList/CVE">
                                <a href="#open_new_window_http://cve.mitre.org/cgi-bin/cvename.cgi?name={Id}"><xsl:value-of disable-output-escaping="yes" select="Id"/></a> 
                                &#160;
                		   </xsl:for-each>			   
                    </td></tr>
            	</xsl:if>
                <tr>
                    <td><a href="#open_new_window_http://www.first.org/cvss/cvss-guide" title="Common Vulnerability Scoring System">CVSS</a></td>
                    <td>Base Score: <b><xsl:value-of disable-output-escaping="yes" select="CVSS/Score"/></b> - <a href="#open_new_window_http://nvd.nist.gov/cvss.cfm?version=2&amp;name=&amp;vector={CVSS/Descriptor}"><xsl:value-of disable-output-escaping="yes" select="CVSS/Descriptor"/></a></td>
                </tr>
                <xsl:if test="CVSS/AV != ''">
                    <tr><td></td><td>Access Vector: <a href="#open_new_window_http://www.first.org/cvss/cvss-guide" title="{CVSS/AVdesc}"><xsl:value-of disable-output-escaping="yes" select="CVSS/AV"/></a></td></tr>
                </xsl:if>
                <xsl:if test="CVSS/AC != ''">
                    <tr><td></td><td>Access Complexity: <a href="#open_new_window_http://www.first.org/cvss/cvss-guide" title="{CVSS/ACdesc}"><xsl:value-of disable-output-escaping="yes" select="CVSS/AC"/></a></td></tr>
                </xsl:if>
                <xsl:if test="CVSS/Au != ''">
                    <tr><td></td><td>Authentication: <a href="#open_new_window_http://www.first.org/cvss/cvss-guide" title="{CVSS/Audesc}"><xsl:value-of disable-output-escaping="yes" select="CVSS/Au"/></a></td></tr>
                </xsl:if>
                <xsl:if test="CVSS/C != ''">
                    <tr><td></td><td>Confidentiality Impact: <a href="#open_new_window_http://www.first.org/cvss/cvss-guide" title="{CVSS/Cdesc}"><xsl:value-of disable-output-escaping="yes" select="CVSS/C"/></a></td></tr>
                </xsl:if>
                <xsl:if test="CVSS/I != ''">
                    <tr><td></td><td>Integrity Impact: <a href="#open_new_window_http://www.first.org/cvss/cvss-guide" title="{CVSS/Idesc}"><xsl:value-of disable-output-escaping="yes" select="CVSS/I"/></a></td></tr>
                </xsl:if>
                <xsl:if test="CVSS/A != ''">
                    <tr><td></td><td>Availability Impact: <a href="#open_new_window_http://www.first.org/cvss/cvss-guide" title="{CVSS/Adesc}"><xsl:value-of disable-output-escaping="yes" select="CVSS/A"/></a></td></tr>
                </xsl:if>
                <xsl:if test="CVSS/E != ''">
                    <tr><td></td><td>Exploitability: <a href="#open_new_window_http://www.first.org/cvss/cvss-guide" title="{CVSS/Edesc}"><xsl:value-of disable-output-escaping="yes" select="CVSS/E"/></a></td></tr>
                </xsl:if>
                <xsl:if test="CVSS/RL != ''">
                    <tr><td></td><td>Remediation Level: <a href="#open_new_window_http://www.first.org/cvss/cvss-guide" title="{CVSS/RLdesc}"><xsl:value-of disable-output-escaping="yes" select="CVSS/RL"/></a></td></tr>
                </xsl:if>
                <xsl:if test="CVSS/RC != ''">
                    <tr><td></td><td>Report Confidence: <a href="#open_new_window_http://www.first.org/cvss/cvss-guide" title="{CVSS/RCdesc}"><xsl:value-of disable-output-escaping="yes" select="CVSS/RC"/></a></td></tr>
                </xsl:if>
            </table>
       </xsl:if>

        <!-- Detailed Information -->
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