import { Component, OnInit } from '@angular/core';
import { SpaceXLaunch } from '../model/space-x-launch.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './missiondetails.component.html',
  styleUrl: './missiondetails.component.css',
})
export class MissiondetailsComponent implements OnInit {
  flightNumber: number = 0;
  missionDetails: SpaceXLaunch | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.flightNumber = params['flightNumber'];
      this.fetchMissionDetails();
    });
  }

  fetchMissionDetails(): void {
    this.http
      .get<SpaceXLaunch>(
        `https://api.spacexdata.com/v3/launches/${this.flightNumber}`
      )
      .subscribe(
        (data: SpaceXLaunch) => {
          this.missionDetails = data;
        },
        (error) => {
          console.error('Error fetching mission details:', error);
        }
      );
  }
}
