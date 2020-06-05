// A mini search engine for the blog
var _url = "../json/til-posts.json";

$(document).ready(function(){
	$("#searchinput").keyup(function(e){
		var code = e.keyCode ? e.keyCode : e.which;
		var resultsEl = "#searchresults ul";
		var keyword = $("#searchinput").val();
		var pattern = new RegExp(keyword, "gi");
		$(resultsEl).html('');
		if(keyword.length > 0){
			$.ajax({
				url: _url,
				type: "GET",
				dataType: "json",
				async: false,
				success: function(data) {
					// console.log('ok');
				}
			}).done(function(data){
				if(data.posts.length > 0){
					$.each(data.posts, function(k,v){
						if(v.category.search(pattern) != -1 || v.title.search(pattern) != -1){
							
							// Highlight matched keyword
							var text = v.title.replace(pattern, function(keyword){
								return `<b>${keyword}</b>`
							});

							$(resultsEl).append(`<li onclick="window.location.href='../til/posts/${v.slug}'">
								<a>
									<span class="tag">${v.category}</span>${text}
								</a>
							</li>`);
						}
					});
				}
			});
			$("body").addClass("overlay");
			$(resultsEl).show();
		}
		else {
			$("body").removeClass("overlay");
			$(resultsEl).hide();
		}
	});
});