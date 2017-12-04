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
  



/* Loading Data From Database */
function LoadingData(varr) {

    var folderName = 'TonyApp';
    var folder, FileId;
    var isOld = true;
    var ReturnList = [];
    var folders = DriveApp.getFoldersByName(folderName);
    if (folders.hasNext() || folders != null) {
        while (folders.hasNext()) {
            folder = folders.next();
        }
    } else {
        isOld = false;
    }

    if (isOld) {
        var filesExcel = DriveApp.searchFiles('title ="BookMarkDB"');
        if (filesExcel.hasNext() || filesExcel != null) {
            while (filesExcel.hasNext()) {
                FileId = filesExcel.next().getId();
            }
        } else {
            isOld = false;
        }
    }

    if (isOld) {
        var Datas = SpreadsheetApp.openById(FileId);
        var data = Datas.getActiveSheet().getDataRange().getValues();
        for (i in data) { // Logger.log(data[i][1]);
            var tempObj = {
                Id: data[i][0],
                rowPosition: data[i][1],
                Link: data[i][2],
              Title: data[i][3],
              Type: data[i][4],
              Protected: data[i][6],Description: data[i][5],
              CreateTime: String(data[i][7])
            };

            ReturnList.push(tempObj);
        }
    }
    Logger.log(ReturnList);
    return JSON.stringify(ReturnList);
}

