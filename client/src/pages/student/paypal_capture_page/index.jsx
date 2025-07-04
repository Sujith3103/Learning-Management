import { useSearchParams, useNavigate } from "react-router-dom";
import { captureAndFinalizePaymentService } from "@/services";
import { useEffect } from "react";

export default function PaypalCapturePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");
    const orderId = searchParams.get("orderId"); // you might store this in local/session storage before redirect if needed

    const capture = async () => {
      try {
        const data = await captureAndFinalizePaymentService({
          paymentId,
          payerId,
          orderId,
        });
        console.log("Payment captured: ", data);
        navigate("/success");
      } catch (err) {
        console.error("Error capturing payment", err);
        navigate("/failure");
      }
    };

    capture();
  }, []);

  return <div>Processing your payment...</div>;
}
