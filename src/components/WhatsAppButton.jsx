"use client";

export default function WhatsAppButton() {
  const phone = "919910130963"; // country code ke sath
  const message = encodeURIComponent(
    "Hi, I am interested in your templates."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg hover:scale-110 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          className="h-8 w-8"
        >
          <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.5 2.1 7.9L0 32l8.3-2.2c2.3 1.2 4.9 1.8 7.7 1.8 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.3c-2.4 0-4.7-.6-6.8-1.8l-.5-.3-4.9 1.3 1.3-4.8-.3-.5A12.6 12.6 0 1 1 16 28.7zm6.9-9.4c-.4-.2-2.4-1.2-2.8-1.3-.4-.2-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.5.3-.9.1-.4-.2-1.8-.7-3.4-2.2-1.3-1.2-2.1-2.6-2.4-3-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.2 0-.5 0-.7 0-.2-.9-2.2-1.2-3-.3-.8-.7-.7-.9-.7h-.8c-.2 0-.7.1-1 .5-.4.4-1.4 1.3-1.4 3.2s1.4 3.8 1.6 4.1c.2.3 2.8 4.3 6.8 6 .9.4 1.7.7 2.3.9 1 .3 1.9.3 2.6.2.8-.1 2.4-1 2.8-2 .3-1 .3-1.8.2-2-.1-.2-.4-.3-.8-.5z" />
        </svg>
      </div>
    </a>
  );
}