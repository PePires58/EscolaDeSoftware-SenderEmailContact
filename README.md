## Escola de software - Send Email  - Lambda Function

This repository constains a lambda function to send e-mail about our contact space.

The lamba function is called by an ApiGateway with the route: 'POST /email'.

This project was made with:
- Express.js
- Cors
- Elastic Container Registry (ECR)
- Docker Hub
- Lambda with custom image

# Object Definition
- Message: the message to us, this field is required
- Email: your e-mail for next reply, this field is required

Thanks a lot