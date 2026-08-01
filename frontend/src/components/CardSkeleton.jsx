function CardSkeleton() {
    return (
        <div className="bg-white rounded-md shadow p-3 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
    );
}

export default CardSkeleton;
