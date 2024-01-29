window.addEventListener("wheel", function(e){
	e.preventDefault();
},{passive : false});

var $html = $("html");
 
var page = 1;
 
var lastPage = $(".content").length;
 
$html.animate({scrollTop:0},10);

$(window).on("wheel", function(e){
 
	if($html.is(":animated")) return;
 
    if(e.originalEvent.deltaY > 0){
        if (page == 2) {
            if (imgIndex != imgCount - 1)
                imgChange(false)
            else 
                page++;
        } else {
            if (page== lastPage) 
            return;
 
		    page++;
        }
	}else if(e.originalEvent.deltaY < 0){
        if (page == 2) {
            if (imgIndex != 0)
                imgChange(true)
            else 
                page--
        } else {
            if (page == 1) 
                return;
 
		    page--;
        }
	}
	var posTop = (page-1) * $(window).height();
 
	$html.animate({scrollTop : posTop});
});

var imgIndex = 0
const imgCount = 2
function imgChange(prev) {
    if (prev) {
        if (imgIndex != 0)
            imgIndex--
    }
    else {
        if (imgIndex != imgCount - 1)
            imgIndex++
    }    
    $('#playersImg').attr('src','./images/p-'+imgIndex + '.png')
}

$('.arrow-prev').on({
    click: function() {
        imgChange(true)
    }
})

$('.arrow-next').on({
    click: function() {
        imgChange(false)
    }
})