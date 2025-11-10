$(document).ready(function () {
    let taskCount = 0;

    $("#taskForm").submit(function (e) {
        e.preventDefault();

        const taskName = $("#taskName").val().trim();
        const taskDesc = $("#taskDesc").val().trim();

        if (taskName === "" || taskDesc === "") {
            alert("Please fill out both Task Name and Task Description.");
            return;
        }

        let duplicateFound = false;
        $("#taskTable tbody tr").each(function () {
            const existingTask = $(this).find("td:nth-child(2)").text().trim().toLowerCase();
            if (existingTask === taskName.toLowerCase()) {
                duplicateFound = true;
                return false;
            }
        });

        if (duplicateFound) {
            const confirmDuplicate = confirm(
                `"${taskName}" already exists. Do you still want to add it?`
            );
            if (!confirmDuplicate) {
                return;
            }
        }

        taskCount++;
        const newRow = `
            <tr>
                <td>${taskCount}</td>
                <td>${taskName}</td>
                <td>${taskDesc}</td>
                <td><button class="delete-btn">Delete</button></td>
            </tr>
        `;

        $("#taskTable tbody").append(newRow);

        $("#taskName").val("");
        $("#taskDesc").val("");

        updateNumbers();
    });

    $("#taskTable").on("click", ".delete-btn", function () {
        const confirmDelete = confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            $(this).closest("tr").remove();
            updateNumbers();
            alert("Task deleted successfully!");
        }
    });

    function updateNumbers() {
        $("#taskTable tbody tr").each(function (index) {
            $(this).find("td:first").text(index + 1);
        });
        taskCount = $("#taskTable tbody tr").length;
    }
});
