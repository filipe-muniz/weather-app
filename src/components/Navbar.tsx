import { Image } from "./Image";
export function Navbar(){
  return (
    <div className="mx-auto min-w-screen-xl bg-slate-500 flex items-center text-white justify-center opacity-90 ">
    <h1 className="text-3xl">Weather</h1>
    <Image pathImg="src/assets/sun.png" width={80} height={10} />
</div>

  )
}
