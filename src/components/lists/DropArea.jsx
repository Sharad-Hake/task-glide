import React, { useState } from "react";
import "./DropArea.css";
// create for blank space above and below the card and handled indexing and type of status of coloum(Pending/Completed)
// It will trigger when user try to move card in same column or in different column
const DropArea = ({ onDrop, status, index }) => {
    const [showDrop, setShowDrop] = useState(false);

    return (
        <section
            onDrop={() => { onDrop(status, index); setShowDrop(false); }}
            onDragEnter={() => setShowDrop(true)}
            onDragLeave={() => setShowDrop(false)}
            onDragOver={(e) => e.preventDefault()}
            className={showDrop ? "drop_area" : "hide_drop"}
        >
            Drop here
        </section>
    );
};

export default DropArea;

