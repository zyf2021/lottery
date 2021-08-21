const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const oauth_playground = 'https://developers.google.com/oauthplayground'

const {
    mailing_service_client_id,
    mailing_service_client_secret,
    mailing_service_refresh_token,
    sender_email_address
} = require('config')

const oauth2Client = new OAuth2(
    mailing_service_client_id,
    mailing_service_client_secret,
    mailing_service_refresh_token,
    oauth_playground
)

// send mail
const sendEmail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: mailing_service_refresh_token
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: sender_email_address,
            clientId: mailing_service_client_id,
            clientSecret: mailing_service_client_secret,
            refreshToken: mailing_service_refresh_token,
            accessToken
        }
    })

    const mailOptions = {
        from: sender_email_address,
        to: to,
        subject: "Lottery",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the DevAT channel.</h2>
            <p>Congratulations! You're almost set to start using DEVAT✮SHOP.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (e, infor) => {
        if(e) return e;
        return infor
    })
}

module.exports = sendEmail