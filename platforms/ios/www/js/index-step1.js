/**
 * Created by ibronsveld on 13/10/14.
 */

(function () {

    $(document).on("pageinit", "#productList", function (e) {
        $("#refreshProducts").on("tap", function () {
            e.preventDefault();
            updateList();
        });
    });

    $(document).on("pageshow", "#productList", function (e) {
        e.preventDefault();
        updateList();
    });

    function updateList() {
        $("<li>No Products Available</li>").appendTo("#productListView");

        var url = "http://www.demo.onehippo.com/restapi/topproducts";
        var sortOptions = "?_type=json&sortby=hippogogreen%3Arating&sortdir=descending&max=10";

        $.ajax({
            url: url + sortOptions,
            cache: false,
            async: false,
            error: function (xhr, ajaxOptions, thrownError) {
                // Log it
                console.log('Error ' + xhr.statusText);
                $("<li>No Products Available</li>").appendTo("#productListView");
            },
            success: function (data, status) {
                $("#productListView").empty();
                for (var index in data) {
                    var product = data[index];
                    var text = product.localizedName + " - € " + product.price;
                    $("<li><a href='#productDetail' data-id='" + product.links[0].Link.href + "'>"
                        + text + "</a></li>").appendTo("#productListView");
                }
            }
        })


        $("#productListView").listview('refresh');
    }
})();