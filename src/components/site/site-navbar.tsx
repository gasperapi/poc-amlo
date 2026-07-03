"use client";

import type {AnchorHTMLAttributes} from "react";

import {ScalesBalanced} from "@gravity-ui/icons";
import {Navbar} from "@heroui-pro/react";
import {usePathname, useRouter} from "next/navigation";

import {SITE_NAV_ITEMS} from "../../site-nav";

import {ThemeToggle} from "./theme-toggle";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="bg-accent text-accent-foreground flex size-9 items-center justify-center rounded-xl">
        <ScalesBalanced className="size-5" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-foreground text-base font-bold tracking-tight">ปปง.</span>
        <span className="text-muted text-[11px] font-medium">ปราบปรามการฟอกเงิน</span>
      </div>
    </div>
  );
}

export function SiteNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Navbar maxWidth="xl" navigate={router.push} position="sticky">
      <Navbar.Header>
        <Navbar.MenuToggle className="md:hidden" />

        <Navbar.Brand
          render={(props) => (
            <a {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} href="/" />
          )}
        >
          <BrandMark />
          <span className="sr-only">สำนักงานป้องกันและปราบปรามการฟอกเงิน</span>
        </Navbar.Brand>

        <Navbar.Spacer />

        <Navbar.Content className="hidden md:flex">
          {SITE_NAV_ITEMS.map((item) => (
            <Navbar.Item key={item.href} href={item.href} isCurrent={isActive(pathname, item.href)}>
              {item.label}
            </Navbar.Item>
          ))}
        </Navbar.Content>

        <Navbar.Separator className="hidden h-4 md:block" />

        <Navbar.Content>
          <ThemeToggle />
        </Navbar.Content>
      </Navbar.Header>

      <Navbar.Menu>
        {SITE_NAV_ITEMS.map((item) => (
          <Navbar.MenuItem
            key={item.href}
            href={item.href}
            isCurrent={isActive(pathname, item.href)}
          >
            {item.label}
          </Navbar.MenuItem>
        ))}
      </Navbar.Menu>
    </Navbar>
  );
}
