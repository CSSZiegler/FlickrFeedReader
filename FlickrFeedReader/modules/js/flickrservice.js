

// Global Data

	gTagValue = "dogs"; 
	gDataArray = [];

/**
****************************************************************
*	Name    : flickrfeedServicefn
*	Author  : Kony Solutions
*	Purpose : This function is used to invoke the flickr feed service using appmiddlewareinvokerasync method  .
****************************************************************
*/	
function flickrfeedServicefn(FormRef)
{		
		gFormRef = FormRef;	

		//#ifdef desktopweb
			if(hbxDesktopWebHome.txtbxTag.text != "" && hbxDesktopWebHome.txtbxTag.text != null && hbxDesktopWebHome.txtbxTag.text != undefined)
				gTagValue = hbxDesktopWebHome.txtbxTag.text;					
		//#endif
        if(frmHome.hbxHomeMain != null) 
        	frmHome.hbxHomeMain.setVisibility(false);
		
		var flickrfeed_inputparam = {};
	    flickrfeed_inputparam["serviceID"] = "flickrfeed";
	    flickrfeed_inputparam["tag"] = gTagValue;
	    flickrfeed_inputparam["httpheaders"] = {};
	    flickrfeed_inputparam["httpconfigs"] = {};	    	    
	    if (kony.os.deviceInfo().name == "android"){
	    	frmHome.lblHomeInfo.setVisibility(true);	    	
	    	frmHome.lblHomeInfo.text = "Loading.....";
	    }
	    else{
	    	kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
	    }
	    var flickrfeedcallback = appmiddlewareinvokerasync(flickrfeed_inputparam, flickrfeedCallback);
	    
}
	
