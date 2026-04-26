import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://d4cfe76b7ba40eee9bfd0e5753c49fe3@o4511138815148032.ingest.us.sentry.io/4511138822553600",
  integrations:[
    Sentry.mongooseIntegration()
  ],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});