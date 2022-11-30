import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {

  UserPoolId: 'us-east-2_MVK3l0blZ',
  ClientId: '31u8ucf1g2na8ue7buerln0v1j',
};

export default new CognitoUserPool(poolData);
