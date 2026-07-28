function updateMissionStatus() {

    const mission = document.getElementById("missionStatus");

    if (!mission) return;

    mission.innerHTML = `
        <ul>
            <li>🟢 Emergency Level: <strong>Moderate</strong></li>
            <li>🚑 Response Teams: <strong>4 Active</strong></li>
            <li>🏥 Hospitals Available: <strong>12</strong></li>
            <li>🏫 Shelters Open: <strong>18</strong></li>
        </ul>
    `;
}