import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const mailOptions = {
    from: `ServiceTitan Hacks <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
}

export function getBuyingGroupConfirmationEmail(firstName: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(to bottom, #09090b 0%, #1a1b20 100%); padding: 32px 24px; text-align: center;">
        <img src="https://servicetitanhacks.com/assets/secondary%20logo_1760895642629-DgGaSbgX.png" alt="ServiceTitan Hacks" style="height: 48px; width: auto;" />
      </td>
    </tr>
    
    <!-- Main Content -->
    <tr>
      <td style="padding: 40px 32px;">
        <h1 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 700; color: #09090b;">
          We've Received Your Request
        </h1>
        
        <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
          Hi ${firstName},
        </p>
        
        <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
          Thank you for your interest in the <strong>ServiceTitan Hacks Equipment Buying Group</strong>. We've received your application and it's currently pending approval.
        </p>
        
        <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
          Our team will review your information and get back to you within <strong>24-48 hours</strong> with next steps.
        </p>
        
        <!-- Status Box -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 16px 20px; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #dc2626; text-transform: uppercase; letter-spacing: 0.5px;">
                Status: Pending Approval
              </p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 24px 0 0 0; font-size: 16px; line-height: 1.6; color: #3f3f46;">
          In the meantime, feel free to explore our resources:
        </p>
        
        <!-- CTA Button -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
          <tr>
            <td>
              <a href="https://servicetitanhacks.com/resources" 
                 style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; padding: 14px 28px; border-radius: 8px;">
                Browse Free Resources
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #f4f4f5; padding: 24px 32px; text-align: center;">
        <p style="margin: 0 0 8px 0; font-size: 14px; color: #71717a;">
          Questions? Reply to this email or contact us at
        </p>
        <a href="mailto:bill@st-hacks.com" style="color: #dc2626; text-decoration: none; font-weight: 600;">
          bill@st-hacks.com
        </a>
        <p style="margin: 16px 0 0 0; font-size: 12px; color: #a1a1aa;">
          &copy; ${new Date().getFullYear()} ServiceTitan Hacks. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
