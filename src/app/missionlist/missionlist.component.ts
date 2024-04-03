import { DatePipe, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpaceXLaunch } from '../model/space-x-launch.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [NgFor, DatePipe, RouterModule],
  templateUrl: './missionlist.component.html',
  styleUrl: './missionlist.component.css',
})
export class MissionlistComponent implements OnInit {
  launches: SpaceXLaunch[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchLaunches();
  }

  onSelectMission(flightNumber: number): void {
    this.router.navigate(['/missiondetails', flightNumber]);
  }

  fetchLaunches(): void {
    this.http
      .get<SpaceXLaunch[]>('https://api.spacexdata.com/v3/launches')
      .subscribe(
        (data: SpaceXLaunch[]) => {
          this.launches = data;
        },
        (error) => {
          console.error('Error fetching launches:', error);
        }
      );
  }
}
