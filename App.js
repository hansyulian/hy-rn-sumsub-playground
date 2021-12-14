/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxM2IyZDlkNy1hZmQyLTQ1NzAtODdmMC01N2Y2Y2E5ODY4ZjgiLCJpYXQiOjE2Mzk0NzI3MTgsImV4cCI6MTYzOTQ3MzYxOH0.V5OZTJu_a9-M8pSUFMPB1XgDpkK_YUGjXpuRoE9OYlc';

async function getNewAccessToken() {
  const response = await fetch('http://192.168.0.2:4000/sumsub/access-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });
  const responseJson = await response.json();
  return responseJson.token;
}

const App = () => {
  async function launchSumsub() {
    const accessToken = await getNewAccessToken();
    let snsMobileSDK = SNSMobileSDK.init(accessToken, getNewAccessToken)
      // .onTestEnv() // Remove this when you work with the production environment
      .withHandlers({
        // Optional callbacks you can use to get notified of the corresponding events
        onStatusChanged: event => {
          console.log(
            'onStatusChanged: [' +
              event.prevStatus +
              '] => [' +
              event.newStatus +
              ']',
          );
        },
        onLog: event => {
          console.log('onLog: [Idensic] ' + event.message);
        },
      })
      .withDebug(true)
      .withLocale('en') // Optional, for cases when you need to override system locale
      .build();

    snsMobileSDK
      .launch()
      .then(result => {
        console.log('SumSub SDK State: ' + JSON.stringify(result));
      })
      .catch(err => {
        console.log('SumSub SDK Error: ' + JSON.stringify(err));
      });
  }

  return (
    <TouchableOpacity onPress={launchSumsub}>
      <Text>Click for sumsub</Text>
    </TouchableOpacity>
  );
};

export default App;