/**
****************************************************************
*	Name    : flickrfeedCallback
*	Author  : Kony Solutions
*	Purpose : This function is callback function with status and result table of feed which triggers by appmiddlewareinvokerasync method.  .
****************************************************************
*/
function flickrfeedCallback(status, flickrfeed)
{		
	    if (status == 400){
	    	if (flickrfeed["opstatus"] == 0){	    		
	            if (flickrfeed != null && flickrfeed != undefined && flickrfeed["feed"] != null && flickrfeed["feed"] != undefined && flickrfeed["feed"].length != 0 && flickrfeed["feed"].length != undefined) {
	            	gDataArray = [];
	            	var imgLarge = "";	
	                for (var i = 0; i < flickrfeed["feed"].length; i++){
	                	if(kony.os.deviceInfo().model == "5G iPhone") //Defining image dimension of image widget in frmHomePageView form as per iOS screen resolution
						{
							imgLarge = {"src" : flickrfeed["feed"][i]["img"], "referenceWidth":320, "referenceHeight" :484};
						}
						else{
							imgLarge = flickrfeed["feed"][i]["img"];			
						}						
						//#ifdef desktopweb
							if(flickrfeed["feed"][i+2]){
								gDataArray.push({"imgSegHome1": flickrfeed["feed"][i]["img"],
					                        "lblSegHome1": flickrfeed["feed"][i]["title"],	                        
					                        "ImageLarge1": flickrfeed["feed"][i]["img"],                      
					                        "authorName1": flickrfeed["feed"][i]["authorName"],
					                        "tag1": flickrfeed["feed"][i]["tags"],
					                        "imgDetailLink1":flickrfeed["feed"][i]["link"],					        
					       					"imgSegHome2": flickrfeed["feed"][i+1]["img"],
					                        "lblSegHome2": flickrfeed["feed"][i+1]["title"],	                        
					                        "ImageLarge2": flickrfeed["feed"][i+1]["img"],                      
					                        "authorName2": flickrfeed["feed"][i+1]["authorName"],
					                        "tag2": flickrfeed["feed"][i+1]["tags"],
					                        "imgDetailLink2":flickrfeed["feed"][i+1]["link"],				       
 											"imgSegHome3": flickrfeed["feed"][i+2]["img"],
					                        "lblSegHome3": flickrfeed["feed"][i+2]["title"],	                        
					                        "ImageLarge3": flickrfeed["feed"][i+2]["img"],                      
					                        "authorName3": flickrfeed["feed"][i+2]["authorName"],
					                        "tag3": flickrfeed["feed"][i+2]["tags"],
					                        "imgDetailLink3":flickrfeed["feed"][i+2]["link"]
								 });								 
							}
							i=i+2;
						//#else
                    		gDataArray.push({
					                        "imgSegHome": flickrfeed["feed"][i]["img"],
					                        "lblSegHome": flickrfeed["feed"][i]["title"],	                        
					                        "ImageLarge": imgLarge,                      
					                        "authorName": flickrfeed["feed"][i]["authorName"],
					                        "tag": flickrfeed["feed"][i]["tags"],
					                        "imgDetailLink":flickrfeed["feed"][i]["link"]	                        
	                   				    	})	
	                   		frmSettings.txtbxTag.placeholder = ""+gTagValue;						
						//#endif						
	
	                }	                
	                settingDataFrmHome();
	                if(frmHome.hbxHomeMain != null) 
	                	frmHome.hbxHomeMain.setVisibility(true);                
	                frmHome.lblHomeInfo.setVisibility(false); //Loading...
		        }
   	            else{
   	            	kony.application.dismissLoadingScreen(); 
   	            	//#ifdef desktopweb
   	            		frmHome.lblHomeInfo.setVisibility(true);
   	            		frmHome.lblHomeInfo.text = "Data is not available for "+gTagValue+" tag.";
   	            		frmHome.segHome.setVisibility(false);
   	            	//#else
	   	            	frmHome.lblHomeInfo.setVisibility(true);
	   	            	frmHomePageView.lblHomeInfo.setVisibility(true);   	            	
		            	frmHome.lblHomeInfo.text = "Data is not available for "+gTagValue+" tag.";
		            	frmHomePageView.lblHomeInfo.text = "Data is not available for "+gTagValue+" tag.";	            	          	
		            	frmHome.segHome.setVisibility(false);
		            	frmHomePageView.segHome.setVisibility(false);       
		            	alert("Data is not available for "+gTagValue+" tag.");
		            //#endif    	            		            	
 					return;
	            }	
	        }
	       else{
	       		kony.application.dismissLoadingScreen();
	       		//#ifdef desktopweb
	       			frmHome.lblHomeInfo.setVisibility(true);
	       			frmHome.lblHomeInfo.text = "Cannot find host on this network connection.";
	       			frmHome.segHome.setVisibility(false);	       			
	       		//#else
					frmHome.lblHomeInfo.setVisibility(true);
					frmHomePageView.lblHomeInfo.setVisibility(true);					
		       		frmHome.lblHomeInfo.text = "Cannot find host on this network connection.";
		       		frmHomePageView.lblHomeInfo.text = "Cannot find host on this network connection.";
		       		frmHome.segHome.setVisibility(false);
		       		frmHomePageView.segHome.setVisibility(false);
		       		alert("Cannot find host on this network connection.");
	       		//#endif	       	
           	return;
	       }	        
	    }
	}
	

/**
****************************************************************
*	Name    : settingDataFrmHome
*	Author  : Kony Solutions
*	Purpose : This function is used to set the result data in segmented ui widget.
****************************************************************
*/
	
	function settingDataFrmHome()
	{		
		gFormRef.lblHomeInfo.setVisibility(false);
		gFormRef.segHome.setVisibility(true);
		
		//#ifdef desktopweb
			gFormRef.segHome.setData(gDataArray);
		//#else
			frmHome.segHome.setData(gDataArray);
			frmHomePageView.segHome.setData(gDataArray);
		//#endif

		if(frmHome.imageDetails != null){
			frmHome.imageDetails.src = gDataArray[0]["imgSegHome"];
			frmHome.lblImgDetailTitle.text = gDataArray[0]["lblSegHome"]; 
			frmHome.lblAuthor.text = gDataArray[0]["authorName"];
			frmHome.lblTags.text = gDataArray[0]["tag"];
		}
		kony.application.dismissLoadingScreen();
		gFormRef.show();											
			
	}

