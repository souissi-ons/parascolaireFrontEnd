import { AfterViewInit, Component } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  studentCount = 1244; 
  percentageChange = -12;
  eventCount: number = 0;
  eventPercentage: number = 0;
  eventTrend: string = '';

  ngOnInit() {
    this.fetchEventStats();
  }

  fetchEventStats() {
    // Replace with your actual API call
    this.eventCount = 157;
    this.eventPercentage = 15;
    this.eventTrend = this.eventPercentage > 0 ? 'increase' : 'decrease';
  }
 
  ngAfterViewInit(): void {
    // Configuration du Pie Chart
    const pieChartDom = document.getElementById('pieChart')!;
    const pieChart = echarts.init(pieChartDom);
    const pieOption = {
      title: {
        text: 'classification by gender',
        // subtext: 'Fake Data',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      color: ['#fe87c8', '#95c2fa'],
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 60, name: 'Female' },
            { value: 40, name: 'Male' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    pieChart.setOption(pieOption);

    // Configuration du Bar Chart
    const barChartDom = document.getElementById('barChart')!;
    const barChart = echarts.init(barChartDom);
    const barOption = {
      title: {
        text: 'club classification by number of events',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['clubA', 'clubB', 'clubC', 'clubD'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          color: '#320285',
        },
      ],
    };
    barChart.setOption(barOption);
    // Configuration du deuxième Pie Chart pour la classification des étudiants
    const studentPieChartDom = document.getElementById('studentPieChart')!;
    const studentPieChart = echarts.init(studentPieChartDom);
    const studentPieOption = {
      title: {
        text: '                   Student Classification:In Club vs Not in Club',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      color: ['#32CD32', '#FFA500'],
      series: [
        {
          name: 'Student Classification',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 70, name: 'In Club' },
            { value: 30, name: 'Not in Club' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    studentPieChart.setOption(studentPieOption);
    // Donut Chart Configuration
    const donutChartDom = document.getElementById('donutChart')!;
    const donutChart = echarts.init(donutChartDom);
    const donutOption = {
      title: {
        text: 'Number of Members per Club',
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 12,
          fontWeight: 'normal',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} <br/>{c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Club A', 'Club B', 'Club C', 'Club D', 'Club E'],
      },
      series: [
        {
          name: 'Teams',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          data: [
            { value: 249, name: 'Club A', itemStyle: { color: '#3398DB' } },
            { value: 200, name: 'Club B', itemStyle: { color: '#32CD32' } },
            { value: 120, name: 'Club C', itemStyle: { color: '#FFA500' } },
            { value: 150, name: 'Club D', itemStyle: { color: '#FF6347' } },
            { value: 80, name: 'Club E', itemStyle: { color: '#8A2BE2' } },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    donutChart.setOption(donutOption);
  }
}
