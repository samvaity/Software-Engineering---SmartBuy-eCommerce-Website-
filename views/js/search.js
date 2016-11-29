$(document).ready(function(){
  // On selection / deselection of any seller in the refinement panel, trigger it's click event to make a post request
  $('.sellerbrand_filter').change(function (event) {
    if ($(this).is(":checked")){
      $(this).parent().find('.seller_name').val($(this).parent().find('.brand-submit').val());
    }
    else{
      $(this).parent().find('.seller_name').val('');
    }
    $(this).parent().find('.brand-submit').click();
  });

  // remove filter by clicking on the cross icon in the 'Filters' section above the products display
  $('li.applied-filter-value a').click(function(){
    var removeFilterValue = $(this).parent().find('span.filter-copy').html();
    $('input[value="' + removeFilterValue + '"]').parent().find('input.sellerbrand_filter').attr("checked", false).change();
    $('input[value="' + removeFilterValue + '"]').parent().find('input.price_filter').attr("checked", false).change();
  });

  // On selection / deselection of any price in the refinement panel, trigger it's click event to make a post request
  $('.price_filter').change(function (event) {
    $(this).parent().find('.price-submit').click();
  });

  // Clears all filters applied on click of 'Clear All' hyperlink
  $('ul.applied-filters li a.clear-all').click(function(){
    // De-select all filter checkboxes then trigger change event of 'sellerbrand_filter' 
    $('input.sellerbrand_filter').attr("checked", false);
    $('input.price_filter').attr("checked", false);
    $('.sellerbrand_filter').change();
  });

  /* Add filters to search results. Passes selected filter values to server via sellerBrandFilter array */
 /* var checkboxValue = [];
  var sellerBrandFilter = [];
  var search_text = $.trim($('.results-title h1').text()).replace(/^"(.*)"$/, '$1');
  $('.sellerbrand_filter').change(function (event) {
    event.preventDefault();
    if ($(this).is(":checked")){
      // If brand is selected, adds its value to sellerBrandFilter array
      sellerBrandFilter.push($(this).val());
    }
    else{
      // If brand is un-selected, removes it from sellerBrandFilter array
      var removeitem = $(this).val();
      sellerBrandFilter = jQuery.grep(sellerBrandFilter, function(value) {
        return value != removeitem;
      });
    }

    // makes a post request to /search with the selected filters and search text
    $.ajax({
      url:'/search',type:'post',
      data:{sellerBrandsFilter:sellerBrandFilter, search_text:search_text},
      success:function(response){
        console.log("ajax : " + response);
      }
    });
  });*/

});
/*
 function removeFilter(productName){
    alert(productName);
    $("")
  }
  */