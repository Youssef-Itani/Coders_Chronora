function navigateToVisitForm() {
    var entityFormOptions = {};
    entityFormOptions["entityName"] = "edm_visit"; // Replace with your entity name
    entityFormOptions["formId"] = "31b52226-2828-ed11-9db1-000d3aa950e8"; // Replace with your form ID
 
    Xrm.Navigation.openForm(entityFormOptions).then(
        function (success) {
            console.log("Form opened successfully");
        },
        function (error) {
            console.log("Error opening form: " + error.message);
        }
    );
}