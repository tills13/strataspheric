"use client";
import Link from "next/link";
import * as styles from "./style.css";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  let label: string | undefined;
  let href: string | undefined;

  if (pathname === "/") {
  } else if (pathname === "/dashboard") {
    label = "View Membership";
    href = "/dashboard/membership";
  } else {
    label = "View Dashboard";
    href = "/dashboard";
  }

  const segments = pathname.split("/");

  return (
    <div className={styles.breadcrumbs}>
      <Link href="/">Home</Link>
      {segments.map((segment) => (
        <>
          <Link href={"/" + segment}>{segment}</Link>
          <span>/</span>
        </>
      ))}
    </div>
  );
}
