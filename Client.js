function RunOnSelected(executionContext) {
    var formContext = executionContext.getFormContext();
    var selected = formContext.data.entity;
    var Id = selected.getId();
    alert(Id);
 }
 

 function GetRecordInformation(item)
{
    debugger;
    var selectedItem = item[0];
    alert("You have Select Record with Id=" + selectedItem.Id + "\nName=" + selectedItem.Name + "\nEntity Type Code=" + selectedItem.TypeCode.toString() + "\nEntity=" + selectedItem.TypeName);
}