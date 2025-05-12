import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";

function VerifyButton({ email, handleSendVerifyEmail, t }) {
  const [countdown, setCountdown] = useState(0);

  const handleClick = () => {
    if (!email || countdown > 0) return;

    handleSendVerifyEmail();
    setCountdown(60);
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <Button
      size="sm"
      disabled={!email || countdown > 0}
      onClick={handleClick}
      className="!absolute right-1 top-1 rounded bg-inherit shadow-none text-blue1"
    >
      {countdown > 0 ? `${countdown}s` : t("send")}
    </Button>
  );
}

export default VerifyButton;
