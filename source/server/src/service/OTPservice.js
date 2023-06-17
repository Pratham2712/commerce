import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP.toString();
}

export const sendOTP = async (phoneNumber) => {
  const apiKey = process.env.FAST2SMS;
  const url = "https://www.fast2sms.com/dev/bulkV2";

  const message = generateOTP();
  const params = {
    authorization: apiKey,
    message: message,
    numbers: phoneNumber,
    route: "otp",
    language: "english",
  };

  try {
    const response = await axios.post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("OTP sent successfully!", response);
    return response;
  } catch (error) {
    console.log(error);
  }
  //const fast2smsLink = `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS}&route=dlt&sender_id=${senderId}&message=${messageId}&variables_values=${otp}%7C&flash=0&numbers=${phoneNumber}`;
};
