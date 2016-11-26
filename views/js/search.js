$('[id*="features_filter"]').click(function (event) {
    event.preventDefault();
    alert("selected");
    /*var searchIDs = $("#imgTable input:checkbox:checked").map(function () {
        return $(this).val();
    }).get();
    console.log("selected::::" + searchIDs);
    $.ajax({
       url:'/addSlideShow',type:'post',
       data:{searchid:searchIDs},
       success:function(response){
          console.log(response);
       }
    });
    */
});