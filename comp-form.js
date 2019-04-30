
$('.comp-register').click(function (ev) 
{
        $("#SignupModal").modal("show");
});

function marketoSubmit(successPost, fname, useremail, mobile, year, studentType, studyLevel, campusLocation, emailOptIn) {
    // Marketo form submission

        MktoForms2.loadForm("//app-sn01.marketo.com", "209-INQ-367", 2581);
        MktoForms2.whenReady(function (form) {
            //console.log('Form ID- ', form);
            form.onSuccess(function (vals, tyURL) {
                console.log('Form sucessfully submitted');
                console.log('vals-', vals);
                return false;
            });
            form.addHiddenFields({
                //These are the values which are submitted to Marketo
                "FirstName": fname,
                "Email": useremail,
                "MobilePhone": mobile,
                "Year_Level__c": year,
                "Lead_Type__c":studentType,
                "Campus__c": campusLocation,
                "Level_of_Study__c": studyLevel,
                "Email_Opt_In__c": emailOptIn
            });
            form.submit();
        }); // Market form end
}