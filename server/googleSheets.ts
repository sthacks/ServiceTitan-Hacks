// Google Sheets integration via Replit connector
import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

let cachedSpreadsheetId: string | null = null;

async function getOrCreateSpreadsheet(): Promise<string> {
  if (cachedSpreadsheetId) {
    return cachedSpreadsheetId;
  }

  if (process.env.GOOGLE_SHEET_PURCHASING_PLATFORM_ID) {
    cachedSpreadsheetId = process.env.GOOGLE_SHEET_PURCHASING_PLATFORM_ID;
    return cachedSpreadsheetId;
  }

  const sheets = await getUncachableGoogleSheetClient();

  const spreadsheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: 'ServiceTitan Hacks - Purchasing Platform Leads',
      },
      sheets: [
        {
          properties: {
            title: 'Leads',
          },
        },
      ],
    },
  });

  cachedSpreadsheetId = spreadsheet.data.spreadsheetId!;
  console.log(`Created new Google Sheet for purchasing platform leads: ${cachedSpreadsheetId}`);
  console.log(`Sheet URL: https://docs.google.com/spreadsheets/d/${cachedSpreadsheetId}`);

  await sheets.spreadsheets.values.append({
    spreadsheetId: cachedSpreadsheetId,
    range: 'Leads!A1',
    valueInputOption: 'RAW',
    requestBody: {
      values: [['Submitted At', 'First Name', 'Last Name', 'Email', 'Phone', 'Company Website', 'Company Name', 'Contractor License #', 'Issuing Authority']],
    },
  });

  return cachedSpreadsheetId;
}

export async function appendPurchasingPlatformLead(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyWebsite: string;
  companyName: string;
  contractorLicense: string;
  issuingAuthority: string;
}) {
  try {
    const spreadsheetId = await getOrCreateSpreadsheet();
    const sheets = await getUncachableGoogleSheetClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Leads!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          new Date().toISOString(),
          data.firstName,
          data.lastName,
          data.email,
          data.phone,
          data.companyWebsite,
          data.companyName,
          data.contractorLicense,
          data.issuingAuthority,
        ]],
      },
    });

    console.log(`Purchasing platform lead appended to Google Sheet: ${data.email}`);
  } catch (error) {
    console.error('Failed to append to Google Sheet:', error);
  }
}
