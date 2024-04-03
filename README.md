# Angular Space Missions App

This is a simple Angular application that displays information about SpaceX missions. It allows users to view a list of missions and details of each mission.

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository to your local machine:

2. Install dependencies:

3. Run the development server:

Navigate to `http://localhost:4200/` in your browser to view the application.

## Routes

### Mission List

- Path: `/`
- Description: Displays a list of SpaceX missions.
- Components:
- MissionlistComponent
- Features:
- Displays mission name, flight number, launch date, and other details.
- Allows users to click on a mission to view details.

### Mission Filter List

- Path: `/filter`
- Description: Displays a list of SpaceX missions with filter.
- Components:
- MissionfilterComponent
- Features:
- Displays mission name, flight number, launch date, and other details.
- Allows users to click on a mission to view details.
- Allows users to filter.

### Mission Details

- Path: `/missiondetails/:flightNumber`
- Description: Displays details of a specific SpaceX mission.
- Components:
- MissiondetailsComponent
- Features:
- Displays detailed information about the selected mission.
- Shows mission name, flight number, launch date, rocket details, and more.

## Services

### DataFetcherService

- Description: Service to fetch data from the SpaceX API.
- Methods:
- `fetchData()`: Fetches mission data from the API.

## Components

### MissionlistComponent

- Description: Component to display a list of SpaceX missions.
- Features:
- Displays a list of missions with basic information.
- Allows users to click on a mission to view details.

### MissiondetailsComponent

- Description: Component to display details of a specific SpaceX mission.
- Features:
- Displays detailed information about the selected mission.
