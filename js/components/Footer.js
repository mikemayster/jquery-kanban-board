function Footer(item) {
    return `
        <div class="col kanban_board_footer" data-block="${item}">
            <button type="button" id="addButton" onclick="openModal('${item}')" style="width: inherit" class="btn btn-outline-dark">
                Add Item
            </button>
        </div>
  `;
}