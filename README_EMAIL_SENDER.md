# Email sender integration (lead notifications)

## What was added
- Server endpoint: `POST /api/lead`
- Client sends lead data on successful form submit.

## How email is sent
Currently configured to use SMTP via Nodemailer.

### Required environment variables
Create `.env.local` (or set env vars) with:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_EMAIL` (e.g. `no-reply@yourdomain.com`)
- `SMTP_TO_EMAIL` (target email address for leads)

### Example
```env
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_password
SMTP_FROM_EMAIL=no-reply@yourdomain.com
SMTP_TO_EMAIL=owner@yourdomain.com
```

## Notes
- If SMTP vars are not set, the endpoint will still accept leads and log them, but it will not send emails.

