import { useState } from "react";
import Board from "./components/Board";
import AddApplicationModal from "./components/AddApplicationModal";
import { Toaster } from "react-hot-toast";

function App() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="min-h-screen w-full bg-slate-100 overflow-hidden">
            <Toaster position="top-right" />
            <header className="p-6 border-b border-slate-300 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">
                    Job Application Tracker
                </h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                    + Add Application
                </button>
            </header>
            <Board />
            {showModal && (
                <AddApplicationModal onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}

export default App;
