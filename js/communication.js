/* =====================================================
   AI DISASTER COMMAND CENTER
   COMMUNICATION.JS
===================================================== */

function getDispatchBoard() {
    return [
        { label: "Flood Relief Convoy", detail: "Assam corridor • 3 teams dispatched" },
        { label: "Air Medical Support", detail: "Uttarakhand • helicopter standby" },
        { label: "Shelter Coordination", detail: "Odisha • 6 camps prepared" },
        { label: "Rescue Boat Teams", detail: "Barpeta • two corridors cleared" }
    ];
}

function getEscalationStatus() {
    return [
        { label: "Priority Level", detail: "Critical" },
        { label: "District Escalation", detail: "3 districts active" },
        { label: "Emergency Broadcast", detail: "Issued to all channels" },
        { label: "Resource Approval", detail: "Awaiting final sign-off" }
    ];
}

function getOperatorNotes() {
    return [
        { label: "Route Note", detail: "Primary corridor remains safest, monitor north diversion" },
        { label: "Field Update", detail: "Shelter occupancy trending above 80%" },
        { label: "Medical Note", detail: "Ambulance queue stable for next 45 minutes" },
        { label: "Weather Note", detail: "Rain intensity reducing across Assam belt" }
    ];
}

function updateCommunicationCenter() {
    const dispatchTarget = document.getElementById("dispatchBoardList");
    const escalationTarget = document.getElementById("escalationStatusList");
    const notesTarget = document.getElementById("operatorNotesList");

    if (dispatchTarget) {
        dispatchTarget.innerHTML = getDispatchBoard().map((item) => `
            <li><strong>${item.label}</strong>${item.detail}</li>
        `).join("");
    }

    if (escalationTarget) {
        escalationTarget.innerHTML = getEscalationStatus().map((item) => `
            <li><strong>${item.label}</strong>${item.detail}</li>
        `).join("");
    }

    if (notesTarget) {
        notesTarget.innerHTML = getOperatorNotes().map((item) => `
            <li><strong>${item.label}</strong>${item.detail}</li>
        `).join("");
    }
}

function initializeCommunication() {
    updateCommunicationCenter();
    setInterval(updateCommunicationCenter, 12000);
}
