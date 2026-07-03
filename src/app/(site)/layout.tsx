import type {ReactNode} from "react";

import {SiteFooter} from "../../components/site/site-footer";
import {SiteNavbar} from "../../components/site/site-navbar";

export default function SiteLayout({children}: {children: ReactNode}) {
  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <SiteNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
