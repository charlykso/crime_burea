
<?php
	include('inc/connection.php');
	include('inc/head.php');
	session_start();

?>
<body class="cbp-spmenu-push">
	<div class="main-content">
		<!--left-fixed -navigation-->
		<?php
			include('inc/nav.php');
		?>
		<!--left-fixed -navigation-->
		<!-- header-starts -->
		<?php
			include('inc/header.php');
		?>
		<!-- //header-ends -->
		<!-- main content start-->
		<div id="page-wrapper">
			<div class="main-page charts-page">
				<h3 class="title1">Modern charts</h3>
				<div class="charts">
					<div class="col-md-6 chrt-page-grids">
						<h4 class="title">Line Chart</h4>
						<canvas id="line" height="300" width="400" style="width: 400px; height: 300px;"></canvas>
					</div>
					<div class="col-md-6 chrt-page-grids chrt-right">
						<h4 class="title">Doughnut Chart</h4>
						<div class="doughnut-grid">
							<canvas id="doughnut" style="width:416px; height: 306px;"></canvas>
						</div>
					</div>
					<div class="col-md-6 charts chrt-page-grids">
						<h4 class="title">Radar Chart</h4>
						<div class="radar-grid">
							<canvas id="radar" height="300" width="400" style="width: 400px; height: 300px;"></canvas>
						</div>
					</div>
					<div class="col-md-6 charts chrt-page-grids chrt-right">
						<h4 class="title">polar Area Chart</h4>
						<div class="polar-area">
							<canvas id="polarArea" height="300" width="400" style="width: 400px; height: 300px;"></canvas>
						</div>
					</div>
					<div class="col-md-6 charts chrt-page-grids">
						<h4 class="title">Bar Chart</h4>
						<canvas id="bar" height="300" width="400" style="width: 400px; height: 300px;"></canvas>
					</div>
					<div class="col-md-6 charts chrt-page-grids chrt-right">
						<h4 class="title">Pie Chart</h4>
						<div class="pie-grid">
							<canvas id="pie" height="300" width="400" style="width: 400px; height: 300px;"></canvas>
						</div>
					</div>
					<div class="clearfix"> </div>
						<script>
						var doughnutData = [
								{
									value: 30,
									color:"#4F52BA"
								},
								{
									value : 50,
									color : "#F2B33F"
								},
								{
									value : 100,
									color : "#585858"
								},
								{
									value : 40,
									color : "#e94e02"
								},
								{
									value : 120,
									color : "#9358ac"
								}
							
							];
						var lineChartData = {
							labels : ["Sun","Mon","Tue","Wed","Thr","Fri","Sat"],
							datasets : [
								{
									fillColor : "rgba(51, 51, 51, 0)",
									strokeColor : "#4F52BA",
									pointColor : "#4F52BA",
									pointStrokeColor : "#fff",
									data : [50,65,68,71,67,70,65]
								},
								{
									fillColor : "rgba(51, 51, 51, 0)",
									strokeColor : "#F2B33F",
									pointColor : "#F2B33F",
									pointStrokeColor : "#fff",
									data : [55,60,54,58,62,55,58]
								},
								{
									fillColor : "rgba(51, 51, 51, 0)",
									strokeColor : "#e94e02",
									pointColor : "#e94e02",
									pointStrokeColor : "#fff",
									data : [50,55,52,45,46,49,52]
								}
							]
							
						};
						var pieData = [
								{
									value: 30,
									color:"#4F52BA"
								},
								{
									value : 50,
									color : "#585858"
								},
								{
									value : 100,
									color : "#e94e02"
								}
							
							];
						var barChartData = {
							labels : ["January","February","March","April","May","June","July"],
							datasets : [
								{
									fillColor : "rgba(233, 78, 2, 0.83)",
									strokeColor : "#ef553a",
									highlightFill: "#ef553a",
									data : [65,59,90,81,56,55,40]
								},
								{
									fillColor : "rgba(79, 82, 186, 0.83)",
									strokeColor : "#4F52BA",
									highlightFill: "#4F52BA",
									data : [50,65,60,50,70,70,80]
								},
								{
									fillColor : "rgba(88, 88, 88, 0.83)",
									strokeColor : "#585858",
									highlightFill: "#585858",
									data : [28,48,40,19,96,27,100]
								}
							]
							
						};
					var chartData = [
							{
								value : Math.random(),
								color: "rgba(239, 85, 58, 0.87)"
							},
							{
								value : Math.random(),
								color: "rgba(242, 179, 63, 0.87)"
							},
							{
								value : Math.random(),
								color: "rgba(88, 88, 88, 0.87)"
							},
							{
								value : Math.random(),
								color: "rgba(147, 88, 172, 0.87)"
							},
							{
								value : Math.random(),
								color: "rgba(79, 82, 186, 0.87)"
							},
						];
						var radarChartData = {
							labels : ["Sun","Mon","Tue","Wed","Thr","Fri","Sat"],
							datasets : [
								{
									fillColor : "rgba(239, 85, 58, 0.87)",
									strokeColor : "#e94e02",
									pointColor : "#e94e02",
									pointStrokeColor : "#fff",
									data : [65,59,90,81,56,55,40]
								},
								{
									fillColor : "rgba(79, 82, 186, 0.87)",
									strokeColor : "#4F52BA",
									pointColor : "#4F52BA",
									pointStrokeColor : "#fff",
									data : [28,48,40,19,96,27,100]
								}
							]
							
						};
						new Chart(document.getElementById("doughnut").getContext("2d")).Doughnut(doughnutData);
						new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
						new Chart(document.getElementById("radar").getContext("2d")).Radar(radarChartData);
						new Chart(document.getElementById("polarArea").getContext("2d")).PolarArea(chartData);
						new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);
						new Chart(document.getElementById("pie").getContext("2d")).Pie(pieData);
					</script>	
				</div>
			</div>
		</div>
		<!--footer-->
<?php

include('inc/footer.php');

?>