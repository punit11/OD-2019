$(function() {
  $("#comps-button").on("click", function() {
    $('.comps-form').fadeIn();
    $(".registration-form fieldset:first-child").fadeIn("slow");
    return false;
  });

  // next step
  $(".registration-form .btn-next").on("click", function() {
   
    let fs_id = $($(this).data("id"));
    console.log('fs_id ', fs_id);
    if ($("#comps-form").valid()) {
      var parent_fieldset = $(this).parents("fieldset");
      var next_step = true;
      if (next_step) {
        $.when(
          parent_fieldset.fadeOut(400, function() {
            $(this)
              .next()
              .fadeIn();
          })
        ) // when end
          .done(function() {
            $("html").animate({ scrollTop: fs_id.offset().top }, 500);
            var offset = fs_id.offset();
          });
      }
    }
  });

  // previous step
  $(".registration-form .btn-previous").on("click", function() {
    $(this)
      .parents("fieldset")
      .fadeOut(400, function() {
        $(this)
          .prev()
          .fadeIn();
      });
  });

  // submit
  $("#comps-form").submit(function(e) {
    e.preventDefault();
    if ($("#comps-form").valid()) {
      console.log("Form is valid");
      let firstName = $.trim($("input[name='form-name']").val());
      let mobilePhone = $("input[name='form-mobile']").val();
      let Email = $.trim(
        $("input[name='form-email']")
          .val()
          .toLowerCase()
      );

      let Lead_Type__c = $("input[name='form-lead-type']:checked").val();
      let Year_Level__c = $("input[name='form-year-level']:checked").val();
      let Level_of_Study__c = $("input[name=inputStudyLevel]:checked").val();
      let Study_Area__c = $("input[name='form-ia']:checked")
        .map(function() {
          return this.value;
        })
        .get()
        .join("; ");
      let Campus__c = $("input[name='form-location']:checked")
        .map(function() {
          return this.value;
        })
        .get()
        .join("; ");
      console.log("Campus__c: ", Study_Area__c);

    //   console.log("firstName ", firstName);
    //   console.log("Email ", Email);
    //   console.log("mobilePhone ", mobilePhone);
    //   console.log("Lead_Type__c ", Lead_Type__c);
    //   console.log("Year_Level__c ", Year_Level__c);
    //   console.log("Level_of_Study__c ", Level_of_Study__c);
    //   console.log("Study_Area__c ", Study_Area__c);
    //   console.log("Campus__c ", Campus__c);

      marketoSubmit(
        firstName,
        Email,
        mobilePhone,
        Lead_Type__c,
        Year_Level__c,
        Level_of_Study__c,
        Study_Area__c,
        Campus__c
      );
    } else {
      console.log("An error has occured");
    }

    function marketoSubmit(
      firstName,
      Email,
      mobilePhone,
      Lead_Type__c,
      Year_Level__c,
      Level_of_Study__c,
      Study_Area__c,
      Campus__c
    ) {
      // Marketo form submission

      MktoForms2.loadForm("//app-sn01.marketo.com", "209-INQ-367", 3598);
      MktoForms2.whenReady(function(form) {
        console.log("Form ID- ", form);
        form.onSuccess(function(vals, tyURL) {
          console.log("Form sucessfully submitted");
          console.log("vals-", vals);
          return false;
        });
        form.addHiddenFields({
          //These are the values which are submitted to Marketo
          FirstName: firstName,
          Email: Email,
          MobilePhone: mobilePhone,
          Lead_Type__c: Lead_Type__c,
          Study_Area__c: Study_Area__c,
          disciplineArea: "Business",
          Year_Level__c: Year_Level__c,
          Level_of_Study__c: Level_of_Study__c,
          Campus__c: Campus__c
        });
        form.submit();
      }); // Market form end
    }
  });
}); // ready funtion end
