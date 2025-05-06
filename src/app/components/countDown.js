import { useEffect, useState } from 'react';

function formatRemainingTime(expireAt) {
  const now = new Date();
  const end = new Date(expireAt);
  let diff = Math.max(0, end - now);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff %= 1000 * 60;
  const seconds = Math.floor(diff / 1000);

  return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M ${String(seconds).padStart(2, '0')}S`;
}

export default function Countdown({ expireAt }) {
  const [timeLeft, setTimeLeft] = useState(formatRemainingTime(expireAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatRemainingTime(expireAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [expireAt]);

  return <p>{timeLeft}</p>;
}
