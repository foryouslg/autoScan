<!-- acunetix wvs report item style  -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN" doctype-system="http://www.w3.org/TR/html4/loose.dtd"/>
<xsl:template match="/">
 <html>

  <head>
  	<link rel="stylesheet" type="text/css" href="infostyle.css"/>
  </head> 

  <body style="	margin: 0px; padding: 0px;">

 	<!-- TopBar -->
    
	<div style="height: 29px; margin-top:3px; margin-bottom:16px; margin-left:4px; margin-right:4px;border-bottom:#CCCCCC 1px solid">
		<img src="../Graphics/acuheader-left.png" width="113" height="24" style="float:left;"/>
		<img src="../Graphics/acuheader-right.png" width="186" height="24" style="float:right;"/>
	</div>	

 	<!-- End TopBar -->	
	<div style="margin: 10px">
	 
 	<!-- changesources -->
	<xsl:if test="count(changes/changesource) > 0">
 
	  <xsl:for-each select="changes/changesource">  

	  <table width="100%" bgcolor="#ededed" border="0" cellSpacing="1" cellPadding="2">	  
	   
	   <!-- changes -->		   	  
	   <tr>	  
	  	   <!-- changesource -->		   
		   <td valign="top" align="left" bgcolor="#ededed" colspan="2">	   
		   <font color="black"><b><xsl:value-of select="@name"/></b></font>
		   </td>
	   </tr>	   
   
	   <xsl:if test="count(categories/category) > 0">	   
	   
	   <xsl:for-each select="categories/category">  
	   <xsl:if test="count(addedchange) > 0 or count(deletedchange) > 0 or count(modifiedchange) > 0">
	   
	   <tr>	  
	  	   <!-- category -->	
		   <td valign="top" align="left" bgcolor="white" colspan="2">	   
		   <b><font color="black">Category <i><xsl:value-of disable-output-escaping="yes" select="@name"/></i></font></b>
		   </td>
		   
	   </tr>
	   
  	   <!-- addedchanges -->		   
  	   <xsl:if test="count(addedchange) > 0">
  	   
  	   <tr>	
  	   	   <td width="1%" bgcolor="#F0FFF0"><img src="empty.gif"/></td>	
   	  	   <td bgcolor="#F0FFF0">
   	  	   Added items
   	  	   </td>
   	  	   
  	   </tr>
   	  	   
	   <xsl:for-each select="addedchange">  		     
	   
		   <tr>	  
		    <td width="1%" bgcolor="#F0FFF0"><img src="empty.gif"/></td>
			<td bgcolor="white" valign="top" align="left">		   
			  	   <!-- addedchange -->		   
				   <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
				   <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
				   <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
				   <font color="black"><xsl:value-of disable-output-escaping="yes" select="@item"/></font>
			</td>
		   </tr>
			   
	   </xsl:for-each>
	   </xsl:if>
	 	   
	  	   <!-- deletedchanges -->		   
  	   <xsl:if test="count(deletedchange) > 0">
  	   
  	   <tr>	
  	   		   <td width="1%" bgcolor="#FFF0F0"><img src="empty.gif"/></td>
  	   		   <td bgcolor="#FFF0F0" valign="top" align="left">
		  	   Deleted items
		  	   </td>
  	   </tr>	  	   
	  	   
	   <xsl:for-each select="deletedchange">		   
		   <tr>	  
			  	   <!-- deletedchange -->		   
			  	   <td bgcolor="#FFF0F0"><img src="empty.gif"/></td>
				   <td valign="top" align="left" bgcolor="white">	   
				   <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
				   <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
				   <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
				   <font color="black"><xsl:value-of disable-output-escaping="yes" select="@item"/></font>
				   </td>			   
			   
		   </tr>
			   
 	   </xsl:for-each>
   	   </xsl:if>   
	   
  	   <!-- modifiedchanges -->		   
  	   <xsl:if test="count(modifiedchange) > 0">
	  	   
	  	   <tr>	
	  	   	   <td width="1%" bgcolor="#F0F0FF"><img src="empty.gif"/></td>
	  	   	   <td bgcolor="#F0F0FF" valign="top" align="left">
			   Changed items
		  	   </td>		  	   
	  	   </tr> 

		   <tr>		  

			   <td width="1%" bgcolor="#F0F0FF"><img src="empty.gif"/></td>	
			   <td bgcolor="white" valign="top" align="left">	
		  	   <table bgcolor="white" border="0" cellSpacing="2" cellPadding="2">
	  	   
		  	   <tr>
			  	   <td bgcolor="#f5f5f5" valign="top" align="left" style="box1">
				   <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
				   <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>	  	   
			  	   Item
			  	   </td>
		  	   
			  	   <td bgcolor="#f5f5f5" valign="top" align="left">Before</td>
			  	   <td bgcolor="#f5f5f5" valign="top" align="left">After</td>
		  	   </tr>		  	   
		  	   
			   <xsl:for-each select="modifiedchange">  		     
			   
				   <tr>	  
				  	   <!-- modifiedchange -->		   
					   <td valign="top" align="left" bgcolor="white">	  
						   <font color="black"><xsl:value-of disable-output-escaping="yes" select="@item"/></font>
					   </td>
					   
					   <td valign="top" align="left" bgcolor="white">	  
						   <font color="black"><xsl:value-of disable-output-escaping="yes" select="@before"/></font>
					   </td>

					   <td valign="top" align="left" bgcolor="white">	  
						   <font color="black"><xsl:value-of disable-output-escaping="yes" select="@after"/></font>
					   </td>
				   </tr>
				   
		 	   </xsl:for-each>	  
		 	   
		 	  </table>	
		 	  </td>	  
		  	   
		   </tr>	 	   

	   </xsl:if> 
	   
	   </xsl:if>
	   
	   <xsl:if test="count(addedchange) = 0 and count(deletedchange) = 0 and count(modifiedchange) = 0">   
 	    	<tr>
 	    	<td colspan="2" bgcolor="white"> 
 	    	<xsl:value-of disable-output-escaping="yes" select="@name"/>
 	    	</td>
 	    	</tr>	   
	   </xsl:if>
		
 	   </xsl:for-each> 	
 	   
 	   </xsl:if> <!-- count(categories/category) > 0 -->
 	   
 	   <xsl:if test="count(categories/category) = 0">
 	    	<tr>
 	    	<td colspan="2" bgcolor="white"> 
 	    	There are no changes.
 	    	</td>
 	    	</tr>
 	   </xsl:if>
 	      

	  </table>
	   
	  </xsl:for-each> <!-- changesources -->
	 
    </xsl:if> <!-- changesources -->

	<!-- No changesource are available -->
	<xsl:if test="count(changes/changesource) = 0">
		No items are available. <br/>
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