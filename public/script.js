const addShipForm = document.getElementById("addShipForm");
const shipsList = document.getElementById("shipsList");

// Get list of ships from the server
async function fetchShips() {
  try {
    const response = await fetch("/api/ships");
    const ships = await response.json();
    renderShips(ships);
  } catch (error) {
    console.error("Error fetching ships:", error);
    shipsList.innerHTML =
      "<p>Error loading ships. Database might not be connected.</p>";
  }
}

// Show ships in the UI
function renderShips(ships) {
  if (ships.length === 0) {
    shipsList.innerHTML = "<p>No ships found. Add your first ship!</p>";
    return;
  }

  let html = "";
  ships.forEach((ship) => {
    html += `
      <div class="ship-card" data-id="${ship._id}">
        <h3>${ship.name}</h3>
        <p><strong>Model:</strong> ${ship.model}</p>
        <p><strong>Capacity:</strong> ${ship.capacity}</p>
        <div class="ship-actions">
          <button class="delete-btn" onclick="deleteShip('${ship._id}')">Delete</button>
        </div>
      </div>
    `;
  });

  shipsList.innerHTML = html;
}

async function addShip(shipData) {
  try {
    const response = await fetch("/api/ships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shipData),
    });

    if (!response.ok) {
      throw new Error("Failed to add ship");
    }

    // Update list of ships
    fetchShips();

    addShipForm.reset();
  } catch (error) {
    console.error("Error adding ship:", error);
    alert("Failed to add ship. Please try again.");
  }
}

async function deleteShip(id) {
  if (!confirm("Are you sure you want to delete this ship?")) {
    return;
  }

  try {
    const response = await fetch(`/api/ships/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete ship");
    }

    fetchShips();
  } catch (error) {
    console.error("Error deleting ship:", error);
    alert("Failed to delete ship. Please try again.");
  }
}

addShipForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const shipData = {
    name: document.getElementById("name").value,
    model: document.getElementById("model").value,
    capacity: parseInt(document.getElementById("capacity").value),
  };

  await addShip(shipData);
});

fetchShips();
