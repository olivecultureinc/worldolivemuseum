"use client";

export default function StripeButton({
  lang,
  labelEn,
  labelFr,
}: {
  lang: string;
  labelEn: string;
  labelFr: string;
}) {
  const label = lang === "fr" ? labelFr : labelEn;

  const handleClick = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-3 rounded-xl bg-[#DCE3C2] text-neutral-900 font-medium hover:bg-[#DCE3C2] transition shadow-xl shadow-black/15 backdrop-blur-sm"
    >
      {label}
    </button>
  );
}