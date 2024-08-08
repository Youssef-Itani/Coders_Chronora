function ShowActivityTypes(executionContext){
    debugger;
    var formContext = executionContext.getFormContext();
    var ActivityType = formContext.getAttribute("edm_activitytype");

    if(ActivityType.getValue() != null && ActivityType.getValue() != undefined){
        var ActivityTypeValue = ActivityType.getValue();
        switch(ActivityTypeValue){
            case 1:
                formContext.getControl("edm_phonecalls").setVisible(true);
                formContext.getAttribute("edm_phonecalls").setRequiredLevel("required");
                formContext.getControl("edm_visits").setVisible(false);
                formContext.getAttribute("edm_visits").setRequiredLevel("none");
                break;
            case 2:
                formContext.getControl("edm_phonecalls").setVisible(false);
                formContext.getAttribute("edm_phonecalls").setRequiredLevel("none");
                formContext.getControl("edm_visits").setVisible(true);
                formContext.getAttribute("edm_visits").setRequiredLevel("required");
                break;
        }
    }
    else{
        var AllFields = ["edm_phonecalls","edm_visits"];
        for(var i = 0; i < AllFields.length; i++){
            formContext.getControl(AllFields[i]).setVisible(false);
        }
    }
}