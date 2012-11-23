ClassificationFilter = function(){
	//SET TO LOWERCASE
	forAllKey(ClassificationFilter.products, function(k,val){
		val.forall(function(v, i, a){
			a[i]=v.toLowerCase();
		});
	});

	this.Refresh();
};


//FROM https://bugzilla.mozilla.org/query.cgi
ClassificationFilter.products={};
ClassificationFilter.products["Client Software"] = ['Add-on SDK','Boot2Gecko','Calendar','Camino','Composer','Fennec','Firefox','Firefox for Android','Firefox for Metro','Mozilla Localizations','Mozilla Services','Other Applications','Penelope','SeaMonkey','Thunderbird' ];
ClassificationFilter.products["Components"] = ['Core','Directory','JSS','MailNews Core','NSPR','NSS','Plugins','Rhino','Tamarin','Testing','Toolkit' ];
ClassificationFilter.products["Server Software"] = ['addons.mozilla.org','AUS','Bugzilla','Input','Marketplace','Skywriter','Socorro','Testopia','Webtools' ];
ClassificationFilter.products["Other"] = ['Air Mozilla','bugzilla.mozilla.org','Community Tools','Data Safety','Datazilla','Extend Firefox','Finance','Firefox Affiliates','L20n','Marketing','Mozilla Communities','Mozilla Corporation','Mozilla Developer Network','Mozilla Grants','Mozilla Labs','Mozilla Messaging','Mozilla Metrics','Mozilla QA','Mozilla Reps','mozilla.org','mozillaignite','Pancake','Petri','Popcorn','Privacy','quality.mozilla.org','Snippets','support.mozilla.org','support.mozillamessaging.com','Tech Evangelism','Thimble','Tracking','Untriaged Bugs','Web Apps','webmaker.org','Websites','www.mozilla.org' ];
ClassificationFilter.products["Graveyard"] = ['CCK','Core Graveyard','Derivatives','Documentation','Firefox Graveyard','Grendel','MailNews Core Graveyard','Minimo','Mozilla Labs Graveyard','Mozilla QA Graveyard','MozillaClassic','Other Applications Graveyard','Servo','Toolkit Graveyard','Websites Graveyard','Webtools Graveyard' ];




ClassificationFilter.makeFilter = function(){
	return ES.makeFilter("classification", state.selectedClassifications);
};//method



ClassificationFilter.prototype.Refresh = function(){



	this.injectHTML();


};


ClassificationFilter.prototype.injectHTML = function(){
	var html = '<ul id="classificationList" class="menu ui-selectable">';
	var item = '<li class="{class}" id="classification_{name}">{name}</li>';

	//LIST SPECIFIC CLASSIFICATIONS
	var classifications=Object.keys(ClassificationFilter.products);
	for(var i = 0; i < classifications.length; i++){
		html += item.replaceVars({
			"class" : (include(state.selectedClassifications, classifications[i]) ? "ui-selectee ui-selected" : "ui-selectee"),
			"name" : classifications[i]
		});
	}//for

	html += '</ul>';

	$("#classifications").html(html);

//	setTimeout(function(){
		$("#classificationList").selectable({
			selected: function(event, ui){
				var didChange = false;
				var selection=ui.selected.id.rightBut("classification_".length);
				if (!include(state.selectedClassifications, selection)){
					state.selectedClassifications.push(selection);

					//ADD TO THE SELECTED PROGRAMS LIST
					state.selectedProducts.appendArray(ClassificationFilter.products[selection]);

					didChange = true;
				}//endif

				if (didChange){
					GUI.State2URL();
					state.programFilter.Refresh();
					state.classificationFilter.Refresh();
					state.productFilter.Refresh();
					state.componentFilter.Refresh();
				}//endif
			},
			unselected: function(event, ui){
				var i = state.selectedClassifications.indexOf(ui.unselected.id.rightBut("classification_".length));
				if (i != -1){
					state.selectedClassifications.splice(i, 1);
					state.classificationFilter.Refresh();
				}
			}
		});
//	}, 300);



};

