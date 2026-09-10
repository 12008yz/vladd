type Kind = "timing" | "battery" | "suspension" | "sensor";

const captions: Record<Kind, string> = {
  timing: "Схема ГРМ: метки шкивов и натяжной ролик",
  battery: "Цепь запуска: АКБ → масса → стартер",
  suspension: "Передняя стойка: опора, пружина, амортизатор",
  sensor: "Датчик кислорода на выпускном коллекторе",
};

export function Diagram({ kind }: { kind: Kind }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white">
      <svg viewBox="0 0 640 280" className="h-auto w-full" role="img" aria-label={captions[kind]}>
        <rect width="640" height="280" fill="#f7f8fa" />
        {kind === "timing" ? <Timing /> : null}
        {kind === "battery" ? <Battery /> : null}
        {kind === "suspension" ? <Suspension /> : null}
        {kind === "sensor" ? <Sensor /> : null}
      </svg>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-ink-soft">
        {captions[kind]} · схематично, для ориентации
      </figcaption>
    </figure>
  );
}

function Timing() {
  return (
    <g fill="none" stroke="#1e3a5f" strokeWidth="2">
      <circle cx="220" cy="160" r="54" />
      <circle cx="400" cy="90" r="36" />
      <circle cx="430" cy="190" r="22" fill="#1e3a5f" fillOpacity="0.08" />
      <path d="M220 106 C 300 40, 360 40, 400 54" />
      <path d="M256 196 C 330 230, 400 230, 430 212" />
      <text x="200" y="164" fill="#1e3a5f" stroke="none" fontSize="13">
        коленвал
      </text>
      <text x="372" y="94" fill="#1e3a5f" stroke="none" fontSize="13">
        распред
      </text>
      <text x="448" y="194" fill="#1e3a5f" stroke="none" fontSize="13">
        ролик
      </text>
    </g>
  );
}

function Battery() {
  return (
    <g fill="none" stroke="#1e3a5f" strokeWidth="2">
      <rect x="80" y="90" width="120" height="80" rx="8" />
      <rect x="250" y="110" width="70" height="40" rx="6" />
      <rect x="400" y="80" width="150" height="100" rx="10" />
      <path d="M200 130 H250 M320 130 H400" />
      <text x="108" y="136" fill="#1e3a5f" stroke="none" fontSize="14">
        АКБ
      </text>
      <text x="262" y="136" fill="#1e3a5f" stroke="none" fontSize="13">
        реле
      </text>
      <text x="438" y="136" fill="#1e3a5f" stroke="none" fontSize="14">
        стартер
      </text>
    </g>
  );
}

function Suspension() {
  return (
    <g fill="none" stroke="#1e3a5f" strokeWidth="2">
      <rect x="280" y="40" width="80" height="22" rx="4" />
      <path d="M320 62 V110" />
      <path d="M260 110 H380" />
      <path d="M275 110 C 275 150, 365 150, 365 110" />
      <rect x="304" y="150" width="32" height="80" rx="10" />
      <circle cx="320" cy="248" r="18" />
      <text x="378" y="56" fill="#1e3a5f" stroke="none" fontSize="13">
        опора
      </text>
      <text x="390" y="138" fill="#1e3a5f" stroke="none" fontSize="13">
        пружина
      </text>
    </g>
  );
}

function Sensor() {
  return (
    <g fill="none" stroke="#1e3a5f" strokeWidth="2">
      <path d="M80 180 C 180 80, 320 80, 420 160 S 560 230, 580 200" />
      <rect x="300" y="70" width="26" height="70" rx="4" fill="#1e3a5f" fillOpacity="0.08" />
      <path d="M313 70 V40" />
      <text x="338" y="60" fill="#1e3a5f" stroke="none" fontSize="13">
        лямбда
      </text>
      <text x="120" y="210" fill="#1e3a5f" stroke="none" fontSize="13">
        коллектор
      </text>
    </g>
  );
}
