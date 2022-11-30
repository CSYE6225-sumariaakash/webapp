# CSYE6225: Assignment-08

001568622 Akash Sumaria

This is a README file of Assignment_04 for the course INFO6225.

1. Clone the repository.
```bash
git clone <repo SSH protocol>
```

2. Navigate to project directory.
```bash
cd <path to cloned directory>
```

3. Run 
```bash
npm install
```

4. Install Browser/Postman to view running application.
```bash
npm start
```
5. Run Packer command 
```bash
    packer build <file name .pkr.hcl>
```
6. Run AWS Cloud Formation Command by Passing the parameter
```bash
aws cloudformation create-stack --stack-name teststack14 --template-body file://csye6225-infra.yaml --parameters ParameterKey=VpcCidrBlock,ParameterValue=10.0.0.0/16 ParameterKey=SubnetCidrBlock1,ParameterValue=10.0.1.0/24 ParameterKey=SubnetCidrBlock2,ParameterValue=10.0.2.0/24 ParameterKey=SubnetCidrBlock3,ParameterValue=10.0.3.0/24 ParameterKey=ImageId,ParameterValue=' AMI-ID’
```
## Technologies

Language: JavaScript,

Runtime Environment: NodeJs, 
 
FrameWork: ExpressJs

Database: MySql


## Requirements

Web Application Updates
For this assignment, we will update our web application to verify the user's email address on sign-up. The email verification flow should be as follows:

The user creates a new account.
The web application creates a one-time use token (stored in the DynamoDB, schema/model not included in swagger) and posts a message to the SNS topic. The message includes the following at minimum:
User's email address.
One-time use token.
Message Type
The one-time-use token should be valid for only 5 minutes after creation. Use the DynamoDB TTL feature Links to an external site.to implement this. 
SNS will trigger the Lambda function which will send an email to the user. The email message must include a valid link to your domain (which is environment-specific i.e. in dev, the link should be for the dev subdomain). Example link: http://prod.domain.tld/v1/verifyUserEmail?email=user@example.com&token=sometoken Links to an external site. 
The email message should have proper DKIM signature and SPF records.
The email message should not end up in the user's SPAM/Junk folder.
When the user clicks on the link (while it is valid), the user should be marked as verified.
Unverified users should not be able to make any authenticated API call until they have verified their account.
We will not implement an API for users to request a new one-time-use token to verify the user account. 