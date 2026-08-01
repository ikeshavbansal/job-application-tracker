import { useGetApplicationsQuery } from "./slices/apiSlice";

function App() {
    const { data, isLoading, error } = useGetApplicationsQuery();

    if (isLoading) return <p className="p-8">Loading...</p>;
    if (error)
        return (
            <p className="p-8 text-red-600">Error: {JSON.stringify(error)}</p>
        );

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
                Job Applications
            </h1>
            <pre className="bg-white p-4 rounded shadow text-sm">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

export default App;
