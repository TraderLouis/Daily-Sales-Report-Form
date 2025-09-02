# Daily-Sales-Report-Form

**Daily-Sales-Report-Form** is a Google Apps Script–based web project designed to simplify and speed up the process of filling out daily sales reports. It integrates with Google Sheets to automatically read existing data, reducing manual input, and sends formatted performance reports directly to LINE for instant team communication.

## Project Structure

- **code.gs** – Backend Google Apps Script  
  Handles reading/writing Google Sheets, sending LINE messages via the Messaging API.

- **index.html** – Frontend interface  
  The main HTML page displaying the form and item list.

- **Main.html** – Main frontend JavaScript  
  Contains the primary logic to initialize the UI, link DataManager, FormManager, OrderManager, and UIManager. This drives the dynamic behavior of the form.

- **Other HTML/JS includes** – Secondary scripts  
  Includes helper classes such as `DataManager`, `FormManager`, `OrderManager`, and `UIManager` (partial logic, autocomplete, calculations, etc.).

- **style.html** – CSS styling  
  Defines the layout, table, buttons, and responsive design for the form.

- **config.html** – Configuration constants  
  Stores settings such as currency defaults or exchange rates.

## Key Features
- Deployed entirely with **Google Apps Script**, no server setup required
- Auto-fill form fields by reading data from Google Sheets  
- Support for multiple salespersons and products  
- Generate and send formatted sales reports to LINE  
- Clean and intuitive web interface  

## How It Works
1. Users open the deployed Google Apps Script web app (form page)  
2. Data from Google Sheets is automatically retrieved and pre-filled into the form  
3. Users add items, review totals, and submit the report  
4. The report is formatted and sent to LINE for team-wide updates  

## Tech Stack
- **Google Apps Script** (Web App deployment)  
- **Google Sheets API** (data source)  
- **LINE Messaging API** (notifications)  
- HTML / CSS / JavaScript (frontend form)  

## License
MIT License
