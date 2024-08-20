function GetGiftCardAmount(executionContext) {
    debugger;
    //RetrieveData(executionContext, "edm_giftcardlookup", "edm_amount", "edm_giftcard", "edm_remainingamount","edm_remaininggiftamount");
    //RetrieveData(executionContext, "edm_giftcardlookup", "edm_client", "customerid");
    var formContext = executionContext.getFormContext();
    var LookupGiftCard = formContext.getAttribute("edm_giftcardlookup");

    if(LookupGiftCard.getValue() != null && LookupGiftCard.getValue() != undefined){
        var GiftCard = LookupGiftCard.getValue();
        var GiftCardId = GiftCard[0].id;
        var GiftCardEntityType = GiftCard[0].entityType;
        Xrm.WebApi.online.retrieveRecord(GiftCardEntityType, GiftCardId, "").then(
            function success(result) {
                formContext.getAttribute("edm_giftcard").setValue(result["edm_amount"]);
                formContext.getAttribute("edm_remaininggiftamount").setValue(result["edm_remainingamount"]);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );

    }
    else{
        formContext.getAttribute("edm_giftcard").setValue(0);
        formContext.getAttribute("edm_remaininggiftamount").setValue(0);
    }
}

function HideShowGiftCustomer(executionContext){
    debugger;
    var formContext = executionContext.getFormContext();
    var GiftInvoice = formContext.getAttribute("edm_giftcardinvoice").getValue();
    var Gift = formContext.getAttribute("edm_gift").getValue();
    if(GiftInvoice == true || Gift == true){
        formContext.getControl("edm_giftcustomer").setVisible(true);
    }
    if(GiftInvoice == false && Gift == false){
        formContext.getControl("edm_giftcustomer").setVisible(false);
    }
    
}