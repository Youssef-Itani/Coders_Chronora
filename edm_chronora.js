function GetAddress(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    var Country = formContext.getAttribute("edm_primarycountry").getValue();
    var City = formContext.getAttribute("edm_city").getValue();
    var Details = formContext.getAttribute("edm_complementorydirections").getValue();
    // formContext.getAttribute("address1_line1").setValue(Country[0].name + ", " + City[0].name + ", " + Details);
    if (Country == null) {
        // formContext.getAttribute("address1_line1").setValue(City[0].name + ", " + Details);
        if (City == null) {
            formContext.getAttribute("address1_line1").setValue(Details);
        }
        else if (Details == null) {
            formContext.getAttribute("address1_line1").setValue(City[0].name);
        }
        else if (City == null && Details == null) {
            formContext.getAttribute("address1_line1").setValue(null);
        }
        else {
            formContext.getAttribute("address1_line1").setValue(City[0].name + ", " + Details);
        }
    }
    else if (City == null) {
        // formContext.getAttribute("address1_line1").setValue(Country[0].name + ", " + Details);
        if (Country == null) {
            formContext.getAttribute("address1_line1").setValue(Details);
        }
        else if (Details == null) {
            formContext.getAttribute("address1_line1").setValue(Country[0].name);
        }
        else if (Country == null && Details == null) {
            formContext.getAttribute("address1_line1").setValue(null);
        }
        else {
            formContext.getAttribute("address1_line1").setValue(Country[0].name + ", " + Details);
        }
    }
    else if (Details == null) {
        // formContext.getAttribute("address1_line1").setValue(City[0].name + ", " + City[0].name);
        if (Country == null) {
            formContext.getAttribute("address1_line1").setValue(City[0].name);
        }
        else if (City == null) {
            formContext.getAttribute("address1_line1").setValue(Country[0].name);
        }
        else if (Country == null && City == null) {
            formContext.getAttribute("address1_line1").setValue(null);
        }
        else {
            formContext.getAttribute("address1_line1").setValue(Country[0].name + ", " + City[0].name);
        }
    }
    else {
        formContext.getAttribute("address1_line1").setValue(Country[0].name + ", " + City[0].name + ", " + Details);
    }
}

function RemoveRequiredLevel(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    formContext.getAttribute("customerid").setRequiredLevel("none");

}



function SelectedValues(executionContext) {
    var formContext = executionContext.getFormContext();

    var fields = ["edm_crystal", "edm_plexi", "edm_cyclops", "edm_dial", "edm_hand", "edm_bezel", "edm_disc", "edm_crown", "edm_case", "edm_backcover", "edm_pusher", "edm_oysterbracelet", "edm_oysterquartzbracelet", "edm_osyterpearlmasterbracelet", "edm_jubileebracelet", "edm_presidnetbracelet", "edm_bracelet", "edm_leatherstrap", "edm_buckle", "edm_oysterflex", "edm_fittings", "edm_springbars", "edm_clasp", "edm_polish", "edm_safetylever", "edm_movement"];


    // if (crytalOptionSet != null) {
    //     crytalOptionSet = formContext.getAttribute("edm_crystal").getText();
    //     selectedValues = crytalOptionSet;
    // }
    // if (dialOptionSet != null) {
    //     dialOptionSet = formContext.getAttribute("edm_dial").getText();
    //     selectedValues = selectedValues + ";" + dialOptionSet;
    // }
    // formContext.getAttribute("edm_selected").setValue(selectedValues);

    function SelectedValues(executionContext) {
        var formContext = executionContext.getFormContext();

        var fields = ["edm_crystal", "edm_plexi", "edm_cyclops", "edm_dial", "edm_hand", "edm_bezel", "edm_disc", "edm_crown", "edm_case", "edm_backcover", "edm_pusher", "edm_oysterbracelet", "edm_oysterquartzbracelet", "edm_osyterpearlmasterbracelet", "edm_jubileebracelet", "edm_presidnetbracelet", "edm_bracelet", "edm_leatherstrap", "edm_buckle", "edm_oysterflex", "edm_fittings", "edm_springbars", "edm_clasp", "edm_polish", "edm_safetylever", "edm_movement"];

        // var Selected = formContext.getAttribute("edm_selected").getValue();
        // if (crytalOptionSet != null) {
        //     crytalOptionSet = formContext.getAttribute("edm_crystal").getText();
        //     selectedValues = crytalOptionSet;
        // }
        // if (dialOptionSet != null) {
        //     dialOptionSet = formContext.getAttribute("edm_dial").getText();
        //     selectedValues = selectedValues + ";" + dialOptionSet;
        // }
        // formContext.getAttribute("edm_selected").setValue(selectedValues);

        for (var i = 0; i <= fields.length; i++) {
            var x = formContext.getAttribute(fields[i]).getValue();
            x = formContext.getAttribute(fields[i]).getText();
            formContext.getAttribute("edm_selected").setValue(x + " - ");
        }
    }
}

