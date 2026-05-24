"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export type AccordionItem = { title: string; content: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className="divide-y divide-soft-border border-y border-soft-border">
      {items.map((item, index) => (
        <AccordionPrimitive.Item key={item.title} value={`item-${index}`}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between py-5 text-left font-semibold hover:text-oxblood">
              {item.title}
              <ChevronDown className="h-4 w-4 transition group-data-[state=open]:rotate-180" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden pb-5 text-sm leading-7 text-muted data-[state=open]:animate-rise">
            {item.content}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
