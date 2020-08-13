const sgMail = require('@sendgrid/mail');

const SG_FROM_EMAIL = process.env.SG_FROM_EMAIL;

sgMail.setApiKey(process.env.SG_API_KEY);

const sendWelcomeEmail = ({ email, name }) => {
    sgMail.send({
        to: email,
        from: SG_FROM_EMAIL,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    });
};

const sendGoodbyeEmail = ({ email, name }) => {
    sgMail.send({
        to: email,
        from: SG_FROM_EMAIL,
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}. If you have a moment, I would love to know how I can improve my application?`,
    });
};

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
};
