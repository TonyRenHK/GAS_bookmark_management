function doGet() {//https://script.google.com/macros/s/AKfycbyHMYAOOPsa8gfpAxZ7fdyNZoQPDTCDa4TnsuxIYuMFmpwDtmY/exec
    return HtmlService.createHtmlOutputFromFile('index')
        .setSandboxMode(HtmlService.SandboxMode.IFRAME).addMetaTag('viewport', 'width=device-width, initial-scale=1');
}


/*
Get Link Title from URL
//Test Site: http://www.hknlc.org/ http://www.digdigme.com/
*/
function GetLinkTitle(inputLink) {
    var response = UrlFetchApp.fetch(inputLink);
    var title = response.getContentText().match("<title>(.*?)</title>")[1]; // Logger.log(title);
    return title;
}



  //rowPosition	Title	Grouping	Type	Link	Protected	CreateTime	Description
  