function Calculateinsttotal(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    var cash = formContext.getAttribute("edm_cashamount").getValue();
    var check = formContext.getAttribute("edm_checkamount").getValue();
    var creditcardamount = formContext.getAttribute("edm_creditcardamount").getValue();
    var total = cash + check + creditcardamount;
    formContext.getAttribute("edm_totalamount").setValue(total);
}

function HideOptionOnSAV(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    formContext.getControl("edm_branch").removeOption(757580003);
}

function ChangeDiscountPercentage(executionContext) {
    debugger;

    var formContext = executionContext.getFormContext();

    var PricePerUnit = formContext.getAttribute("priceperunit").getValue();
    var DiscountPercentage = formContext.getAttribute("edm_dsicount").getValue();

    if (PricePerUnit != null) {
        if (DiscountPercentage != null) {
            var MD = PricePerUnit * (DiscountPercentage / 100); //calculate Manual Discount
            formContext.getAttribute("manualdiscountamount").setValue(MD);

            var UP = PricePerUnit - MD; //Calculate Unit Price
            formContext.getAttribute("edm_unitprice").setValue(UP);
        }
    }
}

function ChangeManualDiscount(executionContext) {
    debugger;

    var formContext = executionContext.getFormContext();

    var PricePerUnit = formContext.getAttribute("priceperunit").getValue();
    var ManualDiscount = formContext.getAttribute("manualdiscountamount").getValue();

    if (PricePerUnit != null) {
        if (ManualDiscount != null) {
            var DP = (ManualDiscount / PricePerUnit) * 100; //calculate Discount Percentage
            formContext.getAttribute("edm_dsicount").setValue(DP);

            var UP = PricePerUnit - ManualDiscount; //Calculate Unit Price
            formContext.getAttribute("edm_unitprice").setValue(UP);
        }
    }
}

function ChangeUnitPrice(executionContext) {
    debugger;

    var formContext = executionContext.getFormContext();

    var PricePerUnit = formContext.getAttribute("priceperunit").getValue();
    var UnitPrice = formContext.getAttribute("edm_unitprice").getValue();

    if (PricePerUnit != null) {
        if (UnitPrice != null) {
            var MD = PricePerUnit - UnitPrice; //calculate Manual Discount
            formContext.getAttribute("manualdiscountamount").setValue(MD);

            var DP = (MD / PricePerUnit) * 100; //Calculate Discount Percentage
            formContext.getAttribute("edm_dsicount").setValue(DP);
        }
    }
}

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
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }

    var ReturnId = formContext.getAttribute("edm_returnid").getValue();
    var InvoiceAmount = formContext.getAttribute("extendedamount").getValue();
    var ReturnAmount;

    if (ReturnId >= 1) {
        formContext.getAttribute("edm_return").setValue(true);
        ReturnAmount = InvoiceAmount * (-1);
        formContext.getAttribute("extendedamount").setValue(ReturnAmount);
    }
}

function OnChangeUnitPrice(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var UnitPrice = formContext.getAttribute("edm_unitprice").getValue();

    if (UnitPrice != null) {
        var Detax8p16 = UnitPrice * 0.0816; //Calculate Detax 8.16%
        var Detax11p = UnitPrice * 0.11; //Calculate Detax 11%

        var D816 = UnitPrice - Detax8p16;
        var D11 = UnitPrice - Detax11p;

        formContext.getAttribute("edm_detax75").setValue(D816);
        formContext.getAttribute("edm_detax10").setValue(D11);
    }
}

