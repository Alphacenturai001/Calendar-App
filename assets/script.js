$(document).ready(function() {
	const m = moment();
	$("#currentDay").html(moment().format("LL"));
	console.log(moment());
	console.log(m.format('LL'));
	
	var Schedule = JSON.parse(localStorage.getItem("Schedule")) || initializeSchedule();
	console.log(Schedule);

	for (var time in Schedule) {
		console.log(time, Schedule[time]);
		var tr = $("<tr>")
			// .addClass("row time-block");
		var tdTime = $("<td>")
			.addClass("hour") 
			.text(time);
		var tdEvent = $("<td>")
			.addClass("textArea");

		var thisTime;
		
		if (moment(time, "h a").isSame(moment(), "hour")) {
			thisTime = "present";
		} else if (moment(time, "h a").isAfter(moment())) {
			thisTime = "future";
		} else if (moment(time, "h a").isBefore(moment())) {
			thisTime = "past";
		}

		var eventText = $("<textarea>")
			.addClass("description")
			.addClass(thisTime)
			.attr("data-time", time)
			.val(Schedule[time]);
		tdEvent.append(eventText);
		// eventText.appentTo(tdEvent);

		var tdSubmit = $("<td>").addClass("saveBtn");

		var icon = $("<i>").addClass("far fa-save fa-2x");

		tdSubmit.append(icon);
		// icon.appentTo(tdSubmit);

		tr.append(tdTime, tdEvent, tdSubmit);

		$("#mySchedule").append(tr);
		// tr.appentTo($("#mySchedule"));
	}

	function initializeSchedule() {
		var tempSchedule = {};

		for (var i = 8; i < 18; i++) {
			// tempSchedule.moment(i, "H").format("h a") = "";
			tempSchedule[moment(i, "H").format("h a")] = "";
		}
		// tempSchedule.appendTo($(".container"));
		return tempSchedule;
	}

	$(".saveBtn").on("click", function() {
		$(this).css("color", "#06AE");
		var time = $(this)
			.parent()
			.find(".description")
			.attr("data-time");
		var text = $(this)
			.parent()
			.find(".description")
			.val();
		console.log(time, text);

		Schedule[time] = text;

		localStorage.setItem("Schedule", JSON.stringify(Schedule));
	});
});