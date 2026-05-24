"use client";

import { CalendarDays, Check, CreditCard, MapPin } from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { deliveryCost, formatMoney } from "@/lib/utils";
import { cartSubtotal, useCartStore } from "@/store/cart-store";

const steps = [
  { title: "Delivery details", icon: MapPin },
  { title: "Delivery slot", icon: CalendarDays },
  { title: "Payment", icon: CreditCard },
];

function isoDay(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
}

export function CheckoutForm() {
  const { items, hasHydrated, discountCode, clearCart } = useCartStore();
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(isoDay(1));
  const [slot, setSlot] = useState("08:00 - 12:00");
  const [dateMessage, setDateMessage] = useState("");
  const [complete, setComplete] = useState(false);
  const shownItems = hasHydrated ? items : [];
  const subtotal = cartSubtotal(shownItems);
  const discount = discountCode === "WELCOME10" ? subtotal * 0.1 : 0;
  const shipping = deliveryCost(subtotal - discount);
  const total = subtotal - discount + shipping;
  const isSunday = useMemo(() => new Date(`${date}T12:00:00`).getDay() === 0, [date]);

  function nextFromDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep(1);
  }

  function nextFromDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSunday) {
      setDateMessage("We do not deliver on Sundays. Please select another date.");
      return;
    }
    setDateMessage("");
    setStep(2);
  }

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearCart();
    setComplete(true);
  }

  if (complete) {
    return (
      <div className="container-site max-w-2xl py-20 text-center">
        <Check className="mx-auto h-14 w-14 rounded-full bg-[#e2eee3] p-3 text-[#286438]" />
        <h1 className="mt-7 text-4xl">Order received</h1>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-muted">
          Thank you. Your mock payment has been accepted and your chilled delivery is booked for {date}, {slot}.
        </p>
        <Button asChild className="mt-9"><Link href="/shop">Shop again</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-site grid gap-10 pb-20 pt-8 lg:grid-cols-[1fr_370px]">
      <section>
        <h1 className="section-title">Checkout</h1>
        <ol className="my-9 flex gap-2 sm:gap-5" aria-label="Checkout steps">
          {steps.map(({ title, icon: Icon }, index) => (
            <li key={title} className={`flex flex-1 items-center gap-2 border-b-2 pb-4 text-xs font-bold uppercase tracking-wider ${index <= step ? "border-oxblood text-oxblood" : "border-soft-border text-muted"}`}>
              <Icon className="hidden h-4 w-4 sm:block" /> {title}
            </li>
          ))}
        </ol>
        {step === 0 && (
          <form onSubmit={nextFromDetails} className="rounded-sm bg-white p-6 sm:p-9">
            <h2 className="mb-6 text-2xl">Delivery address</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name" name="firstName" required />
              <Field label="Last name" name="lastName" required />
              <Field label="Email address" name="email" type="email" required wide />
              <Field label="Address line 1" name="address" required wide />
              <Field label="Town / City" name="town" required />
              <Field label="Postcode" name="postcode" required pattern="[A-Za-z0-9 ]{5,8}" />
              <Field label="Mobile phone" name="phone" type="tel" required wide />
            </div>
            <Button type="submit" className="mt-8">Continue to delivery</Button>
          </form>
        )}
        {step === 1 && (
          <form onSubmit={nextFromDate} className="rounded-sm bg-white p-6 sm:p-9">
            <h2 className="mb-6 text-2xl">Choose delivery date & slot</h2>
            <label className="mb-6 block text-sm font-semibold">
              Delivery date (no Sundays)
              <input type="date" required min={isoDay(1)} value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 block h-12 w-full rounded-sm border border-soft-border px-4 font-normal" />
            </label>
            <fieldset>
              <legend className="mb-3 text-sm font-semibold">Available time slots</legend>
              {["08:00 - 12:00", "12:00 - 16:00", "16:00 - 19:00"].map((time) => (
                <label key={time} className="mb-3 flex cursor-pointer justify-between rounded-sm border border-soft-border p-4">
                  <span>{time}</span>
                  <input type="radio" name="slot" value={time} checked={slot === time} onChange={() => setSlot(time)} className="accent-oxblood" />
                </label>
              ))}
            </fieldset>
            {dateMessage && <p role="alert" className="mt-4 text-sm text-oxblood">{dateMessage}</p>}
            <div className="mt-8 flex gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep(0)}>Back</Button>
              <Button type="submit">Continue to payment</Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={placeOrder} className="rounded-sm bg-white p-6 sm:p-9">
            <h2 className="text-2xl">Payment</h2>
            <p className="mt-2 mb-6 text-sm text-muted">Secure payment UI placeholder, ready for Stripe Elements integration.</p>
            <div className="space-y-5">
              <Field label="Cardholder name" name="cardholder" required />
              <Field label="Card number" name="cardNumber" placeholder="4242 4242 4242 4242" required />
              <div className="grid grid-cols-2 gap-5">
                <Field label="Expiry" name="expiry" placeholder="MM / YY" required />
                <Field label="CVC" name="cvc" placeholder="123" required />
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button type="submit">Place order - {formatMoney(total)}</Button>
            </div>
          </form>
        )}
      </section>
      <aside className="h-fit rounded-sm bg-white p-7">
        <h2 className="mb-6 text-2xl">Your order</h2>
        {shownItems.length === 0 ? (
          <p className="text-sm text-muted">Your basket is currently empty.</p>
        ) : shownItems.map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          return product && (
            <div key={`${item.productId}-${item.weight}`} className="mb-4 flex justify-between gap-3 text-sm">
              <span>{product.name} <span className="text-muted">x{item.quantity}</span></span>
              <span>{formatMoney(product.price * item.quantity)}</span>
            </div>
          );
        })}
        <dl className="mt-6 space-y-3 border-t border-soft-border pt-5 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(subtotal)}</dd></div>
          {discount > 0 && <div className="flex justify-between text-oxblood"><dt>Discount</dt><dd>-{formatMoney(discount)}</dd></div>}
          <div className="flex justify-between"><dt>Delivery</dt><dd>{shipping ? formatMoney(shipping) : "Free"}</dd></div>
          <div className="flex justify-between pt-3 text-lg font-bold"><dt>Total</dt><dd>{formatMoney(total)}</dd></div>
        </dl>
      </aside>
    </div>
  );
}

function Field({ label, wide, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; wide?: boolean }) {
  return (
    <label className={`text-sm font-semibold ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      <input {...props} className="mt-2 block h-12 w-full rounded-sm border border-soft-border px-4 font-normal focus:border-gold" />
    </label>
  );
}
