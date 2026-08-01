import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Board from "./components/Board";
import AddApplicationModal from "./components/AddApplicationModal";
import EditApplicationModal from "./components/EditApplicationModal";

function App() {
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [editingApplication, setEditingApplication] = useState(null);

    return (
        <div className="min-h-screen w-full bg-slate-100 overflow-hidden">
            <Toaster position="top-right" />
            <header className="p-6 border-b border-slate-300 flex justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-800">
                    Job Application Tracker
                </h1>
                <div className="flex gap-3 flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search company or role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap"
                >
                    + Add Application
                </button>
            </header>
            <Board search={search} onCardClick={setEditingApplication} />
            {showModal && (
                <AddApplicationModal onClose={() => setShowModal(false)} />
            )}
            {editingApplication && (
                <EditApplicationModal
                    application={editingApplication}
                    onClose={() => setEditingApplication(null)}
                />
            )}
        </div>
    );
}

export default App;
