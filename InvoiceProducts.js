// Function to get the invoice data
function GetInvoiceType(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var Quote = formContext.getAttribute("quoteid").getValue();

    if (Quote != null) {
        var QuoteId = Quote[0].id;
        var QuoteType = Quote[0].entityType;

        Xrm.WebApi.online.retrieveRecord(QuoteType, QuoteId, "").then(
            function success(result) {
                formContext.getAttribute("edm_invoicetype").setValue(result["edm_invoicetypeid"]);
                formContext.getAttribute("edm_returnid").setValue(result["revisionnumber"]);
                formContext.getAttribute("edm_branch").setValue(result["edm_branch"]);

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
