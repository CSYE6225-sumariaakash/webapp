# webapp
CSYE-6225 Akash Sumaria webapp.

# NUID : 001568622 
# #Name - Akash Sumaria

Application Logging & Metrics
AMI Updates
Update your packer template to install Links to an external site. the Unified CloudWatch Agent Links to an external site. in your AMIs.
Your CloudWatch agent must be set up to start automatically when an EC2 instance is launched using your AMI.
IAM Updates
Update the CloudFormation template to Update the IAM role attached to the EC2 instance for use with CloudWatch Agent Links to an external site..
WebApp User Stories
As a user, I want all application log data to be available in CloudWatch.
As a user, I want metrics on API usage available in CloudWatch.
Create the following custom metrics for every API we have implemented in the web application. The metrics data should be collected in CloudWatch.
Count the number of times each API is called.
You can retrieve custom metrics using either StatsD Links to an external site. or collectd Links to an external site..

Reference API documentation
Swaggerhub: https://app.swaggerhub.com/apis-docs/fall2022-csye6225/cloud-native-webapp/assignment-02. 

Requirements
All API request/response payloads should be in JSON.
No UI should be implemented for the application.
As a user, I expect all API calls to return with a proper HTTP status code.
As a user, I expect the code quality of the application is maintained to the highest standards using the unit and/or integration tests.

Use below commands to install, and run the application.
To install -> npm install
To start the application -> npm start
To test -> npm test (No UI so test via POSTMAN).


