import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {

  UserPoolId: 'USERPOOL ID',
  ClientId: 'CLIENT ID',
};

export default new CognitoUserPool(poolData);
