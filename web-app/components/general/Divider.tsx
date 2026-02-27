
interface DividerProps {
  space?: number;
  text?: string; 
}
export default function Divider({ space = 1, text }: DividerProps) {
  return (
    <div
      className="w-full flex items-center"
      style={{
        marginTop: `${space}rem`,
        marginBottom: `${space}rem`,
        gap: text ? "1rem" : "0",
      }}
    >
      <hr className="w-full border-[var(--border)]" />
      {text && (
        <div className="text-center text-sm text-[var(--secondary)] mt-1">
          {text}
        </div>
      )}
      <hr className="w-full border-[var(--border)]" />
    </div>
  );
}