function PaidAmount(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var InvoiceType = formContext.getAttribute("edm_invoicetypeid").getValue();

    var GiftCard = formContext.getAttribute("edm_giftcard").getValue();
    var CashAmount = formContext.getAttribute("edm_cashamount").getValue();
    var CreditCardAmount = formContext.getAttribute("edm_creditcardamount").getValue();
    var CheckAmount = formContext.getAttribute("edm_checkamount").getValue();
    var TotalAmount = formContext.getAttribute("totallineitemamount").getValue();
    var OldBalance = formContext.getAttribute("edm_oldbalance").getValue();
    var Discount = formContext.getAttribute("discountamount").getValue();

    switch (InvoiceType) {
        case 2: //Sales Invoice
            var PaidAmount = GiftCard + CashAmount + CheckAmount + CreditCardAmount;
            var RemainingAmount = (TotalAmount + OldBalance) - PaidAmount - Discount;

            formContext.getAttribute("edm_paidamount").setValue(PaidAmount);
            formContext.getAttribute("edm_remainingamount").setValue(RemainingAmount);

            var TotalSalesAmount = formContext.getAttribute("totalamount").getValue();
            formContext.getAttribute("edm_totalamount").setValue(TotalSalesAmount);

            break;

        case 1: //SAV Invoice
            var StandardCost = formContext.getAttribute("edm_standardpartscost").getValue();
            // var TotalSavAmount = formContext.getAttribute("totallineitemamount").getValue();

            var Total = (StandardCost + TotalAmount) - Discount;
            formContext.getAttribute("edm_totalamount").setValue(Total);
            //formContext.getAttribute("totalamount").setValue(Total);

            var PaidAmount = GiftCard + CashAmount + CheckAmount + CreditCardAmount;
            formContext.getAttribute("edm_paidamount").setValue(PaidAmount);

            var RemainingAmount = (Total + OldBalance) - PaidAmount;
            formContext.getAttribute("edm_remainingamount").setValue(RemainingAmount);

            break;
    }

}

function SetCurrentDate(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var date = formContext.getAttribute("edm_date").getValue();
    if (date == null) {
    var current = new Date();
        formContext.getAttribute("edm_date").setValue(current);
    }
}

function SetTotalAmount(executionContext) { // Set Total Amount For SAV Invoices
    debugger;
    var formContext = executionContext.getFormContext();

    var StandardCost = formContext.getAttribute("edm_standardpartscost").getValue();
    var TotalSavAmount = formContext.getAttribute("totallineitemamount").getValue();
    var DiscountAmount = formContext.getAttribute("discountamount").getValue();

    var Total = (StandardCost + TotalSavAmount) - DiscountAmount;

    formContext.getAttribute("edm_totalamount").setValue(Total);
}

