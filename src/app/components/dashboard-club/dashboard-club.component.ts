import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard-club',
  templateUrl: './dashboard-club.component.html',
  styleUrl: './dashboard-club.component.css',
})
export class DashboardClubComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // Configuration du Pie Chart
    const pieChartDom = document.getElementById('pieChart')!;
    const pieChart = echarts.init(pieChartDom);
    const pieOption = {
      title: {
        text: 'Classification by gender',
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
        text: ' Evolution of number of members per month',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Bar Chart'],
        top: '10%',
      },
      xAxis: {
        type: 'category',
        data: [
          'Jan',
          'Feb',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        axisLabel: {
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
        title: {
          text: 'Values',
        },
      },
      series: [
        {
          type: 'bar',
          data: [65, 59, 80, 81, 56, 55, 40, 22, 10, 56, 10, 80],
          itemStyle: {
            color: (params: any) => {
              const colors = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(64, 255, 201, 0.2)',
                'rgba(255, 86, 168, 0.2)',
                'rgba(88, 80, 251, 0.2)',
                'rgba(255, 182, 86, 0.2)',
              ];
              return colors[params.dataIndex];
            },
          },
        },
      ],
    };
    barChart.setOption(barOption);
  }

  renderEventsChart() {
    const ctx = document.getElementById('clubEventsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'number of events',
            data: [10, 20, 30, 25, 15, 40, 60, 55, 35, 45, 30, 50],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Evolution of number of event per month',
          },
          legend: { display: true, position: 'bottom' },
        },
        scales: {
          x: { title: { display: true, text: 'month' } },
        },
      },
    });
  }

  memberCount: number = 0;
  memberPercentage: number = 0;
  memberTrend: string = '';
  eventCount: number = 0;
  eventPercentage: number = 0;
  eventTrend: string = '';
  ExternaleventCount: number = 0;
  ExternaleventPercentage: number = 0;
  ExternaleventTrend: string = '';
  InternaleventCount: number = 0;
  InternaleventPercentage: number = 0;
  InternaleventTrend: string = '';

  ngOnInit() {
    this.renderEventsChart();
    this.fetchEventStats();
    this.fetchmemberStats();
    this.fetchInternaleventsStats();
    this.fetchExternaleventsStats();
  }

  fetchEventStats() {
    // Replace with your actual API call
    this.eventCount = 157;
    this.eventPercentage = 15;
    this.eventTrend = this.eventPercentage > 0 ? 'increase' : 'decrease';
  }
  fetchmemberStats() {
    // Replace with your actual API call
    this.memberCount = 1575;
    this.memberPercentage = -16;
    this.memberTrend = this.memberPercentage > 0 ? 'increase' : 'decrease';
  }
  fetchInternaleventsStats() {
    // Replace with your actual API call
    this.InternaleventCount = 102;
    this.InternaleventPercentage = -18;
    this.InternaleventTrend =
      this.InternaleventPercentage > 0 ? 'increase' : 'decrease';
  }
  fetchExternaleventsStats() {
    // Replace with your actual API call
    this.ExternaleventCount = 54;
    this.ExternaleventPercentage = 27;
    this.ExternaleventTrend =
      this.ExternaleventPercentage > 0 ? 'increase' : 'decrease';
  }
}
