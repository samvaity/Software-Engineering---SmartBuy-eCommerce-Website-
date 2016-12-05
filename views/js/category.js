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

  // for pagination. change pages on click of page numbers of forward backward arrows 
  $('a.next-page').click(function(){
    // set the value attribute of input type 'submit' (used to make a POST request), from the value on anchor tag
    $(this).parent().parent().parent().find('input.page-to-go').val($(this).attr('value')).click();
  });

  // for sorting functionality
  $('select#sort-by-select').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    $('input.sort-by-hidden-field').val(valueSelected);
    $('input.sortby-submit').click();
  });
});