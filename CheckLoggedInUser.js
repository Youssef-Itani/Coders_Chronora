function SetDefaultBranch(executionContext){
    debugger;
    var formContext = executionContext.getFormContext();
    var GetCurrentEntity = formContext.data.entity.getEntityName();
    console.log(GetCurrentEntity);

    var currentUserId = formContext.context.getUserId().replace("{","").replace("}","");

    if(GetCurrentEntity == "quote")
    {
        var CurrentForm = formContext.ui.formSelector.getCurrentItem().getLabel();
        if(CurrentForm === "Sales")
        {

            Xrm.WebApi.retrieveRecord("systemuser",currentUserId,"").then(
                function success(result) 
                {
                    console.log("Retrieved values: Name: " + result.fullname);
                    var UserName = result.fullname;
                    var UserBranch = [result.edm_branch];
                    //alert([result.edm_branch]);
                    var CreatedOn = formContext.getAttribute("createdon").getValue();
                    if(CreatedOn == null)
                    {
                        if(UserName.includes("Tudor")){
                            formContext.getAttribute("edm_branch").setValue(757580004);
                        }
                        if(UserName.includes("CPO")){
                            formContext.getAttribute("edm_branch").setValue(757580002);
                        }

                        
                    }
                },
                function (error) 
                {
                    console.log(error.message);
                }
            );
        }
    }
}