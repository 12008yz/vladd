import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold">Страница не найдена</h1>
      <p className="mt-3 text-ink-soft">Такой марки, модели или карточки в демо нет.</p>
      <Link href="/" className="mt-6 inline-block text-navy hover:underline">
        На главную
      </Link>
    </div>
  );
}
