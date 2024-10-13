import { API_URL_PAYMENT } from "../config";
import { getProfile } from "../user/profileUser";
const createPaymentIntent = async (amount) => {
  try {
    const profile = await getProfile();
    const res = await fetch(`${API_URL_PAYMENT}/payments/intents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 1000,
        userId: +profile.userId,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching createPaymentIntent:", error);
  }
};
export default createPaymentIntent;
