DateRangeIterator = function(param){
	Util.copy(param, this);

	this.request = null;
	this.currentDate = null;

	this.NextQuery();
};

DateRangeIterator.prototype.NextQuery = function(){
	var dataSet = this.reportBackObj.dataSet;

	if (dataSet.currentIndex <= dataSet.maxIndex){
		this.currentDate = this.startDate.add(this.interval.multiply(dataSet.currentIndex + 1));
		var queries = this.InjectDate();

		this.request = new MultiRestQuery(this, dataSet.currentIndex, queries);
		this.request.Run();
	}
};

DateRangeIterator.prototype.InjectDate = function(){
	//console.info("InjuectDate: " + JSON.stringify( this.chartRequest ));

	var chartRequest = Util.jsonCopy(this.queries);


	for(var i = 0; i < chartRequest.length; i++){
		if (chartRequest[i].dayShift === undefined) chartRequest[i].dayShift = 0;

		if (this.useWindow){
			this.insertTimeIntervalIntoQuery(chartRequest[i].esQuery, this.currentDate.add(this.interval.multiply(chartRequest[i].dayShift)));
		}else{
			this.insertTimePointIntoQuery(chartRequest[i].esQuery, this.currentDate.add(this.interval.multiply(chartRequest[i].dayShift)));
		}//endif
	}//for

	//console.info("InjuectDate: " + JSON.stringify( chartRequest ));

	return chartRequest;
};


DateRangeIterator.prototype.insertTimePointIntoQuery = function(esQuery, date){
	esQuery.query.filtered.filter.and.push({ "range" : { "modified_ts" : { "lt" : date.getMilli() } } });
	esQuery.query.filtered.filter.and.push({ "range" : { "expires_on" : { "gte" : date.getMilli()} } });
};

DateRangeIterator.prototype.insertTimeIntervalIntoQuery = function(esQuery, date){
	esQuery.query.filtered.filter.and.push({ "range" : { "modified_ts" : { "gte" : date.getMilli() } } });
	esQuery.query.filtered.filter.and.push({ "range" : { "modified_ts" : { "lt" : date.add(this.interval).getMilli()} } });
};






DateRangeIterator.prototype.success = function(requestObj, data){

	this.reportBackObj.success(this, data);
	this.reportBackObj.dataSet.currentIndex += 1;
	this.NextQuery();
};

DateRangeIterator.prototype.error = function(requestObj, errorData, errorMsg, errorThrown){
	this.reportBackObj.error(requestObj, errorData, errorMsg, errorThrown);
};

DateRangeIterator.prototype.Kill = function(){
	this.request.Kill();
	this.request = null;
};