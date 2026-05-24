"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={send} className="rounded-sm bg-white p-7 sm:p-10">
      <h2 className="mb-7 text-3xl">Send a message</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" required />
        <Field label="Email" name="email" type="email" required />
        <label className="text-sm font-semibold sm:col-span-2">
          Subject
          <select name="subject" required className="mt-2 block h-12 w-full border border-soft-border bg-white px-4 font-normal">
            <option value="">Choose an enquiry</option>
            <option>My order</option>
            <option>Delivery</option>
            <option>Products & sourcing</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="text-sm font-semibold sm:col-span-2">
          Message
          <textarea name="message" required rows={6} className="mt-2 block w-full border border-soft-border p-4 font-normal" />
        </label>
      </div>
      <Button type="submit" className="mt-7">Send enquiry</Button>
      {sent && <p aria-live="polite" className="mt-5 text-sm text-[#286438]">Thanks for getting in touch. Our team will respond shortly.</p>}
    </form>
  );
}

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <label className="text-sm font-semibold">
      {label}
      <input name={name} type={type} required={required} className="mt-2 block h-12 w-full border border-soft-border px-4 font-normal" />
    </label>
  );
}
