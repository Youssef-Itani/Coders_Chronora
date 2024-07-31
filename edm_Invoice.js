 function fillyearanddate() {
     var current = new Date();
     var year = current.getFullYear();
	 if(year != null){
	 var y=year.toString();
     var workyear = Xrm.Page.getAttribute("shipto_contactname");
     var date = Xrm.Page.getAttribute("new_date");
    if(workyear != null && date != null){
     if (workyear.getValue() == null)
     {
        Xrm.Page.getAttribute("shipto_contactname").setValue(y);
         Xrm.Page.getAttribute("shipto_contactname").setSubmitMode("always");
     }

     Xrm.Page.getAttribute("new_date").setValue(current);
     Xrm.Page.getAttribute("new_date").setSubmitMode("always");

    
 }}}

function GetBalance() {
          var realcustomer = Xrm.Page.getAttribute("customerid").getValue();
	var statuscode = Xrm.Page.getAttribute("statecode");
	
    //var giftcustomer = Xrm.Page.getAttribute("edm_giftcustomer").getValue();
	var balancetype = Xrm.Page.getAttribute("edm_balance").getValue();
	var returnId = Xrm.Page.getAttribute("revisionnumber").getValue();
	if(statuscode != null){
		var statuscode = Xrm.Page.getAttribute("statuscode").getValue();
	if(statuscode == 1 ){
    if (realcustomer != null && balancetype==757580000 ) {
        var contactID = realcustomer[0].id;
        SDK.REST.retrieveRecord(contactID, "Contact", null, null,
            function (result) {
                var CurrentBalance = result.edm_CurrentBalance.Value;
				var Balance = CurrentBalance* (-1);
               
                Xrm.Page.getAttribute("edm_currentbalane").setValue(Balance);
                Xrm.Page.getAttribute("edm_currentbalane").setSubmitMode("always");
             
            },

            function (error) {

                alert('Error:' + error.message);
            }
        )

    }
	
	if (realcustomer == null && balancetype==757580000 ) {
                Xrm.Page.getAttribute("edm_currentbalane").setValue(null);
                Xrm.Page.getAttribute("edm_currentbalane").setSubmitMode("always");
    }
}}}


function SalesTotals() {
	if(Xrm.Page.ui.getFormType() != 4){
	  var balance = Xrm.Page.getAttribute("edm_currentbalane").getValue();
    var giftcard = Xrm.Page.getAttribute("new_giftcard").getValue();
    var cashamount = Xrm.Page.getAttribute("edm_cashamount").getValue();
    var checkamount = Xrm.Page.getAttribute("edm_checkamount").getValue();
    var creditcardamount = Xrm.Page.getAttribute("edm_creditcardamount").getValue();
	var totalamount = Xrm.Page.getAttribute("totalamount").getValue();
    var paidamount= giftcard+cashamount+checkamount+creditcardamount;
	//if (totalamount > 0){
	var remainingamount= totalamount-(paidamount+balance);
        Xrm.Page.getAttribute("edm_paidamount").setValue(paidamount);
        Xrm.Page.getAttribute("edm_paidamount").setSubmitMode("always");
        Xrm.Page.getAttribute("edm_remainingamount").setValue(remainingamount);
        Xrm.Page.getAttribute("edm_remainingamount").setSubmitMode("always");

	 }
	
}
function totals() {

	if(Xrm.Page.ui.getFormType() != 4){
    var balance = Xrm.Page.getAttribute("edm_currentbalane").getValue();
    var giftcard = Xrm.Page.getAttribute("new_giftcard").getValue();
    var cashamount = Xrm.Page.getAttribute("edm_cashamount").getValue();
    var checkamount = Xrm.Page.getAttribute("edm_checkamount").getValue();
    var creditcardamount = Xrm.Page.getAttribute("edm_creditcardamount").getValue();
	var standardPartsCost = Xrm.Page.getAttribute("edm_standardpartscost").getValue();
	var totalamount = Xrm.Page.getAttribute("totalamount").getValue();
    var paidamount= giftcard+cashamount+creditcardamount+checkamount;
	var totalDiscountAmount = Xrm.Page.getAttribute("totaldiscountamount").getValue();
	var totalSummation = Xrm.Page.getAttribute("edm_totalamount").getValue();
	var remainingamount= totalSummation-(paidamount+balance);
        Xrm.Page.getAttribute("edm_paidamount").setValue(paidamount);
        Xrm.Page.getAttribute("edm_paidamount").setSubmitMode("always");
        Xrm.Page.getAttribute("edm_remainingamount").setValue(remainingamount);
        Xrm.Page.getAttribute("edm_remainingamount").setSubmitMode("always");
}}

 function StandardPartsSummationTototal(){
	
	if(Xrm.Page.ui.getFormType() != 4){
	var totalamount = Xrm.Page.getAttribute("totalamount").getValue();
	var standardPartsCost = Xrm.Page.getAttribute("edm_standardpartscost").getValue();
	var totalDiscountAmount = Xrm.Page.getAttribute("totaldiscountamount").getValue();
	
	var totalAmountAndCost = (totalamount + standardPartsCost);
	Xrm.Page.getAttribute("edm_totalamount").setValue(totalAmountAndCost);
	Xrm.Page.getAttribute("edm_totalamount").setSubmitMode("always");
	 var balance = Xrm.Page.getAttribute("edm_currentbalane").getValue();
    var giftcard = Xrm.Page.getAttribute("new_giftcard").getValue();
    var cashamount = Xrm.Page.getAttribute("edm_cashamount").getValue();
    var checkamount = Xrm.Page.getAttribute("edm_checkamount").getValue();
    var creditcardamount = Xrm.Page.getAttribute("edm_creditcardamount").getValue();
	var paidamount= giftcard+cashamount+creditcardamount+checkamount;
	var totalSummation = Xrm.Page.getAttribute("edm_totalamount").getValue();
	if(paidamount == 0){
		Xrm.Page.getAttribute("edm_remainingamount").setValue(totalSummation);
        Xrm.Page.getAttribute("edm_remainingamount").setSubmitMode("always")
	}
	else{
		var remainingamount = totalSummation - (paidamount+balance);
		Xrm.Page.getAttribute("edm_remainingamount").setValue(remainingamount);
        Xrm.Page.getAttribute("edm_remainingamount").setSubmitMode("always");
	}
	}
	
 }
