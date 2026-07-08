"use client";

import type {AnchorHTMLAttributes} from "react";

import {Navbar} from "@heroui-pro/react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";

import logo from "../../Anti-Money_Laundering_Office_Logo.png";
import {SITE_NAV_ITEMS} from "../../site-nav";

import {ThemeColorPicker} from "./theme-color-picker";
import {ThemeToggle} from "./theme-toggle";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <Image alt="ตราสัญลักษณ์ ปปง." className="size-9 object-contain" priority src={logo} />
      <div className="min-w-0 leading-none">
        <span className="text-foreground block max-w-[190px] truncate text-[11px] font-bold tracking-tight sm:max-w-none sm:text-sm">
          สำนักงานป้องกันและปราบปรามการฟอกเงิน
        </span>
      </div>
    </div>
  );
}

const VISIBLE_NAV_ITEMS = SITE_NAV_ITEMS.filter((item) => item.href === "/prototype");

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
          {VISIBLE_NAV_ITEMS.map((item) => (
            <Navbar.Item key={item.href} href={item.href} isCurrent={isActive(pathname, item.href)}>
              {item.label}
            </Navbar.Item>
          ))}
        </Navbar.Content>

        <Navbar.Separator className="hidden h-4 md:block" />

        <Navbar.Content className="gap-1">
          <ThemeColorPicker />
          <ThemeToggle />
        </Navbar.Content>
      </Navbar.Header>

      <Navbar.Menu>
        {VISIBLE_NAV_ITEMS.map((item) => (
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
