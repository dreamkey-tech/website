import Image from "next/image";
import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link href="/" className="home-brand">
      <span className="home-brand__mark">
        <Image src="/logo.webp" alt="" width={90} height={60} />
      </span>
      <span className="home-brand__name">
        <span>Dream Key</span>{" "}
        <span className="home-brand__descriptor">Reality</span>
      </span>
    </Link>
  );
}
