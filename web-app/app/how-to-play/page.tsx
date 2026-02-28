import BackToHomeButton from "@/components/general/BackToHomeButton";

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-4">
      <h1 className="font-bold text-2xl">How to Play</h1>
      <p className="">
        {`Master the game of strategy and fun with our Tic Tac Toe guide! Here's everything you need to know to play and win.`}
      </p>
      <ul className="w-full flex flex-col gap-4">
        <li className="flex gap-4 items-start">
          <div className="rounded-full flex w-12 h-12 bg-[var(--primary-light)]">
            <p className="font-bold text-xl m-auto">1</p>
          </div>
          <div>
            <p className="font-bold text-lg">{`Pick your mark`}</p>
            <p>{`Choose to play as the "X" or the "O".`}</p>
          </div>
        </li>
        <li className="flex gap-4 items-start">
          <div className="rounded-full flex w-12 h-12 bg-[var(--primary-light)]">
            <p className="font-bold text-xl m-auto">2</p>
          </div>
          <div>
            <p className="font-bold text-lg">{`Place your Move`}</p>
            <p>{`Select an empty cell on the grid to place your mark.`}</p>
          </div>
        </li>
        <li className="flex gap-4 items-start">
          <div className="rounded-full flex w-12 h-12 bg-[var(--primary-light)]">
            <p className="font-bold text-xl m-auto">3</p>
          </div>
          <div>
            <p className="font-bold text-lg">{`Claim Victory`}</p>
            <p>
              {`Be the first to align three of your marks horizontally, vertically, or diagonally to win the game!`}
            </p>
          </div>
        </li>
      </ul>
      <div className="w-full flex items-center justify-center text-center grow">
         <BackToHomeButton />
      </div>
    </div>
  );
}
