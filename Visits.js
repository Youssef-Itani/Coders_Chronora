function OnChangeOfficialProduct(executionContext){
    debugger;

    var formContext = executionContext.getFormContext();
    var OfficialProductReference = formContext.getAttribute("edm_officialproductreference");
    var DTSock = formContext.getAttribute("edm_dtstock");
    var JouniehStock = formContext.getAttribute("edm_jouniehstock");
    var TotalStock = formContext.getAttribute("edm_numberofpiecesinstock");
    var ProductName = formContext.getAttribute("edm_productname");
    var ProductReference = formContext.getAttribute("edm_productreference")

    
    if(OfficialProductReference.getValue() != null && OfficialProductReference.getValue() != undefined){

        var LookupProduct = OfficialProductReference.getValue();
        var LookupProductId = LookupProduct[0].id;
        var LookupProductEntityName = LookupProduct[0].entityType;

        Xrm.WebApi.online.retrieveRecord(LookupProductEntityName, LookupProductId, "").then(
            function success(result) {
                ProductName.setValue(result["name"]);
                ProductReference.setValue(result["productnumber"]);
                DTSock.setValue(result["edm_dtstock"]);
                JouniehStock.setValue(result["edm_jouniehstock"]);
                TotalStock.setValue(result["edm_dtstock"] + result["edm_jouniehstock"]);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }

    else{
        ProductName.setValue(null);
        ProductReference.setValue(null);
        DTSock.setValue(null);
        JouniehStock.setValue(null);
        TotalStock.setValue(null);
    }
}