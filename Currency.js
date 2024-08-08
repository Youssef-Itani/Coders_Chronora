//test
function GetCurrentCurrency(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    var currentCurrGuid = Xrm.Page.data.entity.getId();

    Xrm.WebApi.retrieveRecord("TransactionCurrency", "321df226-9165-ed11-9561-6045bd8c564a", "?$select=exchangerate,isocurrencycode").then(
        function success(result) {
            if (result != null && result != undefined) {
                var exchangerate = result["exchangerate"];
                var exchangerate_formatted = result["exchangerate@OData.Community.Display.V1.FormattedValue"];
                var isocurrencycode = result["isocurrencycode"];
            }
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );

}

function GetCurrentpriceLsit(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    var currentPricelistGuid = Xrm.Page.data.entity.getId();

    Xrm.WebApi.retrieveRecord("pricelevel", currentPricelistGuid, "?$select=name,edm_currencyexchangerate").then(
        function success(result) {
            if (result != null && result != undefined) {
                var name = result["name"];
                var exchangerate = result["edm_currencyexchangerate"];
                var exchangerate_formatted = result["exchangerate@OData.Community.Display.V1.FormattedValue"];

                Xrm.WebApi.retrieveMultipleRecords("pricelevel", "?fetchXml=" + encodeURIComponent(priceListQuery))
                    .then(function (results) {
                        if (results.entities.length > 0) {
                            var priceList = results.entities[0];
                            var priceListId = priceList.pricelevelid;
                        }
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });




            }
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );

}



function UpdatePriceListItemAmount(){

    var priceListQuery = "<fetch  top='1' version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
    "<entity name='pricelevel'>" +
    "<attribute name='pricelevelid' />" +
    "<attribute name='name' />" +
    "<attribute name='begindate' />" +
    "<order attribute='begindate' descending='true' />" +
    "<attribute name='edm_currencyexchangerate'/>" +
    "<filter type='and'>" +
    "<condition attribute='statecode' operator='eq' value='0' />" +
    "</filter>" +
    "</entity>" +
    "</fetch>";

Xrm.WebApi.retrieveMultipleRecords("pricelevel", "?fetchXml=" + encodeURIComponent(priceListQuery))
    .then(function (results) {
        if (results.entities.length > 0) {
            var priceList = results.entities[0];
            var priceListId = priceList.pricelevelid;
            var exchangeRate = priceList.edm_currencyexchangerate;
            
            var priceListItems = "<fetch>" +
                "<entity name='productpricelevel'>" +
                "<attribute name='productpricelevelid'/>" +
                "<attribute name='pricelevelid'/>" +
                "<attribute name='edm_chfamount'/>" +
                "<attribute name='productid'/>" +
                "<attribute name='amount'/>" +
                "<filter>" +
                "<condition attribute='pricelevelid' operator='eq' value='" + priceListId/*2b5b1ac3-343f-ed11-9db0-6045bd8c564a*/ + "'uitype='pricelevel'/>"+
            "</filter>" +
                "</entity>" +
                "</fetch>";

            Xrm.WebApi.retrieveMultipleRecords("productpricelevel", "?fetchXml=" + encodeURIComponent(priceListItems))
                .then(function (results) {
                    if (results.entities.length > 0) {

                        foreach(item in results.entities)
                        {
                            var priceListItem = item;
                            var priceListitemId = priceListItem.productpricelevelid;
                            var CHFAmount = priceListItem.edm_chfamount;
                            var entity = {};
                            entity.amount = exchangeRate * CHFAmount;

                            Xrm.WebApi.online.updateRecord("productpricelevel", priceListitemId, entity).then(
                                function success(result) {
                                    //  var updatedEntityId = result.id;
                                },
                                function (error) {
                                    Xrm.Utility.alertDialog(error.message);
                                }
                            );

                        }

                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        }
    })
    .catch(function (error) {
        console.log(error.message);
    });


}

