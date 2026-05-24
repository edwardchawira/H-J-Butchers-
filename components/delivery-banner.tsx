import { Award, Clock3, PackageCheck, Truck } from "lucide-react";

const promises = [
  { icon: Truck, text: "Free delivery over £75" },
  { icon: Clock3, text: "Order by 2pm for next day" },
  { icon: Award, text: "Great quality meat" },
  { icon: PackageCheck, text: "Chilled sustainable packaging" },
];

export function DeliveryBanner() {
  return (
    <div className="bg-charcoal text-cream" aria-label="Delivery benefits">
      <div className="container-site grid grid-cols-2 gap-y-2 py-2 text-[11px] font-medium uppercase tracking-wider md:grid-cols-4 md:py-2.5">
        {promises.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center justify-center gap-2">
            <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