function GetBalance(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var RealCustomer = formContext.getAttribute("customerid").getValue();

    var FormType = formContext.ui.getFormType();

    var Status = formContext.getAttribute("statecode").getText();

    if ((FormType == 1 || FormType == 2) && Status == "Draft") {
        if (RealCustomer != null) {

            var RealCustomerId = RealCustomer[0].id;
            var RealCustomerType = RealCustomer[0].entityType;

            Xrm.WebApi.online.retrieveRecord(RealCustomerType, RealCustomerId, "").then(
                function success(result) {
                    formContext.getAttribute("edm_oldbalance").setValue(result["edm_currentbalance"]);
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        }
    }
}

function GetCost(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var ExistingProduct = formContext.getAttribute("productid").getValue();

    if (ExistingProduct != null) {
        var ExistingProductId = ExistingProduct[0].id;
        var ExistingProductType = ExistingProduct[0].entityType;

        Xrm.WebApi.online.retrieveRecord(ExistingProductType, ExistingProductId, "").then(
            function success(result) {
                formContext.getAttribute("edm_cost").setValue(result["currentcost"]);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

function ReturnInvoice(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var ManualDiscount = formContext.getAttribute("manualdiscountamount").getValue();
    var extendedamount = formContext.getAttribute("extendedamount").getValue();
    var UnitPrice = formContext.getAttribute("edm_unitprice").getValue();
    var Detax816 = formContext.getAttribute("edm_detax75").getValue();
    var Detax11 = formContext.getAttribute("edm_detax10").getValue();
    var ReturnId = formContext.getAttribute("edm_returnid").getValue();

    if (ReturnId >= 1) {
        var NegativeQuantity = -1;
        formContext.getAttribute("quantity").setValue(NegativeQuantity);

       // if (ManualDiscount > 0) {
            var NegativeDiscount = -ManualDiscount;
            formContext.getAttribute("manualdiscountamount").setValue(NegativeDiscount);
   //     }

        if (UnitPrice > 0) {
            var NegativeUnitPrice = -UnitPrice;
            formContext.getAttribute("edm_unitprice").setValue(NegativeUnitPrice);
        }

        if (Detax816 > 0) {
            var NegativeDetax816 = -Detax816;
            formContext.getAttribute("edm_detax75").setValue(NegativeDetax816);
        }
     if (extendedamount > 0) {
            var NegativeExtendedamount = -extendedamount;
            formContext.getAttribute("extendedamount").setValue(NegativeExtendedamount);
        }
        if (Detax11 > 0) {
            var NegativeDetax11 = -Detax11;
            formContext.getAttribute("edm_detax10").setValue(NegativeDetax11);
        }

    }
}

function GetStockQuantity(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var Product = formContext.getAttribute("edm_officialproductreference").getValue();

    if (Product != null) {
        var ProductId = Product[0].id;
        var ProductType = Product[0].entityType;

        Xrm.WebApi.online.retrieveRecord(ProductType, ProductId, "").then(
            function success(result) {
                formContext.getAttribute("edm_dt").setValue(result["edm_dtstock"]);
                formContext.getAttribute("edm_jounieh").setValue(result["edm_jouniehstock"]);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );

    }

    var DTSock = formContext.getAttribute("edm_dt").getValue();
    var JouniehStock = formContext.getAttribute("edm_jounieh").getValue();
    var TotalStock = DTSock + JouniehStock;
    formContext.getAttribute("edm_numberofpiecesinstock").setValue(TotalStock);
}



function HideSalesAdvisor(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();


    SalesPersonArr1 = [({ value: 757580026, text: "Advisor" }) ,({ value: 757580000, text: "Abdel Rahman El Kadi" }), ({ value: 757580009, text: "Irene Stephanidou-Annan" }), ({ value: 757580010, text: "Jean-Claude Abi Hanna" }), ({ value: 757580012, text: "Joelle El Assaad" }), ({ value: 757580023, text: "Ramona Atallah" }), ({ value: 757580018, text: "Sarine Sarkissian" }), ({ value: 757580022, text: "Ziad Annan" }), ({ value: 100000006, text: "Arthur Assoghlian" }), ({ value: 100000005, text: "Yussef Khalil" }),({ value: 757580005, text: "Esales" }),({ value: 757580027, text: "Rayan Abu Shakra" }), ({value: 757580028, text: "Maria Nakhoul"})];

    forEachItemFn(executionContext, SalesPersonArr1, "edm_salesperson");

    SalesPersonArr2 = [({ value: 757580026, text: "Advisor" }),({ value: 757580000, text: "Abdel Rahman El Kadi" }), ({ value: 757580009, text: "Irene Stephanidou-Annan" }), ({ value: 757580010, text: "Jean-Claude Abi Hanna" }), ({ value: 757580012, text: "Joelle El Assaad" }), ({ value: 757580023, text: "Ramona Atallah" }), ({ value: 757580018, text: "Sarine Sarkissian" }), ({ value: 757580022, text: "Ziad Annan" }), ({ value: 100000006, text: "Arthur Assoghlian" }), ({ value: 100000005, text: "Yussef Khalil" }),({ value: 757580005, text: "Esales" }),({ value: 757580027, text: "Rayan Abu Shakra" }), ({value: 757580028, text: "Maria Nakhoul"})];

    forEachItemFn(executionContext, SalesPersonArr2, "edm_salesperson2");

    function forEachItemFn(executionContext, optArr, FieldName) {
        var formContext = executionContext.getFormContext();
        var position = 0;
        formContext.getControl(FieldName).clearOptions();
        for (var i = optArr.length - 1; i >= 0; i--) {
            formContext.getControl(FieldName).addOption(optArr[i], position++);
        }
    }
}

function HideSalesAdvisorQC(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();


    SalesPersonArr1 = [({ value: 757580000, text: "Abdel Rahman El Kadi" }), ({ value: 757580009, text: "Irene Stephanidou-Annan" }), ({ value: 757580010, text: "Jean-Claude Abi Hanna" }), ({ value: 757580012, text: "Joelle El Assaad" }), ({ value: 757580023, text: "Ramona Atallah" }), ({ value: 757580017, text: "Ronald Chamoun" }), ({ value: 757580018, text: "Sarine Sarkissian" }), ({ value: 757580022, text: "Ziad Annan" }), ({ value: 100000006, text: "Arthur Assoghlian" }), ({ value: 100000005, text: "Yussef Khalil" })];

    forEachItemFn(executionContext, SalesPersonArr1, "edm_salesperson");

    function forEachItemFn(executionContext, optArr, FieldName) {
        var formContext = executionContext.getFormContext();
        var position = 0;
        formContext.getControl(FieldName).clearOptions();
        for (var i = optArr.length - 1; i >= 0; i--) {
            formContext.getControl(FieldName).addOption(optArr[i], position++);
        }
    }
}

// System for American Numbering 
var th_val = ['', 'thousand', 'million', 'billion', 'trillion'];
var dg_val = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn_val = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw_val = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function toWordsconvert(s) {
    if(s<0)
    {
        s=s*-1;
    }
    s = s.toString();
    s = s.replace(/-[\, ]/g, '');
    if (s != parseFloat(s))
        return 'not a number ';
    var x_val = s.indexOf('.');
    if (x_val == -1)
        x_val = s.length;
    if (x_val > 15)
        return 'too big';
    var n_val = s.split('');
    var str_val = '';
    var sk_val = 0;
    for (var i = 0; i < x_val; i++) {
        if ((x_val - i) % 3 == 2) {
            if (n_val[i] == '1') {
                str_val += tn_val[Number(n_val[i + 1])] + ' ';
                i++;
                sk_val = 1;
            } else if (n_val[i] != 0) {
                str_val += tw_val[n_val[i] - 2] + ' ';
                sk_val = 1;
            }
        } else if (n_val[i] != 0) {
            str_val += dg_val[n_val[i]] + ' ';
            if ((x_val - i) % 3 == 0)
                str_val += 'hundred ';
            sk_val = 1;
        }
        if ((x_val - i) % 3 == 1) {
            if (sk_val)
                str_val += th_val[(x_val - i - 1) / 3] + ' ';
            sk_val = 0;
        }
    }
    if (x_val != s.length) {
        var y_val = s.length;
        str_val += 'point ';
        for (var i = x_val + 1; i < y_val; i++)
            str_val += dg_val[n_val[i]] + ' ';
    }
    return str_val.replace(/\s+/g, ' ');
}

function FillTotalAmountInWords(executionContext) {
    debugger;
     var TotalAmount=0;
    var formContext = executionContext.getFormContext();
    var entityName=formContext.data.entity.getEntityName(); 
    if(entityName=="edm_installment")
    {
        TotalAmount= formContext.getAttribute("edm_totalamount").getValue();   
    }
    else 
    {
        TotalAmount = formContext.getAttribute("totalamount").getValue();
    }
    if (TotalAmount != null) {
        var NumberInwords = toWordsconvert(TotalAmount);
        formContext.getAttribute("edm_totalamountinwords").setValue(NumberInwords);
    }
}

function HideCost(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var InvoiceType = formContext.getAttribute("edm_invoicetype").getValue();

    switch (InvoiceType) {
        case 2:
            formContext.getControl("edm_cost").setVisible(false);
            break;
    }
}

function SetSelectedOptions(executionContext) {
  debugger;

  var formContext = executionContext.getFormContext();
  var fields = ["edm_crystal", "edm_plexi", "edm_cyclops", "edm_dial", "edm_hand", "edm_bezel", "edm_disc",
                "edm_crown", "edm_case", "edm_backcover", "edm_pusher", "edm_oysterbracelet", "edm_oysterquartzbracelet",
                "edm_osyterpearlmasterbracelet", "edm_jubileebracelet", "edm_presidnetbracelet", "edm_bracelet",
                "edm_leatherstrap", "edm_buckle", "edm_oysterflex", "edm_fittings", "edm_springbars", "edm_clasp",
                "edm_polish", "edm_safetylever", "edm_movement"];

  formContext.getAttribute("edm_selected").setValue(""); // Set the value to an empty string

  var text = "";
  for (var i = 0; i < fields.length; i++) {
    var fieldName = formContext.getControl(fields[i]).getLabel(); // Use fields[i] to get the current field name
    var optionField = formContext.getAttribute(fields[i]).getSelectedOption(); // Use getSelectedOption() to get the selected option

    if (optionField != null) {
      text += " " + fieldName+ ":";
      for (var j = 0; j < optionField.length; j++) {
          text = text + optionField[j].text + ";";
      }
    }
  }

  // Set the concatenated text to the "edm_selected" attribute
  formContext.getAttribute("edm_selected").setValue(text.trim());
}

function SetInterests(executionContext, field, selected) {
    debugger;
    var formContext = executionContext.getFormContext();

    var text;
    var OptionField = formContext.getAttribute(field).getText();

    if (OptionField != null) {
        text = formContext.getAttribute(selected).getValue();
        for (var i = 0; i < OptionField.length; i++) {
            text = text + OptionField[i] + ";";
        }
        formContext.getAttribute(selected).setValue(text);
    }
}

function PreferredExpriences(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    formContext.getAttribute("edm_selectedpreferedexperiences").setValue(" ");
    SetInterests(executionContext, "edm_otherpreferredexperiences", "edm_selectedpreferedexperiences");
}

function Interests(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    formContext.getAttribute("edm_selectedinterests").setValue(" ");
    SetInterests(executionContext, "edm_otherinterests", "edm_selectedinterests");
}

function WatchCollecting(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    formContext.getAttribute("edm_selectedwatchcollecting").setValue(" ");
    SetInterests(executionContext, "edm_otherwatchcollecting", "edm_selectedwatchcollecting");
}

function Horology(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    formContext.getAttribute("edm_selectedhorologies").setValue(" ");
    SetInterests(executionContext, "edm_otherhorology", "edm_selectedhorologies");
}

function GetStandardParts(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    formContext.getAttribute("edm_standardpartsselection").setValue(" ");
    var Selection = formContext.getAttribute("edm_standardpartsselection").getValue();

    var MovementServicing = formContext.getAttribute("edm_movementservicing").getValue();
    var Wheels = formContext.getAttribute("edm_wheels").getValue();
    var Screws = formContext.getAttribute("edm_screws").getValue();
    var Lubricants = formContext.getAttribute("edm_lubricants").getValue();
    var Polishing = formContext.getAttribute("edm_polishing").getValue();
    var Tubes = formContext.getAttribute("edm_tubesandvalve").getValue();
    var Crown = formContext.getAttribute("edm_crown").getValue();
    var Gasket = formContext.getAttribute("edm_gaskets").getValue();
    var Crystal = formContext.getAttribute("edm_acryliccrystal").getValue();
    var Springbars = formContext.getAttribute("edm_springbars").getValue();
    var WaterResistence = formContext.getAttribute("edm_waterresistance").getValue();


    if (MovementServicing != false) {
        Selection = Selection + "Movement Servicing" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
    if (Wheels != false) {
        Selection = Selection + "Wheels" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
    if (Screws != false) {
        Selection = Selection + "Screws" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
    if (Lubricants != false) {
        Selection = Selection + "Lubricants" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
    if (Polishing != false) {
        Selection = Selection + "Polishing" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
    if (Tubes != false) {
        Selection = Selection + "Tubes" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
    if (Crown != false) {
        Selection = Selection + "Crown" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
    if (Gasket != false) {
        Selection = Selection + "Gasket" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
    if (Crystal != false) {
        Selection = Selection + "Acrylic Crystal" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
    if (Springbars != false) {
        Selection = Selection + "Springbars" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
    if (WaterResistence != false) {
        Selection = Selection + "WaterResistence" + ";";
        formContext.getAttribute("edm_standardpartsselection").setValue(Selection);
    }
}

function CapitalizeName(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();
    var Firstname = formContext.getAttribute("firstname").getValue();
    var Lastname = formContext.getAttribute("lastname").getValue();

    if (Firstname != null && Lastname != null) {
       var FNWords = Firstname.split(" ");
        for (var i = 0; i < FNWords.length; i++) {
            FNWords[i] = FNWords[i].charAt(0).toUpperCase() + FNWords[i].slice(1);
        }

        // Capitalize each word in the last name
        var LNWords = Lastname.split(" ");
        for (var i = 0; i < LNWords.length; i++) {
            LNWords[i] = LNWords[i].charAt(0).toUpperCase() + LNWords[i].slice(1);
        }

        // Join the words back together with spaces and set the updated values
        formContext.getAttribute("firstname").setValue(FNWords.join(" "));
        formContext.getAttribute("lastname").setValue(LNWords.join(" "));
    }
}

function GetProductReference(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var ExistingProduct = formContext.getAttribute("productid").getValue();

    if (ExistingProduct != null) {
        var ExistingProductId = ExistingProduct[0].id;
        var ExistingProductType = ExistingProduct[0].entityType;

        Xrm.WebApi.online.retrieveRecord(ExistingProductType, ExistingProductId, "").then(
            function success(result) {
                formContext.getAttribute("edm_productreference").setValue(result["productnumber"]);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

function RemainingAmountToWords(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var RemainingAmount = formContext.getAttribute("edm_remainingamount").getValue();

    if (RemainingAmount != null) {
        var RemainingAmountInWords = toWordsconvert(RemainingAmount);
        formContext.getAttribute("edm_remainingamountinwords").setValue(RemainingAmountInWords);
    }
}

function PartOfService(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var IsRequired = formContext.getAttribute("edm_isrequired").getValue();

    if (IsRequired == 3) {
        formContext.getAttribute("priceperunit").setValue(0);
        formContext.getAttribute("edm_unitprice").setValue(0);
        formContext.getAttribute("extendedamount").setValue(0);
        formContext.getAttribute("manualdiscountamount").setValue(0);
        formContext.getAttribute("edm_dsicount").setValue(0);

    }
}

function GetProductID(executionContext, productlookup, productreference) {
    debugger;
    var formContext = executionContext.getFormContext();

    var Product = formContext.getAttribute(productlookup).getValue();

    if (Product != null) {
        var ProductId = Product[0].id;
        var ProductType = Product[0].entityType;

        Xrm.WebApi.online.retrieveRecord(ProductType, ProductId, "").then(
            function success(result) {
                formContext.getAttribute(productreference).setValue(result["productnumber"]);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

function GetProductName(executionContext, productlookup, productname) {
    debugger;
    var formContext = executionContext.getFormContext();

    var Product = formContext.getAttribute(productlookup).getValue();

    if (Product != null) {
        var ProductId = Product[0].id;
        var ProductType = Product[0].entityType;

        Xrm.WebApi.online.retrieveRecord(ProductType, ProductId, "").then(
            function success(result) {
                formContext.getAttribute(productname).setValue(result["name"]);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

function VisitProduct(executionContext) {
    debugger;
    GetProductID(executionContext, "edm_officialproductreference", "edm_productreference");
    GetProductName(executionContext, "edm_officialproductreference", "edm_productname");
}

function TaskProduct(executionContext){
    debugger;
    GetProductID(executionContext, "edm_officialproductreference", "edm_productreference");
    GetProductName(executionContext, "edm_officialproductreference", "edm_productname");

}


function RemoveLeadingZerosFromMobile(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the mobile number attribute
    var mobileAttribute = formContext.getAttribute("mobilephone");

    if (mobileAttribute != null) {
        var mobileValue = mobileAttribute.getValue();

        if (mobileValue != null) {
            // Remove all leading zeros except for one "0"
            mobileValue = mobileValue.replace(/\+/g, '').replace(/^0+/g, '');
            mobileAttribute.setValue(mobileValue);
        }
    }
}


function PhoneCallActivity(executionContext)
{
    debugger;
    var formContext = executionContext.getFormContext();

    var OfficialProductReference = formContext.getAttribute("edm_officialproductreference").getValue();
    if(OfficialProductReference != null)
    {
        var ProductId = OfficialProductReference[0].id;
        var ProductType = OfficialProductReference[0].entityType;
        
        Xrm.WebApi.online.retrieveRecord(ProductType, ProductId, "").then(
            function success(result) {
                formContext.getAttribute("edm_productname").setValue(result["name"]);
                formContext.getAttribute("edm_productreference").setValue(result["productnumber"]);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }

}