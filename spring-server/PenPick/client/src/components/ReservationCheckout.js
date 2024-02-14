import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import "../css/ReservationToss.css";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

export function ReservationCheckout() {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const agreementWidgetRef = useRef(null);

  const sessionPay = window.sessionStorage.getItem("roomPrice");
  
  const [roomPrice, setRoomPrice] = useState(sessionPay || "");
  console.log("roomPrice",roomPrice);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget("test_ck_Poxy1XQL8Rl6wJyAkD6ZV7nO5Wml",  ANONYMOUS); // 비회원 customerKey

      if (paymentWidgetRef.current == null) {
        paymentWidgetRef.current = paymentWidget;
      }

      /**
       * 결제창을 렌더링합니다.
       * @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods%EC%84%A0%ED%83%9D%EC%9E%90-%EA%B2%B0%EC%A0%9C-%EA%B8%88%EC%95%A1
       */
      const paymentMethodsWidget = paymentWidgetRef.current.renderPaymentMethods(
        "#payment-method",
        { value: roomPrice },
        { variantKey: "DEFAULT" }
      );

      /**
       * 약관을 렌더링합니다. 
       * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement%EC%84%A0%ED%83%9D%EC%9E%90-%EC%98%B5%EC%85%98
       */
      agreementWidgetRef.current = paymentWidgetRef.current.renderAgreement("#agreement", { variantKey: "DEFAULT" });

      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  return (
    <div className="reswrapper w-100">
      <div className="resmax-w-540 w-100">
        <div id="payment-method" className="resw-100" />
        <div id="agreement" className="resw-100" />
        <div className="resbtn-wrapper w-100">
          <button
            className="resbtn primary w-100"
            onClick={async () => {
              const paymentWidget = paymentWidgetRef.current;
    
              try {
                /**
                 * 결제 요청
                 * @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment%EA%B2%B0%EC%A0%9C-%EC%A0%95%EB%B3%B4
                 */
                await paymentWidget?.requestPayment({
                  orderId: generateRandomString(),
                  orderName: "토스 티셔츠 외 2건",
                  customerName: "김토스",
                  customerEmail: "customer123@gmail.com",
                  successUrl: window.location.origin + "/" + window.location.search,
                  failUrl: window.location.origin + "/sandBox/fail" + window.location.search
                });
              } catch (error) {
                // TODO: 에러 처리
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default ReservationCheckout;