import { Droppable } from "@hello-pangea/dnd";

function Column({ id, title, count, children }) {
    return (
        <div className="bg-slate-200 rounded-lg p-3 w-72 flex-shrink-0">
            <h2 className="font-semibold text-slate-700 mb-3 flex justify-between">
                <span>{title}</span>
                <span className="text-slate-500">{count}</span>
            </h2>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-2 min-h-[40px] rounded ${
                            snapshot.isDraggingOver ? "bg-slate-300" : ""
                        }`}
                    >
                        {children}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default Column;
