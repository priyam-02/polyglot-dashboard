import { google } from 'googleapis';

/**
 * Fetches data from a Google Sheet and converts it to JSON format
 * @param sheetName - The name of the sheet tab to fetch
 * @returns Array of objects representing the sheet data
 */
export async function fetchSheetData(sheetName: string): Promise<any[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is not set');
  }

  try {
    // Initialize the Google Sheets API
    // For public sheets, we still need an API key
    const apiKey = process.env.GOOGLE_API_KEY;

    const sheets = google.sheets({
      version: 'v4',
      auth: apiKey, // Use API key for public sheet access
    });

    // Fetch all data from the specified sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:ZZ`, // Fetch all columns
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      throw new Error(`No data found in sheet: ${sheetName}`);
    }

    // First row contains headers
    const headers = rows[0];

    // Convert rows to JSON objects
    const jsonData = rows.slice(1).map((row) => {
      const obj: any = {};
      headers.forEach((header, index) => {
        // Handle empty cells
        const value = row[index] !== undefined ? row[index] : null;

        // Try to parse numbers and booleans
        if (value === null || value === '') {
          obj[header] = null;
        } else if (value === 'TRUE' || value === 'true') {
          obj[header] = true;
        } else if (value === 'FALSE' || value === 'false') {
          obj[header] = false;
        } else if (!isNaN(Number(value)) && value !== '') {
          obj[header] = Number(value);
        } else {
          obj[header] = value;
        }
      });
      return obj;
    });

    return jsonData;
  } catch (error) {
    console.error(`Error fetching Google Sheet data for ${sheetName}:`, error);
    throw error;
  }
}

/**
 * Fetches benchmark data from the raw_results sheet
 */
export async function fetchBenchmarkData() {
  const sheetName = process.env.BENCHMARK_SHEET_NAME || 'raw_results';
  return fetchSheetData(sheetName);
}

/**
 * Fetches static metrics data from the static_metrics sheet
 */
export async function fetchStaticMetrics() {
  const sheetName = process.env.STATIC_METRICS_SHEET_NAME || 'static_metrics';
  return fetchSheetData(sheetName);
}
