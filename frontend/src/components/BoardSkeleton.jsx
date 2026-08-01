import CardSkeleton from "./CardSkeleton";

const COLUMN_LABELS = [
    "Wishlist",
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected",
];

function BoardSkeleton() {
    return (
        <div className="flex gap-4 overflow-x-auto p-6">
            {COLUMN_LABELS.map((label) => (
                <div
                    key={label}
                    className="bg-slate-200 rounded-lg p-3 w-72 flex-shrink-0"
                >
                    <h2 className="font-semibold text-slate-700 mb-3">
                        {label}
                    </h2>
                    <div className="space-y-2">
                        <CardSkeleton />
                        <CardSkeleton />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BoardSkeleton;
