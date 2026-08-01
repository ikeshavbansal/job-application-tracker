import { useGetApplicationsQuery } from "./slices/apiSlice";

import Board from "./components/Board";

function App() {
    return (
        <div className="min-h-screen w-full bg-slate-100 overflow-hidden">
            <header className="p-6 border-b border-slate-300">
                <h1 className="text-2xl font-bold text-slate-800">
                    Job Application Tracker
                </h1>
            </header>
            <Board />
        </div>
    );
}

export default App;
