var BookMarkFileName = 'BookMarkDB_DoNoDelete';


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
        var filesExcel = DriveApp.searchFiles('title ="'+BookMarkFileName+'"');
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
              Description: data[i][5],Protected: data[i][6],
              CreateTime: String(data[i][7])
            };

            ReturnList.push(tempObj);
        }
    }
    Logger.log(ReturnList);
    return JSON.stringify(ReturnList);
}








//***** SaveRecord  to google spreadsheet *************** //rowPosition	Title	Grouping	Type	Link	Protected	CreateTime	Description 
function SaveRecord(inputObject) {
    var folderName = 'TonyApp';
    var folder;
    var isNew = false;
    var folders = DriveApp.getFoldersByName(folderName); // replace by the right folder name, assuming there is only one folder with this name
    if (!folders.hasNext() || folders == null) {
        Logger.log('Failed');
        folder = DriveApp.createFolder(folderName);
    } else {
        while (folders.hasNext()) {
            folder = folders.next();
        }

    } //inputObject = {Link:"digdigme.com", Title:"DigMe - Test"};

    var filesExcel = DriveApp.searchFiles('title ="'+BookMarkFileName+'"');
    var FileId;
    if (!filesExcel.hasNext() || filesExcel == null) {
        Logger.log('No exist File, Need to create new Database');
        var ssNew = SpreadsheetApp.create(BookMarkFileName);
        ssNew.appendRow(["Id", "rowPosition", "Link","Title","Type","Description","Protected" ,"CreatedTime"]);
        FileId = ssNew.getId();
        isNew = true;
    } else { //
        Logger.log('exist File');
        while (filesExcel.hasNext()) {
            FileId = filesExcel.next().getId();
        }
    } //End IF-Else: Get File ID

    var Datas = SpreadsheetApp.openById(FileId); // Logger.log(Datas.getName());

    var CurrentTime = new Date();
    var UniqueId = new Date().getTime();
    Datas.appendRow([UniqueId,1,inputObject.Link, inputObject.Title,inputObject.Type,inputObject.Description,false, CurrentTime]);

    if (isNew) {
        var copyFile = DriveApp.getFileById(FileId);
        folder.addFile(copyFile);
        DriveApp.getRootFolder().removeFile(copyFile);
    }


}


