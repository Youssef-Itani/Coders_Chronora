// Function to get the invoice data
function GetInvoiceType(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var Quote = formContext.getAttribute("quoteid").getValue();

    if (Quote != null) {
        var QuoteId = Quote[0].id; //record id
        var QuoteType = Quote[0].entityType; //table name/id

        Xrm.WebApi.online.retrieveRecord(QuoteType, QuoteId, "").then(
            function success(result) {
                debugger;
                formContext.getAttribute("edm_invoicetype").setValue(result["edm_invoicetypeid"]);
                formContext.getAttribute("edm_returnid").setValue(result["revisionnumber"]);
                formContext.getAttribute("edm_branch").setValue(result["edm_branch"]);
                // formContext.getAttribute("edm_iscpo").setValue(result["edm_cpo"]);

                // Call the lockFormForUser function after GetInvoiceType completes
                lockFormForUser(executionContext);
                
                // Check for return and adjust amount
                var ReturnId = formContext.getAttribute("edm_returnid").getValue();
                var InvoiceAmount = formContext.getAttribute("extendedamount").getValue();
                var ReturnAmount;

                if (ReturnId >= 1) {
                    formContext.getAttribute("edm_return").setValue(true);
                    ReturnAmount = InvoiceAmount * (-1);
                    formContext.getAttribute("extendedamount").setValue(ReturnAmount);
                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

function QuoteIsCpo(executionContext){
    debugger;
    var formContext = executionContext.getFormContext();

    var Quote = formContext.getAttribute("quoteid").getValue();

    if (Quote != null) {
        var QuoteId = Quote[0].id; //record id
        var QuoteType = Quote[0].entityType; //table name/id

        Xrm.WebApi.online.retrieveRecord(QuoteType, QuoteId, "").then(
            function success(result) {
                formContext.getAttribute("edm_iscpo").setValue(result["edm_cpo"]);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

function PiecesByCost(executionContext){
    debugger;
    var formContext = executionContext.getFormContext();
    
    var IsCPO = formContext.getAttribute("edm_iscpo").getValue();
    var ProductLookup = formContext.getAttribute("productid");
    if(ProductLookup.getValue() != undefined && ProductLookup.getValue() != null){
        var ProductLookupValue = ProductLookup.getValue();
        var ProductLookupID = ProductLookupValue[0].id;
        var ProductLookupType = ProductLookupValue[0].entityType;
        if(IsCPO != null && IsCPO != undefined){
            if(IsCPO == true){
                Xrm.WebApi.online.retrieveRecord(ProductLookupType, ProductLookupID, "").then(
                    function success(result) {
                        formContext.getAttribute("edm_unitprice").setValue(result["currentcost"]);
                        formContext.getAttribute("priceperunit").setValue(result["currentcost"]);
                    },
                    function (error) {
                        Xrm.Utility.alertDialog(error.message);
                    }
                );
            }
        }
        
    }

}

function CalculateProductCost(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var PricePerUnit = formContext.getAttribute("priceperunit").getValue();
    var UnitPrice = formContext.getAttribute("edm_unitprice").getValue();
    var Quantity = formContext.getAttribute("quantity").getValue();
    var MD = (PricePerUnit - UnitPrice)*Quantity;
    formContext.getAttribute("manualdiscountamount").setValue(MD);

}

function lockFormForUser(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();   
    // Get the current user's ID
    var currentUserId = formContext.context.getUserId().replace("{","").replace("}","");

    // Specify the user's ID you want to lock the form for
    var userIdToLock = "39b459f4-aaea-ee11-a203-000d3a2b9c28";
    var upperCase = userIdToLock.toUpperCase();
    var invoiceType = formContext.getAttribute("edm_invoicetype").getValue();

    // Check if the current user's ID matches the specified user ID
    if (currentUserId == upperCase && invoiceType !== 2) {
       var formControls = formContext.getControl();
            formControls.forEach(control => {
                control.setDisabled(true);
            })
    }
}


function preFilterLookup(executionContext) {
    var formContext = executionContext.getFormContext();
    if (formContext.ui.controls.get("productid") != "undefined" && formContext.ui.controls.get("productid") != null) {
        formContext.getControl("productid").addPreSearch(function () {
            addLookupFilter(formContext);
        });
    }
}

function addLookupFilter(formContext) {

    var InvoiceLineType = formContext.getAttribute("edm_invoicetype").getValue();
    if (InvoiceLineType != null && InvoiceLineType == 2) { //sales

        fetchXml = "<filter type='or'><condition attribute='edm_lasttrial' operator='eq' value='Tudor' /><condition attribute='edm_lasttrial' operator='eq' value='Rolex' /><condition attribute='productnumber' operator='eq' value='GC'/></filter>";

        formContext.getControl("productid").addCustomFilter(fetchXml);

    }
    else if (InvoiceLineType != null && InvoiceLineType == 1) { //repair

        fetchXml = "<filter type='and'><filter type='or'><condition attribute='edm_lasttrial' operator='eq' value='Rolex Spare Parts' /><condition attribute='edm_lasttrial' operator='eq' value='Tudor Spare Parts' /><condition attribute='edm_lasttrial' operator='eq' value='Dial' /><condition attribute='edm_lasttrial' operator='eq' value='Strap' /></filter><condition attribute='quantityonhand' operator='gt' value='0' /></filter>";

        formContext.getControl("productid").addCustomFilter(fetchXml);
    }

}