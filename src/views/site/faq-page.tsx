"use client";

import {CircleQuestion} from "@gravity-ui/icons";
import {Accordion, Link, SearchField} from "@heroui/react";
import {useMemo, useState} from "react";

import {PageHeader} from "../../components/site/page-header";
import {FAQS} from "../../data/site";

export function FaqPage() {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return FAQS;

    return FAQS.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <PageHeader
        description="รวมคำถามที่พบบ่อยเกี่ยวกับการแจ้งเบาะแส การรายงานธุรกรรม และการคุ้มครองสิทธิ"
        title="คำถามที่พบบ่อย"
      />

      <div className="mx-auto max-w-3xl px-5 py-8">
        <SearchField
          aria-label="ค้นหาคำถาม"
          className="mb-6 w-full"
          value={query}
          onChange={setQuery}
        >
          <SearchField.Group className="bg-surface-secondary h-12 rounded-xl px-2">
            <SearchField.SearchIcon className="ml-1 size-4" />
            <SearchField.Input placeholder="ค้นหาคำถาม เช่น แจ้งเบาะแส, บัญชีม้า…" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        {items.length > 0 ? (
          <Accordion className="w-full">
            {items.map((faq, index) => (
              <Accordion.Item key={faq.question} id={`faq-${index}`}>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    {faq.question}
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body className="text-muted text-sm leading-6">
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <div className="text-muted flex flex-col items-center gap-2 py-12 text-center">
            <CircleQuestion className="size-7" />
            <p className="text-foreground text-sm font-medium">ไม่พบคำถามที่ตรงกับ “{query.trim()}”</p>
            <p className="text-xs">ติดต่อสอบถามเพิ่มเติมได้ที่สายด่วน 1710</p>
          </div>
        )}

        <div className="border-separator mt-10 flex flex-col items-center gap-1 border-t pt-8 text-center">
          <p className="text-foreground text-sm font-medium">ยังไม่พบคำตอบที่ต้องการ?</p>
          <p className="text-muted text-sm">
            ติดต่อเราได้ที่{" "}
            <Link className="text-accent no-underline" href="mailto:contact@amlo.go.th">
              contact@amlo.go.th
            </Link>{" "}
            หรือสายด่วน 1710
          </p>
        </div>
      </div>
    </>
  );
}
