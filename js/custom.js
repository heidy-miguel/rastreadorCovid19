function chart(){
	var country = document.getElementById('country');
	var myChart = document.getElementById('myChart');
	var countryName = document.getElementById('countryName');
	
	$.ajax({
		url: 'https://corona.lmao.ninja/v2/historical/'+ country.value +'?lastdays=7',
		dataType: 'json',
		timeout: 10000
	}).done(function(result, status, xhr){
	     var ctx = document.getElementById('myChart');
	     var casesLabel = [];
	     var casesData = [];
	     var deathsData = [];
	     var recoveredData = [];

	     $.each(result.timeline.cases, function(key, value){
	     	casesLabel.push(key);
	     	casesData.push(value);
	     });
	     $.each(result.timeline.deaths, function(key, value){
	     	deathsData.push(value);
	     });
	     $.each(result.timeline.recovered, function(key, value){
	     	recoveredData.push(value);
	     });

	     countryName.innerHTML = result.country;

	     var myChart = new Chart(ctx, {
	        type: 'line',
	        data: {
	          labels: casesLabel,
				datasets: [{
					label: 'Casos',
					backgroundColor: '#0000FFFF',
					borderColor: '#0000FFFF',
					data: casesData,
					fill: false,
				}, {
					label: 'Mortes',
					fill: false,
					backgroundColor: '#AA0000FF',
					borderColor: '#AA0000FF',
					data: deathsData,
				}, {
					label: 'Recuperados',
					fill: false,
					backgroundColor: '#00AA00FF',
					borderColor: '#00AA00FF',
					data: recoveredData,
				}]
			},
	        options: {
	        	responsive: true,
	        	title: {
	        		display: true,
	        		text: 'DADOS ESTATÍSTICOS'
	        	},
	          scales: {
	            yAxes: [{
	              ticks: {
	                beginAtZero: false
	              }
	            }]
	          },
	          legend: {
	            display: false,
	          }
	        }
	      });
	}).fail(function(err, status, xhr){
		alert("Ocorreu um erro\n" + err);
	});
}

$(document).ready(function(){
	$.ajax({
		url: 'https://corona.lmao.ninja/v2/countries/',
		dataType: 'json',
		timeout: 10000,
		success: function(result){ 
			option = '';
			table = '';
			table += '<table class="table table-striped table-sm">';
			table += '<thead><tr>';
			table += '<th>País</th>';
			table += '<th>Casos</th>';
			table += '<th>Mortes</th>';
			table += '<th>Recuperados</th>';
			table += '</tr></thead>';
			table += '<tbody>';

			$.each(result, function(index, entry){
				option += '<option value="' + entry.country + '">' + entry.country + '</option>';

				table += '<tr>';
				table += '<td>' + entry.country + '</td>';
				table += '<td>' + entry.cases + '</td>';
				table += '<td>' + entry.deaths + '</td>';
				table += '<td>' + entry.recovered + '</td>';
				table += '</tr>';
			});

			table += '</tbody>';
			$('.table-responsive').html(table);
			$('#country').html(option);
		},
		error: function(jqXHR, textStatus){ alert("Ocorreu um erro, veja se tens conexão a internet.\n" + textStatus); }, 
	});
});