import axios from "axios";
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
import admin from "firebase-admin";
//import * as firebaseConfig from "../../config.json" assert { type: "json" };
import { readFileSync } from "fs";
dotenv.config();
const firebaseConfig = JSON.parse(
  readFileSync(
    "C:/Users/Pratham/OneDrive/Desktop/commerce/source/server/config.json",
    "utf8"
  )
);
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

// const firebaseConfig = {
//   apiKey: "AIzaSyDgLTKSm7s-tZhlQc0JtbO8jC91fiOfOBs",
//   authDomain: "commerce-95eb6.firebaseapp.com",
//   projectId: "commerce-95eb6",
//   storageBucket: "commerce-95eb6.appspot.com",
//   messagingSenderId: "243830577270",
//   appId: "1:243830577270:web:93504716252640f37ea757",
//   measurementId: "G-RPW1N5BEB5",
// };

// const app = initializeApp(firebaseConfig);

export const sendOTP = async (phoneNumber) => {
  const number = `+91${phoneNumber}`;
  // firebase.auth().verifyPhoneNumber(number, {
  //   timeout: 60,
  //   onCodeSent: (verificationId, forceResendingToken) => {
  //     // The verification code has been sent to the user's phone number.
  //     // Save the verification ID and forceResendingToken for later use.
  //   },
  // });
  admin
    .auth()
    .verifyPhoneNumber(number)
    .then((verificationCode) => {
      // You can send the verification code to the user via SMS or any other method
      console.log(verificationCode);
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });

  // const apiKey =
  //   "OSU5JA8VYqsoFkuE62HfQX3Kdh0vpZPbyrwaC1mlnejWc4iDgtwFpV5OPvrz6ByQ7xjfENWCMRlGiqmh";
  // const url = "https://www.fast2sms.com/dev/bulkV2";

  // const message = generateOTP();
  // const params = {
  //   route: "q",
  //   message: message,
  //   numbers: phoneNumber,
  // };
  // //console.log("service",phoneNumber,message);
  // const headers = {
  //   authorization: apiKey,
  //   "Content-Type": "application/json",
  // };

  // try {
  //   const response = await axios.post(url, params, { headers });
  //   console.log("OTP sent successfully!", response);
  //   return response;
  // } catch (error) {
  //   console.log(error.response.data);
  // }
  //const fast2smsLink = `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS}&route=dlt&sender_id=${senderId}&message=${messageId}&variables_values=${otp}%7C&flash=0&numbers=${phoneNumber}`;
  // try {
  //   client.messages
  //   .create({
  //      body: `Verification code is : ${otp}`,
  //      from: "+14066292235",
  //      to: `+918291518713`
  //    })
  //   .then(message => console.log(message.sid))

  // } catch (error) {
  //   console.log(error);
  // }
};
