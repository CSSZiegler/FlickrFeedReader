
/**
****************************************************************
*	Name    : changeView
*	Author  : Kony Solutions
*	Purpose : To chnage the view type and display the results in a segment.
****************************************************************
*/
function changeView(FormName)
{			
	if(FormName == undefined) FormName = frmSettings;
	if(FormName.txtbxTag.text == null || FormName.txtbxTag.text == "")
		gTagValue = "dogs";
	else
		gTagValue = FormName.txtbxTag.text;
											
	if(FormName.cmbbxViews.selectedKey == "key2"){			
		kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);			
		flickrfeedServicefn(frmHomePageView);
		}
	else{
		kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
		flickrfeedServicefn(frmHome);
		}
	if(FormName.id == "popupSettings") popupSettings.dismiss();	
}


// Form Navigation
	
function navfrmHome()
{
	frmHome.show();
}

//Form 
function navfrmSettings()
{
	frmSettings.show();
}

/**
****************************************************************
*	Name    : navpopupSettings
*	Author  : Kony Solutions
*	Purpose : To show popupsettings on click of settings button in frmHome(tablet)
****************************************************************
*/	
function navpopupSettings()
{
	//#ifdef ipad
			var popupSettingsContext={"widget":frmHome.lblpopupAnchor,"anchor":"bottom","sizetoanchorwidth":true};       
			popupSettings.setContext(popupSettingsContext);
	//#endif

		popupSettings.show();
}
	
/**
****************************************************************
*	Name    : scrollToBeginningfn
*	Author  : Kony Solutions
*	Purpose : The control to scroll to the beginning of the form i.e. defined in form preshow event.
****************************************************************
*/	
function scrollToBeginningfn(segmentID)
{
	if(gDataArray != [])
		segmentID.selectedIndex = [0,0];//indicates 1st row in 1st section of segmented ui.
}

/**
****************************************************************
*	Name    : getPreviousFormFn
*	Author  : Kony Solutions
*	Purpose : used to navigate previous form using getPreviousForm() API.
****************************************************************
*/	
function getPreviousFormFn()
{
	kony.application.getPreviousForm().show();
}

/**
****************************************************************
*	Name    : getImageDetails
*	Author  : Kony Solutions
*	Purpose : This function is defined on row click of segment in frmHome for showing image details in frmImgDetail .
****************************************************************
*/
function getImageDetails(eventObj, channelType)
{
		gDesktopWebURL = "";
		//#ifdef desktopweb
			if(eventObj.id == "vBoxSegHomeTemp1"){
			    frmImgDetail.imageDetails.src = frmHome["segHome"]["selectedItems"][0]["imgSegHome1"];
			    frmImgDetail.lblAuthor.text = frmHome["segHome"]["selectedItems"][0]["authorName1"];
			    frmImgDetail.lblImgDetailTitle.text = frmHome["segHome"]["selectedItems"][0]["lblSegHome1"];
			    frmImgDetail.lblTags.text = frmHome["segHome"]["selectedItems"][0]["tag1"];
			    gDesktopWebURL = frmHome["segHome"]["selectedItems"][0]["imgDetailLink1"];
			}
			if(eventObj.id == "vBoxSegHomeTemp2"){
			    frmImgDetail.imageDetails.src = frmHome["segHome"]["selectedItems"][0]["imgSegHome2"];
			    frmImgDetail.lblAuthor.text = frmHome["segHome"]["selectedItems"][0]["authorName2"];
			    frmImgDetail.lblImgDetailTitle.text = frmHome["segHome"]["selectedItems"][0]["lblSegHome2"];
			    frmImgDetail.lblTags.text = frmHome["segHome"]["selectedItems"][0]["tag2"];
			    gDesktopWebURL = frmHome["segHome"]["selectedItems"][0]["imgDetailLink2"];
		    }
			if(eventObj.id == "vBoxSegHomeTemp3"){	    
			    frmImgDetail.imageDetails.src = frmHome["segHome"]["selectedItems"][0]["imgSegHome3"];
			    frmImgDetail.lblAuthor.text = frmHome["segHome"]["selectedItems"][0]["authorName3"];
			    frmImgDetail.lblImgDetailTitle.text = frmHome["segHome"]["selectedItems"][0]["lblSegHome3"];
			    frmImgDetail.lblTags.text = frmHome["segHome"]["selectedItems"][0]["tag3"];
			    gDesktopWebURL = frmHome["segHome"]["selectedItems"][0]["imgDetailLink3"];
			}	
			frmImgDetail.show();		
		//#endif
		
		if(channelType == "tablet"){
		    frmHome.imageDetails.src = frmHome["segHome"]["selectedItems"][0]["imgSegHome"];
		    frmHome.lblAuthor.text = frmHome["segHome"]["selectedItems"][0]["authorName"];
		    frmHome.lblImgDetailTitle.text = frmHome["segHome"]["selectedItems"][0]["lblSegHome"];
		    frmHome.lblTags.text = frmHome["segHome"]["selectedItems"][0]["tag"];
		    //frmHome.show();	
		 }		
		else if(channelType == "mobile"){
		    frmImgDetail.imageDetails.src = frmHome["segHome"]["selectedItems"][0]["imgSegHome"];
		    frmImgDetail.lblAuthor.text = frmHome["segHome"]["selectedItems"][0]["authorName"];
		    frmImgDetail.lblImgDetailTitle.text = frmHome["segHome"]["selectedItems"][0]["lblSegHome"];
		    frmImgDetail.lblTags.text = frmHome["segHome"]["selectedItems"][0]["tag"];	
		    frmImgDetail.show();	
		}
		
}
	

/**
****************************************************************
*	Name    : nativeBrowser
*	Author  : Kony Solutions
*	Purpose : This function is defined on click of image in image detail(frmDetails) to navigation to native browser.
****************************************************************
*/

function nativeBrowser(segmentID)
{
		//#ifdef desktopweb
			var imgDetail_link = gDesktopWebURL;
		//#else
			var imgDetail_link = segmentID["selectedItems"][0]["imgDetailLink"];	
		//#endif		
		kony.application.openURL(imgDetail_link);
}	
	
	
	