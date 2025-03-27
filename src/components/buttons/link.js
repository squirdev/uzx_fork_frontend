import Link from "next/link";

const LinkBtn = ({ href, label, className }) => {
  return (
    <Link href={href} className={`text-white ${className}`}>
      {label}
    </Link>
  );
};

export default LinkBtn;
