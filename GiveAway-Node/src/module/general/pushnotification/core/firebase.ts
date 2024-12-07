import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import admin from 'firebase-admin';
import { TopicMessage } from 'firebase-admin/lib/messaging/messaging-api';
import * as _ from 'lodash';

const serviceAccountKey = require('./serviceAccountKey.json');

@Injectable()
export class FireBase implements OnModuleInit {
  private logger = new Logger("FireBase Service");

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey),
      });
    }
  }

  onModuleInit() {
    this.initializeFcmServer();
  }

  async handleFcm() {
    return "hi handle FireBase";
  }

  private initializeFcmServer() {
    this.logger.verbose(`Initializing Firebase Server.`);
  }

  async sendToDeviceToken(
    fcmtoken: string,
    webPushPayload: any,
    AndroidPayload: any,
    iOSPayload: any
  ) {
    // See documentation on defining a message payload.
    const message = {
      webpush: webPushPayload,
      android: AndroidPayload,
      apns: iOSPayload,
      token: fcmtoken,
    };

    try {
      // Send a message to the device corresponding to the provided
      // registration token.
      //
      // console.log(admin.app())

      admin.app()
        .messaging()
        .send(message)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((response) => {
          // Response is a message ID string.
          console.log("responser", response)

        })

        .catch((error) => {
          if (error.code === "messaging/registration-token-not-registered") {
            this.deleteFCMToken(fcmtoken);
          }
          console.log(`============error===========`);
          console.log("error", error);
          console.log(`============error===========`);
        });
    } catch (e) {
      console.log(`============e===========`);
      console.log(e);
      console.log(`============e===========`);
    }
  }

  async sendToDeviceTokenMultiple(message: any[]) {
    try {
      // console.log("mesasage final", message)
      const res = await admin.app().messaging().sendAll(message)
      // console.log("message rts", res)
    } catch (e) {
      // console.log(`============e===========`);
      // console.log(e);
      // console.log(`============e===========`);
    }
  }

  //Subscribe to Topic

  async topicSubscribe(tokens: any, topic: any) {
    //
    admin
      .messaging()
      .subscribeToTopic(tokens, topic)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(function (response) {
        //
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(function (error) {
        //
      });
  }

  //Subscribe to Topic

  async topicUnSubscribe(tokens: any, topic: any) {
    //
    admin
      .messaging()
      .unsubscribeFromTopic(tokens, topic)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(function (response) {
        //
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(function (error) {
        //
      });
  }

  //send to topics
  async sendToTopic(
    webPushPayload: any,
    AndroidPayload: any,
    iOSPayload: any,
    topic: string
  ) {
    const message: TopicMessage = {
      webpush: webPushPayload,
      android: AndroidPayload,
      apns: iOSPayload,
      topic: topic
    };
    //
    // Send a message to devices subscribed to the provided topic.
    admin
      .messaging()
      .send(message)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((response) => {
        // Response is a message ID string.
        // console.log("res", response)
        //
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        //
        // console.log("errror", error)
      });
  }

  //send to topics with condition
  async sendToTopicWithCondition(
    topiccondition: any,
    notification: any,
    data: any,
    AndroidPayload: any,
    iOSPayload: any
  ) {
    const message = {
      //notification,
      //data,
      android: AndroidPayload,
      apns: iOSPayload,
      condition: topiccondition,
    };
    //
    // Send a message to devices subscribed to the provided topic.
    admin
      .messaging()
      .send(message)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((response) => {
        // Response is a message ID string.
        //
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        //
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteFCMToken(PushToken: string) {
    //
    // SQLService.run(SQLQuery.deleteByToken, { PushToken });
  }

  async payload(params: any) {
    // console.log("params", params)
    const {
      contentAvailable,
      mutableContent,
      category,
      collapse_key,
      ttl,
      notification,
      data,
    } = params;

    const webPushPayload = {
      headers: data,
      notification,
      data,
      // fcm_options:{
      //   "link": "www.google.com",
      // }
    }; // 14 Days 1209600

    const androidPayload = {
      ttl: ttl ? ttl : 259200,
      priority: "high",
      collapse_key: collapse_key ? collapse_key : false,
      notification,
      data,
    }; // 14 Days 1209600

    const iosPayload = {
      payload: {
        aps: {
          sound: "default",
          alert: notification,
          category: category ? "actiontypecontent" : null,
          mutableContent: mutableContent ? mutableContent : 1,
          "content-available": contentAvailable ? contentAvailable : 1,
          collapseKey: collapse_key ? collapse_key : null,
          expiry: ttl ? ttl : Math.floor(Date.now() / 1000) + 259200,
        },
        data: {},
      },
    }; // 14 Days 1209600

    iosPayload.payload = _.assign(iosPayload.payload, data);
    iosPayload.payload.data = data;
    //  iosPayload.payload.data = JSON.parse(data.data)

    return [webPushPayload, androidPayload, iosPayload];
  }
}