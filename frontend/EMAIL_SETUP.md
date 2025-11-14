# Email Setup Instructions

To enable real-time email functionality in your contact form:

## Gmail Setup:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Update Environment Variables**:
   ```bash
   # In server/.env file
   EMAIL_USER=varshamahesh3101@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

## Alternative Email Services:

### Outlook/Hotmail:
```javascript
service: 'hotmail',
auth: {
  user: 'your-email@outlook.com',
  pass: 'your-password'
}
```

### Custom SMTP:
```javascript
host: 'smtp.your-provider.com',
port: 587,
secure: false,
auth: {
  user: 'your-email@domain.com',
  pass: 'your-password'
}
```

## Testing:
1. Start the backend server: `npm run server`
2. Fill out the contact form on your website
3. Check your email for the message
4. Verify the sender receives a confirmation

## Security Notes:
- Never commit `.env` file to version control
- Use app passwords, not your main account password
- Consider using services like SendGrid for production