import { Image } from "./Image";

export function Navbar() {
    return (
        <div className="w-full bg-slate-500 flex items-center justify-center text-white p-4 opacity-90">
            <h1 className="text-3xl">Weather</h1>
            <Image pathImg="src/assets/sun.png" width={40} height={40} />
        </div>
    );
}
