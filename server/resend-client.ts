import { Resend } from 'resend';

const FALLBACK_FROM_EMAIL = 'noreply@st-hacks.com';

async function getCredentialsFromConnector(): Promise<{ apiKey: string; fromEmail: string } | null> {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY
      ? 'repl ' + process.env.REPL_IDENTITY
      : process.env.WEB_REPL_RENEWAL
      ? 'depl ' + process.env.WEB_REPL_RENEWAL
      : null;

    if (!xReplitToken || !hostname) return null;

    const settings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    if (settings?.settings?.api_key) {
      return {
        apiKey: settings.settings.api_key,
        fromEmail: settings.settings.from_email || FALLBACK_FROM_EMAIL
      };
    }
    return null;
  } catch {
    return null;
  }
}

async function getCredentials(): Promise<{ apiKey: string; fromEmail: string }> {
  const connectorCreds = await getCredentialsFromConnector();
  if (connectorCreds) return connectorCreds;

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    return { apiKey, fromEmail: FALLBACK_FROM_EMAIL };
  }

  throw new Error('Resend not configured: set RESEND_API_KEY environment variable');
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}
