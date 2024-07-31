function autofillTechnicalFieldsBasedOnProduct(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var productLookupField = formContext.getAttribute("edm_rmc");

    // Check if the lookup field has a value
    if (productLookupField.getValue() != undefined && productLookupField.getValue() != null) {
        var productRecordID = productLookupField.getValue()[0].id;

        Xrm.WebApi.online.retrieveRecord("product", productRecordID, "?$select=edm_onlinestock,edm_swissfrancprice,productnumber").then(
            function success(result) {
                // Autofill the 'Quantity' field in the current technical record based on the 'Online Stock' value
                var onlinestockValue = result.edm_onlinestock;
                formContext.getAttribute("edm_quantity").setValue(onlinestockValue);

                // Autofill the 'Price' field in the current technical record based on the 'Swiss Franc Price' value
                var swissFrancPriceValue = result.edm_swissfrancprice;
                formContext.getAttribute("edm_price").setValue(swissFrancPriceValue);

                // Autofill the 'Reference' field in the current technical record based on the 'Product Number' value
                var productNumberValue = result.productnumber;
                formContext.getAttribute("edm_reference").setValue(productNumberValue);

            },

        );
    } else {
        // If the lookup field is cleared, set the fields in the technical record to null
        formContext.getAttribute("edm_quantity").setValue(null);
        formContext.getAttribute("edm_price").setValue(null);
        formContext.getAttribute("edm_reference").setValue(null);
    }
}